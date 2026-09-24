import React, { useState } from 'react';
import { Landmark, Scale, Globe, FileCheck2, Calendar, ExternalLink, Map, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { palestineMilestones } from '../data/mockDatabase';
import { translations } from '../data/translations';

interface StateOfPalestineProps {
  currentLang: Language;
}

export const StateOfPalestine: React.FC<StateOfPalestineProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'recognition' | 'un' | 'icj' | 'treaties'>('timeline');

  const t = translations[currentLang];

  const recognitionRegions = [
    { name: currentLang === 'ar' ? 'أوروبا' : 'Europe', count: 12, examples: ['Spain', 'Ireland', 'Norway', 'Sweden', 'Poland', 'Bulgaria', 'Cyprus', 'Malta', 'Slovenia'] },
    { name: currentLang === 'ar' ? 'آسيا' : 'Asia', count: 48, examples: ['China', 'India', 'Indonesia', 'Malaysia', 'Japan (Diplomatic Mission)', 'Saudi Arabia', 'Turkey', 'Iran'] },
    { name: currentLang === 'ar' ? 'أفريقيا' : 'Africa', count: 52, examples: ['South Africa', 'Egypt', 'Algeria', 'Nigeria', 'Senegal', 'Kenya', 'Morocco', 'Tunisia'] },
    { name: currentLang === 'ar' ? 'أمريكا اللاتينية والكاريبي' : 'Latin America & Caribbean', count: 32, examples: ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Mexico (Diplomatic Relations)', 'Cuba', 'Bolivia', 'Uruguay'] },
    { name: currentLang === 'ar' ? 'أوقيانوسيا' : 'Oceania', count: 2, examples: ['Papua New Guinea', 'Vanuatu'] },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2 text-[#087443]">
            <Landmark className="w-4 h-4" />
            <span className="text-xs font-semibold font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'الملف التوثيقي والدبلوماسي' : 'Diplomatic & Juridical Dossier'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-3">
            {t.palestine.title}
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed">
            {t.palestine.subtitle}
          </p>
        </div>

        {/* 4 Quantitative Key Metrics (Tabular numerals, unboxed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB] mb-12">
          <div className="border-s-2 border-[#087443] ps-4">
            <div className="text-3xl font-bold font-mono-num text-[#111111]">146+</div>
            <div className="text-xs text-[#6B7280] mt-1">{currentLang === 'ar' ? 'دولة تعترف رسمياً بدولة فلسطين' : 'UN Member States with Diplomatic Recognition'}</div>
          </div>
          <div className="border-s-2 border-[#087443] ps-4">
            <div className="text-3xl font-bold font-mono-num text-[#111111]">67/19</div>
            <div className="text-xs text-[#6B7280] mt-1">{currentLang === 'ar' ? 'قرار منح صفة دولة مراقب بالأمم المتحدة' : 'UNGA Resolution Observer State Status'}</div>
          </div>
          <div className="border-s-2 border-[#087443] ps-4">
            <div className="text-3xl font-bold font-mono-num text-[#111111]">1988</div>
            <div className="text-xs text-[#6B7280] mt-1">{currentLang === 'ar' ? 'إعلان الاستقلال في الجزائر' : 'Declaration of Independence (Algiers)'}</div>
          </div>
          <div className="border-s-2 border-[#087443] ps-4">
            <div className="text-3xl font-bold font-mono-num text-[#111111]">110+</div>
            <div className="text-xs text-[#6B7280] mt-1">{currentLang === 'ar' ? 'معاهدة واتفاقية دولية انضمت إليها فلسطين' : 'Multilateral Treaties & Conventions Ratified'}</div>
          </div>
        </div>

        {/* Dossier Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E5E7EB] scrollbar-none">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-[#111111] text-white'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {currentLang === 'ar' ? 'المحطات التاريخية والقرارات' : 'Historical Milestones & Decisions'}
          </button>
          <button
            onClick={() => setActiveTab('recognition')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'recognition'
                ? 'bg-[#111111] text-white'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {currentLang === 'ar' ? 'الاعتراف الدولي (146+ دولة)' : 'International Recognition (146+ States)'}
          </button>
          <button
            onClick={() => setActiveTab('un')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'un'
                ? 'bg-[#111111] text-white'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {currentLang === 'ar' ? 'مكانة فلسطين في الأمم المتحدة' : 'United Nations Standing'}
          </button>
          <button
            onClick={() => setActiveTab('icj')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'icj'
                ? 'bg-[#111111] text-white'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {currentLang === 'ar' ? 'محكمة العدل الدولية' : 'International Court of Justice (ICJ)'}
          </button>
          <button
            onClick={() => setActiveTab('treaties')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'treaties'
                ? 'bg-[#111111] text-white'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {currentLang === 'ar' ? 'المعاهدات والانضمام الدولي' : 'Multilateral Treaties'}
          </button>
        </div>

        {/* Tab 1: Timeline */}
        {activeTab === 'timeline' && (
          <div className="relative border-s-2 border-[#E5E7EB] ms-4 space-y-10 py-2">
            {palestineMilestones.map((milestone, idx) => (
              <div key={idx} className="relative ps-6 group">
                {/* Timeline dot */}
                <div className="absolute -start-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#087443] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-mono font-bold text-[#087443] block mb-1">
                  {milestone.year}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-2 leading-snug">
                  {milestone.title[currentLang]}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed max-w-3xl">
                  {milestone.desc[currentLang]}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Recognition */}
        {activeTab === 'recognition' && (
          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-[#F0FDF4] border border-[#087443]/20">
              <h3 className="text-lg font-bold text-[#087443] mb-2">
                {currentLang === 'ar' ? 'الزخم الدبلوماسي العالمي للاعتراف بدولة فلسطين' : 'Global Momentum for Diplomatic Recognition'}
              </h3>
              <p className="text-sm text-[#1F2937] leading-relaxed">
                {currentLang === 'ar'
                  ? 'تعترف رسمياً بدولة فلسطين أكثر من 146 دولة من أصل 193 دولة عضواً في منظمة الأمم المتحدة (أي أكثر من 75% من دول العالم). وقد شهد عام 2024 نقلة نوعية مع اعتراف دول أوروبية محورية هي إسبانيا، والنرويج، وأيرلندا، وسلوفينيا، ترسيخاً للحق غير القابل للتصرف في تقرير المصير وتطبيقاً لقرارات الشرعية الدولية.'
                  : 'More than 146 of the 193 UN Member States officially recognize the State of Palestine (over 75% of global membership). Key European states including Spain, Norway, Ireland, and Slovenia joined this consensus in 2024 to reinforce self-determination and multilateral legality.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recognitionRegions.map((region, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[#111111] text-base">{region.name}</h4>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white text-[#087443] border border-[#E5E7EB]">
                      {region.count} {currentLang === 'ar' ? 'دولة' : 'States'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    <span className="font-semibold text-[#111111]">{currentLang === 'ar' ? 'أمثلة بارزة: ' : 'Prominent examples: '}</span>
                    {region.examples.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: UN Standing */}
        {activeTab === 'un' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <span className="text-xs font-mono text-[#087443] font-semibold block mb-1">
                A/RES/67/19 (2012) & A/RES/ES-10/23 (2024)
              </span>
              <h3 className="text-xl font-bold text-[#111111] mb-3">
                {currentLang === 'ar' ? 'المكانة القانونية في الأمم المتحدة' : 'Legal Standing within the United Nations'}
              </h3>
              <div className="space-y-4 text-sm text-[#4B5563] leading-relaxed">
                <p>
                  {currentLang === 'ar'
                    ? 'في 29 نوفمبر 2012، اعتمدت الجمعية العامة للأمم المتحدة القرار 67/19 بأغلبية 138 صوتاً، والذي منح فلسطين مركز "دولة مراقب غير عضو" في الأمم المتحدة، وهو ما مثل اعترافاً قانونياً دولياً صريحاً بشخصية فلسطين كدولة بموجب القانون الدولي.'
                    : 'On 29 November 2012, UNGA adopted Resolution 67/19 by 138 votes, according Palestine Non-Member Observer State status, affirming international legal personality under multilateral law.'}
                </p>
                <p>
                  {currentLang === 'ar'
                    ? 'وفي 10 مايو 2024، اعتمدت الجمعية العامة بأغلبية 143 صوتاً القرار ES-10/23 الذي أقر بأن دولة فلسطين مؤهلة تماماً للعضوية الكاملة وفق المادة 4 من ميثاق الأمم المتحدة، وترقية حقوق ومزايا مشاركة دولة فلسطين في دورات وأعمال الجمعية العامة والمؤتمرات الدولية.'
                    : 'On 10 May 2024, UNGA adopted Resolution ES-10/23 by 143 votes, determining that the State of Palestine is fully qualified for admission under Article 4 of the Charter and significantly expanding participation prerogatives.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: ICJ */}
        {activeTab === 'icj' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-2 text-[#087443]">
                <Scale className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {currentLang === 'ar' ? 'قضاء محكمة العدل الدولية (لاهاي)' : 'ICJ Jurisprudence (The Hague)'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3">
                {currentLang === 'ar' ? 'الآراء الاستشارية التاريخية لمحكمة العدل الدولية' : 'Historic ICJ Advisory Opinions'}
              </h3>
              <div className="space-y-4 text-sm text-[#4B5563] leading-relaxed">
                <div className="p-4 rounded-lg bg-[#F7F8F6] border border-[#E5E7EB]">
                  <h4 className="font-bold text-[#111111] mb-1">
                    {currentLang === 'ar' ? '1. الرأي الاستشاري لعام 2024 (السياسات والممارسات)' : '1. 2024 Advisory Opinion (Policies & Practices)'}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#4B5563]">
                    {currentLang === 'ar'
                      ? 'قضت المحكمة بعدم شرعية الاحتلال المستمر ووجوب إنهائه في أسرع وقت، وإزالة المستوطنات والتعويض، وتأكيد التزام جميع الدول بعدم الاعتراف بشرعية الوضع الناشئ عنه.'
                      : 'The Court determined the ongoing presence to be unlawful, mandating swift cessation, settlement evacuation, reparations, and third-state obligations of non-recognition.'}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F7F8F6] border border-[#E5E7EB]">
                  <h4 className="font-bold text-[#111111] mb-1">
                    {currentLang === 'ar' ? '2. الرأي الاستشاري لعام 2004 (جدار الفصل العنصري)' : '2. 2004 Advisory Opinion (Construction of the Wall)'}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#4B5563]">
                    {currentLang === 'ar'
                      ? 'أكدت المحكمة عدم قانونية مسار الجدار داخل الأراضي الفلسطينية المحتلة بما فيها القدس الشرقية وانطباق اتفاقية جنيف الرابعة ومواثيق حقوق الإنسان.'
                      : 'Affirmed that the wall construction inside the Occupied Palestinian Territory including East Jerusalem violates international law and fourth Geneva Convention stipulations.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Treaties */}
        {activeTab === 'treaties' && (
          <div className="space-y-4">
            <p className="text-sm text-[#4B5563]">
              {currentLang === 'ar'
                ? 'أودعت دولة فلسطين صكوك انضمامها لأكثر من 110 معاهدة واتفاقية دولية، من أبرزها:'
                : 'The State of Palestine has deposited instruments of accession to over 110 multilateral treaties, notably:'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'نظام روما الأساسي للمحكمة الجنائية الدولية (ICC)', year: '2015', code: 'Rome Statute' },
                { title: 'اتفاقيات جنيف الأربع وبروتوكولاتها الإضافية (IHL)', year: '2014', code: 'Geneva 1949' },
                { title: 'اتفاقية لاهاي بشأن قوانين وأعراف الحرب البرية', year: '2014', code: 'Hague Regulations' },
                { title: 'العهد الدولي الخاص بالحقوق المدنية والسياسية (ICCPR)', year: '2014', code: 'UN Human Rights' },
                { title: 'العهد الدولي الخاص بالحقوق الاقتصادية والاجتماعية والثقافية', year: '2014', code: 'ICESCR' },
                { title: 'اتفاقية اليونسكو لحماية التراث العالمي الثقافي والطبيعي', year: '2011', code: 'UNESCO World Heritage' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#111111]">{item.title}</h4>
                    <span className="text-xs text-[#6B7280] font-mono">{item.code}</span>
                  </div>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-white text-[#087443] border border-[#E5E7EB]">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
