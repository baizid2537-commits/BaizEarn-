import React from 'react';
import { Home, CheckSquare, ShieldCheck, Wallet, Users, Disc, User, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentUser } = useApp();

  const isUnverified = currentUser?.accountStatus === 'regular';

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string; highlight?: boolean }[] = [
    {
      id: 'home',
      label: 'হোম',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'tasks',
      label: 'টাস্ক',
      icon: <CheckSquare className="w-5 h-5" />,
      badge: '৭টি',
    },
    {
      id: 'verify',
      label: 'ভেরিফাই',
      icon: <ShieldCheck className="w-5 h-5" />,
      highlight: isUnverified,
      badge: isUnverified ? '$5' : undefined,
    },
    {
      id: 'wallet',
      label: 'ওয়ালেট',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 'refer',
      label: 'রেফার',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'spin',
      label: 'স্পিন',
      icon: <Disc className="w-5 h-5" />,
      badge: 'ফ্রি',
    },
    ...(currentUser?.role === 'admin'
      ? [
          {
            id: 'admin' as ActiveTab,
            label: 'এডমিন',
            icon: <ShieldAlert className="w-5 h-5 text-[#FFC107]" />,
            badge: 'প্যানেল',
          },
        ]
      : []),
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-[#071A35]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 text-white">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              id={`bottom-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#00C853] font-bold scale-105'
                  : item.highlight
                  ? 'text-[#FFC107] font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Badge */}
              {item.badge && (
                <span
                  className={`absolute -top-1 right-0 text-[9px] font-black px-1.5 py-0.2 rounded-full leading-tight shadow-sm ${
                    item.highlight
                      ? 'bg-[#00C853] text-white animate-bounce'
                      : 'bg-[#1769E0] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Icon Container with subtle glow on active */}
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-[#00C853]/15 text-[#00C853]' : ''
                }`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="w-1 h-1 bg-[#00C853] rounded-full mt-0.5 shadow-xs" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
