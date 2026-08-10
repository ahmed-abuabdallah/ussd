import React from 'react';
import { Coins, X } from 'lucide-react';

interface AmountSectionProps {
  amount: string;
  onAmountChange: (val: string) => void;
}

export const AmountSection: React.FC<AmountSectionProps> = ({
  amount,
  onAmountChange,
}) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800/90 rounded-2xl p-3 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-2 transition-colors">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>المبلغ المطلوب تحويله (بالشيكل):</span>
        </label>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md">
          ₪ شيكل
        </span>
      </div>

      {/* Amount Input */}
      <div className="relative">
        <input
          type="number"
          dir="ltr"
          min="1"
          step="any"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0"
          className="w-full py-2.5 pl-9 pr-11 text-lg font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-mono text-right"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none font-bold text-sm">
          ₪
        </div>

        {amount && (
          <button
            type="button"
            onClick={() => onAmountChange('')}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            title="مسح المبلغ"
            aria-label="مسح المبلغ"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
