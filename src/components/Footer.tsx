import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, Globe, Shield, Settings } from 'lucide-react';
import { Language, NavigationTab } from '../types';
import { translations } from '../data/translations';
import { OfficialLogo } from './OfficialLogo';

interface FooterProps {
  currentLang: Language;
  onNavigate: (tab: NavigationTab) => void;
  onLanguageChange: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigate,
  onLanguageChange,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#111111] text-[#D1D5DB] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <OfficialLogo size="md" withRing={true} />
              <div>
                <span className="font-semibold text-base text-white block leading-tight font-['Cairo']">
                  {t.brand.officialName}
                </span>
                <span className="text-xs text-[#34D399] font-medium tracking-wide font-['Cairo']">
                  {t.brand.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm font-['Cairo']">
              {t.brand.description}
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-[#9CA3AF]">
              <Shield className="w-3.5 h-3.5 text-[#34D399]" />
              <span className="font-['Cairo']">{t.brand.digitalNotice}</span>
            </div>
          </div>

          {/* Directory Links 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.sections}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('palestine')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.palestine}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('knowledge')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.knowledge}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('youth')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.youth}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.news}
                </button>
              </li>
            </ul>
          </div>

          {/* Directory Links 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-white transition-colors text-[#34D399] font-medium"
                >
                  {t.nav.joinNow}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('civil')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.civil}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal_status')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.legal_status}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('transparency')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.transparency}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('leadership')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.leadership}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-[#34D399] transition-colors flex items-center gap-1.5 font-bold text-[#34D399]"
                >
                  <Settings className="w-3 h-3" />
                  <span>{currentLang === 'ar' ? 'لوحة التحكم (CMS)' : 'Admin CMS'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.subscribeNewsletter}
            </h4>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={t.footer.emailPlaceholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#34D399]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-lg bg-[#087443] hover:bg-[#065F36] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t.footer.subscribeBtn}</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
              {subscribed && (
                <div className="flex items-center gap-1 text-[11px] text-[#34D399] pt-1">
                  <Check className="w-3 h-3" />
                  <span>{t.footer.subscribedSuccess}</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <div>
            <p>{t.footer.legalNotice}</p>
            <p className="mt-1 font-mono">{t.footer.rights} © 2026</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onLanguageChange('ar')}
              className={`hover:text-white ${currentLang === 'ar' ? 'text-[#34D399] font-bold' : ''}`}
            >
              العربية
            </button>
            <span>·</span>
            <button
              onClick={() => onLanguageChange('en')}
              className={`hover:text-white ${currentLang === 'en' ? 'text-[#34D399] font-bold' : ''}`}
            >
              English
            </button>
            <span>·</span>
            <button
              onClick={() => onLanguageChange('fr')}
              className={`hover:text-white ${currentLang === 'fr' ? 'text-[#34D399] font-bold' : ''}`}
            >
              Français
            </button>
            <span>·</span>
            <button
              onClick={() => onLanguageChange('es')}
              className={`hover:text-white ${currentLang === 'es' ? 'text-[#34D399] font-bold' : ''}`}
            >
              Español
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
