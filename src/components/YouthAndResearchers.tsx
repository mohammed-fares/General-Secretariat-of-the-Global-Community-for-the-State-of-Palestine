import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Languages, 
  FolderGit2, 
  Trophy, 
  Briefcase, 
  Globe2, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Language, NavigationTab } from '../types';

interface YouthAndResearchersProps {
  currentLang: Language;
  onNavigate?: (tab: NavigationTab) => void;
}

export const YouthAndResearchers: React.FC<YouthAndResearchersProps> = ({ currentLang, onNavigate }) => {
  const isRtl = currentLang === 'ar';

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
        ar: 'ورش تعليمية ومنهجية',
        en: 'Educational & Methodological Workshops',
        fr: 'Ateliers Pédagogiques & Méthodologiques',
        es: 'Talleres Metodológicos y Formativos'
      },
      desc: {
        ar: 'تدريب الباحثين الشباب على أساليب التحقيق التوثيقي، وفحص مصادر الأرشيف العثماني والانتدابي، والاستشهاد الأكاديمي.',
        en: 'Training young researchers on archival forensic methods, Mandate records analysis, and formal academic citation.',
        fr: 'Formation méthodologique à la recherche archivistique et aux standards d\'indexation scientifique.',
        es: 'Formación metodológica sobre investigación archivística y análisis riguroso de fuentes primarias.'
      }
    },
    {
      icon: Languages,
      num: '04',
      title: {
        ar: 'برامج الترجمة المعرفية التخصصية',
        en: 'Specialized Legal & Scholarly Translation',
        fr: 'Programmes de Traduction Spécialisée',
        es: 'Programas de Traducción Especializada'
      },
      desc: {
        ar: 'ترجمة أمهات الوثائق والأحكام القضائية إلى الإنجليزية والفرنسية والإسبانية لتسهيل وصول الباحثين في العالم.',
        en: 'Translating landmark jurisprudence and primary documentation into English, French, and Spanish for global study.',
        fr: 'Traduction des décisions de justice internationale et textes historiques vers les langues mondiales.',
        es: 'Traducción de resoluciones judiciales y documentos históricos a los principales idiomas internacionales.'
      }
    },
    {
      icon: FolderGit2,
      num: '05',
      title: {
        ar: 'مشاريع التوثيق الميداني والأرشيفي',
        en: 'Archival & Field Documentation Projects',
        fr: 'Projets de Documentation et d\'Archivage',
        es: 'Proyectos de Documentación Archivística'
      },
      desc: {
        ar: 'رقمنة سجلات الملكية، والخرائط الجغرافية، والذاكرة الشفوية عبر فرق بحثية طلابية مدربة ومعتمدة.',
        en: 'Digitizing land registries, geospatial surveys, and oral histories through trained student documentation teams.',
        fr: 'Numérisation du cadastre historique et cartographie par des groupes de recherche universitaires.',
        es: 'Digitalización de registros parcelarios y cartografía histórica mediante equipos académicos capacitados.'
      }
    },
    {
      icon: Trophy,
      num: '06',
      title: {
        ar: 'مسابقات وجوائز بحثية دولية',
        en: 'International Research Competitions',
        fr: 'Prix et Concours Scientifiques Internationaux',
        es: 'Concursos y Premios de Investigación'
      },
      desc: {
        ar: 'إطلاق جوائز سنوية لأفضل أوراق بحثية يقدمها طلاب الدراسات العليا في مجالات القانون والسياسة والتاريخ.',
        en: 'Annual academic prizes awarded to outstanding postgraduate papers in international legality, history, and diplomacy.',
        fr: 'Attribution de prix annuels récompensant les meilleurs mémoires universitaires de troisième cycle.',
        es: 'Concesión de premios anuales a las mejores investigaciones de posgrado en legalidad e historia.'
      }
    },
    {
      icon: Briefcase,
      num: '07',
      title: {
        ar: 'برامج تدريبية وتأهيلية',
        en: 'Professional Capacity Building',
        fr: 'Programmes de Formation Professionnelle',
        es: 'Capacitación Profesional y Prácticas'
      },
      desc: {
        ar: 'صقل مهارات الإعلاميين والمترجمين والتقنيين في صياغة المحتوى المؤسسي الرصين والمنصات المعرفية المفتوحة.',
        en: 'Enhancing technical skills of journalists, translators, and technologists in evidence-based open knowledge systems.',
        fr: 'Renforcement des compétences en communication institutionnelle et gestion des données ouvertes.',
        es: 'Desarrollo de competencias para comunicadores y documentalistas en entornos de conocimiento abierto.'
      }
    },
    {
      icon: Globe2,
      num: '08',
      title: {
        ar: 'لقاءات دولية وتبادل طلابي',
        en: 'International Assemblies & Scholarly Exchange',
        fr: 'Rencontres Internationales et Échanges',
        es: 'Encuentros Internacionales e Intercambio'
      },
      desc: {
        ar: 'بناء جسور التواصل بين شباب الباحثين من الجامعات العربية والأوروبية والأفريقية والأمريكية والآسيوية.',
        en: 'Fostering bridges between emerging researchers across Arab, European, African, American, and Asian universities.',
        fr: 'Tisser des liens entre jeunes chercheurs des universités du monde entier autour du droit international.',
        es: 'Construcción de redes entre jóvenes investigadores de universidades de los cinco continentes.'
      }
    }
  ];

  return (
    <section className="py-20 bg-[#F7F8F6] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with User Exact Phrasing */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-2 text-[#087443] font-['Cairo']">
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs font-bold font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'الشباب والباحثون' : 'Youth & Emerging Scholars'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
            {currentLang === 'ar' 
              ? 'مساحة للتعلم والتبادل المعرفي وليس مجرد مصدر للأخبار'
              : 'A Global Arena for Learning & Scholarly Exchange'}
          </h2>
          <p className="text-base text-[#374151] leading-relaxed mb-4">
            {currentLang === 'ar'
              ? 'تولي الأمانة العامة اهتماماً خاصاً بإتاحة المعرفة للأجيال الجديدة والباحثين والطلاب، بحيث تتحول المنصة إلى بنية مستدامة لنقل المعرفة وبناء القدرات البحثية والقانونية في مختلف قارات العالم.'
              : 'The General Secretariat places distinct emphasis on opening knowledge access to upcoming generations, researchers, and students, evolving the platform into a vital space for learning and academic cross-pollination.'}
          </p>
        </div>

        {/* 8 Concrete Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 flex flex-col justify-between group hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#087443]/20 flex items-center justify-center text-[#087443] group-hover:bg-[#087443] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#9CA3AF]">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#111111] mb-2 group-hover:text-[#087443] transition-colors leading-snug">
                    {item.title[currentLang]}
                  </h3>

                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {item.desc[currentLang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3F4F6] mt-4 flex items-center justify-between text-[11px] text-[#087443] font-semibold">
                  <span>{currentLang === 'ar' ? 'مبادرة أكاديمية معتمدة' : 'Accredited Program'}</span>
                  <span>✓</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action for Student / Scholar Researchers */}
        <div className="p-8 rounded-2xl bg-[#111111] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-start">
            <h3 className="text-xl font-bold text-white">
              {currentLang === 'ar' ? 'هل أنت باحث أو طالب دراسات عليا؟' : 'Are you a researcher or postgraduate scholar?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#D1D5DB] max-w-xl leading-relaxed">
              {currentLang === 'ar'
                ? 'انضم إلى شبكة الباحثين والمترجمين واللجان الأكاديمية بالأمانة العامة، واحصل على بطاقة العضوية الرقمية وشارك في اللقاءات الدولية.'
                : 'Join the Secretariat’s scholarly consortium, access peer-reviewed dossiers, and contribute to multilingual translation and research symposia.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('membership')}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#087443] hover:bg-[#065F36] text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
          >
            <span>{currentLang === 'ar' ? 'الانتساب إلى شبكة الباحثين' : 'Apply for Scholar Membership'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </section>
  );
};
