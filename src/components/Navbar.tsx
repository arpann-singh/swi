'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SWLogo } from './SWLogo';
import { ArrowUpRight, Home, BookOpen, Sparkles, MapPin, Send, Sun, Moon, Award } from 'lucide-react';
import { getStoredContent, saveStoredContent, applySiteTheme } from '@/lib/cms-store';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState(getStoredContent());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    const handleUpdate = () => setContent(getStoredContent());

    window.addEventListener('scroll', handleScroll);
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

  const mobileNavItems = [
    { id: 'home', label: 'HOME', href: '#', icon: Home },
    { id: 'programs', label: 'COURSES', href: '#programs', icon: BookOpen },
    { id: 'whysw', label: 'WHY SW', href: '#whysw', icon: Award },
    { id: 'gallery', label: 'WORK', href: '#gallery', icon: Sparkles },
    { id: 'contact', label: 'LOCATION', href: '#contact', icon: MapPin },
  ];

  const desktopNavLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PROGRAMS', href: '#programs' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'STUDENT WORK', href: '#gallery' },
    { label: 'WHY SW', href: '#whysw' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const isDarkMode = content.themeMode === 'dark';

  return (
    <>
      {/* MOBILE TOP HEADER: Clean SW Logo + Theme Toggle + Quick Enquire */}
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden px-5 py-3.5 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-white/10 shadow-xs flex items-center justify-between transition-colors">
        <a href="#" className="flex items-center gap-2">
          <SWLogo
            layout="horizontal"
            variant={isDarkMode ? 'light' : 'dark'}
            size="sm"
            customLogoUrl={content.logos?.mobileHeaderLogo || content.logos?.headerLogo}
          />
        </a>

        <div className="flex items-center gap-2">
          {/* Theme Quick Switcher */}
          <button
            onClick={toggleThemeMode}
            title="Toggle Light / Dark Mode"
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-white hover:scale-110 active:scale-95 transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#FFB800]" /> : <Moon className="w-4 h-4 text-[#1749C6]" />}
          </button>

          {/* Quick Enquire CTA */}
          <button
            onClick={onOpenEnquiry}
            data-cursor="ENQUIRE"
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F20D63] to-[#1749C6] text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-pink-500/20 active:scale-95 transition-all"
          >
            <span>ENQUIRE</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* DESKTOP FLOATING FROSTED GLASS PILL HEADER */}
      <header className="hidden lg:flex fixed top-5 left-0 right-0 z-40 px-8 justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full transition-all duration-500 bg-white/80 dark:bg-[#121214]/85 backdrop-blur-xl border ${
            scrolled
              ? 'border-neutral-300/80 dark:border-white/15 shadow-xl shadow-black/10'
              : 'border-white/80 dark:border-white/10 shadow-lg shadow-black/5'
          } text-neutral-900 dark:text-white`}
        >
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <SWLogo
              layout="horizontal"
              variant={isDarkMode ? 'light' : 'dark'}
              size="sm"
              customLogoUrl={content.logos?.headerLogo}
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="flex items-center gap-7 text-xs font-bold tracking-widest">
            {desktopNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-neutral-800 dark:text-neutral-200 transition-colors hover:text-[#F20D63] dark:hover:text-[#F20D63] group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#F20D63] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleThemeMode}
              title="Toggle Light / Dark Mode"
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FFB800]" /> : <Moon className="w-4 h-4 text-[#1749C6]" />}
            </button>

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
      <div className="fixed bottom-5 left-4 right-4 z-40 lg:hidden flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md bg-[#0B0B0D]/95 dark:bg-[#18181B]/95 backdrop-blur-2xl text-white border border-white/20 shadow-2xl shadow-black/70 rounded-full p-2 flex items-center justify-between gap-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3.5 rounded-full transition-all duration-300 ${
                  isActive ? 'text-[#F20D63] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActivePill"
                    className="absolute inset-0 bg-white/15 dark:bg-white/20 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 mb-0.5 relative z-10" />
                <span className="text-[9px] font-mono tracking-wider relative z-10">{item.label}</span>
              </a>
            );
          })}

          {/* Mobile Quick Enquire CTA Pill */}
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
