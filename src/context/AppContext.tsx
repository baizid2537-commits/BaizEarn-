import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Task,
  UserTaskHistory,
  VerificationRequest,
  WithdrawalRequest,
  Transaction,
  SystemSettings,
  ActiveTab,
  PaymentMethod,
  UserRank
} from '../types';
import {
  initialUsers,
  initialTasks,
  initialVerificationRequests,
  initialWithdrawals,
  initialTransactions,
  initialSettings
} from '../data/mockData';
import {
  calculateRankFromPoints,
  getRankInfo,
  calculateEligibleSalary
} from '../utils/rankAndReferral';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  taskHistories: UserTaskHistory[];
  verifications: VerificationRequest[];
  withdrawals: WithdrawalRequest[];
  transactions: Transaction[];
  settings: SystemSettings;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  viewMode: 'mobile_frame' | 'responsive';
  setViewMode: (mode: 'mobile_frame' | 'responsive') => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  login: (identifier: string, pass: string) => { success: boolean; message: string };
  socialLogin: (provider: 'google' | 'facebook') => void;
  register: (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone?: string;
    password: string;
    referralCode?: string;
  }) => { success: boolean; message: string };
  logout: () => void;
  submitVerification: (data: {
    method: PaymentMethod;
    senderNumber: string;
    trxId: string;
    amount: number;
  }) => { success: boolean; message: string };
  submitWithdrawal: (data: {
    method: PaymentMethod;
    accountNumber: string;
    accountType: 'personal' | 'agent';
    amount: number;
  }) => { success: boolean; message: string };
  completeTask: (taskId: string, submissionData?: string) => { success: boolean; message: string };
  claimDailySpin: (reward: number) => { success: boolean; reward?: number; message?: string };
  claimMonthlySalary: () => { success: boolean; message: string; amount?: number };
  adminApproveVerification: (requestId: string) => void;
  adminRejectVerification: (requestId: string, reason?: string) => void;
  adminApproveWithdrawal: (requestId: string, adminTrxId: string) => void;
  adminRejectWithdrawal: (requestId: string, reason?: string) => void;
  adminUpdateSettings: (newSettings: Partial<SystemSettings>) => void;
  adminToggleUserStatus: (userId: string, newStatus: 'regular' | 'verified' | 'blocked') => void;
  adminAdjustUserBalance: (userId: string, amount: number) => void;
  adminAddTask: (task: Omit<Task, 'id'>) => void;
  adminDeleteTask: (taskId: string) => void;
  adminResetUserSpinTimer: (userId: string) => void;
  switchUserRole: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or defaults
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('baizearn_users');
    if (saved) {
      try {
        const parsed: User[] = JSON.parse(saved);
        return parsed.map((u) => ({
          ...u,
          points: u.points !== undefined ? u.points : (u.accountStatus === 'verified' ? 1250 : 250),
          rank: u.rank || calculateRankFromPoints(u.points || 0),
          levelReferrals: u.levelReferrals || {
            level1: u.referralCount || 0,
            level2: Math.floor((u.referralCount || 0) * 1.5),
            level3: Math.floor((u.referralCount || 0) * 2.2),
            level4: Math.floor((u.referralCount || 0) * 3),
            level5: Math.floor((u.referralCount || 0) * 4),
          },
          levelEarnings: u.levelEarnings || {
            level1: (u.referralCount || 0) * 200,
            level2: Math.floor((u.referralCount || 0) * 1.5) * 50,
            level3: Math.floor((u.referralCount || 0) * 2.2) * 20,
            level4: Math.floor((u.referralCount || 0) * 3) * 10,
            level5: Math.floor((u.referralCount || 0) * 4) * 5,
          },
        }));
      } catch {
        return initialUsers;
      }
    }
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedId = localStorage.getItem('baizearn_current_user_id');
    if (savedId) {
      const savedUsers = localStorage.getItem('baizearn_users');
      const list: User[] = savedUsers ? JSON.parse(savedUsers) : initialUsers;
      const found = list.find((u) => u.id === savedId);
      if (found) return found;
    }
    // Default to Sabbir (Regular user) for clear demo of verification & earning flows
    return initialUsers[1];
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('baizearn_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [taskHistories, setTaskHistories] = useState<UserTaskHistory[]>(() => {
    const saved = localStorage.getItem('baizearn_task_histories');
    return saved ? JSON.parse(saved) : [];
  });

  const [verifications, setVerifications] = useState<VerificationRequest[]>(() => {
    const saved = localStorage.getItem('baizearn_verifications');
    return saved ? JSON.parse(saved) : initialVerificationRequests;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('baizearn_withdrawals');
    return saved ? JSON.parse(saved) : initialWithdrawals;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('baizearn_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('baizearn_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...initialSettings,
        ...parsed,
        referralBonus: parsed.referralBonus || 200,
        referralLevelBonuses: parsed.referralLevelBonuses || [200, 50, 20, 10, 5],
        spinAllowedRewards: parsed.spinAllowedRewards || [1, 2],
        spinMaxReward: parsed.spinMaxReward || 2,
        spinCooldownHours: parsed.spinCooldownHours || 24,
        salaryMinimumReferrals: parsed.salaryMinimumReferrals || 100,
      };
    }
    return initialSettings;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [viewMode, setViewMode] = useState<'mobile_frame' | 'responsive'>('mobile_frame');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('baizearn_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('baizearn_current_user_id', currentUser.id);
      const fresh = users.find((u) => u.id === currentUser.id);
      if (fresh && JSON.stringify(fresh) !== JSON.stringify(currentUser)) {
        setCurrentUser(fresh);
      }
    } else {
      localStorage.removeItem('baizearn_current_user_id');
    }
  }, [users, currentUser]);

  useEffect(() => {
    localStorage.setItem('baizearn_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('baizearn_task_histories', JSON.stringify(taskHistories));
  }, [taskHistories]);

  useEffect(() => {
    localStorage.setItem('baizearn_verifications', JSON.stringify(verifications));
  }, [verifications]);

  useEffect(() => {
    localStorage.setItem('baizearn_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('baizearn_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('baizearn_settings', JSON.stringify(settings));
  }, [settings]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Login handler
  const login = (identifier: string, pass: string) => {
    const trimmed = identifier.trim().toLowerCase();
    const user = users.find(
      (u) => (u.username.toLowerCase() === trimmed || u.email.toLowerCase() === trimmed) && u.password === pass
    );

    if (!user) {
      return { success: false, message: 'ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়!' };
    }

    if (user.accountStatus === 'blocked') {
      return { success: false, message: 'আপনার অ্যাকাউন্টটি স্থগিত করা হয়েছে। এডমিনের সাথে যোগাযোগ করুন।' };
    }

    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(`স্বাগতম, ${user.firstName}! আপনি সফলভাবে লগইন করেছেন।`, 'success');
    return { success: true, message: 'লগইন সফল হয়েছে' };
  };

  // Social Login
  const socialLogin = (provider: 'google' | 'facebook') => {
    const existing = users.find((u) => u.email === 'baizid2537@gmail.com');
    if (existing) {
      setCurrentUser(existing);
      setAuthModalOpen(false);
      showToast(`${provider === 'google' ? 'Google' : 'Facebook'} দিয়ে সফলভাবে লগইন করা হয়েছে!`, 'success');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: provider === 'google' ? 'গুগল' : 'ফেসবুক',
      lastName: 'ইউজার',
      username: `${provider}_user_${Math.floor(1000 + Math.random() * 9000)}`,
      email: `${provider}.user@baizearn.com`,
      accountStatus: 'regular',
      balance: 15,
      todayEarnings: 15,
      totalEarned: 15,
      totalWithdrawn: 0,
      points: 20,
      rank: 'bronze',
      referralCode: `BZ${Math.floor(100000 + Math.random() * 900000)}`,
      referralCount: 0,
      referralEarnings: 0,
      levelReferrals: { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
      levelEarnings: { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
      createdAt: new Date().toISOString(),
      avatar: provider === 'google' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      role: 'user',
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    showToast(`${provider === 'google' ? 'Google' : 'Facebook'} একাউন্ট তৈরি ও লগইন সফল হয়েছে!`, 'success');
  };

  // Registration handler
  const register = (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone?: string;
    password: string;
    referralCode?: string;
  }) => {
    const usernameClean = data.username.trim().toLowerCase();
    const emailClean = data.email.trim().toLowerCase();

    if (users.some((u) => u.username.toLowerCase() === usernameClean)) {
      return { success: false, message: 'এই ইউজারনেমটি ইতিমধ্যে ব্যবহৃত হয়েছে! অনুগ্রহ করে অন্য ইউজারনেম দিন।' };
    }
    if (users.some((u) => u.email.toLowerCase() === emailClean)) {
      return { success: false, message: 'এই ইমেইলটি দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে!' };
    }

    let referredByUser: User | undefined;
    if (data.referralCode && data.referralCode.trim()) {
      const codeUpper = data.referralCode.trim().toUpperCase();
      referredByUser = users.find(
        (u) => u.referralCode.toUpperCase() === codeUpper || u.id === data.referralCode?.trim()
      );
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      username: usernameClean,
      email: emailClean,
      phone: data.phone?.trim() || '',
      password: data.password,
      accountStatus: 'regular',
      balance: 15, // ৳15 welcome bonus
      todayEarnings: 15,
      totalEarned: 15,
      totalWithdrawn: 0,
      points: 20, // Initial 20 points
      rank: 'bronze',
      referralCode: `BZ${Math.floor(100000 + Math.random() * 900000)}`,
      referredBy: referredByUser ? (referredByUser.referralCode || referredByUser.id) : undefined,
      referralCount: 0,
      referralEarnings: 0,
      levelReferrals: { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
      levelEarnings: { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
      createdAt: new Date().toISOString(),
      role: 'user',
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);

    // Initial transaction log
    const welcomeTx: Transaction = {
      id: `tx-${Date.now()}`,
      userId: newUser.id,
      type: 'admin_adjustment',
      amount: 15,
      description: 'নতুন রেজিস্ট্রেশন স্বাগতম বোনাস ৳১৫',
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [welcomeTx, ...prev]);

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showToast('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! আপনার অ্যাকাউন্টে ৳১৫ বোনাস যোগ হয়েছে।', 'success');
    return { success: true, message: 'রেজিস্ট্রেশন সম্পন্ন হয়েছে' };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('home');
    showToast('আপনি সফলভাবে লগআউট করেছেন।', 'info');
  };

  // Submit Account Verification Request
  const submitVerification = (data: {
    method: PaymentMethod;
    senderNumber: string;
    trxId: string;
    amount: number;
  }) => {
    if (!currentUser) {
      showToast('অনুগ্রহ করে প্রথমে লগইন করুন!', 'error');
      return { success: false, message: 'লগইন আবশ্যক' };
    }

    if (currentUser.accountStatus === 'verified') {
      showToast('আপনার অ্যাকাউন্টটি ইতিমধ্যে ভেরিফাইড!', 'info');
      return { success: false, message: 'ইতিমধ্যে ভেরিফাইড' };
    }

    const newRequest: VerificationRequest = {
      id: `vr-${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      paymentMethod: data.method,
      senderNumber: data.senderNumber,
      transactionId: data.trxId.toUpperCase(),
      amountBDT: data.amount,
      amountUSD: settings.verificationFeeUSD,
      adminNumber: settings.adminPhone,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    setVerifications((prev) => [newRequest, ...prev]);

    // Update user status to pending_verification
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, accountStatus: 'pending_verification' } : u))
    );
    setCurrentUser((prev) => (prev ? { ...prev, accountStatus: 'pending_verification' } : null));

    confetti({ particleCount: 50, spread: 60 });
    showToast('ভেরিফিকেশন রিকোয়েস্ট জমা দেওয়া হয়েছে! এডমিন যাচাই করে ১০-১৫ মিনিটে অনুমোদন করবে।', 'success');
    return { success: true, message: 'রিকোয়েস্ট জমা হয়েছে' };
  };

  // Submit Withdrawal Request
  const submitWithdrawal = (data: {
    method: PaymentMethod;
    accountNumber: string;
    accountType: 'personal' | 'agent';
    amount: number;
  }) => {
    if (!currentUser) return { success: false, message: 'লগইন আবশ্যক' };

    if (currentUser.accountStatus !== 'verified') {
      return {
        success: false,
        message: 'টাকা উত্তোলন করতে হলে আপনার অ্যাকাউন্টটি ভেরিফাইড হতে হবে। অনুগ্রহ করে ভেরিফাই করুন।'
      };
    }

    if (data.amount < settings.minWithdrawal) {
      return {
        success: false,
        message: `সর্বনিম্ন উত্তোলনের পরিমাণ ৳${settings.minWithdrawal}`
      };
    }

    if (currentUser.balance < data.amount) {
      return {
        success: false,
        message: 'আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!'
      };
    }

    const fee = Math.round(data.amount * 0.02); // 2% charge
    const netAmount = data.amount - fee;

    const newWd: WithdrawalRequest = {
      id: `wd-${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      method: data.method,
      accountNumber: data.accountNumber,
      accountType: data.accountType,
      amount: data.amount,
      fee,
      netAmount,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };

    // Deduct balance immediately
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id ? { ...u, balance: u.balance - data.amount } : u
      )
    );
    setCurrentUser((prev) => (prev ? { ...prev, balance: prev.balance - data.amount } : null));
    setWithdrawals((prev) => [newWd, ...prev]);

    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      type: 'withdrawal',
      amount: -data.amount,
      description: `${data.method === 'bkash' ? 'বিকাশ' : data.method === 'nagad' ? 'নগদ' : 'রকেট'} নম্বরে ৳${data.amount} উত্তোলন রিকোয়েস্ট (পেন্ডিং)`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    showToast(`৳${data.amount} উত্তোলনের আবেদন জমা হয়েছে! খুব দ্রুত টাকা আপনার নম্বরে পাঠানো হবে।`, 'success');
    return { success: true, message: 'উত্তোলনের আবেদন সফল' };
  };

  // Complete a Task & Earn Money + Ranking Points
  const completeTask = (taskId: string, submissionData?: string) => {
    if (!currentUser) return { success: false, message: 'লগইন আবশ্যক' };

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return { success: false, message: 'টাস্ক পাওয়া যায়নি' };

    if (task.requiresVerified && currentUser.accountStatus !== 'verified') {
      return {
        success: false,
        message: 'এই প্রিমিয়াম টাস্কটি করতে হলে অ্যাকাউন্ট ভেরিফাইড হতে হবে (৳৬০০ / $৫)।'
      };
    }

    const reward = task.reward;
    const pointsToAdd = task.pointsReward || 25;
    const prevPoints = currentUser.points || 0;
    const newPoints = prevPoints + pointsToAdd;
    const newRank: UserRank = calculateRankFromPoints(newPoints);
    const rankUpgraded = newRank !== currentUser.rank;

    // Record history
    const history: UserTaskHistory = {
      id: `th-${Date.now()}`,
      userId: currentUser.id,
      taskId: task.id,
      taskTitle: task.title,
      reward,
      pointsEarned: pointsToAdd,
      submissionData: submissionData || undefined,
      completedAt: new Date().toISOString(),
    };
    setTaskHistories((prev) => [history, ...prev]);

    // Update user balance, points, and rank
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              balance: u.balance + reward,
              todayEarnings: u.todayEarnings + reward,
              totalEarned: u.totalEarned + reward,
              points: newPoints,
              rank: newRank,
            }
          : u
      )
    );
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            balance: prev.balance + reward,
            todayEarnings: prev.todayEarnings + reward,
            totalEarned: prev.totalEarned + reward,
            points: newPoints,
            rank: newRank,
          }
        : null
    );

    // Update task completed count
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completedCount: (t.completedCount || 0) + 1 } : t))
    );

    // Transaction
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      type: 'task_reward',
      amount: reward,
      description: `"${task.title}" টাস্ক সম্পন্ন করার রিওয়ার্ড (+৳${reward}, +${pointsToAdd} পয়েন্ট)`,
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    confetti({ particleCount: 70, spread: 60 });
    
    if (rankUpgraded) {
      const rankMeta = getRankInfo(newRank);
      showToast(`🏆 অভিনন্দন! আপনার র্যাংক বৃদ্ধি পেয়ে "${rankMeta.nameBn}" এ উন্নীত হয়েছে! (+৳${reward})`, 'success');
    } else {
      showToast(`অভিনন্দন! আপনি সফলভাবে ৳${reward} ও ${pointsToAdd} পয়েন্ট অর্জন করেছেন।`, 'success');
    }

    return { success: true, message: 'টাস্ক সম্পন্ন' };
  };

  // Claim Daily Lucky Spin Reward (Once every 24 hours, admin capped rewards)
  const claimDailySpin = (reward: number) => {
    if (!currentUser) {
      return { success: false, message: 'লগইন আবশ্যক' };
    }

    // 24 Hours Cooldown check
    const cooldownMs = (settings.spinCooldownHours || 24) * 3600 * 1000;
    if (currentUser.lastSpinAt) {
      const timePassed = Date.now() - new Date(currentUser.lastSpinAt).getTime();
      if (timePassed < cooldownMs) {
        const remainingMs = cooldownMs - timePassed;
        const hours = Math.floor(remainingMs / 3600000);
        const mins = Math.floor((remainingMs % 3600000) / 60000);
        const secs = Math.floor((remainingMs % 60000) / 1000);
        showToast(
          `আপনি ইতিমধ্যে আজকের স্পিন করেছেন! পরবর্তী স্পিন ${hours} ঘণ্টা ${mins} মি. ${secs} সে. পর পাওয়া যাবে।`,
          'error'
        );
        return { success: false, message: '২৪ ঘণ্টা পূর্ণ হয়নি' };
      }
    }

    const allowed = settings.spinAllowedRewards && settings.spinAllowedRewards.length > 0
      ? settings.spinAllowedRewards
      : [1, 2];
    const maxAllowed = settings.spinMaxReward || 2;

    let actualReward = reward;
    if (!allowed.includes(actualReward) || actualReward > maxAllowed) {
      actualReward = allowed[Math.floor(Math.random() * allowed.length)];
    }
    actualReward = Math.min(actualReward, maxAllowed);

    const now = new Date().toISOString();

    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              balance: u.balance + actualReward,
              todayEarnings: u.todayEarnings + actualReward,
              totalEarned: u.totalEarned + actualReward,
              lastSpinAt: now,
            }
          : u
      )
    );
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            balance: prev.balance + actualReward,
            todayEarnings: prev.todayEarnings + actualReward,
            totalEarned: prev.totalEarned + actualReward,
            lastSpinAt: now,
          }
        : null
    );

    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      type: 'daily_spin',
      amount: actualReward,
      description: `ডেইলি লাকি স্পিন রিওয়ার্ড (৳${actualReward})`,
      status: 'success',
      createdAt: now,
    };
    setTransactions((prev) => [tx, ...prev]);

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    showToast(`🎉 অভিনন্দন! আপনি স্পিনে জিতেছেন ৳${actualReward}! ব্যালেন্সে যোগ হয়েছে।`, 'success');
    return { success: true, reward: actualReward, message: 'স্পিন সফল' };
  };

  // Claim Monthly Salary (for users with 100+ verified referrals)
  const claimMonthlySalary = () => {
    if (!currentUser) return { success: false, message: 'লগইন আবশ্যক' };

    const referralCount = currentUser.referralCount || 0;
    const salaryInfo = calculateEligibleSalary(referralCount);

    if (!salaryInfo.isEligible || salaryInfo.monthlySalary <= 0) {
      showToast('মাসিক বেতন পাওয়ার জন্য কমপক্ষে ১০০টি ভেরিফাইড রেফারেল প্রয়োজন!', 'error');
      return { success: false, message: 'যোগ্য নন' };
    }

    // Check if claimed within 30 days
    if (currentUser.lastSalaryClaimedAt) {
      const elapsed = Date.now() - new Date(currentUser.lastSalaryClaimedAt).getTime();
      const monthMs = 30 * 24 * 3600 * 1000;
      if (elapsed < monthMs) {
        const daysLeft = Math.ceil((monthMs - elapsed) / (24 * 3600 * 1000));
        showToast(`আপনি চলতি মাসের বেতন গ্রহণ করেছেন! পরবর্তী বেতন পাবেন ${daysLeft} দিন পর।`, 'info');
        return { success: false, message: 'মাসিক বিরতি' };
      }
    }

    const salaryAmount = salaryInfo.monthlySalary;
    const now = new Date().toISOString();

    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id
          ? {
              ...u,
              balance: u.balance + salaryAmount,
              totalEarned: u.totalEarned + salaryAmount,
              monthlySalary: salaryAmount,
              lastSalaryClaimedAt: now,
            }
          : u
      )
    );

    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            balance: prev.balance + salaryAmount,
            totalEarned: prev.totalEarned + salaryAmount,
            monthlySalary: salaryAmount,
            lastSalaryClaimedAt: now,
          }
        : null
    );

    const tx: Transaction = {
      id: `tx-${Date.now()}-salary`,
      userId: currentUser.id,
      type: 'monthly_salary',
      amount: salaryAmount,
      description: `মাসিক ফিক্সড বেতন (${referralCount} রেফারেল টার্গেট) ৳${salaryAmount}`,
      status: 'success',
      createdAt: now,
    };
    setTransactions((prev) => [tx, ...prev]);

    confetti({ particleCount: 150, spread: 90, origin: { y: 0.4 } });
    showToast(`🎉 অভিনন্দন! আপনার চলতি মাসের ফিক্সড বেতন ৳${salaryAmount} ব্যালেন্সে যুক্ত হয়েছে।`, 'success');
    return { success: true, message: 'বেতন পরিশোধিত', amount: salaryAmount };
  };

  // Helper to distribute 5-Level Referral Commissions when a user gets verified
  const distribute5LevelReferralBonus = (verifiedUserId: string) => {
    const verifiedUser = users.find((u) => u.id === verifiedUserId);
    if (!verifiedUser) return;

    const bonuses = settings.referralLevelBonuses || [200, 50, 20, 10, 5];
    const now = new Date().toISOString();
    const newTransactions: Transaction[] = [];

    // Traverse uplines up to 5 levels
    let currentUplineRef = verifiedUser.referredBy;
    const levelUplineIds: (string | null)[] = [null, null, null, null, null];

    let step = 0;
    while (currentUplineRef && step < 5) {
      const uplineUser = users.find(
        (u) =>
          u.referralCode.toUpperCase() === currentUplineRef?.toUpperCase() ||
          u.id === currentUplineRef
      );

      if (uplineUser && !levelUplineIds.includes(uplineUser.id)) {
        levelUplineIds[step] = uplineUser.id;
        currentUplineRef = uplineUser.referredBy;
        step++;
      } else {
        break;
      }
    }

    // Update users with their respective level commissions
    setUsers((prev) =>
      prev.map((u) => {
        const levelIdx = levelUplineIds.indexOf(u.id);
        if (levelIdx !== -1) {
          const levelNum = levelIdx + 1;
          const commission = bonuses[levelIdx] || 0;

          const prevLevelRefs = u.levelReferrals || { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
          const prevLevelEarns = u.levelEarnings || { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };

          const updatedLevelRefs = { ...prevLevelRefs };
          const updatedLevelEarns = { ...prevLevelEarns };

          if (levelNum === 1) {
            updatedLevelRefs.level1 += 1;
            updatedLevelEarns.level1 += commission;
          } else if (levelNum === 2) {
            updatedLevelRefs.level2 += 1;
            updatedLevelEarns.level2 += commission;
          } else if (levelNum === 3) {
            updatedLevelRefs.level3 += 1;
            updatedLevelEarns.level3 += commission;
          } else if (levelNum === 4) {
            updatedLevelRefs.level4 += 1;
            updatedLevelEarns.level4 += commission;
          } else if (levelNum === 5) {
            updatedLevelRefs.level5 += 1;
            updatedLevelEarns.level5 += commission;
          }

          const newDirectRefCount = levelNum === 1 ? (u.referralCount || 0) + 1 : (u.referralCount || 0);

          newTransactions.push({
            id: `tx-${Date.now()}-L${levelNum}-${u.id.slice(-4)}`,
            userId: u.id,
            type: levelNum === 1 ? 'referral_bonus' : 'level_referral_bonus',
            amount: commission,
            description: `${levelNum === 1 ? '১ম লেভেল সরাসরি' : `${levelNum}ম লেভেল সাব-টিম`} রেফারেল বোনাস (${verifiedUser.firstName}) - ৳${commission}`,
            status: 'success',
            createdAt: now,
          });

          return {
            ...u,
            balance: u.balance + commission,
            referralEarnings: (u.referralEarnings || 0) + commission,
            totalEarned: (u.totalEarned || 0) + commission,
            referralCount: newDirectRefCount,
            levelReferrals: updatedLevelRefs,
            levelEarnings: updatedLevelEarns,
          };
        }
        return u;
      })
    );

    if (newTransactions.length > 0) {
      setTransactions((prev) => [...newTransactions, ...prev]);
    }
  };

  // Admin: Approve Verification Request
  const adminApproveVerification = (requestId: string) => {
    const req = verifications.find((v) => v.id === requestId);
    if (!req) return;

    const now = new Date().toISOString();
    setVerifications((prev) =>
      prev.map((v) => (v.id === requestId ? { ...v, status: 'approved', reviewedAt: now } : v))
    );

    const targetUserId = req.userId;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === targetUserId) {
          return {
            ...u,
            accountStatus: 'verified',
            verifiedAt: now,
            points: Math.max(u.points || 0, 1000), // Silver milestone point boost
            rank: calculateRankFromPoints(Math.max(u.points || 0, 1000)),
          };
        }
        return u;
      })
    );

    // Distribute 5-Level Referral Bonus
    distribute5LevelReferralBonus(targetUserId);

    if (currentUser && currentUser.id === targetUserId) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              accountStatus: 'verified',
              verifiedAt: now,
              points: Math.max(prev.points || 0, 1000),
              rank: calculateRankFromPoints(Math.max(prev.points || 0, 1000)),
            }
          : null
      );
    }

    showToast(`ভেরিফিকেশন #${requestId} অনুমোদিত হয়েছে! ৫-লেভেল রেফারেল কমিশন বণ্টিত হয়েছে।`, 'success');
  };

  // Admin: Reject Verification Request
  const adminRejectVerification = (requestId: string, reason = 'ট্রানজেকশন আইডি মেলেনি') => {
    const req = verifications.find((v) => v.id === requestId);
    if (!req) return;

    setVerifications((prev) =>
      prev.map((v) =>
        v.id === requestId
          ? { ...v, status: 'rejected', reviewedAt: new Date().toISOString(), rejectReason: reason }
          : v
      )
    );

    setUsers((prev) =>
      prev.map((u) => (u.id === req.userId ? { ...u, accountStatus: 'regular' } : u))
    );
    if (currentUser && currentUser.id === req.userId) {
      setCurrentUser((prev) => (prev ? { ...prev, accountStatus: 'regular' } : null));
    }

    showToast(`ভেরিফিকেশন #${requestId} বাতিল করা হয়েছে।`, 'info');
  };

  // Admin: Approve Withdrawal Request
  const adminApproveWithdrawal = (requestId: string, adminTrxId: string) => {
    const wd = withdrawals.find((w) => w.id === requestId);
    if (!wd) return;

    const now = new Date().toISOString();
    setWithdrawals((prev) =>
      prev.map((w) =>
        w.id === requestId ? { ...w, status: 'approved', processedAt: now, adminTrxId } : w
      )
    );

    setUsers((prev) =>
      prev.map((u) =>
        u.id === wd.userId ? { ...u, totalWithdrawn: u.totalWithdrawn + wd.amount } : u
      )
    );

    showToast(`উত্তোলন #${requestId} অনুমোদিত ও টাকা পাঠানো সম্পন্ন! TrxID: ${adminTrxId}`, 'success');
  };

  // Admin: Reject Withdrawal Request
  const adminRejectWithdrawal = (requestId: string, reason = 'ভুল অ্যাকাউন্ট নম্বর') => {
    const wd = withdrawals.find((w) => w.id === requestId);
    if (!wd) return;

    setWithdrawals((prev) =>
      prev.map((w) => (w.id === requestId ? { ...w, status: 'rejected' } : w))
    );

    // Refund amount back to user's balance
    setUsers((prev) =>
      prev.map((u) => (u.id === wd.userId ? { ...u, balance: u.balance + wd.amount } : u))
    );
    if (currentUser && currentUser.id === wd.userId) {
      setCurrentUser((prev) => (prev ? { ...prev, balance: prev.balance + wd.amount } : null));
    }

    showToast(`উত্তোলন #${requestId} বাতিল ও ব্যবহারকারীর ব্যালেন্সে ৳${wd.amount} রিফান্ড করা হয়েছে।`, 'info');
  };

  // Admin: Update System Settings
  const adminUpdateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('সিস্টেম সেটিংস সফলভাবে আপডেট করা হয়েছে!', 'success');
  };

  // Admin: Toggle User Status
  const adminToggleUserStatus = (userId: string, newStatus: 'regular' | 'verified' | 'blocked') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, accountStatus: newStatus } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, accountStatus: newStatus } : null));
    }
    showToast(`ব্যবহারকারীর স্ট্যাটাস '${newStatus}' এ পরিবর্তন করা হয়েছে।`, 'success');
  };

  // Admin: Adjust Balance
  const adminAdjustUserBalance = (userId: string, amount: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, balance: Math.max(0, u.balance + amount) } : u))
    );
    showToast(`ব্যালেন্সে ৳${amount} সমন্বয় করা হয়েছে।`, 'success');
  };

  // Admin: Add Task
  const adminAddTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      completedCount: 0,
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('নতুন টাস্ক সফলভাবে তৈরি হয়েছে!', 'success');
  };

  // Admin: Delete Task
  const adminDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('টাস্ক মুছে ফেলা হয়েছে।', 'info');
  };

  // Admin: Reset a user's 24-hour spin cooldown
  const adminResetUserSpinTimer = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, lastSpinAt: undefined } : u))
    );
    setCurrentUser((prev) => (prev && prev.id === userId ? { ...prev, lastSpinAt: undefined } : prev));
    showToast('ব্যবহারকারীর স্পিন টাইমার রিসেট করা হয়েছে!', 'success');
  };

  // Quick switch between Admin & Regular User for testing
  const switchUserRole = () => {
    if (currentUser?.role === 'admin') {
      const regularUser = users.find((u) => u.accountStatus === 'regular') || users[1];
      setCurrentUser(regularUser);
      setActiveTab('home');
      showToast(`স্বাভাবিক ব্যবহারকারী মোড (${regularUser.firstName}) চালু হয়েছে`, 'info');
    } else {
      const adminUser = users.find((u) => u.role === 'admin') || initialUsers[2];
      setCurrentUser(adminUser);
      setActiveTab('admin');
      showToast('সুপার এডমিন মোড সক্রিয় হয়েছে!', 'success');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        tasks,
        taskHistories,
        verifications,
        withdrawals,
        transactions,
        settings,
        activeTab,
        setActiveTab,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        viewMode,
        setViewMode,
        toast,
        showToast,
        login,
        socialLogin,
        register,
        logout,
        submitVerification,
        submitWithdrawal,
        completeTask,
        claimDailySpin,
        claimMonthlySalary,
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
        switchUserRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
