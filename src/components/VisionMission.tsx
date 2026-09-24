import React from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface VisionMissionProps {
  currentLang: Language;
}

export const VisionMission: React.FC<VisionMissionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-20 bg-[#F7F8F6] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vision Block */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E5E7EB] shadow-xs mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] text-[#087443] flex items-center justify-center border border-[#087443]/20">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#087443] font-['Cairo'] tracking-normal">
              {t.visionMission.visionTitle}
            </span>
          </div>
          
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#111111] leading-relaxed max-w-4xl">
            "{t.visionMission.visionStatement}"
          </blockquote>
        </div>

        {/* Mission and 8 Foundational Points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold text-[#087443] mb-2 block font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'الأهداف المؤسسية' : 'Institutional Mandate'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-4">
              {t.visionMission.missionTitle}
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed mb-6">
              {t.visionMission.missionLead}
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] text-xs text-[#6B7280] leading-relaxed">
              {currentLang === 'ar' 
                ? 'تعمل الأمانة العامة على أن تكون جسراً رقمياً ومؤسسياً بين المشاركين في مختلف الدول من خلال إتاحة المعلومات والوثائق وتعزيز الحوار والتواصل الدولي.'
                : 'The General Secretariat serves as a digital and institutional bridge connecting participants worldwide through open data, verified documentation, and structured dialogue.'}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.visionMission.points.map((point, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#087443]/30 transition-colors flex items-start gap-3.5 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#087443] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-mono text-[#9CA3AF] mb-1 block">
                      #{index + 1}
                    </span>
                    <p className="text-sm font-medium text-[#1F2937] leading-relaxed">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
