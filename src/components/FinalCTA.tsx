import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section id="cta" className="relative bg-[#071A35] text-white py-24 sm:py-32 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#1769E0]/25 via-[#00C853]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00C853]/20 border border-[#00C853]/40 text-[#00C853] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Free Registration</span>
        </div>

        <h2 className="font-['Poppins',sans-serif] text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Ready to Get Started with BaizEarn?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Create your account and explore the BaizEarn platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#register"
            id="final-cta-create-account"
            className="w-full sm:w-auto px-8 py-4 bg-[#00C853] hover:bg-[#00a846] text-[#071A35] font-bold text-base rounded-xl shadow-lg shadow-[#00C853]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5 text-[#071A35]" />
          </a>

          <a
            href="#login"
            id="final-cta-login"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-base rounded-xl border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2"
          >
            <span>Login</span>
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00C853]" />
            <span>Encrypted Connection</span>
          </div>
          <span>•</span>
          <span>No Credit Card Required</span>
          <span>•</span>
          <span>Instant Setup</span>
        </div>
      </div>
    </section>
  );
};
