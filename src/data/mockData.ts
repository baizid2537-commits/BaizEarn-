import { User, Task, SystemSettings, VerificationRequest, WithdrawalRequest, Transaction } from '../types';

export const initialSettings: SystemSettings = {
  adminPhone: '01965732537',
  verificationFeeBDT: 600,
  verificationFeeUSD: 5,
  referralBonus: 200, // Level 1 direct referral bonus (৳200)
  referralLevelBonuses: [200, 50, 20, 10, 5], // 5-level commission breakdown: L1=৳200, L2=৳50, L3=৳20, L4=৳10, L5=৳5
  minWithdrawal: 100,
  noticeMessage: '📢 স্বাগতম BaizEarn এ! ৫-লেভেল রেফারেল ইনকাম (৳২০০+৳৫০+৳২০+৳১০+৳৫), কাজ করে পয়েন্ট অর্জন ও ১০০ রেফারে আকর্ষণীয় মাসিক ফিক্সড বেতন!',
  telegramSupportLink: 'https://t.me/baizearn_support',
  exchangeRate: 120,
  appTitle: 'BaizEarn',
  spinAllowedRewards: [1, 2],
  spinMaxReward: 2,
  spinCooldownHours: 24,
  salaryMinimumReferrals: 100,
};

export const initialUsers: User[] = [
  {
    id: 'user-baizid',
    firstName: 'বাইজিদ',
    lastName: 'হোসেন',
    username: 'baizid2537',
    email: 'baizid2537@gmail.com',
    phone: '01965732537',
    password: '123',
    accountStatus: 'verified',
    verifiedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    balance: 2450,
    todayEarnings: 225,
    totalEarned: 5850,
    totalWithdrawn: 2400,
    points: 1250, // Silver rank (1,000+ points)
    rank: 'silver',
    referralCode: 'BAIZID2537',
    referralCount: 14,
    referralEarnings: 3450,
    levelReferrals: {
      level1: 14,
      level2: 28,
      level3: 45,
      level4: 60,
      level5: 85,
    },
    levelEarnings: {
      level1: 2800, // 14 * 200
      level2: 1400, // 28 * 50
      level3: 900,  // 45 * 20
      level4: 600,  // 60 * 10
      level5: 425,  // 85 * 5
    },
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'user',
    lastSpinAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'user-sabbir',
    firstName: 'সাব্বির',
    lastName: 'আহমেদ',
    username: 'sabbir24',
    email: 'sabbir@example.com',
    phone: '01711223344',
    password: '123',
    accountStatus: 'regular',
    balance: 85,
    todayEarnings: 40,
    totalEarned: 85,
    totalWithdrawn: 0,
    points: 250, // Bronze rank
    rank: 'bronze',
    referralCode: 'SABBIR24',
    referredBy: 'BAIZID2537',
    referralCount: 2,
    referralEarnings: 0,
    levelReferrals: {
      level1: 2,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
    },
    levelEarnings: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    role: 'user',
  },
  {
    id: 'user-admin',
    firstName: 'এডমিন',
    lastName: 'ম্যানেজার',
    username: 'admin',
    email: 'admin@baizearn.com',
    phone: '01965732537',
    password: 'admin',
    accountStatus: 'verified',
    balance: 99999,
    todayEarnings: 0,
    totalEarned: 0,
    totalWithdrawn: 0,
    points: 1200000, // Diamond VIP
    rank: 'diamond',
    referralCode: 'ADMIN01',
    referralCount: 150,
    referralEarnings: 45000,
    levelReferrals: {
      level1: 150,
      level2: 450,
      level3: 980,
      level4: 1500,
      level5: 3200,
    },
    levelEarnings: {
      level1: 30000,
      level2: 22500,
      level3: 19600,
      level4: 15000,
      level5: 16000,
    },
    monthlySalary: 5000,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    role: 'admin',
  }
];

export const initialTasks: Task[] = [
  // 1. Video Watching Tasks
  {
    id: 'task-v1',
    title: 'ইউটিউব স্পনসরড ভিডিও দেখুন ও লাইক দিন',
    description: 'ভিডিওটি কমপক্ষে ৩০ সেকেন্ড মনোযোগ দিয়ে দেখুন এবং লাইক বাটনে চাপ দিন।',
    category: 'video',
    reward: 25,
    pointsReward: 25,
    durationSeconds: 30,
    url: 'https://www.youtube.com',
    requiresVerified: false,
    maxDaily: 10,
    icon: 'Youtube',
    completedCount: 4520,
    submissionType: 'none',
  },
  {
    id: 'task-v2',
    title: 'এইচডি বিজ্ঞাপন ভিডিও ওয়াচ ও শেয়ার',
    description: 'বিজ্ঞাপন ভিডিওটি শেষ পর্যন্ত দেখুন এবং রিওয়ার্ড ও পয়েন্ট যোগ করে নিন।',
    category: 'video',
    reward: 35,
    pointsReward: 35,
    durationSeconds: 40,
    url: 'https://www.youtube.com',
    requiresVerified: true,
    maxDaily: 8,
    icon: 'PlayCircle',
    completedCount: 6810,
    submissionType: 'none',
  },

  // 2. Account Creation (সাইন আপ / একাউন্ট তৈরি করা)
  {
    id: 'task-reg1',
    title: 'নতুন ই-কমার্স সাইটে সাইন আপ ও ভেরিফাই',
    description: 'প্রদত্ত লিংকে গিয়ে মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে একাউন্ট খুলে আপনার ইউজারনেম সাবমিট করুন।',
    category: 'signup',
    reward: 45,
    pointsReward: 50,
    durationSeconds: 45,
    url: 'https://example.com/signup',
    requiresVerified: false,
    maxDaily: 5,
    icon: 'UserPlus',
    completedCount: 2310,
    submissionType: 'text',
    instructions: [
      'প্রদত্ত ওয়েবসাইটে প্রবেশ করুন।',
      'আপনার ফোন নম্বর অথবা ইমেইল দিয়ে রেজিস্ট্রেশন সম্পন্ন করুন।',
      'রেজিস্টার করা ইউজারনেম বা ফোন নম্বরটি নিচের বক্সে লিখে সাবমিট করুন।'
    ],
  },
  {
    id: 'task-reg2',
    title: 'অনলাইন লার্নিং পোর্টালে ফ্রি স্টুডেন্ট একাউন্ট ক্রিয়েশন',
    description: 'লার্নিং প্ল্যাটফর্মে একটি ফ্রি একাউন্ট তৈরি করে প্রোফাইল স্ক্রিনশট বা ইউজার আইডি জমা দিন।',
    category: 'signup',
    reward: 60,
    pointsReward: 70,
    durationSeconds: 60,
    url: 'https://example.com/edu-signup',
    requiresVerified: true,
    maxDaily: 3,
    icon: 'GraduationCap',
    completedCount: 1450,
    submissionType: 'text',
    instructions: [
      'ফ্রি সাইন আপ সম্পন্ন করুন।',
      'প্রোফাইল নেম এবং ইমেইল অ্যাড্রেস নিচে সাবমিট করুন।'
    ],
  },

  // 3. Gmail Account Sell / Delivery
  {
    id: 'task-gmail-1',
    title: 'ফ্রেশ নতুন জিমেইল অ্যাকাউন্ট বিক্রি / সাবমিট',
    description: 'নতুন তৈরি করা ভেরিফায়েড জিমেইল ইমেইল ও পাসওয়ার্ড প্রদান করে প্রতি একাউন্টে ৳৩০ আয় করুন।',
    category: 'gmail_sell',
    reward: 30,
    pointsReward: 40,
    durationSeconds: 60,
    requiresVerified: false,
    maxDaily: 20,
    icon: 'Mail',
    completedCount: 9430,
    submissionType: 'credentials',
    instructions: [
      'যেকোনো নতুন Gmail একাউন্ট তৈরি করুন (নাম বাংলা বা ইংরেজি)।',
      'রিকভারি ইমেইল হিসেবে: recovery@baizearn.com সেট করুন (বা ফাঁকা রাখুন)।',
      'নিচের বক্সে জিমেইল অ্যাড্রেস এবং পাসওয়ার্ড লিখে জমা দিন।'
    ],
    sampleCredentials: 'example123@gmail.com | Pass@12345',
  },
  {
    id: 'task-gmail-2',
    title: 'বাল্ক প্রিমিয়াম জিমেইল (2FA অফ) সাবমিট',
    description: 'পুরোনো বা অ্যাক্টিভ জিমেইল ডেলিভারি দিয়ে উচ্চ রেটে বোনাস পান।',
    category: 'gmail_sell',
    reward: 45,
    pointsReward: 55,
    durationSeconds: 60,
    requiresVerified: true,
    maxDaily: 15,
    icon: 'MailCheck',
    completedCount: 5120,
    submissionType: 'credentials',
    instructions: [
      'জিমেইল অ্যাড্রেস ও পাসওয়ার্ড সঠিকভাবে দিন।',
      'এডমিন টিম ৩-৫ মিনিটে চেক করে আপনার ব্যালেন্স ও পয়েন্ট যোগ করবে।'
    ],
  },

  // 4. Facebook Account Sell
  {
    id: 'task-fb-1',
    title: 'সক্রিয় ফেসবুক অ্যাকাউন্ট বিক্রি / সাবমিট',
    description: 'প্রোফাইল পিকচার ও ফ্রেন্ডস সহ ফেসবুক একাউন্ট সাবমিট করে সরাসরি ৳৬০ ইনকাম করুন।',
    category: 'facebook_sell',
    reward: 60,
    pointsReward: 75,
    durationSeconds: 60,
    requiresVerified: false,
    maxDaily: 10,
    icon: 'Facebook',
    completedCount: 3840,
    submissionType: 'credentials',
    instructions: [
      'ফেসবুক লগইন ইমেইল বা ফোন নম্বর ও পাসওয়ার্ড প্রদান করুন।',
      'টু-ফ্যাক্টর (2FA) অফ থাকলে দ্রুত অ্যাপ্রুভ হবে।'
    ],
    sampleCredentials: '01700000000 | FbPassword123 | 2FA: off',
  },

  // 5. Twitter (X) Account Sell
  {
    id: 'task-x-1',
    title: 'টুইটার (X) একাউন্ট ডেলিভারি ও বিক্রি',
    description: 'ইউজারনেম ও পাসওয়ার্ড সহ টুইটার (X) অ্যাকাউন্ট সাবমিট করুন।',
    category: 'twitter_sell',
    reward: 50,
    pointsReward: 60,
    durationSeconds: 60,
    requiresVerified: true,
    maxDaily: 10,
    icon: 'Twitter',
    completedCount: 2190,
    submissionType: 'credentials',
    instructions: [
      'টুইটার হ্যান্ডেল/ইমেইল এবং পাসওয়ার্ড সাবমিট করুন।'
    ],
    sampleCredentials: '@user_handle | X_pass_998',
  },

  // 6. Telegram Account Sell
  {
    id: 'task-tg-1',
    title: 'টেলিগ্রাম অ্যাকাউন্ট / ওটিপি সেশন সাবমিট',
    description: 'নতুন টেলিগ্রাম নাম্বার ও লগইন ওটিপি প্রদান করে ইনস্ট্যান্ট ৳৪০ ক্যাশ বোনাস নিন।',
    category: 'telegram_sell',
    reward: 40,
    pointsReward: 50,
    durationSeconds: 60,
    requiresVerified: false,
    maxDaily: 15,
    icon: 'Send',
    completedCount: 4620,
    submissionType: 'credentials',
    instructions: [
      'টেলিগ্রাম একাউন্টের কান্ট্রি কোড সহ ফোন নম্বর দিন।',
      'এডমিন কোড পাঠালে ওটিপি কোডটি চ্যাট/বক্সে সাবমিট করুন।'
    ],
    sampleCredentials: '+8801700000000 | OTP: 12345',
  },

  // 7. WhatsApp Account Sell
  {
    id: 'task-wa-1',
    title: 'সক্রিয় হোয়াটসঅ্যাপ অ্যাকাউন্ট ডেলিভারি',
    description: 'ফ্রেশ সক্রিয় হোয়াটসঅ্যাপ নাম্বার সাবমিট করে একাউন্ট প্রতি ৳৭০ ইনকাম করুন।',
    category: 'whatsapp_sell',
    reward: 70,
    pointsReward: 85,
    durationSeconds: 60,
    requiresVerified: true,
    maxDaily: 8,
    icon: 'MessageSquare',
    completedCount: 3180,
    submissionType: 'credentials',
    instructions: [
      'হোয়াটসঅ্যাপ ফোন নম্বর এবং ২-স্টেপ পিন (যদি থাকে) প্রদান করুন।'
    ],
    sampleCredentials: '01800000000 | PIN: 123456',
  },

  // 8. Product Selling / Affiliate Promotion
  {
    id: 'task-prod-1',
    title: 'ই-কমার্স প্রোডাক্ট বিক্রি / অর্ডার কনফার্মেশন',
    description: 'প্রদত্ত প্রোডাক্ট লিংক ফেসবুকে বা হোয়াটসঅ্যাপে শেয়ার করে কাস্টমার অর্ডার আইডি সাবমিট করে ৳১৫০ বোনাস পান।',
    category: 'product_sell',
    reward: 150,
    pointsReward: 150,
    durationSeconds: 90,
    requiresVerified: true,
    maxDaily: 10,
    icon: 'ShoppingBag',
    completedCount: 1890,
    submissionType: 'text',
    instructions: [
      'প্রোডাক্ট লিংকটি কপি করে আপনার সোশ্যাল গ্রুপ বা বন্ধুদের শেয়ার করুন।',
      'অর্ডার সম্পূর্ণ হলে প্রাপ্ত Order Invoice No. বা Customer Phone নিচে সাবমিট করুন।'
    ],
    sampleCredentials: 'Order ID: #ORD-99821, Customer: 01711223344',
  },

  // 9. Social Media & Apps
  {
    id: 'task-soc-1',
    title: 'অফিসিয়াল টেলিগ্রাম চ্যানেলে জয়েন ও পিন পোস্ট শেয়ার',
    description: 'আমাদের টেলিগ্রাম চ্যানেলে যুক্ত থাকুন এবং নোটিফিকেশন অন রাখুন।',
    category: 'social',
    reward: 20,
    pointsReward: 20,
    durationSeconds: 15,
    url: 'https://t.me/baizearn_support',
    requiresVerified: false,
    maxDaily: 1,
    icon: 'Send',
    completedCount: 8890,
    submissionType: 'none',
  },
  {
    id: 'task-app-1',
    title: 'পার্টনার অ্যাপ ডাউনলোড ও ৫ স্টার রেটিং',
    description: 'প্লে-স্টোর থেকে পার্টনার অ্যাপ ইনস্টল করে একটি পজিটিভ রিভিউ পোস্ট করুন।',
    category: 'app',
    reward: 55,
    pointsReward: 60,
    durationSeconds: 45,
    url: 'https://play.google.com',
    requiresVerified: true,
    maxDaily: 3,
    icon: 'Download',
    completedCount: 2980,
    submissionType: 'none',
  },
];

export const initialVerificationRequests: VerificationRequest[] = [
  {
    id: 'vr-101',
    userId: 'user-sabbir',
    userName: 'সাব্বির আহমেদ',
    userEmail: 'sabbir@example.com',
    paymentMethod: 'bkash',
    senderNumber: '01711223344',
    transactionId: 'BL98X22K91',
    amountBDT: 600,
    amountUSD: 5,
    adminNumber: '01965732537',
    status: 'pending',
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'vr-100',
    userId: 'user-baizid',
    userName: 'বাইজিদ হোসেন',
    userEmail: 'baizid2537@gmail.com',
    paymentMethod: 'nagad',
    senderNumber: '01965732537',
    transactionId: 'NG77Y19P02',
    amountBDT: 600,
    amountUSD: 5,
    adminNumber: '01965732537',
    status: 'approved',
    submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    reviewedAt: new Date(Date.now() - 86400000 * 5 + 900000).toISOString(),
  }
];

export const initialWithdrawals: WithdrawalRequest[] = [
  {
    id: 'wd-201',
    userId: 'user-baizid',
    userName: 'বাইজিদ হোসেন',
    userEmail: 'baizid2537@gmail.com',
    method: 'bkash',
    accountNumber: '01965732537',
    accountType: 'personal',
    amount: 500,
    fee: 10,
    netAmount: 490,
    status: 'approved',
    requestedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    processedAt: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(),
    adminTrxId: 'TRX99201948',
  },
  {
    id: 'wd-202',
    userId: 'user-baizid',
    userName: 'বাইজিদ হোসেন',
    userEmail: 'baizid2537@gmail.com',
    method: 'nagad',
    accountNumber: '01965732537',
    accountType: 'personal',
    amount: 300,
    fee: 5,
    netAmount: 295,
    status: 'pending',
    requestedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    userId: 'user-baizid',
    type: 'task_reward',
    amount: 35,
    description: 'ইউটিউব ভিডিও টাস্ক সম্পন্ন করার রিওয়ার্ড ও পয়েন্ট',
    status: 'success',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'tx-2',
    userId: 'user-baizid',
    type: 'referral_bonus',
    amount: 200,
    description: '১ম লেভেল সরাসরি ভেরিফাইড রেফারেল বোনাস (৳২০০)',
    status: 'success',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'tx-3',
    userId: 'user-baizid',
    type: 'level_referral_bonus',
    amount: 50,
    description: '২য় লেভেল সাব-টিম রেফারেল কমিশন (৳৫০)',
    status: 'success',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'tx-4',
    userId: 'user-baizid',
    type: 'withdrawal',
    amount: -500,
    description: 'বিকাশ নম্বরে উত্তোলন (অনুমোদিত)',
    status: 'success',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];
