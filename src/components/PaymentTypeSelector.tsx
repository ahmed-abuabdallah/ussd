import React from 'react';
import { PaymentType, WalletType } from '../types';
import { UserCheck, Store, Check } from 'lucide-react';

interface PaymentTypeSelectorProps {
  paymentType: PaymentType;
  onSelectPaymentType: (type: PaymentType) => void;
  selectedWallet?: WalletType;
}

export const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({
  paymentType,
  onSelectPaymentType,
  selectedWallet = 'jawwal_pay',
}) => {
  const isJawwal = selectedWallet === 'jawwal_pay';

  // Light gray active styling in light mode, sleek slate active in dark mode
  const activeBgClass =
    'bg-slate-200 text-slate-900 border-slate-300 ring-2 ring-slate-300/60 dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:ring-slate-500/40 shadow-sm scale-[1.01]';

  const selectedIconClass = 'bg-white text-slate-800 dark:bg-slate-600 dark:text-white shadow-xs';
  const unselectedIconClass = 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';

  return (
    <div className="w-full bg-white dark:bg-slate-800/90 rounded-2xl p-2.5 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition-colors">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">
          نوع العملية:
        </label>
        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/70 px-2 py-0.5 rounded-full">
          اختر الوجهة
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Pay to Friend (دفع لصديق) */}
        <button
          type="button"
          onClick={() => onSelectPaymentType('friend')}
          className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-200 border text-center ${
            paymentType === 'friend'
              ? activeBgClass
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {paymentType === 'friend' && (
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-slate-600/20 dark:bg-slate-400/20 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-slate-800 dark:text-slate-200 stroke-[3]" />
            </div>
          )}

          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 transition-colors ${
              paymentType === 'friend'
                ? selectedIconClass
                : unselectedIconClass
            }`}
          >
            <UserCheck className="w-5 h-5" />
          </div>

          <span className="font-extrabold text-xs sm:text-sm leading-tight">
            دفع لصديق
          </span>
        </button>

        {/* Pay to Merchant (دفع لتاجر) */}
        <button
          type="button"
          onClick={() => onSelectPaymentType('merchant')}
          className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-200 border text-center ${
            paymentType === 'merchant'
              ? activeBgClass
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {paymentType === 'merchant' && (
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-slate-600/20 dark:bg-slate-400/20 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-slate-800 dark:text-slate-200 stroke-[3]" />
            </div>
          )}

          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 transition-colors ${
              paymentType === 'merchant'
                ? selectedIconClass
                : unselectedIconClass
            }`}
          >
            <Store className="w-5 h-5" />
          </div>

          <span className="font-extrabold text-xs sm:text-sm leading-tight">
            دفع لتاجر
          </span>
        </button>
      </div>
    </div>
  );
};

