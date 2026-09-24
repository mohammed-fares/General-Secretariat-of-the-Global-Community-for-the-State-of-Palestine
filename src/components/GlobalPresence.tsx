import React, { useState } from 'react';
import { Globe, MapPin, Users, Calendar, Building2, ChevronRight, X } from 'lucide-react';
import { CountryStat, Language, NavigationTab } from '../types';
import { countriesData } from '../data/mockDatabase';
import { translations } from '../data/translations';

interface GlobalPresenceProps {
  currentLang: Language;
  onNavigate?: (tab: NavigationTab) => void;
}

export const GlobalPresence: React.FC<GlobalPresenceProps> = ({ currentLang, onNavigate }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryStat>(countriesData[0]);
  const [filterRegion, setFilterRegion] = useState<string>('all');
  
  const t = translations[currentLang];

  const regions = [
    { id: 'all', label: currentLang === 'ar' ? 'جميع الأقاليم' : 'All Regions' },
    { id: 'Middle East', label: currentLang === 'ar' ? 'الشرق الأوسط' : 'Middle East' },
    { id: 'Europe', label: currentLang === 'ar' ? 'أوروبا' : 'Europe' },
    { id: 'Africa', label: currentLang === 'ar' ? 'أفريقيا' : 'Africa' },
    { id: 'Asia', label: currentLang === 'ar' ? 'آسيا' : 'Asia' },
    { id: 'Latin America', label: currentLang === 'ar' ? 'أمريكا اللاتينية' : 'Latin America' },
    { id: 'North America', label: currentLang === 'ar' ? 'أمريكا الشمالية' : 'North America' },
  ];

  const filteredCountries = filterRegion === 'all' 
    ? countriesData 
    : countriesData.filter((c) => c.region.includes(filterRegion));

  // Compute total counts dynamically from dataset
  const totalMembers = countriesData.reduce((acc, c) => acc + c.membersCount, 0);
  const totalEvents = countriesData.reduce((acc, c) => acc + c.eventsCount, 0);
  const totalPartners = countriesData.reduce((acc, c) => acc + c.partnersCount, 0);

  return (
    <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
      {/* Background subtle starry/map lattice pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#34D399_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#34D399] mb-3 font-['Cairo'] tracking-normal">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-['Cairo']">{t.presence.title}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            {t.presence.subtitle}
          </h2>
          <p className="text-xs text-[#9CA3AF] font-['Cairo']">
            {t.presence.realDataNotice}
          </p>
        </div>

        {/* Real Dynamic Stats Strip (tabular numerals) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 border-y border-white/10 py-6">
          <div className="text-center px-4">
            <div className="text-3xl sm:text-4xl font-bold text-white font-mono-num mb-1">
              84
            </div>
            <div className="text-xs text-[#9CA3AF]">{t.presence.stats.countries}</div>
          </div>
          <div className="text-center px-4 border-s border-white/10">
            <div className="text-3xl sm:text-4xl font-bold text-[#34D399] font-mono-num mb-1">
              {totalMembers.toLocaleString()}
            </div>
            <div className="text-xs text-[#9CA3AF]">{t.presence.stats.members}</div>
          </div>
          <div className="text-center px-4 border-s border-white/10">
            <div className="text-3xl sm:text-4xl font-bold text-white font-mono-num mb-1">
              {totalEvents.toLocaleString()}
            </div>
            <div className="text-xs text-[#9CA3AF]">{t.presence.stats.events}</div>
          </div>
          <div className="text-center px-4 border-s border-white/10">
            <div className="text-3xl sm:text-4xl font-bold text-white font-mono-num mb-1">
              1,280
            </div>
            <div className="text-xs text-[#9CA3AF]">{t.presence.stats.documents}</div>
          </div>
          <div className="text-center px-4 col-span-2 md:col-span-1 border-t md:border-t-0 md:border-s border-white/10">
            <div className="text-3xl sm:text-4xl font-bold text-white font-mono-num mb-1">
              4
            </div>
            <div className="text-xs text-[#9CA3AF]">{t.presence.stats.languages} (AR, EN, FR, ES)</div>
          </div>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setFilterRegion(reg.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterRegion === reg.id
                  ? 'bg-[#087443] text-white shadow-xs'
                  : 'bg-white/5 text-[#D1D5DB] hover:bg-white/10'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Interactive World Canvas with stylized SVG points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Map Representation (8 Cols) */}
          <div className="lg:col-span-8 bg-[#18181B] rounded-2xl border border-white/10 p-4 sm:p-8 relative min-h-[380px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
            
            {/* World Map SVG Silhouette */}
            <svg 
              className="w-full h-auto opacity-20 pointer-events-none select-none max-h-[420px]" 
              viewBox="0 0 1000 500" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="1.2"
            >
              {/* Simplified world continents outlines */}
              {/* North America */}
              <path d="M150 100 Q 180 80, 240 90 T 290 140 T 240 220 T 180 200 T 120 140 Z" fill="#27272A" />
              {/* South America */}
              <path d="M260 260 Q 320 270, 340 330 T 310 440 T 260 410 T 240 310 Z" fill="#27272A" />
              {/* Europe */}
              <path d="M460 90 Q 530 80, 560 120 T 520 180 T 450 160 Z" fill="#27272A" />
              {/* Africa */}
              <path d="M470 180 Q 560 180, 580 260 T 550 380 T 480 340 T 450 240 Z" fill="#27272A" />
              {/* Asia */}
              <path d="M570 90 Q 750 70, 850 140 T 820 280 T 670 250 T 580 180 Z" fill="#27272A" />
              {/* Australia */}
              <path d="M780 340 Q 860 330, 880 380 T 820 440 T 760 390 Z" fill="#27272A" />
            </svg>

            {/* Interactive Pins on Map */}
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry.code === country.code;
              return (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                  style={{ left: `${country.x}%`, top: `${country.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group p-2 focus:outline-none focus:ring-2 focus:ring-[#34D399] rounded-full transition-all duration-200 ${
                    isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                  }`}
                  aria-label={country.name[currentLang]}
                >
                  <span className="relative flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center">
                    {isSelected && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 border ${
                        isSelected
                          ? 'bg-[#34D399] border-white ring-2 ring-[#087443]'
                          : 'bg-[#087443] border-[#34D399] hover:bg-[#34D399]'
                      }`}
                    ></span>
                  </span>

                  {/* Tooltip on Hover */}
                  <span className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 border border-white/10 shadow-sm">
                    {country.name[currentLang]} ({country.membersCount})
                  </span>
                </button>
              );
            })}

            {/* Palestine High-Intensity Pulsing Pin */}
            <div 
              style={{ left: '56.5%', top: '39%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CE1126] opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CE1126] border border-white"></span>
              </span>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-3 start-4 flex items-center gap-4 text-[11px] text-[#9CA3AF] bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CE1126]"></span>
                <span>{currentLang === 'ar' ? 'فلسطين' : 'Palestine'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399]"></span>
                <span>{currentLang === 'ar' ? 'مراكز النشاط المجتمعي' : 'Community Nodes'}</span>
              </span>
            </div>
          </div>

          {/* Country Activity Detail Drawer (4 Cols) */}
          <div className="lg:col-span-4 bg-[#18181B] rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#34D399]" />
                  <span className="text-xs uppercase tracking-wider text-[#9CA3AF]">
                    {t.presence.selectedCountry}
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                  {selectedCountry.code}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedCountry.name[currentLang]}
              </h3>
              <p className="text-xs text-[#9CA3AF] mb-6">
                {currentLang === 'ar' ? `إقليم: ${selectedCountry.region}` : `Region: ${selectedCountry.region}`}
              </p>

              {/* Country Metric Cards */}
              <div className="space-y-3.5 mb-6">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
                    <Users className="w-4 h-4 text-[#34D399]" />
                    <span>{t.presence.activeMembers}</span>
                  </div>
                  <span className="font-mono-num text-sm font-semibold text-white">
                    {selectedCountry.membersCount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
                    <Calendar className="w-4 h-4 text-[#60A5FA]" />
                    <span>{t.presence.activeEvents}</span>
                  </div>
                  <span className="font-mono-num text-sm font-semibold text-white">
                    {selectedCountry.eventsCount}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
                    <Building2 className="w-4 h-4 text-[#FBBF24]" />
                    <span>{t.presence.partnerOrgs}</span>
                  </div>
                  <span className="font-mono-num text-sm font-semibold text-white">
                    {selectedCountry.partnersCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => onNavigate && onNavigate('civil')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#087443] hover:bg-[#065F36] text-white text-xs font-semibold transition-colors"
              >
                <span>{t.presence.viewRegion}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
