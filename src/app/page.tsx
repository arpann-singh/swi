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
} from '@/lib/cms-store';

export default function Home() {
  const [content, setContent] = useState(getStoredContent());
  const [courses, setCourses] = useState(getStoredCourses());
  const [gallery, setGallery] = useState(getStoredGallery());
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    // Refresh content from local storage or remote
    setContent(getStoredContent());
    setCourses(getStoredCourses());
    setGallery(getStoredGallery());
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#0B0B0D] selection:bg-[#F20D63] selection:text-white">
      {/* Custom Studio Cursor */}
      <CustomCursor />

      {/* Floating Pill Navbar */}
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* 1. HERO SECTION */}
      <Hero content={content} onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <SectionDivider label="WHO WE ARE • OUR PHILOSOPHY" />

      {/* 2. ABOUT SECTION */}
      <AboutSection content={content} />

      <SectionDivider label="THE CREATIVE PATH • PROGRAMS" />

      {/* 3. COURSES SECTION */}
      <CoursesSection
        courses={courses}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      <SectionDivider label="EXCLUSIVE • DIGITAL MARKETING INCLUDED" />

      {/* 4. DIGITAL MARKETING INCLUDED FEATURE */}
      <DigitalMarketingSection />

      <SectionDivider label="THE SW ADVANTAGE • WHY CHOOSE US" />

      {/* 5. WHY CHOOSE SW INSTITUTE */}
      <WhySWSection />

      <SectionDivider label="MADE AT SW • STUDENT SHOWCASE" />

      {/* 6. MADE AT SW GALLERY */}
      <MadeAtSWGallery galleryItems={gallery} />

      <SectionDivider label="THE SW EXPERIENCE • 6-STAGE JOURNEY" />

      {/* 7. THE SW EXPERIENCE TIMELINE */}
      <ExperienceTimeline />

      <SectionDivider label="ELIGIBILITY • WHO CAN JOIN" />

      {/* 8. WHO CAN APPLY? */}
      <WhoCanApplySection />

      <SectionDivider label="STUDIO ENQUIRY • START YOUR JOURNEY" />

      {/* 9. STUDIO ENQUIRY CTA */}
      <AdmissionsSection onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      <SectionDivider label="VISIT OUR CAMPUS • BHILAI" />

      {/* 10. CONTACT & MAP */}
      <ContactSection
        content={content}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* 11. FOOTER */}
      <Footer />

      {/* QUICK STUDIO ENQUIRY MODAL */}
      <EnquiryFormModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </main>
  );
}
