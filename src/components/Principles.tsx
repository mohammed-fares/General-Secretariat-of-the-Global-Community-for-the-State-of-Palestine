import React from 'react';
import { Eye, BookOpenCheck, FileText, Globe2, Lock, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface PrinciplesProps {
  currentLang: Language;
}

export const Principles: React.FC<PrinciplesProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const items = [
    { key: 'transparency', icon: Eye, data: t.principles.items.transparency },
    { key: 'knowledge', icon: BookOpenCheck, data: t.principles.items.knowledge },
    { key: 'documentation', icon: FileText, data: t.principles.items.documentation },
    { key: 'pluralism', icon: Globe2, data: t.principles.items.pluralism },
    { key: 'privacy', icon: Lock, data: t.principles.items.privacy },
    { key: 'responsibility', icon: ShieldAlert, data: t.principles.items.responsibility },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#087443] mb-2 block font-['Cairo'] tracking-normal">
            {currentLang === 'ar' ? 'الميثاق الأخلاقي' : 'Ethical Charter'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-4">
            {t.principles.title}
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            {t.principles.subtitle}
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="p-7 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 hover:shadow-xs group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#087443] shadow-xs group-hover:bg-[#087443] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#9CA3AF]">
                    [0{idx + 1}]
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#111111] mb-2 group-hover:text-[#087443] transition-colors">
                  {item.data.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {item.data.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
