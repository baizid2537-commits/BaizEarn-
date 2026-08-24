import React, { useState } from 'react';
import {
  User as UserIcon,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  LogOut,
  HelpCircle,
  Send,
  Lock,
  ArrowRight,
  ShieldAlert,
  Copy,
  Check,
  Crown,
  Award,
  Zap,
  TrendingUp,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  getRankInfo,
  getNextRank,
  getPointsToNextRank,
  RANK_TIERS,
  calculateEligibleSalary
} from '../../utils/rankAndReferral';

export const ProfileTab: React.FC = () => {
  const {
    currentUser,
    logout,
    setActiveTab,
    settings,
    showToast,
    switchUserRole,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showRankModal, setShowRankModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-8 text-center text-white space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="font-['Poppins',sans-serif] text-lg font-bold">
          প্রোফাইল দেখতে প্রথমে লগইন করুন
        </h3>
        <button
          type="button"
          onClick={() => {
            setAuthMode('login');
            setAuthModalOpen(true);
          }}
          className="px-6 py-2.5 bg-[#1769E0] hover:bg-[#1255b8] text-white font-bold text-xs rounded-xl shadow-md"
        >
          লগইন করুন
        </button>
      </div>
    );
  }

  const isVerified = currentUser.accountStatus === 'verified';
  const isPending = currentUser.accountStatus === 'pending_verification';

  // Rank logic
  const currentPoints = currentUser.points || 0;
  const userRank = currentUser.rank || 'bronze';
  const rankInfo = getRankInfo(userRank);
  const nextRank = getNextRank(userRank);
  const pointsToNext = getPointsToNextRank(currentPoints);

  // Calculate progress percent to next rank
  let rankProgress = 100;
  if (nextRank) {
    const currentTierMin = rankInfo.minPoints;
    const nextTierMin = nextRank.minPoints;
    const progressWithinTier = currentPoints - currentTierMin;
    const tierRange = nextTierMin - currentTierMin;
    rankProgress = Math.max(0, Math.min(100, Math.round((progressWithinTier / tierRange) * 100)));
  }

  // Salary status
  const salaryStatus = calculateEligibleSalary(currentUser.referralCount || 0);

  const copyHelpline = () => {
    navigator.clipboard.writeText(settings.adminPhone);
    setCopiedPhone(true);
    showToast(`হেল্পলাইন নম্বর (${settings.adminPhone}) কপি হয়েছে!`, 'success');
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#1769E0] to-[#00C853] p-1 shadow-lg shrink-0 relative">
            <div className="w-full h-full rounded-[20px] bg-[#071A35] overflow-hidden flex items-center justify-center font-bold text-white text-2xl">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <span>{currentUser.firstName[0]}</span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 text-lg">
              {rankInfo.badge}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-['Poppins',sans-serif] text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <span>{currentUser.firstName} {currentUser.lastName}</span>
                  {isVerified && <Sparkles className="w-4 h-4 text-[#FFC107]" />}
                </h2>
                <div className="text-xs text-slate-400 font-mono">@{currentUser.username}</div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-center sm:justify-end gap-1.5 flex-wrap">
                {/* Rank Tag */}
                <button
                  type="button"
                  onClick={() => setShowRankModal(true)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                    userRank === 'diamond'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                      : userRank === 'platinum'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                      : userRank === 'gold'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : userRank === 'silver'
                      ? 'bg-slate-300/20 text-slate-200 border-slate-300/40'
                      : 'bg-amber-800/20 text-amber-400 border-amber-700/40'
                  }`}
                >
                  <span>{rankInfo.badge}</span>
                  <span>{rankInfo.nameBn}</span>
                </button>

                {isVerified ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00C853]/20 border border-[#00C853]/40 text-[#00C853] text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ভেরিফাইড প্রো</span>
                  </span>
                ) : isPending ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1769E0]/20 border border-[#1769E0]/40 text-[#60a5fa] text-xs font-bold animate-pulse">
                    <span>ভেরিফিকেশন অপেক্ষমান ⏳</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-500/20 border border-slate-400/30 text-slate-300 text-xs font-bold">
                    <span>সাধারণ অ্যাকাউন্ট</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Email & Phone */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300 mt-3 pt-3 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser.email}</span>
              </span>
              {currentUser.phone && (
                <span className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser.phone}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Verification CTA if Regular */}
        {!isVerified && (
          <div className="mt-4 p-3 rounded-2xl bg-[#00C853]/15 border border-[#00C853]/30 flex items-center justify-between gap-2 text-xs">
            <div className="text-[#00C853]">
              <span className="font-bold block">৳৬০০ দিয়ে একাউন্ট ভেরিফাই করুন</span>
              <span className="text-[11px] text-slate-300">
                আনলিমিটেড টাস্ক ও বিকাশ/নগদে উত্তোলন সুবিধা সক্রিয় করুন।
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('verify')}
              className="px-3.5 py-2 bg-[#00C853] hover:bg-[#00a846] text-white font-bold text-xs rounded-xl shrink-0 shadow-md"
            >
              ভেরিফাই করুন
            </button>
          </div>
        )}
      </div>

      {/* User Rank & Points Milestone Card */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-[#071A35] to-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <span>র্যাংক স্ট্যাটাস: {rankInfo.nameBn}</span>
                <span>{rankInfo.badge}</span>
              </h3>
              <span className="text-[11px] text-slate-300">টাস্ক পূরণ করলেই র্যাংক পয়েন্ট বৃদ্ধি পাবে</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowRankModal(true)}
            className="text-xs text-indigo-300 hover:text-white font-bold flex items-center gap-1 underline underline-offset-2"
          >
            <span>সকল র্যাংক দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-black/30 rounded-2xl p-3.5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">বর্তমান পয়েন্ট:</span>
            <span className="font-['Poppins',sans-serif] font-bold text-[#FFC107]">
              {currentPoints.toLocaleString()} পয়েন্ট
            </span>
          </div>

          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${rankProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>
              {nextRank
                ? `পরবর্তী র্যাংক (${nextRank.nameBn}) আনলক করতে আরও ${pointsToNext.toLocaleString()} পয়েন্ট লাগবে`
                : 'সর্বোচ্চ ডায়মন্ড র্যাংক অর্জিত 💎'}
            </span>
            <span className="font-mono text-white font-bold">{rankProgress}%</span>
          </div>
        </div>
      </div>

      {/* 5-Level Referral & Monthly Salary Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => setActiveTab('refer')}
          className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-3xl p-4 cursor-pointer transition-all space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#1769E0]" /> ৫-লেভেল রেফার
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="font-['Poppins',sans-serif] text-lg font-black text-white">
            {currentUser.referralCount || 0} <span className="text-xs font-normal text-slate-400">সদস্য</span>
          </div>
          <div className="text-[11px] text-[#00C853] font-bold">
            আয়: ৳{currentUser.referralEarnings || 0}
          </div>
        </div>

        <div
          onClick={() => setActiveTab('refer')}
          className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-3xl p-4 cursor-pointer transition-all space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#FFC107]" /> মাসিক বেতন
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="font-['Poppins',sans-serif] text-lg font-black text-[#FFC107]">
            {salaryStatus.isEligible ? `৳${salaryStatus.monthlySalary}` : 'প্রক্রিয়াধীন'}
          </div>
          <div className="text-[11px] text-slate-400 font-semibold">
            {salaryStatus.isEligible ? 'প্রতিমাসে নিশ্চিত' : `${currentUser.referralCount || 0}/100 রেফার`}
          </div>
        </div>
      </div>

      {/* Support & Helpline Card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-3">
        <span className="font-bold text-slate-300 uppercase tracking-wider block text-xs">
          সাহায্য ও সাপোর্ট সেন্টার
        </span>

        <div className="space-y-2">
          {/* Official Phone Number */}
          <div className="bg-[#071A35] border border-white/10 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00C853]/20 text-[#00C853] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">অফিসিয়াল হেল্পলাইন</span>
                <span className="font-['Poppins',sans-serif] font-bold text-white text-sm font-mono">
                  {settings.adminPhone}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={copyHelpline}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPhone ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>
          </div>

          {/* Telegram Support Link */}
          <button
            type="button"
            onClick={() => window.open(settings.telegramSupportLink, '_blank')}
            className="w-full bg-[#071A35] hover:bg-[#0c2445] border border-white/10 rounded-2xl p-3 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">টেলিগ্রাম সাপোর্ট গ্রুপ</span>
                <span className="font-semibold text-white text-xs">BaizEarn Official Telegram</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={switchUserRole}
          className="w-full py-3 bg-[#FFC107]/15 hover:bg-[#FFC107]/25 border border-[#FFC107]/30 text-[#FFC107] font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{currentUser.role === 'admin' ? 'ইউজার মোডে যান' : 'সুপার এডমিন প্যানেলে যান'}</span>
        </button>

        <button
          type="button"
          onClick={logout}
          className="w-full py-3 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>একাউন্ট থেকে লগআউট করুন</span>
        </button>
      </div>

      {/* Rank Ladder Modal */}
      {showRankModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#071A35] border border-white/20 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl text-white space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#FFC107]" />
                <h3 className="font-bold text-sm text-white">র্যাংক ও লেভেল পলিসি (Rank Ladder)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRankModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              মাইক্রো-টাস্ক সম্পন্ন করলেই প্রতি কাজের সাথে পয়েন্ট জমা হবে। নির্দিষ্ট পয়েন্ট অর্জনের সাথে সাথে আপনার র্যাংক স্বয়ংক্রিয়ভাবে আপগ্রেড হবে:
            </p>

            <div className="space-y-2.5">
              {RANK_TIERS.map((tier) => {
                const isCurrent = userRank === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-md'
                        : 'bg-white/5 border-white/5 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{tier.badge}</span>
                        <div>
                          <div className="font-bold text-xs flex items-center gap-1.5">
                            <span>{tier.nameBn} ({tier.name})</span>
                            {isCurrent && (
                              <span className="px-2 py-0.2 rounded-full bg-indigo-500 text-white text-[9px] font-black">
                                বর্তমান র্যাংক
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            প্রয়োজনীয় পয়েন্ট: <strong className="text-[#FFC107]">{tier.minPoints.toLocaleString()}</strong>+
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-slate-300">
                      সুবিধা: {tier.perks.join(' • ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
