import React from 'react';
import { History, Download, Sun, Moon } from 'lucide-react';

interface HeaderBannerProps {
  onOpenHistory: () => void;
  onOpenInstall: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  historyCount: number;
  favoritesCount: number;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onOpenHistory,
  onOpenInstall,
  isDarkMode,
  onToggleDarkMode,
  historyCount,
  favoritesCount,
}) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white pt-3 pb-3 px-3.5 rounded-b-2xl shadow-md border-b border-indigo-500/20">
      {/* Background glow and decorative elements */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-2">
        {/* Title */}
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-black tracking-tight text-white drop-shadow-sm leading-tight truncate">
            صانع الكود المختصر <span className="text-emerald-400 font-extrabold">USSD</span>
          </h1>
          <p className="text-[10px] sm:text-[11px] font-medium text-blue-100/90 truncate mt-0.5 flex items-center gap-1">
            <span>تحويل الأموال عبر المحافظ</span>
            <span className="inline-flex items-center gap-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded-full font-bold border border-emerald-400/30">
              ⚡ بدون إنترنت
            </span>
          </p>
        </div>

        {/* Action Buttons: Dark Mode, Install & History */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md border border-white/20 shadow-xs text-amber-300 hover:text-amber-200 flex items-center justify-center"
            title={isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
            aria-label={isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-200 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Install App Button */}
          <button
            type="button"
            onClick={onOpenInstall}
            className="group py-1.5 px-2 sm:px-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 active:scale-95 transition-all backdrop-blur-md border border-emerald-400/30 shadow-xs text-emerald-300 hover:text-white flex items-center gap-1"
            title="تثبيت التطبيق على جهازك"
            aria-label="تثبيت التطبيق"
          >
            <Download className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">تثبيت</span>
          </button>

          {/* History Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="relative group py-1.5 px-2 sm:px-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md border border-white/20 shadow-xs text-white flex items-center gap-1"
            title="سجل التحويلات والمفضلة"
            aria-label="سجل التحويلات والمفضلة"
          >
            <div className="relative shrink-0">
              <History className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
              {(historyCount > 0 || favoritesCount > 0) && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-extrabold text-white ring-2 ring-indigo-900">
                  {historyCount + favoritesCount}
                </span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">السجل</span>
          </button>
        </div>
      </div>
    </header>
  );
};


