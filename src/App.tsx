import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileHeader } from './components/mobile/MobileHeader';
import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { HomeTab } from './components/mobile/HomeTab';
import { TasksTab } from './components/mobile/TasksTab';
import { VerificationTab } from './components/mobile/VerificationTab';
import { WalletTab } from './components/mobile/WalletTab';
import { ReferralTab } from './components/mobile/ReferralTab';
import { SpinTab } from './components/mobile/SpinTab';
import { ProfileTab } from './components/mobile/ProfileTab';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { Toast } from './components/common/Toast';
import { Smartphone, Sparkles, ShieldCheck, ShieldAlert } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, viewMode, currentUser } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'tasks':
        return <TasksTab />;
      case 'verify':
        return <VerificationTab />;
      case 'wallet':
        return <WalletTab />;
      case 'refer':
        return <ReferralTab />;
      case 'spin':
        return <SpinTab />;
      case 'profile':
        return <ProfileTab />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#040E1E] text-slate-100 flex flex-col items-center justify-start selection:bg-[#1769E0] selection:text-white">
      {/* Background Decorative Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1769E0]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[400px] bg-[#00C853]/10 rounded-full blur-[130px]" />
      </div>

      {/* Main Container */}
      <div
        className={`w-full relative z-10 transition-all duration-300 ${
          viewMode === 'mobile_frame'
            ? 'max-w-[440px] my-0 sm:my-6 sm:rounded-[40px] sm:border-[8px] sm:border-slate-800/90 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-[#071A35]'
            : 'max-w-4xl mx-auto min-h-screen bg-[#071A35]'
        }`}
      >
        {/* Smartphone Notch Bar (only visible in mobile frame on larger screens) */}
        {viewMode === 'mobile_frame' && (
          <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-[#071A35] text-[11px] text-slate-400 font-mono select-none">
            <span>৯:৪১</span>
            <div className="w-20 h-4 rounded-full bg-slate-900 mx-auto border border-white/5" />
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 rounded-sm border border-slate-400 p-0.5 flex items-center">
                <div className="w-full h-full bg-[#00C853] rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* Top Header */}
        <MobileHeader />

        {/* Dynamic Scrollable Body View */}
        <main className="p-3 sm:p-4 min-h-[calc(100vh-130px)]">
          {renderActiveTab()}
        </main>

        {/* Sticky Bottom Navigation Bar */}
        <MobileBottomNav />
      </div>

      {/* Modals & Floating Notifications */}
      <AuthModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
