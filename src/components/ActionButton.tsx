import React from 'react';
import { PhoneCall, CopyCheck, ArrowLeft } from 'lucide-react';

interface ActionButtonProps {
  onDial: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onDial,
  disabled = false,
}) => {
  return (
    <div className="w-full pt-0.5">
      <button
        type="button"
        onClick={onDial}
        disabled={disabled}
        className={`w-full relative group overflow-hidden py-3 px-5 rounded-2xl font-black text-base text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 ${
          disabled
            ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.99] shadow-emerald-600/25 ring-2 ring-emerald-500/20'
        }`}
      >
        {/* Shine highlight */}
        {!disabled && (
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        )}

        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
          <PhoneCall className="w-4 h-4 text-white animate-bounce" />
        </div>

        <span className="tracking-wide">اتصال</span>

        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform mr-auto" />
      </button>
    </div>
  );
};
