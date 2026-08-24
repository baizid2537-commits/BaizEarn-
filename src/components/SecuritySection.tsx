import React from 'react';
import { securityPoints } from '../data/homeData';
import { Lock, Shield, FileText, Headphones, EyeOff } from 'lucide-react';

const securityIcons: Record<string, React.ReactNode> = {
  Lock: <Lock className="w-7 h-7 text-[#1769E0]" />,
  Shield: <Shield className="w-7 h-7 text-[#00C853]" />,
  FileText: <FileText className="w-7 h-7 text-[#FFC107]" />,
  Headphones: <Headphones className="w-7 h-7 text-[#1769E0]" />,
  EyeOff: <EyeOff className="w-7 h-7 text-[#00C853]" />,
};

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-20 sm:py-28 bg-[#040E1E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/30 text-[#00C853] text-xs font-bold uppercase tracking-wider mb-3">
            Trust & Integrity
          </span>
          <h2 className="font-['Poppins',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Your Experience. Your Data. Your Security.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            We are committed to maintaining a protected, reliable, and transparent platform environment for all members.
          </p>
        </div>

        {/* 5 Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPoints.map((item) => (
            <div
              key={item.title}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.06] hover:border-[#1769E0]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 shadow-inner">
                {securityIcons[item.iconName]}
              </div>

              <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
