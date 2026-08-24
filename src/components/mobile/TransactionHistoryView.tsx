import React, { useState, useMemo } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Copy,
  Check,
  Receipt,
  Eye,
  FileText,
  ShieldCheck,
  Send,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { VerificationRequest, WithdrawalRequest, PaymentMethod } from '../../types';
import { PaymentMethodLogo } from '../common/PaymentLogos';
import { useApp } from '../../context/AppContext';

export type UnifiedTxType = 'deposit' | 'withdrawal';
export type UnifiedTxStatus = 'pending' | 'completed' | 'failed';

export interface UnifiedTransaction {
  id: string;
  type: UnifiedTxType;
  title: string;
  method: PaymentMethod;
  accountNumber: string;
  accountType?: 'personal' | 'agent';
  trxId?: string;
  amount: number;
  fee?: number;
  netAmount?: number;
  status: UnifiedTxStatus;
  date: string;
  processedAt?: string;
  note?: string;
  adminTrxId?: string;
  adminNumber?: string;
}

interface Props {
  verifications: VerificationRequest[];
  withdrawals: WithdrawalRequest[];
  onOpenDeposit?: () => void;
  onOpenWithdraw?: () => void;
}

export const TransactionHistoryView: React.FC<Props> = ({
  verifications,
  withdrawals,
  onOpenDeposit,
  onOpenWithdraw,
}) => {
  const { settings, showToast } = useApp();
  const [typeFilter, setTypeFilter] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<UnifiedTransaction | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Combine verifications (deposits) and withdrawals into unified list
  const unifiedTransactions = useMemo<UnifiedTransaction[]>(() => {
    const list: UnifiedTransaction[] = [];

    // Map Verifications as Deposits
    verifications.forEach((v) => {
      let status: UnifiedTxStatus = 'pending';
      if (v.status === 'approved') status = 'completed';
      if (v.status === 'rejected') status = 'failed';

      list.push({
        id: v.id,
        type: 'deposit',
        title: 'ভেরিফিকেশন ডিপোজিট (Deposit)',
        method: v.paymentMethod,
        accountNumber: v.senderNumber,
        trxId: v.transactionId,
        amount: v.amountBDT || 600,
        fee: 0,
        netAmount: v.amountBDT || 600,
        status,
        date: v.submittedAt,
        processedAt: v.reviewedAt,
        note: v.rejectReason,
        adminNumber: v.adminNumber || settings.adminPhone,
      });
    });

    // Map Withdrawals
    withdrawals.forEach((w) => {
      let status: UnifiedTxStatus = 'pending';
      if (w.status === 'approved') status = 'completed';
      if (w.status === 'rejected') status = 'failed';

      list.push({
        id: w.id,
        type: 'withdrawal',
        title: 'ক্যাশআউট উত্তোলন (Withdrawal)',
        method: w.method,
        accountNumber: w.accountNumber,
        accountType: w.accountType,
        trxId: w.adminTrxId || w.id,
        amount: w.amount,
        fee: w.fee,
        netAmount: w.netAmount,
        status,
        date: w.requestedAt,
        processedAt: w.processedAt,
        adminTrxId: w.adminTrxId,
      });
    });

    // Sort descending by date (newest first)
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [verifications, withdrawals, settings.adminPhone]);

  // Filtered list
  const filteredTransactions = useMemo(() => {
    return unifiedTransactions.filter((tx) => {
      // Type match
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;

      // Status match
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;

      // Search match (TrxID, Phone, or Method)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTrx = tx.trxId?.toLowerCase().includes(query);
        const matchPhone = tx.accountNumber.toLowerCase().includes(query);
        const matchMethod = tx.method.toLowerCase().includes(query);
        const matchId = tx.id.toLowerCase().includes(query);
        if (!matchTrx && !matchPhone && !matchMethod && !matchId) return false;
      }

      return true;
    });
  }, [unifiedTransactions, typeFilter, statusFilter, searchQuery]);

  // Status Counts
  const counts = useMemo(() => {
    const totalDeposits = unifiedTransactions.filter((t) => t.type === 'deposit').length;
    const totalWithdrawals = unifiedTransactions.filter((t) => t.type === 'withdrawal').length;
    const pendingCount = unifiedTransactions.filter((t) => t.status === 'pending').length;
    const completedCount = unifiedTransactions.filter((t) => t.status === 'completed').length;
    const failedCount = unifiedTransactions.filter((t) => t.status === 'failed').length;

    return { totalDeposits, totalWithdrawals, pendingCount, completedCount, failedCount };
  }, [unifiedTransactions]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('ক্লিপবোর্ডে কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMethodName = (m: PaymentMethod | string) => {
    if (m === 'bkash') return 'বিকাশ (bKash)';
    if (m === 'nagad') return 'নগদ (Nagad)';
    if (m === 'rocket') return 'রকেট (Rocket)';
    return m;
  };

  return (
    <div className="space-y-4">
      {/* Header & Quick Summary Cards */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1769E0]/20 text-[#1769E0] flex items-center justify-center font-bold">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Poppins',sans-serif] font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>লেনদেনের হিস্ট্রি (Transaction History)</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                ডিপোজিট ও উত্তোলনের সার্বিক বিবরণী ও স্ট্যাটাস
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]">
              মোট: {unifiedTransactions.length}টি
            </span>
            {counts.pendingCount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] font-bold text-[11px] animate-pulse">
                পেন্ডিং: {counts.pendingCount}
              </span>
            )}
          </div>
        </div>

        {/* Mini Status Breakdown Chips */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/5">
          <div
            onClick={() => {
              setTypeFilter('deposit');
              setStatusFilter('all');
            }}
            className={`p-2.5 rounded-2xl cursor-pointer transition-all border ${
              typeFilter === 'deposit'
                ? 'bg-[#00C853]/15 border-[#00C853]/50 text-white'
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <span className="text-[10px] block font-medium flex items-center justify-center gap-1">
              <ArrowDownLeft className="w-3 h-3 text-[#00C853]" /> মোট ডিপোজিট
            </span>
            <span className="font-['Poppins',sans-serif] text-sm font-bold text-[#00C853]">
              {counts.totalDeposits} টি
            </span>
          </div>

          <div
            onClick={() => {
              setTypeFilter('withdrawal');
              setStatusFilter('all');
            }}
            className={`p-2.5 rounded-2xl cursor-pointer transition-all border ${
              typeFilter === 'withdrawal'
                ? 'bg-[#1769E0]/15 border-[#1769E0]/50 text-white'
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <span className="text-[10px] block font-medium flex items-center justify-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-[#1769E0]" /> মোট উত্তোলন
            </span>
            <span className="font-['Poppins',sans-serif] text-sm font-bold text-[#1769E0]">
              {counts.totalWithdrawals} টি
            </span>
          </div>

          <div
            onClick={() => {
              setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending');
            }}
            className={`p-2.5 rounded-2xl cursor-pointer transition-all border ${
              statusFilter === 'pending'
                ? 'bg-[#FFC107]/15 border-[#FFC107]/50 text-white'
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <span className="text-[10px] block font-medium flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-[#FFC107]" /> পেন্ডিং রিকোয়েস্ট
            </span>
            <span className="font-['Poppins',sans-serif] text-sm font-bold text-[#FFC107]">
              {counts.pendingCount} টি
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-2.5">
        {/* Type Switcher (All / Deposits / Withdrawals) */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setTypeFilter('all')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${
              typeFilter === 'all'
                ? 'bg-[#1769E0] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            সব লেনদেন ({unifiedTransactions.length})
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('deposit')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1 ${
              typeFilter === 'deposit'
                ? 'bg-[#00C853] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>ডিপোজিট ({counts.totalDeposits})</span>
          </button>
          <button
            type="button"
            onClick={() => setTypeFilter('withdrawal')}
            className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1 ${
              typeFilter === 'withdrawal'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>উত্তোলন ({counts.totalWithdrawals})</span>
          </button>
        </div>

        {/* Status Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] text-slate-400 font-medium shrink-0 flex items-center gap-1 pr-1">
            <Filter className="w-3 h-3 text-slate-400" /> স্ট্যাটাস:
          </span>

          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all border ${
              statusFilter === 'all'
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            সকল স্ট্যাটাস
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1 border ${
              statusFilter === 'pending'
                ? 'bg-[#FFC107]/25 border-[#FFC107] text-[#FFC107] font-bold shadow-sm'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-amber-300'
            }`}
          >
            <Clock className="w-3 h-3 text-[#FFC107]" />
            <span>পেন্ডিং ({counts.pendingCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1 border ${
              statusFilter === 'completed'
                ? 'bg-[#00C853]/25 border-[#00C853] text-[#00C853] font-bold shadow-sm'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-[#00C853]" />
            <span>কমপ্লিটেড ({counts.completedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('failed')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1 border ${
              statusFilter === 'failed'
                ? 'bg-rose-500/25 border-rose-500 text-rose-300 font-bold shadow-sm'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-rose-300'
            }`}
          >
            <XCircle className="w-3 h-3 text-rose-400" />
            <span>ব্যর্থ / বাতিল ({counts.failedCount})</span>
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="TrxID, মোবাইল নম্বর বা মেথড দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 focus:border-[#1769E0] rounded-2xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs w-4 h-4 rounded-full bg-white/10 flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-2.5">
        {filteredTransactions.length === 0 ? (
          <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
              <Receipt className="w-6 h-6 opacity-40" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">কোনো লেনদেন পাওয়া যায়নি</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                  ? 'আপনার ফিল্টারের সাথে মিলে এমন কোনো ডিপোজিট বা উত্তোলন রেকর্ড নেই।'
                  : 'আপনি এখনও কোনো ডিপোজিট বা উত্তোলনের আবেদন করেননি।'}
              </p>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              {onOpenDeposit && (
                <button
                  type="button"
                  onClick={onOpenDeposit}
                  className="px-3 py-1.5 bg-[#00C853]/20 hover:bg-[#00C853]/30 text-[#00C853] border border-[#00C853]/30 rounded-xl text-xs font-bold transition-all"
                >
                  + ডিপোজিট করুন
                </button>
              )}
              {onOpenWithdraw && (
                <button
                  type="button"
                  onClick={onOpenWithdraw}
                  className="px-3 py-1.5 bg-[#1769E0]/20 hover:bg-[#1769E0]/30 text-[#1769E0] border border-[#1769E0]/30 rounded-xl text-xs font-bold transition-all"
                >
                  উত্তোলন করুন
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isDeposit = tx.type === 'deposit';

            return (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl p-3.5 transition-all cursor-pointer space-y-2.5 shadow-sm"
              >
                {/* Top Row: Type, Method & Amount */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* Method Icon with official styling */}
                    <div className="relative">
                      <PaymentMethodLogo method={tx.method} size={38} rounded="rounded-xl" />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] shadow-md ${
                          isDeposit ? 'bg-[#00C853]' : 'bg-[#8C3494]'
                        }`}
                      >
                        {isDeposit ? (
                          <ArrowDownLeft className="w-2.5 h-2.5" />
                        ) : (
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-white">
                          {isDeposit ? 'ডিপোজিট' : 'উত্তোলন'} ({getMethodName(tx.method).split(' ')[0]})
                        </span>
                        {tx.accountType && (
                          <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded capitalize">
                            {tx.accountType}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                        <span>নম্বর: {tx.accountNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amount & Status */}
                  <div className="text-right">
                    <div
                      className={`font-['Poppins',sans-serif] text-sm sm:text-base font-black ${
                        isDeposit ? 'text-[#00C853]' : 'text-slate-100'
                      }`}
                    >
                      {isDeposit ? `+৳${tx.amount}` : `-৳${tx.amount}`}
                    </div>

                    {/* Status Pill */}
                    <div className="mt-1 flex justify-end">
                      {tx.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/30">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>সফল (Completed)</span>
                        </span>
                      )}
                      {tx.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/40 animate-pulse">
                          <Clock className="w-2.5 h-2.5" />
                          <span>পেন্ডিং (Pending)</span>
                        </span>
                      )}
                      {tx.status === 'failed' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          <XCircle className="w-2.5 h-2.5" />
                          <span>বাতিল (Failed)</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: TrxID & Date */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">TrxID:</span>
                    <span className="font-mono text-slate-300 font-semibold bg-white/5 px-1.5 py-0.5 rounded">
                      {tx.trxId || tx.id}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(tx.trxId || tx.id, tx.id);
                      }}
                      className="text-slate-400 hover:text-white p-0.5 transition-colors"
                      title="TrxID কপি করুন"
                    >
                      {copiedId === tx.id ? (
                        <Check className="w-3 h-3 text-[#00C853]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                    <Clock className="w-2.5 h-2.5" />
                    <span>
                      {new Date(tx.date).toLocaleString('bn-BD', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transaction Details Receipt Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#071A35] border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-['Poppins',sans-serif] font-bold text-sm sm:text-base text-white">
                    লেনদেনের বিস্তারিত রসিদ
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ID: #{selectedTx.id}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Status Hero Card */}
            <div
              className={`p-4 rounded-2xl border text-center space-y-1.5 ${
                selectedTx.status === 'completed'
                  ? 'bg-[#00C853]/15 border-[#00C853]/40 text-[#00C853]'
                  : selectedTx.status === 'failed'
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                  : 'bg-[#FFC107]/15 border-[#FFC107]/40 text-[#FFC107]'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-bold text-xs">
                {selectedTx.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                {selectedTx.status === 'pending' && <Clock className="w-4 h-4 animate-spin" />}
                {selectedTx.status === 'failed' && <XCircle className="w-4 h-4" />}
                <span className="uppercase tracking-wider">
                  {selectedTx.status === 'completed'
                    ? 'লেনদেন সফল (Completed)'
                    : selectedTx.status === 'pending'
                    ? 'প্রক্রিয়াধীন (Pending Approval)'
                    : 'লেনদেন বাতিল (Failed / Rejected)'}
                </span>
              </div>
              <div className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-black text-white">
                {selectedTx.type === 'deposit' ? `+৳${selectedTx.amount}` : `-৳${selectedTx.amount}`}
              </div>
              <p className="text-[11px] text-slate-300">
                {selectedTx.type === 'deposit'
                  ? 'অ্যাকাউন্ট ভেরিফিকেশন ডিপোজিট ফি'
                  : `মোবাইল ব্যাংকিং উত্তোলন (${selectedTx.accountType || 'personal'})`}
              </p>
            </div>

            {/* Transaction Key Details Breakdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs">
              {/* Payment Method */}
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">পেমেন্ট গেটওয়ে:</span>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <PaymentMethodLogo method={selectedTx.method} size={20} rounded="rounded-md" />
                  <span>{getMethodName(selectedTx.method)}</span>
                </div>
              </div>

              {/* TrxID */}
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">ট্রানজেকশন আইডি (TrxID):</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                    {selectedTx.trxId || selectedTx.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedTx.trxId || selectedTx.id, 'modal-trx')}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                    title="কপি করুন"
                  >
                    {copiedId === 'modal-trx' ? (
                      <Check className="w-3.5 h-3.5 text-[#00C853]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">
                  {selectedTx.type === 'deposit' ? 'প্রেরক মোবাইল নম্বর:' : 'উত্তোলন মোবাইল নম্বর:'}
                </span>
                <span className="font-mono font-bold text-white">{selectedTx.accountNumber}</span>
              </div>

              {/* Admin Receiver Number for deposits */}
              {selectedTx.adminNumber && (
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">অফিসিয়াল রিসিভার নম্বর:</span>
                  <span className="font-mono font-bold text-[#FFC107]">
                    {selectedTx.adminNumber}
                  </span>
                </div>
              )}

              {/* Fee & Net Amount */}
              {selectedTx.fee !== undefined && selectedTx.fee > 0 && (
                <>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">সার্ভিস চার্জ (২%):</span>
                    <span className="font-mono text-slate-300">৳{selectedTx.fee}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">প্রাপ্য নেট পরিমাণ:</span>
                    <span className="font-mono font-bold text-[#00C853]">
                      ৳{selectedTx.netAmount}
                    </span>
                  </div>
                </>
              )}

              {/* Submission Date */}
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">আবেদনের সময়:</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {new Date(selectedTx.date).toLocaleString('bn-BD', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>

              {/* Processed Date */}
              {selectedTx.processedAt && (
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">সম্পন্ন হওয়ার সময়:</span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {new Date(selectedTx.processedAt).toLocaleString('bn-BD', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              )}

              {/* Admin TrxID for completed withdrawals */}
              {selectedTx.adminTrxId && (
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">এডমিন পেমেন্ট TrxID:</span>
                  <span className="font-mono font-bold text-[#00C853]">
                    {selectedTx.adminTrxId}
                  </span>
                </div>
              )}

              {/* Rejection reason if failed */}
              {selectedTx.note && (
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> বাতিলের কারণ:
                  </span>
                  <span>{selectedTx.note}</span>
                </div>
              )}
            </div>

            {/* Help / Support Link */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00C853]" />
                <span>কোনো সমস্যা হলে টেলিগ্রামে যোগাযোগ করুন</span>
              </div>
              <a
                href={settings.telegramSupportLink || 'https://t.me/baizearn_support'}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-[#1769E0] hover:bg-[#1557b0] text-white font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>সাপোর্ট</span>
              </a>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTx(null)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all"
            >
              বন্ধ করুন (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
