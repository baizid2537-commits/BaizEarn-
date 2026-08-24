import React from 'react';
import { ShieldCheck, Sparkles, Smartphone, Monitor, UserCheck, LogIn, Bell, User as UserIcon, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BAIZEARN_LOGO } from '../../assets/logo';

export const MobileHeader: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    setAuthModalOpen,
    setAuthMode,
    viewMode,
    setViewMode,
    switchUserRole,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-[#071A35]/95 backdrop-blur-md border-b border-white/10 px-4 py-2.5 text-white">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-[#1769E0]/40 border border-[#FFC107]/40 group-hover:scale-105 transition-transform bg-[#071A35] flex items-center justify-center p-0.5">
              <img
                src={BAIZEARN_LOGO}
                alt="BaizEarn Logo"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-['Poppins',sans-serif] font-black text-lg tracking-tight leading-none text-white flex items-center gap-1.5">
                <span>Baiz<span className="text-[#00C853]">Earn</span></span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/30">
                  অফিসিয়াল
                </span>
              </div>
              <div className="text-[10px] text-[#94A3B8] font-normal leading-tight">
                রিয়েল আর্নিং প্ল্যাটফর্ম
              </div>
            </div>
          </button>
        </div>

        {/* Center/Right: Quick Balance or Auth */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              {/* Status Badge */}
              {currentUser.accountStatus === 'verified' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('verify')}
                  className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/40 text-[#FFC107] text-[11px] font-bold hover:bg-[#FFC107]/25 transition-all shadow-xs"
                >
                  <Sparkles className="w-3 h-3 text-[#FFC107]" />
                  <span>প্রো ভেরিফাইড</span>
                </button>
              ) : currentUser.accountStatus === 'pending_verification' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('verify')}
                  className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1769E0]/20 border border-[#1769E0]/40 text-[#60a5fa] text-[11px] font-bold hover:bg-[#1769E0]/30 transition-all animate-pulse"
                >
                  <span>যাচাইধীন ⏳</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('verify')}
                  className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00C853] hover:bg-[#00b048] text-white text-[11px] font-bold shadow-md shadow-[#00C853]/30 hover:scale-105 transition-all"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>ভেরিফাই করুন ৳৬০০</span>
                </button>
              )}

              {/* Wallet Quick Balance Button */}
              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold transition-colors"
                title="ওয়ালেট দেখুন"
              >
                <span className="text-[#00C853] text-sm">৳</span>
                <span className="font-['Poppins',sans-serif] text-sm text-[#FFC107]">
                  {currentUser.balance.toLocaleString('bn-BD')}
                </span>
              </button>

              {/* Profile Avatar / Trigger */}
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="w-8 h-8 rounded-full border border-white/20 overflow-hidden relative bg-white/10 flex items-center justify-center text-xs font-bold text-white hover:border-[#1769E0] transition-colors"
              >
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.firstName} className="w-full h-full object-cover" />
                ) : (
                  <span>{currentUser.firstName[0]}</span>
                )}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
              >
                লগইন
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#1769E0] hover:bg-[#1255b8] text-xs font-bold text-white shadow-md shadow-[#1769E0]/30 transition-colors"
              >
                রেজিস্টার
              </button>
            </div>
          )}

          {/* Quick Switch Admin/User Button */}
          <button
            type="button"
            onClick={switchUserRole}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
              currentUser?.role === 'admin'
                ? 'bg-[#FFC107]/20 border-[#FFC107]/40 text-[#FFC107] hover:bg-[#FFC107]/30'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="সুপার এডমিন ও সাধারণ ইউজার মোড পরিবর্তন"
          >
            {currentUser?.role === 'admin' ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">এডমিন মোড</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">ইউজার মোড</span>
              </>
            )}
          </button>

          {/* Desktop/Frame Toggle */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'mobile_frame' ? 'responsive' : 'mobile_frame')}
            className="hidden md:flex p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs transition-colors"
            title={viewMode === 'mobile_frame' ? 'ফুল স্ক্রিন ভিউ করুন' : 'মোবাইল ফ্রেম ভিউ করুন'}
          >
            {viewMode === 'mobile_frame' ? (
              <Monitor className="w-3.5 h-3.5" />
            ) : (
              <Smartphone className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
