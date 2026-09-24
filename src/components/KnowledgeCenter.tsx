import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ExternalLink, Bookmark, Check, Copy, FileText, Download, X } from 'lucide-react';
import { KnowledgeCategory, KnowledgeDocument, Language, MemberProfile } from '../types';
import { knowledgeDocuments } from '../data/mockDatabase';
import { translations } from '../data/translations';
import { loadCmsStore } from '../data/contentStore';

interface KnowledgeCenterProps {
  currentLang: Language;
  member: MemberProfile | null;
  onToggleBookmark: (docId: string) => void;
}

export const KnowledgeCenter: React.FC<KnowledgeCenterProps> = ({
  currentLang,
  member,
  onToggleBookmark,
}) => {
  const [selectedCat, setSelectedCat] = useState<KnowledgeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoc, setActiveDoc] = useState<KnowledgeDocument | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [docsList, setDocsList] = useState<KnowledgeDocument[]>(() => {
    try {
      return loadCmsStore().documents;
    } catch {
      return knowledgeDocuments;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setDocsList(loadCmsStore().documents);
    };
    window.addEventListener('pal_gc_content_updated', handleUpdate);
    return () => window.removeEventListener('pal_gc_content_updated', handleUpdate);
  }, []);

  const t = translations[currentLang];

  const categories: { id: KnowledgeCategory; label: string }[] = [
    { id: 'all', label: t.knowledge.categories.all },
    { id: 'international_law', label: t.knowledge.categories.international_law },
    { id: 'history', label: t.knowledge.categories.history },
    { id: 'research', label: t.knowledge.categories.research },
    { id: 'civil_society', label: t.knowledge.categories.civil_society },
  ];

  const filteredDocs = docsList.filter((doc) => {
    const matchesCat = selectedCat === 'all' || doc.category === selectedCat;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;

    const titleMatch = doc.title[currentLang].toLowerCase().includes(query);
    const summaryMatch = doc.summary[currentLang].toLowerCase().includes(query);
    const sourceMatch = doc.source.toLowerCase().includes(query);
    const accessionMatch = doc.accessionNo.toLowerCase().includes(query);

    return matchesCat && (titleMatch || summaryMatch || sourceMatch || accessionMatch);
  });

  const handleCopyCitation = (doc: KnowledgeDocument) => {
    navigator.clipboard.writeText(doc.citation);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-20 bg-[#F7F8F6] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-[#087443]" />
            <span className="text-xs font-semibold text-[#087443] font-['Cairo'] tracking-normal">
              {t.knowledge.subtitle} — "{currentLang === 'ar' ? 'نعرف من المصادر' : 'We Know from the Sources'}"
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-3">
            {t.knowledge.title}
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed">
            {t.knowledge.desc}
          </p>
        </div>

        {/* Search Bar & Category Navigation */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-[#9CA3AF] absolute top-1/2 -translate-y-1/2 start-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.knowledge.searchPlaceholder}
              className="w-full bg-white border border-[#E5E7EB] rounded-xl ps-12 pe-4 py-3.5 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#087443] focus:border-transparent transition-all shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCat === cat.id
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-white text-[#4B5563] hover:text-[#111111] border border-[#E5E7EB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => {
            const isBookmarked = member?.bookmarkedDocIds?.includes(doc.id);
            return (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-[#E5E7EB] hover:border-[#087443]/40 transition-all duration-200 p-6 flex flex-col justify-between hover:shadow-xs group"
              >
                <div>
                  {/* Accession No. and Subcategory (Unboxed metadata) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[#6B7280] mb-3">
                    <span className="font-mono text-[#087443] font-medium">
                      {doc.accessionNo}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{doc.subcategory[currentLang]}</span>
                      {member && (
                        <button
                          onClick={() => onToggleBookmark(doc.id)}
                          className={`p-1 rounded hover:bg-[#F3F4F6] transition-colors ${
                            isBookmarked ? 'text-[#087443]' : 'text-[#9CA3AF]'
                          }`}
                          title={isBookmarked ? 'Saved to Member Dossier' : 'Save to Member Dossier'}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Document Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#087443] transition-colors mb-3 leading-snug">
                    {doc.title[currentLang]}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-[#4B5563] line-clamp-3 leading-relaxed mb-4">
                    {doc.summary[currentLang]}
                  </p>

                  {/* Metadata Definitions (Unboxed tabular layout) */}
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#6B7280] py-3 border-y border-[#F3F4F6] mb-4">
                    <div>
                      <dt className="text-[#9CA3AF]">{t.knowledge.source}:</dt>
                      <dd className="font-medium text-[#111111] truncate">{doc.source}</dd>
                    </div>
                    <div>
                      <dt className="text-[#9CA3AF]">{t.knowledge.date}:</dt>
                      <dd className="font-medium text-[#111111]">{doc.date}</dd>
                    </div>
                    <div>
                      <dt className="text-[#9CA3AF]">{t.knowledge.type}:</dt>
                      <dd className="font-medium text-[#111111] truncate">{doc.type}</dd>
                    </div>
                    <div>
                      <dt className="text-[#9CA3AF]">{currentLang === 'ar' ? 'اللغات الرسمية' : 'Languages'}:</dt>
                      <dd className="font-medium text-[#111111]">{doc.language}</dd>
                    </div>
                  </dl>
                </div>

                {/* Document Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCitation(doc)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs text-[#374151] transition-colors"
                      title={doc.citation}
                    >
                      {copiedId === doc.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#087443]" />
                          <span className="text-[#087443]">{t.knowledge.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>{t.knowledge.citation}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveDoc(doc)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#F3F4F6] hover:bg-[#E5E7EB] text-xs font-medium text-[#111111] transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{currentLang === 'ar' ? 'معاينة الوثيقة' : 'Preview Brief'}</span>
                    </button>
                  </div>

                  <a
                    href={doc.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-[#087443] hover:text-[#065F36] transition-colors"
                  >
                    <span>{t.knowledge.officialLink}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB]">
            <p className="text-[#6B7280] text-sm">
              {currentLang === 'ar' ? 'لا توجد وثائق مطابقة لبحثك في الأرشيف.' : 'No archived documents matched your search query.'}
            </p>
          </div>
        )}

      </div>

      {/* Document Detailed Preview Modal */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E5E7EB] relative">
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-[#087443] font-semibold block mb-1">
                  {activeDoc.accessionNo}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] leading-snug">
                  {activeDoc.title[currentLang]}
                </h3>
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">
                  {currentLang === 'ar' ? 'الملخص القانوني والتاريخي' : 'Legal & Historical Abstract'}
                </h4>
                <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
                  {activeDoc.summary[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#E5E7EB]">
                <h4 className="text-xs font-semibold text-[#111111] mb-1">
                  {currentLang === 'ar' ? 'صيغة الاستشهاد الأكاديمي المعتمدة (Citation)' : 'Official Academic Citation'}
                </h4>
                <p className="text-xs font-mono text-[#4B5563] leading-relaxed select-all">
                  {activeDoc.citation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#6B7280] block">{t.knowledge.source}:</span>
                  <span className="font-semibold text-[#111111]">{activeDoc.source}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block">{t.knowledge.date}:</span>
                  <span className="font-semibold text-[#111111]">{activeDoc.date}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-4">
              <a
                href={activeDoc.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087443] hover:underline"
              >
                <span>{t.knowledge.officialLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#111111] text-white text-xs font-medium hover:bg-[#222222] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{currentLang === 'ar' ? 'تصدير الوثيقة' : 'Export Brief'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
