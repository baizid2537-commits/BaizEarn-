export type AccountStatus = 'regular' | 'pending_verification' | 'verified' | 'blocked';
export type PaymentMethod = 'bkash' | 'nagad' | 'rocket';
export type UserRank = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export type TaskCategory =
  | 'video'
  | 'signup'
  | 'gmail_sell'
  | 'facebook_sell'
  | 'twitter_sell'
  | 'telegram_sell'
  | 'whatsapp_sell'
  | 'product_sell'
  | 'social'
  | 'app'
  | 'survey'
  | 'daily';

export interface LevelReferralStats {
  level1: number; // Direct referrals
  level2: number; // 2nd tier
  level3: number; // 3rd tier
  level4: number; // 4th tier
  level5: number; // 5th tier
}

export interface LevelEarningsStats {
  level1: number; // Earnings from L1 (৳200 each)
  level2: number; // Earnings from L2 (৳50 each)
  level3: number; // Earnings from L3 (৳20 each)
  level4: number; // Earnings from L4 (৳10 each)
  level5: number; // Earnings from L5 (৳5 each)
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  password?: string;
  accountStatus: AccountStatus;
  verifiedAt?: string;
  balance: number; // in BDT ৳
  todayEarnings: number;
  totalEarned: number;
  totalWithdrawn: number;
  points: number; // Work/Task points for ranking
  rank: UserRank; // bronze, silver, gold, platinum, diamond
  referralCode: string;
  referredBy?: string; // upline referrer code or userId
  referralCount: number; // Direct level 1 verified count
  referralEarnings: number;
  levelReferrals?: LevelReferralStats;
  levelEarnings?: LevelEarningsStats;
  monthlySalary?: number; // Active monthly salary in BDT
  lastSalaryClaimedAt?: string;
  createdAt: string;
  avatar?: string;
  role: 'user' | 'admin';
  lastSpinAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  reward: number; // ৳
  pointsReward: number; // Points added towards ranking
  durationSeconds: number;
  url?: string;
  requiresVerified: boolean;
  maxDaily: number;
  icon: string;
  completedCount?: number;
  submissionType?: 'none' | 'text' | 'credentials' | 'link' | 'screenshot';
  instructions?: string[];
  sampleCredentials?: string;
}

export interface UserTaskHistory {
  id: string;
  userId: string;
  taskId: string;
  taskTitle: string;
  reward: number;
  pointsEarned: number;
  completedAt: string;
  submissionData?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  paymentMethod: PaymentMethod;
  senderNumber: string;
  transactionId: string;
  amountBDT: number; // ৳600
  amountUSD: number; // $5
  adminNumber: string; // 01965732537
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  rejectReason?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  method: PaymentMethod;
  accountNumber: string;
  accountType: 'personal' | 'agent';
  amount: number;
  fee: number;
  netAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  adminTrxId?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type:
    | 'task_reward'
    | 'referral_bonus'
    | 'level_referral_bonus'
    | 'monthly_salary'
    | 'daily_spin'
    | 'verification_fee'
    | 'withdrawal'
    | 'admin_adjustment';
  amount: number;
  description: string;
  status: 'success' | 'pending' | 'failed';
  createdAt: string;
}

export interface SalaryTier {
  minReferrals: number;
  monthlySalaryBDT: number;
  label: string;
}

export interface RankInfo {
  id?: string;
  rank: UserRank;
  name: string;
  nameBn: string;
  badge: string;
  minPoints: number;
  maxPoints?: number;
  badgeColor: string;
  bgColor: string;
  textColor: string;
  perks: string[];
}

export interface SystemSettings {
  adminPhone: string;
  verificationFeeBDT: number;
  verificationFeeUSD: number;
  referralBonus: number; // Level 1 default (200)
  referralLevelBonuses: [number, number, number, number, number]; // [200, 50, 20, 10, 5]
  minWithdrawal: number;
  noticeMessage: string;
  telegramSupportLink: string;
  exchangeRate: number;
  appTitle: string;
  spinAllowedRewards: number[]; // e.g. [1, 2]
  spinMaxReward: number; // e.g. 2
  spinCooldownHours: number; // 24 hours
  salaryMinimumReferrals: number; // 100
}

export type ActiveTab =
  | 'home'
  | 'tasks'
  | 'verify'
  | 'wallet'
  | 'refer'
  | 'spin'
  | 'profile'
  | 'admin';

// Legacy compatibility types
export interface NavItem {
  id?: string;
  label: string;
  href: string;
  badge?: string;
}

export interface StatItem {
  id: number | string;
  label: string;
  value: string;
  change?: string;
  period?: string;
  subtext?: string;
  icon?: string;
  iconName?: string;
}

export interface FeatureItem {
  id: number | string;
  title: string;
  description: string;
  icon?: string;
  iconName?: string;
  tag?: string;
  highlight?: boolean;
}

export interface StepItem {
  step: number | string;
  title: string;
  description: string;
  details?: string | string[];
  icon?: string;
  iconName?: string;
  timeEstimate?: string;
}

export interface SecurityPoint {
  title: string;
  description: string;
  icon?: string;
  iconName?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
