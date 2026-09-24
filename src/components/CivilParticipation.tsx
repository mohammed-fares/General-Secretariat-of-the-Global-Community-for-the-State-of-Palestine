import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Globe2, 
  Download, 
  Users, 
  CheckCircle2, 
  FileText, 
  Search,
  Filter,
  Check
} from 'lucide-react';
import { GlobalEvent, Language, MemberProfile } from '../types';
import { eventsData } from '../data/mockDatabase';
import { translations } from '../data/translations';
import { loadCmsStore } from '../data/contentStore';

interface CivilParticipationProps {
  currentLang: Language;
  member: MemberProfile | null;
  onRsvp: (eventId: string) => void;
}

export const CivilParticipation: React.FC<CivilParticipationProps> = ({
  currentLang,
  member,
  onRsvp,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'events' | 'initiatives' | 'resources' | 'guidelines'>('events');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [searchEvent, setSearchEvent] = useState<string>('');
  const [eventsList, setEventsList] = useState<GlobalEvent[]>(() => {
    try {
      return loadCmsStore().events;
    } catch {
      return eventsData;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setEventsList(loadCmsStore().events);
    };
    window.addEventListener('pal_gc_content_updated', handleUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleUpdate);
  }, []);

  const t = translations[currentLang];

  const initiatives = [
    {
      id: 'init-01',
      title: { ar: 'مبادرة التوثيق الأرشيفي لملكية الأراضي والخرائط التاريخية', en: 'Cartographic Archival Initiative for Historical Land Deeds', fr: 'Projet de Sauvegarde Numérique du Cadastre Historique', es: 'Iniciativa Archivística de Títulos Históricos de Propiedad' },
      lead: { ar: 'ائتلاف باحثي التاريخ والقانون', en: 'Historians & Jurists Consortium', fr: 'Consortium d\'Historiens et de Juristes', es: 'Consorcio de Historiadores y Juristas' },
      focus: { ar: 'رقمنة سجلات المساحة والأطالس قبل عام 1948 وتوفيرها للباحثين', en: 'Digitizing pre-1948 village statistics and land surveys for open scholarship', fr: 'Numérisation des recensements fonciers antérieurs à 1948', es: 'Digitalización de censos y registros parcelarios anteriores a 1948' },
      status: { ar: 'جارية — 42 باحثاً', en: 'Active — 42 Researchers', fr: 'En cours — 42 Chercheurs', es: 'En curso — 42 Investigadores' }
    },
    {
      id: 'init-02',
      title: { ar: 'المشروع الأكاديمي الدولي لترجمة الوثائق القانونية للغات متعددة', en: 'Multilingual Academic Legal Translation Project', fr: 'Projet Universitaire de Traduction Juridique Plurilingue', es: 'Proyecto Académico de Traducción Jurídica Plurilingüe' },
      lead: { ar: 'شبكة كليات اللغات والترجمة المعتمدة', en: 'Accredited Translation Faculties Network', fr: 'Réseau Universitaire de Traduction Spécialisée', es: 'Red Universitaria de Traducción Jurídica' },
      focus: { ar: 'ترجمة ونشر ملخصات قرارات المحاكم الدولية بلغات إضافية كالإسبانية والفرنسية', en: 'Translating and verifying ICJ and multilateral rulings into Spanish, French, and German', fr: 'Traduction des décisions de la CIJ en plusieurs langues de travail', es: 'Traducción autorizada de resoluciones de la CIJ a múltiples lenguas' },
      status: { ar: 'جارية — 6 لغات', en: 'Active — 6 Languages', fr: 'En cours — 6 Langues', es: 'En curso — 6 Idiomas' }
    },
    {
      id: 'init-03',
      title: { ar: 'المنتدى الجامعي العالمي للتضامن الأكاديمي وحرية البحث', en: 'Global Academic Forum for Scholarly Solidarity', fr: 'Forum Universitaire Mondial pour la Liberté de Recherche', es: 'Foro Universitario Global de Solidaridad Académica' },
      lead: { ar: 'رابطة أساتذة القانون وحقوق الإنسان', en: 'Association of Law & Human Rights Scholars', fr: 'Association des Enseignants en Droit Public', es: 'Asociación de Profesores de Derecho y DDHH' },
      focus: { ar: 'تنظيم ندوات حوارية دورية داخل الحرم الجامعي في أوروبا وأمريكا اللاتينية', en: 'Coordinating periodic legal symposiums across campuses in Europe and the Americas', fr: 'Organisation de séminaires juridiques universitaires', es: 'Coordinación de coloquios doctrinales en campus universitarios' },
      status: { ar: 'جارية — 28 جامعة', en: 'Active — 28 Universities', fr: 'En cours — 28 Universités', es: 'En curso — 28 Universidades' }
    }
  ];

  const publicResources = [
    {
      title: { ar: 'دليل الباحث في وثائق وقرارات الأمم المتحدة الخاصة بفلسطين', en: 'Researcher’s Guide to UN Resolutions on Palestine', fr: 'Guide du Chercheur sur les Résolutions de l\'ONU', es: 'Guía del Investigador sobre Resoluciones de la ONU' },
      format: 'PDF Brief (48 pages)',
      category: 'Academic Toolkit',
      size: '2.4 MB'
    },
    {
      title: { ar: 'مجموعة الخرائط الموثقة للوضع الجيوسياسي والجدار والاستيطان', en: 'Verified Cartographic Atlas: Geopolitics & Land Status', fr: 'Atlas Cartographique Vérifié : Géopolitique et Territoire', es: 'Atlas Cartográfico Verificado: Geopolítica y Territorio' },
      format: 'High-Res Map Pack (ZIP/PDF)',
      category: 'Cartography',
      size: '14.8 MB'
    },
    {
      title: { ar: 'ملف الحقائق والأرقام: الرأي الاستشاري لمحكمة العدل الدولية 2024', en: 'Fact Sheet: 2024 ICJ Advisory Opinion Legal Takeaways', fr: 'Fiche Synthèse : L\'Avis de la CIJ de 2024 et ses effets', es: 'Ficha Informativa: Dictamen de la CIJ de 2024' },
      format: 'Executive Summary (8 pages)',
      category: 'Legal Fact Sheet',
      size: '1.1 MB'
    }
  ];

  const filteredEvents = eventsList.filter((ev) => {
    const matchesFormat = filterFormat === 'all' || ev.format === filterFormat;
    const query = searchEvent.toLowerCase().trim();
    if (!query) return matchesFormat;
    return matchesFormat && (
      ev.title[currentLang].toLowerCase().includes(query) ||
      ev.description[currentLang].toLowerCase().includes(query) ||
      ev.category.toLowerCase().includes(query)
    );
  });

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2 text-[#087443]">
            <Users className="w-4 h-4" />
            <span className="text-xs font-semibold font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'التنسيق والعمل المجتمعي الدولي' : 'Civic Coordination & Public Engagement'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-3">
            {t.civil.title}
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed">
            {currentLang === 'ar'
              ? 'مساحة منظمة للفعاليات، والمبادرات المسجلة، والأدلة المعرفية، والتنسيق المدني في إطار القوانين والسياسات المعتمدة.'
              : 'An institutional space for symposia, verified civic initiatives, educational toolkits, and cross-border engagement.'}
          </p>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E5E7EB] scrollbar-none">
          <button
            onClick={() => setActiveSubTab('events')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'events'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {t.civil.eventsTab}
          </button>
          <button
            onClick={() => setActiveSubTab('initiatives')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'initiatives'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {t.civil.initiativesTab}
          </button>
          <button
            onClick={() => setActiveSubTab('resources')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'resources'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {t.civil.resourcesTab}
          </button>
          <button
            onClick={() => setActiveSubTab('guidelines')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'guidelines'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
            }`}
          >
            {t.civil.participateTab}
          </button>
        </div>

        {/* Tab 1: Events & Symposia */}
        {activeSubTab === 'events' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB]">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#9CA3AF] absolute top-1/2 -translate-y-1/2 start-3" />
                <input
                  type="text"
                  value={searchEvent}
                  onChange={(e) => setSearchEvent(e.target.value)}
                  placeholder={t.civil.searchEvents}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg ps-9 pe-3 py-2 text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#087443]"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Filter className="w-3.5 h-3.5 text-[#6B7280]" />
                <button
                  onClick={() => setFilterFormat('all')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    filterFormat === 'all' ? 'bg-[#111111] text-white' : 'bg-white text-[#4B5563]'
                  }`}
                >
                  {currentLang === 'ar' ? 'الكل' : 'All'}
                </button>
                <button
                  onClick={() => setFilterFormat('online')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    filterFormat === 'online' ? 'bg-[#111111] text-white' : 'bg-white text-[#4B5563]'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => setFilterFormat('hybrid')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    filterFormat === 'hybrid' ? 'bg-[#111111] text-white' : 'bg-white text-[#4B5563]'
                  }`}
                >
                  Hybrid / In-Person
                </button>
              </div>
            </div>

            {/* Events Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((ev) => {
                const hasRsvpd = member?.registeredEventIds?.includes(ev.id);
                return (
                  <div
                    key={ev.id}
                    className="p-6 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3">
                        <span className="font-semibold text-[#087443]">{ev.category}</span>
                        <span className="font-mono uppercase">{ev.format}</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#111111] mb-2 leading-snug">
                        {ev.title[currentLang]}
                      </h3>

                      <p className="text-sm text-[#4B5563] line-clamp-3 leading-relaxed mb-4">
                        {ev.description[currentLang]}
                      </p>

                      <div className="space-y-1.5 text-xs text-[#6B7280] py-3 border-y border-[#F3F4F6] mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#087443]" />
                          <span>{ev.date} · {ev.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#087443]" />
                          <span>{ev.location[currentLang]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe2 className="w-3.5 h-3.5 text-[#087443]" />
                          <span>{ev.language}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-[#6B7280] font-mono-num">
                        {ev.rsvpCount + (hasRsvpd ? 1 : 0)} {currentLang === 'ar' ? 'مشارك مسجل' : 'RSVPs'}
                      </span>
                      <button
                        onClick={() => onRsvp(ev.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          hasRsvpd
                            ? 'bg-[#F0FDF4] text-[#087443] border border-[#087443]/30'
                            : 'bg-[#111111] text-white hover:bg-[#222222]'
                        }`}
                      >
                        {hasRsvpd ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.civil.rsvpd}</span>
                          </>
                        ) : (
                          <span>{t.civil.rsvpBtn}</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Initiatives */}
        {activeSubTab === 'initiatives' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initiatives.map((item) => (
              <div key={item.id} className="p-6 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#087443] font-semibold block mb-2">
                    {item.status[currentLang]}
                  </span>
                  <h3 className="text-base font-bold text-[#111111] mb-2">
                    {item.title[currentLang]}
                  </h3>
                  <div className="text-xs text-[#6B7280] mb-3">
                    <span className="font-semibold text-[#111111]">{currentLang === 'ar' ? 'الجهة المنسقة: ' : 'Coordinator: '}</span>
                    {item.lead[currentLang]}
                  </div>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {item.focus[currentLang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] mt-6">
                  <span className="text-xs font-semibold text-[#087443]">
                    {currentLang === 'ar' ? 'مسجلة ومعتمدة لدى الأمانة' : 'Accredited with Secretariat'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Public Resources & Toolkits */}
        {activeSubTab === 'resources' && (
          <div className="space-y-4">
            <p className="text-sm text-[#4B5563] mb-6">
              {currentLang === 'ar'
                ? 'مواد معرفية وإعلامية وبحثية متاحة للاستخدام الأكاديمي والمدني وفق شروط الاستخدام الحر والتوثيق المعتمد.'
                : 'Knowledge, legal, and cartographic toolkits available for academic and civic study under public attribution licensing.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publicResources.map((res, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#6B7280] block mb-2">{res.category} · {res.size}</span>
                    <h4 className="text-base font-bold text-[#111111] mb-2">{res.title[currentLang]}</h4>
                    <p className="text-xs text-[#4B5563] mb-4">{res.format}</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111111] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#087443]" />
                    <span>{currentLang === 'ar' ? 'تحميل الحزمة' : 'Download Toolkit'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Guidelines */}
        {activeSubTab === 'guidelines' && (
          <div className="max-w-3xl space-y-6 text-sm text-[#374151] leading-relaxed">
            <div className="p-6 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#111111] mb-3">
                {currentLang === 'ar' ? 'أطر المشاركة المدنية والقانونية' : 'Civic Engagement Code & Legal Boundaries'}
              </h3>
              <p className="mb-4">
                {currentLang === 'ar'
                  ? 'تؤكد الأمانة العامة على أن المشاركة المدنية هي ممارسة ديمقراطية ومعرفية تستند إلى حرية الرأي والتعبير والحق في التجمع السلمي المكفولين في المواثيق الدولية. ويتعين على كافة الأفراد واللجان المدنية العمل دائماً وفق الأنظمة والقوانين المعمول بها في بلدان إقامتهم.'
                  : 'The General Secretariat affirms that civic engagement is an expression grounded in international human rights covenants. All participants and affiliated groups operate strictly in compliance with statutory laws in their respective jurisdictions.'}
              </p>
              <ul className="space-y-2 text-xs text-[#4B5563] list-disc list-inside">
                <li>{currentLang === 'ar' ? 'الاعتماد على الحقائق والمصادر الموثقة في الندوات والنقاشات.' : 'Reliance on certified facts and multilateral documents.'}</li>
                <li>{currentLang === 'ar' ? 'احترام التنوع الثقافي والفكري لكافة المشاركين حول العالم.' : 'Respecting cultural and ideological diversity among international participants.'}</li>
                <li>{currentLang === 'ar' ? 'عدم استخدام شعار الأمانة العامة لأغراض تجارية أو حزبية خارج أطر التفويض المعتمدة.' : 'Prohibition of using the Secretariat emblem for commercial or partisan activities.'}</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
