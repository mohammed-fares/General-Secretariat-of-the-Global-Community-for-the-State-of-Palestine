import React, { useState } from 'react';
import { UserCheck, ArrowRight, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Language, MemberProfile, NavigationTab } from '../types';
import { translations } from '../data/translations';

interface MembershipFlowProps {
  currentLang: Language;
  onRegistered: (member: MemberProfile) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const MembershipFlow: React.FC<MembershipFlowProps> = ({
  currentLang,
  onRegistered,
  onNavigate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const isRtl = currentLang === 'ar';

  const t = translations[currentLang];

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(currentLang === 'ar' ? 'فلسطين' : 'Palestine');
  const [city, setCity] = useState('');
  const [prefLang, setPrefLang] = useState<Language>(currentLang);
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    t.membership.interestsList[0],
    t.membership.interestsList[2],
  ]);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([
    t.membership.prefsList[0],
    t.membership.prefsList[3],
  ]);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const togglePref = (pref: string) => {
    if (selectedPrefs.includes(pref)) {
      setSelectedPrefs(selectedPrefs.filter((p) => p !== pref));
    } else {
      setSelectedPrefs([...selectedPrefs, pref]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!name.trim() || !email.trim()) {
        setErrorMsg(currentLang === 'ar' ? 'يرجى إدخال الاسم والبريد الإلكتروني.' : 'Please enter your name and email.');
        return;
      }
    }
    setErrorMsg('');
    if (step < 3) {
      setStep((step + 1) as 2 | 3);
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (step > 1) {
      setStep((step - 1) as 1 | 2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg(currentLang === 'ar' ? 'يرجى إكمال البيانات المطلوبة.' : 'Please complete required fields.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const membershipId = `PS-GC-2026-${randomSuffix}`;

    const newMember: MemberProfile = {
      id: `usr-${Date.now()}`,
      membershipId,
      name: name.trim(),
      email: email.trim(),
      country: country.trim() || 'International',
      city: city.trim() || 'Global',
      language: prefLang,
      ageGroup,
      interests: selectedInterests,
      communicationPrefs: selectedPrefs,
      joinedDate: '24 سبتمبر 2026',
      isLoggedIn: true,
      bookmarkedDocIds: ['doc-icj-2024', 'doc-unga-19-67'],
      registeredEventIds: ['ev-01'],
    };

    localStorage.setItem('pal_gc_member', JSON.stringify(newMember));
    onRegistered(newMember);
  };

  // Quick Demo Login for testing
  const handleQuickDemoLogin = () => {
    const demoMember: MemberProfile = {
      id: 'usr-demo-8841',
      membershipId: 'PS-GC-2026-8841',
      name: currentLang === 'ar' ? 'د. يوسف النجار' : 'Dr. Yousef Al-Najjar',
      email: 'yousef.alnajjar@academic.org',
      country: currentLang === 'ar' ? 'فلسطين' : 'Palestine',
      city: currentLang === 'ar' ? 'القدس' : 'Jerusalem',
      language: currentLang,
      ageGroup: '35-44',
      interests: [t.membership.interestsList[0], t.membership.interestsList[1]],
      communicationPrefs: [t.membership.prefsList[0], t.membership.prefsList[2]],
      joinedDate: '24 سبتمبر 2026',
      isLoggedIn: true,
      bookmarkedDocIds: ['doc-icj-2024', 'doc-unga-19-67', 'doc-declaration-independence-1988'],
      registeredEventIds: ['ev-01'],
    };
    localStorage.setItem('pal_gc_member', JSON.stringify(demoMember));
    onRegistered(demoMember);
  };

  return (
    <section className="py-20 bg-[#F7F8F6] min-h-[80vh] flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6">
        
        {/* Card Container */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#087443] mb-2 block">
              {currentLang === 'ar' ? 'عضوية المجتمع العالمي' : 'Global Community Membership'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-3">
              {t.membership.title}
            </h2>
            <p className="text-sm text-[#4B5563] max-w-xl mx-auto leading-relaxed">
              {t.membership.desc}
            </p>

            {/* Non-Governmental Notice */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F3F4F6] text-xs text-[#6B7280]">
              <Shield className="w-3.5 h-3.5 text-[#087443]" />
              <span>{t.brand.digitalNotice}</span>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between mb-8 max-w-md mx-auto text-xs font-medium text-[#6B7280]">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#087443] font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 1 ? 'bg-[#087443] text-white' : 'bg-[#E5E7EB] text-[#4B5563]'
              }`}>1</span>
              <span className="hidden sm:inline">{currentLang === 'ar' ? 'المعلومات' : 'Info'}</span>
            </div>
            <div className="h-0.5 w-12 bg-[#E5E7EB]" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#087443] font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 2 ? 'bg-[#087443] text-white' : 'bg-[#E5E7EB] text-[#4B5563]'
              }`}>2</span>
              <span className="hidden sm:inline">{currentLang === 'ar' ? 'الاهتمامات' : 'Interests'}</span>
            </div>
            <div className="h-0.5 w-12 bg-[#E5E7EB]" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#087443] font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 3 ? 'bg-[#087443] text-white' : 'bg-[#E5E7EB] text-[#4B5563]'
              }`}>3</span>
              <span className="hidden sm:inline">{currentLang === 'ar' ? 'التواصل' : 'Preferences'}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* Stage 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#111111] pb-2 border-b border-[#E5E7EB]">
                {t.membership.step1Title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">
                    {t.membership.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Yousef Al-Najjar"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#087443] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">
                    {t.membership.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.org"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#087443] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">
                    {t.membership.country}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#087443] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">
                    {t.membership.city}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Jerusalem, Geneva, London..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#087443] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">
                    {t.membership.preferredLanguage}
                  </label>
                  <select
                    value={prefLang}
                    onChange={(e) => setPrefLang(e.target.value as Language)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#087443] focus:border-transparent bg-white"
                  >
                    <option value="ar">العربية (Arabic)</option>
                    <option value="en">English (English)</option>
                    <option value="fr">Français (French)</option>
                    <option value="es">Español (Spanish)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">
                    {t.membership.ageGroup}
                  </label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D1D5DB] text-sm focus:outline-none focus:ring-2 focus:ring-[#087443] focus:border-transparent bg-white"
                  >
                    <option value="18-24">18–24</option>
                    <option value="25-34">25–34</option>
                    <option value="35-49">35–49</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Stage 2: Areas of Interest */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#111111] pb-2 border-b border-[#E5E7EB]">
                {t.membership.step2Title}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {t.membership.interestsTitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {t.membership.interestsList.map((interest, idx) => {
                  const isChecked = selectedInterests.includes(interest);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`text-start px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors flex items-center justify-between ${
                        isChecked
                          ? 'border-[#087443] bg-[#F0FDF4] text-[#087443]'
                          : 'border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span>{interest}</span>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#087443] border-[#087443] text-white' : 'border-[#D1D5DB]'
                      }`}>
                        {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stage 3: Communication Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#111111] pb-2 border-b border-[#E5E7EB]">
                {t.membership.step3Title}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {t.membership.prefsTitle}
              </p>

              <div className="space-y-2.5 pt-2">
                {t.membership.prefsList.map((pref, idx) => {
                  const isChecked = selectedPrefs.includes(pref);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => togglePref(pref)}
                      className={`w-full text-start px-4 py-3 rounded-lg border text-xs font-medium transition-colors flex items-center justify-between ${
                        isChecked
                          ? 'border-[#087443] bg-[#F0FDF4] text-[#087443]'
                          : 'border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span>{pref}</span>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#087443] border-[#087443] text-white' : 'border-[#D1D5DB]'
                      }`}>
                        {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Privacy and Non-Governmental Agreement */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#4B5563]">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-[#087443] focus:ring-[#087443]"
                  />
                  <span>
                    {currentLang === 'ar'
                      ? 'أوافق على ميثاق الخصوصية وشروط الانتساب للأمانة العامة، وأقر بأن هذه العضوية رقمية غير حكومية وغير رسمية مخصصة للمعرفة والمشاركة المدنية.'
                      : 'I accept the Privacy Policy and membership terms, acknowledging this is a non-governmental digital membership for civic and knowledge engagement.'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-8 mt-6 border-t border-[#E5E7EB]">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#D1D5DB] text-xs font-semibold text-[#374151] hover:bg-[#F3F4F6] transition-colors"
              >
                {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                <span>{t.membership.prevBtn}</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold transition-colors"
              >
                <span>{t.membership.nextBtn}</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!termsAccepted}
                className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-white text-xs font-semibold shadow-sm transition-colors ${
                  termsAccepted
                    ? 'bg-[#087443] hover:bg-[#065F36]'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.membership.submitBtn}</span>
              </button>
            )}
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-4 border-t border-[#E5E7EB] text-center">
            <span className="text-xs text-[#6B7280]">
              {t.membership.alreadyMember}{' '}
            </span>
            <button
              onClick={handleQuickDemoLogin}
              className="text-xs font-semibold text-[#087443] hover:underline"
            >
              {t.membership.loginBtn}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
