import React, { useState, useRef, useEffect } from 'react';
import { Globe, Menu, X, User, ShieldCheck, ChevronDown, Settings } from 'lucide-react';
import { Language, NavigationTab, MemberProfile } from '../types';
import { translations } from '../data/translations';
import { OfficialLogo } from './OfficialLogo';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  member: MemberProfile | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onNavigate,
  member,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];

  // Close more dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇵🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E7EB] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ZONE 1: BRAND (Single text element wordmark + clean geometric emblem) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-start group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087443]"
            >
              {/* Dignified Institutional Emblem: Official Approved Seal */}
              <OfficialLogo size="sm" withRing={true} />

              {/* Single Wordmark text element */}
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg text-[#111111] tracking-tight leading-tight group-hover:text-[#087443] transition-colors font-['Cairo']">
                  {currentLang === 'ar' ? 'الأمانة العامة للمجتمع العالمي' : 'General Secretariat'}
                </span>
                <span className="text-[11px] text-[#087443] font-semibold leading-tight hidden sm:inline font-['Cairo']">
                  {currentLang === 'ar' ? 'من أجل دولة فلسطين' : 'For the State of Palestine'}
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-[#4B5563]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#111111] transition-colors pb-1 border-b-2 ${
                activeTab === 'home' ? 'text-[#087443] border-[#087443] font-bold' : 'border-transparent'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#111111] transition-colors pb-1 border-b-2 ${
                activeTab === 'about' ? 'text-[#087443] border-[#087443] font-bold' : 'border-transparent'
              }`}
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('palestine')}
              className={`hover:text-[#111111] transition-colors pb-1 border-b-2 ${
                activeTab === 'palestine' ? 'text-[#087443] border-[#087443] font-bold' : 'border-transparent'
              }`}
            >
              {t.nav.palestine}
            </button>
            <button
              onClick={() => handleNavClick('knowledge')}
              className={`hover:text-[#111111] transition-colors pb-1 border-b-2 ${
                activeTab === 'knowledge' ? 'text-[#087443] border-[#087443] font-bold' : 'border-transparent'
              }`}
            >
              {t.nav.knowledge}
            </button>
            <button
              onClick={() => handleNavClick('youth')}
              className={`hover:text-[#111111] transition-colors pb-1 border-b-2 ${
                activeTab === 'youth' ? 'text-[#087443] border-[#087443] font-bold' : 'border-transparent'
              }`}
            >
              {t.nav.youth}
            </button>
            <button
              onClick={() => handleNavClick('news')}
              className={`hover:text-[#111111] transition-colors pb-1 border-b-2 ${
                activeTab === 'news' ? 'text-[#087443] border-[#087443] font-bold' : 'border-transparent'
              }`}
            >
              {t.nav.news}
            </button>

            {/* More Menu Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 hover:text-[#111111] transition-colors pb-1 border-b-2 ${
                  ['civil', 'legal_status', 'transparency', 'leadership'].includes(activeTab)
                    ? 'text-[#087443] border-[#087443] font-bold'
                    : 'border-transparent'
                }`}
              >
                <span>{t.nav.more}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div className={`absolute mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-50 ${
                  currentLang === 'ar' ? 'left-0' : 'right-0'
                }`}>
                  <button
                    onClick={() => handleNavClick('civil')}
                    className={`w-full text-start px-4 py-2 text-xs transition-colors ${
                      activeTab === 'civil' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {t.nav.civil}
                  </button>
                  <button
                    onClick={() => handleNavClick('legal_status')}
                    className={`w-full text-start px-4 py-2 text-xs transition-colors ${
                      activeTab === 'legal_status' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {t.nav.legal_status}
                  </button>
                  <button
                    onClick={() => handleNavClick('transparency')}
                    className={`w-full text-start px-4 py-2 text-xs transition-colors ${
                      activeTab === 'transparency' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {t.nav.transparency}
                  </button>
                  <button
                    onClick={() => handleNavClick('leadership')}
                    className={`w-full text-start px-4 py-2 text-xs transition-colors ${
                      activeTab === 'leadership' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {t.nav.leadership}
                  </button>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className={`w-full text-start px-4 py-2 text-xs transition-colors flex items-center justify-between border-t border-[#E5E7EB] mt-1 pt-2 font-bold ${
                      activeTab === 'admin' ? 'bg-[#087443] text-white' : 'text-[#087443] hover:bg-[#F0FDF4]'
                    }`}
                  >
                    <span>{currentLang === 'ar' ? 'لوحة التحكم (CMS)' : 'Admin Control Panel'}</span>
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* ZONE 3: PRIMARY ACTIONS (Language selector + CMS + Membership CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Control Panel Shortcut */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors border ${
                activeTab === 'admin'
                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                  : 'bg-white text-[#374151] border-[#E5E7EB] hover:bg-[#F3F4F6] hover:text-[#087443]'
              }`}
              title={currentLang === 'ar' ? 'لوحة التحكم وإدارة المحتوى' : 'Admin Control Panel'}
            >
              <Settings className="w-3.5 h-3.5 text-[#087443]" />
              <span className="hidden md:inline font-['Cairo']">{currentLang === 'ar' ? 'لوحة التحكم' : 'CMS'}</span>
            </button>
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors border border-[#E5E7EB]"
                title="Change Language"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>{languages.find((l) => l.code === currentLang)?.flag}</span>
                <span className="hidden sm:inline font-mono">{currentLang.toUpperCase()}</span>
              </button>

              {langDropdownOpen && (
                <div 
                  className={`absolute mt-2 w-36 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-50 ${
                    currentLang === 'ar' ? 'left-0' : 'right-0'
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-start transition-colors ${
                        currentLang === lang.code
                          ? 'bg-[#F0FDF4] text-[#087443] font-semibold'
                          : 'text-[#374151] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {currentLang === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-[#087443]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Member Action: If logged in, Member Dashboard; otherwise, Join Button */}
            {member && member.isLoggedIn ? (
              <button
                onClick={() => handleNavClick('member_dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'member_dashboard'
                    ? 'bg-[#087443] text-white shadow-sm'
                    : 'bg-[#111111] text-white hover:bg-[#222222]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[100px] truncate">{member.name.split(' ')[0]}</span>
                <ShieldCheck className="w-3 h-3 text-[#34D399]" />
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('membership')}
                className="px-3.5 py-2 text-xs font-semibold rounded-md bg-[#087443] text-white hover:bg-[#076138] transition-colors whitespace-nowrap shadow-sm"
              >
                {t.nav.joinNow}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'home' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'about' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('palestine')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'palestine' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.palestine}
          </button>
          <button
            onClick={() => handleNavClick('knowledge')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'knowledge' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.knowledge}
          </button>
          <button
            onClick={() => handleNavClick('youth')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'youth' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.youth}
          </button>
          <button
            onClick={() => handleNavClick('news')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'news' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.news}
          </button>
          <button
            onClick={() => handleNavClick('civil')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'civil' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.civil}
          </button>
          <button
            onClick={() => handleNavClick('legal_status')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'legal_status' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.legal_status}
          </button>
          <button
            onClick={() => handleNavClick('transparency')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'transparency' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.transparency}
          </button>
          <button
            onClick={() => handleNavClick('leadership')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm ${
              activeTab === 'leadership' ? 'bg-[#F0FDF4] text-[#087443] font-semibold' : 'text-[#374151]'
            }`}
          >
            {t.nav.leadership}
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full text-start px-3 py-2 rounded-md text-sm flex items-center justify-between font-bold ${
              activeTab === 'admin' ? 'bg-[#087443] text-white' : 'bg-[#F0FDF4] text-[#087443]'
            }`}
          >
            <span>{currentLang === 'ar' ? 'لوحة التحكم وإدارة المحتوى' : 'Admin Control Panel'}</span>
            <Settings className="w-4 h-4" />
          </button>
          <div className="pt-2 border-t border-[#E5E7EB]">
            {member && member.isLoggedIn ? (
              <button
                onClick={() => handleNavClick('member_dashboard')}
                className="w-full text-center px-4 py-2.5 rounded-md bg-[#111111] text-white text-sm font-medium"
              >
                {t.nav.dashboard} ({member.name})
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('membership')}
                className="w-full text-center px-4 py-2.5 rounded-md bg-[#087443] text-white text-sm font-semibold"
              >
                {t.nav.joinNow}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
