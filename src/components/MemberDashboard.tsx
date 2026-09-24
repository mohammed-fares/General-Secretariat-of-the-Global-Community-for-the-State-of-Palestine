import React, { useRef, useState } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Printer, 
  Bookmark, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink,
  QrCode,
  FileText
} from 'lucide-react';
import { Language, MemberProfile, NavigationTab } from '../types';
import { knowledgeDocuments, eventsData, newsData } from '../data/mockDatabase';
import { translations } from '../data/translations';
import { OfficialLogo } from './OfficialLogo';

interface MemberDashboardProps {
  currentLang: Language;
  member: MemberProfile;
  onLogout: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onRemoveBookmark: (docId: string) => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  currentLang,
  member,
  onLogout,
  onNavigate,
  onRemoveBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'dossier' | 'events' | 'groups'>('card');
  const cardRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];

  const savedDocs = knowledgeDocuments.filter((d) => 
    member.bookmarkedDocIds?.includes(d.id)
  );

  const registeredEvents = eventsData.filter((e) => 
    member.registeredEventIds?.includes(e.id)
  );

  const handlePrintCard = () => {
    window.print();
  };

  const workingGroups = [
    { id: 'wg-01', name: currentLang === 'ar' ? 'مجموعة أبحاث القانون الدولي والمساءلة' : 'International Law & Accountability Working Group', membersCount: 142 },
    { id: 'wg-02', name: currentLang === 'ar' ? 'لجنة التوثيق الرقمي والخرائط التاريخية' : 'Digital Documentation & Historic Cartography Desk', membersCount: 98 },
    { id: 'wg-03', name: currentLang === 'ar' ? 'شبكة الباحثين والترجمة اللغوية المتعددة' : 'Multilingual Scholars & Translation Network', membersCount: 215 },
  ];

  return (
    <section className="py-16 bg-[#F7F8F6] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-[#E5E7EB] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#087443] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.dashboard.cardBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {t.dashboard.welcome}، {member.name}
            </h1>
            <p className="text-xs font-mono text-[#6B7280] mt-1">
              ID: {member.membershipId} · {member.country}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('knowledge')}
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6] transition-colors"
            >
              {t.nav.knowledge}
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2] transition-colors border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.dashboard.logout}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E5E7EB] scrollbar-none">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'card'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-white'
            }`}
          >
            {currentLang === 'ar' ? 'بطاقة العضوية الرسمية' : 'Digital Membership Card'}
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dossier'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t.dashboard.savedDocs} ({savedDocs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.dashboard.upcomingEvents} ({registeredEvents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'groups'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#4B5563] hover:text-[#111111] hover:bg-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.dashboard.groups}</span>
          </button>
        </div>

        {/* Tab 1: The Digital Membership Card */}
        {activeTab === 'card' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* High-Fidelity Non-Governmental Membership Card (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div
                ref={cardRef}
                className="w-full max-w-xl aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#0A0A0A] text-white p-6 sm:p-8 relative shadow-xl border border-white/10 flex flex-col justify-between overflow-hidden"
              >
                {/* Background subtle micro-topographic wave */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#34D399_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Card Top: Brand emblem & Institutional title */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <OfficialLogo size="sm" withRing={true} />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold tracking-wide text-white font-['Cairo']">
                        {currentLang === 'ar' ? 'الأمانة العامة للمجتمع العالمي' : 'General Secretariat of the Global Community'}
                      </div>
                      <div className="text-[10px] text-[#34D399] tracking-wider font-mono">
                        FOR THE STATE OF PALESTINE
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-[#D1D5DB] border border-white/10">
                    DIGITAL ID
                  </span>
                </div>

                {/* Card Middle: Member Details */}
                <div className="relative z-10 my-4">
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">
                    {currentLang === 'ar' ? 'اسم العضو المنتسب' : 'Member Name'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4">
                    {member.name}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] block font-mono">{t.dashboard.memberId}</span>
                      <span className="font-mono font-semibold text-[#34D399]">{member.membershipId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] block font-mono">{t.dashboard.country}</span>
                      <span className="font-medium text-white truncate block">{member.country}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] block font-mono">{t.dashboard.joinedDate}</span>
                      <span className="font-mono text-[#E5E7EB]">{member.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Explicit Non-Governmental Notice & QR Code */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="text-[9px] sm:text-[10px] text-[#9CA3AF] leading-tight max-w-[70%]">
                    <span className="text-[#FBBF24] font-semibold block mb-0.5">
                      {t.brand.digitalNotice}
                    </span>
                    {currentLang === 'ar' 
                      ? 'وثيقة انتساب معرفية ومجتمعية غير رسمية تابعة للأمانة العامة.' 
                      : 'Non-governmental digital membership for civic and knowledge collaboration.'}
                  </div>

                  <div className="w-10 h-10 bg-white p-1 rounded-md shrink-0 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-[#111111]" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handlePrintCard}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-medium text-[#111111] transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#4B5563]" />
                  <span>{t.dashboard.printCard}</span>
                </button>
                <button
                  onClick={() => {
                    const printContents = cardRef.current?.innerHTML;
                    if (printContents) {
                      window.print();
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#087443] hover:bg-[#065F36] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.dashboard.downloadCard}</span>
                </button>
              </div>
            </div>

            {/* Quick Status and Member Interests (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
                <h3 className="text-sm font-bold text-[#111111] mb-3">
                  {currentLang === 'ar' ? 'مجالات اهتمامك المسجلة' : 'Your Registered Interests'}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {member.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[#374151] text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
                <h3 className="text-sm font-bold text-[#111111] mb-3">
                  {currentLang === 'ar' ? 'تفضيلات الإشعارات والنشرات' : 'Communication Preferences'}
                </h3>
                <ul className="space-y-2 text-xs text-[#4B5563]">
                  {member.communicationPrefs.map((pref, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#087443]" />
                      <span>{pref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Saved Documents Dossier */}
        {activeTab === 'dossier' && (
          <div className="space-y-4">
            {savedDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 rounded-xl bg-white border border-[#E5E7EB] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-mono">
                        <span className="text-[#087443] font-semibold">{doc.accessionNo}</span>
                        <button
                          onClick={() => onRemoveBookmark(doc.id)}
                          className="text-red-500 hover:underline"
                        >
                          {currentLang === 'ar' ? 'إزالة' : 'Remove'}
                        </button>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-[#111111] mb-2">
                        {doc.title[currentLang]}
                      </h4>
                      <p className="text-xs text-[#4B5563] line-clamp-2 mb-4">
                        {doc.summary[currentLang]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs">
                      <span className="text-[#6B7280]">{doc.date}</span>
                      <a
                        href={doc.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#087443] font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>{t.knowledge.officialLink}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB]">
                <FileText className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
                <p className="text-sm text-[#6B7280]">{t.dashboard.noSavedDocs}</p>
                <button
                  onClick={() => onNavigate('knowledge')}
                  className="mt-3 text-xs font-semibold text-[#087443] hover:underline"
                >
                  {currentLang === 'ar' ? 'تصفح مركز المعرفة والوثائق' : 'Browse Knowledge Center'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Registered Events */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {registeredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registeredEvents.map((ev) => (
                  <div key={ev.id} className="p-5 rounded-xl bg-white border border-[#E5E7EB]">
                    <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                      <span className="text-[#087443] font-semibold">{ev.category}</span>
                      <span className="font-mono">{ev.date} · {ev.time}</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#111111] mb-2">
                      {ev.title[currentLang]}
                    </h4>
                    <p className="text-xs text-[#4B5563] mb-4">
                      {ev.description[currentLang]}
                    </p>
                    <div className="text-xs text-[#087443] font-semibold">
                      ✓ {t.civil.rsvpd}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB]">
                <Calendar className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
                <p className="text-sm text-[#6B7280]">{t.dashboard.noUpcomingEvents}</p>
                <button
                  onClick={() => onNavigate('civil')}
                  className="mt-3 text-xs font-semibold text-[#087443] hover:underline"
                >
                  {currentLang === 'ar' ? 'استعراض الفعاليات والمؤتمرات' : 'Explore Global Events'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Working Groups */}
        {activeTab === 'groups' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workingGroups.map((group) => (
              <div key={group.id} className="p-6 rounded-xl bg-white border border-[#E5E7EB] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] text-[#087443] flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-[#111111] mb-2">{group.name}</h4>
                  <p className="text-xs text-[#6B7280]">
                    {group.membersCount} {currentLang === 'ar' ? 'عضو وباحث منضم' : 'registered scholars & delegates'}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F3F4F6] mt-4">
                  <span className="text-xs text-[#087443] font-semibold">
                    {currentLang === 'ar' ? 'عضو نشط في المجموعة' : 'Active Member'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
