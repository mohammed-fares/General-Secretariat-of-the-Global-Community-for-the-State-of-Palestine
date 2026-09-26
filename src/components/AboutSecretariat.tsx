import React from 'react';
import { 
  Compass, 
  Target, 
  Globe2, 
  BookOpen, 
  Scale, 
  Share2, 
  Users2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Language, NavigationTab } from '../types';
import { OfficialLogo } from './OfficialLogo';

interface AboutSecretariatProps {
  currentLang: Language;
  onNavigate?: (tab: NavigationTab) => void;
}

export const AboutSecretariat: React.FC<AboutSecretariatProps> = ({ currentLang, onNavigate }) => {
  const isRtl = currentLang === 'ar';

  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Identity & Foundational Mandate with Approved Emblem */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <OfficialLogo size="xl" withRing={true} />
          </div>
          <span className="text-xs font-bold text-[#087443] mb-3 block font-['Cairo'] tracking-normal">
            {currentLang === 'ar' ? 'الإطار التأسيسي والمنطلقات' : 'Foundational Charter & Principles'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight mb-6 leading-tight">
            {currentLang === 'ar' ? 'الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين' : 'General Secretariat of the Global Community for the State of Palestine'}
          </h1>
          <div className="text-lg sm:text-xl font-bold text-[#087443] mb-6">
            « {currentLang === 'ar' ? 'من شعوب العالم إلى دولة فلسطين' : 'From the Peoples of the World to the State of Palestine'} »
          </div>
          <p className="text-base sm:text-lg text-[#374151] leading-relaxed mb-6 font-normal">
            {currentLang === 'ar'
              ? 'الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين هي إطار دولي مدني يهدف إلى جمع الأفراد والمجتمعات والمؤسسات والباحثين والمتخصصين من مختلف دول العالم ضمن مساحة مشتركة للتواصل والمعرفة والتوثيق والمشاركة المدنية حول قضية دولة فلسطين.'
              : 'The General Secretariat of the Global Community for the State of Palestine is an international civic framework bringing together individuals, communities, institutions, researchers, and specialists worldwide in a shared space for dialogue, knowledge, archival documentation, and civic engagement.'}
          </p>
          <div className="p-6 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB] text-sm text-[#4B5563] leading-relaxed text-start">
            <p className="mb-3">
              {currentLang === 'ar'
                ? 'تنطلق فكرة الأمانة العامة من وجود اهتمام ومشاركة واسعَين من شعوب ومجتمعات مختلفة حول العالم تجاه قضية فلسطين، ومن الحاجة إلى وجود إطار منظم يستطيع جمع هذا الحضور المتنوع، وتسهيل التواصل بين أفراده، وتنظيم المعلومات والوثائق والمبادرات ذات الصلة، وإتاحة مساحة دولية متعددة اللغات للتعبير المدني والتواصل المجتمعي.'
                : 'The initiative originates from the widespread participation of communities worldwide in the cause of Palestine, and the imperative need for an organized framework to unite this diverse global presence, streamline cross-border dialogue, curate verified records, and provide a multilingual platform for civic expression.'}
            </p>
            <p className="text-xs text-[#6B7280] border-t border-[#E5E7EB] pt-3">
              {currentLang === 'ar'
                ? 'ولا تقوم الأمانة العامة على تمثيل دولة أو حكومة أو جهة رسمية دولية ما لم يعلن ذلك بصورة قانونية وموثقة، وإنما تقدم نفسها بوصفها إطاراً مدنياً مستقلاً وفق وضعها القانوني الفعلي، يعمل على تنظيم المشاركة المجتمعية الدولية المتعلقة برؤيته وأهدافه.'
                : 'The Secretariat does not represent any sovereign government or official multilateral body unless formally accredited, operating independently as a civic body dedicated to organizing international civic solidarity.'}
            </p>
          </div>
        </div>

        {/* Distinct Institutional Framework & Operational Scope (No duplication with Vision/Mission) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* 1. الصفة المدنية المستقلة */}
          <div className="p-8 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#087443] mb-6 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3">
                {currentLang === 'ar' ? 'الصفة المدنية الدولية' : 'Independent Civic Status'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                {currentLang === 'ar'
                  ? 'كيان مدني مستقل ينشط وفق الأطر القانونية واللوائح المنظمة لعمل المؤسسات الدولية غير الحكومية، دون تمثيل سياسي حزبي أو تبعية تنفيذية لأي جهة.'
                  : 'An independent international civic entity operating within statutory frameworks governing international non-governmental bodies.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5E7EB] text-xs font-bold text-[#087443]">
              {currentLang === 'ar' ? 'إطار غير حكومي مستقل' : 'Non-Governmental Framework'}
            </div>
          </div>

          {/* 2. المرجعية القانونية والتوثيق */}
          <div className="p-8 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#087443] mb-6 shadow-xs">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3">
                {currentLang === 'ar' ? 'المرجعية الحقوقية والقانونية' : 'Legal & Human Rights Reference'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                {currentLang === 'ar'
                  ? 'الاستناد الصارم إلى القانون الدولي الإنساني، وقرارات الجمعية العامة للأمم المتحدة، ومخرجات المحاكم الدولية المختصة في توثيق الحقوق الفلسطينية.'
                  : 'Strict adherence to international humanitarian law, UN General Assembly resolutions, and multilateral court determinations.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5E7EB] text-xs font-bold text-[#087443]">
              {currentLang === 'ar' ? 'قرارات الشرعية الدولية' : 'International Law Reference'}
            </div>
          </div>

          {/* 3. الشراكة الأكاديمية والمدنية */}
          <div className="p-8 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#087443] mb-6 shadow-xs">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3">
                {currentLang === 'ar' ? 'التكامل العابر للقارات' : 'Cross-Continental Coalition'}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                {currentLang === 'ar'
                  ? 'بناء جسور معرفية مستدامة بين الجامعات والمنظمات والباحثين في خمس قارات، لتيسير وصول الشعوب إلى الحقيقة الأرشيفية الموثقة.'
                  : 'Forging enduring knowledge bridges across five continents to ensure public access to authenticated archival facts.'}
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5E7EB] text-xs font-bold text-[#087443]">
              {currentLang === 'ar' ? 'شبكة جامعات وباحثين عالمية' : 'Global University Network'}
            </div>
          </div>

        </div>

        {/* Deep Dive Pillars (Exact User Text) */}
        <div className="space-y-8 mb-16">
          <div className="border-b border-[#E5E7EB] pb-4">
            <h3 className="text-2xl font-bold text-[#111111]">
              {currentLang === 'ar' ? 'الركائز التأسيسية لمنظومة الأمانة العامة' : 'Core Foundational Pillars'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. دولة فلسطين */}
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <h4 className="text-lg font-bold text-[#111111] mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#087443]"></span>
                <span>{currentLang === 'ar' ? 'دولة فلسطين' : 'State of Palestine'}</span>
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'تمثل قضية دولة فلسطين المحور الأساسي الذي تدور حوله رؤية الأمانة العامة ورسالتها. وتعمل على توفير مساحة معرفية للتعرف إلى تاريخ فلسطين، وتطور وضعها الدولي، والقرارات الدولية، والأطر القانونية، بالاعتماد على المصادر الرسمية والمراجع الموثوقة مع توضيح مصدر كل معلومة وتاريخها وسياقها.'
                  : 'The State of Palestine constitutes the central anchor of our mandate. We provide certified access to historical treatises, international adjudications, and UN resolutions with verified citations and provenance.'}
              </p>
            </div>

            {/* 2. المجتمع العالمي */}
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <h4 className="text-lg font-bold text-[#111111] mb-2 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#087443]" />
                <span>{currentLang === 'ar' ? 'المجتمع العالمي' : 'Global Community'}</span>
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'يقوم مفهوم المجتمع العالمي على أن المشاركة ليست مرتبطة بجنسية أو دولة أو لغة واحدة. وتستهدف المنصة بناء مساحة يستطيع من خلالها أفراد من دول مختلفة التواصل والمشاركة والوصول إلى الوثائق والفعاليات، مع احترام التنوع وتوفير المحتوى بالعربية والإنجليزية والفرنسية والإسبانية.'
                  : 'Global participation is universal, unbounded by nationality, territory, or language. We cultivate an inclusive environment for researchers, translators, legal practitioners, and civic actors across five continents.'}
              </p>
            </div>

            {/* 3. المعرفة والتوثيق */}
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <h4 className="text-lg font-bold text-[#111111] mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#087443]" />
                <span>{currentLang === 'ar' ? 'المعرفة والتوثيق' : 'Knowledge & Archiving'}</span>
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'تؤمن الأمانة العامة بأن المعرفة الموثقة أساس لفهم القضايا الدولية. وتعمل على إنشاء منظومة معرفية تجمع القرارات الدولية، والأحكام القضائية، والدراسات الأكاديمية، والتقارير البحثية، والمواد التاريخية؛ بهدف تنظيمها وتسهيل الوصول إليها وربط المستخدمين بالمصادر الأصلية.'
                  : 'Verifiable evidence forms the bedrock of multilateral understanding. The Secretariat digitizes, catalogs, and open-sources primary judicial rulings, cartographic archives, and academic dissertations.'}
              </p>
            </div>

            {/* 4. القانون الدولي */}
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <h4 className="text-lg font-bold text-[#111111] mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#087443]" />
                <span>{currentLang === 'ar' ? 'القانون الدولي' : 'International Law'}</span>
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'يمثل أحد المجالات الرئيسية في العمل المعرفي، من خلال توفير مصادر التعرف إلى الأمم المتحدة، والمحاكم والهيئات الدولية، والاتفاقيات والمعاهدات والقرارات المنشورة، مع الحرص الصارم على الفصل بين النص القانوني الأصلي وبين التفسير أو التحليل.'
                  : 'International legality is our paramount guide. We provide direct access to ICJ Advisory Opinions, Geneva Conventions, and UN instruments with strict separation between operative statutory texts and commentary.'}
              </p>
            </div>

            {/* 5. التواصل الدولي والمشاركة المدنية */}
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <h4 className="text-lg font-bold text-[#111111] mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#087443]" />
                <span>{currentLang === 'ar' ? 'التواصل والمشاركة المدنية' : 'Dialogue & Civic Action'}</span>
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'بناء شبكة تواصل دولية لتبادل الخبرات والتعاون بين الباحثين والمبادرات والمؤسسات في إطار يحمي الخصوصية. وإتاحة المشاركة المدنية الطوعية مع الالتزام بالقوانين المحلية والدولية، وحظر أي نشاط يخالف القوانين أو يتضمن تحريضاً على العنف أو الكراهية.'
                  : 'Enabling peaceful cross-border civic coordination under established statutory boundaries, upholding privacy rights, mutual dignity, and total rejection of discrimination or hate speech.'}
              </p>
            </div>

            {/* 6. التكنولوجيا واللغة والمستقبل */}
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
              <h4 className="text-lg font-bold text-[#111111] mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#087443]" />
                <span>{currentLang === 'ar' ? 'التكنولوجيا والاستدامة المستقبلية' : 'Technology & Future Outlook'}</span>
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'بناء بنية دولية آمنة وقابلة للتوسع وفق مبادئ الأمن منذ البداية (Security by Design)، وتطوير المحتوى بلغات متعددة دون الاكتفاء بالترجمة الحرفية، والتوسع التدريجي نحو إنشاء مراكز معرفة متخصصة، وتقارير دورية ترصد الحضور المجتمعي الدولي.'
                  : 'Architecting secure digital infrastructure (Security by Design), multilingual cultural adaptation, and gradual expansion toward specialized regional knowledge desks and verified periodic reporting.'}
              </p>
            </div>

          </div>
        </div>

        {/* Concluding Philosophy Callout (Verbatim User Text) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#0A0A0A] text-white border border-white/10 shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#34D399] block mb-3 font-['Cairo'] tracking-normal">
              {currentLang === 'ar' ? 'فلسفة المنصة' : 'Foundational Philosophy'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-snug">
              {currentLang === 'ar' ? 'من شعوب العالم إلى دولة فلسطين' : 'From the Peoples of the World to the State of Palestine'}
            </h3>
            <blockquote className="text-base sm:text-lg text-[#E5E7EB] font-light leading-relaxed mb-8">
              "{currentLang === 'ar'
                ? 'الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين هي، في جوهرها، محاولة لبناء مساحة دولية منظمة تجمع الإنسان بالمعلومة، والمجتمع بالمعرفة، والأفراد بالمؤسسات، والمبادرات بالتوثيق. إنها مساحة للتواصل بين الشعوب، وللوصول إلى المصادر، وللتعرف إلى التاريخ والقانون الدولي والوثائق والمؤسسات، ولتنظيم المشاركة المدنية ضمن إطار واضح ومسؤول.'
                : 'The General Secretariat is, at its core, an institutional endeavor to construct an organized global space connecting people with verified data, communities with knowledge, individuals with institutions, and civic initiatives with documentation. A space for dialogue across nations, access to authoritative sources, and lawful civic participation.'}"
            </blockquote>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate && onNavigate('membership')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#087443] hover:bg-[#065F36] text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                <span>{currentLang === 'ar' ? 'الانتساب إلى المنصة' : 'Join the Global Community'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onNavigate && onNavigate('legal_status')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
              >
                <Scale className="w-4 h-4 text-[#D1D5DB]" />
                <span>{currentLang === 'ar' ? 'الاطلاع على الوضع القانوني' : 'Review Legal Status'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
