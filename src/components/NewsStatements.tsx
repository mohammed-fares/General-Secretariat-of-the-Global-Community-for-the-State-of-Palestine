import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Globe2, ArrowUpRight, X, Download, Share2, Check } from 'lucide-react';
import { Language, NewsCategory, NewsItem } from '../types';
import { newsData } from '../data/mockDatabase';
import { translations } from '../data/translations';
import { loadCmsStore } from '../data/contentStore';

interface NewsStatementsProps {
  currentLang: Language;
}

export const NewsStatements: React.FC<NewsStatementsProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [itemsList, setItemsList] = useState<NewsItem[]>(() => {
    try {
      return loadCmsStore().news;
    } catch {
      return newsData;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setItemsList(loadCmsStore().news);
    };
    window.addEventListener('pal_gc_content_updated', handleUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleUpdate);
  }, []);

  const t = translations[currentLang];

  const categories: { id: NewsCategory; label: string }[] = [
    { id: 'all', label: t.news.categories.all },
    { id: 'statement', label: t.news.categories.statement },
    { id: 'news', label: t.news.categories.news },
    { id: 'report', label: t.news.categories.report },
    { id: 'event', label: t.news.categories.event },
    { id: 'document', label: t.news.categories.document },
    { id: 'research', label: t.news.categories.research },
  ];

  const filteredItems = selectedCategory === 'all'
    ? itemsList
    : itemsList.filter((item) => item.category === selectedCategory);

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#087443] mb-2 block font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'الإعلام والبيانات المعتمدة' : 'Official Communications'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">
              {t.news.title}
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2">
              {t.news.subtitle}
            </p>
          </div>

          {/* Category Filter Tabs (Single-line interactive controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111] hover:bg-[#E5E7EB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-[#F7F8F6] rounded-xl border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 flex flex-col justify-between p-6 group hover:shadow-xs"
            >
              <div>
                {/* Unboxed Metadata (Zero-pill discipline) */}
                <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-3">
                  <span className="font-semibold text-[#087443]">
                    {t.news.categories[item.category]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                    <span>{item.date}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.language}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#087443] transition-colors line-clamp-2 mb-3 leading-snug">
                  {item.title[currentLang]}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#4B5563] line-clamp-3 leading-relaxed mb-6">
                  {item.summary[currentLang]}
                </p>
              </div>

              {/* Card Footer: Source & Read More CTA */}
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-xs text-[#6B7280] truncate max-w-[160px]">
                  {item.source}
                </span>
                <button
                  onClick={() => setActiveItem(item)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#087443] hover:text-[#065F36] transition-colors"
                >
                  <span>{t.news.readMore}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Document Reader Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E5E7EB] relative animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold text-[#087443]">
                    {t.news.categories[activeItem.category]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeItem.date}</span>
                  {activeItem.officialRef && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#111111]">{activeItem.officialRef}</span>
                    </>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] leading-tight">
                  {activeItem.title[currentLang]}
                </h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed whitespace-pre-line mb-8">
              {activeItem.content[currentLang]}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[#6B7280]">
                <span>{t.news.source}: </span>
                <span className="font-medium text-[#111111]">{activeItem.source}</span>
              </div>

              <div className="flex items-center gap-2">
                {activeItem.officialRef && (
                  <button
                    onClick={() => handleCopyCitation(activeItem.officialRef!)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors text-[#374151]"
                  >
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-[#087443]" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedRef ? (currentLang === 'ar' ? 'تم النسخ' : 'Copied') : (currentLang === 'ar' ? 'مشاركة المرجع' : 'Share Reference')}</span>
                  </button>
                )}
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111111] hover:bg-[#222222] text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{currentLang === 'ar' ? 'طباعة / تصدير' : 'Print / Export'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
