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
import { SiteContent, Enquiry, FirebaseSettings } from './types';

// Default Firebase Configuration (Uses env vars or default fallback)
const defaultFirebaseConfig: FirebaseSettings = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
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
