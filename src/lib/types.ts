export interface Course {
  id: string;
  title: string;
  category: 'Fashion' | 'Interior';
  subtitle: string;
  description: string;
  duration: string;
  eligibility: string;
  highlights: string[];
  image: string;
  accentColor: string;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Fashion' | 'Interior' | 'Sketches' | 'Workshops' | 'Events';
  image: string;
  studentName?: string;
  year?: string;
  aspectRatio: 'square' | 'tall' | 'wide';
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: string;
  course: 'Fashion Design' | 'Interior Design' | 'Both / Not Sure';
  message?: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Archived';
}

export interface SectionConfig {
  id: string;
  label: string;
  visible: boolean;
  dividerLabel: string;
}

export interface ColorTheme {
  preset: 'signature' | 'haute-couture' | 'electric-creative' | 'minimal-luxury' | 'warm-editorial' | 'custom';
  primaryAccent: string;
  secondaryAccent: string;
  tertiaryAccent: string;
  background: string;
  foreground: string;
}

export interface SiteLogos {
  headerLogo?: string;
  mobileHeaderLogo?: string;
  footerLogo?: string;
  adminLogo?: string;
  brandSymbol?: string;
}

export interface FirebaseSettings {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export interface SiteContent {
  // Integrations & Cloud Config
  imgbbApiKey?: string;
  firebaseConfig?: FirebaseSettings;

  // Global Appearance & Studio Engine
  cursorStyle: 'radial' | 'normal';
  themeMode: 'light' | 'dark' | 'auto';
  colorTheme: ColorTheme;
  logos: SiteLogos;
  sectionOrder: SectionConfig[];

  // Hero Section
  heroHeading: string;
  heroSubheading: string;
  tagline: string;
  announcement: string;
  heroTag1: string;
  heroTag2: string;
  heroTag3: string;
  heroImage1: string;
  heroImage2: string;

  // About Section
  aboutTitle: string;
  aboutHeadline: string;
  aboutStory: string;
  stat1Label: string;
  stat1Val: string;
  stat2Label: string;
  stat2Val: string;

  // Programs Section
  programsTitle: string;
  programsSubheading: string;

  // Digital Marketing Section
  dmTitle: string;
  dmHeadline: string;
  dmDescription: string;

  // Why SW Section
  whySWTitle: string;
  whySWHeadline: string;

  // Contact Info & Admissions
  contactPhone: string;
  contactWhatsapp: string;
  contactEmail: string;
  contactAddress: string;
  admissionsOpen: boolean;
  academicYear: string;

  // Cloud Sync Embedded Data
  courses?: Course[];
  gallery?: GalleryItem[];
  lastCloudSync?: string;
}

