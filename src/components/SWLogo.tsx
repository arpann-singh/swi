'use client';

import React from 'react';

interface SWLogoProps {
  layout?: 'horizontal' | 'vertical' | 'mark-only';
  variant?: 'dark' | 'light' | 'pink';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SWLogo: React.FC<SWLogoProps> = ({
  layout = 'horizontal',
  variant = 'dark',
  className = '',
  size = 'md',
}) => {
  const getFill = () => {
    switch (variant) {
      case 'light':
        return '#FFFFFF';
      case 'pink':
        return '#F20D63';
      case 'dark':
      default:
        return '#0B0B0D';
    }
  };

  const getSubtextFill = () => {
    switch (variant) {
      case 'light':
        return 'rgba(255,255,255,0.7)';
      case 'pink':
        return '#1749C6';
      case 'dark':
      default:
        return 'rgba(11,11,13,0.75)';
    }
  };

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return layout === 'vertical' ? 48 : 32;
      case 'lg':
        return layout === 'vertical' ? 96 : 56;
      case 'xl':
        return layout === 'vertical' ? 120 : 72;
      case 'md':
      default:
        return layout === 'vertical' ? 72 : 42;
    }
  };

  const fill = getFill();
  const subFill = getSubtextFill();
  const height = getHeight();

  if (layout === 'mark-only') {
    return (
      <svg
        height={height}
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 hover:scale-105 ${className}`}
      >
        {/* Isometric 3D Architectural Roof / Ribbon Mark */}
        {/* Left Side (S shape angle) */}
        <path
          d="M80 15 L15 50 L15 100 L42 85 L42 63 L80 40 Z"
          fill={fill}
        />
        <path
          d="M42 85 L15 100 L80 135 L80 110 L42 90 Z"
          fill={fill}
          opacity="0.9"
        />
        {/* Inner S cut out line */}
        <path
          d="M42 63 L80 40 L80 62 L58 75 L80 88 L80 110 L42 85 Z"
          fill={fill}
          opacity="0.8"
        />
        {/* Right Side (W shape angle) */}
        <path
          d="M80 15 L145 50 L145 100 L118 85 L118 63 L80 40 Z"
          fill={fill}
        />
        <path
          d="M118 85 L145 100 L80 135 L80 110 L118 90 Z"
          fill={fill}
          opacity="0.9"
        />
        {/* Accent Pink Dot/Pill */}
        <circle cx="80" cy="20" r="5" fill="#F20D63" />
      </svg>
    );
  }

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <svg
          height={height * 0.7}
          viewBox="0 0 160 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-2"
        >
          <path d="M80 15 L15 50 L15 100 L42 85 L42 63 L80 40 Z" fill={fill} />
          <path d="M42 85 L15 100 L80 135 L80 110 L42 90 Z" fill={fill} opacity="0.9" />
          <path d="M42 63 L80 40 L80 62 L58 75 L80 88 L80 110 L42 85 Z" fill={fill} opacity="0.8" />
          <path d="M80 15 L145 50 L145 100 L118 85 L118 63 L80 40 Z" fill={fill} />
          <path d="M118 85 L145 100 L80 135 L80 110 L118 90 Z" fill={fill} opacity="0.9" />
          <circle cx="80" cy="20" r="5" fill="#F20D63" />
        </svg>
        <div className="flex flex-col items-center">
          <span
            className="font-extrabold tracking-tight uppercase leading-none"
            style={{ color: fill, fontSize: `${height * 0.35}px` }}
          >
            S W Institute
          </span>
          <span
            className="font-bold tracking-widest uppercase mt-1 text-center"
            style={{ color: subFill, fontSize: `${height * 0.14}px`, letterSpacing: '0.15em' }}
          >
            SOUTH WEST INSTITUTE OF DESIGN AND INNOVATION
          </span>
        </div>
      </div>
    );
  }

  // Horizontal layout (default)
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      <svg
        height={height}
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <path d="M80 15 L15 50 L15 100 L42 85 L42 63 L80 40 Z" fill={fill} />
        <path d="M42 85 L15 100 L80 135 L80 110 L42 90 Z" fill={fill} opacity="0.9" />
        <path d="M42 63 L80 40 L80 62 L58 75 L80 88 L80 110 L42 85 Z" fill={fill} opacity="0.8" />
        <path d="M80 15 L145 50 L145 100 L118 85 L118 63 L80 40 Z" fill={fill} />
        <path d="M118 85 L145 100 L80 135 L80 110 L118 90 Z" fill={fill} opacity="0.9" />
        <circle cx="80" cy="20" r="5" fill="#F20D63" />
      </svg>
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-black tracking-tight uppercase"
            style={{ color: fill, fontSize: `${height * 0.52}px`, fontFamily: 'var(--font-heading, sans-serif)' }}
          >
            S W Institute
          </span>
          <span className="w-2 h-2 rounded-full bg-[#F20D63] animate-pulse" />
        </div>
        <span
          className="font-bold uppercase tracking-wider mt-0.5"
          style={{ color: subFill, fontSize: `${height * 0.22}px`, letterSpacing: '0.12em' }}
        >
          SOUTH WEST INSTITUTE OF DESIGN AND INNOVATION
        </span>
      </div>
    </div>
  );
};
