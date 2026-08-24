import React from 'react';
import { statisticsData } from '../data/homeData';
import { Users, CheckCircle2, Activity, Headphones, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-6 h-6 text-[#1769E0]" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-[#00C853]" />,
  Activity: <Activity className="w-6 h-6 text-[#FFC107]" />,
  Headphones: <Headphones className="w-6 h-6 text-[#1769E0]" />,
};

export const Statistics: React.FC = () => {
  return (
    <section id="about" className="relative -mt-10 sm:-mt-14 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 4 Professional Sophisticated Dark Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statisticsData.map((stat, index) => (
          <div
            key={stat.id}
            id={`stat-card-${stat.id}`}
            className="group relative bg-[#071A35]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:border-[#1769E0]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-[#1769E0]/15 to-[#00C853]/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {iconMap[stat.iconName]}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC107] bg-[#FFC107]/10 px-2 py-0.5 rounded border border-[#FFC107]/20">
                Verified
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-['Poppins',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#FFC107] tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider text-[13px]">
                {stat.label}
              </div>
              <div className="text-xs text-[#94A3B8] font-normal">
                {stat.subtext}
              </div>
            </div>

            {/* Micro Growth Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
              <div
                className="h-full bg-[#00C853] rounded-full"
                style={{ width: index === 0 ? '85%' : index === 1 ? '95%' : index === 2 ? '75%' : '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
