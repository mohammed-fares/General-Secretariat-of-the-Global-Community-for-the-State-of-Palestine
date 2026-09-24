import React from 'react';
import { Scale, ShieldCheck, AlertCircle, FileCheck, CheckCircle2, Lock, Building } from 'lucide-react';
import { Language } from '../types';

interface LegalStatusProps {
  currentLang: Language;
}

export const LegalStatus: React.FC<LegalStatusProps> = ({ currentLang }) => {
  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#087443] mb-3 font-['Cairo'] tracking-normal">
            <Scale className="w-4 h-4" />
            <span className="font-['Cairo']">{currentLang === 'ar' ? 'الوثيقة القانونية المعتمدة' : 'Official Legal Status'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
            {currentLang === 'ar' ? 'الوضع القانوني للأمانة العامة' : 'Legal Status & Juridical Framework'}
          </h1>
          <p className="text-base text-[#4B5563] leading-relaxed">
            {currentLang === 'ar' 
              ? 'تحدد هذه الوثيقة الإطار القانوني والمؤسسي والتشريعي لعمل الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين.'
              : 'This document defines the juridical, institutional, and compliance framework governing the General Secretariat.'}
          </p>
        </div>

        {/* Core Legal Statement Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F8F6] border border-[#E5E7EB] mb-12 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#087443] shrink-0 shadow-xs">
              <Building className="w-6 h-6" />
            </div>
            <div className="space-y-3 text-[#1F2937] leading-relaxed text-sm sm:text-base">
              <h3 className="text-lg font-bold text-[#111111]">
                {currentLang === 'ar' ? 'كيان مدني مستقل وفق الأطر القانونية' : 'Independent Civil Entity under Statutory Law'}
              </h3>
              <p>
                {currentLang === 'ar' ? (
                  <>
                    الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين هي <strong>كيان مدني مستقل</strong> يُنشأ ويعمل وفق الإطار القانوني المعتمد في الدولة التي يتم فيها تسجيله وتأسيسه رسمياً، وبما يتوافق مع القوانين واللوائح المنظمة لعمل المؤسسات والكيانات المدنية والدولية.
                  </>
                ) : (
                  <>
                    The General Secretariat of the Global Community for the State of Palestine is an <strong>independent civil entity</strong> established and operating under the statutory framework of the jurisdiction where it is officially registered, in full adherence to domestic and international nonprofit laws.
                  </>
                )}
              </p>
              <p>
                {currentLang === 'ar' ? (
                  <>
                    وتحدد الشخصية القانونية للأمانة العامة، وحقوقها والتزاماتها، وصلاحيات أجهزتها، وطبيعة عضويتها، ومصادر تمويلها، وعلاقاتها بالشركاء والمؤسسات، وفق وثائق التأسيس والنظام الأساسي والتسجيل القانوني واللوائح الداخلية المعتمدة.
                  </>
                ) : (
                  <>
                    Its legal personality, operational mandates, governance competencies, membership classifications, funding rules, and institutional alliances are governed exclusively by its foundational bylaws and statutory charter.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Crucial Legal Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Box 1: Non-Representation of Governments */}
          <div className="p-6 rounded-xl bg-white border-2 border-[#E5E7EB] hover:border-[#087443]/40 transition-colors">
            <div className="flex items-center gap-3 mb-3 text-[#CE1126]">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-base text-[#111111]">
                {currentLang === 'ar' ? 'عدم التمثيل الحكومي أو الدبلوماسي' : 'Non-Governmental Non-Official Mandate'}
              </h4>
            </div>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {currentLang === 'ar'
                ? 'لا تمثل الأمانة العامة، بمجرد إنشائها أو تسجيلها، حكومة دولة فلسطين أو أي حكومة أخرى، كما لا تدعي تمثيل الأمم المتحدة أو أي منظمة أو مؤسسة دولية ما لم يكن هناك تفويض أو اعتراف رسمي وموثق بذلك.'
                : 'The Secretariat does not represent the Government of the State of Palestine or any other government, nor does it claim representation of the United Nations or multilateral bodies absent an express legal accreditation.'}
            </p>
          </div>

          {/* Box 2: Nature of Digital Membership */}
          <div className="p-6 rounded-xl bg-white border-2 border-[#E5E7EB] hover:border-[#087443]/40 transition-colors">
            <div className="flex items-center gap-3 mb-3 text-[#087443]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-base text-[#111111]">
                {currentLang === 'ar' ? 'طبيعة العضوية والانتساب' : 'Civil Character of Membership'}
              </h4>
            </div>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {currentLang === 'ar'
                ? 'تؤكد الأمانة العامة أن العضوية فيها لا تمنح صاحبها أي صفة دبلوماسية أو حكومية أو تمثيلية دولية، ولا تخول العضو التحدث باسم دولة فلسطين أو أي حكومة أو منظمة دولية، ما لم يكن لديه تفويض مستقل ومعلن من الجهة المختصة.'
                : 'Membership carries strictly digital and academic standing; it confers no diplomatic immunity, consular status, or proxy authority to speak on behalf of the State of Palestine or any sovereign administration.'}
            </p>
          </div>

          {/* Box 3: Regulatory Compliance and Anti-Money Laundering */}
          <div className="p-6 rounded-xl bg-white border-2 border-[#E5E7EB] hover:border-[#087443]/40 transition-colors">
            <div className="flex items-center gap-3 mb-3 text-[#087443]">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-base text-[#111111]">
                {currentLang === 'ar' ? 'الالتزام التشريعي والامتثال المالي' : 'Statutory Compliance & AML Standards'}
              </h4>
            </div>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {currentLang === 'ar'
                ? 'تلتزم الأمانة العامة بالشفافية في الإعلان عن طبيعتها القانونية والجهة المختصة بتسجيلها، وتلتزم بالقوانين المتعلقة بالعمل المدني، وحماية البيانات، ومكافحة غسل الأموال وتمويل الإرهاب، والضرائب المنطبقة بحسب دولة التسجيل.'
                : 'Full compliance with national statutes on civil associations, GDPR privacy regulations, tax transparent filing, and international Anti-Money Laundering (AML) and Counter-Terrorism Financing standards.'}
            </p>
          </div>

          {/* Box 4: Distinction between Content and State Acts */}
          <div className="p-6 rounded-xl bg-white border-2 border-[#E5E7EB] hover:border-[#087443]/40 transition-colors">
            <div className="flex items-center gap-3 mb-3 text-[#087443]">
              <FileCheck className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-base text-[#111111]">
                {currentLang === 'ar' ? 'التمييز بين النشر والوثائق الرسمية' : 'Demarcation of Content & State Acts'}
              </h4>
            </div>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {currentLang === 'ar'
                ? 'تميز الأمانة العامة بوضوح بين صفتها القانونية ككيان مدني وبين رؤيتها وأهدافها، بحيث لا يُفهم أي محتوى منشور على المنصة باعتباره وثيقة حكومية أو قراراً دولياً أو تمثيلاً رسمياً لدولة فلسطين إلا إذا كان صادراً بالفعل عن الجهة الرسمية المختصة.'
                : 'No published material shall be construed as an act of state, governmental treaty, or official diplomatic pronouncement unless originating directly from recognized sovereign authorities.'}
            </p>
          </div>

        </div>

        {/* Concluding Binding Note */}
        <div className="p-6 rounded-xl bg-[#111111] text-white text-xs sm:text-sm leading-relaxed text-center sm:text-start flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[#34D399] font-mono uppercase text-xs block mb-1">
              {currentLang === 'ar' ? 'السياسة الحوكمية النافذة' : 'Governing Institutional Rule'}
            </span>
            <p className="text-[#E5E7EB]">
              {currentLang === 'ar'
                ? 'تخضع جميع أنشطة الأمانة العامة لنظامها الأساسي وسياساتها الداخلية والقرارات الصادرة عن هيئاتها المختصة، مع الالتزام بالقوانين النافذة في الدول التي تمارس فيها أنشطتها أو تقدم خدماتها الرقمية.'
                : 'All activities remain strictly governed by the foundational bylaws and statutory laws of the jurisdictions in which digital services or educational events are convened.'}
            </p>
          </div>
          <span className="shrink-0 px-3 py-1.5 rounded-lg bg-white/10 text-white font-mono text-xs border border-white/20">
            ARTICLE 14-LGL
          </span>
        </div>

      </div>
    </section>
  );
};
