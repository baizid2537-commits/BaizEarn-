import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Zap,
  PlayCircle,
  Youtube,
  Send,
  Facebook,
  Download,
  ClipboardList,
  Globe,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  X,
  ExternalLink,
  ShieldCheck,
  Mail,
  UserPlus,
  Twitter,
  MessageSquare,
  ShoppingBag,
  Award,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Task, TaskCategory } from '../../types';
import { TASK_CATEGORIES_CONFIG } from '../../utils/rankAndReferral';

export const TasksTab: React.FC = () => {
  const {
    currentUser,
    tasks,
    taskHistories,
    completeTask,
    setActiveTab,
    showToast,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTaskModal, setActiveTaskModal] = useState<Task | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Form submission state for Account sell / Signup / Product tasks
  const [credentialInput, setCredentialInput] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');

  const isVerified = currentUser?.accountStatus === 'verified';

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  // Handle opening task modal
  const handleStartTask = (task: Task) => {
    if (!currentUser) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (task.requiresVerified && !isVerified) {
      showToast('এই প্রিমিয়াম টাস্কটি করতে হলে অ্যাকাউন্ট ভেরিফাইড (৳৬০০) হতে হবে!', 'info');
      setActiveTab('verify');
      return;
    }

    setActiveTaskModal(task);
    setCountdown(task.durationSeconds);
    setTimerRunning(true);
    setTaskCompleted(false);
    setCredentialInput('');
    setAdditionalNote('');

    // If task has external URL, open it in background
    if (task.url) {
      window.open(task.url, '_blank');
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && countdown === 0) {
      setTimerRunning(false);
      setTaskCompleted(true);
    }
    return () => clearInterval(interval);
  }, [timerRunning, countdown]);

  const handleClaimReward = () => {
    if (!activeTaskModal) return;

    // If task requires credentials or text submission, check if filled
    if (activeTaskModal.submissionType === 'credentials' && !credentialInput.trim()) {
      showToast('অনুগ্রহ করে সঠিক অ্যাকাউন্ট ইউজারনেম/ইমেইল ও পাসওয়ার্ড প্রদান করুন!', 'error');
      return;
    }

    const payload = [credentialInput.trim(), additionalNote.trim()].filter(Boolean).join(' | ');

    const res = completeTask(activeTaskModal.id, payload || undefined);
    if (res.success) {
      setActiveTaskModal(null);
    }
  };

  const getCategoryIcon = (cat: TaskCategory) => {
    switch (cat) {
      case 'video':
        return <Youtube className="w-4 h-4 text-rose-400" />;
      case 'signup':
        return <UserPlus className="w-4 h-4 text-emerald-400" />;
      case 'gmail_sell':
        return <Mail className="w-4 h-4 text-amber-400" />;
      case 'facebook_sell':
        return <Facebook className="w-4 h-4 text-blue-400" />;
      case 'twitter_sell':
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case 'telegram_sell':
        return <Send className="w-4 h-4 text-cyan-400" />;
      case 'whatsapp_sell':
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case 'product_sell':
        return <ShoppingBag className="w-4 h-4 text-purple-400" />;
      case 'social':
        return <Send className="w-4 h-4 text-sky-400" />;
      case 'app':
        return <Download className="w-4 h-4 text-emerald-400" />;
      default:
        return <Zap className="w-4 h-4 text-[#FFC107]" />;
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TASK_CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shadow-sm ${
                isSelected
                  ? 'bg-gradient-to-r from-[#1769E0] to-[#00C853] text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </button>
          );
        })}
      </div>

      {/* Task Count & Info Bar */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-slate-400 font-semibold">
          মোট কাজ রয়েছে: <strong className="text-white">{filteredTasks.length}টি</strong>
        </span>
        <span className="text-[#FFC107] font-bold flex items-center gap-1">
          <Award className="w-3.5 h-3.5" /> কাজ করলেই নগদ টাকা + র্যাংক পয়েন্ট
        </span>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isTaskLocked = task.requiresVerified && !isVerified;
          const points = task.pointsReward || 25;

          return (
            <div
              key={task.id}
              className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-3xl p-4 sm:p-5 transition-all shadow-md space-y-3 relative overflow-hidden group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    {getCategoryIcon(task.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/5">
                        {TASK_CATEGORIES_CONFIG.find((c) => c.key === task.category)?.nameBn || task.category}
                      </span>
                      {task.requiresVerified && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> ভেরিফাইড অনলি
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-sm leading-snug">
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Reward & Points Badge */}
                <div className="text-right shrink-0">
                  <div className="font-['Poppins',sans-serif] text-base font-black text-[#00C853]">
                    ৳{task.reward}
                  </div>
                  <div className="text-[10px] font-extrabold text-[#FFC107] flex items-center justify-end gap-0.5">
                    <Zap className="w-2.5 h-2.5" /> +{points} পয়েন্ট
                  </div>
                </div>
              </div>

              {/* Task Footer Meta & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {task.durationSeconds} সেকেন্ড
                  </span>
                  <span>
                    সম্পন্ন: <strong className="text-slate-300">{task.completedCount || 0}</strong> বার
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartTask(task)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                    isTaskLocked
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                      : 'bg-[#1769E0] hover:bg-[#1255b8] text-white shadow-[#1769E0]/25'
                  }`}
                >
                  {isTaskLocked ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>ভেরিফাই করুন</span>
                    </>
                  ) : (
                    <>
                      <span>কাজ শুরু করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Execution / Submission Modal */}
      {activeTaskModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#071A35] border border-white/20 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  {getCategoryIcon(activeTaskModal.category)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{activeTaskModal.title}</h3>
                  <span className="text-[10px] text-slate-400">
                    রিওয়ার্ড: <strong className="text-[#00C853]">৳{activeTaskModal.reward}</strong> + <strong className="text-[#FFC107]">+{activeTaskModal.pointsReward || 25} পয়েন্ট</strong>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTaskModal(null);
                  setTimerRunning(false);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step by Step Instructions */}
            {activeTaskModal.instructions && activeTaskModal.instructions.length > 0 && (
              <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5 space-y-2">
                <div className="text-xs font-bold text-[#FFC107] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> কাজের নিয়মাবলী:
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {activeTaskModal.instructions.map((ins, i) => (
                    <li key={i} className="leading-relaxed">{ins}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timer & Verification Bar */}
            <div className="bg-black/30 rounded-2xl p-4 border border-white/10 text-center space-y-2">
              <div className="text-xs text-slate-400">টাস্ক কাউন্টডাউন ও ভেরিফিকেশন</div>
              <div className="font-['Poppins',sans-serif] text-3xl font-black text-[#FFC107]">
                {countdown > 0 ? `${countdown}s` : '✓ প্রস্তুত'}
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(
                        100,
                        ((activeTaskModal.durationSeconds - countdown) /
                          activeTaskModal.durationSeconds) *
                          100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Credential / Account Selling Inputs */}
            {activeTaskModal.submissionType === 'credentials' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    অ্যাকাউন্ট তথ্য (Email/ID এবং Password / 2FA status) *
                  </label>
                  <input
                    type="text"
                    value={credentialInput}
                    onChange={(e) => setCredentialInput(e.target.value)}
                    placeholder={activeTaskModal.sampleCredentials || 'example@gmail.com | Password123'}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1769E0]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    অতিরিক্ত নোট / ফোন নম্বর (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={additionalNote}
                    onChange={(e) => setAdditionalNote(e.target.value)}
                    placeholder="যেমন: রিকভারি নাম্বার যুক্ত নেই"
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1769E0]"
                  />
                </div>
              </div>
            )}

            {/* Text Submission (Signup / Order ID) */}
            {activeTaskModal.submissionType === 'text' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  রেজিস্ট্রেশন ইউজারনেম / অর্ডার ট্র্যাকিং আইডি *
                </label>
                <input
                  type="text"
                  value={credentialInput}
                  onChange={(e) => setCredentialInput(e.target.value)}
                  placeholder="যেমন: baizid2537 বা Order #99182"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1769E0]"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClaimReward}
                disabled={countdown > 0}
                className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  countdown === 0
                    ? 'bg-gradient-to-r from-[#00C853] to-emerald-600 hover:opacity-95 text-white shadow-emerald-500/25 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {countdown > 0
                    ? `অপেক্ষা করুন (${countdown} সেকেন্ড)`
                    : `রিওয়ার্ড ক্লেইম করুন (৳${activeTaskModal.reward} + ${activeTaskModal.pointsReward || 25} পয়েন্ট)`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
