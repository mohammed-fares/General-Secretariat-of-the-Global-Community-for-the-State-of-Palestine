import { 
  NewsItem, 
  KnowledgeDocument, 
  GlobalEvent, 
  PartnerInstitution, 
  LeaderProfile 
} from '../types';
import { 
  newsData as defaultNews, 
  knowledgeDocuments as defaultDocs, 
  eventsData as defaultEvents, 
  partnersData as defaultPartners,
  leadershipData as defaultLeaders 
} from './mockDatabase';
import { translations } from './translations';

export interface SiteSettings {
  officialNameAr: string;
  officialNameEn: string;
  shortNameAr: string;
  taglineAr: string;
  taglineEn: string;
  digitalNoticeAr: string;
  
  heroTaglineAr: string;
  heroTitleAr: string;
  heroDescAr: string;
  
  // Vital metrics on hero
  statMembers: string;
  statDocuments: string;
  statPartners: string;
  statCountries: string;
  
  whyTitleAr: string;
  whyLeadAr: string;
  whyP1Ar: string;
  whyP2Ar: string;
  
  visionTitleAr: string;
  visionStatementAr: string;
  missionTitleAr: string;
  missionLeadAr: string;
  
  philosophyTitleAr: string;
  philosophyQuoteAr: string;
  
  legalStatusLeadAr: string;
  legalStatusCoreAr: string;
  
  officialLogoUrl: string;
  contactEmail: string;
  officialAddressAr: string;
}

export interface HomepageSectionConfig {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  enabled: boolean;
  order: number;
}

export interface YouthInitiativeItem {
  id: string;
  num: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  category: string;
}

export interface AdminSecurityConfig {
  adminPassword: string;
  lastChanged: string;
  securityHint: string;
}

export interface CmsStoreData {
  settings: SiteSettings;
  security: AdminSecurityConfig;
  homepageSections: HomepageSectionConfig[];
  youthInitiatives: YouthInitiativeItem[];
  news: NewsItem[];
  documents: KnowledgeDocument[];
  events: GlobalEvent[];
  partners: PartnerInstitution[];
  leaders: LeaderProfile[];
  lastUpdated: string;
}

const STORAGE_KEY = 'pal_gc_cms_store_v2';
const AUTH_SESSION_KEY = 'pal_gc_admin_auth_token';

export const getDefaultSiteSettings = (): SiteSettings => ({
  officialNameAr: translations.ar.brand.officialName,
  officialNameEn: translations.en.brand.officialName,
  shortNameAr: translations.ar.brand.shortName,
  taglineAr: translations.ar.brand.tagline,
  taglineEn: translations.en.brand.tagline,
  digitalNoticeAr: translations.ar.brand.digitalNotice,
  
  heroTaglineAr: 'من شعوب العالم إلى دولة فلسطين',
  heroTitleAr: 'الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين',
  heroDescAr: 'إطار دولي مدني منظم يجمع الأفراد والمؤسسات والباحثين حول العالم لتوثيق الحقائق، وتيسير الوصول إلى القانون الدولي، وتعزيز المشاركة المدنية الفاعلة.',
  
  statMembers: '128,400+',
  statDocuments: '1,420+',
  statPartners: '385+',
  statCountries: '142',
  
  whyTitleAr: 'المنطلقات والركائز المؤسسية للأمانة العامة',
  whyLeadAr: 'فضاء مؤسسي عالمي ينطلق من المرجعيات القانونية والأكاديمية الموثقة.',
  whyP1Ar: 'تأسست الأمانة العامة استجابةً للحاجة الدولية الملحة إلى إطار مدني جامع يحفظ الوثائق التاريخية والقانونية ويسهل دراستها.',
  whyP2Ar: 'نعمل على توحيد جهود الباحثين والناشطين والمؤسسات الأكاديمية ضمن مساحة مسؤولة ومنظمة بعيدة عن الارتجال.',
  
  visionTitleAr: 'الرؤية الاستراتيجية',
  visionStatementAr: 'بناء مجتمع عالمي منظم ومتعدد اللغات تتكامل فيه المعرفة الموثقة بالعمل المدني المسؤول من أجل ترسيخ الحقوق الثابتة لدولة فلسطين.',
  missionTitleAr: 'الرسالة التأسيسية',
  missionLeadAr: 'توفير بنية رقمية وأكاديمية آمنة ومفتوحة لتوثيق التاريخ، وتيسير القانون الدولي، وتأهيل جيل من الباحثين المتخصصين.',
  
  philosophyTitleAr: 'من شعوب العالم إلى دولة فلسطين',
  philosophyQuoteAr: 'مساحة منظمة تجمع الإنسان بالمعلومة، والمجتمع بالمعرفة، والأفراد بالمؤسسات، والمبادرات بالتوثيق الرصين.',
  
  legalStatusLeadAr: 'الإطار القانوني والتنظيمي لعمل الأمانة العامة للمجتمع العالمي.',
  legalStatusCoreAr: 'كيان مدني دولي مستقل يعمل وفق المرجعيات الدولية والقوانين المنظمة للعمل المؤسسي المدني غير الحكومي.',
  
  officialLogoUrl: '/official-logo.jpg',
  contactEmail: 'contact@secretariat-palestine.org',
  officialAddressAr: 'المقر الرقمي الدولي — الأمانة العامة للمجتمع العالمي',
});

export const getDefaultHomepageSections = (): HomepageSectionConfig[] => [
  {
    id: 'hero',
    titleAr: 'الواجهة التأسيسية والنداء العام',
    titleEn: 'Hero & Mission Callout',
    descriptionAr: 'واجهة الموقع الرئيسية، الشعار المعتمد، المؤشرات الرقمية وروابط الانضمام.',
    enabled: true,
    order: 1,
  },
  {
    id: 'about',
    titleAr: 'عن الأمانة العامة والميثاق',
    titleEn: 'About Secretariat & Charter',
    descriptionAr: 'الإطار التأسيسي، المنطلقات الرسمية، والرسالة المؤسسية المعتمدة.',
    enabled: true,
    order: 2,
  },
  {
    id: 'why_pillars',
    titleAr: 'الركائز التأسيسية الخمس',
    titleEn: 'Foundational Pillars',
    descriptionAr: 'المسارات الخمسة: القانون الدولي، التاريخ، الأبحاث، الإعلام، والمشاركة المدنية.',
    enabled: true,
    order: 3,
  },
  {
    id: 'vision_mission',
    titleAr: 'الرؤية والرسالة والالتزامات الثمانية',
    titleEn: 'Vision, Mission & Commitments',
    descriptionAr: 'الرؤية الاستراتيجية طويلة الأمد ونقاط العمل التنفيذي المحددة.',
    enabled: true,
    order: 4,
  },
  {
    id: 'knowledge_youth',
    titleAr: 'مركز المعرفة والشباب والباحثين',
    titleEn: 'Knowledge & Youth Hub',
    descriptionAr: 'المكتبة الرقمية المحكمة، أرشيف الوثائق الدولية، وبرامج زمالات الباحثين.',
    enabled: true,
    order: 5,
  },
  {
    id: 'news',
    titleAr: 'البيانات الرسمية والأخبار والقرارات',
    titleEn: 'Official Statements & News',
    descriptionAr: 'أحدث البيانات الصحفية الموثقة، التقارير القانونية، والمواقف الرسمية للأمانة.',
    enabled: true,
    order: 6,
  },
  {
    id: 'palestine',
    titleAr: 'ملف دولة فلسطين والمؤشرات القانونية',
    titleEn: 'State of Palestine Dossier',
    descriptionAr: 'الوضع القانوني الدولي، الرأي الاستشاري لمحكمة العدل، والمعالم التاريخية.',
    enabled: true,
    order: 7,
  },
  {
    id: 'global_presence',
    titleAr: 'الانتشار الدولي وخريطة المجتمع العالمي',
    titleEn: 'Global Presence Map',
    descriptionAr: 'الخريطة التفاعلية وتوزيع الشركاء والأعضاء حول العالم.',
    enabled: true,
    order: 8,
  },
  {
    id: 'civil_events',
    titleAr: 'المشاركة المدنية والفعاليات العالمية',
    titleEn: 'Civic Participation & Events',
    descriptionAr: 'الندوات التفاعلية، المؤتمرات الأكاديمية وجدول الفعاليات القادمة.',
    enabled: true,
    order: 9,
  },
  {
    id: 'partners',
    titleAr: 'شبكة المؤسسات والجامعات الشريكة',
    titleEn: 'Partner Institutions Network',
    descriptionAr: 'الجامعات المعتمدة، مراكز الدراسات، والمنظمات الحقوقية الشريكة.',
    enabled: true,
    order: 10,
  },
  {
    id: 'governance',
    titleAr: 'القيادة المؤسسية والشفافية والمساءلة',
    titleEn: 'Leadership & Transparency',
    descriptionAr: 'أعضاء الأمانة والمجلس الاستشاري، ميثاق الشفافية والتقارير الدورية.',
    enabled: true,
    order: 11,
  },
];

export const getDefaultYouthInitiatives = (): YouthInitiativeItem[] => [
  {
    id: 'init-1',
    num: '01',
    category: 'بحثية',
    title: {
      ar: 'المكتبة البحثية الرقمية المتخصصة',
      en: 'Specialized Digital Research Library'
    },
    desc: {
      ar: 'فهرسة أحدث الأطروحات الجامعية والدراسات المحكمة في القانون الدولي وتاريخ فلسطين وإتاحتها للطلبة مجاناً.',
      en: 'Cataloging academic dissertations and peer-reviewed treatises on international law and Palestinian history for open scholar access.'
    }
  },
  {
    id: 'init-2',
    num: '02',
    category: 'حوارية',
    title: {
      ar: 'الندوات وحلقات النقاش الأكاديمية الدولية',
      en: 'International Academic Symposia'
    },
    desc: {
      ar: 'استضافة أساتذة كليات الحقوق والعلوم السياسية من مختلف القارات لمناقشة التطورات أمام محكمة العدل الدولية والأمم المتحدة.',
      en: 'Hosting law and political science faculty from across continents to examine ICJ findings and multilateral proceedings.'
    }
  },
  {
    id: 'init-3',
    num: '03',
    category: 'زمالات',
    title: {
      ar: 'برنامج الزمالة البحثية لطلبة الدراسات العليا',
      en: 'Graduate Research Fellowship'
    },
    desc: {
      ar: 'منح بحثية مخصصة للماجستير والدكتوراه لإعداد دراسات موثقة حول العدالة الدولية والحقوق الفلسطينية غير القابلة للتصرف.',
      en: 'Dedicated grants for MA/PhD candidates to conduct documented research on international justice and inalienable rights.'
    }
  },
  {
    id: 'init-4',
    num: '04',
    category: 'ترجمة',
    title: {
      ar: 'مختبر الترجمة ونقل المعرفة متعدد اللغات',
      en: 'Multilingual Translation Lab'
    },
    desc: {
      ar: 'مبادرة طلابية شبابية لترجمة الوثائق والقرارات الأممية إلى أكثر من 8 لغات عالمية لكسر حواجز اللغة وتوسيع التضامن.',
      en: 'Student initiative translating UN documents and resolutions into 8+ languages to overcome linguistic barriers.'
    }
  },
  {
    id: 'init-5',
    num: '05',
    category: 'أرشفة',
    title: {
      ar: 'أرشيف الذاكرة الشفوية والتوثيق الميداني',
      en: 'Oral History & Archival Project'
    },
    desc: {
      ar: 'تدريب الباحثين الشباب على مناهج المقابلات الأكاديمية وحفظ الشهادات والوثائق التاريخية وفق المعايير الأرشيفية الدولية.',
      en: 'Training young researchers in academic interview methodologies and preserving oral history following archival standards.'
    }
  },
  {
    id: 'init-6',
    num: '06',
    category: 'جوائز',
    title: {
      ar: 'جائزة الأمانة العامة السنوية للبحث الأكاديمي',
      en: 'Annual Secretariat Research Award'
    },
    desc: {
      ar: 'جائزة سنوية تكافئ أفضل بحث محكّم في القانون الدولي الإنساني أو التاريخ الدبلوماسي يقدمه باحث تحت سن الخامسة والثلاثين.',
      en: 'Annual recognition awarding the finest peer-reviewed research paper on international law by scholars under 35.'
    }
  },
  {
    id: 'init-7',
    num: '07',
    category: 'تدريب',
    title: {
      ar: 'برنامج التدريب العملي في المؤسسات الشريكة',
      en: 'Institutional Internship Program'
    },
    desc: {
      ar: 'ربط الخريجين الشباب بالجامعات ومراكز الأبحاث المعتمدة عالمياً لاكتساب الخبرة القانونية والدبلوماسية والتوثيقية.',
      en: 'Connecting young graduates with partner universities and think tanks for practical diplomatic and legal research training.'
    }
  },
  {
    id: 'init-8',
    num: '08',
    category: 'شبكات',
    title: {
      ar: 'شبكة أندية الجامعات العالمية المتضامنة',
      en: 'Global University Solidarity Clubs Network'
    },
    desc: {
      ar: 'تنسيق الجهود الثقافية والأكاديمية بين الاتحادات الطلابية في جامعات أمريكا اللاتينية وأوروبا وآسيا وأفريقيا والعالم العربي.',
      en: 'Coordinating academic and cultural efforts among student unions across universities in five continents.'
    }
  }
];

export const getDefaultSecurityConfig = (): AdminSecurityConfig => ({
  adminPassword: 'Secretariat@2026',
  lastChanged: new Date().toISOString(),
  securityHint: 'كلمة المرور الافتراضية المعتمدة هي: Secretariat@2026 (يمكن تغييرها من لوحة التحكم)',
});

export const loadCmsStore = (): CmsStoreData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.news && parsed.documents && parsed.settings) {
        // Ensure new structures exist
        if (!parsed.homepageSections || !Array.isArray(parsed.homepageSections) || parsed.homepageSections.length === 0) {
          parsed.homepageSections = getDefaultHomepageSections();
        }
        if (!parsed.youthInitiatives || !Array.isArray(parsed.youthInitiatives) || parsed.youthInitiatives.length === 0) {
          parsed.youthInitiatives = getDefaultYouthInitiatives();
        }
        if (!parsed.security || !parsed.security.adminPassword) {
          parsed.security = getDefaultSecurityConfig();
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading CMS store from localStorage:', err);
  }

  // Fallback to default bundled dataset
  const initialData: CmsStoreData = {
    settings: getDefaultSiteSettings(),
    security: getDefaultSecurityConfig(),
    homepageSections: getDefaultHomepageSections(),
    youthInitiatives: getDefaultYouthInitiatives(),
    news: [...defaultNews],
    documents: [...defaultDocs],
    events: [...defaultEvents],
    partners: [...defaultPartners],
    leaders: [...defaultLeaders],
    lastUpdated: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  } catch (e) {
    // Ignore quota errors
  }

  return initialData;
};

export const saveCmsStore = (data: CmsStoreData) => {
  try {
    const updated = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('pal_gc_content_updated', { detail: updated }));
  } catch (err) {
    console.error('Error saving CMS store to localStorage:', err);
  }
};

export const resetCmsStoreToDefaults = (): CmsStoreData => {
  const initialData: CmsStoreData = {
    settings: getDefaultSiteSettings(),
    security: getDefaultSecurityConfig(),
    homepageSections: getDefaultHomepageSections(),
    youthInitiatives: getDefaultYouthInitiatives(),
    news: [...defaultNews],
    documents: [...defaultDocs],
    events: [...defaultEvents],
    partners: [...defaultPartners],
    leaders: [...defaultLeaders],
    lastUpdated: new Date().toISOString(),
  };
  saveCmsStore(initialData);
  return initialData;
};

// Security and Authentication Helpers
export const verifyAdminPassword = (inputPassword: string): boolean => {
  const store = loadCmsStore();
  const validPassword = store.security?.adminPassword || 'Secretariat@2026';
  return inputPassword.trim() === validPassword.trim();
};

export const updateAdminPassword = (newPassword: string): boolean => {
  if (!newPassword || newPassword.trim().length < 6) return false;
  const store = loadCmsStore();
  store.security = {
    adminPassword: newPassword.trim(),
    lastChanged: new Date().toISOString(),
    securityHint: 'تم تحديث كلمة المرور يدوياً من قبل المشرف',
  };
  saveCmsStore(store);
  return true;
};

export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'authenticated_valid';
  } catch {
    return false;
  }
};

export const setAdminAuthenticated = (status: boolean) => {
  try {
    if (status) {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'authenticated_valid');
    } else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  } catch {
    // ignore
  }
};
