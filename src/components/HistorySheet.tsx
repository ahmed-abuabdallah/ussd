import React, { useState } from 'react';
import { TransferHistoryItem, FavoriteContact, WalletType } from '../types';
import { WALLETS } from '../utils/ussd';
import {
  History,
  Star,
  X,
  Trash2,
  Clock,
  ArrowUpRight,
  PhoneCall,
  Smartphone,
  CreditCard,
  Plus,
  AlertCircle
} from 'lucide-react';

interface HistorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  history: TransferHistoryItem[];
  favorites: FavoriteContact[];
  onSelectHistoryItem: (item: TransferHistoryItem) => void;
  onSelectFavoriteItem: (fav: FavoriteContact) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onDeleteFavoriteItem: (id: string) => void;
  onOpenAddFavorite: () => void;
}

export const HistorySheet: React.FC<HistorySheetProps> = ({
  isOpen,
  onClose,
  history,
  favorites,
  onSelectHistoryItem,
  onSelectFavoriteItem,
  onDeleteHistoryItem,
  onClearHistory,
  onDeleteFavoriteItem,
  onOpenAddFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    
    const timeStr = d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    if (isToday) {
      return `اليوم ${timeStr}`;
    }
    return `${d.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })} - ${timeStr}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Modal content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[85vh] flex flex-col z-10 animate-slideUp overflow-hidden transition-colors">
        
        {/* Top Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-3 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              {activeTab === 'history' ? <History className="w-5 h-5" /> : <Star className="w-5 h-5 text-amber-500 fill-amber-500" />}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {activeTab === 'history' ? 'سجل التحويلات والعمليات' : 'الأرقام والمواقع المفضلة'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeTab === 'history' ? `إجمالي العمليات: ${history.length}` : `إجمالي المفضلة: ${favorites.length}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="px-5 pt-3 pb-1 bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>سجل التحويلات ({history.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'favorites'
                  ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>المفضلة ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Scrollable Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3 min-h-[280px]">
          {activeTab === 'history' ? (
            /* TAB 1: HISTORY */
            <>
              {history.length > 0 && (
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">اضغط على أي عملية لإعادة تعبئتها:</span>
                  {!showClearConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(true)}
                      className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 border border-red-200/60 dark:border-red-800/50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>مسح السجل بالكامل</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/80 p-1.5 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="text-[11px] font-bold text-red-800 dark:text-red-200">تأكيد المسح؟</span>
                      <button
                        type="button"
                        onClick={() => {
                          onClearHistory();
                          setShowClearConfirm(false);
                        }}
                        className="text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded hover:bg-red-700"
                      >
                        نعم
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(false)}
                        className="text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded"
                      >
                        إلغاء
                      </button>
                    </div>
                  )}
                </div>
              )}

              {history.length === 0 ? (
                <div className="py-12 text-center space-y-3 text-slate-400 dark:text-slate-500">
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 flex items-center justify-center mx-auto">
                    <History className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">لا يوجد سجل تحويلات حتى الآن</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">التحويلات التي تقوم بها ستظهر هنا تلقائياً</p>
                </div>
              ) : (
                history.map((item) => {
                  const walletInfo = WALLETS[item.wallet] || WALLETS.jawwal_pay;
                  return (
                    <div
                      key={item.id}
                      className="group relative bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3"
                    >
                      {/* Left: Action trigger */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectHistoryItem(item);
                          onClose();
                        }}
                        className="flex-1 text-right flex items-center gap-3"
                      >
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                            item.wallet === 'jawwal_pay' ? 'bg-[#00A859]' : 'bg-[#7C3AED]'
                          }`}
                        >
                          {item.wallet === 'jawwal_pay' ? (
                            <Smartphone className="w-5 h-5" />
                          ) : (
                            <CreditCard className="w-5 h-5" />
                          )}
                        </div>

                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {item.contactName || item.phone}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${walletInfo.badgeBg}`}
                            >
                              {walletInfo.nameAr}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="font-mono dir-ltr text-slate-700 dark:text-slate-300 font-bold">
                              {item.phone}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                              <Clock className="w-3 h-3" />
                              {formatDate(item.timestamp)}
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Right: Amount & Delete */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-left bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700/80">
                          <span className="block font-black text-emerald-700 dark:text-emerald-400 text-base font-mono">
                            {item.amount} ₪
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDeleteHistoryItem(item.id)}
                          className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors"
                          title="حذف من السجل"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          ) : (
            /* TAB 2: FAVORITES */
            <>
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">جهات الاتصال والمحلات المفضلة:</span>
                <button
                  type="button"
                  onClick={onOpenAddFavorite}
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 border border-amber-200 dark:border-amber-800/60"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة مفضلة جديدة</span>
                </button>
              </div>

              {favorites.length === 0 ? (
                <div className="py-12 text-center space-y-3 text-slate-400 dark:text-slate-500">
                  <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/50 text-amber-400 flex items-center justify-center mx-auto">
                    <Star className="w-8 h-8 fill-amber-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">لا توجد أرقام في المفضلة</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">يمكنك حفظ الأرقام الشائعة هنا لسرعة التحويل بنقرة واحدة</p>
                </div>
              ) : (
                favorites.map((fav) => {
                  const wInfo = fav.wallet ? WALLETS[fav.wallet] : null;
                  return (
                    <div
                      key={fav.id}
                      className="bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 hover:border-amber-300 dark:hover:border-amber-500/80 rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onSelectFavoriteItem(fav);
                          onClose();
                        }}
                        className="flex-1 text-right flex items-center gap-3"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                          <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {fav.name}
                            </span>
                            {wInfo && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${wInfo.badgeBg}`}>
                                {wInfo.nameAr}
                              </span>
                            )}
                          </div>
                          <span className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-300 dir-ltr text-right">
                            {fav.phone}
                          </span>
                        </div>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectFavoriteItem(fav);
                            onClose();
                          }}
                          className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold text-xs rounded-xl border border-amber-200 dark:border-amber-800/60 transition-colors flex items-center gap-1"
                        >
                          <span>اختيار</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteFavoriteItem(fav.id)}
                          className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors"
                          title="حذف من المفضلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>

        {/* Footer info in Sheet */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            انقر على أي عنصر لإعادة استخدامه مباشرة في الشاشة الرئيسية
          </p>
        </div>
      </div>
    </div>
  );
};
