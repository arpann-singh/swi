import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { SiteContent, Course, GalleryItem, Enquiry, FirebaseSettings } from './types';

// Default Firebase Configuration (Uses env vars or default fallback)
const defaultFirebaseConfig: FirebaseSettings = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyC4MoSpQe_QsgaCoupH2dKmgHSfLrNqhXA',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'swinstitute0.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'swinstitute0',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'swinstitute0.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '310303663506',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:310303663506:web:19032cd9fed954eeaf8d4b',
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export const initFirebase = (customConfig?: FirebaseSettings): { app: FirebaseApp | null; db: Firestore | null } => {
  if (typeof window === 'undefined') return { app: null, db: null };

  const configToUse = customConfig && customConfig.projectId ? customConfig : defaultFirebaseConfig;

  if (!configToUse.projectId || !configToUse.apiKey) {
    console.warn('Firebase: Missing projectId or apiKey. Persistence running in local mode.');
    return { app: null, db: null };
  }

  try {
    if (!getApps().length) {
      app = initializeApp(configToUse as any);
    } else {
      app = getApp();
    }
    db = getFirestore(app);
    return { app, db };
  } catch (error) {
    console.error('Firebase Initialization Error:', error);
    return { app: null, db: null };
  }
};

/**
 * Save Site Content to Firestore Document `site/content`
 */
export const saveContentToFirebase = async (content: SiteContent, config?: FirebaseSettings): Promise<boolean> => {
  const { db } = initFirebase(config);
  if (!db) return false;

  try {
    const docRef = doc(db, 'sw_site', 'content');
    await setDoc(docRef, content, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving content to Firebase Firestore:', error);
    return false;
  }
};

/**
 * Load Site Content once from Firestore
 */
export const loadContentFromFirebase = async (config?: FirebaseSettings): Promise<SiteContent | null> => {
  const { db } = initFirebase(config);
  if (!db) return null;

  try {
    const docRef = doc(db, 'sw_site', 'content');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as SiteContent;
    }
    return null;
  } catch (error) {
    console.error('Error loading content from Firebase:', error);
    return null;
  }
};

/**
 * Subscribe to Live Realtime Changes from Firebase Firestore
 */
export const subscribeToFirebaseContent = (
  callback: (content: SiteContent) => void,
  config?: FirebaseSettings
): (() => void) | null => {
  const { db } = initFirebase(config);
  if (!db) return null;

  try {
    const docRef = doc(db, 'sw_site', 'content');
    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as SiteContent);
      }
    });
  } catch (error) {
    console.error('Error subscribing to Firebase content:', error);
    return null;
  }
};

/**
 * Save Student Enquiry directly to Firestore collection `enquiries`
 */
export const saveEnquiryToFirebase = async (enquiry: Enquiry, config?: FirebaseSettings): Promise<boolean> => {
  const { db } = initFirebase(config);
  if (!db) return false;

  try {
    const colRef = collection(db, 'enquiries');
    await addDoc(colRef, {
      ...enquiry,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error saving enquiry to Firebase:', error);
    return false;
  }
};

/**
 * Unified Full Cloud Backup:
 * Writes Site Content, Courses, Gallery, and Enquiries into Firestore.
 */
export const syncAllDataToFirebase = async (
  content: SiteContent,
  courses: Course[],
  gallery: GalleryItem[],
  enquiries: Enquiry[],
  config?: FirebaseSettings
): Promise<{ success: boolean; error?: string; enquiriesCount: number }> => {
  const { db } = initFirebase(config);
  if (!db) return { success: false, enquiriesCount: 0, error: 'Firebase could not be initialized. Please verify your Project ID and API Key.' };

  try {
    // 1. Save unified content document (contains embedded courses & gallery for instant single-fetch synchronization)
    const contentRef = doc(db, 'sw_site', 'content');
    await setDoc(
      contentRef,
      {
        ...content,
        courses,
        gallery,
        lastCloudSync: new Date().toISOString(),
      },
      { merge: true }
    );

    // 2. Save dedicated courses document
    const coursesRef = doc(db, 'sw_site', 'courses');
    await setDoc(
      coursesRef,
      {
        list: courses,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // 3. Save dedicated gallery document
    const galleryRef = doc(db, 'sw_site', 'gallery');
    await setDoc(
      galleryRef,
      {
        list: gallery,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // 4. Save/backup all existing enquiries with idempotent IDs
    let count = 0;
    for (const enq of enquiries) {
      const enqDocRef = doc(db, 'enquiries', enq.id);
      await setDoc(
        enqDocRef,
        {
          ...enq,
          syncedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      count++;
    }

    return { success: true, enquiriesCount: count };
  } catch (err: any) {
    console.error('Error in syncAllDataToFirebase:', err);
    return { success: false, enquiriesCount: 0, error: err?.message || 'Failed to sync all data to Firebase' };
  }
};
