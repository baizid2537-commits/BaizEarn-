import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Tag, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BAIZEARN_LOGO } from '../../assets/logo';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login, register, socialLogin } = useApp();

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [registerError, setRegisterError] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginIdentifier || !loginPassword) {
      setLoginError('ইউজারনেম/ইমেইল এবং পাসওয়ার্ড উভয়ই প্রয়োজন!');
      return;
    }
    const res = login(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      setRegisterError('সবগুলো আবশ্যক ঘর পূরণ করুন!');
      return;
    }

    if (password.length < 3) {
      setRegisterError('পাসওয়ার্ড কমপক্ষে ৩ অক্ষরের হতে হবে!');
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError('পাসওয়ার্ড দুটি মিলছে না! পুনরায় চেক করুন।');
      return;
    }

    if (!agreeTerms) {
      setRegisterError('শর্তাবলী ও গোপনীয়তা নীতি মেনে টিক দিন!');
      return;
    }

    const res = register({
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      referralCode,
    });

    if (!res.success) {
      setRegisterError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#071A35] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8">
        {/* Close button */}
        <button
          type="button"
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl overflow-hidden mb-3 shadow-xl shadow-[#1769E0]/40 border-2 border-[#FFC107]/50 bg-[#071A35] p-0.5">
            <img
              src={BAIZEARN_LOGO}
              alt="BaizEarn"
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="font-['Poppins',sans-serif] text-2xl font-bold text-white tracking-tight">
            {authMode === 'login' ? 'BaizEarn একাউন্টে লগইন করুন' : 'নতুন একাউন্ট তৈরি করুন'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {authMode === 'login'
              ? 'দৈনিক টাস্ক এবং ইনকাম ম্যানেজ করতে প্রবেশ করুন'
              : 'রেজিস্ট্রেশন করলেই পাবেন ৳১৫ ফ্রি স্বাগতম বোনাস!'}
          </p>
        </div>

        {/* Social 1-Click Login Options */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => socialLogin('google')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-white transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
              />
            </svg>
            <span>Google 1-Click</span>
          </button>

          <button
            type="button"
            onClick={() => socialLogin('facebook')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/30 rounded-xl text-xs font-semibold text-[#60a5fa] transition-all"
          >
            <svg className="w-4 h-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook 1-Click</span>
          </button>
        </div>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">অথবা ফরম দিয়ে</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-white/5 p-1 mb-5 border border-white/10">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setLoginError('');
              setRegisterError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-[#1769E0] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            লগইন (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setLoginError('');
              setRegisterError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authMode === 'register'
                ? 'bg-[#1769E0] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            রেজিস্ট্রেশন (Register)
          </button>
        </div>

        {/* LOGIN FORM */}
        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                ইউজারনেম অথবা ইমেইল (Username / Email)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="যেমন: sabbir24 বা user@email.com"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] focus:ring-1 focus:ring-[#1769E0] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  পাসওয়ার্ড (Password)
                </label>
                <button
                  type="button"
                  onClick={() => alert('পাসওয়ার্ড রিসেট করতে হেল্পলাইনে মেসেজ দিন: 01965732537')}
                  className="text-[11px] text-[#60a5fa] hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] focus:ring-1 focus:ring-[#1769E0] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Demo Quick Fill for Testing */}
            <div className="p-3 bg-white/[0.03] rounded-xl border border-white/10 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300 flex items-center justify-between">
                <span>টেস্ট লগইন একাউন্ট:</span>
                <span className="text-[#00C853]">পাসওয়ার্ড: 123</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('sabbir24');
                    setLoginPassword('123');
                  }}
                  className="flex-1 py-1 px-2 rounded bg-white/10 hover:bg-white/15 text-slate-200 text-[10px] font-medium transition-colors"
                >
                  সাধারণ ইউজার (sabbir24)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('baizid2537');
                    setLoginPassword('123');
                  }}
                  className="flex-1 py-1 px-2 rounded bg-[#00C853]/20 hover:bg-[#00C853]/30 text-[#00C853] text-[10px] font-medium transition-colors border border-[#00C853]/30"
                >
                  ভেরিফাইড প্রো (baizid2537)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('admin');
                    setLoginPassword('admin');
                  }}
                  className="py-1 px-2 rounded bg-[#FFC107]/20 hover:bg-[#FFC107]/30 text-[#FFC107] text-[10px] font-medium transition-colors border border-[#FFC107]/30"
                >
                  এডমিন
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1769E0] hover:bg-[#1255b8] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#1769E0]/30 transition-all flex items-center justify-center gap-2"
            >
              <span>লগইন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {registerError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
                {registerError}
              </div>
            )}

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  নামের প্রথম অংশ *
                </label>
                <input
                  type="text"
                  placeholder="যেমন: বাইজিদ"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  শেষ অংশ *
                </label>
                <input
                  type="text"
                  placeholder="যেমন: হোসেন"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Username & Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ইউজারনেম (Username) *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="যেমন: baizid2537 (ছোট হাতের অক্ষর)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s+/g, '').toLowerCase())}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ইমেইল ঠিকানা (Email) *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="যেমন: baizid2537@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                মোবাইল নম্বর (Phone - ঐচ্ছিক)
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="যেমন: 01965732537"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  পাসওয়ার্ড *
                </label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  পাসওয়ার্ড নিশ্চিতকরণ *
                </label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="পুনরায় পাসওয়ার্ড"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>রেফারেল কোড (Referral Code - ঐচ্ছিক)</span>
                <span className="text-[10px] text-[#00C853] font-normal">বোনাস পাবেন</span>
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="যেমন: BAIZID2537"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none uppercase font-mono"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-[#1769E0] focus:ring-0 bg-white/5 border-white/20"
              />
              <span className="text-[11px] text-slate-400">
                আমি BaizEarn-এর সমস্ত নিয়মাবলী এবং শর্তাবলী মেনে নিচ্ছি।
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-[#00C853] hover:bg-[#00a846] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#00C853]/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
