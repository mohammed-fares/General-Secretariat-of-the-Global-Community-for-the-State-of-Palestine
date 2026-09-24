import React, { useState, useEffect } from 'react';
import { Language, NavigationTab, MemberProfile } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhySecretariat } from './components/WhySecretariat';
import { VisionMission } from './components/VisionMission';
import { Principles } from './components/Principles';
import { GlobalPresence } from './components/GlobalPresence';
import { NewsStatements } from './components/NewsStatements';
import { KnowledgeCenter } from './components/KnowledgeCenter';
import { StateOfPalestine } from './components/StateOfPalestine';
import { MembershipFlow } from './components/MembershipFlow';
import { MemberDashboard } from './components/MemberDashboard';
import { CivilParticipation } from './components/CivilParticipation';
import { PartnersNetwork } from './components/PartnersNetwork';
import { Transparency } from './components/Transparency';
import { Leadership } from './components/Leadership';
import { AboutSecretariat } from './components/AboutSecretariat';
import { YouthAndResearchers } from './components/YouthAndResearchers';
import { LegalStatus } from './components/LegalStatus';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [member, setMember] = useState<MemberProfile | null>(null);

  // Initialize and persist member state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pal_gc_member');
      if (stored) {
        setMember(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading stored member:', e);
    }
  }, []);

  // Update HTML document dir and lang attribute dynamically
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang);
  };

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistered = (newMember: MemberProfile) => {
    setMember(newMember);
    setActiveTab('member_dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('pal_gc_member');
    setMember(null);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (docId: string) => {
    if (!member) {
      setActiveTab('membership');
      return;
    }
    const currentList = member.bookmarkedDocIds || [];
    const updatedList = currentList.includes(docId)
      ? currentList.filter((id) => id !== docId)
      : [...currentList, docId];

    const updatedMember = { ...member, bookmarkedDocIds: updatedList };
    setMember(updatedMember);
    localStorage.setItem('pal_gc_member', JSON.stringify(updatedMember));
  };

  const handleRemoveBookmark = (docId: string) => {
    if (!member) return;
    const updatedList = (member.bookmarkedDocIds || []).filter((id) => id !== docId);
    const updatedMember = { ...member, bookmarkedDocIds: updatedList };
    setMember(updatedMember);
    localStorage.setItem('pal_gc_member', JSON.stringify(updatedMember));
  };

  const handleRsvp = (eventId: string) => {
    if (!member) {
      setActiveTab('membership');
      return;
    }
    const currentEvents = member.registeredEventIds || [];
    if (!currentEvents.includes(eventId)) {
      const updatedMember = {
        ...member,
        registeredEventIds: [...currentEvents, eventId],
      };
      setMember(updatedMember);
      localStorage.setItem('pal_gc_member', JSON.stringify(updatedMember));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F6] text-[#171717] selection:bg-[#087443]/20 selection:text-[#087443]">
      {/* Institutional Top Bar Contract */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        member={member}
      />

      <main className="flex-1">
        {/* If user selected specific dedicated view */}
        {activeTab === 'about' && (
          <div>
            <AboutSecretariat currentLang={currentLang} onNavigate={handleNavigate} />
            <WhySecretariat currentLang={currentLang} />
            <VisionMission currentLang={currentLang} />
            <Principles currentLang={currentLang} />
            <LegalStatus currentLang={currentLang} />
          </div>
        )}

        {activeTab === 'youth' && (
          <YouthAndResearchers
            currentLang={currentLang}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'legal_status' && (
          <LegalStatus currentLang={currentLang} />
        )}

        {activeTab === 'palestine' && (
          <div>
            <StateOfPalestine currentLang={currentLang} />
            <KnowledgeCenter
              currentLang={currentLang}
              member={member}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeCenter
            currentLang={currentLang}
            member={member}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'news' && (
          <NewsStatements currentLang={currentLang} />
        )}

        {activeTab === 'civil' && (
          <CivilParticipation
            currentLang={currentLang}
            member={member}
            onRsvp={handleRsvp}
          />
        )}

        {activeTab === 'transparency' && (
          <div>
            <Transparency currentLang={currentLang} />
            <PartnersNetwork currentLang={currentLang} />
          </div>
        )}

        {activeTab === 'leadership' && (
          <div>
            <Leadership currentLang={currentLang} />
            <Transparency currentLang={currentLang} />
          </div>
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            currentLang={currentLang}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'membership' && (
          <MembershipFlow
            currentLang={currentLang}
            onRegistered={handleRegistered}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'member_dashboard' && member && (
          <MemberDashboard
            currentLang={currentLang}
            member={member}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            onRemoveBookmark={handleRemoveBookmark}
          />
        )}

        {/* FULL HOME PAGE: Follows Section 5 Final Breakdown explicitly */}
        {activeTab === 'home' && (
          <>
            {/* 1. HERO */}
            <Hero
              currentLang={currentLang}
              onNavigate={handleNavigate}
            />

            {/* 2. الإطار التأسيسي والمنطلقات الرسمية */}
            <AboutSecretariat
              currentLang={currentLang}
              onNavigate={handleNavigate}
            />

            {/* 3. التعريف بالأمانة (لماذا الأمانة العامة؟) */}
            <WhySecretariat currentLang={currentLang} />

            {/* 4. الرؤية والرسالة */}
            <VisionMission currentLang={currentLang} />

            {/* 5. مبادئنا المؤسسية الستة */}
            <Principles currentLang={currentLang} />

            {/* 6. فئة الشباب والباحثين والمبادرات الثمانية */}
            <YouthAndResearchers
              currentLang={currentLang}
              onNavigate={handleNavigate}
            />

            {/* 7. الحضور العالمي والخريطة التفاعلية */}
            <GlobalPresence
              currentLang={currentLang}
              onNavigate={handleNavigate}
            />

            {/* 8. البيانات والأخبار الرسمية */}
            <NewsStatements currentLang={currentLang} />

            {/* 9. مركز المعرفة والوثائق */}
            <KnowledgeCenter
              currentLang={currentLang}
              member={member}
              onToggleBookmark={handleToggleBookmark}
            />

            {/* 10. ملف دولة فلسطين الشامل */}
            <StateOfPalestine currentLang={currentLang} />

            {/* 11. مركز المشاركة المدنية والفعاليات */}
            <CivilParticipation
              currentLang={currentLang}
              member={member}
              onRsvp={handleRsvp}
            />

            {/* 12. الوضع القانوني للأمانة العامة */}
            <LegalStatus currentLang={currentLang} />

            {/* 13. شبكة المؤسسات والشركاء */}
            <PartnersNetwork currentLang={currentLang} />

            {/* 14. الشفافية والمساءلة */}
            <Transparency currentLang={currentLang} />

            {/* 15. القيادة والأمانة العامة */}
            <Leadership currentLang={currentLang} />
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}
