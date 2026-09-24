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
}

export interface CmsStoreData {
  settings: SiteSettings;
  news: NewsItem[];
  documents: KnowledgeDocument[];
  events: GlobalEvent[];
  partners: PartnerInstitution[];
  leaders: LeaderProfile[];
  lastUpdated: string;
}

const STORAGE_KEY = 'pal_gc_cms_store_v1';

export const getDefaultSiteSettings = (): SiteSettings => ({
  officialNameAr: translations.ar.brand.officialName,
  officialNameEn: translations.en.brand.officialName,
  shortNameAr: translations.ar.brand.shortName,
  taglineAr: translations.ar.brand.tagline,
  taglineEn: translations.en.brand.tagline,
  digitalNoticeAr: translations.ar.brand.digitalNotice,
  
  heroTaglineAr: translations.ar.hero.tagline,
  heroTitleAr: translations.ar.hero.title,
  heroDescAr: translations.ar.hero.description,
  
  whyTitleAr: translations.ar.why.title,
  whyLeadAr: translations.ar.why.lead,
  whyP1Ar: translations.ar.why.p1,
  whyP2Ar: translations.ar.why.p2,
  
  visionTitleAr: translations.ar.visionMission.visionTitle,
  visionStatementAr: translations.ar.visionMission.visionStatement,
  missionTitleAr: translations.ar.visionMission.missionTitle,
  missionLeadAr: translations.ar.visionMission.missionLead,
  
  philosophyTitleAr: 'من شعوب العالم إلى دولة فلسطين',
  philosophyQuoteAr: 'الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين هي، في جوهرها، محاولة لبناء مساحة دولية منظمة تجمع الإنسان بالمعلومة، والمجتمع بالمعرفة، والأفراد بالمؤسسات، والمبادرات بالتوثيق. إنها مساحة للتواصل بين الشعوب، وللوصول إلى المصادر، وللتعرف إلى التاريخ والقانون الدولي والوثائق والمؤسسات، ولتنظيم المشاركة المدنية ضمن إطار واضح ومسؤول.',
  
  legalStatusLeadAr: 'تحدد هذه الوثيقة الإطار القانوني والمؤسسي والتشريعي لعمل الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين.',
  legalStatusCoreAr: 'الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين هي كيان مدني مستقل يُنشأ ويعمل وفق الإطار القانوني المعتمد في الدولة التي يتم فيها تسجيله وتأسيسه رسمياً، وبما يتوافق مع القوانين واللوائح المنظمة لعمل المؤسسات والكيانات المدنية والدولية.',
  
  officialLogoUrl: '/official-logo.jpg',
});

export const loadCmsStore = (): CmsStoreData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.news && parsed.documents && parsed.settings) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading CMS store from localStorage:', err);
  }

  // Fallback to default bundled dataset
  const initialData: CmsStoreData = {
    settings: getDefaultSiteSettings(),
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
    // Ignore storage quota errors
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
