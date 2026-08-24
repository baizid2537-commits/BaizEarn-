import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  Share2,
  Sparkles,
  Gift,
  Award,
  TrendingUp,
  DollarSign,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Layers,
  Crown,
  Zap,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  REFERRAL_LEVEL_COMMISSIONS,
  SALARY_TIERS,
  calculateEligibleSalary
} from '../../utils/rankAndReferral';

export const ReferralTab: React.FC = () => {
  const {
    currentUser,
    users,
    settings,
    claimMonthlySalary,
    showToast,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'levels' | 'salary' | 'team'>('levels');

  const refCode = currentUser?.referralCode || 'BAIZID2537';
  const refLink = `${window.location.origin}/?ref=${refCode}`;

  // Find direct referred users
  const referredUsers = users.filter(
    (u) =>
      u.referredBy === currentUser?.id ||
      u.referredBy === currentUser?.referralCode
  );

  const directVerifiedCount = currentUser?.referralCount || referredUsers.filter((u) => u.accountStatus === 'verified').length || 0;
  const salaryStatus = calculateEligibleSalary(directVerifiedCount);

  // 5-Level Referral Stats
  const levelStats = currentUser?.levelReferrals || {
    level1: directVerifiedCount,
    level2: Math.floor(directVerifiedCount * 1.8),
    level3: Math.floor(directVerifiedCount * 2.5),
    level4: Math.floor(directVerifiedCount * 3.2),
    level5: Math.floor(directVerifiedCount * 4.5),
  };

  const levelEarnings = currentUser?.levelEarnings || {
    level1: levelStats.level1 * 200,
    level2: levelStats.level2 * 50,
    level3: levelStats.level3 * 20,
    level4: levelStats.level4 * 10,
    level5: levelStats.level5 * 5,
  };

  const totalNetworkCount =
    levelStats.level1 +
    levelStats.level2 +
    levelStats.level3 +
    levelStats.level4 +
    levelStats.level5;

  const total5LevelEarnings =
    levelEarnings.level1 +
    levelEarnings.level2 +
    levelEarnings.level3 +
    levelEarnings.level4 +
    levelEarnings.level5;

  const copyCode = () => {
    navigator.clipboard.writeText(refCode);
    setCopiedCode(true);
    showToast(`রেফারেল কোড (${refCode}) কপি হয়েছে!`, 'success');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopiedLink(true);
    showToast('রেফারেল লিংক কপি হয়েছে! বন্ধুদের সাথে শেয়ার করুন।', 'success');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const shareWhatsApp = () => {
    const text = `🔥 BaizEarn থেকে সহজে টাস্ক পূরণ করে প্রতিদিন বিকাশ ও নগদে টাকা আয় করুন! ৫ লেভেল পর্যন্ত রেফারেল কমিশন (৳২০০+৳৫০+৳২০+৳১০+৳৫) এবং ১০০ রেফারে ফিক্সড মাসিক বেতন! আমার রেফারেল কোড: ${refCode} লিংক: ${refLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareTelegram = () => {
    const text = `🔥 BaizEarn - প্রতিদিন সহজ কাজ করে আয় ও ৫-লেভেল রেফারেল ইনকাম! কোড: ${refCode}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClaimSalary = () => {
    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    claimMonthlySalary();
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-5 shadow-xl text-white relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-36 h-36 bg-[#FFC107]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1769E0] to-purple-600 text-white flex items-center justify-center font-bold shadow-lg">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 bg-[#FFC107]/20 border border-[#FFC107]/40 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-[#FFC107] uppercase">
                <Crown className="w-3 h-3" /> ৫-লেভেল নেটওয়ার্ক ইনকাম
              </div>
              <h2 className="font-['Poppins',sans-serif] text-lg font-extrabold text-white">
                রেফার ও মাসিক বেতন প্রোগ্রাম
              </h2>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mt-2">
          ১ম লেভেলে <span className="text-[#00C853] font-bold">৳২০০</span>, ২য় লেভেলে <span className="text-[#00C853] font-bold">৳৫০</span>, ৩য় লেভেলে <span className="text-[#00C853] font-bold">৳২০</span>, ৪র্থ লেভেলে <span className="text-[#00C853] font-bold">৳১০</span> এবং ৫ম লেভেলে <span className="text-[#00C853] font-bold">৳৫</span> করে মোট <strong>৫ লেভেল পর্যন্ত আনলিমিটেড কমিশন</strong>! এছাড়াও ১০০টি রেফার পূর্ণ হলেই শুরু হবে <strong>মাসিক ফিক্সড বেতন</strong>।
        </p>

        {/* Global Network Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
          <div className="p-2 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 block">১ম লেভেল রেফার</span>
            <span className="font-['Poppins',sans-serif] text-base font-bold text-white">
              {directVerifiedCount} জন
            </span>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 block">মোট ৫-লেভেল টিম</span>
            <span className="font-['Poppins',sans-serif] text-base font-bold text-[#60a5fa]">
              {totalNetworkCount} জন
            </span>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 block">মোট রেফার আয়</span>
            <span className="font-['Poppins',sans-serif] text-base font-bold text-[#FFC107]">
              ৳{total5LevelEarnings}
            </span>
          </div>
        </div>
      </div>

      {/* Referral Code & Share Section */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-4 shadow-md">
        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-1">
            আপনার রেফারেল কোড
          </span>
          <div className="bg-[#071A35] border border-white/15 rounded-2xl p-3 flex items-center justify-between gap-2">
            <span className="font-['Poppins',sans-serif] font-black text-xl text-[#FFC107] tracking-widest font-mono">
              {refCode}
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="px-4 py-2 bg-[#1769E0] hover:bg-[#1255b8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'কপি হয়েছে' : 'কোড কপি'}</span>
            </button>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-1">
            ১-ক্লিক রেফারেল লিংক
          </span>
          <div className="bg-[#071A35] border border-white/15 rounded-2xl p-3 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-300 font-mono truncate max-w-[200px] sm:max-w-xs">
              {refLink}
            </span>
            <button
              type="button"
              onClick={copyLink}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'কপি হয়েছে' : 'লিংক কপি'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={shareWhatsApp}
            className="py-2.5 bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp এ শেয়ার</span>
          </button>
          <button
            type="button"
            onClick={shareTelegram}
            className="py-2.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Telegram এ শেয়ার</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab('levels')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'levels'
              ? 'bg-[#1769E0] text-white shadow-lg shadow-[#1769E0]/30'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>৫-লেভেল কমিশন</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('salary')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'salary'
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/30'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>মাসিক বেতন (১০০ রেফার)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('team')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'team'
              ? 'bg-[#00C853] text-white shadow-lg shadow-[#00C853]/30'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>টিম মেম্বারস</span>
        </button>
      </div>

      {/* TAB 1: 5-Level Commission Structure */}
      {activeSubTab === 'levels' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#FFC107]" />
                <span>৫-লেভেল রেফারেল আয়ের চার্ট</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                মোট ৫ লেভেলে ৳২৮৫/জন
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {REFERRAL_LEVEL_COMMISSIONS.map((item) => {
                const count = (levelStats as any)[`level${item.level}`] || 0;
                const earned = (levelEarnings as any)[`level${item.level}`] || 0;

                return (
                  <div
                    key={item.level}
                    className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base shadow-sm shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs flex items-center gap-1.5">
                          <span>{item.nameBn}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-mono">
                            {item.percentLabel}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          সদস্য সংখ্যা: <span className="text-white font-bold">{count} জন</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-['Poppins',sans-serif] text-sm font-extrabold text-[#00C853]">
                        +৳{item.amount} /জন
                      </div>
                      <div className="text-[10px] text-[#FFC107] font-bold">
                        মোট আয়: ৳{earned}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Monthly Fixed Salary Program (100 Referrals) */}
      {activeSubTab === 'salary' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {/* Main Salary Card */}
          <div className="bg-gradient-to-br from-amber-950/40 via-[#071A35] to-slate-900 border border-[#FFC107]/30 rounded-3xl p-5 shadow-xl text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Poppins',sans-serif] text-base font-extrabold text-white">
                    মাসিক ফিক্সড বেতন পলিসি
                  </h3>
                  <p className="text-[11px] text-slate-300">১০০টি ভেরিফাইড রেফারেই প্রতি মাসে নিশ্চিত বেতন</p>
                </div>
              </div>

              {salaryStatus.isEligible ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                  বেতনের যোগ্য 🌟
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-slate-700/60 border border-slate-600 text-slate-300 text-[10px] font-bold">
                  প্রক্রিয়াধীন
                </span>
              )}
            </div>

            {/* Progress to 100 Referrals */}
            <div className="bg-black/30 rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">আপনার বর্তমান ভেরিফাইড রেফারেল:</span>
                <span className="font-['Poppins',sans-serif] font-bold text-[#FFC107]">
                  {directVerifiedCount} / {salaryStatus.nextTier?.minReferrals || 100} জন
                </span>
              </div>

              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${salaryStatus.progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>
                  {salaryStatus.isEligible
                    ? `বর্তমান মাসিক বেতন: ৳${salaryStatus.monthlySalary}`
                    : `বেতন আনলক করতে আরও ${salaryStatus.referralsNeeded} জন রেফার প্রয়োজন`}
                </span>
                <span className="font-bold text-white font-mono">{salaryStatus.progressPercent}%</span>
              </div>
            </div>

            {/* Claim Monthly Salary Action */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleClaimSalary}
                disabled={!salaryStatus.isEligible}
                className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  salaryStatus.isEligible
                    ? 'bg-gradient-to-r from-[#00C853] to-emerald-600 hover:opacity-95 text-white shadow-emerald-500/25 active:scale-95'
                    : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>
                  {salaryStatus.isEligible
                    ? `চলতি মাসের বেতন গ্রহণ করুন (৳${salaryStatus.monthlySalary})`
                    : 'মাসিক বেতন ক্লেইম করুন (১০০ রেফার সম্পন্ন করুন)'}
                </span>
              </button>
            </div>
          </div>

          {/* Salary Tier List */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#00C853]" /> মাসিক বেতনের বিভিন্ন স্কেল (Salary Slabs)
            </h4>

            <div className="space-y-2">
              {SALARY_TIERS.map((slab, i) => {
                const isUnlocked = directVerifiedCount >= slab.minReferrals;
                return (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      isUnlocked
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-white'
                        : 'bg-white/5 border-white/5 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-2">
                        <span>{slab.minReferrals}টি ভেরিফাইড রেফারেল</span>
                        {isUnlocked && (
                          <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold">
                            অর্জিত ✓
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        প্রতি মাসের ১ থেকে ৫ তারিখের মধ্যে ওয়ালেটে জমা হবে
                      </div>
                    </div>

                    <div className="font-['Poppins',sans-serif] text-base font-black text-[#FFC107]">
                      ৳{slab.monthlySalaryBDT.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-slate-300">/মাস</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Team Members List */}
      {activeSubTab === 'team' && (
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#00C853]" /> আপনার ডাইরেক্ট টিম
            </span>
            <span className="text-[11px] text-slate-400">
              {referredUsers.length} জন সক্রিয়
            </span>
          </div>

          {referredUsers.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <div>এখনও কোনো রেফারেল মেম্বার যোগ হয়নি।</div>
              <div className="text-[11px] text-slate-400">
                আপনার রেফারেল কোড বন্ধুদের সাথে শেয়ার করে প্রথম ৳২০০ বোনাস জিতে নিন!
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {referredUsers.map((u) => (
                <div
                  key={u.id}
                  className="bg-white/5 rounded-2xl p-3 flex items-center justify-between text-xs hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#1769E0]/20 text-[#60a5fa] font-bold flex items-center justify-center text-xs">
                      {u.firstName[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white">{u.firstName} {u.lastName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">@{u.username}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                        u.accountStatus === 'verified'
                          ? 'bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/30'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}
                    >
                      {u.accountStatus === 'verified' ? 'ভেরিফাইড (৳২০০ অর্জিত)' : 'সাধারণ মেম্বার'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
