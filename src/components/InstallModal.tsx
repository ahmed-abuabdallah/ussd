import React from 'react';
import { Download, X, Smartphone, Share, PlusSquare, Check } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallNative: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallNative,
}) => {
  if (!isOpen) return null;

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

        <div className="flex items-center gap-3">
          <img
            src="./app_icon.jpg"
            alt="أيقونة التطبيق"
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 object-cover"
          />
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">تثبيت التطبيق على جهازك</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <span>وصول سريع</span>
              <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/50">
                ⚡ يعمل 100% بدون إنترنت
              </span>
            </p>
          </div>
        </div>

        {deferredPrompt ? (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
              يمكنك الآن تثبيت تطبيق &quot;صانع الكود المختصر USSD&quot; بنقرة واحدة كأنك تثبته من متجر التطبيقات:
            </p>
            <button
              type="button"
              onClick={onInstallNative}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-5 h-5 animate-bounce" />
              <span>تثبيت الآن على الهاتف</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 pt-1">
            <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-2">
              <p className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>طريقة التثبيت السريعة:</span>
              </p>

              <div className="space-y-1.5 pr-1">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span><strong>في الآيفون (Safari):</strong> انقر على زر المشاركة <Share className="w-3.5 h-3.5 inline text-blue-600 dark:text-blue-400" /> أسفل الشاشة، ثم اختر <strong>&quot;إضافة إلى الشاشة الرئيسية&quot;</strong> <PlusSquare className="w-3.5 h-3.5 inline text-slate-700 dark:text-slate-300" />.</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span><strong>في الأندرويد (Chrome):</strong> انقر على القائمة (⋮) أعلى اليسار، ثم اختر <strong>&quot;تثبيت التطبيق&quot;</strong> أو <strong>&quot;إضافة إلى الشاشة الرئيسية&quot;</strong>.</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>حسناً، فهمت ذلك</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
