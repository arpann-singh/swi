'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Briefcase, RefreshCw, Heart, CheckCircle2 } from 'lucide-react';

export const WhoCanApplySection: React.FC = () => {
  const categories = [
    { title: 'School Passouts', desc: '10th or 12th completed students ready for a creative career.', icon: GraduationCap },
    { title: 'Career Switchers', desc: 'Professionals moving into fashion or interior design.', icon: RefreshCw },
    { title: 'Working Professionals', desc: 'Upskilling in digital marketing and space visualization.', icon: Briefcase },
    { title: 'Creative Enthusiasts', desc: 'Homemakers and entrepreneurs launching their studio.', icon: Heart },
  ];

  return (
    <section className="relative py-20 bg-[#F8F7F3] text-[#0B0B0D] overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#F20D63]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white border-2 border-neutral-200 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F20D63] tracking-widest uppercase mb-3 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>STUDIO ELIGIBILITY & ENROLMENT</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-[#0B0B0D]">
              WHO CAN <span className="text-[#F20D63]">ENQUIRE & JOIN?</span>
            </h2>
            <div className="mt-4 inline-block px-6 py-2.5 rounded-full bg-[#0B0B0D] text-white font-black text-xs uppercase tracking-widest shadow-lg">
              ANYONE WHO HAS PASSED 10TH OR 12TH — NO MATTER YOUR AGE!
            </div>
          </div>

          {/* 4 Demographics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-[#F8F7F3] border border-neutral-200 hover:border-[#F20D63] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F20D63]/10 text-[#F20D63] flex items-center justify-center mb-4 group-hover:bg-[#F20D63] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase text-[#0B0B0D] mb-1">{cat.title}</h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">{cat.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-neutral-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F20D63]" />
              <span>No Prior Portfolio Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
              <span>Flexible Morning & Afternoon Batches</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1749C6]" />
              <span>Free Personal Brand Counseling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
