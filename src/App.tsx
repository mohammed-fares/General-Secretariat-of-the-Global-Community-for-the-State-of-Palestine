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
import { KnowledgeAndYouthPage } from './components/KnowledgeAndYouthPage';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { loadCmsStore, CmsStoreData } from './data/contentStore';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [cmsStore, setCmsStore] = useState<CmsStoreData>(() => loadCmsStore());

  useEffect(() => {
    const handleCmsUpdate = (e: any) => {
      if (e?.detail) {
        setCmsStore(e.detail);
      } else {
        setCmsStore(loadCmsStore());
      }
    };
    window.addEventListener('pal_gc_content_updated', handleCmsUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleCmsUpdate);
  }, []);

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
            <Leadership currentLang={currentLang} />
            <Transparency currentLang={currentLang} />
            <LegalStatus currentLang={currentLang} />
          </div>
        )}

        {/* Unified Knowledge, Research & Youth Page */}
        {(activeTab === 'knowledge' || activeTab === 'youth') && (
          <KnowledgeAndYouthPage
            currentLang={currentLang}
            member={member}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={handleNavigate}
            initialSubTab={activeTab === 'youth' ? 'youth' : 'all'}
          />
        )}

        {/* State of Palestine & Civic Participation */}
        {(activeTab === 'palestine' || activeTab === 'civil') && (
          <div>
            <StateOfPalestine currentLang={currentLang} />
            <GlobalPresence currentLang={currentLang} onNavigate={handleNavigate} />
            <CivilParticipation
              currentLang={currentLang}
              member={member}
              onRsvp={handleRsvp}
            />
            <PartnersNetwork currentLang={currentLang} />
          </div>
        )}

        {activeTab === 'legal_status' && (
          <LegalStatus currentLang={currentLang} />
        )}

        {activeTab === 'news' && (
          <NewsStatements currentLang={currentLang} />
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

        {/* DYNAMIC HOMEPAGE: Configured, Ordered & Managed via Admin Panel */}
        {activeTab === 'home' && (
          <>
            {cmsStore.homepageSections
              .filter((sec) => sec.enabled)
              .sort((a, b) => a.order - b.order)
              .map((sec) => {
                switch (sec.id) {
                  case 'hero':
                    return <Hero key={sec.id} currentLang={currentLang} onNavigate={handleNavigate} />;
                  case 'about':
                    return <AboutSecretariat key={sec.id} currentLang={currentLang} onNavigate={handleNavigate} />;
                  case 'why_pillars':
                    return <WhySecretariat key={sec.id} currentLang={currentLang} />;
                  case 'vision_mission':
                    return <VisionMission key={sec.id} currentLang={currentLang} />;
                  case 'knowledge_youth':
                    return (
                      <KnowledgeAndYouthPage
                        key={sec.id}
                        currentLang={currentLang}
                        member={member}
                        onToggleBookmark={handleToggleBookmark}
                        onNavigate={handleNavigate}
                      />
                    );
                  case 'news':
                    return <NewsStatements key={sec.id} currentLang={currentLang} />;
                  case 'palestine':
                    return <StateOfPalestine key={sec.id} currentLang={currentLang} />;
                  case 'global_presence':
                    return <GlobalPresence key={sec.id} currentLang={currentLang} onNavigate={handleNavigate} />;
                  case 'civil_events':
                    return (
                      <CivilParticipation
                        key={sec.id}
                        currentLang={currentLang}
                        member={member}
                        onRsvp={handleRsvp}
                      />
                    );
                  case 'partners':
                    return <PartnersNetwork key={sec.id} currentLang={currentLang} />;
                  case 'governance':
                    return <Leadership key={sec.id} currentLang={currentLang} />;
                  default:
                    return null;
                }
              })}
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
