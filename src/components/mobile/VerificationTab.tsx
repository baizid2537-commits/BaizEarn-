import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  Clock,
  ArrowRight,
  HelpCircle,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { BkashLogo, NagadLogo, RocketLogo, PaymentMethodLogo } from '../common/PaymentLogos';

export const VerificationTab: React.FC = () => {
  const {
    currentUser,
    settings,
    submitVerification,
    verifications,
    showToast,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bkash');
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isVerified = currentUser?.accountStatus === 'verified';
  const isPending = currentUser?.accountStatus === 'pending_verification';

  // User's latest verification request
  const myLatestRequest = verifications.find((v) => v.userId === currentUser?.id);

  const copyAdminNumber = () => {
    navigator.clipboard.writeText(settings.adminPhone);
    setCopiedNumber(true);
    showToast(`অফিসিয়াল পেমেন্ট নম্বর (${settings.adminPhone}) কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopiedNumber(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (!senderNumber || senderNumber.length < 11) {
      setFormError('সঠিক ১১ ডিজিটের বিকাশ/নগদ/রকেট মোবাইল নম্বর দিন!');
      return;
    }

    if (!trxId || trxId.trim().length < 6) {
      setFormError('সঠিক ট্রানজেকশন আইডি (Transaction ID / TrxID) প্রদান করুন!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = submitVerification({
        method: selectedMethod,
        senderNumber: senderNumber.trim(),
        trxId: trxId.trim().toUpperCase(),
        amount: settings.verificationFeeBDT,
      });

      setIsSubmitting(false);
      if (res.success) {
        setSenderNumber('');
        setTrxId('');
      } else {
        setFormError(res.message);
      }
    }, 600);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-5 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C853]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C853] to-[#1769E0] flex items-center justify-center font-bold text-white shadow-md shadow-[#00C853]/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-['Poppins',sans-serif] text-lg font-extrabold text-white">
              অ্যাকাউন্ট ভেরিফিকেশন (৳৬০০)
            </h2>
            <div className="text-xs text-slate-300">
              অফিসিয়াল বিকাশ, নগদ ও রকেট পেমেন্ট গেটওয়ে
            </div>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed">
          BaizEarn-এ একাউন্ট ভেরিফাই করলেই পাবেন আনলিমিটেড টাস্ক পূরণ সুবিধা, রেফারেল টিম কমিশন এবং সরাসরি বিকাশ/নগদে যেকোনো সময় টাকা উত্তোলনের সুযোগ।
        </p>
      </div>

      {/* STATE 1: ALREADY VERIFIED */}
      {isVerified && (
        <div className="bg-gradient-to-br from-[#FFC107]/20 via-[#071A35] to-[#040e1e] border-2 border-[#FFC107]/50 rounded-3xl p-6 text-center text-white space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#FFC107]/20 border-2 border-[#FFC107] text-[#FFC107] flex items-center justify-center mx-auto shadow-lg shadow-[#FFC107]/30">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFC107] text-[#071A35] text-xs font-black uppercase tracking-wider mb-2">
              ভেরিফাইড প্রো মেম্বার ⭐
            </span>
            <h3 className="font-['Poppins',sans-serif] text-xl font-bold text-white">
              আপনার অ্যাকাউন্টটি সম্পূর্ণ ভেরিফাইড!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
              অভিনন্দন! আপনার জন্য সমস্ত আর্নিং টাস্ক, রেফারেল বোনাস এবং আনলিমিটেড টাকা উত্তোলন সুবিধা সক্রিয় রয়েছে।
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xs text-slate-300 max-w-xs mx-auto space-y-1 text-left">
            <div className="flex justify-between">
              <span className="text-slate-400">মেম্বার স্ট্যাটাস:</span>
              <span className="text-[#00C853] font-bold">একটিভ (Active)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">উইথড্রয়াল লিমিট:</span>
              <span className="text-white font-bold">আনলিমিটেড</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">টাস্ক রিওয়ার্ড:</span>
              <span className="text-[#FFC107] font-bold">100% হাই রেট</span>
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: PENDING REVIEW */}
      {isPending && (
        <div className="bg-gradient-to-br from-[#1769E0]/20 via-[#071A35] to-[#040e1e] border-2 border-[#1769E0]/50 rounded-3xl p-6 text-center text-white space-y-3 shadow-xl">
          <div className="w-14 h-14 rounded-full bg-[#1769E0]/20 border border-[#1769E0] text-[#60a5fa] flex items-center justify-center mx-auto animate-pulse">
            <Clock className="w-7 h-7" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#1769E0]/30 text-[#60a5fa] text-xs font-bold border border-[#1769E0]/40">
            যাচাই অপেক্ষমান (In Review)
          </span>

          <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-white">
            আপনার ভেরিফিকেশন আবেদনটি প্রক্রিয়াধীন রয়েছে
          </h3>

          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
            এডমিন আপনার পাঠানো TrxID ({myLatestRequest?.transactionId || '***'}) এবং পেমেন্ট যাচাই করছে। সাধারণত ১০-১৫ মিনিটের মধ্যে একাউন্ট ভেরিফাই হয়ে যায়।
          </p>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xs text-slate-300 max-w-xs mx-auto space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">মেথড:</span>
              <div className="flex items-center gap-1.5 font-bold uppercase text-white">
                <PaymentMethodLogo method={myLatestRequest?.paymentMethod || 'bkash'} size={20} rounded="rounded-md" />
                <span>{myLatestRequest?.paymentMethod || 'bKash'}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">প্রেরক নম্বর:</span>
              <span className="text-white font-mono">{myLatestRequest?.senderNumber || '019***'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">TrxID:</span>
              <span className="text-[#FFC107] font-mono font-bold">{myLatestRequest?.transactionId}</span>
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: UNVERIFIED / REGULAR USER VERIFICATION GATEWAY */}
      {!isVerified && (
        <>
          {/* Official Payment Number Box (01965732537) */}
          <div className="bg-white/[0.04] border border-[#00C853]/40 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#00C853] uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" /> অফিসিয়াল পেমেন্ট নম্বর
              </span>
              <div className="flex items-center gap-1">
                <BkashLogo size={18} rounded="rounded-md" />
                <NagadLogo size={18} rounded="rounded-md" />
                <RocketLogo size={18} rounded="rounded-md" />
                <span className="text-[10px] bg-[#00C853]/20 text-[#00C853] px-2 py-0.5 rounded-full font-bold border border-[#00C853]/30 ml-1">
                  Send Money
                </span>
              </div>
            </div>

            {/* Big Copyable Number */}
            <div className="bg-[#071A35] border border-white/15 rounded-2xl p-3.5 flex items-center justify-between gap-2 shadow-inner">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">বিকাশ / নগদ / রকেট নম্বর:</span>
                <div className="font-['Poppins',sans-serif] text-xl sm:text-2xl font-black text-[#FFC107] tracking-wider font-mono">
                  {settings.adminPhone}
                </div>
              </div>

              <button
                type="button"
                onClick={copyAdminNumber}
                className="px-4 py-2.5 bg-[#00C853] hover:bg-[#00b348] text-white font-bold text-xs rounded-xl shadow-md shadow-[#00C853]/30 flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
              >
                {copiedNumber ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>নম্বর কপি করুন</span>
                  </>
                )}
              </button>
            </div>

            {/* Step-by-Step Bangla Instructions */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-slate-300 block">
                ভেরিফিকেশন প্রক্রিয়া (ধাপে ধাপে):
              </span>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1769E0] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    ১
                  </span>
                  <span>আপনার <strong>বিকাশ</strong>, <strong>নগদ</strong> অথবা <strong>রকেট</strong> অ্যাপে গিয়ে <strong>"Send Money" (সেন্ড মানি)</strong> অপশন সিলেক্ট করুন।</span>
                </div>

                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1769E0] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    ২
                  </span>
                  <span>আমাদের নম্বর <strong>01965732537</strong> দিন এবং ঠিক <strong>৳৬০০ টাকা</strong> সেন্ড মানি করুন।</span>
                </div>

                <div className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#1769E0] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    ৩
                  </span>
                  <span>টাকা পাঠানোর পর প্রাপ্ত <strong>Transaction ID (TrxID)</strong> এবং আপনার যে নম্বর থেকে পাঠিয়েছেন তা নিচের ফর্মে লিখে সাবমিট করুন।</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Submission Form */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 shadow-lg">
            <h3 className="font-['Poppins',sans-serif] text-base font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00C853]" />
              <span>পেমেন্ট তথ্য জমা দিন</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {formError}
                </div>
              )}

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  কোন মেথডে টাকা পাঠিয়েছেন নির্বাচন করুন *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bkash')}
                    className={`py-3 px-2 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      selectedMethod === 'bkash'
                        ? 'bg-[#E2136E]/20 border-[#E2136E] text-white shadow-lg shadow-[#E2136E]/30 scale-[1.03] ring-1 ring-[#E2136E]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <BkashLogo size={34} rounded="rounded-xl" />
                    <span className="text-xs font-bold text-white">বিকাশ</span>
                    <span className="text-[10px] text-pink-300 font-medium">bKash</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('nagad')}
                    className={`py-3 px-2 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      selectedMethod === 'nagad'
                        ? 'bg-[#F15A24]/20 border-[#F15A24] text-white shadow-lg shadow-[#F15A24]/30 scale-[1.03] ring-1 ring-[#F15A24]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <NagadLogo size={34} rounded="rounded-xl" />
                    <span className="text-xs font-bold text-white">নগদ</span>
                    <span className="text-[10px] text-orange-300 font-medium">Nagad</span>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('rocket')}
                    className={`py-3 px-2 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      selectedMethod === 'rocket'
                        ? 'bg-[#8C3494]/20 border-[#8C3494] text-white shadow-lg shadow-[#8C3494]/30 scale-[1.03] ring-1 ring-[#8C3494]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <RocketLogo size={34} rounded="rounded-xl" />
                    <span className="text-xs font-bold text-white">রকেট</span>
                    <span className="text-[10px] text-purple-300 font-medium">Rocket</span>
                  </button>
                </div>
              </div>

              {/* Sender Number Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender Number) *
                </label>
                <input
                  type="tel"
                  placeholder="যেমন: 017XXXXXXXX"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>

              {/* Transaction ID Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>ট্রানজেকশন আইডি (Transaction ID / TrxID) *</span>
                  <span className="text-[10px] text-[#00C853]">মেসেজে প্রাপ্ত TrxID</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: 9J8X22K91L"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none font-mono uppercase"
                  required
                />
              </div>

              {/* Fixed Amount Display */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">ভেরিফিকেশন ফি:</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-[#FFC107] font-['Poppins',sans-serif] text-base">৳৬০০ টাকা</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#00C853] hover:bg-[#00b048] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#00C853]/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <span>জমা দেওয়া হচ্ছে...</span>
                ) : (
                  <>
                    <span>ভেরিফিকেশন রিকোয়েস্ট জমা দিন</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </>
      )}

      {/* Help & Assurance Card */}
      <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl text-xs text-slate-400 space-y-1.5">
        <div className="font-bold text-slate-300 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#1769E0]" />
          <span>পেমেন্ট সংক্রান্ত কোনো সমস্যা হলে:</span>
        </div>
        <p className="leading-relaxed">
          টাকা পাঠানোর পর ট্রানজেকশন জমা দিতে কোনো সমস্যা হলে সরাসরি আমাদের হেল্পলাইন <strong>01965732537</strong> অথবা টেলিগ্রাম সাপোর্ট গ্রুপে স্ক্রিনশট সহ যোগাযোগ করুন।
        </p>
      </div>
    </div>
  );
};
