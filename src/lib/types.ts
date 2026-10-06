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

export interface SiteContent {
  heroHeading: string;
  heroSubheading: string;
  tagline: string;
  announcement: string;
  aboutTitle: string;
  aboutHeadline: string;
  aboutStory: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactEmail: string;
  contactAddress: string;
  admissionsOpen: boolean;
  academicYear: string;
}
