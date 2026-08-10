import React, { useState } from 'react';
import { WalletType } from '../types';
import { WALLETS } from '../utils/ussd';
import { Star, X, Check } from 'lucide-react';

interface SaveFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  defaultWallet: WalletType;
  onSave: (name: string, phone: string, wallet: WalletType) => void;
}

export const SaveFavoriteModal: React.FC<SaveFavoriteModalProps> = ({
  isOpen,
  onClose,
  phone,
  defaultWallet,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<WalletType>(defaultWallet);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), phone, selectedWallet);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4 relative transition-colors">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">إضافة إلى المفضلة</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">حفظ الرقم لسهولة الوصول إليه لاحقاً</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              اسم الشخص أو المحل (مثال: أبو أحمد):
            </label>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل الاسم المخصص..."
              className="w-full py-2.5 px-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-amber-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              رقم الهاتف:
            </label>
            <input
              type="text"
              readOnly
              value={phone}
              className="w-full py-2 px-3.5 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 font-mono text-left dir-ltr cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              المحفظة المفضلة لهذا الرقم:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['jawwal_pay', 'palpay'] as WalletType[]).map((wKey) => {
                const w = WALLETS[wKey];
                const isSel = selectedWallet === wKey;
                return (
                  <button
                    key={wKey}
                    type="button"
                    onClick={() => setSelectedWallet(wKey)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      isSel
                        ? `${w.activeBg} text-white ${w.activeBorder}`
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {w.nameAr}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>حفظ في المفضلة</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
