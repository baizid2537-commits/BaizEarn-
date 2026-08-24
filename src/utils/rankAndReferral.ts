import { UserRank, RankInfo, SalaryTier, TaskCategory } from '../types';

export const TASK_CATEGORIES_CONFIG: {
  key: TaskCategory;
  nameBn: string;
  nameEn: string;
  icon: string;
  defaultReward: number;
  defaultPoints: number;
}[] = [
  { key: 'video', nameBn: 'ভিডিও দেখা', nameEn: 'Video Watch', icon: 'Video', defaultReward: 20, defaultPoints: 25 },
  { key: 'signup', nameBn: 'একাউন্ট তৈরি', nameEn: 'Account Signup', icon: 'UserPlus', defaultReward: 40, defaultPoints: 50 },
  { key: 'gmail_sell', nameBn: 'জিমেইল অ্যাকাউন্ট বিক্রি', nameEn: 'Gmail Sell', icon: 'Mail', defaultReward: 60, defaultPoints: 75 },
  { key: 'facebook_sell', nameBn: 'ফেসবুক অ্যাকাউন্ট বিক্রি', nameEn: 'Facebook Sell', icon: 'Share2', defaultReward: 70, defaultPoints: 85 },
  { key: 'twitter_sell', nameBn: 'টুইটার (X) অ্যাকাউন্ট বিক্রি', nameEn: 'Twitter Sell', icon: 'Twitter', defaultReward: 65, defaultPoints: 80 },
  { key: 'telegram_sell', nameBn: 'টেলিগ্রাম একাউন্ট বিক্রি', nameEn: 'Telegram Sell', icon: 'Send', defaultReward: 50, defaultPoints: 60 },
  { key: 'whatsapp_sell', nameBn: 'হোয়াটসঅ্যাপ একাউন্ট বিক্রি', nameEn: 'WhatsApp Sell', icon: 'MessageCircle', defaultReward: 80, defaultPoints: 100 },
  { key: 'product_sell', nameBn: 'প্রোডাক্ট বিক্রি / রেফার', nameEn: 'Product Sell', icon: 'ShoppingBag', defaultReward: 150, defaultPoints: 200 },
  { key: 'social', nameBn: 'সোশ্যাল মিডিয়া ফলো', nameEn: 'Social Media', icon: 'ThumbsUp', defaultReward: 25, defaultPoints: 30 },
  { key: 'app', nameBn: 'অ্যাপ ইনস্টল ও রিভিউ', nameEn: 'App Install', icon: 'Download', defaultReward: 45, defaultPoints: 55 },
  { key: 'survey', nameBn: 'সার্ভে ও কুইজ', nameEn: 'Survey', icon: 'HelpCircle', defaultReward: 30, defaultPoints: 35 },
  { key: 'daily', nameBn: 'দৈনিক বোনাস', nameEn: 'Daily Task', icon: 'Sparkles', defaultReward: 15, defaultPoints: 20 },
];

export const RANK_TIERS: RankInfo[] = [
  {
    id: 'bronze',
    rank: 'bronze',
    name: 'Bronze Member',
    nameBn: 'ব্রোঞ্জ (শুরু)',
    badge: '🥉',
    minPoints: 0,
    maxPoints: 999,
    badgeColor: '#CD7F32',
    bgColor: 'rgba(205, 127, 50, 0.15)',
    textColor: '#E59866',
    perks: ['ডেইলি বেসিক টাস্ক এক্সেস', '৫ লেভেল রেফারেল ইনকাম', 'রেগুলার উইথড্রয়াল সাপোর্ট'],
  },
  {
    id: 'silver',
    rank: 'silver',
    name: 'Silver Rank',
    nameBn: 'সিলভার (১,০০০+ পয়েন্ট)',
    badge: '🥈',
    minPoints: 1000,
    maxPoints: 9999,
    badgeColor: '#C0C0C0',
    bgColor: 'rgba(192, 192, 192, 0.15)',
    textColor: '#E2E8F0',
    perks: ['+২% অতিরিক্ত টাস্ক বোনাস', 'দ্রুত উইথড্রয়াল প্রসেসিং', 'সিলভার ভেরিফাইড ব্যাজ'],
  },
  {
    id: 'gold',
    rank: 'gold',
    name: 'Gold Rank',
    nameBn: 'গোল্ড (১০,০০০+ পয়েন্ট)',
    badge: '🥇',
    minPoints: 10000,
    maxPoints: 99999,
    badgeColor: '#FFD700',
    bgColor: 'rgba(255, 215, 0, 0.18)',
    textColor: '#FACC15',
    perks: ['+৫% স্পেশাল টাস্ক বোনাস', 'প্রাইওরিটি কাস্টমার সাপোর্ট', 'গোল্ড ভিআইপি মেম্বারশিপ'],
  },
  {
    id: 'platinum',
    rank: 'platinum',
    name: 'Platinum Rank',
    nameBn: 'প্লাটিনাম (১,০০,০০০+ পয়েন্ট)',
    badge: '💠',
    minPoints: 100000,
    maxPoints: 999999,
    badgeColor: '#E5E4E2',
    bgColor: 'rgba(229, 228, 226, 0.22)',
    textColor: '#38BDF8',
    perks: ['+১০% এক্সক্লুসিভ টাস্ক কমিশন', 'ইনস্ট্যান্ট উইথড্রয়াল সুবিধা', 'মাসিক স্পেশাল লিডারবোর্ড গিফট'],
  },
  {
    id: 'diamond',
    rank: 'diamond',
    name: 'Diamond Rank',
    nameBn: 'ডায়মন্ড (১০,০০,০০০+ পয়েন্ট)',
    badge: '💎',
    minPoints: 1000000,
    maxPoints: undefined,
    badgeColor: '#B9F2FF',
    bgColor: 'rgba(185, 242, 255, 0.25)',
    textColor: '#67E8F9',
    perks: ['+২০% সর্বোচ্চ টাস্ক আর্নিং', 'মাসিক ফিক্সড লিডার বোনাস', 'লাইফটাইম ডায়মন্ড ভিআইপি ক্লাব'],
  },
];

export const SALARY_TIERS: SalaryTier[] = [
  { minReferrals: 100, monthlySalaryBDT: 5000, label: '৳৫,০০০ / মাস (১০০ রেফার)' },
  { minReferrals: 250, monthlySalaryBDT: 15000, label: '৳১৫,০০০ / মাস (২৫০ রেফার)' },
  { minReferrals: 500, monthlySalaryBDT: 35000, label: '৳৩৫,০০০ / মাস (৫০০ রেফার)' },
  { minReferrals: 1000, monthlySalaryBDT: 80000, label: '৳৮০,০০০ / মাস (১০০০+ রেফার)' },
];

export const REFERRAL_LEVEL_COMMISSIONS = [
  { level: 1, nameBn: '১ম লেভেল (ডাইরেক্ট রেফার)', amount: 200, percentLabel: 'ডাইরেক্ট', icon: '👑' },
  { level: 2, nameBn: '২য় লেভেল (বন্ধুর রেফার)', amount: 50, percentLabel: 'সাব-টিম ১', icon: '🥈' },
  { level: 3, nameBn: '৩য় লেভেল (টিম মেম্বার)', amount: 20, percentLabel: 'সাব-টিম ২', icon: '🥉' },
  { level: 4, nameBn: '৪র্থ লেভেল (নেটওয়ার্ক)', amount: 10, percentLabel: 'সাব-টিম ৩', icon: '💎' },
  { level: 5, nameBn: '৫ম লেভেল (ডিপ নেটওয়ার্ক)', amount: 5, percentLabel: 'সাব-টিম ৪', icon: '🚀' },
];

// Helper to determine UserRank based on accumulated points
export function calculateRankFromPoints(points: number): UserRank {
  if (points >= 1000000) return 'diamond';
  if (points >= 100000) return 'platinum';
  if (points >= 10000) return 'gold';
  if (points >= 1000) return 'silver';
  return 'bronze';
}

// Helper to get Rank Info
export function getRankInfo(rank: UserRank): RankInfo {
  return RANK_TIERS.find((r) => r.rank === rank) || RANK_TIERS[0];
}

// Helper to get Next Rank Info
export function getNextRank(currentRank: UserRank): RankInfo | null {
  const currentIndex = RANK_TIERS.findIndex((r) => r.rank === currentRank);
  if (currentIndex >= 0 && currentIndex < RANK_TIERS.length - 1) {
    return RANK_TIERS[currentIndex + 1];
  }
  return null;
}

// Helper to get Points needed for next rank
export function getPointsToNextRank(points: number): number {
  const currentRank = calculateRankFromPoints(points);
  const next = getNextRank(currentRank);
  if (!next) return 0;
  return Math.max(0, next.minPoints - points);
}

// Helper to calculate next rank progress
export function getRankProgress(points: number) {
  const currentRank = calculateRankFromPoints(points);
  const currentRankIndex = RANK_TIERS.findIndex((r) => r.rank === currentRank);
  const currentInfo = RANK_TIERS[currentRankIndex];

  if (currentRankIndex >= RANK_TIERS.length - 1) {
    return {
      currentRank,
      currentInfo,
      nextInfo: null,
      progressPercent: 100,
      pointsNeeded: 0,
    };
  }

  const nextInfo = RANK_TIERS[currentRankIndex + 1];
  const pointsInCurrentTier = Math.max(0, points - currentInfo.minPoints);
  const tierRange = nextInfo.minPoints - currentInfo.minPoints;
  const progressPercent = Math.min(100, Math.max(0, Math.round((pointsInCurrentTier / tierRange) * 100)));
  const pointsNeeded = Math.max(0, nextInfo.minPoints - points);

  return {
    currentRank,
    currentInfo,
    nextInfo,
    progressPercent,
    pointsNeeded,
  };
}

// Helper to calculate eligible monthly salary based on verified referral count
export function calculateEligibleSalary(referralCount: number): {
  monthlySalary: number;
  isEligible: boolean;
  currentTier: SalaryTier | null;
  nextTier: SalaryTier | null;
  referralsNeeded: number;
  progressPercent: number;
} {
  let activeTier: SalaryTier | null = null;

  for (let i = SALARY_TIERS.length - 1; i >= 0; i--) {
    if (referralCount >= SALARY_TIERS[i].minReferrals) {
      activeTier = SALARY_TIERS[i];
      break;
    }
  }

  if (activeTier) {
    const activeIndex = SALARY_TIERS.findIndex((t) => t.minReferrals === activeTier?.minReferrals);
    const nextTier = activeIndex < SALARY_TIERS.length - 1 ? SALARY_TIERS[activeIndex + 1] : null;
    const referralsNeeded = nextTier ? Math.max(0, nextTier.minReferrals - referralCount) : 0;
    const progressPercent = nextTier
      ? Math.min(100, Math.round((referralCount / nextTier.minReferrals) * 100))
      : 100;

    return {
      monthlySalary: activeTier.monthlySalaryBDT,
      isEligible: true,
      currentTier: activeTier,
      nextTier,
      referralsNeeded,
      progressPercent,
    };
  }

  // Not yet eligible (below 100 referrals)
  const firstTier = SALARY_TIERS[0];
  const referralsNeeded = Math.max(0, firstTier.minReferrals - referralCount);
  const progressPercent = Math.min(100, Math.round((referralCount / firstTier.minReferrals) * 100));

  return {
    monthlySalary: 0,
    isEligible: false,
    currentTier: null,
    nextTier: firstTier,
    referralsNeeded,
    progressPercent,
  };
}
