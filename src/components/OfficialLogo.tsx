import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { loadCmsStore } from '../data/contentStore';

interface OfficialLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showText?: boolean;
  currentLang?: Language;
  withRing?: boolean;
  customSrc?: string;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  currentLang = 'ar',
  withRing = true,
  customSrc,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    if (customSrc) return customSrc;
    try {
      return loadCmsStore().settings.officialLogoUrl || '/official-logo.jpg';
    } catch {
      return '/official-logo.jpg';
    }
  });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (customSrc) {
      setLogoSrc(customSrc);
      setImageError(false);
      return;
    }

    const handleUpdate = () => {
      try {
        const current = loadCmsStore().settings.officialLogoUrl || '/official-logo.jpg';
        setLogoSrc(current);
        setImageError(false);
      } catch {
        setLogoSrc('/official-logo.jpg');
      }
    };

    window.addEventListener('pal_gc_content_updated', handleUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleUpdate);
  }, [customSrc]);

  const sizeDimensions = {
    xs: 'w-7 h-7 min-w-[28px]',
    sm: 'w-10 h-10 min-w-[40px]',
    md: 'w-12 h-12 min-w-[48px]',
    lg: 'w-16 h-16 min-w-[64px]',
    xl: 'w-24 h-24 min-w-[96px]',
    '2xl': 'w-32 h-32 min-w-[128px]',
  };

  const currentSizeClass = sizeDimensions[size];

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      <div 
        className={`relative rounded-full overflow-hidden flex items-center justify-center bg-white ${currentSizeClass} ${
          withRing ? 'shadow-md border-2 border-[#1E3A8A]/30 ring-2 ring-[#087443]/20' : ''
        }`}
      >
        {!imageError ? (
          <img
            src={logoSrc}
            alt={currentLang === 'ar' ? 'الشعار الرسمي المعتمد للأمانة العامة للمجتمع العالمي من أجل دولة فلسطين' : 'Official Approved Seal of the General Secretariat'}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-full transform hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* High-Fidelity SVG Fallback with the exact approved visual motifs */
          <div className="w-full h-full bg-[#111827] text-white flex items-center justify-center p-1.5 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              {/* Concentric rings */}
              <circle cx="50" cy="50" r="47" stroke="#1E3A8A" strokeWidth="3" />
              <circle cx="50" cy="50" r="43" stroke="#D97706" strokeWidth="1" strokeDasharray="2 2" />
              {/* Globe grid */}
              <circle cx="50" cy="50" r="32" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.6" />
              <ellipse cx="50" cy="50" rx="16" ry="32" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="18" y1="50" x2="82" y2="50" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" />
              {/* Golden Dome of the Rock silhouette */}
              <path d="M38 52 C38 42, 62 42, 62 52 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
              <path d="M49 42 L49 37 M51 42 L51 37" stroke="#D97706" strokeWidth="1.5" />
              <path d="M50 35 C52 35, 53 37, 50 38 C48 37, 49 35, 50 35" fill="#F59E0B" />
              {/* Olive Branch right */}
              <path d="M54 58 C62 56, 70 50, 74 42" stroke="#087443" strokeWidth="2" strokeLinecap="round" />
              <circle cx="64" cy="52" r="3" fill="#087443" />
              <circle cx="70" cy="46" r="3" fill="#087443" />
              {/* Flag left */}
              <path d="M26 40 C28 50, 34 58, 42 64" stroke="#CE1126" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-start">
          <span className="font-extrabold text-sm sm:text-base text-[#111111] leading-tight font-['Cairo']">
            {currentLang === 'ar' ? 'الأمانة العامة للمجتمع العالمي' : 'General Secretariat of the Global Community'}
          </span>
          <span className="text-[11px] text-[#087443] font-bold leading-tight font-['Cairo']">
            {currentLang === 'ar' ? 'من أجل دولة فلسطين' : 'For the State of Palestine'}
          </span>
        </div>
      )}
    </div>
  );
};
