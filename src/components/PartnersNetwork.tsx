import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, ExternalLink, CheckCircle } from 'lucide-react';
import { Language, PartnerInstitution } from '../types';
import { partnersData } from '../data/mockDatabase';
import { translations } from '../data/translations';
import { loadCmsStore } from '../data/contentStore';

interface PartnersNetworkProps {
  currentLang: Language;
}

export const PartnersNetwork: React.FC<PartnersNetworkProps> = ({ currentLang }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [partnersList, setPartnersList] = useState<PartnerInstitution[]>(() => {
    try {
      return loadCmsStore().partners;
    } catch {
      return partnersData;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setPartnersList(loadCmsStore().partners);
    };
    window.addEventListener('pal_gc_content_updated', handleUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleUpdate);
  }, []);

  const t = translations[currentLang];

  const categories = [
    { id: 'all', label: t.partners.categories.all },
    { id: 'legal', label: t.partners.categories.legal },
    { id: 'university', label: t.partners.categories.university },
    { id: 'research_center', label: t.partners.categories.research_center },
    { id: 'civil_society', label: t.partners.categories.civil_society },
  ];

  const filteredPartners = selectedCat === 'all'
    ? partnersList
    : partnersList.filter((p) => p.category === selectedCat);

  return (
    <section className="py-20 bg-[#F7F8F6] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2 text-[#087443]">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-semibold font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'التعاون المؤسسي' : 'Institutional Cooperation'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-3">
            {t.partners.title}
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed mb-4">
            {t.partners.lead}
          </p>
          
          {/* Integrity and Formal Verification Notice */}
          <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#6B7280] leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#087443] shrink-0 mt-0.5" />
            <span>{t.partners.formalNotice}</span>
          </div>
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
                  : 'bg-white text-[#4B5563] hover:text-[#111111] border border-[#E5E7EB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-mono">
                  <span>{partner.country}</span>
                  <span className="text-[#087443] font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{currentLang === 'ar' ? `اعتماد موثق ${partner.accreditedYear}` : `Accredited ${partner.accreditedYear}`}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#111111] mb-2">
                  {partner.name[currentLang]}
                </h3>

                <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                  {partner.description[currentLang]}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs">
                <span className="text-[#6B7280]">
                  <strong className="text-[#111111]">{currentLang === 'ar' ? 'مجال التعاون: ' : 'Focus: '}</strong>
                  {partner.focusArea}
                </span>
                <span className="text-[#087443] font-mono text-[11px]">MOU APPROVED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
