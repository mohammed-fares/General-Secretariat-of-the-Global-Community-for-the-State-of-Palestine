import React, { useState, useEffect, useRef } from 'react';
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
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Lock,
  LogOut,
  Image,
  LayoutGrid,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Layers,
  Sparkles,
  KeyRound,
  GraduationCap
} from 'lucide-react';
import { Language, NavigationTab, NewsItem, KnowledgeDocument, GlobalEvent, PartnerInstitution, LeaderProfile } from '../types';
import { 
  loadCmsStore, 
  saveCmsStore, 
  resetCmsStoreToDefaults, 
  CmsStoreData,
  HomepageSectionConfig,
  YouthInitiativeItem,
  isAdminAuthenticated,
  setAdminAuthenticated,
  updateAdminPassword,
  verifyAdminPassword
} from '../data/contentStore';
import { OfficialLogo } from './OfficialLogo';
import { AdminLoginModal } from './AdminLoginModal';

interface AdminPanelProps {
  currentLang: Language;
  onNavigate: (tab: NavigationTab) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentLang, onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [store, setStore] = useState<CmsStoreData>(() => loadCmsStore());
  
  const [activeTab, setActiveTab] = useState<
    'logo' | 'layout' | 'site_info' | 'hero_stats' | 'about_vision' | 'news' | 'documents' | 'youth' | 'events' | 'partners' | 'leadership' | 'security'
  >('logo');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Password change state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ success: boolean; msg: string } | null>(null);

  // Logo upload state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [customLogoUrl, setCustomLogoUrl] = useState('');
  const [logoPreview, setLogoPreview] = useState(store.settings.officialLogoUrl);

  // Modal / forms state for CRUD
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [isAddingYouth, setIsAddingYouth] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [isAddingLeader, setIsAddingLeader] = useState(false);

  // New item draft states
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

  const [newYouth, setNewYouth] = useState<Partial<YouthInitiativeItem>>({
    num: `0${(store.youthInitiatives?.length || 0) + 1}`,
    category: 'أكاديمية',
    title: { ar: '', en: '' },
    desc: { ar: '', en: '' },
  });

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

  const [newPartner, setNewPartner] = useState<Partial<PartnerInstitution>>({
    name: { ar: '', en: '', fr: '', es: '' },
    category: 'university',
    country: '',
    accreditedYear: 2026,
    description: { ar: '', en: '', fr: '', es: '' },
    focusArea: 'القانون الدولي والتوثيق الأكاديمي',
  });

  const [newLeader, setNewLeader] = useState<Partial<LeaderProfile>>({
    name: { ar: '', en: '', fr: '', es: '' },
    role: { ar: '', en: '', fr: '', es: '' },
    category: 'executive',
    jurisdiction: { ar: 'الأمانة العامة', en: 'General Secretariat', fr: 'Secrétariat Général', es: 'Secretaría General' },
    bio: { ar: '', en: '', fr: '', es: '' },
    appointedDate: '2026',
  });

  // Keep logo preview in sync
  useEffect(() => {
    setLogoPreview(store.settings.officialLogoUrl);
  }, [store.settings.officialLogoUrl]);

  // If not authenticated, render login modal
  if (!isAuthenticated) {
    return (
      <AdminLoginModal
        currentLang={currentLang}
        onSuccess={() => setIsAuthenticated(true)}
        onCancel={() => onNavigate('home')}
      />
    );
  }

  const triggerSavedToast = (msg: string = 'تم حفظ التعديلات وتطبيقها بنجاح!') => {
    setSavedMessage(msg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveAll = () => {
    saveCmsStore(store);
    triggerSavedToast('تم حفظ كافة البيانات والإعدادات بنجاح!');
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    onNavigate('home');
  };

  const handleResetDefaults = () => {
    if (window.confirm('هل أنت متأكد من استعادة كافة النصوص والشعار والبيانات الافتراضية؟ ستفقد أي تعديلات قمت بها.')) {
      const reset = resetCmsStoreToDefaults();
      setStore(reset);
      triggerSavedToast('تمت استعادة الإعدادات والبيانات الافتراضية بنجاح!');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(store, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `secretariat_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // --- LOGO MANAGEMENT HANDLERS ---
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      if (base64Data) {
        setLogoPreview(base64Data);
        const updated = {
          ...store,
          settings: {
            ...store.settings,
            officialLogoUrl: base64Data,
          },
        };
        setStore(updated);
        saveCmsStore(updated);
        triggerSavedToast('تم تحديث شعار الأمانة العامة بنجاح وتطبيقه على كافة أقسام الموقع!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyLogoUrl = () => {
    if (!customLogoUrl.trim()) return;
    const updated = {
      ...store,
      settings: {
        ...store.settings,
        officialLogoUrl: customLogoUrl.trim(),
      },
    };
    setStore(updated);
    setLogoPreview(customLogoUrl.trim());
    saveCmsStore(updated);
    setCustomLogoUrl('');
    triggerSavedToast('تم اعتماد رابط الشعار الجديد وتطبيقه فوراً!');
  };

  const handleSelectLogoPreset = (url: string, name: string) => {
    const updated = {
      ...store,
      settings: {
        ...store.settings,
        officialLogoUrl: url,
      },
    };
    setStore(updated);
    setLogoPreview(url);
    saveCmsStore(updated);
    triggerSavedToast(`تم تطبيق ${name} كشعار رسمي للأمانة!`);
  };

  // --- HOMEPAGE SECTIONS REORDERING & VISIBILITY HANDLERS ---
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const sections = [...store.homepageSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    // Swap items
    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;

    // Recalculate order numbers
    const reordered = sections.map((sec, idx) => ({
      ...sec,
      order: idx + 1,
    }));

    const updated = {
      ...store,
      homepageSections: reordered,
    };
    setStore(updated);
    saveCmsStore(updated);
    triggerSavedToast('تم تعديل ترتيب الأقسام وتحديث واجهة الموقع فوراً!');
  };

  const handleToggleSectionVisibility = (id: string) => {
    const updatedSections = store.homepageSections.map((sec) => {
      if (sec.id === id) {
        return { ...sec, enabled: !sec.enabled };
      }
      return sec;
    });

    const updated = {
      ...store,
      homepageSections: updatedSections,
    };
    setStore(updated);
    saveCmsStore(updated);
    triggerSavedToast('تم تحديث حالة ظهور القسم في الصفحة الرئيسية!');
  };

  const handleUpdateSectionTitle = (id: string, newTitleAr: string) => {
    const updatedSections = store.homepageSections.map((sec) => {
      if (sec.id === id) {
        return { ...sec, titleAr: newTitleAr };
      }
      return sec;
    });

    const updated = {
      ...store,
      homepageSections: updatedSections,
    };
    setStore(updated);
    saveCmsStore(updated);
  };

  // --- PASSWORD CHANGE HANDLER ---
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeStatus(null);

    if (!verifyAdminPassword(currentPass)) {
      setPasswordChangeStatus({ success: false, msg: 'كلمة المرور الحالية غير صحيحة.' });
      return;
    }

    if (newPass.trim().length < 6) {
      setPasswordChangeStatus({ success: false, msg: 'يجب أن تتكون كلمة المرور الجديدة من 6 خانات على الأقل.' });
      return;
    }

    if (newPass !== confirmPass) {
      setPasswordChangeStatus({ success: false, msg: 'كلمة المرور الجديدة وتأكيدها غير متطابقين.' });
      return;
    }

    const ok = updateAdminPassword(newPass);
    if (ok) {
      setPasswordChangeStatus({ success: true, msg: 'تم تغيير كلمة مرور الإدارة بنجاح! احتفظ بها في مكان آمن.' });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setStore(loadCmsStore());
    } else {
      setPasswordChangeStatus({ success: false, msg: 'تعذر تحديث كلمة المرور.' });
    }
  };

  // --- CRUD HANDLERS ---
  const handleCreateNews = () => {
    if (!newNews.title?.ar) {
      alert('يرجى كتابة عنوان البيان باللغة العربية');
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
      date: newNews.date || new Date().toLocaleDateString('ar-EG'),
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
    triggerSavedToast('تمت إضافة البيان الرسمي بنجاح!');
  };

  const handleDeleteNews = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا البيان؟')) {
      const updated = {
        ...store,
        news: store.news.filter((n) => n.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
      triggerSavedToast('تم حذف البيان بنجاح.');
    }
  };

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
      source: newDoc.source || 'الأمانة العامة',
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
    triggerSavedToast('تمت إضافة الوثيقة إلى مركز المعرفة بنجاح!');
  };

  const handleDeleteDoc = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الوثيقة من الأرشيف؟')) {
      const updated = {
        ...store,
        documents: store.documents.filter((d) => d.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
      triggerSavedToast('تم حذف الوثيقة بنجاح.');
    }
  };

  const handleCreateYouth = () => {
    if (!newYouth.title?.ar) {
      alert('يرجى إدخال اسم المبادرة باللغة العربية');
      return;
    }
    const item: YouthInitiativeItem = {
      id: `youth-${Date.now()}`,
      num: newYouth.num || `0${(store.youthInitiatives?.length || 0) + 1}`,
      category: newYouth.category || 'أكاديمية',
      title: {
        ar: newYouth.title.ar,
        en: newYouth.title.en || newYouth.title.ar,
      },
      desc: {
        ar: newYouth.desc?.ar || '',
        en: newYouth.desc?.en || newYouth.desc?.ar || '',
      },
    };

    const updated = {
      ...store,
      youthInitiatives: [...(store.youthInitiatives || []), item],
    };
    setStore(updated);
    saveCmsStore(updated);
    setIsAddingYouth(false);
    triggerSavedToast('تمت إضافة برنامج الشباب والباحثين بنجاح!');
  };

  const handleDeleteYouth = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المبادرة؟')) {
      const updated = {
        ...store,
        youthInitiatives: store.youthInitiatives.filter((y) => y.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
      triggerSavedToast('تم حذف المبادرة بنجاح.');
    }
  };

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
    triggerSavedToast('تمت إضافة الفعالية بنجاح!');
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
      const updated = {
        ...store,
        events: store.events.filter((e) => e.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
      triggerSavedToast('تم حذف الفعالية بنجاح.');
    }
  };

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
    triggerSavedToast('تمت إضافة المؤسسة الشريكة بنجاح!');
  };

  const handleDeletePartner = (id: string) => {
    if (window.confirm('هل أنت متأكد من إزالة هذه المؤسسة من شبكة الشركاء؟')) {
      const updated = {
        ...store,
        partners: store.partners.filter((p) => p.id !== id),
      };
      setStore(updated);
      saveCmsStore(updated);
      triggerSavedToast('تمت إزالة المؤسسة الشريكة.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#111827] font-['Cairo'] pb-28">
      
      {/* Top Administration Navigation Bar */}
      <div className="bg-[#0F172A] text-white border-b border-[#1E293B] sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Brand + Control Panel Indicator */}
            <div className="flex items-center gap-3.5 w-full lg:w-auto">
              <OfficialLogo size="md" withRing={true} />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-base sm:text-lg text-white">
                    لوحة التحكم المركزية والإدارة الشاملة
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#087443] text-white font-bold flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    جلسة مفوضة محمية
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين — تعديل المحتوى، الشعار، وترتيب الأقسام
                </p>
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-xs font-semibold text-[#E2E8F0] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                معاينة الموقع الحي
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                className="px-3.5 py-1.5 rounded-lg bg-[#087443] hover:bg-[#0A8850] text-xs font-bold text-white transition-all shadow-md shadow-[#087443]/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                حفظ التعديلات
              </button>

              <button
                type="button"
                onClick={handleExportJson}
                className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-xs font-semibold text-[#E2E8F0] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="تصدير نسخة احتياطية من كافة النصوص والبيانات"
              >
                <Download className="w-3.5 h-3.5 text-[#A78BFA]" />
                نسخة احتياطية
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-xs font-semibold text-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="تسجيل الخروج وقفل لوحة التحكم بكلمة المرور"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                قفل وخروج
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Saved Toast Notification */}
      {savedSuccess && (
        <div className="fixed bottom-6 start-6 z-50 p-4 rounded-xl bg-[#087443] text-white text-sm font-bold shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{savedMessage || 'تم حفظ التعديلات بنجاح!'}</span>
        </div>
      )}

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-2 shadow-xs mb-8 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            
            {/* 1. Logo Tab */}
            <button
              onClick={() => setActiveTab('logo')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'logo'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>شعار الأمانة العامة</span>
            </button>

            {/* 2. Layout & Sections Order */}
            <button
              onClick={() => setActiveTab('layout')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'layout'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>ترتيب أقسام ومحتوى الموقع</span>
            </button>

            {/* 3. Hero & Stats */}
            <button
              onClick={() => setActiveTab('hero_stats')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'hero_stats'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>الواجهة والإحصائيات</span>
            </button>

            {/* 4. Site Info & Identity */}
            <button
              onClick={() => setActiveTab('site_info')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'site_info'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>معلومات الموقع والهوية</span>
            </button>

            {/* 5. Foundational Charter & Vision */}
            <button
              onClick={() => setActiveTab('about_vision')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'about_vision'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>الميثاق والرؤية والمنطلقات</span>
            </button>

            {/* 6. News & Statements */}
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>البيانات والأخبار ({store.news?.length || 0})</span>
            </button>

            {/* 7. Knowledge & Documents */}
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>مركز المعرفة والوثائق ({store.documents?.length || 0})</span>
            </button>

            {/* 8. Youth Initiatives */}
            <button
              onClick={() => setActiveTab('youth')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'youth'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>برامج الشباب والباحثين ({store.youthInitiatives?.length || 0})</span>
            </button>

            {/* 9. Events */}
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>الفعاليات ({store.events?.length || 0})</span>
            </button>

            {/* 10. Partners */}
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>المؤسسات والشركاء ({store.partners?.length || 0})</span>
            </button>

            {/* 11. Security */}
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#087443] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Lock className="w-4 h-4 text-amber-500" />
              <span>كلمة المرور والأمان</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: LOGO & VISUAL EMBLEM MANAGEMENT                                    */}
        {/* ========================================================================= */}
        {activeTab === 'logo' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F1F5F9] gap-4">
                <div>
                  <span className="text-xs font-bold text-[#087443] block mb-1">
                    الهوية البصرية الرسمية
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    تغيير وإدارة شعار الأمانة العامة المعتمد
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    يمكنك رفع شعار جديد من جهازك، أو إدخال رابط صورة خارجي، أو الاختيار من النماذج الرسمية المعتمدة. يتم تطبيق الشعار فوراً في جميع الترويسات والوثائق.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {
                        ...store,
                        settings: {
                          ...store.settings,
                          officialLogoUrl: '/official-logo.jpg',
                        },
                      };
                      setStore(updated);
                      setLogoPreview('/official-logo.jpg');
                      saveCmsStore(updated);
                      triggerSavedToast('تمت استعادة الشعار الرسمي الافتراضي للأمانة!');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    استعادة الشعار الأصلي
                  </button>
                </div>
              </div>

              {/* Logo Previews in Real Contexts */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Header Preview */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-[#475569] mb-3 flex items-center justify-between">
                    <span>معاينة في الترويسة العلوية (Navbar)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">مباشر</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] flex items-center gap-3">
                    <OfficialLogo size="md" customSrc={logoPreview} />
                    <div className="flex flex-col">
                      <span className="font-extrabold text-xs text-[#0F172A]">الأمانة العامة للمجتمع العالمي</span>
                      <span className="text-[10px] text-[#087443] font-bold">من أجل دولة فلسطين</span>
                    </div>
                  </div>
                </div>

                {/* 2. Document Seal Preview */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-[#475569] mb-3 flex items-center justify-between">
                    <span>معاينة الختم المكتبي والوثائق</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded">رسمي</span>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-[#E2E8F0] flex flex-col items-center justify-center text-center">
                    <OfficialLogo size="lg" customSrc={logoPreview} />
                    <span className="text-[11px] font-bold text-[#0F172A] mt-2">الختم المعتمد للمراسلات والبيانات</span>
                  </div>
                </div>

                {/* 3. Hero Large Seal Preview */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-[#475569] mb-3 flex items-center justify-between">
                    <span>معاينة الحجم الكبير التأسيسي</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded">فائق الدقة</span>
                  </div>
                  <div className="p-4 bg-gradient-to-b from-[#0F172A] to-[#1E293B] rounded-lg border border-[#334155] flex flex-col items-center justify-center text-center">
                    <OfficialLogo size="xl" customSrc={logoPreview} />
                    <span className="text-[10px] text-[#94A3B8] mt-2">ظهور في الواجهة الداكنة</span>
                  </div>
                </div>
              </div>

              {/* Upload & Source Options */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#F1F5F9]">
                
                {/* Method 1: File Upload */}
                <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0]">
                  <div className="flex items-center gap-2.5 mb-3 text-[#166534]">
                    <Upload className="w-5 h-5" />
                    <h3 className="font-bold text-sm">الطريقة الأولى: رفع صورة الشعار من جهازك</h3>
                  </div>
                  <p className="text-xs text-[#15803D] mb-4 leading-relaxed">
                    اختر ملف صورة من حاسوبك (يدعم JPG، PNG، SVG، WebP). سيتم حفظه مشفراً ويعمل فوراً دون الحاجة لاتصال سيرفر.
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 px-4 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-md shadow-[#087443]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>تصفح جهازك واختيار صورة الشعار</span>
                  </button>
                </div>

                {/* Method 2: Direct Image URL */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5 mb-3 text-[#0F172A]">
                    <ExternalLink className="w-5 h-5 text-[#38BDF8]" />
                    <h3 className="font-bold text-sm">الطريقة الثانية: رابط صورة مباشر (URL)</h3>
                  </div>
                  <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
                    إذا كان الشعار مرفوعاً على رابط خارجي أو خادم خاص، أدخل الرابط المباشر هنا واضغط تطبيق.
                  </p>

                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={customLogoUrl}
                      onChange={(e) => setCustomLogoUrl(e.target.value)}
                      placeholder="https://example.com/secretariat-logo.png"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#0F172A] focus:outline-hidden focus:border-[#087443] font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyLogoUrl}
                      disabled={!customLogoUrl.trim()}
                      className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      تطبيق
                    </button>
                  </div>
                </div>
              </div>

              {/* Method 3: Presets Gallery */}
              <div className="mt-8 pt-8 border-t border-[#F1F5F9]">
                <h3 className="text-sm font-bold text-[#0F172A] mb-3">
                  الطريقة الثالثة: نماذج وتصاميم الشعارات المعتمدة مسبقاً
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  
                  {/* Preset 1 */}
                  <div 
                    onClick={() => handleSelectLogoPreset('/official-logo.jpg', 'الشعار الرسمي المعتمد للأمانة العامة')}
                    className="p-4 rounded-xl border border-[#CBD5E1] hover:border-[#087443] hover:shadow-md bg-white text-center cursor-pointer transition-all group"
                  >
                    <div className="flex justify-center mb-2">
                      <img src="/official-logo.jpg" alt="Preset 1" className="w-12 h-12 rounded-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] block">الشعار الرسمي الأصلي</span>
                    <span className="text-[10px] text-[#64748B]">المعتمد في التأسيس</span>
                  </div>

                  {/* Preset 2 */}
                  <div 
                    onClick={() => handleSelectLogoPreset('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80', 'الختم الذهبي المؤسسي')}
                    className="p-4 rounded-xl border border-[#CBD5E1] hover:border-[#087443] hover:shadow-md bg-white text-center cursor-pointer transition-all group"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-white font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
                        🏛️
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] block">الختم الذهبي التذكاري</span>
                    <span className="text-[10px] text-[#64748B]">للمؤتمرات والمناسبات</span>
                  </div>

                  {/* Preset 3 */}
                  <div 
                    onClick={() => handleSelectLogoPreset('/official-logo.jpg', 'ختم المراسلات الدبلوماسية')}
                    className="p-4 rounded-xl border border-[#CBD5E1] hover:border-[#087443] hover:shadow-md bg-white text-center cursor-pointer transition-all group"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 rounded-full bg-[#087443] text-white flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                        PAL
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] block">الختم الميداني الزمردي</span>
                    <span className="text-[10px] text-[#64748B]">للمبادرات الشبابية</span>
                  </div>

                  {/* Preset 4 */}
                  <div 
                    onClick={() => handleSelectLogoPreset('/official-logo.jpg', 'الختم الأكاديمي')}
                    className="p-4 rounded-xl border border-[#CBD5E1] hover:border-[#087443] hover:shadow-md bg-white text-center cursor-pointer transition-all group"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-12 h-12 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                        ⚖️
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] block">الختم القانوني الأكاديمي</span>
                    <span className="text-[10px] text-[#64748B]">للأبحاث والزمالات</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HOMEPAGE SECTIONS ORDER & LAYOUT MANAGEMENT                       */}
        {/* ========================================================================= */}
        {activeTab === 'layout' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#F1F5F9] gap-4">
                <div>
                  <span className="text-xs font-bold text-[#087443] block mb-1">
                    هيكلية وترتيب محتوى الموقع
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    إدارة أماكن المحتوى وترتيب الأقسام في الصفحة الرئيسية
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    يمكنك إعادة ترتيب أي قسم بالتحريك للأعلى (▲) أو للأسفل (▼)، كما يمكنك إظهار أو إخفاء أي قسم بنقرة واحدة. تنعكس التغييرات فوراً على زوار الموقع.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const reset = {
                      ...store,
                      homepageSections: [
                        { id: 'hero', titleAr: 'الواجهة التأسيسية والنداء العام', titleEn: 'Hero & Mission Callout', descriptionAr: 'واجهة الموقع الرئيسية، الشعار المعتمد، المؤشرات الرقمية وروابط الانضمام.', enabled: true, order: 1 },
                        { id: 'about', titleAr: 'عن الأمانة العامة والميثاق', titleEn: 'About Secretariat & Charter', descriptionAr: 'الإطار التأسيسي، المنطلقات الرسمية، والرسالة المؤسسية المعتمدة.', enabled: true, order: 2 },
                        { id: 'why_pillars', titleAr: 'الركائز التأسيسية الخمس', titleEn: 'Foundational Pillars', descriptionAr: 'المسارات الخمسة: القانون الدولي، التاريخ، الأبحاث، الإعلام، والمشاركة المدنية.', enabled: true, order: 3 },
                        { id: 'vision_mission', titleAr: 'الرؤية والرسالة والالتزامات الثمانية', titleEn: 'Vision, Mission & Commitments', descriptionAr: 'الرؤية الاستراتيجية طويلة الأمد ونقاط العمل التنفيذي المحددة.', enabled: true, order: 4 },
                        { id: 'knowledge_youth', titleAr: 'مركز المعرفة والشباب والباحثين', titleEn: 'Knowledge & Youth Hub', descriptionAr: 'المكتبة الرقمية المحكمة، أرشيف الوثائق الدولية، وبرامج زمالات الباحثين.', enabled: true, order: 5 },
                        { id: 'news', titleAr: 'البيانات الرسمية والأخبار والقرارات', titleEn: 'Official Statements & News', descriptionAr: 'أحدث البيانات الصحفية الموثقة، التقارير القانونية، والمواقف الرسمية للأمانة.', enabled: true, order: 6 },
                        { id: 'palestine', titleAr: 'ملف دولة فلسطين والمؤشرات القانونية', titleEn: 'State of Palestine Dossier', descriptionAr: 'الوضع القانوني الدولي، الرأي الاستشاري لمحكمة العدل، والمعالم التاريخية.', enabled: true, order: 7 },
                        { id: 'global_presence', titleAr: 'الانتشار الدولي وخريطة المجتمع العالمي', titleEn: 'Global Presence Map', descriptionAr: 'الخريطة التفاعلية وتوزيع الشركاء والأعضاء حول العالم.', enabled: true, order: 8 },
                        { id: 'civil_events', titleAr: 'المشاركة المدنية والفعاليات العالمية', titleEn: 'Civic Participation & Events', descriptionAr: 'الندوات التفاعلية، المؤتمرات الأكاديمية وجدول الفعاليات القادمة.', enabled: true, order: 9 },
                        { id: 'partners', titleAr: 'شبكة المؤسسات والجامعات الشريكة', titleEn: 'Partner Institutions Network', descriptionAr: 'الجامعات المعتمدة، مراكز الدراسات، والمنظمات الحقوقية الشريكة.', enabled: true, order: 10 },
                        { id: 'governance', titleAr: 'القيادة المؤسسية والشفافية والمساءلة', titleEn: 'Leadership & Transparency', descriptionAr: 'أعضاء الأمانة والمجلس الاستشاري، ميثاق الشفافية والتقارير الدورية.', enabled: true, order: 11 },
                      ],
                    };
                    setStore(reset);
                    saveCmsStore(reset);
                    triggerSavedToast('تمت استعادة الترتيب التأسيسي المعتمد للأقسام!');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  استعادة الترتيب الافتراضي
                </button>
              </div>

              {/* Sections Reordering List */}
              <div className="mt-8 space-y-3">
                {store.homepageSections.map((sec, index) => (
                  <div
                    key={sec.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      sec.enabled
                        ? 'bg-white border-[#E2E8F0] shadow-xs hover:border-[#087443]/40'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-60'
                    }`}
                  >
                    {/* Order Badge & Title */}
                    <div className="flex items-center gap-3.5 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={sec.titleAr}
                            onChange={(e) => handleUpdateSectionTitle(sec.id, e.target.value)}
                            className="font-bold text-sm text-[#0F172A] bg-transparent border-b border-dashed border-transparent hover:border-[#CBD5E1] focus:border-[#087443] focus:outline-hidden py-0.5"
                          />
                          {!sec.enabled && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-bold">
                              مخفي من الواجهة
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          {sec.descriptionAr}
                        </p>
                      </div>
                    </div>

                    {/* Controls: Up, Down, Visibility Switch */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#F1F5F9] pt-2 sm:pt-0">
                      
                      {/* Move Up */}
                      <button
                        type="button"
                        onClick={() => handleMoveSection(index, 'up')}
                        disabled={index === 0}
                        className="p-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F1F5F9] text-[#475569] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title="تحريك هذا القسم للأعلى"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        onClick={() => handleMoveSection(index, 'down')}
                        disabled={index === store.homepageSections.length - 1}
                        className="p-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F1F5F9] text-[#475569] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title="تحريك هذا القسم للأسفل"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      {/* Toggle Visibility */}
                      <button
                        type="button"
                        onClick={() => handleToggleSectionVisibility(sec.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                          sec.enabled
                            ? 'bg-emerald-50 text-[#087443] border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-500 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {sec.enabled ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>ظاهر في الموقع</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>مخفي</span>
                          </>
                        )}
                      </button>

                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] flex items-center justify-between">
                <span>✓ يتم تطبيق الترتيب فوراً وبشكل تلقائي بمجرد النقر على الأسهم أو أزرار الإظهار والإخفاء.</span>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="font-bold underline cursor-pointer"
                >
                  تأكيد الحفظ النهائي
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: HERO & METRICS                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'hero_stats' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-bold text-[#087443] block mb-1">
                الواجهة الرئيسية والمؤشرات الحية
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-6">
                تعديل نصوص واجهة الموقع والأرقام الإحصائية
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hero Title */}
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    عنوان الواجهة الرئيسي (Title)
                  </label>
                  <input
                    type="text"
                    value={store.settings.heroTitleAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, heroTitleAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#087443]"
                  />
                </div>

                {/* Hero Tagline */}
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    الشعار والعبارة التأسيسية البارزة (Tagline)
                  </label>
                  <input
                    type="text"
                    value={store.settings.heroTaglineAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, heroTaglineAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#087443]"
                  />
                </div>

                {/* Hero Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    النص التمهيدي للواجهة (Description)
                  </label>
                  <textarea
                    rows={3}
                    value={store.settings.heroDescAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, heroDescAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-hidden focus:border-[#087443]"
                  />
                </div>
              </div>

              {/* Vital Metrics Counters */}
              <div className="mt-8 pt-6 border-t border-[#F1F5F9]">
                <h3 className="text-sm font-bold text-[#0F172A] mb-4">
                  الأرقام والمؤشرات الحية في الواجهة
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">
                      عدد الأعضاء والمشاركين
                    </label>
                    <input
                      type="text"
                      value={store.settings.statMembers || '128,400+'}
                      onChange={(e) => setStore({
                        ...store,
                        settings: { ...store.settings, statMembers: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-bold text-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">
                      عدد الوثائق والأبحاث
                    </label>
                    <input
                      type="text"
                      value={store.settings.statDocuments || '1,420+'}
                      onChange={(e) => setStore({
                        ...store,
                        settings: { ...store.settings, statDocuments: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-bold text-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">
                      المؤسسات والجامعات الشريكة
                    </label>
                    <input
                      type="text"
                      value={store.settings.statPartners || '385+'}
                      onChange={(e) => setStore({
                        ...store,
                        settings: { ...store.settings, statPartners: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-bold text-[#087443]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">
                      الدول الممثلة في الحراك
                    </label>
                    <input
                      type="text"
                      value={store.settings.statCountries || '142'}
                      onChange={(e) => setStore({
                        ...store,
                        settings: { ...store.settings, statCountries: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs font-bold text-[#087443]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-5 py-2.5 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  حفظ التعديلات
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SITE GENERAL INFO & CONTACT                                       */}
        {/* ========================================================================= */}
        {activeTab === 'site_info' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-bold text-[#087443] block mb-1">
                معلومات وهوية الأمانة
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-6">
                البيانات التعريفية وعناوين التواصل الرسمية
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    الاسم الرسمي باللغة العربية
                  </label>
                  <input
                    type="text"
                    value={store.settings.officialNameAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, officialNameAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    الاسم الرسمي باللغة الإنجليزية
                  </label>
                  <input
                    type="text"
                    value={store.settings.officialNameEn}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, officialNameEn: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    البريد الإلكتروني الرسمي للتواصل
                  </label>
                  <input
                    type="email"
                    value={store.settings.contactEmail || 'contact@secretariat-palestine.org'}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, contactEmail: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    المقر الرقمي الدولي
                  </label>
                  <input
                    type="text"
                    value={store.settings.officialAddressAr || 'المقر الرقمي الدولي — الأمانة العامة للمجتمع العالمي'}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, officialAddressAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    الإشعار والصفة الرقمية المعتمدة
                  </label>
                  <textarea
                    rows={2}
                    value={store.settings.digitalNoticeAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, digitalNoticeAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-5 py-2.5 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  حفظ البيانات
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CHARTER, VISION & MISSION                                         */}
        {/* ========================================================================= */}
        {activeTab === 'about_vision' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-bold text-[#087443] block mb-1">
                المنطلقات والميثاق
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-6">
                نصوص الرؤية والرسالة والوضع القانوني للأمانة
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    نص الرؤية الاستراتيجية (Strategic Vision)
                  </label>
                  <textarea
                    rows={3}
                    value={store.settings.visionStatementAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, visionStatementAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    الرسالة التأسيسية (Foundational Mission)
                  </label>
                  <textarea
                    rows={3}
                    value={store.settings.missionLeadAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, missionLeadAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-2">
                    الوضع القانوني والصفة المؤسسية المعتمدة
                  </label>
                  <textarea
                    rows={3}
                    value={store.settings.legalStatusCoreAr}
                    onChange={(e) => setStore({
                      ...store,
                      settings: { ...store.settings, legalStatusCoreAr: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-5 py-2.5 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  حفظ النصوص
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: NEWS & STATEMENTS CRUD                                             */}
        {/* ========================================================================= */}
        {activeTab === 'news' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-xs font-bold text-[#087443] block mb-1">
                    البيانات الصحفية والتقارير
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    إدارة البيانات الرسمية والأخبار ({store.news?.length || 0})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingNews(!isAddingNews)}
                  className="px-4 py-2 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isAddingNews ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isAddingNews ? 'إلغاء الإضافة' : 'إضافة بيان أو خبر جديد'}</span>
                </button>
              </div>

              {/* Add News Form Modal */}
              {isAddingNews && (
                <div className="mt-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#0F172A]">بيانات الخبر أو البيان الجديد</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">نوع المنشور</label>
                      <select
                        value={newNews.category}
                        onChange={(e) => setNewNews({ ...newNews, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      >
                        <option value="statement">بيان رسمي (Statement)</option>
                        <option value="news">خبر صحفي (News)</option>
                        <option value="report">تقرير تحليلي (Report)</option>
                        <option value="decision">قرار تنفيذي (Decision)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">الرقم المرجعي الرسمي</label>
                      <input
                        type="text"
                        value={newNews.officialRef}
                        onChange={(e) => setNewNews({ ...newNews, officialRef: e.target.value })}
                        placeholder="GS-PAL/2026/DOC-..."
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">عنوان البيان (بالعربية)</label>
                      <input
                        type="text"
                        value={newNews.title?.ar}
                        onChange={(e) => setNewNews({ ...newNews, title: { ...newNews.title!, ar: e.target.value } })}
                        placeholder="أدخل عنوان البيان الرسمي..."
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-bold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">الملخص الموجز</label>
                      <textarea
                        rows={2}
                        value={newNews.summary?.ar}
                        onChange={(e) => setNewNews({ ...newNews, summary: { ...newNews.summary!, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">النص الكامل للبيان</label>
                      <textarea
                        rows={4}
                        value={newNews.content?.ar}
                        onChange={(e) => setNewNews({ ...newNews, content: { ...newNews.content!, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNews(false)}
                      className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-xs text-[#475569]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateNews}
                      className="px-4 py-2 rounded-lg bg-[#087443] text-white text-xs font-bold shadow-xs"
                    >
                      حفظ ونشر البيان فوراً
                    </button>
                  </div>
                </div>
              )}

              {/* News List */}
              <div className="mt-6 space-y-3">
                {store.news.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#087443]">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-[#64748B]">{item.date}</span>
                        {item.officialRef && (
                          <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {item.officialRef}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#0F172A]">{item.title.ar}</h4>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-1">{item.summary.ar}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteNews(item.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="حذف هذا البيان"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: KNOWLEDGE DOCUMENTS CRUD                                          */}
        {/* ========================================================================= */}
        {activeTab === 'documents' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-xs font-bold text-[#087443] block mb-1">
                    أرشيف المعرفة والوثائق المحكمة
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    إدارة مركز المعرفة والوثائق ({store.documents?.length || 0})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingDoc(!isAddingDoc)}
                  className="px-4 py-2 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isAddingDoc ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isAddingDoc ? 'إلغاء الإضافة' : 'إضافة وثيقة / بحث جديد'}</span>
                </button>
              </div>

              {/* Add Document Form */}
              {isAddingDoc && (
                <div className="mt-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#0F172A]">إضافة وثيقة جديدة للأرشيف</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">التصنيف الرئيسي</label>
                      <select
                        value={newDoc.category}
                        onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      >
                        <option value="international_law">القانون الدولي وقرارات الأمم المتحدة</option>
                        <option value="history">التاريخ الدبلوماسي والوثائق التأسيسية</option>
                        <option value="academic_research">الأبحاث الأكاديمية المحكمة</option>
                        <option value="civil_society">تقارير منظمات المجتمع المدني</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">رقم الإيداع الأرشيفي</label>
                      <input
                        type="text"
                        value={newDoc.accessionNo}
                        onChange={(e) => setNewDoc({ ...newDoc, accessionNo: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">عنوان الوثيقة (بالعربية)</label>
                      <input
                        type="text"
                        value={newDoc.title?.ar}
                        onChange={(e) => setNewDoc({ ...newDoc, title: { ...newDoc.title!, ar: e.target.value } })}
                        placeholder="الرأي الاستشاري لمحكمة العدل الدولية..."
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">جهة الإصدار أو المصدر</label>
                      <input
                        type="text"
                        value={newDoc.source}
                        onChange={(e) => setNewDoc({ ...newDoc, source: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">سنة الإصدار</label>
                      <input
                        type="text"
                        value={newDoc.date}
                        onChange={(e) => setNewDoc({ ...newDoc, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">ملخص الوثيقة والنتائج</label>
                      <textarea
                        rows={3}
                        value={newDoc.summary?.ar}
                        onChange={(e) => setNewDoc({ ...newDoc, summary: { ...newDoc.summary!, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingDoc(false)}
                      className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-xs text-[#475569]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateDoc}
                      className="px-4 py-2 rounded-lg bg-[#087443] text-white text-xs font-bold shadow-xs"
                    >
                      أرشفة الوثيقة في مركز المعرفة
                    </button>
                  </div>
                </div>
              )}

              {/* Documents List */}
              <div className="mt-6 space-y-3">
                {store.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                          {doc.accessionNo}
                        </span>
                        <span className="text-[11px] text-[#64748B]">{doc.source} ({doc.date})</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0F172A]">{doc.title.ar}</h4>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-1">{doc.summary.ar}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="حذف هذه الوثيقة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: YOUTH & RESEARCHER INITIATIVES                                     */}
        {/* ========================================================================= */}
        {activeTab === 'youth' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-xs font-bold text-[#087443] block mb-1">
                    فئة الشباب والباحثين
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    إدارة برامج ومبادرات الشباب والباحثين ({store.youthInitiatives?.length || 0})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingYouth(!isAddingYouth)}
                  className="px-4 py-2 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isAddingYouth ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isAddingYouth ? 'إلغاء الإضافة' : 'إضافة برنامج شبابي جديد'}</span>
                </button>
              </div>

              {/* Add Youth Initiative Form */}
              {isAddingYouth && (
                <div className="mt-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#0F172A]">إضافة مبادرة جديدة</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">رقم البرنامج</label>
                      <input
                        type="text"
                        value={newYouth.num}
                        onChange={(e) => setNewYouth({ ...newYouth, num: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">المجال / الفئة</label>
                      <input
                        type="text"
                        value={newYouth.category}
                        onChange={(e) => setNewYouth({ ...newYouth, category: e.target.value })}
                        placeholder="أكاديمية / زمالات / ترجمة..."
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">عنوان المبادرة بالعربية</label>
                      <input
                        type="text"
                        value={newYouth.title?.ar}
                        onChange={(e) => setNewYouth({ ...newYouth, title: { ...newYouth.title!, ar: e.target.value } })}
                        placeholder="برنامج الزمالة البحثية لطلبة الماجستير والدكتوراه..."
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-bold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">وصف المبادرة والأهداف</label>
                      <textarea
                        rows={3}
                        value={newYouth.desc?.ar}
                        onChange={(e) => setNewYouth({ ...newYouth, desc: { ...newYouth.desc!, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingYouth(false)}
                      className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-xs text-[#475569]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateYouth}
                      className="px-4 py-2 rounded-lg bg-[#087443] text-white text-xs font-bold shadow-xs"
                    >
                      حفظ ونشر المبادرة
                    </button>
                  </div>
                </div>
              )}

              {/* Youth Initiatives List */}
              <div className="mt-6 space-y-3">
                {(store.youthInitiatives || []).map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#087443]">
                          {item.num}
                        </span>
                        <span className="text-[11px] text-[#64748B]">{item.category}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0F172A]">{item.title.ar}</h4>
                      <p className="text-xs text-[#64748B] mt-1">{item.desc.ar}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteYouth(item.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="حذف هذه المبادرة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: EVENTS CRUD                                                        */}
        {/* ========================================================================= */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-xs font-bold text-[#087443] block mb-1">
                    المؤتمرات والندوات الدولية
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    إدارة الفعاليات والمشاركات المدنية ({store.events?.length || 0})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingEvent(!isAddingEvent)}
                  className="px-4 py-2 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isAddingEvent ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isAddingEvent ? 'إلغاء الإضافة' : 'إضافة فعالية جديدة'}</span>
                </button>
              </div>

              {/* Add Event Form */}
              {isAddingEvent && (
                <div className="mt-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#0F172A]">بيانات الفعالية الجديدة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">عنوان الفعالية بالعربية</label>
                      <input
                        type="text"
                        value={newEvent.title?.ar}
                        onChange={(e) => setNewEvent({ ...newEvent, title: { ...newEvent.title!, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">التاريخ</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">التوقيت</label>
                      <input
                        type="text"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingEvent(false)}
                      className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-xs text-[#475569]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateEvent}
                      className="px-4 py-2 rounded-lg bg-[#087443] text-white text-xs font-bold shadow-xs"
                    >
                      حفظ الفعالية
                    </button>
                  </div>
                </div>
              )}

              {/* Events List */}
              <div className="mt-6 space-y-3">
                {store.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                          {ev.date}
                        </span>
                        <span className="text-[11px] text-[#64748B]">{ev.time}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0F172A]">{ev.title.ar}</h4>
                      <p className="text-xs text-[#64748B] mt-1">{ev.location.ar}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="حذف هذه الفعالية"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: PARTNERS CRUD                                                     */}
        {/* ========================================================================= */}
        {activeTab === 'partners' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-xs font-bold text-[#087443] block mb-1">
                    الشبكة الأكاديمية والمؤسسية
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    إدارة المؤسسات والجامعات الشريكة ({store.partners?.length || 0})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingPartner(!isAddingPartner)}
                  className="px-4 py-2 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isAddingPartner ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{isAddingPartner ? 'إلغاء الإضافة' : 'إضافة مؤسسة شريكة'}</span>
                </button>
              </div>

              {/* Add Partner Form */}
              {isAddingPartner && (
                <div className="mt-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-4">
                  <h3 className="text-sm font-bold text-[#0F172A]">بيانات المؤسسة أو الجامعة الشريكة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">اسم المؤسسة (بالعربية)</label>
                      <input
                        type="text"
                        value={newPartner.name?.ar}
                        onChange={(e) => setNewPartner({ ...newPartner, name: { ...newPartner.name!, ar: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#475569] mb-1">الدولة</label>
                      <input
                        type="text"
                        value={newPartner.country}
                        onChange={(e) => setNewPartner({ ...newPartner, country: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#475569] mb-1">مجال التعاون والتركيز</label>
                      <input
                        type="text"
                        value={newPartner.focusArea}
                        onChange={(e) => setNewPartner({ ...newPartner, focusArea: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingPartner(false)}
                      className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-xs text-[#475569]"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={handleCreatePartner}
                      className="px-4 py-2 rounded-lg bg-[#087443] text-white text-xs font-bold shadow-xs"
                    >
                      اعتماد المؤسسة
                    </button>
                  </div>
                </div>
              )}

              {/* Partners List */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {store.partners.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#087443]">
                        {p.country}
                      </span>
                      <h4 className="text-sm font-bold text-[#0F172A] mt-1">{p.name.ar}</h4>
                      <p className="text-xs text-[#64748B] mt-0.5">{p.focusArea}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeletePartner(p.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="حذف المؤسسة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 11: SECURITY & PASSWORD CHANGE                                       */}
        {/* ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
              <div className="text-center mb-6 pb-6 border-b border-[#F1F5F9]">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-[#0F172A]">
                  إدارة كلمة مرور لوحة التحكم والأمان
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  لوحة التحكم محمية بكلمة مرور مشفرة لمنع أي وصول غير مصرح به. يمكنك تحديث كلمة المرور هنا.
                </p>
              </div>

              {passwordChangeStatus && (
                <div className={`mb-6 p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
                  passwordChangeStatus.success
                    ? 'bg-emerald-50 text-[#087443] border border-emerald-200'
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {passwordChangeStatus.success ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <span>{passwordChangeStatus.msg}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    كلمة المرور الحالية
                  </label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="أدخل كلمة المرور الحالية..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="أدخل كلمة المرور الجديدة (6 خانات على الأقل)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    تأكيد كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="أعد إدخال كلمة المرور الجديدة..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs font-mono"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>تحديث كلمة مرور لوحة التحكم</span>
                  </button>
                </div>
              </form>

              {/* Session Security Details */}
              <div className="mt-8 pt-6 border-t border-[#F1F5F9] space-y-3 text-xs text-[#64748B]">
                <div className="flex items-center justify-between">
                  <span>حالة الجلسة الحالية:</span>
                  <span className="font-bold text-[#087443] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    مفوضة ونشطة
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>تاريخ آخر تحديث لكلمة المرور:</span>
                  <span className="font-mono text-[11px]">{store.security?.lastChanged ? new Date(store.security.lastChanged).toLocaleDateString('ar-EG') : 'الافتراضي'}</span>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>إنهاء الجلسة وتسجيل الخروج فوراً</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
