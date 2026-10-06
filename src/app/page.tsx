'use client';

import React, { useState, useEffect } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { CoursesSection } from '@/components/CoursesSection';
import { DigitalMarketingSection } from '@/components/DigitalMarketingSection';
import { WhySWSection } from '@/components/WhySWSection';
import { MadeAtSWGallery } from '@/components/MadeAtSWGallery';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { WhoCanApplySection } from '@/components/WhoCanApplySection';
import { AdmissionsSection } from '@/components/AdmissionsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { SectionDivider } from '@/components/SectionDivider';
import { EnquiryFormModal } from '@/components/EnquiryFormModal';
import {
  getStoredContent,
  getStoredCourses,
  getStoredGallery,
  applySiteTheme,
} from '@/lib/cms-store';

export default function Home() {
  const [content, setContent] = useState(getStoredContent());
  const [courses, setCourses] = useState(getStoredCourses());
  const [gallery, setGallery] = useState(getStoredGallery());
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    const refreshStore = () => {
      const updatedContent = getStoredContent();
      setContent(updatedContent);
      setCourses(getStoredCourses());
      setGallery(getStoredGallery());
      applySiteTheme(updatedContent);
    };

    refreshStore();
    window.addEventListener('sw_cms_updated', refreshStore);
    return () => window.removeEventListener('sw_cms_updated', refreshStore);
  }, []);

  const renderSectionComponent = (secId: string) => {
    switch (secId) {
      case 'hero':
        return <Hero content={content} onOpenEnquiry={() => setIsEnquiryOpen(true)} />;
      case 'about':
        return <AboutSection content={content} />;
      case 'programs':
        return <CoursesSection courses={courses} onOpenEnquiry={() => setIsEnquiryOpen(true)} />;
      case 'digital-marketing':
        return <DigitalMarketingSection content={content} />;
      case 'why-sw':
        return <WhySWSection content={content} />;
      case 'gallery':
        return <MadeAtSWGallery galleryItems={gallery} />;
      case 'experience':
        return <ExperienceTimeline />;
      case 'eligibility':
        return <WhoCanApplySection />;
      case 'admissions':
        return <AdmissionsSection onOpenEnquiry={() => setIsEnquiryOpen(true)} />;
      case 'contact':
        return <ContactSection content={content} onOpenEnquiry={() => setIsEnquiryOpen(true)} />;
      default:
        return null;
    }
  };

  const visibleSections = (content.sectionOrder || []).filter((sec) => sec.visible);

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#0B0B0D] selection:bg-[#F20D63] selection:text-white">
      {/* Custom Studio Cursor */}
      <CustomCursor />

      {/* Floating Pill Navbar */}
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Dynamic Order & Section Rendering */}
      {visibleSections.map((sec, idx) => (
        <React.Fragment key={sec.id}>
          {renderSectionComponent(sec.id)}
          {sec.dividerLabel && idx < visibleSections.length - 1 && (
            <SectionDivider label={sec.dividerLabel} />
          )}
        </React.Fragment>
      ))}

      {/* Footer */}
      <Footer />

      {/* QUICK STUDIO ENQUIRY MODAL */}
      <EnquiryFormModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </main>
  );
}
