import { NavItem, StatItem, FeatureItem, StepItem, SecurityPoint } from '../types';

export const navLinks: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Referral', href: '#referral' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const statisticsData: StatItem[] = [
  {
    id: 'users',
    value: '10K+',
    label: 'Registered Users',
    subtext: 'Global community members',
    iconName: 'Users',
  },
  {
    id: 'tasks',
    value: '50K+',
    label: 'Tasks Completed',
    subtext: 'Verified activity submissions',
    iconName: 'CheckCircle2',
  },
  {
    id: 'active',
    value: '5K+',
    label: 'Active Members',
    subtext: 'Engaged daily users',
    iconName: 'Activity',
  },
  {
    id: 'support',
    value: '24/7',
    label: 'Platform Support',
    subtext: 'Reliable help desk',
    iconName: 'Headphones',
  },
];

export const featuresData: FeatureItem[] = [
  {
    id: 1,
    title: 'Task Center',
    description: 'Explore available tasks and manage your task activity.',
    iconName: 'ListChecks',
    tag: 'Core Hub',
  },
  {
    id: 2,
    title: 'Referral Program',
    description: 'Build your eligible referral network and monitor your team.',
    iconName: 'Share2',
    tag: 'Network',
  },
  {
    id: 3,
    title: 'Digital Wallet',
    description: 'View your available and pending balances in one place.',
    iconName: 'Wallet',
    tag: 'Fintech',
  },
  {
    id: 4,
    title: 'Income History',
    description: 'Track your earning activity by day, week and month.',
    iconName: 'TrendingUp',
    tag: 'Analytics',
  },
  {
    id: 5,
    title: 'Transaction History',
    description: 'Review your account transactions with clear status information.',
    iconName: 'Receipt',
    tag: 'Transparency',
  },
  {
    id: 6,
    title: 'Support Center',
    description: 'Get help and manage support requests easily.',
    iconName: 'LifeBuoy',
    tag: 'Assistance',
  },
];

export const stepsData: StepItem[] = [
  {
    step: '01',
    title: 'Create Account',
    description: 'Create your BaizEarn account.',
    details: 'Quick and easy registration process with zero upfront setup fees.',
    iconName: 'UserPlus',
  },
  {
    step: '02',
    title: 'Verify Account',
    description: 'Complete the required verification process.',
    details: 'Ensure account safety and unlock platform privileges securely.',
    iconName: 'ShieldCheck',
  },
  {
    step: '03',
    title: 'Explore Tasks',
    description: 'Discover available tasks and activities.',
    details: 'Browse categorized digital activities tailored for eligible users.',
    iconName: 'Compass',
  },
  {
    step: '04',
    title: 'Earn Eligible Rewards',
    description: 'Complete eligible activities and receive applicable rewards.',
    details: 'Tasks are reviewed with transparent criteria and automated validation.',
    iconName: 'Award',
  },
  {
    step: '05',
    title: 'Manage Your Earnings',
    description: 'Track your eligible earnings and account activity.',
    details: 'Monitor balances and request supported payouts with full records.',
    iconName: 'WalletCards',
  },
];

export const whyFeatures = [
  {
    title: 'Modern Dashboard',
    desc: 'Clean, intuitive workspace designed for quick task management and overview.',
  },
  {
    title: 'Easy Navigation',
    desc: 'Frictionless layout allowing you to switch between tasks, wallet, and team.',
  },
  {
    title: 'Transparent Activity History',
    desc: 'Real-time itemized logs for every single completed task and reward state.',
  },
  {
    title: 'Mobile Friendly',
    desc: 'Optimized touch experience that works seamlessly across all phone browsers.',
  },
  {
    title: 'Secure Architecture',
    desc: 'Engineered with bank-grade encryption protocols and session protections.',
  },
  {
    title: 'Dedicated Support',
    desc: 'Knowledgeable support team ready to assist with account and platform inquiries.',
  },
];

export const securityPoints: SecurityPoint[] = [
  {
    title: 'Secure Authentication',
    description: 'Multi-factor authentication and tokenized session controls protect your account.',
    iconName: 'Lock',
  },
  {
    title: 'Protected Account Access',
    description: 'Continuous monitoring and suspicious activity alerts maintain account safety.',
    iconName: 'Shield',
  },
  {
    title: 'Transparent Activity Records',
    description: 'Every point, reward, and task verification is logged immutably for clarity.',
    iconName: 'FileText',
  },
  {
    title: 'Responsive Support',
    description: 'Direct ticketing and guided help center to resolve any inquiries promptly.',
    iconName: 'Headphones',
  },
  {
    title: 'Privacy-Focused Architecture',
    description: 'Strict adherence to data privacy standards — your data is never sold or misused.',
    iconName: 'EyeOff',
  },
];

export const faqsData = [
  {
    q: 'What is BaizEarn?',
    a: 'BaizEarn is a modern digital platform designed for members to complete eligible tasks, build referral networks, and manage digital rewards securely in one intuitive hub.',
  },
  {
    q: 'How do I start earning on BaizEarn?',
    a: 'Simply create a free account, complete the quick verification step, browse available tasks in the Task Center, and follow the instructions to receive eligible rewards.',
  },
  {
    q: 'How does the Referral Program work?',
    a: 'Once registered, you receive a unique referral link. When eligible friends sign up and participate, both you and your invitees can earn bonus platform perks as specified in your dashboard.',
  },
  {
    q: 'Is BaizEarn mobile friendly?',
    a: 'Yes! BaizEarn is fully responsive and optimized for smartphones, tablets, laptops, and desktop computers without needing a separate app download.',
  },
];
