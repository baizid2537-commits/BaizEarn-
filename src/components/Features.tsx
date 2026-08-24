import React from 'react';
import { featuresData } from '../data/homeData';
import {
  ListChecks,
  Share2,
  Wallet,
  TrendingUp,
  Receipt,
  LifeBuoy,
  ArrowUpRight
} from 'lucide-react';

const featureIcons: Record<string, React.ReactNode> = {
  ListChecks: <ListChecks className="w-6 h-6 text-[#1769E0]" />,
  Share2: <Share2 className="w-6 h-6 text-[#00C853]" />,
  Wallet: <Wallet className="w-6 h-6 text-[#FFC107]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#00C853]" />,
  Receipt: <Receipt className="w-6 h-6 text-[#1769E0]" />,
  LifeBuoy: <LifeBuoy className="w-6 h-6 text-[#FFC107]" />,
};

const badgeStyles: Record<string, string> = {
  'Core Hub': 'bg-blue-50 text-blue-700 border-blue-200',
  'Network': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Fintech': 'bg-amber-50 text-amber-800 border-amber-200',
  'Analytics': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Transparency': 'bg-blue-50 text-blue-700 border-blue-200',
  'Assistance': 'bg-amber-50 text-amber-800 border-amber-200',
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-28 bg-[#071A35] border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#1769E0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#1769E0]/15 border border-[#1769E0]/30 text-[#60a5fa] text-xs font-bold uppercase tracking-wider mb-3">
            Platform Capabilities
          </span>
          <h2 className="font-['Poppins',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Manage your tasks, referrals, earnings and account activity from one simple experience.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              id={`feature-card-${feature.id}`}
              className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 shadow-lg shadow-black/20 hover:bg-white/[0.06] hover:border-[#1769E0]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {featureIcons[feature.iconName]}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="font-['Poppins',sans-serif] text-xl font-bold text-white mb-2.5 group-hover:text-[#FFC107] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#60a5fa] group-hover:text-[#FFC107] group-hover:translate-x-0.5 transition-all">
                <span>Explore Feature</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
