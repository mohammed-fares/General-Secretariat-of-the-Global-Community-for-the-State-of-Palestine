import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  FileText, 
  BookOpen, 
  Calendar, 
  Building2, 
  Compass, 
  Scale, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  ExternalLink, 
  Check, 
  Eye, 
  X,
  Search,
  Upload,
  AlertCircle
} from 'lucide-react';
import { Language, NavigationTab, NewsItem, KnowledgeDocument, GlobalEvent, PartnerInstitution } from '../types';
import { 
  loadCmsStore, 
  saveCmsStore, 
  resetCmsStoreToDefaults, 
  CmsStoreData 
} from '../data/contentStore';
import { OfficialLogo } from './OfficialLogo';

interface AdminPanelProps {
  currentLang: Language;
  onNavigate: (tab: NavigationTab) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentLang, onNavigate }) => {
  const [store, setStore] = useState<CmsStoreData>(loadCmsStore());
  const [activeSection, setActiveSection] = useState<
    'identity' | 'hero' | 'news' | 'documents' | 'events' | 'partners' | 'about_vision' | 'legal'
  >('identity');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Editing modals / state for adding new items
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAddingPartner, setIsAddingPartner] = useState(false);

  // New News form state
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({
    category: 'statement',
    title: { ar: '', en: '', fr: '', es: '' },
    date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    language: 'AR / EN',
    summary: { ar: '', en: '', fr: '', es: '' },
    content: { ar: '', en: '', fr: '', es: '' },
    source: 'الأمانة العامة للمجتمع العالمي — المكتب التنفيذي',
    officialRef: `GS-PAL/${new Date().getFullYear()}/DOC-001`,
  });

  // New Document form state
  const [newDoc, setNewDoc] = useState<Partial<KnowledgeDocument>>({
    accessionNo: `PAL-DOC-${Date.now().toString().slice(-4)}`,
    category: 'international_law',
    subcategory: { ar: 'قرارات ووثائق دولية', en: 'International Resolutions', fr: 'Résolutions Internationales', es: 'Resoluciones Internacionales' },
    title: { ar: '', en: '', fr: '', es: '' },
    source: 'الأمم المتحدة / محكمة العدل الدولية',
    date: new Date().getFullYear().toString(),
    language: 'Arabic / English',
    type: 'Document / Treaty',
    summary: { ar: '', en: '', fr: '', es: '' },
    citation: '',
    officialUrl: 'https://www.un.org',
    tags: ['دولة فلسطين', 'القانون الدولي'],
  });

  // New Event form state
  const [newEvent, setNewEvent] = useState<Partial<GlobalEvent>>({
    title: { ar: '', en: '', fr: '', es: '' },
    date: '2026-10-15',
    time: '17:00 UTC',
    format: 'online',
    location: { ar: 'مقر الأمانة الافتراضي — عبر الاتصال المرئي', en: 'Virtual Global Room', fr: 'Salle Virtuelle', es: 'Sala Virtual' },
    country: 'International',
    language: 'AR / EN',
    description: { ar: '', en: '', fr: '', es: '' },
    category: 'ندوة أكاديمية',
    rsvpCount: 0,
  });

  // New Partner form state
  const [newPartner, setNewPartner] = useState<Partial<PartnerInstitution>>({
    name: { ar: '', en: '', fr: '', es: '' },
    category: 'university',
    country: '',
    accreditedYear: 2026,
    description: { ar: '', en: '', fr: '', es: '' },
    focusArea: 'القانون الدولي والتوثيق الأكاديمي',
  });

  const handleSaveAll = () => {
    saveCmsStore(store);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('هل أنت متأكد من استعادة كافة النصوص والبيانات الافتراضية المعتمدة؟ ستفقد أي تعديلات غير محفوظة.')) {
      const reset = resetCmsStoreToDefaults();
      setStore(reset);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(store, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `palestine_secretariat_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Add News Handler
  const handleCreateNews = () => {
    if (!newNews.title?.ar) {
      alert('يرجى كتابة عنوان البيان أو الخبر باللغة العربية');
      return;
    }
    const item: NewsItem = {
      id: `news-${Date.now()}`,
      category: newNews.category || 'statement',
      title: {
        ar: newNews.title.ar,
        en: newNews.title.en || newNews.title.ar,
        fr: newNews.title.fr || newNews.title.ar,
        es: newNews.title.es || newNews.title.ar,
      },
      date: newNews.date || '2026',
      language: newNews.language || 'AR / EN',
      summary: {
        ar: newNews.summary?.ar || '',
        en: newNews.summary?.en || newNews.summary?.ar || '',
        fr: newNews.summary?.fr || '',
        es: newNews.summary?.es || '',
      },
      content: {
        ar: newNews.content?.ar || '',
        en: newNews.content?.en || newNews.content?.ar || '',
        fr: newNews.content?.fr || '',
        es: newNews.content?.es || '',
      },
      source: newNews.source || 'الأمانة العامة',
      officialRef: newNews.officialRef,
    };

    const updated = {
      ...store,
      news: [item, ...store.news],
    };
    setStore(updated);
    saveCmsStore(updated);
    setIsAddingNews(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Delete News Handler
  const handleDeleteNews = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا البيان أو الخبر؟')) {
      const updated = {
        ...store,
        news: store.news.filter((n) => n.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
    }
  };

  // Add Document Handler
  const handleCreateDoc = () => {
    if (!newDoc.title?.ar) {
      alert('يرجى كتابة عنوان الوثيقة باللغة العربية');
      return;
    }
    const doc: KnowledgeDocument = {
      id: `doc-${Date.now()}`,
      accessionNo: newDoc.accessionNo || `PAL-DOC-${Date.now().toString().slice(-4)}`,
      category: newDoc.category || 'international_law',
      subcategory: {
        ar: newDoc.subcategory?.ar || 'وثيقة دولية',
        en: newDoc.subcategory?.en || 'Official Document',
        fr: newDoc.subcategory?.fr || 'Document Officiel',
        es: newDoc.subcategory?.es || 'Documento Oficial',
      },
      title: {
        ar: newDoc.title.ar,
        en: newDoc.title.en || newDoc.title.ar,
        fr: newDoc.title.fr || newDoc.title.ar,
        es: newDoc.title.es || newDoc.title.ar,
      },
      source: newDoc.source || 'المكتبة الرسمية للأمانة العامة',
      date: newDoc.date || '2026',
      language: newDoc.language || 'Arabic / English',
      type: newDoc.type || 'Treaty / Report',
      summary: {
        ar: newDoc.summary?.ar || '',
        en: newDoc.summary?.en || newDoc.summary?.ar || '',
        fr: newDoc.summary?.fr || '',
        es: newDoc.summary?.es || '',
      },
      citation: newDoc.citation || `${newDoc.title.ar}. الأمانة العامة للمجتمع العالمي، 2026.`,
      officialUrl: newDoc.officialUrl || '#',
      tags: newDoc.tags || ['فلسطين'],
    };

    const updated = {
      ...store,
      documents: [doc, ...store.documents],
    };
    setStore(updated);
    saveCmsStore(updated);
    setIsAddingDoc(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Delete Document Handler
  const handleDeleteDoc = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الوثيقة من الأرشيف؟')) {
      const updated = {
        ...store,
        documents: store.documents.filter((d) => d.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
    }
  };

  // Add Event Handler
  const handleCreateEvent = () => {
    if (!newEvent.title?.ar) {
      alert('يرجى إدخال عنوان الفعالية باللغة العربية');
      return;
    }
    const ev: GlobalEvent = {
      id: `ev-${Date.now()}`,
      title: {
        ar: newEvent.title.ar,
        en: newEvent.title.en || newEvent.title.ar,
        fr: newEvent.title.fr || newEvent.title.ar,
        es: newEvent.title.es || newEvent.title.ar,
      },
      date: newEvent.date || '2026-10-01',
      time: newEvent.time || '18:00 UTC',
      format: newEvent.format || 'online',
      location: {
        ar: newEvent.location?.ar || 'عبر الإنترنت',
        en: newEvent.location?.en || 'Online',
        fr: newEvent.location?.fr || 'En ligne',
        es: newEvent.location?.es || 'En línea',
      },
      country: newEvent.country || 'Global',
      language: newEvent.language || 'AR / EN',
      description: {
        ar: newEvent.description?.ar || '',
        en: newEvent.description?.en || newEvent.description?.ar || '',
        fr: newEvent.description?.fr || '',
        es: newEvent.description?.es || '',
      },
      category: newEvent.category || 'ندوة',
      rsvpCount: 0,
    };

    const updated = {
      ...store,
      events: [ev, ...store.events],
    };
    setStore(updated);
    saveCmsStore(updated);
    setIsAddingEvent(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Delete Event Handler
  const handleDeleteEvent = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
      const updated = {
        ...store,
        events: store.events.filter((e) => e.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
    }
  };

  // Add Partner Handler
  const handleCreatePartner = () => {
    if (!newPartner.name?.ar) {
      alert('يرجى كتابة اسم المؤسسة الشريكة باللغة العربية');
      return;
    }
    const p: PartnerInstitution = {
      id: `partner-${Date.now()}`,
      name: {
        ar: newPartner.name.ar,
        en: newPartner.name.en || newPartner.name.ar,
        fr: newPartner.name.fr || newPartner.name.ar,
        es: newPartner.name.es || newPartner.name.ar,
      },
      category: newPartner.category || 'university',
      country: newPartner.country || 'دولي',
      accreditedYear: newPartner.accreditedYear || 2026,
      description: {
        ar: newPartner.description?.ar || '',
        en: newPartner.description?.en || newPartner.description?.ar || '',
        fr: newPartner.description?.fr || '',
        es: newPartner.description?.es || '',
      },
      focusArea: newPartner.focusArea || 'التعاون الأكاديمي',
    };

    const updated = {
      ...store,
      partners: [p, ...store.partners],
    };
    setStore(updated);
    saveCmsStore(updated);
    setIsAddingPartner(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Delete Partner Handler
  const handleDeletePartner = (id: string) => {
    if (window.confirm('هل أنت متأكد من إزالة هذه المؤسسة من شبكة الشركاء؟')) {
      const updated = {
        ...store,
        partners: store.partners.filter((p) => p.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#171717] font-['Cairo'] pb-24">
      
      {/* Top Admin Header Bar */}
      <div className="bg-[#111111] text-white border-b border-white/10 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Brand + Control Panel Label */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <OfficialLogo size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-white">
                    لوحة التحكم وإدارة المحتوى (CMS)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#087443] text-white font-bold">
                    معتمد رسمياً
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF]">
                  الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين — إدارة النصوص والبيانات والوثائق
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors"
                title="حفظ كافة التغييرات على الفور"
              >
                <Save className="w-3.5 h-3.5" />
                <span>حفظ التعديلات</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors"
                title="معاينة التغييرات على الموقع مباشرة"
              >
                <Eye className="w-3.5 h-3.5 text-[#34D399]" />
                <span>معاينة الموقع</span>
              </button>

              <button
                onClick={handleExportJson}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="تصدير نسخة احتياطية من البيانات"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetToDefaults}
                className="p-2 rounded-lg bg-white/10 hover:bg-red-950/80 text-red-300 transition-colors"
                title="استعادة البيانات الأصلية"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Success Alert Banner */}
        {savedSuccess && (
          <div className="bg-[#087443] text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 transition-all">
            <Check className="w-4 h-4" />
            <span>تم حفظ وتطبيق كافة التعديلات بنجاح وتحديث محتوى المنصة فوراً!</span>
          </div>
        )}
      </div>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs for CMS Sections */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E5E7EB] scrollbar-none">
          
          <button
            onClick={() => setActiveSection('identity')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'identity'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#087443]" />
            <span>الهوية والشعار المعتمد</span>
          </button>

          <button
            onClick={() => setActiveSection('hero')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'hero'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#087443]" />
            <span>الواجهة الرئيسية (Hero)</span>
          </button>

          <button
            onClick={() => setActiveSection('news')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'news'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#087443]" />
            <span>الأخبار والبيانات ({store.news.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('documents')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'documents'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#087443]" />
            <span>مركز الوثائق والمعرفة ({store.documents.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('events')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'events'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#087443]" />
            <span>الفعاليات المدنية ({store.events.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('partners')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'partners'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#087443]" />
            <span>شبكة الشركاء ({store.partners.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('about_vision')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'about_vision'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#087443]" />
            <span>الميثاق والرؤية والرسالة</span>
          </button>

          <button
            onClick={() => setActiveSection('legal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSection === 'legal'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
            }`}
          >
            <Scale className="w-4 h-4 text-[#087443]" />
            <span>الوضع القانوني والشفافية</span>
          </button>

        </div>

        {/* SECTION 1: IDENTITY & APPROVED LOGO */}
        {activeSection === 'identity' && (
          <div className="space-y-8">
            {/* Approved Logo Showcase */}
            <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0 text-center">
                  <OfficialLogo size="2xl" withRing={true} />
                  <span className="block mt-3 text-xs font-bold text-[#087443]">
                    الشعار الرسمي المعتمد
                  </span>
                </div>
                <div className="space-y-3 flex-1 text-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#087443] text-xs font-bold border border-[#087443]/20">
                    <Check className="w-3.5 h-3.5" />
                    <span>تم اعتماد وتثبيت الشعار المرفق رسمياً</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#111111]">
                    شعار الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    يعكس الشعار الهوية الدولية والسيادية المدنية، مشتملاً على قبة الصخرة المشرفة باللون الذهبي، محاطة بخطوط الكرة الأرضية الزرقاء وغصن الزيتون الأخضر والراية الفلسطينية، مع العبارة الرسمية باللغتين العربية والإنجليزية.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="/official-logo.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F7F8F6] hover:bg-[#E5E7EB] text-[#111111] text-xs font-semibold border border-[#E5E7EB] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#087443]" />
                      <span>فتح ملف الشعار الأصلي عالي الدقة</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* General Brand Details Form */}
            <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
              <h3 className="text-lg font-bold text-[#111111] mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#087443]" />
                <span>البيانات والمسميات الرسمية</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2">
                    الاسم الرسمي باللغة العربية
                  </label>
                  <input
                    type="text"
                    value={store.settings.officialNameAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, officialNameAr: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2">
                    الاسم الرسمي باللغة الإنجليزية
                  </label>
                  <input
                    type="text"
                    value={store.settings.officialNameEn}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, officialNameEn: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443] text-start dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2">
                    العبارة التعريفية (الشعار اللفظي) بالعربية
                  </label>
                  <input
                    type="text"
                    value={store.settings.taglineAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, taglineAr: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-2">
                    العبارة التعريفية بالإنجليزية
                  </label>
                  <input
                    type="text"
                    value={store.settings.taglineEn}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, taglineEn: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443] text-start dir-ltr"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#374151] mb-2">
                    تنويه الصفة القانونية الرقمية
                  </label>
                  <input
                    type="text"
                    value={store.settings.digitalNoticeAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, digitalNoticeAr: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443]"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveAll}
                  className="px-6 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ بيانات الهوية</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: HERO SETTINGS */}
        {activeSection === 'hero' && (
          <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#087443]" />
              <span>إدارة نصوص الواجهة الترحيبية (Hero Section)</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                الشعار النصي العلوي (Kicker)
              </label>
              <input
                type="text"
                value={store.settings.heroTaglineAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, heroTaglineAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                العنوان الرئيسي العريض
              </label>
              <input
                type="text"
                value={store.settings.heroTitleAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, heroTitleAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                الفقرة التقديمية التوضيحية
              </label>
              <textarea
                rows={4}
                value={store.settings.heroDescAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, heroDescAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#087443] leading-relaxed"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>تحديث واجهة Hero</span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION 3: NEWS & STATEMENTS */}
        {activeSection === 'news' && (
          <div className="space-y-6">
            
            {/* Header + Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E5E7EB]">
              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  إدارة البيانات والأخبار الرسمية للأمانة العامة
                </h3>
                <p className="text-xs text-[#6B7280]">
                  إضافة وتحرير ونشر البيانات الرسمية والتقارير الصحفية المؤرخة
                </p>
              </div>

              <button
                onClick={() => setIsAddingNews(!isAddingNews)}
                className="px-4 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingNews ? 'إلغاء الإضافة' : 'إضافة بيان أو خبر جديد'}</span>
              </button>
            </div>

            {/* Form to Add New Statement */}
            {isAddingNews && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#087443] shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <h4 className="font-bold text-base text-[#087443] flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>صياغة بيان أو تقرير جديد</span>
                  </h4>
                  <button onClick={() => setIsAddingNews(false)} className="text-[#9CA3AF] hover:text-[#111111]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      عنوان البيان بالعربية *
                    </label>
                    <input
                      type="text"
                      placeholder="بيان صادر عن الأمانة العامة بشأن..."
                      value={newNews.title?.ar}
                      onChange={(e) => setNewNews({
                        ...newNews,
                        title: { ...newNews.title!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      العنوان بالإنجليزية (اختياري)
                    </label>
                    <input
                      type="text"
                      placeholder="Statement on..."
                      value={newNews.title?.en}
                      onChange={(e) => setNewNews({
                        ...newNews,
                        title: { ...newNews.title!, en: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] text-start dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      التصنيف
                    </label>
                    <select
                      value={newNews.category}
                      onChange={(e) => setNewNews({ ...newNews, category: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    >
                      <option value="statement">بيان رسمي (Statement)</option>
                      <option value="news">خبر صحفي (News)</option>
                      <option value="report">تقرير تحليلي (Report)</option>
                      <option value="document">وثيقة رسمية (Document)</option>
                      <option value="research">دراسة بحثية (Research)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      رقم القيد أو الإشارة الرسمية
                    </label>
                    <input
                      type="text"
                      placeholder="GS-PAL/2026/DOC-..."
                      value={newNews.officialRef}
                      onChange={(e) => setNewNews({ ...newNews, officialRef: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      الموجز التلخيصي للبيان بالعربية
                    </label>
                    <textarea
                      rows={2}
                      placeholder="ملخص مكثف من 2-3 أسطر..."
                      value={newNews.summary?.ar}
                      onChange={(e) => setNewNews({
                        ...newNews,
                        summary: { ...newNews.summary!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      النص الكامل للبيان بالعربية *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="نص البيان الرسمي المعتمد كاملاً..."
                      value={newNews.content?.ar}
                      onChange={(e) => setNewNews({
                        ...newNews,
                        content: { ...newNews.content!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] leading-relaxed"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    onClick={() => setIsAddingNews(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#F3F4F6] text-[#4B5563]"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCreateNews}
                    className="px-6 py-2 text-xs font-bold rounded-lg bg-[#087443] text-white hover:bg-[#065F36]"
                  >
                    نشر البيان فوراً
                  </button>
                </div>
              </div>
            )}

            {/* List of Existing News Items */}
            <div className="space-y-3">
              {store.news.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#087443]/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#087443] border border-[#087443]/20">
                        {item.category === 'statement' ? 'بيان رسمي' : item.category === 'report' ? 'تقرير' : 'خبر'}
                      </span>
                      <span className="text-xs text-[#9CA3AF] font-mono">{item.date}</span>
                      {item.officialRef && (
                        <span className="text-[10px] text-[#6B7280] font-mono bg-[#F7F8F6] px-1.5 py-0.5 rounded">
                          {item.officialRef}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#111111]">
                      {item.title.ar}
                    </h4>
                    <p className="text-xs text-[#4B5563] line-clamp-2">
                      {item.summary.ar || item.content.ar}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      title="حذف هذا البيان"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* SECTION 4: KNOWLEDGE DOCUMENTS ARCHIVE */}
        {activeSection === 'documents' && (
          <div className="space-y-6">
            
            {/* Header + Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E5E7EB]">
              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  إدارة مركز المعرفة والأرشيف الرقمي الموثق
                </h3>
                <p className="text-xs text-[#6B7280]">
                  إضافة وإدارة قرارات الأمم المتحدة، أحكام محكمة العدل الدولية، والمراجع الأكاديمية
                </p>
              </div>

              <button
                onClick={() => setIsAddingDoc(!isAddingDoc)}
                className="px-4 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingDoc ? 'إلغاء الإضافة' : 'إيداع وثيقة جديدة بالأرشيف'}</span>
              </button>
            </div>

            {/* Form to Add Document */}
            {isAddingDoc && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#087443] shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <h4 className="font-bold text-base text-[#087443] flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>إيداع وثيقة أو دراسة جديدة في المكتبة الرقمية</span>
                  </h4>
                  <button onClick={() => setIsAddingDoc(false)} className="text-[#9CA3AF] hover:text-[#111111]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      عنوان الوثيقة بالعربية *
                    </label>
                    <input
                      type="text"
                      placeholder="الرأي الاستشاري لمحكمة العدل الدولية..."
                      value={newDoc.title?.ar}
                      onChange={(e) => setNewDoc({
                        ...newDoc,
                        title: { ...newDoc.title!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      العنوان بالإنجليزية
                    </label>
                    <input
                      type="text"
                      placeholder="ICJ Advisory Opinion on..."
                      value={newDoc.title?.en}
                      onChange={(e) => setNewDoc({
                        ...newDoc,
                        title: { ...newDoc.title!, en: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] text-start dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      التصنيف المعرفي
                    </label>
                    <select
                      value={newDoc.category}
                      onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    >
                      <option value="international_law">القانون الدولي وقرارات الأمم المتحدة</option>
                      <option value="history">التاريخ والأرشيف والخرائط</option>
                      <option value="research">الدراسات والأبحاث المحكمة</option>
                      <option value="civil_society">المجتمع المدني والمبادرات الحقوقية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      المصدر الرسمي للهيئة المصدرة
                    </label>
                    <input
                      type="text"
                      placeholder="الأمم المتحدة / محكمة العدل الدولية / لاهاي"
                      value={newDoc.source}
                      onChange={(e) => setNewDoc({ ...newDoc, source: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      رقم الإيداع المكتبي
                    </label>
                    <input
                      type="text"
                      placeholder="PAL-DOC-..."
                      value={newDoc.accessionNo}
                      onChange={(e) => setNewDoc({ ...newDoc, accessionNo: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      رابط الوثيقة المعتمد أو ملف التحميل
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={newDoc.officialUrl}
                      onChange={(e) => setNewDoc({ ...newDoc, officialUrl: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] text-start dir-ltr"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      الملخص الموضوعي للوثيقة بالعربية
                    </label>
                    <textarea
                      rows={3}
                      placeholder="خلاصة دقيقة لمضمون الوثيقة ومخرجاتها القانونية أو التاريخية..."
                      value={newDoc.summary?.ar}
                      onChange={(e) => setNewDoc({
                        ...newDoc,
                        summary: { ...newDoc.summary!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    onClick={() => setIsAddingDoc(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#F3F4F6] text-[#4B5563]"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCreateDoc}
                    className="px-6 py-2 text-xs font-bold rounded-lg bg-[#087443] text-white hover:bg-[#065F36]"
                  >
                    إيداع الوثيقة
                  </button>
                </div>
              </div>
            )}

            {/* List of Documents */}
            <div className="space-y-3">
              {store.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#087443]/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#087443] border border-[#087443]/20">
                        {doc.accessionNo}
                      </span>
                      <span className="text-xs text-[#6B7280]">{doc.source}</span>
                      <span className="text-xs text-[#9CA3AF] font-mono">{doc.date}</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#111111]">
                      {doc.title.ar}
                    </h4>
                    <p className="text-xs text-[#4B5563] line-clamp-2">
                      {doc.summary.ar}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      title="حذف هذه الوثيقة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* SECTION 5: EVENTS & ACTIVITIES */}
        {activeSection === 'events' && (
          <div className="space-y-6">
            
            {/* Header + Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E5E7EB]">
              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  إدارة الفعاليات والمؤتمرات المدنية والأكاديمية
                </h3>
                <p className="text-xs text-[#6B7280]">
                  تنظيم وتوثيق الندوات والمؤتمرات الدولية واللقاءات التفاعلية
                </p>
              </div>

              <button
                onClick={() => setIsAddingEvent(!isAddingEvent)}
                className="px-4 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingEvent ? 'إلغاء الإضافة' : 'إضافة فعالية أو ندوة جديدة'}</span>
              </button>
            </div>

            {/* Form to Add Event */}
            {isAddingEvent && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#087443] shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <h4 className="font-bold text-base text-[#087443] flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>إضافة فعالية جديدة</span>
                  </h4>
                  <button onClick={() => setIsAddingEvent(false)} className="text-[#9CA3AF] hover:text-[#111111]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      عنوان الفعالية بالعربية *
                    </label>
                    <input
                      type="text"
                      placeholder="الندوة الأكاديمية حول آليات التوثيق..."
                      value={newEvent.title?.ar}
                      onChange={(e) => setNewEvent({
                        ...newEvent,
                        title: { ...newEvent.title!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      التاريخ
                    </label>
                    <input
                      type="text"
                      placeholder="2026-10-20"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      نمط الانعقاد
                    </label>
                    <select
                      value={newEvent.format}
                      onChange={(e) => setNewEvent({ ...newEvent, format: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    >
                      <option value="online">عبر الإنترنت (Online)</option>
                      <option value="in_person">حضوري (In-Person)</option>
                      <option value="hybrid">مدمج (Hybrid)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      المكان أو المنصة
                    </label>
                    <input
                      type="text"
                      placeholder="جنيف / لاهاي / عبر الاتصال المرئي"
                      value={newEvent.location?.ar}
                      onChange={(e) => setNewEvent({
                        ...newEvent,
                        location: { ...newEvent.location!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      وصف الفعالية وأهدافها بالعربية
                    </label>
                    <textarea
                      rows={3}
                      placeholder="تفاصيل الفعالية، المتحدثين، ومحاور النقاش..."
                      value={newEvent.description?.ar}
                      onChange={(e) => setNewEvent({
                        ...newEvent,
                        description: { ...newEvent.description!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    onClick={() => setIsAddingEvent(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#F3F4F6] text-[#4B5563]"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCreateEvent}
                    className="px-6 py-2 text-xs font-bold rounded-lg bg-[#087443] text-white hover:bg-[#065F36]"
                  >
                    إضافة الفعالية
                  </button>
                </div>
              </div>
            )}

            {/* List of Events */}
            <div className="space-y-3">
              {store.events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#087443]/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#087443]">
                        {ev.format === 'online' ? 'عبر الإنترنت' : 'حضوري'}
                      </span>
                      <span className="text-xs text-[#9CA3AF] font-mono">{ev.date} — {ev.time}</span>
                      <span className="text-xs text-[#6B7280]">{ev.location.ar}</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#111111]">
                      {ev.title.ar}
                    </h4>
                    <p className="text-xs text-[#4B5563] line-clamp-2">
                      {ev.description.ar}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      title="حذف هذه الفعالية"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* SECTION 6: PARTNERS NETWORK */}
        {activeSection === 'partners' && (
          <div className="space-y-6">
            
            {/* Header + Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E5E7EB]">
              <div>
                <h3 className="text-lg font-bold text-[#111111]">
                  إدارة شبكة المؤسسات والجامعات الشريكة
                </h3>
                <p className="text-xs text-[#6B7280]">
                  اعتماد وتحديث المؤسسات الأكاديمية والحقوقية المعتمدة لدى الأمانة العامة
                </p>
              </div>

              <button
                onClick={() => setIsAddingPartner(!isAddingPartner)}
                className="px-4 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingPartner ? 'إلغاء الإضافة' : 'اعتماد شريك جديد'}</span>
              </button>
            </div>

            {/* Form to Add Partner */}
            {isAddingPartner && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#087443] shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <h4 className="font-bold text-base text-[#087443] flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>اعتماد مؤسسة أو جامعة جديدة</span>
                  </h4>
                  <button onClick={() => setIsAddingPartner(false)} className="text-[#9CA3AF] hover:text-[#111111]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      اسم المؤسسة بالعربية *
                    </label>
                    <input
                      type="text"
                      placeholder="جامعة... / مركز أبحاث..."
                      value={newPartner.name?.ar}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        name: { ...newPartner.name!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      الدولة
                    </label>
                    <input
                      type="text"
                      placeholder="جنوب أفريقيا / إسبانيا / فرنسا..."
                      value={newPartner.country}
                      onChange={(e) => setNewPartner({ ...newPartner, country: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      نوع المؤسسة
                    </label>
                    <select
                      value={newPartner.category}
                      onChange={(e) => setNewPartner({ ...newPartner, category: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    >
                      <option value="university">جامعة / كلية أكاديمية</option>
                      <option value="research_center">مركز أبحاث ودراسات</option>
                      <option value="legal">هيئة حقوقية وقانونية</option>
                      <option value="civil_society">منظمة مجتمع مدني</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      مجال التعاون
                    </label>
                    <input
                      type="text"
                      placeholder="الأبحاث القانونية، التوثيق، الترجمة..."
                      value={newPartner.focusArea}
                      onChange={(e) => setNewPartner({ ...newPartner, focusArea: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#374151] mb-1">
                      نبذة تعريفية عن المؤسسة بالعربية
                    </label>
                    <textarea
                      rows={2}
                      placeholder="نبذة عن دور المؤسسة ومشاركتها في الأمانة العامة..."
                      value={newPartner.description?.ar}
                      onChange={(e) => setNewPartner({
                        ...newPartner,
                        description: { ...newPartner.description!, ar: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    onClick={() => setIsAddingPartner(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#F3F4F6] text-[#4B5563]"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCreatePartner}
                    className="px-6 py-2 text-xs font-bold rounded-lg bg-[#087443] text-white hover:bg-[#065F36]"
                  >
                    اعتماد المؤسسة
                  </button>
                </div>
              </div>
            )}

            {/* List of Partners */}
            <div className="space-y-3">
              {store.partners.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#087443]/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#087443]">
                        {p.country}
                      </span>
                      <span className="text-xs text-[#9CA3AF] font-mono">معتمد منذ {p.accreditedYear}</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-[#111111]">
                      {p.name.ar}
                    </h4>
                    <p className="text-xs text-[#4B5563]">
                      {p.description.ar}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeletePartner(p.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      title="إزالة هذه المؤسسة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* SECTION 7: CHARTER, VISION & MISSION */}
        {activeSection === 'about_vision' && (
          <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#087443]" />
              <span>إدارة نصوص الرؤية والرسالة والمنطلقات التأسيسية</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                نص الرؤية المعتمدة بالعربية
              </label>
              <textarea
                rows={4}
                value={store.settings.visionStatementAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, visionStatementAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                نص الرسالة التأسيسية بالعربية
              </label>
              <textarea
                rows={4}
                value={store.settings.missionLeadAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, missionLeadAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                النص الفلسفي الختامي للمنصة («من شعوب العالم إلى دولة فلسطين»)
              </label>
              <textarea
                rows={4}
                value={store.settings.philosophyQuoteAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, philosophyQuoteAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] leading-relaxed"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ نصوص الميثاق والرؤية</span>
              </button>
            </div>
          </div>
        )}

        {/* SECTION 8: LEGAL STATUS */}
        {activeSection === 'legal' && (
          <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#111111] mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#087443]" />
              <span>إدارة نصوص الوضع القانوني والشفافية</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                مقدمة الإطار القانوني
              </label>
              <textarea
                rows={2}
                value={store.settings.legalStatusLeadAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, legalStatusLeadAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#374151] mb-2">
                بيان الصفة المدنية المستقلة وعدم التمثيل الحكومي
              </label>
              <textarea
                rows={4}
                value={store.settings.legalStatusCoreAr}
                onChange={(e) => setStore({
                  ...store,
                  settings: { ...store.settings, legalStatusCoreAr: e.target.value }
                })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#D1D5DB] focus:ring-1 focus:ring-[#087443] leading-relaxed"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065F36] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>تحديث النصوص القانونية</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
