import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  Wallet,
  ArrowUpRight,
  Sparkles,
  Search,
  Activity,
  Layers
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [activeChartTimeframe, setActiveChartTimeframe] = useState<'week' | 'month'>('week');

  return (
    <section id="home" className="relative bg-[#071A35] text-white pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Background Tech Glow & Grids */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#1769E0]/20 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-20" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#00C853]/15 rounded-full blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1769E0]/20 border border-[#1769E0]/40 text-[#93c5fd] text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
              <span>Next-Generation Digital Rewards Hub</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Poppins',sans-serif] text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-6 bg-gradient-to-br from-white via-slate-100 to-[#B0C4DE] bg-clip-text text-transparent">
              Earn Smarter.<br />
              <span className="text-white">Grow Faster with BaizEarn.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#94A3B8] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Complete eligible tasks, build your network and manage your rewards through one simple and modern platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <a
                href="#register"
                id="hero-cta-create-account"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1769E0] hover:bg-[#1255b8] text-white font-semibold text-base rounded-xl shadow-[0_4px_15px_rgba(23,105,224,0.3)] hover:shadow-[0_6px_20px_rgba(23,105,224,0.45)] transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#features"
                id="hero-cta-explore"
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold text-base rounded-xl border border-white/20 hover:border-white/35 backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Explore BaizEarn</span>
              </a>
            </div>

            {/* Trust / Feature Line */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-[#94A3B8]">
              <span className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853]" /> Simple
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853]" /> Modern
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1769E0]" /> Secure
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Zap className="w-3.5 h-3.5 text-[#FFC107]" /> Mobile Friendly
              </span>
            </div>
          </div>

          {/* Right Column: Fintech Dashboard Mockup Illustration */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1769E0] to-[#00C853] rounded-2xl blur-lg opacity-30" />

              {/* Main Dashboard Frame */}
              <div className="relative bg-[#0b1b36] border border-white/15 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Mockup Window Header */}
                <div className="px-4 py-3 bg-[#071426] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 font-mono">
                    <Search className="w-3 h-3" />
                    <span>baizearn.com/app/overview</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00C853]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC107] bg-[#FFC107]/10 px-2 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Dashboard Inner Body */}
                <div className="p-5 sm:p-6 space-y-5">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Wallet Balance Card */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 sm:p-4 hover:border-[#1769E0]/50 transition-colors">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Wallet className="w-3.5 h-3.5 text-[#60a5fa]" />
                          Wallet Balance
                        </span>
                        <span className="text-emerald-400 font-semibold flex items-center text-[11px]">
                          <ArrowUpRight className="w-3 h-3" /> +18.4%
                        </span>
                      </div>
                      <div className="font-['Poppins',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-tight">
                        $1,248.50
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                        <span>Eligible balance</span>
                        <span className="text-slate-300 font-mono">USD</span>
                      </div>
                    </div>

                    {/* Task Statistics Card */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 sm:p-4 hover:border-[#00C853]/50 transition-colors">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853]" />
                          Task Completed
                        </span>
                        <span className="text-sky-400 font-medium text-[11px] bg-sky-500/10 px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      </div>
                      <div className="font-['Poppins',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-tight">
                        142 Tasks
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                        <span>Success rate</span>
                        <span className="text-emerald-400 font-semibold">98.6%</span>
                      </div>
                    </div>
                  </div>

                  {/* Earnings Growth Chart Card */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#00C853]" />
                          Earnings & Activity Growth
                        </div>
                        <div className="text-[11px] text-slate-400">Weekly platform reward performance</div>
                      </div>
                      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs">
                        <button
                          type="button"
                          onClick={() => setActiveChartTimeframe('week')}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                            activeChartTimeframe === 'week'
                              ? 'bg-[#1769E0] text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          7D
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveChartTimeframe('month')}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                            activeChartTimeframe === 'month'
                              ? 'bg-[#1769E0] text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          30D
                        </button>
                      </div>
                    </div>

                    {/* Chart Visualization */}
                    <div className="pt-2">
                      <div className="flex items-end justify-between gap-2 h-24 sm:h-28 px-1">
                        {[
                          { day: 'Mon', height: '42%', val: '$35' },
                          { day: 'Tue', height: '65%', val: '$58' },
                          { day: 'Wed', height: '52%', val: '$46' },
                          { day: 'Thu', height: '88%', val: '$92' },
                          { day: 'Fri', height: '70%', val: '$74' },
                          { day: 'Sat', height: '96%', val: '$110' },
                          { day: 'Sun', height: '80%', val: '$85' },
                        ].map((bar, i) => (
                          <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 group">
                            <div className="text-[10px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold">
                              {bar.val}
                            </div>
                            <div className="w-full max-w-[28px] h-20 sm:h-24 bg-white/5 rounded-t-md flex items-end overflow-hidden p-0.5">
                              <div
                                className={`w-full rounded-t transition-all duration-500 ${
                                  i === 5
                                    ? 'bg-gradient-to-t from-[#1769E0] to-[#00C853] shadow-md shadow-[#00C853]/40'
                                    : 'bg-gradient-to-t from-[#1769E0]/60 to-[#60a5fa]'
                                }`}
                                style={{ height: bar.height }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                              {bar.day}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Referral Stats & Recent Activity Stream */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FFC107]/15 flex items-center justify-center text-[#FFC107]">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Referral Team</div>
                          <div className="text-sm font-bold text-white">28 Active Members</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">+$120.00</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#00C853]/15 flex items-center justify-center text-[#00C853]">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Account Safety</div>
                          <div className="text-sm font-bold text-white">2FA Protected</div>
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                        Secured
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
