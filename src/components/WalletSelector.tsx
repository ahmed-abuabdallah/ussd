import React from 'react';
import { WalletType } from '../types';
import { WALLETS } from '../utils/ussd';
import { Smartphone, CreditCard, CheckCircle2 } from 'lucide-react';

interface WalletSelectorProps {
  selectedWallet: WalletType;
  onSelectWallet: (wallet: WalletType) => void;
}

export const WalletSelector: React.FC<WalletSelectorProps> = ({
  selectedWallet,
  onSelectWallet,
}) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800/90 rounded-2xl p-2.5 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-colors">
      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 px-1">
        اختر المحفظة الإلكترونية:
      </label>
      <div className="grid grid-cols-2 gap-2">
        {/* Jawwal Pay */}
        <button
          type="button"
          onClick={() => onSelectWallet('jawwal_pay')}
          className={`relative flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border ${
            selectedWallet === 'jawwal_pay'
              ? 'bg-[#00A859] text-white border-[#00A859] shadow-md shadow-[#00A859]/25 scale-[1.01]'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              selectedWallet === 'jawwal_pay'
                ? 'bg-white/20 text-white'
                : 'bg-[#00A859]/10 text-[#00A859] dark:bg-[#00A859]/20'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </div>
          <span>{WALLETS.jawwal_pay.nameAr}</span>
          {selectedWallet === 'jawwal_pay' && (
            <CheckCircle2 className="w-3.5 h-3.5 text-white ml-auto" />
          )}
        </button>

        {/* PalPay */}
        <button
          type="button"
          onClick={() => onSelectWallet('palpay')}
          className={`relative flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border ${
            selectedWallet === 'palpay'
              ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-md shadow-[#7C3AED]/25 scale-[1.01]'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              selectedWallet === 'palpay'
                ? 'bg-white/20 text-white'
                : 'bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#7C3AED]/20'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
          </div>
          <span>{WALLETS.palpay.nameAr}</span>
          {selectedWallet === 'palpay' && (
            <CheckCircle2 className="w-3.5 h-3.5 text-white ml-auto" />
          )}
        </button>
      </div>
    </div>
  );
};
