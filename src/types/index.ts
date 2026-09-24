export type Language = 'ar' | 'en' | 'fr' | 'es';

export type NavigationTab = 
  | 'home' 
  | 'about' 
  | 'palestine' 
  | 'news' 
  | 'knowledge' 
  | 'community' 
  | 'civil' 
  | 'youth'
  | 'legal_status'
  | 'membership' 
  | 'member_dashboard' 
  | 'transparency' 
  | 'leadership' 
  | 'admin'
  | 'contact';

export interface MemberProfile {
  id: string;
  membershipId: string;
  name: string;
  email: string;
  country: string;
  city: string;
  language: Language;
  ageGroup: string;
  interests: string[];
  communicationPrefs: string[];
  joinedDate: string;
  isLoggedIn: boolean;
  bookmarkedDocIds: string[];
  registeredEventIds: string[];
}

export type NewsCategory = 'all' | 'statement' | 'news' | 'report' | 'event' | 'document' | 'research';

export interface NewsItem {
  id: string;
  category: 'statement' | 'news' | 'report' | 'event' | 'document' | 'research';
  title: Record<Language, string>;
  date: string;
  language: string;
  summary: Record<Language, string>;
  content: Record<Language, string>;
  source: string;
  officialRef?: string;
  image?: string;
}

export type KnowledgeCategory = 'all' | 'international_law' | 'history' | 'research' | 'civil_society';

export interface KnowledgeDocument {
  id: string;
  accessionNo: string;
  category: 'international_law' | 'history' | 'research' | 'civil_society';
  subcategory: Record<Language, string>;
  title: Record<Language, string>;
  source: string;
  date: string;
  language: string;
  type: string;
  summary: Record<Language, string>;
  citation: string;
  officialUrl: string;
  pages?: number;
  tags: string[];
}

export interface GlobalEvent {
  id: string;
  title: Record<Language, string>;
  date: string;
  time: string;
  format: 'online' | 'in_person' | 'hybrid';
  location: Record<Language, string>;
  country: string;
  language: string;
  description: Record<Language, string>;
  category: string;
  speakers?: string[];
  rsvpCount: number;
}

export interface PartnerInstitution {
  id: string;
  name: Record<Language, string>;
  category: 'university' | 'research_center' | 'civil_society' | 'legal' | 'media' | 'international_initiative';
  country: string;
  accreditedYear: number;
  description: Record<Language, string>;
  focusArea: string;
}

export interface LeaderProfile {
  id: string;
  name: Record<Language, string>;
  role: Record<Language, string>;
  category: 'secretary_general' | 'executive' | 'committee' | 'advisor';
  bio: Record<Language, string>;
  jurisdiction: Record<Language, string>;
  appointedDate: string;
}

export interface CountryStat {
  code: string;
  name: Record<Language, string>;
  x: number; // Percentage on world map
  y: number;
  membersCount: number;
  eventsCount: number;
  partnersCount: number;
  region: string;
}
