import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, UserPlus } from 'lucide-react';
import { Language, NavigationTab } from '../types';
import { translations } from '../data/translations';
import { OfficialLogo } from './OfficialLogo';
import { loadCmsStore, SiteSettings } from '../data/contentStore';

interface HeroProps {
  currentLang: Language;
  onNavigate: (tab: NavigationTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onNavigate }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      return loadCmsStore().settings;
    } catch {
      return {} as SiteSettings;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        setSettings(loadCmsStore().settings);
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('pal_gc_content_updated', handleUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleUpdate);
  }, []);

  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const heroTagline = currentLang === 'ar' ? (settings.heroTaglineAr || t.hero.tagline) : t.hero.tagline;
  const heroTitle = currentLang === 'ar' ? (settings.heroTitleAr || t.hero.title) : t.hero.title;
  const heroDescription = currentLang === 'ar' ? (settings.heroDescAr || t.hero.description) : t.hero.description;

  return (
    <section className="relative overflow-hidden bg-[#111111] text-white">
      {/* Background with measured scrim overlay for minimum 4.5:1 contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_diplomatic_assembly_1790271746610.jpg"
          alt="International Diplomatic Assembly"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle geometric grid & gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/20 via-[#111111]/70 to-[#111111]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-3xl">
          
          {/* Official Emblem & Secondary Visual Tagline */}
          <div className="flex items-center gap-4 mb-6">
            <OfficialLogo size="lg" withRing={true} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#34D399] tracking-normal font-['Cairo']">
                {currentLang === 'ar' ? 'الهيئة الدولية المدنية المعتمدة' : 'Official Multilateral Civic Framework'}
              </span>
              <span className="text-sm font-semibold text-white font-['Cairo']">
                {heroTagline}
              </span>
            </div>
          </div>

          {/* Official Name Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            {heroTitle}
          </h1>

          {/* Official Description */}
          <p className="text-base sm:text-lg lg:text-xl text-[#D1D5DB] leading-relaxed mb-10 max-w-2xl font-light">
            {heroDescription}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={() => onNavigate('membership')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#087443] hover:bg-[#065F36] text-white font-semibold text-sm sm:text-base shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#34D399]"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.hero.membershipBtn}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                const element = document.getElementById('why-secretariat');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('about');
                }
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm sm:text-base border border-white/20 transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <BookOpen className="w-4 h-4 text-[#D1D5DB]" />
              <span>{t.hero.exploreBtn}</span>
            </button>
          </div>

          {/* Recurrent Conceptual Anchors: World · Knowledge · Dialogue · Palestine */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#9CA3AF]">
            <span className="text-white font-medium">{t.hero.coreConcepts.world}</span>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white font-medium">{t.hero.coreConcepts.knowledge}</span>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white font-medium">{t.hero.coreConcepts.connection}</span>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-[#34D399] font-medium">{t.hero.coreConcepts.palestine}</span>
          </div>

        </div>
      </div>
    </section>
  );
};
