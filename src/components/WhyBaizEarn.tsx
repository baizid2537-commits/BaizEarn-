import React from 'react';
import { whyFeatures } from '../data/homeData';
import { ShieldCheck, Lock, Check, Cpu, Server, Sparkles } from 'lucide-react';

export const WhyBaizEarn: React.FC = () => {
  return (
    <section id="why" className="py-20 sm:py-28 bg-[#071A35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Security & Technology Architecture Illustration */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Glow Accent */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#1769E0] to-[#00C853] rounded-3xl blur-xl opacity-20" />

              <div className="relative bg-gradient-to-br from-[#0b1b36] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-8 sm:p-10 text-white shadow-2xl overflow-hidden">
                {/* Visual Shield Icon Badge */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#00C853]/20 to-[#1769E0]/30 border border-[#00C853]/40 flex items-center justify-center mb-8 shadow-inner">
                  <ShieldCheck className="w-10 h-10 text-[#00C853]" />
                </div>

                <h3 className="font-['Poppins',sans-serif] text-2xl font-bold text-white mb-3">
                  Enterprise-Grade Security Architecture
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-8">
                  Engineered with isolated session validation, automated fraud protection algorithms, and full ledger transparency for all platform participants.
                </p>

                {/* Micro Tech Badges */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                    <span>256-Bit SSL Encryption Protocols</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                    <span>Automated Fraud Anomaly Shields</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-[#00C853] shrink-0" />
                    <span>99.98% High Availability Uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why BaizEarn Content */}
          <div className="lg:col-span-7">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#1769E0]/15 border border-[#1769E0]/30 text-[#60a5fa] text-xs font-bold uppercase tracking-wider mb-3">
              Platform Advantage
            </span>

            <h2 className="font-['Poppins',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Built for a Better Digital Earning Experience
            </h2>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8">
              We engineered BaizEarn to eliminate complexity and provide a transparent, trusted environment where tasks, rewards, and network growth are always clear.
            </p>

            {/* 6 Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {whyFeatures.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/[0.03] border border-white/10 rounded-xl p-5 shadow-sm hover:bg-white/[0.06] hover:border-[#1769E0]/40 transition-all flex gap-3.5"
                >
                  <div className="w-7 h-7 rounded-full bg-[#00C853]/15 text-[#00C853] flex items-center justify-center shrink-0 mt-0.5 border border-[#00C853]/30">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
