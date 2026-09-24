import React from 'react';
import { Scale, Archive, GraduationCap, Radio, Users } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WhySecretariatProps {
  currentLang: Language;
}

export const WhySecretariat: React.FC<WhySecretariatProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const pillarIcons = [
    Scale,
    Archive,
    GraduationCap,
    Radio,
    Users,
  ];

  const pillarsList = [
    t.why.pillars.legal,
    t.why.pillars.history,
    t.why.pillars.research,
    t.why.pillars.media,
    t.why.pillars.civil,
  ];

  return (
    <section id="why-secretariat" className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold text-[#087443] mb-2 block font-['Cairo'] tracking-normal">
            {currentLang === 'ar' ? 'الرسالة التأسيسية' : 'Foundational Mandate'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-4">
            {t.why.title}
          </h2>
          <p className="text-lg text-[#374151] leading-relaxed mb-6 font-medium">
            {t.why.lead}
          </p>
          <div className="space-y-4 text-base text-[#4B5563] leading-relaxed border-s-2 border-[#087443] ps-4">
            <p>{t.why.p1}</p>
            <p>{t.why.p2}</p>
          </div>
        </div>

        {/* 5 Multidisciplinary Pillars: Clean editorial cards without pill badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {pillarsList.map((pillar, idx) => {
            const Icon = pillarIcons[idx];
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB] hover:border-[#087443]/40 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#087443] shadow-xs group-hover:bg-[#087443] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#9CA3AF]">
                    0{idx + 1}.
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#111111] mb-2 group-hover:text-[#087443] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}

          {/* Institutional Integrity Summary Card */}
          <div className="p-6 rounded-xl bg-[#111111] text-white flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#34D399] uppercase tracking-wider block mb-2">
                {currentLang === 'ar' ? 'إطار العمل' : 'Working Framework'}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">
                {currentLang === 'ar' ? 'منهجية المصادر الموثقة' : 'Verified Sources Protocol'}
              </h3>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                {currentLang === 'ar'
                  ? 'تعتمد المنصة على معايير صارمة في التحقق والأرشفة الرقمية وفق الاتفاقيات الدولية وقرارات الشرعية الدولية.'
                  : 'The platform operates under strict verification protocols rooted in international conventions and multilateral resolutions.'}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>{currentLang === 'ar' ? 'حيادية مؤسسية' : 'Institutional Integrity'}</span>
              <span className="text-[#34D399]">100% {currentLang === 'ar' ? 'موثق' : 'Verified'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
