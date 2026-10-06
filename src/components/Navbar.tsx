'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SWLogo } from './SWLogo';
import {
  ArrowUpRight,
  Home,
  BookOpen,
  Sparkles,
  MapPin,
  Send,
  Sun,
  Moon,
  Award,
  Menu,
  X,
  Phone,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { getStoredContent, saveStoredContent, applySiteTheme } from '@/lib/cms-store';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(getStoredContent());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // ScrollSpy: Detect active section
      const sections = ['hero', 'about', 'programs', 'digital-marketing', 'whysw', 'gallery', 'experience', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleUpdate = () => setContent(getStoredContent());

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('sw_cms_updated', handleUpdate);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('sw_cms_updated', handleUpdate);
    };
  }, []);

  const toggleThemeMode = () => {
    const currentMode = content.themeMode || 'light';
    const nextMode: 'light' | 'dark' = currentMode === 'dark' ? 'light' : 'dark';
    const updated = { ...content, themeMode: nextMode };
    saveStoredContent(updated);
    applySiteTheme(updated);
  };

  const desktopNavLinks = [
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'programs', label: 'PROGRAMS', href: '#programs' },
    { id: 'whysw', label: 'WHY SW', href: '#whysw' },
    { id: 'gallery', label: 'WORK', href: '#gallery' },
    { id: 'experience', label: 'JOURNEY', href: '#experience' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  const mobilePillItems = [
    { id: 'hero', label: 'HOME', href: '#hero', icon: Home },
    { id: 'programs', label: 'COURSES', href: '#programs', icon: BookOpen },
    { id: 'whysw', label: 'WHY SW', href: '#whysw', icon: Award },
    { id: 'gallery', label: 'WORK', href: '#gallery', icon: Sparkles },
    { id: 'contact', label: 'LOCATION', href: '#contact', icon: MapPin },
  ];

  const fullMobileMenuLinks = [
    { label: '01. Home Banner', href: '#hero', tag: 'Top' },
    { label: '02. About & Story', href: '#about', tag: 'Philosophy' },
    { label: '03. Diploma Programs', href: '#programs', tag: 'Fashion & Interior' },
    { label: '04. Digital Marketing Included', href: '#digital-marketing', tag: 'Exclusive' },
    { label: '05. Why Choose SW', href: '#whysw', tag: 'Advantages' },
    { label: '06. Student Portfolio', href: '#gallery', tag: 'Showcase' },
    { label: '07. Student Journey', href: '#experience', tag: 'Timeline' },
    { label: '08. Campus Location & Contact', href: '#contact', tag: 'Bhilai' },
  ];

  const isDarkMode = content.themeMode === 'dark';

  return (
    <>
      {/* ======================================================== */}
      {/* 📱 MOBILE ULTRA-FROSTED TOP HEADER                       */}
      {/* ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden px-5 py-3.5 bg-white/40 dark:bg-black/40 backdrop-blur-3xl border-b border-white/50 dark:border-white/10 shadow-sm flex items-center justify-between transition-colors">
        <a href="#" className="flex items-center gap-2">
          <SWLogo
            layout="horizontal"
            variant={isDarkMode ? 'light' : 'dark'}
            size="sm"
            customLogoUrl={content.logos?.mobileHeaderLogo || content.logos?.headerLogo}
          />
        </a>

        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-500/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Admissions Open</span>
          </span>

          {/* Theme Switcher */}
          <button
            onClick={toggleThemeMode}
            title="Toggle Theme"
            className="p-2 rounded-full bg-white/60 dark:bg-white/10 text-neutral-800 dark:text-white border border-white/40 dark:border-white/15 backdrop-blur-md active:scale-90 transition-all shadow-xs"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#FFB800]" /> : <Moon className="w-4 h-4 text-[#1749C6]" />}
          </button>

          {/* Enquire CTA */}
          <button
            onClick={onOpenEnquiry}
            className="px-3.5 py-1.5 rounded-full bg-[#F20D63] text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-pink-500/30 active:scale-95 transition-transform"
          >
            <span>ENQUIRE</span>
            <Send className="w-3 h-3" />
          </button>

          {/* Drawer Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-full bg-[#0B0B0D] text-white dark:bg-white dark:text-black active:scale-90 transition-transform ml-1 shadow-md"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 💻 DESKTOP ULTRA-FROSTED LUXURY NAVIGATION BAR          */}
      {/* ======================================================== */}
      <header className="hidden lg:flex fixed top-5 left-0 right-0 z-40 px-8 justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-6 py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-white/60 dark:bg-[#0B0B0D]/70 backdrop-blur-3xl border border-white/60 dark:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] scale-[0.99]'
              : 'bg-white/50 dark:bg-[#0B0B0D]/50 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
          } text-neutral-900 dark:text-white`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group pl-2">
            <SWLogo
              layout="horizontal"
              variant={isDarkMode ? 'light' : 'dark'}
              size="sm"
              customLogoUrl={content.logos?.headerLogo}
            />
          </a>

          {/* Aesthetic Section Buttons Container */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-200/40 dark:bg-white/5 border border-white/50 dark:border-white/10 backdrop-blur-xl shadow-inner">
            {desktopNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white dark:text-black font-black'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0B0B0D] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveSectionPill"
                      className="absolute inset-0 bg-[#0B0B0D] dark:bg-white rounded-full shadow-lg"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  {isActive && <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#F20D63] animate-pulse" />}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 pr-1">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleThemeMode}
              title="Toggle Light / Dark Mode"
              className="p-2.5 rounded-full bg-white/60 dark:bg-white/10 text-neutral-800 dark:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/50 dark:border-white/15 backdrop-blur-md shadow-xs"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FFB800]" /> : <Moon className="w-4 h-4 text-[#1749C6]" />}
            </button>

            {/* Studio CMS Access Button */}
            <a
              href="/sw-studio"
              title="Master Admin CMS Portal"
              className="p-2.5 rounded-full bg-white/60 dark:bg-white/10 text-neutral-800 dark:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/50 dark:border-white/15 backdrop-blur-md shadow-xs"
            >
              <Settings className="w-4 h-4 text-[#F20D63]" />
            </a>

            {/* Professional Aesthetic ENQUIRE CTA Button */}
            <button
              onClick={onOpenEnquiry}
              data-cursor="ENQUIRE"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-[#F20D63] via-[#E00B5B] to-[#1749C6] text-white hover:shadow-xl shadow-pink-500/30 hover:scale-[1.03] active:scale-95 border border-white/30 cursor-pointer"
            >
              <span>ENQUIRE NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ======================================================== */}
      {/* 📱 MOBILE ULTRA-FROSTED BOTTOM FLOATING PILL BAR          */}
      {/* ======================================================== */}
      <div className="fixed bottom-5 left-4 right-4 z-40 lg:hidden flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm bg-[#0B0B0D]/85 dark:bg-[#161618]/85 backdrop-blur-3xl text-white border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-full p-2 flex items-center justify-between gap-1">
          {mobilePillItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-colors ${
                  isActive ? 'text-[#F20D63] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveSectionPill"
                    className="absolute inset-0 bg-white/20 dark:bg-white/25 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 mb-0.5 relative z-10" />
                <span className="text-[9px] font-mono tracking-wider relative z-10">{item.label}</span>
              </a>
            );
          })}

          {/* Quick Enquire CTA Pill */}
          <button
            onClick={onOpenEnquiry}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F20D63] text-white font-black text-[11px] uppercase tracking-wider shadow-lg shadow-pink-500/40 active:scale-95 shrink-0"
          >
            <span>ENQUIRE</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 📜 MOBILE FULL-SCREEN MENU DRAWER OVERLAY                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0B0D]/95 backdrop-blur-3xl text-white flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/15">
              <SWLogo
                layout="horizontal"
                variant="light"
                size="sm"
                customLogoUrl={content.logos?.mobileHeaderLogo || content.logos?.headerLogo}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-90 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="py-8 space-y-3">
              <p className="text-[10px] font-mono text-[#F20D63] uppercase tracking-widest font-black mb-4">
                NAVIGATION MAP • SW INSTITUTE
              </p>

              {fullMobileMenuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <span className="text-base font-black uppercase tracking-tight text-white group-hover:text-[#F20D63]">
                    {link.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{link.tag}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom Contact & Actions */}
            <div className="pt-6 border-t border-white/15 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F20D63] to-[#1749C6] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-pink-500/30 flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <span>APPLY / ENQUIRE NOW</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pt-2">
                <a href="tel:+919111333966" className="flex items-center gap-1.5 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-[#1749C6]" />
                  <span>+91 91113 33966</span>
                </a>
                <a href="/sw-studio" className="flex items-center gap-1 text-[#FFB800] font-bold">
                  <Settings className="w-3.5 h-3.5" />
                  <span>Studio CMS</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
