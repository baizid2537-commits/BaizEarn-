import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  CheckCircle2,
  Clock,
  Wallet,
  Settings,
  Plus,
  Trash2,
  Eye,
  Check,
  X,
  Search,
  DollarSign,
  Phone,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
  Crown,
  Briefcase,
  Zap,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, TaskCategory } from '../../types';
import { TASK_CATEGORIES_CONFIG, RANK_TIERS, SALARY_TIERS } from '../../utils/rankAndReferral';
import { BAIZEARN_LOGO } from '../../assets/logo';
import { PaymentMethodLogo } from '../common/PaymentLogos';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    tasks,
    verifications,
    withdrawals,
    settings,
    adminApproveVerification,
    adminRejectVerification,
    adminApproveWithdrawal,
    adminRejectWithdrawal,
    adminUpdateSettings,
    adminToggleUserStatus,
    adminAdjustUserBalance,
    adminAddTask,
    adminDeleteTask,
    adminResetUserSpinTimer,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<'verifications' | 'withdrawals' | 'tasks' | 'users' | 'settings'>('verifications');
  
  // Verification filter
  const [verifFilter, setVerifFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');

  // Withdrawal modal / inputs
  const [adminTrxInput, setAdminTrxInput] = useState<{ [id: string]: string }>({});

  // New Task Form
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>('video');
  const [newTaskReward, setNewTaskReward] = useState('25');
  const [newTaskPoints, setNewTaskPoints] = useState('30');
  const [newTaskDuration, setNewTaskDuration] = useState('30');
  const [newTaskSubmissionType, setNewTaskSubmissionType] = useState<'none' | 'credentials' | 'text'>('none');
  const [newTaskRequiresVerified, setNewTaskRequiresVerified] = useState(false);

  // User search & balance edit
  const [userSearch, setUserSearch] = useState('');
  const [balanceAdjustAmount, setBalanceAdjustAmount] = useState<{ [userId: string]: string }>({});

  // System Settings state
  const [editAdminPhone, setEditAdminPhone] = useState(settings.adminPhone);
  const [editVerifFeeBDT, setEditVerifFeeBDT] = useState(String(settings.verificationFeeBDT));
  const [editVerifFeeUSD, setEditVerifFeeUSD] = useState(String(settings.verificationFeeUSD));
  const [editRefL1, setEditRefL1] = useState(String(settings.referralLevelBonuses?.[0] || 200));
  const [editRefL2, setEditRefL2] = useState(String(settings.referralLevelBonuses?.[1] || 50));
  const [editRefL3, setEditRefL3] = useState(String(settings.referralLevelBonuses?.[2] || 20));
  const [editRefL4, setEditRefL4] = useState(String(settings.referralLevelBonuses?.[3] || 10));
  const [editRefL5, setEditRefL5] = useState(String(settings.referralLevelBonuses?.[4] || 5));
  const [editNotice, setEditNotice] = useState(settings.noticeMessage);
  const [editTelegram, setEditTelegram] = useState(settings.telegramSupportLink);
  const [editSpinRewards, setEditSpinRewards] = useState(
    (settings.spinAllowedRewards || [1, 2]).join(', ')
  );
  const [editSpinMaxReward, setEditSpinMaxReward] = useState(
    String(settings.spinMaxReward || 2)
  );
  const [editSpinCooldown, setEditSpinCooldown] = useState(
    String(settings.spinCooldownHours || 24)
  );

  // Statistics
  const pendingVerifs = verifications.filter((v) => v.status === 'pending');
  const pendingWds = withdrawals.filter((w) => w.status === 'pending');
  const verifiedUsersCount = users.filter((u) => u.accountStatus === 'verified').length;
  const totalPayout = withdrawals.filter((w) => w.status === 'approved').reduce((acc, curr) => acc + curr.amount, 0);

  const filteredVerifications = verifications.filter((v) => {
    if (verifFilter === 'all') return true;
    return v.status === verifFilter;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedRewards = editSpinRewards
      .split(',')
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n) && n > 0);

    const l1 = Number(editRefL1) || 200;
    const l2 = Number(editRefL2) || 50;
    const l3 = Number(editRefL3) || 20;
    const l4 = Number(editRefL4) || 10;
    const l5 = Number(editRefL5) || 5;

    adminUpdateSettings({
      adminPhone: editAdminPhone.trim(),
      verificationFeeBDT: Number(editVerifFeeBDT) || 600,
      verificationFeeUSD: Number(editVerifFeeUSD) || 5,
      referralBonus: l1,
      referralLevelBonuses: [l1, l2, l3, l4, l5],
      noticeMessage: editNotice.trim(),
      telegramSupportLink: editTelegram.trim(),
      spinAllowedRewards: parsedRewards.length > 0 ? parsedRewards : [1, 2],
      spinMaxReward: Number(editSpinMaxReward) || 2,
      spinCooldownHours: Number(editSpinCooldown) || 24,
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskReward) {
      showToast('টাস্কের নাম এবং রিওয়ার্ড প্রদান করুন!', 'error');
      return;
    }

    adminAddTask({
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'টাস্কটি মনোযোগ দিয়ে সম্পন্ন করে রিওয়ার্ড ও পয়েন্ট অর্জন করুন।',
      category: newTaskCategory,
      reward: Number(newTaskReward) || 25,
      pointsReward: Number(newTaskPoints) || 30,
      durationSeconds: Number(newTaskDuration) || 30,
      requiresVerified: newTaskRequiresVerified,
      submissionType: newTaskSubmissionType,
      maxDaily: 10,
      icon: 'Zap',
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    showToast('নতুন মাইক্রো-টাস্ক সফলভাবে পাবলিশ হয়েছে!', 'success');
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-br from-[#0b2245] via-[#071A35] to-[#040e1e] border border-[#FFC107]/40 rounded-3xl p-5 shadow-xl text-white relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-[#1769E0]/40 border border-[#FFC107]/50 bg-[#071A35] flex items-center justify-center p-0.5 shrink-0">
              <img
                src={BAIZEARN_LOGO}
                alt="BaizEarn Logo"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-['Poppins',sans-serif] text-lg font-extrabold text-white flex items-center gap-2">
                <span>Baiz<span className="text-[#00C853]">Earn</span> সুপার এডমিন কন্ট্রোল</span>
                <span className="px-2 py-0.2 rounded bg-[#00C853]/20 text-[#00C853] text-[10px] font-mono border border-[#00C853]/30">
                  Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                ৫-লেভেল রেফারেল কমিশন, মাসিক বেতন, মাইক্রো-টাস্ক ও ২৪-ঘণ্টা লাকি স্পিন কন্ট্রোল
              </p>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="p-2.5 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">পেন্ডিং ভেরিফাই (৳৬০০)</span>
            <div className="font-['Poppins',sans-serif] text-xl font-black text-[#FFC107] mt-0.5">
              {pendingVerifs.length}টি
            </div>
          </div>

          <div className="p-2.5 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">পেন্ডিং উইথড্রয়াল</span>
            <div className="font-['Poppins',sans-serif] text-xl font-black text-[#00C853] mt-0.5">
              {pendingWds.length}টি
            </div>
          </div>

          <div className="p-2.5 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">ভেরিফাইড ইউজার</span>
            <div className="font-['Poppins',sans-serif] text-xl font-black text-white mt-0.5">
              {verifiedUsersCount} জন
            </div>
          </div>

          <div className="p-2.5 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">মোট পেআউট</span>
            <div className="font-['Poppins',sans-serif] text-xl font-black text-slate-300 mt-0.5">
              ৳ {totalPayout}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'verifications', label: `ভেরিফিকেশন অনুমোদন (${pendingVerifs.length})` },
          { id: 'withdrawals', label: `উইথড্রয়াল রিকোয়েস্ট (${pendingWds.length})` },
          { id: 'tasks', label: `টাস্ক ক্রিয়েটর ও ম্যানেজার (${tasks.length})` },
          { id: 'users', label: `ইউজার তালিকা ও ব্যালেন্স (${users.length})` },
          { id: 'settings', label: '৫-লেভেল রেফারেল ও সিস্টেম সেটিংস' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              adminTab === tab.id
                ? 'bg-[#1769E0] text-white shadow-md shadow-[#1769E0]/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: VERIFICATION REQUESTS MANAGER */}
      {adminTab === 'verifications' && (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-['Poppins',sans-serif] text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                <span>৳৬০০ ভেরিফিকেশন পেমেন্ট অনুমোদন</span>
              </h3>
              <p className="text-xs text-slate-400">
                অনুমোদনের সাথে সাথে ৫-লেভেল রেফারেল কমিশন স্বয়ংক্রিয়ভাবে বণ্টন হবে।
              </p>
            </div>

            {/* Filter */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
              {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setVerifFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-colors ${
                    verifFilter === f ? 'bg-[#1769E0] text-white' : 'text-slate-400'
                  }`}
                >
                  {f === 'pending' ? 'পেন্ডিং' : f === 'approved' ? 'অনুমোদিত' : f === 'rejected' ? 'বাতিল' : 'সব'}
                </button>
              ))}
            </div>
          </div>

          {filteredVerifications.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              কোনো ভেরিফিকেশন আবেদন পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-3">
              {filteredVerifications.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#071A35] border border-white/10 rounded-2xl p-4 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <div>
                      <span className="font-bold text-white text-sm">{req.userName}</span>
                      <div className="text-slate-400 text-[11px] font-mono">{req.userEmail}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/10 text-white font-mono uppercase font-bold text-[10px]">
                        <PaymentMethodLogo method={req.paymentMethod} size={16} rounded="rounded-sm" />
                        <span>{req.paymentMethod}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'approved'
                            ? 'bg-[#00C853]/20 text-[#00C853]'
                            : req.status === 'rejected'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-[#FFC107]/20 text-[#FFC107]'
                        }`}
                      >
                        {req.status === 'approved' ? 'অনুমোদিত' : req.status === 'rejected' ? 'বাতিল' : 'পেন্ডিং'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                    <div>
                      <span className="text-slate-400 block">প্রেরক নম্বর:</span>
                      <strong className="font-mono text-white">{req.senderNumber}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">ট্রানজেকশন ID:</span>
                      <strong className="font-mono text-[#FFC107] font-bold text-xs">
                        {req.transactionId}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">পরিমাণ:</span>
                      <strong className="text-[#00C853]">৳{req.amountBDT} ($5)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">সময়:</span>
                      <span>{new Date(req.submittedAt).toLocaleTimeString('bn-BD')}</span>
                    </div>
                  </div>

                  {req.status === 'pending' && (
                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => adminApproveVerification(req.id)}
                        className="flex-1 py-2 bg-[#00C853] hover:bg-[#00a846] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-[#00C853]/20"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>অনুমোদন ও ৫-লেভেল বোনাস পাঠান</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => adminRejectVerification(req.id)}
                        className="px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-xl"
                      >
                        বাতিল
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WITHDRAWAL REQUESTS MANAGER */}
      {adminTab === 'withdrawals' && (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Poppins',sans-serif] text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#FFC107]" />
              <span>টাকা উত্তোলনের আবেদনসমূহ</span>
            </h3>
            <span className="text-xs text-slate-400">{withdrawals.length}টি মোট আবেদন</span>
          </div>

          {withdrawals.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              কোনো উত্তোলনের আবেদন জমা নেই।
            </div>
          ) : (
            <div className="space-y-3">
              {withdrawals.map((wd) => (
                <div
                  key={wd.id}
                  className="bg-[#071A35] border border-white/10 rounded-2xl p-4 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <div>
                      <span className="font-bold text-white text-sm">{wd.userName}</span>
                      <div className="text-slate-400 text-[11px] font-mono">{wd.userEmail}</div>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        wd.status === 'approved'
                          ? 'bg-[#00C853]/20 text-[#00C853]'
                          : wd.status === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-[#FFC107]/20 text-[#FFC107]'
                      }`}
                    >
                      {wd.status === 'approved' ? 'পেইড / সম্পন্ন' : wd.status === 'rejected' ? 'বাতিল' : 'পেন্ডিং'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                    <div>
                      <span className="text-slate-400 block">মাধ্যম ও হিসাব:</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <PaymentMethodLogo method={wd.method} size={16} rounded="rounded-sm" />
                        <strong className="capitalize text-white font-mono">
                          {wd.method === 'bkash' ? 'বিকাশ' : wd.method === 'nagad' ? 'নগদ' : 'রকেট'} ({wd.accountType})
                        </strong>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 block">গ্রাহকের মোবাইল:</span>
                      <strong className="font-mono text-[#FFC107] text-xs">{wd.accountNumber}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">টাকার পরিমাণ:</span>
                      <strong className="text-[#00C853] text-sm">৳{wd.amount}</strong>
                      <span className="text-[9px] text-slate-400 block">(চার্জ কর্তন শেষে: ৳{wd.netAmount})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">তারিখ:</span>
                      <span>{new Date(wd.requestedAt).toLocaleTimeString('bn-BD')}</span>
                    </div>
                  </div>

                  {wd.status === 'pending' && (
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="টাকা পাঠানোর TrxID দিন (যেমন: TRX99201948)"
                          value={adminTrxInput[wd.id] || ''}
                          onChange={(e) =>
                            setAdminTrxInput((prev) => ({ ...prev, [wd.id]: e.target.value }))
                          }
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const trx = adminTrxInput[wd.id] || `TRX${Math.floor(10000000 + Math.random() * 90000000)}`;
                            adminApproveWithdrawal(wd.id, trx);
                          }}
                          className="px-4 py-2 bg-[#00C853] hover:bg-[#00a846] text-white font-bold text-xs rounded-xl shadow-md"
                        >
                          পেমেন্ট অ্যাপ্রুভ
                        </button>
                        <button
                          type="button"
                          onClick={() => adminRejectWithdrawal(wd.id)}
                          className="px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-xs rounded-xl"
                        >
                          বাতিল
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TASK CREATOR & MANAGER */}
      {adminTab === 'tasks' && (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-6">
          {/* Create Task Form */}
          <div className="bg-[#071A35] border border-white/10 rounded-2xl p-4 space-y-4">
            <h4 className="font-['Poppins',sans-serif] text-sm font-bold text-white flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#00C853]" />
              <span>নতুন মাইক্রো-টাস্ক তৈরি করুন (Micro-Jobs)</span>
            </h4>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">টাস্কের শিরোনাম *</label>
                  <input
                    type="text"
                    placeholder="যেমন: ফ্রেশ জিমেইল একাউন্ট বিক্রি / সাবমিট"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as TaskCategory)}
                    className="w-full bg-[#071A35] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="video">ভিডিও দেখা (Video Watch)</option>
                    <option value="signup">একাউন্ট তৈরি করা (Sign up / Register)</option>
                    <option value="gmail_sell">জিমেইল অ্যাকাউন্ট বিক্রি (Gmail Sell)</option>
                    <option value="facebook_sell">ফেসবুক অ্যাকাউন্ট বিক্রি (Facebook Sell)</option>
                    <option value="twitter_sell">টুইটার (X) অ্যাকাউন্ট বিক্রি (Twitter Sell)</option>
                    <option value="telegram_sell">টেলিগ্রাম একাউন্ট বিক্রি (Telegram Sell)</option>
                    <option value="whatsapp_sell">হোয়াটসঅ্যাপ একাউন্ট বিক্রি (WhatsApp Sell)</option>
                    <option value="product_sell">প্রোডাক্ট বিক্রি (Product Affiliate / Sell)</option>
                    <option value="social">সোশ্যাল মিডিয়া ফলো ও শেয়ার (Social)</option>
                    <option value="app">অ্যাপ ডাউনলোড ও রিভিউ (App)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">ক্যাশ রিওয়ার্ড (৳) *</label>
                  <input
                    type="number"
                    value={newTaskReward}
                    onChange={(e) => setNewTaskReward(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold text-[#00C853]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">র্যাংক পয়েন্ট (+Points)</label>
                  <input
                    type="number"
                    value={newTaskPoints}
                    onChange={(e) => setNewTaskPoints(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold text-[#FFC107]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">সময়কাল (সেকেন্ড)</label>
                  <input
                    type="number"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">সাবমিশন ফরম্যাট</label>
                  <select
                    value={newTaskSubmissionType}
                    onChange={(e) => setNewTaskSubmissionType(e.target.value as any)}
                    className="w-full bg-[#071A35] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="none">স্বয়ংক্রিয় টাইমার (None)</option>
                    <option value="credentials">অ্যাকাউন্ট পাসওয়ার্ড/তথ্য (Credentials)</option>
                    <option value="text">টেক্সট / ইউজার আইডি (Text)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">কাজের বর্ণনা ও নিয়ম</label>
                <textarea
                  rows={2}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="ব্যবহারকারীকে কী কী পদক্ষেপ নিতে হবে তা লিখে দিন..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={newTaskRequiresVerified}
                    onChange={(e) => setNewTaskRequiresVerified(e.target.checked)}
                    className="text-[#1769E0]"
                  />
                  <span>শুধুমাত্র ভেরিফাইড প্রো ইউজারদের জন্য</span>
                </label>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1769E0] hover:bg-[#1255b8] text-white font-bold text-xs rounded-xl shadow-md"
                >
                  টাস্ক পাবলিশ করুন
                </button>
              </div>
            </form>
          </div>

          {/* Active Tasks List */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider">
              বর্তমান সক্রিয় টাস্কসমূহ ({tasks.length}টি)
            </h4>

            <div className="space-y-2">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#071A35] border border-white/5 rounded-2xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{t.title}</span>
                      <span className="px-1.5 py-0.2 rounded bg-white/10 text-slate-300 text-[9px]">
                        {TASK_CATEGORIES_CONFIG.find((c) => c.key === t.category)?.nameBn || t.category}
                      </span>
                      {t.requiresVerified && (
                        <span className="px-1.5 py-0.2 rounded bg-[#FFC107]/20 text-[#FFC107] text-[10px]">
                          ভেরিফাইড
                        </span>
                      )}
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      রিওয়ার্ড: <strong className="text-[#00C853]">৳{t.reward}</strong> • পয়েন্ট: <strong className="text-[#FFC107]">+{t.pointsReward || 25}</strong> • সময়: {t.durationSeconds}s
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => adminDeleteTask(t.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: USER MANAGEMENT */}
      {adminTab === 'users' && (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-['Poppins',sans-serif] text-base font-bold text-white">
              ব্যবহারকারী ব্যবস্থাপনা ও র্যাংক ({users.length} জন)
            </h3>

            {/* Search */}
            <div className="relative max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ইউজার বা ইমেইল খুঁজুন..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white outline-none w-full"
              />
            </div>
          </div>

          <div className="space-y-3">
            {users
              .filter(
                (u) =>
                  u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
                  u.email.toLowerCase().includes(userSearch.toLowerCase())
              )
              .map((u) => (
                <div
                  key={u.id}
                  className="bg-[#071A35] border border-white/10 rounded-2xl p-4 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{u.firstName} {u.lastName}</span>
                        <span className="font-mono text-xs text-slate-400">(@{u.username})</span>
                        <span className="px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                          {RANK_TIERS.find((r) => r.id === u.rank)?.nameBn || 'ব্রোঞ্জ'}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px]">{u.email} {u.phone ? `• ${u.phone}` : ''}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.accountStatus === 'verified'
                            ? 'bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/30'
                            : u.accountStatus === 'blocked'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-slate-500/20 text-slate-300'
                        }`}
                      >
                        {u.accountStatus === 'verified' ? 'ভেরিফাইড প্রো' : u.accountStatus === 'blocked' ? 'স্থগিত' : 'সাধারণ'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-black/20 p-2.5 rounded-xl">
                    <div>
                      <span className="text-slate-400">ব্যালেন্স:</span>
                      <strong className="text-[#00C853] block text-xs">৳{u.balance}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">র্যাংক পয়েন্ট:</span>
                      <strong className="text-[#FFC107] block text-xs">{u.points || 0} pts</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">রেফার সংখ্যা:</span>
                      <strong className="text-white block text-xs">{u.referralCount || 0} জন</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">রেফারেল আয়:</span>
                      <strong className="text-white block text-xs">৳{u.referralEarnings || 0}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() =>
                        adminToggleUserStatus(u.id, u.accountStatus === 'verified' ? 'regular' : 'verified')
                      }
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-lg"
                    >
                      {u.accountStatus === 'verified' ? 'আন-ভেরিফাই করুন' : 'সরাসরি ভেরিফাই'}
                    </button>

                    <button
                      type="button"
                      onClick={() => adminAdjustUserBalance(u.id, 100)}
                      className="px-3 py-1.5 bg-[#00C853]/15 text-[#00C853] text-[11px] font-bold rounded-lg"
                    >
                      +৳১০০ যোগ
                    </button>

                    <button
                      type="button"
                      onClick={() => adminAdjustUserBalance(u.id, -100)}
                      className="px-3 py-1.5 bg-rose-500/15 text-rose-300 text-[11px] font-bold rounded-lg"
                    >
                      -৳১০০ কর্তন
                    </button>

                    <button
                      type="button"
                      onClick={() => adminResetUserSpinTimer(u.id)}
                      className="px-3 py-1.5 bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 text-[11px] font-bold rounded-lg border border-sky-500/30"
                    >
                      স্পিন রিসেট (২৪h)
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM SETTINGS & 5-LEVEL COMMISSIONS */}
      {adminTab === 'settings' && (
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 space-y-4">
          <h3 className="font-['Poppins',sans-serif] text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#1769E0]" />
            <span>৫-লেভেল রেফারেল, মাসিক বেতন ও সিস্টেম পলিসি</span>
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            {/* Official Phone */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                অফিসিয়াল বিকাশ / নগদ / রকেট ও হেল্পলাইন নম্বর *
              </label>
              <input
                type="text"
                value={editAdminPhone}
                onChange={(e) => setEditAdminPhone(e.target.value)}
                className="w-full bg-[#071A35] border border-white/10 focus:border-[#00C853] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#FFC107] font-mono font-bold outline-none"
                required
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                এই নম্বরে ব্যবহারকারীরা একাউন্ট ভেরিফাই করতে ৳৬০০ সেন্ড মানি করবে।
              </span>
            </div>

            {/* Verification Fee */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  ভেরিফিকেশন ফি (টাকায় ৳)
                </label>
                <input
                  type="number"
                  value={editVerifFeeBDT}
                  onChange={(e) => setEditVerifFeeBDT(e.target.value)}
                  className="w-full bg-[#071A35] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  ভেরিফিকেশন ফি (ডলারে $)
                </label>
                <input
                  type="number"
                  value={editVerifFeeUSD}
                  onChange={(e) => setEditVerifFeeUSD(e.target.value)}
                  className="w-full bg-[#071A35] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            {/* 5-Level Referral Breakdown Settings */}
            <div className="p-4 bg-[#1769E0]/5 border border-[#1769E0]/20 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#60a5fa] flex items-center gap-1.5 text-xs">
                  <Layers className="w-4 h-4" /> ৫-লেভেল রেফারেল কমিশন পলিসি (প্রতি ভেরিফায়েড রেফারেল)
                </span>
                <span className="text-[10px] bg-[#1769E0]/20 text-[#60a5fa] font-mono px-2 py-0.5 rounded font-bold">
                  মোট: ৳{Number(editRefL1) + Number(editRefL2) + Number(editRefL3) + Number(editRefL4) + Number(editRefL5)}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">১ম লেভেল (L1)</label>
                  <input
                    type="number"
                    value={editRefL1}
                    onChange={(e) => setEditRefL1(e.target.value)}
                    className="w-full bg-[#071A35] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-[#00C853] font-bold outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block mt-0.5">৳২০০</span>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">২য় লেভেল (L2)</label>
                  <input
                    type="number"
                    value={editRefL2}
                    onChange={(e) => setEditRefL2(e.target.value)}
                    className="w-full bg-[#071A35] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-[#00C853] font-bold outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block mt-0.5">৳৫০</span>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">৩য় লেভেল (L3)</label>
                  <input
                    type="number"
                    value={editRefL3}
                    onChange={(e) => setEditRefL3(e.target.value)}
                    className="w-full bg-[#071A35] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-[#00C853] font-bold outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block mt-0.5">৳২০</span>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">৪র্থ লেভেল (L4)</label>
                  <input
                    type="number"
                    value={editRefL4}
                    onChange={(e) => setEditRefL4(e.target.value)}
                    className="w-full bg-[#071A35] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-[#00C853] font-bold outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block mt-0.5">৳১০</span>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">৫ম লেভেল (L5)</label>
                  <input
                    type="number"
                    value={editRefL5}
                    onChange={(e) => setEditRefL5(e.target.value)}
                    className="w-full bg-[#071A35] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-[#00C853] font-bold outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block mt-0.5">৳৫</span>
                </div>
              </div>
            </div>

            {/* LUCKY SPIN CONTROLS */}
            <div className="p-4 bg-[#FFC107]/5 border border-[#FFC107]/20 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFC107] flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4" /> লাকি স্পিন রিওয়ার্ড ও ২৪ ঘণ্টার বিরতি কন্ট্রোল
                </span>
                <span className="text-[10px] bg-[#FFC107]/20 text-[#FFC107] font-mono px-2 py-0.5 rounded font-bold">
                  24h Lock Active
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                চরকা বা হুইলে ৫০ টাকা পর্যন্ত বড় সংখ্যায় প্রদর্শিত থাকবে কিন্তু ইউজাররা ২৪ ঘন্টায় একবার ঘুরিয়ে শুধুমাত্র নির্ধারিত ১ টাকা অথবা ২ টাকায় এসে পড়বে।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    অনুমোদিত ল্যান্ডিং রিওয়ার্ডসমূহ
                  </label>
                  <input
                    type="text"
                    value={editSpinRewards}
                    onChange={(e) => setEditSpinRewards(e.target.value)}
                    placeholder="1, 2"
                    className="w-full bg-[#071A35] border border-white/10 focus:border-[#FFC107] rounded-xl px-3 py-2 text-xs text-white font-mono font-bold outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">যেমন: 1, 2 (৳১ ও ৳২)</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    সর্বোচ্চ রিওয়ার্ড ক্যাপ (টাকা ৳)
                  </label>
                  <input
                    type="number"
                    value={editSpinMaxReward}
                    onChange={(e) => setEditSpinMaxReward(e.target.value)}
                    className="w-full bg-[#071A35] border border-white/10 focus:border-[#FFC107] rounded-xl px-3 py-2 text-xs text-white font-mono font-bold outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">ডিফল্ট: ২ টাকা (এর বেশি পাবে না)</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    স্পিন বিরতি / কুলডাউন (ঘণ্টা)
                  </label>
                  <input
                    type="number"
                    value={editSpinCooldown}
                    onChange={(e) => setEditSpinCooldown(e.target.value)}
                    className="w-full bg-[#071A35] border border-white/10 focus:border-[#FFC107] rounded-xl px-3 py-2 text-xs text-white font-mono font-bold outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">ডিফল্ট: ২৪ ঘণ্টা পর পর</span>
                </div>
              </div>
            </div>

            {/* Notice Marquee */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                অ্যাপের নোটিশ বোর্ড স্ক্রলার বার্তা
              </label>
              <textarea
                rows={2}
                value={editNotice}
                onChange={(e) => setEditNotice(e.target.value)}
                className="w-full bg-[#071A35] border border-white/10 rounded-xl p-3 text-xs text-white outline-none resize-none"
              />
            </div>

            {/* Telegram Link */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                টেলিগ্রাম অফিসিয়াল সাপোর্ট লিংক
              </label>
              <input
                type="url"
                value={editTelegram}
                onChange={(e) => setEditTelegram(e.target.value)}
                className="w-full bg-[#071A35] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00C853] hover:bg-[#00b048] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>সেটিংস ও ৫-লেভেল রেফারেল পলিসি সংরক্ষণ করুন</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
