import { Course, GalleryItem, Enquiry, SiteContent } from './types';

export const INITIAL_SITE_CONTENT: SiteContent = {
  heroHeading: 'DESIGN YOUR FUTURE. BUILD YOUR BRAND.',
  heroSubheading: 'South West Institute of Design and Innovation',
  tagline: 'LEARN. CREATE. GROW. LEAD YOUR WORLD.',
  announcement: 'Admissions Open 2026–2027 • Limited Seats Available',
  aboutTitle: 'WHO WE ARE',
  aboutHeadline: "We don't just teach design. We shape creators and future-ready leaders.",
  aboutStory:
    'South West Institute of Design and Innovation is a premier institute dedicated to nurturing creative minds. We believe in holistic education that combines creative design skills with real-world digital marketing knowledge to empower you to launch your career or build your own brand with confidence.',
  contactPhone: '+91 99939 97767',
  contactWhatsapp: '+91 77729 92592',
  contactEmail: 'garvproduction.help@gmail.com',
  contactAddress: 'Beside Panch Mandir, Near Friends Cafe, Gurunanak Market, Vaishali Nagar, Bhilai, Chhattisgarh',
  admissionsOpen: true,
  academicYear: '2026 - 2027',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'fashion-design',
    title: 'DIPLOMA IN FASHION DESIGNING',
    category: 'Fashion',
    subtitle: 'Sketching, Garment Construction, Trend Forecasting & Styling',
    description:
      'Master the complete fashion design workflow from creative conceptualization to runway production. Learn pattern drafting, textile study, fashion illustration, garment construction, and collection styling.',
    duration: '1 Year Diploma / Advanced Certification',
    eligibility: '10th / 12th Passout or Equivalent (No age limit)',
    highlights: [
      'Fashion Sketching & Digital Illustration',
      'Pattern Making & Draping Techniques',
      'Garment Construction & Tailoring',
      'Textile Science & Fabric Selection',
      'Portfolio Development & Runway Showcase',
      'Digital Marketing Included for Fashion Branding',
    ],
    image: '/images/hero_fashion_model.jpg',
    accentColor: '#F20D63',
    featured: true,
  },
  {
    id: 'interior-design',
    title: 'DIPLOMA IN INTERIOR DESIGNING',
    category: 'Interior',
    subtitle: 'Space Planning, 3D Visualization, Lighting & Furniture Design',
    description:
      'Transform spaces into functional, beautiful environments. Learn architectural planning, CAD 2D/3D modeling, material science, lighting composition, spatial aesthetics, and client project management.',
    duration: '1 Year Diploma / Advanced Certification',
    eligibility: '10th / 12th Passout or Equivalent (No age limit)',
    highlights: [
      'Residential & Commercial Space Planning',
      '3D Architectural Visualization & Rendering',
      'Lighting, Color Theory & Material Selection',
      'Furniture & Custom Joinery Design',
      'Site Execution & Client Project Management',
      'Digital Marketing Included for Interior Studios',
    ],
    image: '/images/hero_interior_render.jpg',
    accentColor: '#1749C6',
    featured: true,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Editorial Haute Couture Collection',
    category: 'Fashion',
    image: '/images/hero_fashion_model.jpg',
    studentName: 'Aanya Sharma',
    year: '2025',
    aspectRatio: 'tall',
  },
  {
    id: 'g2',
    title: 'Minimalist Architectural Studio',
    category: 'Interior',
    image: '/images/hero_interior_render.jpg',
    studentName: 'Rohan Verma',
    year: '2025',
    aspectRatio: 'wide',
  },
  {
    id: 'g3',
    title: 'Social & Brand Marketing Workshop',
    category: 'Workshops',
    image: '/images/digital_marketing_laptop.jpg',
    studentName: 'SW Studio Class',
    year: '2026',
    aspectRatio: 'square',
  },
  {
    id: 'g4',
    title: 'Avant-Garde Silhouette Sketching',
    category: 'Sketches',
    image: '/images/hero_fashion_model.jpg',
    studentName: 'Priya Patel',
    year: '2025',
    aspectRatio: 'tall',
  },
  {
    id: 'g5',
    title: 'Spatial Material Moodboard Design',
    category: 'Interior',
    image: '/images/hero_interior_render.jpg',
    studentName: 'Vikram Mehta',
    year: '2026',
    aspectRatio: 'square',
  },
  {
    id: 'g6',
    title: 'Live Fashion Showcase & Photoshoot',
    category: 'Events',
    image: '/images/hero_fashion_model.jpg',
    studentName: 'SW Annual Fest',
    year: '2025',
    aspectRatio: 'wide',
  },
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Ananya Deshmukh',
    phone: '+91 98230 11223',
    email: 'ananya.d@gmail.com',
    age: '19',
    course: 'Fashion Design',
    message: 'Interested in the 2026 batch for Fashion Designing with Digital Marketing.',
    timestamp: '2026-10-05 14:30',
    status: 'New',
  },
  {
    id: 'enq-2',
    name: 'Rajesh Kumar',
    phone: '+91 97555 44321',
    email: 'rajesh.k@yahoo.com',
    age: '24',
    course: 'Interior Design',
    message: 'Want to inquire about weekend batch timings and fee structure.',
    timestamp: '2026-10-05 11:15',
    status: 'Contacted',
  },
  {
    id: 'enq-3',
    name: 'Megha Singh',
    phone: '+91 88190 99887',
    email: 'megha.singh@gmail.com',
    age: '21',
    course: 'Both / Not Sure',
    message: 'I want counseling to choose between Fashion and Interior design.',
    timestamp: '2026-10-04 18:45',
    status: 'Enrolled',
  },
];

// LocalStorage Helper for CMS persistence
export const getStoredContent = (): SiteContent => {
  if (typeof window === 'undefined') return INITIAL_SITE_CONTENT;
  try {
    const data = localStorage.getItem('sw_site_content');
    return data ? JSON.parse(data) : INITIAL_SITE_CONTENT;
  } catch {
    return INITIAL_SITE_CONTENT;
  }
};

export const saveStoredContent = (content: SiteContent) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sw_site_content', JSON.stringify(content));
  }
};

export const getStoredCourses = (): Course[] => {
  if (typeof window === 'undefined') return INITIAL_COURSES;
  try {
    const data = localStorage.getItem('sw_courses');
    return data ? JSON.parse(data) : INITIAL_COURSES;
  } catch {
    return INITIAL_COURSES;
  }
};

export const saveStoredCourses = (courses: Course[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sw_courses', JSON.stringify(courses));
  }
};

export const getStoredGallery = (): GalleryItem[] => {
  if (typeof window === 'undefined') return INITIAL_GALLERY;
  try {
    const data = localStorage.getItem('sw_gallery');
    return data ? JSON.parse(data) : INITIAL_GALLERY;
  } catch {
    return INITIAL_GALLERY;
  }
};

export const saveStoredGallery = (gallery: GalleryItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sw_gallery', JSON.stringify(gallery));
  }
};

export const getStoredEnquiries = (): Enquiry[] => {
  if (typeof window === 'undefined') return INITIAL_ENQUIRIES;
  try {
    const data = localStorage.getItem('sw_enquiries');
    return data ? JSON.parse(data) : INITIAL_ENQUIRIES;
  } catch {
    return INITIAL_ENQUIRIES;
  }
};

export const saveStoredEnquiries = (enquiries: Enquiry[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sw_enquiries', JSON.stringify(enquiries));
  }
};

export const addEnquiry = (newEnquiry: Omit<Enquiry, 'id' | 'timestamp' | 'status'>): Enquiry => {
  const enquiries = getStoredEnquiries();
  const created: Enquiry = {
    ...newEnquiry,
    id: `enq-${Date.now()}`,
    timestamp: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    status: 'New',
  };
  const updated = [created, ...enquiries];
  saveStoredEnquiries(updated);
  return created;
};
