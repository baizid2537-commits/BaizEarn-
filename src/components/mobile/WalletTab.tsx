import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  Send,
  History,
  Lock,
  ArrowRight,
  Receipt,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { BkashLogo, NagadLogo, RocketLogo, PaymentMethodLogo } from '../common/PaymentLogos';
import { TransactionHistoryView } from './TransactionHistoryView';

export const WalletTab: React.FC = () => {
  const {
    currentUser,
    verifications,
    withdrawals,
    transactions,
    settings,
    submitWithdrawal,
    setActiveTab,
    showToast,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const [activeSubView, setActiveSubView] = useState<'tx_history' | 'earnings_history'>('tx_history');
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const [accountType, setAccountType] = useState<'personal' | 'agent'>('personal');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState<string>('200');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isVerified = currentUser?.accountStatus === 'verified';

  // User filtered data
  const userTx = transactions.filter((t) => t.userId === currentUser?.id);
  const userWithdrawals = withdrawals.filter((w) => w.userId === currentUser?.id);
  const userVerifications = verifications.filter((v) => v.userId === currentUser?.id);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (!isVerified) {
      setFormError('টাকা উত্তোলন করতে হলে আপনার অ্যাকাউন্টটি ভেরিফাইড (৳৬০০) হতে হবে!');
      return;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount < settings.minWithdrawal) {
      setFormError(`সর্বনিম্ন উত্তোলনের পরিমাণ ৳${settings.minWithdrawal}!`);
      return;
    }

    if (numAmount > currentUser.balance) {
      setFormError('আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!');
      return;
    }

    if (!accountNumber || accountNumber.length < 11) {
      setFormError('সঠিক ১১ ডিজিটের মোবাইল অ্যাকাউন্ট নম্বর দিন!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = submitWithdrawal({
        method,
        accountNumber: accountNumber.trim(),
        accountType,
        amount: numAmount,
      });

      setIsSubmitting(false);
      if (res.success) {
        setWithdrawModalOpen(false);
        setAccountNumber('');
      } else {
        setFormError(res.message);
      }
    }, 500);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Wallet Balance Hero Card */}
      <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-white/15 rounded-3xl p-5 shadow-xl text-white relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#00C853]/20 text-[#00C853] flex items-center justify-center font-bold">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">উপলব্ধ মূল ব্যালেন্স</span>
              <div className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-black text-[#FFC107]">
                ৳ {currentUser ? currentUser.balance.toLocaleString('bn-BD') : '০'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Deposit / Verify Quick Button */}
            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                  return;
                }
                setActiveTab('verify');
              }}
              className="px-3 py-2 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/15 flex items-center gap-1 transition-all"
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-[#00C853]" />
              <span>ডিপোজিট</span>
            </button>

            {/* Withdraw Button */}
            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                  return;
                }
                if (!isVerified) {
                  showToast('টাকা তুলতে একাউন্ট ভেরিফাই (৳৬০০) করুন!', 'info');
                  setActiveTab('verify');
                  return;
                }
                setWithdrawModalOpen(true);
              }}
              className="px-3.5 py-2 bg-[#00C853] hover:bg-[#00b048] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#00C853]/30 flex items-center gap-1 transition-transform hover:scale-105"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>উত্তোলন</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="p-2 bg-white/5 rounded-xl">
            <span className="text-[10px] text-slate-400 block">আজকের আয়</span>
            <span className="font-['Poppins',sans-serif] text-sm font-bold text-[#00C853]">
              ৳ {currentUser?.todayEarnings || 0}
            </span>
          </div>
          <div className="p-2 bg-white/5 rounded-xl">
            <span className="text-[10px] text-slate-400 block">মোট পেআউট</span>
            <span className="font-['Poppins',sans-serif] text-sm font-bold text-slate-200">
              ৳ {currentUser?.totalWithdrawn || 0}
            </span>
          </div>
          <div className="p-2 bg-white/5 rounded-xl">
            <span className="text-[10px] text-slate-400 block">রেফার আয়</span>
            <span className="font-['Poppins',sans-serif] text-sm font-bold text-purple-400">
              ৳ {currentUser?.referralEarnings || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Verification Notice for Withdrawals if regular user */}
      {!isVerified && (
        <div className="bg-white/[0.03] border border-[#FFC107]/40 rounded-3xl p-4 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC107]/15 text-[#FFC107] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#FFC107] block">উইথড্রয়াল লক রয়েছে!</span>
              <span className="text-[11px] text-slate-300">
                টাকা উত্তোলন করতে মাত্র ৬০০ টাকা ডিপোজিট করে একাউন্ট ভেরিফাই করুন।
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('verify')}
            className="px-3 py-2 bg-[#FFC107] hover:bg-[#ffb300] text-[#071A35] font-black text-xs rounded-xl shrink-0 shadow-md"
          >
            ভেরিফাই করুন
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs: Transaction History (Deposits & Withdrawals) vs Earnings Log */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveSubView('tx_history')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubView === 'tx_history'
              ? 'bg-[#1769E0] text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>ডিপোজিট ও উত্তোলন হিস্ট্রি</span>
          {(userVerifications.length > 0 || userWithdrawals.length > 0) && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-white/20 ml-0.5">
              {userVerifications.length + userWithdrawals.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubView('earnings_history')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubView === 'earnings_history'
              ? 'bg-[#1769E0] text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#FFC107]" />
          <span>আয় ও রিওয়ার্ড হিস্ট্রি</span>
          {userTx.length > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-white/20 ml-0.5">
              {userTx.length}
            </span>
          )}
        </button>
      </div>

      {/* View 1: Transaction History View (Deposits & Withdrawals with statuses Pending, Completed, Failed) */}
      {activeSubView === 'tx_history' && (
        <TransactionHistoryView
          verifications={userVerifications}
          withdrawals={userWithdrawals}
          onOpenDeposit={() => setActiveTab('verify')}
          onOpenWithdraw={() => {
            if (!isVerified) {
              showToast('টাকা তুলতে একাউন্ট ভেরিফাই (৳৬০০) করুন!', 'info');
              setActiveTab('verify');
              return;
            }
            setWithdrawModalOpen(true);
          }}
        />
      )}

      {/* View 2: Earnings & Rewards Log */}
      {activeSubView === 'earnings_history' && (
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-[#00C853]" /> সকল আয় ও বোনাস লগ
            </span>
            <span className="text-[11px] text-slate-500 font-mono">মোট {userTx.length}টি</span>
          </div>

          {userTx.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <p>এখনও কোনো উপার্জনের রেকর্ড নেই।</p>
              <button
                type="button"
                onClick={() => setActiveTab('tasks')}
                className="px-3 py-1.5 bg-[#1769E0]/20 hover:bg-[#1769E0]/30 text-[#1769E0] border border-[#1769E0]/30 rounded-xl font-bold transition-all inline-block"
              >
                টাস্ক পূরণ করে আয় শুরু করুন
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {userTx.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs"
                >
                  <div className="max-w-[70%]">
                    <div className="font-semibold text-white truncate">{tx.description}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-slate-500" />
                      <span>
                        {new Date(tx.createdAt).toLocaleString('bn-BD', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-['Poppins',sans-serif] font-bold text-sm ${
                        tx.amount > 0 ? 'text-[#00C853]' : 'text-rose-400'
                      }`}
                    >
                      {tx.amount > 0 ? `+৳${tx.amount}` : `৳${tx.amount}`}
                    </div>
                    <span className="text-[9px] font-mono uppercase text-slate-400 block mt-0.5">
                      {tx.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Withdraw Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#071A35] border border-white/20 rounded-3xl p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-white flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-[#00C853]" />
                <span>টাকা উত্তোলন (Withdraw)</span>
              </h3>
              <button
                type="button"
                onClick={() => setWithdrawModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {formError}
                </div>
              )}

              {/* Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  পেমেন্ট নেওয়ার মাধ্যম *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setMethod('bkash')}
                    className={`py-3 px-2 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      method === 'bkash'
                        ? 'bg-[#E2136E]/20 border-[#E2136E] text-white shadow-lg shadow-[#E2136E]/30 scale-[1.02] ring-1 ring-[#E2136E]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <BkashLogo size={32} rounded="rounded-xl" />
                    <span className="text-xs font-bold text-white">বিকাশ</span>
                    <span className="text-[10px] text-pink-300">bKash</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setMethod('nagad')}
                    className={`py-3 px-2 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      method === 'nagad'
                        ? 'bg-[#F15A24]/20 border-[#F15A24] text-white shadow-lg shadow-[#F15A24]/30 scale-[1.02] ring-1 ring-[#F15A24]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <NagadLogo size={32} rounded="rounded-xl" />
                    <span className="text-xs font-bold text-white">নগদ</span>
                    <span className="text-[10px] text-orange-300">Nagad</span>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    onClick={() => setMethod('rocket')}
                    className={`py-3 px-2 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      method === 'rocket'
                        ? 'bg-[#8C3494]/20 border-[#8C3494] text-white shadow-lg shadow-[#8C3494]/30 scale-[1.02] ring-1 ring-[#8C3494]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <RocketLogo size={32} rounded="rounded-xl" />
                    <span className="text-xs font-bold text-white">রকেট</span>
                    <span className="text-[10px] text-purple-300">Rocket</span>
                  </button>
                </div>
              </div>

              {/* Account Type */}
              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="accType"
                    checked={accountType === 'personal'}
                    onChange={() => setAccountType('personal')}
                    className="text-[#1769E0]"
                  />
                  <span>পার্সোনাল (Personal)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="accType"
                    checked={accountType === 'agent'}
                    onChange={() => setAccountType('agent')}
                    className="text-[#1769E0]"
                  />
                  <span>এজেন্ট (Agent)</span>
                </label>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  মোবাইল অ্যাকাউন্ট নম্বর *
                </label>
                <input
                  type="tel"
                  placeholder="যেমন: 01965732537"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00C853] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none font-mono"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    উত্তোলনের পরিমাণ (৳) *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    ব্যালেন্স: ৳{currentUser?.balance || 0}
                  </span>
                </div>
                <input
                  type="number"
                  min={settings.minWithdrawal}
                  max={currentUser?.balance || 0}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00C853] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none font-['Poppins',sans-serif] text-base"
                  required
                />
                <div className="flex gap-2 mt-1.5">
                  {[100, 200, 500, 1000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAmount(String(v))}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-slate-300"
                    >
                      ৳{v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Breakdown */}
              <div className="p-3 bg-white/5 rounded-xl text-xs space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>উত্তোলনের পরিমাণ:</span>
                  <span className="font-bold text-white">৳{Number(amount) || 0}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>চার্জ (২%):</span>
                  <span>৳{Math.round((Number(amount) || 0) * 0.02)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#00C853] pt-1 border-t border-white/10">
                  <span>আপনি পাবেন:</span>
                  <span>৳{(Number(amount) || 0) - Math.round((Number(amount) || 0) * 0.02)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#00C853] hover:bg-[#00b048] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#00C853]/30 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <span>আবেদন পাঠানো হচ্ছে...</span> : <span>উইথড্র রিকোয়েস্ট কনফার্ম করুন</span>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
