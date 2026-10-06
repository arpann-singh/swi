'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getStoredContent } from '@/lib/cms-store';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'course' | 'cta' | 'input'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [cursorStyle, setCursorStyle] = useState<'radial' | 'normal'>('radial');

  useEffect(() => {
    const updateCursorConfig = () => {
      const content = getStoredContent();
      const style = content.cursorStyle || 'radial';
      setCursorStyle(style);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-cursor-style', style);
      }
    };

    updateCursorConfig();
    window.addEventListener('sw_cms_updated', updateCursorConfig);

    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorText(cursorAttr);
        if (cursorAttr.includes('EXPLORE')) setCursorVariant('course');
        else if (cursorAttr.includes('VIEW')) setCursorVariant('hover');
        else if (cursorAttr.includes('APPLY') || cursorAttr.includes('ENQUIRE')) setCursorVariant('cta');
        else setCursorVariant('hover');
        return;
      }

      if (target.closest('input[type="text"], input[type="tel"], input[type="email"], input[type="number"], textarea')) {
        setCursorText('');
        setCursorVariant('input');
      } else if (target.closest('a, button, select, [role="button"]')) {
        setCursorText('');
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('sw_cms_updated', updateCursorConfig);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (cursorStyle === 'normal' || !isVisible) return null;

  const getDimension = () => {
    if (cursorText) return 80;
    if (cursorVariant === 'hover') return 48;
    if (cursorVariant === 'input') return 36;
    return 36; // 36px radial blur ring
  };

  const dim = getDimension();

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999] flex items-center justify-center font-bold tracking-wider text-xs uppercase"
      animate={{
        x: position.x - dim / 2,
        y: position.y - dim / 2,
        scale: 1,
      }}
      transition={{ type: 'spring', stiffness: 600, damping: 30, mass: 0.15 }}
    >
      <div
        style={{
          width: `${dim}px`,
          height: `${dim}px`,
        }}
        className={`flex items-center justify-center transition-all duration-200 rounded-full ${
          cursorText
            ? 'bg-[#F20D63] text-white shadow-2xl border border-white/40 backdrop-blur-md font-black'
            : cursorVariant === 'input'
            ? 'bg-[#F20D63]/15 border-2 border-[#F20D63] backdrop-blur-md shadow-xl backdrop-contrast-125 scale-105'
            : cursorVariant === 'hover'
            ? 'bg-[#1749C6]/20 border-2 border-[#1749C6] backdrop-blur-sm backdrop-contrast-125 shadow-lg'
            : 'bg-[#F20D63]/10 border-2 border-[#F20D63]/60 shadow-xl backdrop-blur-md backdrop-contrast-125 backdrop-brightness-105'
        }`}
      >
        {cursorText ? (
          <span className="text-[10px] text-center px-1 font-sans tracking-widest">{cursorText}</span>
        ) : cursorVariant === 'input' ? (
          <div className="w-[2.5px] h-4 bg-[#F20D63] animate-pulse rounded-full shadow-md" />
        ) : null}
      </div>
    </motion.div>
  );
};
