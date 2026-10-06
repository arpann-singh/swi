'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Flame, Award } from 'lucide-react';

interface AdmissionsSectionProps {
  onOpenEnquiry: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="admissions" className="relative py-28 bg-[#F8F7F3] text-[#0B0B0D] overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#F20D63]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#1749C6]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#0B0B0D] text-white p-8 sm:p-14 md:p-20 overflow-hidden shadow-2xl border-4 border-white/20">
          {/* Inner Decorative Background Image Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
            <img
              src="/images/hero_fashion_model.jpg"
              alt="Admissions Showcase SW"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Huge Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F20D63] text-white text-xs font-mono font-bold tracking-widest uppercase shadow-lg shadow-pink-500/30">
                <Flame className="w-4 h-4 fill-current text-[#FFB800]" />
                <span>ADMISSIONS OPEN 2026 – 2027</span>
              </div>

              <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.88]">
                YOUR PASSION.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F20D63] via-[#FFB800] to-white">
                  YOUR FUTURE.
                </span>
                <span className="block text-[#1749C6]">YOUR BRAND.</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-medium leading-relaxed">
                Take the decisive step toward your creative career. Enroll in our industry-ready Diploma programs with digital marketing included.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onOpenEnquiry}
                  data-cursor="ENQUIRE"
                  className="group flex items-center gap-3 px-10 py-5 rounded-full bg-[#F20D63] text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-2xl shadow-pink-500/40 active:scale-95 cursor-pointer"
                >
                  <span>ENQUIRE ABOUT 2026 BATCHES</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Course Highlights Box */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-xs font-mono text-[#FFB800] font-bold uppercase tracking-widest">
                  PROGRAM INCLUDES
                </span>
                <Award className="w-5 h-5 text-[#F20D63]" />
              </div>

              <div className="space-y-4 text-xs font-bold">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#F20D63] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-white uppercase text-sm">Diploma in Fashion Designing</span>
                    <span className="text-neutral-400 font-normal text-[11px]">
                      Sketching, pattern drafting, draping & styling
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#1749C6] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-white uppercase text-sm">Diploma in Interior Designing</span>
                    <span className="text-neutral-400 font-normal text-[11px]">
                      Space planning, 3D visualization & furniture design
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FFB800]/20 border border-[#FFB800]/40">
                  <Sparkles className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#FFB800] uppercase text-sm">Digital Marketing Included</span>
                    <span className="text-neutral-200 font-normal text-[11px]">
                      Social media growth, branding & client acquisition
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-neutral-400 font-mono">
                  No Age Limit • 10th/12th Passouts Eligible • Bhilai Campus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
