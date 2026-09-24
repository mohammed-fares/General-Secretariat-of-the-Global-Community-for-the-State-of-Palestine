import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, CheckCircle, Scale, Eye, Lock, FileSpreadsheet } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TransparencyProps {
  currentLang: Language;
}

export const Transparency: React.FC<TransparencyProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<string>('structure');
  const t = translations[currentLang];

  const items = [
    { id: 'structure', label: t.transparency.tabs.structure, icon: Scale },
    { id: 'annualReports', label: t.transparency.tabs.annualReports, icon: FileText },
    { id: 'financialReports', label: t.transparency.tabs.financialReports, icon: FileSpreadsheet },
    { id: 'funding', label: t.transparency.tabs.funding, icon: Eye },
    { id: 'conflictPolicy', label: t.transparency.tabs.conflictPolicy, icon: ShieldCheck },
    { id: 'privacyPolicy', label: t.transparency.tabs.privacyPolicy, icon: Lock },
    { id: 'membershipTerms', label: t.transparency.tabs.membershipTerms, icon: CheckCircle },
    { id: 'codeOfConduct', label: t.transparency.tabs.codeOfConduct, icon: Scale },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2 text-[#087443]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'الحوكمة الرشيدة' : 'Governance & Accountability'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-3">
            {t.transparency.title}
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed">
            {t.transparency.lead}
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {items.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl border text-start flex items-center gap-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                    : 'bg-[#F7F8F6] text-[#4B5563] border-[#E5E7EB] hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#34D399]' : 'text-[#087443]'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="p-8 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB]">
          {activeTab === 'structure' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'الهيكل التنظيمي للأمانة العامة' : 'Organizational Architecture'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'تتبع الأمانة العامة نموذج حوكمة تشاركي غير مركزي، يفصل بين الإشراف العام، واللجان الأكاديمية والقانونية، وإدارة المنصة الرقمية، بما يضمن استقلالية القرارات ومطابقتها للمعايير المهنية الدولية.'
                  : 'The Secretariat operates under a decentralized, participatory governance model separating general oversight, independent legal and archival committees, and digital platform administration.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#E5E7EB]">
                  <h4 className="font-bold text-sm text-[#111111] mb-1">
                    {currentLang === 'ar' ? '1. المجلس الاستشاري الأعلى' : '1. High Advisory Council'}
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    {currentLang === 'ar' ? 'شخصيات أكاديمية وقانونية دولية معنية بالسياسات العامة والتوجيه الاستراتيجي.' : 'International jurists and scholars providing strategic policy guidance.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E5E7EB]">
                  <h4 className="font-bold text-sm text-[#111111] mb-1">
                    {currentLang === 'ar' ? '2. الأمانة التنفيذية' : '2. Executive Secretariat'}
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    {currentLang === 'ar' ? 'إدارة العمليات اليومية، وشؤون العضوية، والتنسيق الإقليمي مع الشركاء.' : 'Managing daily operations, verified membership registry, and cross-border initiatives.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E5E7EB]">
                  <h4 className="font-bold text-sm text-[#111111] mb-1">
                    {currentLang === 'ar' ? '3. اللجان المتخصصة' : '3. Specialized Committees'}
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    {currentLang === 'ar' ? 'لجنة القانون الدولي، لجنة التوثيق التاريخي، ولجنة النشر والإعلام.' : 'International Law, Historical Cartography, and Digital Publications committees.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'annualReports' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'التقارير السنوية المنشورة' : 'Published Annual Reports'}
              </h3>
              <p className="text-sm text-[#4B5563]">
                {currentLang === 'ar' ? 'نشر ملخصات الأنشطة والمشاريع والمؤتمرات التي تم تنظيمها وإنجازها سنوياً.' : 'Annual activity briefs and international symposia review summaries.'}
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { title: currentLang === 'ar' ? 'التقرير السنوي لإنجازات التوثيق والأرشفة الرقمية (2025)' : 'Annual Report on Documentation & Digital Archiving (2025)', pages: '64 pages', date: 'January 2026' },
                  { title: currentLang === 'ar' ? 'تقرير التوسع الدولي وشبكة المؤسسات الشريكة (2024-2025)' : 'Report on International Partnerships & Academic Networks (2024–2025)', pages: '42 pages', date: 'June 2025' }
                ].map((rep, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#111111]">{rep.title}</h4>
                      <span className="text-xs text-[#6B7280]">{rep.date} · {rep.pages}</span>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] text-white text-xs hover:bg-[#222222] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{currentLang === 'ar' ? 'تحميل' : 'Download'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financialReports' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'التقارير المالية والتدقيق المحاسبي' : 'Audited Financial Statements'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'تخضع جميع موارد ونفقات الأمانة العامة لتدقيق محاسبي دوري مستقل وفق المعايير المحاسبية الدولية للمنظمات غير الهادفة للربح، ويتم نشر القوائم المالية السنوية بشفافية تامة.'
                  : 'All operational revenues and expenditures are subject to independent external audit under International Financial Reporting Standards (IFRS) for non-profit entities.'}
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#E5E7EB]">
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span className="font-mono text-[#087443] font-semibold">AUDITED REPORT FY-2025</span>
                  <span>Independent Audit Firm</span>
                </div>
                <h4 className="text-sm font-bold text-[#111111] mb-1">
                  {currentLang === 'ar' ? 'البيان المالي المدقق للسنة المالية المنتهية 2025' : 'Audited Financial Statement for Fiscal Year 2025'}
                </h4>
                <p className="text-xs text-[#4B5563]">
                  {currentLang === 'ar' ? 'تقرير خالٍ من أي ملاحظات جوهرية يؤكد التزام الأمانة العامة بنزاهة التسيير واستخدام الموارد في الأهداف المعرفية المعتمدة.' : 'Unqualified clean audit opinion confirming full compliance with operational bylaws.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'funding' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'مصادر التمويل والأخلاقيات' : 'Funding Sources & Ethics'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'ترتكز الأمانة العامة في تمويل برامجها على الاشتراكات الطوعية للأعضاء والمؤسسات الأكاديمية الشريكة والهبات المدنية المشروطة بالحيادية العلمية. وتعتمد المنصة سياسة صارمة ترفض أي تمويل مشروط يمس باستقلالية خطها التوثيقي أو أمانتها المعرفية.'
                  : 'The Secretariat operates through voluntary member contributions, institutional academic grants, and unconditional civic funding. Any conditional funding compromising scientific independence is strictly prohibited.'}
              </p>
            </div>
          )}

          {activeTab === 'conflictPolicy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'سياسة منع تضارب المصالح' : 'Conflict of Interest Policy'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'يلتزم جميع أعضاء اللجان والمستشارين بالإفصاح السنوي الكامل عن أي انتماءات أو مصالح قد تتقاطع مع أعمال التقييم الأكاديمي أو التعاقدات المؤسسية، مع الامتناع عن التصويت في القرارات ذات الصلة.'
                  : 'All committee members, advisors, and executives must submit annual conflict-of-interest declarations and recuse themselves from deliberations where personal affiliations could arise.'}
              </p>
            </div>
          )}

          {activeTab === 'privacyPolicy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'حماية البيانات والخصوصية (GDPR)' : 'Data Protection & Privacy Policy'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'تلتزم الأمانة العامة بحماية خصوصية بيانات كافة المنتسبين وفق المعايير العامة لحماية البيانات (GDPR). لا يتم تبادل أو بيع بيانات الأعضاء تحت أي ظرف، وتستخدم البيانات حصراً لأغراض التواصل المؤسسي والوصول للخدمات المعرفية.'
                  : 'The Secretariat adheres to strict data minimization and privacy standards aligned with the General Data Protection Regulation (GDPR). Member records are never shared with third parties or monetized.'}
              </p>
            </div>
          )}

          {activeTab === 'membershipTerms' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'شروط العضوية والانتساب' : 'Membership Bylaws & Eligibility'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'الانتساب متاح لجميع الأفراد والمؤسسات والباحثين من مختلف دول العالم الذين يلتزمون بأهداف المنصة ومبادئها المؤسسية. وتُعد العضوية غير حكومية وغير رسمية، ولا تُخول حاملها تمثيلاً سياسياً أو دبلوماسياً للدولة.'
                  : 'Membership is open globally to scholars, civic participants, and institutions who commit to the Secretariat’s charter. Credentials remain non-governmental and do not confer diplomatic or official state authority.'}
              </p>
            </div>
          )}

          {activeTab === 'codeOfConduct' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#111111]">
                {currentLang === 'ar' ? 'مدونة السلوك المؤسسي' : 'Institutional Code of Conduct'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'ترسي مدونة السلوك معايير الاحترام المتبادل، والنزاهة الفكرية، وحظر كافة أشكال التمييز أو التحريض، والالتزام بالقواعد الأخلاقية للبحث العلمي والحوار المدني البناء.'
                  : 'Our Code of Conduct enforces mutual dignity, scholarly rigor, the total rejection of hate speech or discrimination, and strict adherence to academic ethics in all global assemblies.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
