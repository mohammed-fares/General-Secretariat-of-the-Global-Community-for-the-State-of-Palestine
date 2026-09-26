import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  Check, 
  Copy, 
  FileText, 
  Download, 
  X, 
  GraduationCap, 
  Users, 
  Languages, 
  FolderGit2, 
  Trophy, 
  Briefcase, 
  Globe2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Send,
  Filter,
  Layers
} from 'lucide-react';
import { KnowledgeCategory, KnowledgeDocument, Language, MemberProfile, NavigationTab } from '../types';
import { knowledgeDocuments } from '../data/mockDatabase';
import { translations } from '../data/translations';
import { loadCmsStore } from '../data/contentStore';

interface KnowledgeAndYouthPageProps {
  currentLang: Language;
  member: MemberProfile | null;
  onToggleBookmark: (docId: string) => void;
  onNavigate?: (tab: NavigationTab) => void;
  initialSubTab?: 'all' | 'docs' | 'youth' | 'fellowship';
}

export const KnowledgeAndYouthPage: React.FC<KnowledgeAndYouthPageProps> = ({
  currentLang,
  member,
  onToggleBookmark,
  onNavigate,
  initialSubTab = 'all',
}) => {
  const [subTab, setSubTab] = useState<'all' | 'docs' | 'youth' | 'fellowship'>(initialSubTab);
  const [selectedCat, setSelectedCat] = useState<KnowledgeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoc, setActiveDoc] = useState<KnowledgeDocument | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Fellowship application modal state
  const [fellowshipModalOpen, setFellowshipModalOpen] = useState(false);
  const [fellowshipSubmitted, setFellowshipSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantInstitution, setApplicantInstitution] = useState('');
  const [researchField, setResearchField] = useState('international_law');
  const [proposalBrief, setProposalBrief] = useState('');

  const [docsList, setDocsList] = useState<KnowledgeDocument[]>(() => {
    try {
      return loadCmsStore().documents;
    } catch {
      return knowledgeDocuments;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setDocsList(loadCmsStore().documents);
    };
    window.addEventListener('pal_gc_content_updated', handleUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleUpdate);
  }, []);

  const t = translations[currentLang];
  const isRtl = currentLang === 'ar';

  const categories: { id: KnowledgeCategory; label: string }[] = [
    { id: 'all', label: t.knowledge.categories.all },
    { id: 'international_law', label: t.knowledge.categories.international_law },
    { id: 'history', label: t.knowledge.categories.history },
    { id: 'research', label: t.knowledge.categories.research },
    { id: 'civil_society', label: t.knowledge.categories.civil_society },
  ];

  const filteredDocs = docsList.filter((doc) => {
    const matchesCat = selectedCat === 'all' || doc.category === selectedCat;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;

    const titleMatch = doc.title[currentLang].toLowerCase().includes(query);
    const summaryMatch = doc.summary[currentLang].toLowerCase().includes(query);
    const sourceMatch = doc.source.toLowerCase().includes(query);
    const accessionMatch = doc.accessionNo.toLowerCase().includes(query);

    return matchesCat && (titleMatch || summaryMatch || sourceMatch || accessionMatch);
  });

  const handleCopyCitation = (doc: KnowledgeDocument) => {
    const citationText = `${doc.citation || doc.title[currentLang]}. مصدر: ${doc.source} (${doc.date}). رقم القيد: ${doc.accessionNo}. الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين.`;
    navigator.clipboard.writeText(citationText);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFellowshipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setFellowshipSubmitted(true);
    setTimeout(() => {
      setFellowshipSubmitted(false);
      setFellowshipModalOpen(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantInstitution('');
      setProposalBrief('');
    }, 2500);
  };

  const initiatives = [
    {
      icon: BookOpen,
      num: '01',
      title: {
        ar: 'مكتبة بحثية رقمية متخصصة',
        en: 'Specialized Digital Research Library',
        fr: 'Bibliothèque Numérique de Recherche',
        es: 'Biblioteca Digital Especializada'
      },
      desc: {
        ar: 'فهرسة أحدث الأطروحات الجامعية والدراسات المحكمة في القانون الدولي وتاريخ فلسطين وإتاحتها للطلبة مجاناً.',
        en: 'Cataloging academic dissertations and peer-reviewed treatises on international law and Palestinian history for open scholar access.',
        fr: 'Indexation de thèses et d\'articles de doctrine juridique et historique en libre accès.',
        es: 'Catalogación de tesis universitarias y tratados jurídicos para acceso abierto de estudiantes e investigadores.'
      }
    },
    {
      icon: Users,
      num: '02',
      title: {
        ar: 'ندوات وحلقات نقاش أكاديمية',
        en: 'Academic Symposia & Colloquia',
        fr: 'Colloques et Séminaires Universitaires',
        es: 'Coloquios y Seminarios Académicos'
      },
      desc: {
        ar: 'استضافة أساتذة كليات الحقوق والعلوم السياسية من مختلف القارات لمناقشة التطورات أمام محكمة العدل الدولية والأمم المتحدة.',
        en: 'Hosting law and political science faculty from across continents to examine ICJ findings and multilateral proceedings.',
        fr: 'Tables rondes réunissant professeurs de droit et chercheurs pour analyser la jurisprudence internationale.',
        es: 'Paneles con profesores de derecho y relaciones internacionales para examinar los dictámenes de la CIJ.'
      }
    },
    {
      icon: GraduationCap,
      num: '03',
      title: {
        ar: 'منح وزمالات التفرغ البحثي',
        en: 'Research Fellowships & Grants',
        fr: 'Bourses et Résidences de Recherche',
        es: 'Becas y Residencias de Investigación'
      },
      desc: {
        ar: 'دعم الباحثين الشباب في الجامعات الدولية لإعداد دراسات معمقة ومستقلة حول آليات العدالة الدولية والتوثيق الحقوقي.',
        en: 'Supporting early-career scholars worldwide in producing peer-reviewed research on international legal mechanisms.',
        fr: 'Soutien aux jeunes chercheurs pour des publications indépendantes sur la justice internationale.',
        es: 'Apoyo a investigadores nóveles para elaborar estudios independientes sobre mecanismos de justicia internacional.'
      }
    },
    {
      icon: Languages,
      num: '04',
      title: {
        ar: 'وحدة الترجمة والتعريب المتخصصة',
        en: 'Multilingual Translation Bureau',
        fr: 'Bureau de Traduction Spécialisée',
        es: 'Oficina de Traducción Multilingüe'
      },
      desc: {
        ar: 'ترجمة الوثائق والقرارات والتقارير الدولية إلى لغات متعددة (الإنجليزية، الفرنسية، الإسبانية، والروسية) لكسر الحواجز اللغوية.',
        en: 'Translating resolutions, dossiers, and archival materials into multiple world languages to break language barriers.',
        fr: 'Traduction des résolutions et avis consultatifs en plusieurs langues pour élargir l\'accès mondial.',
        es: 'Traducción de tratados y dictámenes a múltiples idiomas para derribar barreras lingüísticas.'
      }
    },
    {
      icon: FolderGit2,
      num: '05',
      title: {
        ar: 'منصة الأرشيف الرقمي المفتوح',
        en: 'Open Archival Repository',
        fr: 'Dépôt Numérique Ouvert',
        es: 'Repositorio Abierto de Archivos'
      },
      desc: {
        ar: 'إتاحة آلاف الوثائق التاريخية والخرائط المعتمدة والقرارات الأممية بصيغ نصية وبيانات مفتوحة قابلة للبحث والتحليل الإحصائي.',
        en: 'Providing open-access databases, high-resolution cartography, and UN resolutions formatted for computational analysis.',
        fr: 'Mise à disposition de documents d\'archives et de données cartographiques ouvertes.',
        es: 'Acceso abierto a fondos documentales y cartografía histórica en formatos de datos procesables.'
      }
    },
    {
      icon: Trophy,
      num: '06',
      title: {
        ar: 'جائزة الأمانة للبحث العلمي',
        en: 'Secretariat Annual Academic Prize',
        fr: 'Prix Annuel de la Recherche',
        es: 'Premio Anual de Investigación'
      },
      desc: {
        ar: 'تكريم سنوي لأفضل بحث أكاديمي دولي يساهم في إثراء الفهم الحقوقي والقانوني والإنساني لقضية دولة فلسطين.',
        en: 'Annual global distinction honoring outstanding scholarly contributions in humanitarian and legal studies on Palestine.',
        fr: 'Distinction internationale récompensant les meilleures contributions doctorales et académiques.',
        es: 'Distinción internacional para las mejores investigaciones sobre el marco de derechos en Palestina.'
      }
    },
    {
      icon: Briefcase,
      num: '07',
      title: {
        ar: 'برنامج التدريب العملي لطلبة الحقوق',
        en: 'International Legal Internships',
        fr: 'Programme de Stages Juridiques',
        es: 'Pasantías de Derecho Internacional'
      },
      desc: {
        ar: 'فرص تدريب افتراضية لطلبة كليات القانون والعلوم السياسية للمشاركة في توثيق الانتهاكات وصياغة المذكرات القانونية.',
        en: 'Virtual internships for law students to collaborate on comparative legal analysis and human rights filing procedures.',
        fr: 'Stages en ligne pour étudiants en droit international orientés vers la rédaction de mémoires juridiques.',
        es: 'Pasantías para estudiantes de leyes enfocadas en la redacción de informes y jurisprudencia comparada.'
      }
    },
    {
      icon: Globe2,
      num: '08',
      title: {
        ar: 'شبكة الباحثين المستقلين الدولية',
        en: 'Global Independent Scholars Network',
        fr: 'Réseau International de Chercheurs',
        es: 'Red Internacional de Investigadores'
      },
      desc: {
        ar: 'منصة تواصل وتشبيك تجمع مئات الباحثين والمؤرخين والقانونيين لتبادل البيانات وتنسيق المشاريع البحثية المشتركة.',
        en: 'Cross-continental scholarly exchange network uniting researchers, historians, and jurists in collaborative scholarship.',
        fr: 'Réseau d\'échange reliant enseignants-chercheurs, juristes et historiens à travers le monde.',
        es: 'Red de colaboración intercontinental para enlazar juristas, sociólogos e historiadores.'
      }
    }
  ];

  return (
    <div className="bg-[#F7F8F6] text-[#171717]">
      {/* 1. Grand Unified Header */}
      <section className="bg-[#111111] text-white pt-16 pb-12 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="/src/assets/images/knowledge_archive_library_1790271769931.jpg"
            alt="International Knowledge & Research Center"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#087443]/20 border border-[#087443]/40 text-[#34D399] text-xs font-semibold mb-4 font-['Cairo']">
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'ar' ? 'المنصة الأكاديمية والبحثية الموحدة للأمانة العامة' : 'Unified Academic & Research Platform'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-['Cairo']">
              {currentLang === 'ar' ? 'مركز المعرفة والتوثيق والشباب والباحثين' : 'Knowledge, Research & Youth Hub'}
            </h1>

            <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed max-w-3xl font-light mb-8 font-['Cairo']">
              {currentLang === 'ar'
                ? 'فضاء مؤسسي دولي موحد يجمع الوثائق الرسمية، والقرارات الأممية، والدراسات المحكمة، بالتكامل مع مبادرات تمكين الباحثين والشباب، والزمالات الأكاديمية المفتوحة لدعم قضية دولة فلسطين وفق القانون الدولي.'
                : 'A unified international space integrating verified official treaties, UN archives, and academic dissertations with active youth research fellowships, student colloquia, and international scholarly networks.'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <span className="text-2xl font-bold text-white block font-mono">1,400+</span>
                <span className="text-xs text-[#9CA3AF] font-['Cairo']">
                  {currentLang === 'ar' ? 'وثيقة وقرار مؤرشف' : 'Archived Documents'}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <span className="text-2xl font-bold text-[#34D399] block font-mono">8</span>
                <span className="text-xs text-[#9CA3AF] font-['Cairo']">
                  {currentLang === 'ar' ? 'مبادرات وبرامج نوعية' : 'Strategic Initiatives'}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <span className="text-2xl font-bold text-white block font-mono">35+</span>
                <span className="text-xs text-[#9CA3AF] font-['Cairo']">
                  {currentLang === 'ar' ? 'دولة مشاركة بحثياً' : 'Participating Nations'}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <span className="text-2xl font-bold text-[#34D399] block font-mono">100%</span>
                <span className="text-xs text-[#9CA3AF] font-['Cairo']">
                  {currentLang === 'ar' ? 'وصول أكاديمي مجاني' : 'Open Scholar Access'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Navigation Sub-Bar */}
      <div className="sticky top-20 z-30 bg-white border-b border-[#E5E7EB] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-2 scrollbar-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setSubTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                  subTab === 'all'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{currentLang === 'ar' ? 'العرض الشامل (الكل)' : 'Overview (All)'}</span>
              </button>

              <button
                onClick={() => setSubTab('docs')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                  subTab === 'docs'
                    ? 'bg-[#087443] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{currentLang === 'ar' ? 'مستودع الوثائق والأبحاث' : 'Documents & Treaties'}</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">{docsList.length}</span>
              </button>

              <button
                onClick={() => setSubTab('youth')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                  subTab === 'youth'
                    ? 'bg-[#087443] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{currentLang === 'ar' ? 'مبادرات الشباب والباحثين' : 'Youth & Scholars'}</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">8</span>
              </button>

              <button
                onClick={() => setSubTab('fellowship')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                  subTab === 'fellowship'
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'text-[#4B5563] hover:text-[#111111] hover:bg-[#F3F4F6]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{currentLang === 'ar' ? 'الزمالات وتقديم الأوراق' : 'Fellowships & Call'}</span>
              </button>
            </div>

            {/* Quick Action: Apply for Fellowship */}
            <button
              onClick={() => setFellowshipModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087443] text-white text-xs font-bold hover:bg-[#065F36] transition-colors shrink-0 shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{currentLang === 'ar' ? 'تقديم مقترح بحثي / زمالة' : 'Submit Research Proposal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. SECTION A: Documents & Legal Archive */}
      {(subTab === 'all' || subTab === 'docs') && (
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E5E7EB]">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-[#087443] font-['Cairo']">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-bold tracking-normal uppercase">
                {currentLang === 'ar' ? 'المستودع الوثائقي والقانوني الدولي' : 'Verified Documentation & Treaty Archive'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight mb-3 font-['Cairo']">
              {currentLang === 'ar' ? 'القرارات الدولية والوثائق التاريخية المحكمة' : 'International Resolutions & Legal Treaties'}
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] max-w-3xl leading-relaxed font-['Cairo']">
              {currentLang === 'ar'
                ? 'توثيق رسمي شامل للقرارات الأممية، وأحكام محكمة العدل الدولية، والمعاهدات الدولية ذات الصلة بدولة فلسطين، مع أرقام القيد الرسمية وإمكانية الاقتباس الأكاديمي المباشر.'
                : 'Official repository indexing UN Security Council & General Assembly resolutions, ICJ rulings, and multilateral treaties with verifiable accession identifiers.'}
            </p>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E7EB] shadow-xs mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className={`w-4 h-4 text-[#9CA3AF] absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={currentLang === 'ar' ? 'ابحث بالاسم، رقم القيد (PAL-DOC)، أو الكلمة المفتاحية...' : 'Search by title, accession number (PAL-DOC), or keyword...'}
                  className={`w-full py-2.5 text-xs sm:text-sm bg-[#F7F8F6] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#087443] focus:ring-1 focus:ring-[#087443] transition-colors font-['Cairo'] ${
                    isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${isRtl ? 'left-3' : 'right-3'}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors font-['Cairo'] ${
                      selectedCat === cat.id
                        ? 'bg-[#087443] text-white shadow-xs font-bold'
                        : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Query Status */}
            {(searchQuery || selectedCat !== 'all') && (
              <div className="flex items-center justify-between text-xs text-[#6B7280] pt-2 border-t border-[#E5E7EB]">
                <span>
                  {currentLang === 'ar'
                    ? `تم العثور على ${filteredDocs.length} وثيقة مطابقة`
                    : `Found ${filteredDocs.length} matching document(s)`}
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCat('all');
                  }}
                  className="text-[#087443] font-bold hover:underline"
                >
                  {currentLang === 'ar' ? 'إعادة ضبط التصفية' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.map((doc) => {
              const isBookmarked = member?.bookmarkedDocIds?.includes(doc.id) || false;
              const isCopied = copiedId === doc.id;

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#087443]/40 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md group"
                >
                  <div>
                    {/* Header: Accession Code + Category + Bookmark */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-mono font-bold text-[#087443] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#087443]/20">
                        {doc.accessionNo}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-[#6B7280] font-['Cairo']">
                          {doc.subcategory[currentLang] || doc.category}
                        </span>
                        <button
                          onClick={() => onToggleBookmark(doc.id)}
                          title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ في المفضلة'}
                          className={`p-1.5 rounded-md transition-colors ${
                            isBookmarked
                              ? 'text-[#087443] bg-[#F0FDF4]'
                              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Document Title */}
                    <h3 className="font-bold text-base text-[#111111] group-hover:text-[#087443] transition-colors leading-snug mb-2 font-['Cairo']">
                      {doc.title[currentLang]}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3 mb-4 font-['Cairo']">
                      {doc.summary[currentLang]}
                    </p>
                  </div>

                  {/* Metadata & Actions Bottom Bar */}
                  <div className="pt-3 border-t border-[#E5E7EB] mt-2">
                    <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-3">
                      <span>{doc.source}</span>
                      <span className="font-mono">{doc.date}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveDoc(doc)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-[#F7F8F6] hover:bg-[#087443] hover:text-white text-[#111111] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 font-['Cairo']"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{currentLang === 'ar' ? 'معاينة الوثيقة' : 'View Full Details'}</span>
                      </button>

                      <button
                        onClick={() => handleCopyCitation(doc)}
                        title={currentLang === 'ar' ? 'نسخ الاقتباس الأكاديمي' : 'Copy Academic Citation'}
                        className={`p-2 rounded-lg border text-xs transition-colors flex items-center justify-center shrink-0 ${
                          isCopied
                            ? 'bg-[#087443] text-white border-[#087443]'
                            : 'border-[#E5E7EB] text-[#4B5563] hover:bg-[#F3F4F6]'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      {doc.officialUrl && (
                        <a
                          href={doc.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={currentLang === 'ar' ? 'المصدر الدولي الأصلي' : 'Original UN/ICJ source'}
                          className="p-2 rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#087443] text-xs transition-colors flex items-center justify-center shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. SECTION B: Youth & Researchers Initiatives (8 Key Initiatives) */}
      {(subTab === 'all' || subTab === 'youth') && (
        <section className="py-16 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 mb-2 text-[#087443] font-['Cairo']">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-bold tracking-normal uppercase">
                  {currentLang === 'ar' ? 'برامج ومبادرات التمكين الأكاديمي' : 'Academic Capacity & Youth Initiatives'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4 font-['Cairo']">
                {currentLang === 'ar' ? 'فئة الشباب والباحثين: 8 مبادرات استراتيجية' : 'Youth & Researchers: 8 Strategic Initiatives'}
              </h2>
              <p className="text-base text-[#4B5563] leading-relaxed font-['Cairo']">
                {currentLang === 'ar'
                  ? 'برامج نوعية صُممت لتمكين الطلبة، والباحثين المستقلين، والمؤسسات الأكاديمية حول العالم لإنتاج المعرفة الرصينة والمساهمة الفاعلة في القانون الدولي والتوثيق التاريخي.'
                  : 'Targeted initiatives designed to empower international scholars, law faculties, and youth researchers through peer-reviewed research, fellowships, and translation infrastructure.'}
              </p>
            </div>

            {/* 8 Initiatives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 flex flex-col justify-between group hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#087443] group-hover:bg-[#087443] group-hover:text-white transition-colors shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#9CA3AF]">
                          {item.num}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-[#111111] mb-2 leading-snug font-['Cairo']">
                        {item.title[currentLang]}
                      </h3>

                      <p className="text-xs text-[#4B5563] leading-relaxed font-['Cairo']">
                        {item.desc[currentLang]}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E5E7EB]/80 flex items-center justify-between text-xs text-[#087443] font-semibold">
                      <span>{currentLang === 'ar' ? 'برنامج معتمد' : 'Accredited'}</span>
                      <button
                        onClick={() => setFellowshipModalOpen(true)}
                        className="hover:underline flex items-center gap-1 font-bold font-['Cairo']"
                      >
                        <span>{currentLang === 'ar' ? 'المشاركة' : 'Participate'}</span>
                        {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. SECTION C: Fellowships & Call for Papers Callout */}
      {(subTab === 'all' || subTab === 'fellowship') && (
        <section className="py-16 bg-[#111111] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#1E3A8A]/30 via-transparent to-[#087443]/30 p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold mb-4 font-['Cairo']">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentLang === 'ar' ? 'دورة الزمالات والمنح البحثية 2026/2027' : 'Research Fellowship Cycle 2026/2027'}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight font-['Cairo']">
                  {currentLang === 'ar'
                    ? 'دعوة مفتوحة للباحثين وطلبة الدراسات العليا لتقديم الأوراق الأكاديمية'
                    : 'Open Call for Academic Papers & Postgraduate Fellowships'}
                </h2>

                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed mb-8 font-light font-['Cairo']">
                  {currentLang === 'ar'
                    ? 'تدعو الأمانة العامة الباحثين في كليات الحقوق والعلوم السياسية والتاريخ والعلوم الاجتماعية حول العالم لتقديم ملخصات أوراقهم البحثية ودراساتهم المعمقة المتعلقة بقرارات الأمم المتحدة، وآليات القانون الدولي، وتوثيق التراث التاريخي لدولة فلسطين.'
                    : 'The General Secretariat invites international researchers, doctoral candidates, and faculty members in international law, political sociology, and archival history to submit research proposals and working papers.'}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setFellowshipModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-sm font-bold transition-colors flex items-center gap-2 shadow-md font-['Cairo']"
                  >
                    <Send className="w-4 h-4" />
                    <span>{currentLang === 'ar' ? 'تقديم ملخص بحثي أو طلب زمالة' : 'Submit Research Abstract / Fellowship Application'}</span>
                  </button>

                  <button
                    onClick={() => setSubTab('docs')}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors border border-white/20 font-['Cairo']"
                  >
                    {currentLang === 'ar' ? 'استعراض الوثائق المرجعية للبحث' : 'Browse Research Reference Library'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODAL 1: Document Full Preview */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E7EB] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#087443] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#087443]/20">
                  {activeDoc.accessionNo}
                </span>
                <span className="text-xs text-[#6B7280] font-['Cairo']">
                  {activeDoc.subcategory[currentLang] || activeDoc.category}
                </span>
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-3 leading-snug font-['Cairo']">
              {activeDoc.title[currentLang]}
            </h3>

            <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB] text-xs text-[#4B5563] space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold font-['Cairo']">{currentLang === 'ar' ? 'المصدر الرسمي:' : 'Official Source:'}</span>
                <span>{activeDoc.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold font-['Cairo']">{currentLang === 'ar' ? 'تاريخ الإصدار / الاعتماد:' : 'Date / Year:'}</span>
                <span className="font-mono">{activeDoc.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold font-['Cairo']">{currentLang === 'ar' ? 'لغات الوثيقة:' : 'Languages:'}</span>
                <span>{activeDoc.language}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-[#111111] uppercase mb-1 font-['Cairo']">
                  {currentLang === 'ar' ? 'الملخص القانوني والتاريخي:' : 'Substantive Summary:'}
                </h4>
                <p className="text-sm text-[#374151] leading-relaxed font-['Cairo']">
                  {activeDoc.summary[currentLang]}
                </p>
              </div>

              {activeDoc.citation && (
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase mb-1 font-['Cairo']">
                    {currentLang === 'ar' ? 'صيغة الاستشهاد الأكاديمي المعتمدة:' : 'Academic Citation Format:'}
                  </h4>
                  <p className="text-xs font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
                    {activeDoc.citation}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => handleCopyCitation(activeDoc)}
                className="px-4 py-2 rounded-xl bg-[#087443] text-white text-xs font-bold hover:bg-[#065F36] transition-colors flex items-center gap-1.5 font-['Cairo']"
              >
                {copiedId === activeDoc.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === activeDoc.id ? (currentLang === 'ar' ? 'تم نسخ الاقتباس!' : 'Citation Copied!') : (currentLang === 'ar' ? 'نسخ الاقتباس الأكاديمي' : 'Copy Academic Citation')}</span>
              </button>

              {activeDoc.officialUrl && (
                <a
                  href={activeDoc.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-[#111111] text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-1.5 font-['Cairo']"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{currentLang === 'ar' ? 'فتح في موقع الأمم المتحدة / المحكمة' : 'Open in UN/ICJ Portal'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Fellowship & Research Paper Proposal */}
      {fellowshipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#087443]" />
                <h3 className="text-base sm:text-lg font-bold text-[#111111] font-['Cairo']">
                  {currentLang === 'ar' ? 'طلب منحة بحثية / تقديم ورقة أكاديمية' : 'Research Fellowship / Paper Submission'}
                </h3>
              </div>
              <button
                onClick={() => setFellowshipModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {fellowshipSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#087443] flex items-center justify-center mx-auto border border-[#087443]/30">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#111111] font-['Cairo']">
                  {currentLang === 'ar' ? 'تم استلام المقترح البحثي بنجاح' : 'Proposal Submitted Successfully'}
                </h4>
                <p className="text-xs text-[#4B5563] font-['Cairo'] leading-relaxed">
                  {currentLang === 'ar'
                    ? 'سيتم تحويل المقترح إلى اللجنة العلمية للأمانة العامة، وسنتواصل معكم عبر البريد الإلكتروني خلال 5 أيام عمل.'
                    : 'Your proposal will be reviewed by the Secretariat Academic Board. You will be notified via email within 5 business days.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFellowshipSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1 font-['Cairo']">
                    {currentLang === 'ar' ? 'الاسم الكامل للباحث / الطالب:' : 'Full Scholar Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder={currentLang === 'ar' ? 'د. / أ. / الباحث...' : 'Dr. / Prof. / Scholar Name'}
                    className="w-full px-3 py-2 text-xs border border-[#D1D5DB] rounded-xl focus:border-[#087443] focus:ring-1 focus:ring-[#087443] font-['Cairo']"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1 font-['Cairo']">
                    {currentLang === 'ar' ? 'البريد الإلكتروني المؤسسي / الأكاديمي:' : 'Academic / Institutional Email:'}
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="scholar@university.edu"
                    className="w-full px-3 py-2 text-xs border border-[#D1D5DB] rounded-xl focus:border-[#087443] focus:ring-1 focus:ring-[#087443]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1 font-['Cairo']">
                    {currentLang === 'ar' ? 'الجامعة / المركز البحثي / الدولة:' : 'University / Research Center / Country:'}
                  </label>
                  <input
                    type="text"
                    value={applicantInstitution}
                    onChange={(e) => setApplicantInstitution(e.target.value)}
                    placeholder={currentLang === 'ar' ? 'جامعة... / معهد القانون الدولي...' : 'e.g. Cambridge, Sorbonne, Cairo University...'}
                    className="w-full px-3 py-2 text-xs border border-[#D1D5DB] rounded-xl focus:border-[#087443] focus:ring-1 focus:ring-[#087443] font-['Cairo']"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1 font-['Cairo']">
                    {currentLang === 'ar' ? 'المجال البحثي المستهدف:' : 'Research Domain:'}
                  </label>
                  <select
                    value={researchField}
                    onChange={(e) => setResearchField(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#D1D5DB] rounded-xl focus:border-[#087443] focus:ring-1 focus:ring-[#087443] font-['Cairo'] bg-white"
                  >
                    <option value="international_law">{currentLang === 'ar' ? 'القانون الدولي ومحكمة العدل الدولية' : 'Public International Law & ICJ'}</option>
                    <option value="history">{currentLang === 'ar' ? 'التوثيق والأرشيف التاريخي لفلسطين' : 'Historical Archiving & Heritage'}</option>
                    <option value="human_rights">{currentLang === 'ar' ? 'حقوق الإنسان والقانون الإنساني' : 'Human Rights & IHL'}</option>
                    <option value="sociology">{currentLang === 'ar' ? 'علم الاجتماع السياسي وحركات التضامن المدني' : 'Political Sociology & Civic Solidarity'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1 font-['Cairo']">
                    {currentLang === 'ar' ? 'ملخص الفكرة البحثية (200 كلمة):' : 'Research Abstract / Proposal Brief (200 words):'}
                  </label>
                  <textarea
                    rows={3}
                    value={proposalBrief}
                    onChange={(e) => setProposalBrief(e.target.value)}
                    placeholder={currentLang === 'ar' ? 'وضح أهداف الدراسة، المنهجية، والمساهمة المضافة للمعرفة الدولية حول فلسطين...' : 'Briefly describe objectives, methodology, and contribution...'}
                    className="w-full px-3 py-2 text-xs border border-[#D1D5DB] rounded-xl focus:border-[#087443] focus:ring-1 focus:ring-[#087443] font-['Cairo'] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setFellowshipModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 font-['Cairo']"
                  >
                    {currentLang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold transition-colors font-['Cairo'] shadow-xs"
                  >
                    {currentLang === 'ar' ? 'إرسال المقترح' : 'Submit Proposal'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
