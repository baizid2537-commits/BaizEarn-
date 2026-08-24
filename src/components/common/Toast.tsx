import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#1769E0] shrink-0" />,
  };

  const borderColors = {
    success: 'border-[#00C853]/40 bg-[#071A35]/95',
    error: 'border-rose-500/40 bg-[#071A35]/95',
    info: 'border-[#1769E0]/40 bg-[#071A35]/95',
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl text-white ${
          borderColors[toast.type]
        }`}
      >
        {icons[toast.type]}
        <div className="text-xs sm:text-sm font-medium leading-snug flex-1">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
