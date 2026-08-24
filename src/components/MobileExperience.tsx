import React from 'react';
import { Smartphone, Zap, CheckCircle2, Shield, Bell, Sparkles } from 'lucide-react';

export const MobileExperience: React.FC = () => {
  return (
    <section id="mobile" className="py-20 sm:py-28 bg-[#071A35] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Realistic Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Glow Behind Phone */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#1769E0]/30 to-[#00C853]/30 rounded-[50px] blur-2xl opacity-40" />

              {/* Smartphone Frame */}
              <div className="relative w-[280px] sm:w-[300px] bg-[#040e1e] border-[10px] border-[#1e293b] rounded-[44px] shadow-[0_25px_50px_rgba(0,0,0,0.6)] p-4 text-white overflow-hidden">
                {/* Dynamic Island / Speaker Notch */}
                <div className="w-24 h-4 bg-[#1e293b] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#071426]" />
                </div>

                {/* Mobile App Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
                  <span className="font-bold text-white text-xs">BaizEarn Mobile</span>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
                    <span>5G Active</span>
                  </div>
                </div>

                {/* Mobile Wallet Card */}
                <div className="bg-gradient-to-br from-[#1769E0] to-[#0a3875] rounded-2xl p-4 mb-4 shadow-md">
                  <div className="flex justify-between text-[11px] text-blue-200 mb-1">
                    <span>Available Balance</span>
                    <span className="text-emerald-300 font-bold">● Live</span>
                  </div>
                  <div className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight mb-2 text-white">
                    $1,248.50
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="bg-white/15 px-2 py-0.5 rounded text-white">Eligible Rewards</span>
                    <span className="font-mono text-white/80">ID: #99214</span>
                  </div>
                </div>

                {/* Quick Task List Preview */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-semibold text-slate-300 px-1">
                    Available Tasks
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">App Feedback Review</div>
                      <div className="text-[10px] text-slate-400">Est. 3 mins • Verified</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 font-mono">+$5.00</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Tech Survey Poll</div>
                      <div className="text-[10px] text-slate-400">Est. 5 mins • Verified</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 font-mono">+$8.50</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Digital Research Task</div>
                      <div className="text-[10px] text-slate-400">Est. 2 mins • Active</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 font-mono">+$3.20</span>
                  </div>
                </div>

                {/* Home Indicator bar */}
                <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2" />
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Value Proposition */}
          <div className="lg:col-span-7">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#1769E0]/15 border border-[#1769E0]/30 text-[#60a5fa] text-xs font-bold uppercase tracking-wider mb-3">
              Responsive Freedom
            </span>

            <h2 className="font-['Poppins',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              BaizEarn, Wherever You Go
            </h2>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8">
              Access your account, tasks, activity and eligible rewards from a responsive mobile experience designed for any browser.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#60a5fa] flex items-center justify-center shrink-0 shadow-sm">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    No Downloads or App Store Delays
                  </h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Designed as a lightweight, lightning-fast progressive web interface. Open your mobile browser and access your dashboard instantly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#00C853] flex items-center justify-center shrink-0 shadow-sm">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Real-Time Task Notifications
                  </h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Receive instant alerts on your phone whenever new high-tier tasks, team referrals, or eligible rewards are unlocked.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#FFC107] flex items-center justify-center shrink-0 shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    Biometric & Touch-Protected Sessions
                  </h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Secure mobile sessions with seamless device verification so your wallet and records remain safe on public Wi-Fi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
