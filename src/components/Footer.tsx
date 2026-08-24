import React from 'react';
import { Twitter, Send, Linkedin, Facebook, ArrowUp } from 'lucide-react';
import { BAIZEARN_LOGO } from '../assets/logo';
import { BkashLogo, NagadLogo, RocketLogo } from './common/PaymentLogos';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#040e1e] text-slate-400 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-10">
          {/* Brand Column (2 cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-3 text-white group inline-block">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-[#1769E0]/30 border border-[#FFC107]/40 bg-[#071A35] flex items-center justify-center p-0.5">
                <img
                  src={BAIZEARN_LOGO}
                  alt="BaizEarn Logo"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-['Poppins',sans-serif] text-2xl font-bold tracking-tight text-white">
                Baiz<span className="text-[#00C853]">Earn</span>
              </span>
            </a>

            <p className="font-['Poppins',sans-serif] text-base font-semibold text-slate-200">
              “Earn Smarter. Grow Faster.”
            </p>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A modern digital earning, rewards, tasks and referral platform engineered for performance, security and transparency.
            </p>

            {/* Official Payment Gateways */}
            <div className="pt-2">
              <span className="text-xs text-slate-400 font-medium block mb-2">
                অফিসিয়াল পেমেন্ট মেথড (Instant Payouts):
              </span>
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs">
                  <BkashLogo size={22} rounded="rounded-md" />
                  <span className="font-bold text-xs">বিকাশ (bKash)</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs">
                  <NagadLogo size={22} rounded="rounded-md" />
                  <span className="font-bold text-xs">নগদ (Nagad)</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs">
                  <RocketLogo size={22} rounded="rounded-md" />
                  <span className="font-bold text-xs">রকেট (Rocket)</span>
                </div>
              </div>
            </div>

            {/* Social Media Placeholders */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1769E0] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#telegram"
                aria-label="Telegram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1769E0] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1769E0] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1769E0] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div>
            <h4 className="font-['Poppins',sans-serif] text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#referral" className="hover:text-white transition-colors">Referral</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="font-['Poppins',sans-serif] text-sm font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">Support Desk</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-['Poppins',sans-serif] text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 BaizEarn. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">
              Eligible tasks, rewards and referral platform
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
