import React, { useState } from 'react';
import { Share2, Users, ArrowRight, Copy, Check, Shield, Network } from 'lucide-react';

export const ReferralSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const sampleReferralLink = 'https://baizearn.com/ref/user7829';

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleReferralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="referral" className="py-20 sm:py-28 bg-[#040E1E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Messaging & Referral Features */}
          <div className="lg:col-span-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/30 text-[#00C853] text-xs font-bold uppercase tracking-wider mb-3">
              Network Multiplier
            </span>

            <h2 className="font-['Poppins',sans-serif] text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Grow Your Network with BaizEarn
            </h2>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-6">
              Share your eligible referral link and monitor your network from your personal dashboard.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#1769E0]" />
                <span className="font-medium">Direct Link Sharing with real-time click tracking</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#00C853]" />
                <span className="font-medium">Multi-tier team activity overview</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#FFC107]" />
                <span className="font-medium">Transparent reward disbursement logs in your digital wallet</span>
              </div>
            </div>

            {/* Referral Link Copy Preview Box */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 mb-8">
              <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Your Unique Referral Link (Preview)</span>
                <span className="text-[11px] text-[#00C853] font-bold">1 Click Share</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={sampleReferralLink}
                  className="bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-slate-200 rounded-lg px-3 py-2 flex-1 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-2 bg-[#1769E0] hover:bg-[#1255b8] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-md shadow-[#1769E0]/20"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#register"
                id="referral-cta-button"
                className="px-7 py-3.5 bg-[#1769E0] hover:bg-[#1255b8] text-white font-semibold text-base rounded-xl shadow-[0_4px_15px_rgba(23,105,224,0.3)] hover:shadow-lg transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>Explore Referral Program</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Referral Network Diagram */}
          <div className="lg:col-span-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Network Topology Diagram
                </span>
              </div>

              {/* Visual Tree */}
              <div className="flex flex-col items-center gap-4">
                {/* Root Node (You) */}
                <div className="bg-white/5 border-2 border-[#1769E0] rounded-2xl p-4 shadow-lg flex items-center gap-3 w-64">
                  <div className="w-10 h-10 rounded-full bg-[#1769E0] text-white font-bold flex items-center justify-center text-xs shadow-md shadow-[#1769E0]/40">
                    YOU
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Primary Account</div>
                    <div className="text-[11px] text-[#94A3B8]">Direct Referrals: 28</div>
                  </div>
                </div>

                {/* Connector Line */}
                <div className="w-0.5 h-8 bg-white/20 relative">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1769E0]" />
                </div>

                {/* Child Nodes Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md">
                  {[
                    { tag: 'A1', name: 'Partner Alex', tasks: '+12 Tasks' },
                    { tag: 'B2', name: 'Partner Sarah', tasks: '+19 Tasks' },
                    { tag: 'C3', name: 'Partner David', tasks: '+8 Tasks' },
                  ].map((node) => (
                    <div
                      key={node.tag}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-center shadow-xs hover:border-[#00C853] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 text-slate-200 font-bold text-xs flex items-center justify-center mx-auto mb-1.5">
                        {node.tag}
                      </div>
                      <div className="text-[11px] font-bold text-white truncate">
                        {node.name}
                      </div>
                      <div className="text-[10px] text-[#00C853] font-semibold">
                        {node.tasks}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Note about compliance */}
                <div className="mt-4 pt-4 border-t border-white/10 text-center text-[11px] text-slate-400">
                  Referral rewards are disbursed exclusively on eligible, verified task completions according to standard terms.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
