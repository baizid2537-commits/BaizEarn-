import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  CheckCircle2,
  Users,
  Disc,
  Send,
  Lock,
  ArrowRight,
  Award,
  Zap,
  HelpCircle,
  Copy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BAIZEARN_LOGO } from '../../assets/logo';

export const HomeTab: React.FC = () => {
  const {
    currentUser,
    setActiveTab,
    settings,
    tasks,
    showToast,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const isRegular = currentUser?.accountStatus === 'regular';
  const isPending = currentUser?.accountStatus === 'pending_verification';
  const isVerified = currentUser?.accountStatus === 'verified';

  // Live Simulated Transactions Ticker
  const recentActivities = [
    { name: 'বাইজিদ (019***537)', text: '৳৫০০ উত্তোলন সম্পন্ন (বিকাশ)', time: '২ মিনিট আগে', tag: 'Withdraw' },
    { name: 'তানভীর (017***991)', text: '৳৬০০ দিয়ে প্রো ভেরিফাই হয়েছেন', time: '৫ মিনিট আগে', tag: 'Verified' },
    { name: 'সাদিয়া (018***421)', text: '৳৫০ স্পেশাল অ্যাপ টাস্ক আয়', time: '৭ মিনিট আগে', tag: 'Task' },
    { name: 'রাকিব (016***802)', text: '৳১০০ রেফারেল বোনাস পেয়েছেন', time: '১২ মিনিট আগে', tag: 'Referral' },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* 1. Notice Marquee */}
      <div className="bg-gradient-to-r from-[#1769E0]/20 via-[#00C853]/20 to-[#FFC107]/20 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2 overflow-hidden shadow-sm">
        <span className="px-2 py-0.5 rounded bg-[#1769E0] text-[10px] font-bold text-white uppercase tracking-wider shrink-0">
          নোটিশ
        </span>
        <div className="text-xs text-slate-200 font-medium whitespace-nowrap overflow-hidden text-ellipsis flex-1">
          {settings.noticeMessage}
        </div>
      </div>

      {/* 2. User Profile Card & Verification Alert */}
      {currentUser ? (
        <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-5 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#1769E0]/15 rounded-full blur-2xl pointer-events-none" />

          {/* User Top Row */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1769E0] to-[#00C853] p-0.5 shadow-md">
                <div className="w-full h-full rounded-[14px] bg-[#071A35] overflow-hidden flex items-center justify-center font-bold text-white text-base">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{currentUser.firstName[0]}</span>
                  )}
                </div>
              </div>
              <div>
                <h2 className="font-['Poppins',sans-serif] text-base font-bold text-white flex items-center gap-1.5">
                  <span>{currentUser.firstName} {currentUser.lastName}</span>
                  {isVerified && <Sparkles className="w-4 h-4 text-[#FFC107]" />}
                </h2>
                <div className="text-xs text-slate-400 font-mono">
                  @{currentUser.username}
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div>
              {isVerified ? (
                <div className="px-3 py-1 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/40 text-[#FFC107] text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ভেরিফাইড প্রো ⭐</span>
                </div>
              ) : isPending ? (
                <div className="px-3 py-1 rounded-full bg-[#1769E0]/20 border border-[#1769E0]/40 text-[#60a5fa] text-xs font-bold flex items-center gap-1 animate-pulse">
                  <span>যাচাই অপেক্ষমান ⏳</span>
                </div>
              ) : (
                <div className="px-3 py-1 rounded-full bg-slate-500/20 border border-slate-400/30 text-slate-300 text-xs font-bold flex items-center gap-1">
                  <span>সাধারণ অ্যাকাউন্ট</span>
                </div>
              )}
            </div>
          </div>

          {/* Verification Callout if Regular User */}
          {isRegular && (
            <div className="bg-gradient-to-r from-[#FFC107]/15 to-[#00C853]/15 border border-[#FFC107]/30 rounded-2xl p-3.5 mb-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFC107] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> একাউন্ট ভেরিফিকেশন প্রয়োজন
                </span>
                <span className="font-mono font-bold text-white bg-[#FFC107]/30 px-2 py-0.5 rounded">
                  ফি: ৳৬০০
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                আপনার অ্যাকাউন্টটি বর্তমানে সাধারণ। সম্পূর্ণ টাস্কের আনলিমিটেড টাকা আয় ও বিকাশ/নগদে উত্তোলন করতে মাত্র ৬০০ টাকা দিয়ে একাউন্ট ভেরিফাই করুন।
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('verify')}
                className="w-full py-2 bg-gradient-to-r from-[#00C853] to-[#00a846] hover:from-[#00b54b] hover:to-[#00963e] text-white font-bold text-xs rounded-xl shadow-md shadow-[#00C853]/30 flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02]"
              >
                <span>বিকাশ/নগদ/রকেটে ৳৬০০ পাঠান ও ভেরিফাই করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Wallet Balance Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-white/10">
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">মূল ব্যালেন্স</span>
              <div className="font-['Poppins',sans-serif] text-xl font-extrabold text-[#FFC107] mt-0.5">
                ৳ {currentUser.balance.toLocaleString('bn-BD')}
              </div>
            </div>
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">আজকের আয়</span>
              <div className="font-['Poppins',sans-serif] text-xl font-extrabold text-[#00C853] mt-0.5">
                ৳ {currentUser.todayEarnings.toLocaleString('bn-BD')}
              </div>
            </div>
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">মোট আয়</span>
              <div className="font-['Poppins',sans-serif] text-xl font-extrabold text-white mt-0.5">
                ৳ {currentUser.totalEarned.toLocaleString('bn-BD')}
              </div>
            </div>
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">মোট উত্তোলন</span>
              <div className="font-['Poppins',sans-serif] text-xl font-extrabold text-slate-300 mt-0.5">
                ৳ {currentUser.totalWithdrawn.toLocaleString('bn-BD')}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              onClick={() => setActiveTab('wallet')}
              className="py-2.5 px-4 bg-[#1769E0] hover:bg-[#1255b8] text-white font-bold text-xs rounded-xl shadow-md shadow-[#1769E0]/30 flex items-center justify-center gap-1.5 transition-all"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>টাকা উত্তোলন (Withdraw)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tasks')}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>টাস্ক পূরণ করুন</span>
            </button>
          </div>
        </div>
      ) : (
        /* Guest Welcome Banner */
        <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-6 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl overflow-hidden mx-auto shadow-xl shadow-[#1769E0]/40 border-2 border-[#FFC107]/50 bg-[#071A35] p-0.5">
            <img
              src={BAIZEARN_LOGO}
              alt="BaizEarn"
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="font-['Poppins',sans-serif] text-xl font-extrabold text-white">
              স্বাগতম Baiz<span className="text-[#00C853]">Earn</span> এ!
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
              টাস্ক পূরণ, রেফারেল ও প্রতিদিন রিয়েল বিকাশ ও নগদ পেমেন্ট পাওয়ার বিশ্বস্ত প্ল্যাটফর্ম।
            </p>
          </div>
          <div className="flex gap-2 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
              className="flex-1 py-2.5 bg-[#00C853] hover:bg-[#00a846] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#00C853]/30"
            >
              একাউন্ট খুলুন (ফ্রি ৳১৫)
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20"
            >
              লগইন
            </button>
          </div>
        </div>
      )}

      {/* 3. Quick Action Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            কুইক সার্ভিস মেনু
          </span>
          <span className="text-[11px] text-[#60a5fa] font-medium">সব অপশন</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#1769E0]/40 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1769E0]/15 text-[#60a5fa] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white">টাস্ক সেন্টার</span>
            <span className="text-[9px] text-[#00C853] font-medium">৭টি একটিভ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('verify')}
            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#00C853]/40 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00C853]/15 text-[#00C853] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white">ভেরিফাই একাউন্ট</span>
            <span className="text-[9px] text-[#FFC107] font-medium">৳৬০০ বিকাশ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wallet')}
            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#FFC107]/40 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFC107]/15 text-[#FFC107] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white">টাকা উত্তোলন</span>
            <span className="text-[9px] text-slate-400 font-medium">বিকাশ/নগদ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('refer')}
            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#1769E0]/40 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white">রেফার টিম</span>
            <span className="text-[9px] text-[#00C853] font-medium">বোনাস ৳১০০</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('spin')}
            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Disc className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white">লাকি স্পিন</span>
            <span className="text-[9px] text-[#FFC107] font-medium">সর্বোচ্চ ৳৫০</span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.open(settings.telegramSupportLink, '_blank');
              showToast('টেলিগ্রাম হেল্পলাইন ওপেন করা হচ্ছে...', 'info');
            }}
            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white">টেলিগ্রাম গ্রুপ</span>
            <span className="text-[9px] text-slate-400 font-medium">সাপোর্ট</span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(settings.adminPhone);
              showToast(`অফিসিয়াল হেল্পলাইন নম্বর (${settings.adminPhone}) কপি হয়েছে!`, 'success');
            }}
            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-[#00C853] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white">হেল্পলাইন</span>
            <span className="text-[9px] text-slate-400 font-mono">01965732537</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className="flex flex-col items-center p-3 rounded-2xl bg-[#FFC107]/10 border border-[#FFC107]/30 hover:bg-[#FFC107]/20 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFC107]/20 text-[#FFC107] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-[#FFC107]">এডমিন প্যানেল</span>
            <span className="text-[9px] text-slate-400 font-medium">কন্ট্রোল</span>
          </button>
        </div>
      </div>

      {/* 4. Featured Tasks Preview */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            হট আর্নিং টাস্কসমূহ
          </span>
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className="text-[11px] text-[#60a5fa] font-medium hover:underline flex items-center gap-0.5"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {tasks.slice(0, 3).map((t) => (
            <div
              key={t.id}
              onClick={() => setActiveTab('tasks')}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-white/[0.06] hover:border-[#1769E0]/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1769E0]/15 text-[#60a5fa] flex items-center justify-center font-bold text-xs shrink-0">
                  ৳{t.reward}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{t.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span>⏱️ {t.durationSeconds} সেকেন্ড</span>
                    <span>•</span>
                    <span className="text-[#00C853] font-semibold">{t.completedCount} জন করেছেন</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#1769E0] hover:bg-[#1255b8] text-white text-[11px] font-bold shrink-0 transition-colors shadow-xs"
              >
                শুরু করুন
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Live Activity Feed */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00C853] animate-ping" />
            লাইভ পেমেন্ট ও ভেরিফিকেশন ফিড
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">100% রিয়েল</span>
        </div>

        <div className="space-y-2">
          {recentActivities.map((act, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-semibold text-slate-200">{act.name}</span>
                <span className="text-slate-400 truncate">{act.text}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono shrink-0">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
