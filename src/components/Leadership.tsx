import React, { useState } from 'react';
import { UserCheck, Shield, Award, Calendar, BookOpen } from 'lucide-react';
import { Language, LeaderProfile } from '../types';
import { leadershipData } from '../data/mockDatabase';
import { translations } from '../data/translations';

interface LeadershipProps {
  currentLang: Language;
}

export const Leadership: React.FC<LeadershipProps> = ({ currentLang }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const t = translations[currentLang];

  const categories = [
    { id: 'all', label: t.leadership.categories.all },
    { id: 'secretary_general', label: t.leadership.categories.secretary_general },
    { id: 'executive', label: t.leadership.categories.executive },
    { id: 'committee', label: t.leadership.categories.committee },
  ];

  const filteredLeaders = selectedCat === 'all'
    ? leadershipData
    : leadershipData.filter((l) => l.category === selectedCat);

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2 text-[#087443]">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-semibold font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'الهيكل القيادي' : 'Executive Governance'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-3">
            {t.leadership.title}
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed">
            {t.leadership.lead}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E5E7EB] scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCat === cat.id
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-[#F7F8F6] text-[#4B5563] hover:text-[#111111] border border-[#E5E7EB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLeaders.map((lead) => (
            <div
              key={lead.id}
              className="p-6 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-mono">
                  <span className="text-[#087443] font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{lead.jurisdiction[currentLang]}</span>
                  </span>
                  <span>{currentLang === 'ar' ? `تاريخ التكليف: ${lead.appointedDate}` : `Appointed: ${lead.appointedDate}`}</span>
                </div>

                <h3 className="text-xl font-bold text-[#111111] mb-1">
                  {lead.name[currentLang]}
                </h3>

                <div className="text-xs font-semibold text-[#087443] mb-4">
                  {lead.role[currentLang]}
                </div>

                <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                  {lead.bio[currentLang]}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                <span>{currentLang === 'ar' ? 'الوضع الإداري: معتمد رسمياً' : 'Status: Accredited by Council'}</span>
                <span className="font-mono text-[#087443]">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
