'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SWLogo } from './SWLogo';
import { ArrowUpRight, Home, BookOpen, Sparkles, PhoneCall, Send, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileNavItems = [
    { id: 'home', label: 'HOME', href: '#', icon: Home },
    { id: 'programs', label: 'COURSES', href: '#programs', icon: BookOpen },
    { id: 'gallery', label: 'WORK', href: '#gallery', icon: Sparkles },
    { id: 'contact', label: 'CAMPUS', href: '#contact', icon: MapPin },
  ];

  const desktopNavLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PROGRAMS', href: '#programs' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'STUDENT WORK', href: '#gallery' },
    { label: 'WHY SW', href: '#whysw' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      {/* MOBILE TOP HEADER: Clean SW Logo Header */}
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden px-4 py-3 bg-white/85 backdrop-blur-md border-b border-neutral-200/70 shadow-xs flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <SWLogo layout="horizontal" variant="dark" size="sm" />
        </a>
        <button
          onClick={onOpenEnquiry}
          data-cursor="ENQUIRE"
          className="px-3.5 py-1.5 rounded-full bg-[#F20D63] text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md active:scale-95"
        >
          <span>ENQUIRE</span>
          <Send className="w-3 h-3" />
        </button>
      </header>

      {/* DESKTOP FLOATING FROSTED GLASS PILL HEADER */}
      <header className="hidden lg:flex fixed top-5 left-0 right-0 z-40 px-8 justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full transition-all duration-500 bg-white/75 backdrop-blur-xl border ${
            scrolled
              ? 'border-neutral-300/80 shadow-xl shadow-black/10'
              : 'border-white/80 shadow-lg shadow-black/5'
          } text-[#0B0B0D]`}
        >
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <SWLogo layout="horizontal" variant="dark" size="sm" />
          </a>

          {/* Desktop Nav Links */}
          <div className="flex items-center gap-7 text-xs font-bold tracking-widest">
            {desktopNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-neutral-800 transition-colors hover:text-[#F20D63] group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F20D63] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEnquiry}
              data-cursor="ENQUIRE"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 bg-[#F20D63] text-white hover:bg-[#0B0B0D] hover:text-white hover:shadow-lg shadow-pink-500/25 active:scale-95 cursor-pointer"
            >
              <span>ENQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE BOTTOM FLOATING PILL NAVIGATION BAR */}
      <div className="fixed bottom-4 left-3 right-3 z-40 lg:hidden flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md bg-[#0B0B0D]/90 backdrop-blur-xl text-white border border-white/20 rounded-full p-1.5 shadow-2xl shadow-black/50 flex items-center justify-between">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-white/15 text-[#F20D63] font-bold scale-105'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] font-mono tracking-wider">{item.label}</span>
              </a>
            );
          })}

          {/* Mobile Enquire CTA Pill */}
          <button
            onClick={onOpenEnquiry}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F20D63] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/40 active:scale-95 shrink-0"
          >
            <span>ENQUIRE</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
