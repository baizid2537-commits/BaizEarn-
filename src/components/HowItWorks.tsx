import React from 'react';
import { stepsData } from '../data/homeData';
import {
  UserPlus,
  ShieldCheck,
  Compass,
  Award,
  WalletCards,
  ArrowRight
} from 'lucide-react';

const stepIcons: Record<string, React.ReactNode> = {
  UserPlus: <UserPlus className="w-5 h-5 text-[#1769E0]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#00C853]" />,
  Compass: <Compass className="w-5 h-5 text-[#FFC107]" />,
  Award: <Award className="w-5 h-5 text-[#00C853]" />,
  WalletCards: <WalletCards className="w-5 h-5 text-[#1769E0]" />,
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#040E1E] border-y border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1769E0]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/30 text-[#00C853] text-xs font-bold uppercase tracking-wider mb-3">
            Simple 5-Step Process
          </span>
          <h2 className="font-['Poppins',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How BaizEarn Works
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Get started with a simple step-by-step experience.
          </p>
        </div>

        {/* 5 Steps Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stepsData.map((item, index) => (
            <div
              key={item.step}
              id={`how-it-works-step-${item.step}`}
              className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-[#1769E0]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-['Poppins',sans-serif] text-2xl font-extrabold text-[#FFC107]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {stepIcons[item.iconName]}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-white mb-2 group-hover:text-[#FFC107] transition-colors">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs font-semibold text-[#00C853] mb-2">
                  “{item.description}”
                </p>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {item.details}
                </p>
              </div>

              {/* Arrow Indicator for non-last items */}
              {index < stepsData.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                  <ArrowRight className="w-5 h-5 text-slate-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
