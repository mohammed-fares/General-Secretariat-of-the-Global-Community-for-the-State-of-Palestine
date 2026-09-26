import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound,
  Info
} from 'lucide-react';
import { Language, NavigationTab } from '../types';
import { OfficialLogo } from './OfficialLogo';
import { verifyAdminPassword, setAdminAuthenticated } from '../data/contentStore';

interface AdminLoginModalProps {
  currentLang: Language;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  currentLang,
  onSuccess,
  onCancel,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isRtl = currentLang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password.trim()) {
      setErrorMsg(
        currentLang === 'ar' 
          ? 'يرجى إدخال كلمة مرور الإدارة للمتابعة' 
          : 'Please enter the admin password to continue'
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const isValid = verifyAdminPassword(password);
      if (isValid) {
        setAdminAuthenticated(true);
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg(
          currentLang === 'ar'
            ? 'كلمة المرور غير صحيحة. يرجى التأكد من الرمز المعتمد والمحاولة مجدداً.'
            : 'Invalid password. Please verify the official credentials and try again.'
        );
      }
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B1528] via-[#111C33] to-[#0A1120] relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#087443_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="relative w-full max-w-md bg-[#13203A] border border-[#273B60] rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
        
        {/* Emblem & Security Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-2.5 rounded-2xl bg-[#1C2C4E] border border-[#3A507C] shadow-inner">
              <OfficialLogo size="xl" withRing={true} />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087443]/20 border border-[#087443]/40 text-[#4ADE80] text-xs font-semibold font-['Cairo'] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
            {currentLang === 'ar' ? 'منطقة محمية ومقيدة' : 'Restricted Security Zone'}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] tracking-tight">
            {currentLang === 'ar' ? 'بوابة الإدارة المركزية والتحكم' : 'Central Secretariat Admin Portal'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] font-['Cairo']">
            {currentLang === 'ar' 
              ? 'لا يمكن الدخول إلى لوحة التحكم إلا بعد إدخال كلمة المرور المعتمدة'
              : 'Authorized personnel only. Password verification required.'}
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-3 animate-shake font-['Cairo']">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#CBD5E1] mb-2 font-['Cairo']">
              {currentLang === 'ar' ? 'كلمة مرور لوحة التحكم (Admin Password)' : 'Admin Password'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder={currentLang === 'ar' ? 'أدخل كلمة المرور الرسمية...' : 'Enter admin password...'}
                className="w-full ps-10 pe-11 py-3 bg-[#0B1528] border border-[#2B3E63] rounded-xl text-white text-sm placeholder-[#64748B] focus:outline-hidden focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-[#94A3B8] hover:text-white transition-colors"
                title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Credential Hint for authorized administrator */}
          <div className="bg-[#0B1528]/80 border border-[#233554] rounded-xl p-3 text-xs text-[#94A3B8] font-['Cairo']">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#E2E8F0] font-medium">
                <KeyRound className="w-3.5 h-3.5 text-[#38BDF8]" />
                {currentLang === 'ar' ? 'كلمة المرور الافتراضية:' : 'Default Password:'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setPassword('Secretariat@2026');
                  setShowHint(true);
                }}
                className="text-[#38BDF8] hover:underline text-[11px] font-mono font-bold"
              >
                {currentLang === 'ar' ? 'تعبئة تلقائية (Secretariat@2026)' : 'Autofill (Secretariat@2026)'}
              </button>
            </div>
            {showHint && (
              <p className="mt-2 text-[11px] text-[#4ADE80] border-t border-[#1E2E4B] pt-2">
                ✓ تم إدراج الرمز المعتمد. يمكنك تغييره لاحقاً من تبويب الأمان داخل لوحة التحكم.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#087443] hover:bg-[#0A8850] text-white text-sm font-bold shadow-lg shadow-[#087443]/30 hover:shadow-[#087443]/50 transition-all flex items-center justify-center gap-2 font-['Cairo'] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{currentLang === 'ar' ? 'التحقق والدخول إلى لوحة التحكم' : 'Authenticate & Enter Dashboard'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-white/5 text-[#94A3B8] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 font-['Cairo'] cursor-pointer"
            >
              {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{currentLang === 'ar' ? 'إلغاء والعودة إلى الواجهة الرئيسية' : 'Cancel & Return to Homepage'}</span>
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-[#1F2F4E] text-center text-[11px] text-[#64748B] font-['Cairo']">
          {currentLang === 'ar' 
            ? 'جلسة إدارة مشفرة ومؤمنة — الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين'
            : 'Encrypted & secure admin session — General Secretariat'}
        </div>
      </div>
    </div>
  );
};
