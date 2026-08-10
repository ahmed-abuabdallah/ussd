import React from 'react';
import { Info, WifiOff } from 'lucide-react';

export const NoticeBanner: React.FC = () => {
  return (
    <div className="w-full space-y-2">
      {/* Offline Ready Banner */}
      <div className="w-full bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/60 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-emerald-950 dark:text-emerald-200 shadow-sm transition-colors">
        <WifiOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="leading-tight font-semibold">
          <strong>يعمل بدون إنترنت:</strong> تطبيق USSD ينفذ العمليات عبر اتصال الهاتف المباشر دون الحاجة لشبكة الإنترنت.
        </p>
      </div>

      {/* Quick USSD Call Notice */}
      <div className="w-full bg-amber-50/90 dark:bg-amber-950/60 border border-amber-200/90 dark:border-amber-800/60 rounded-xl p-2 flex items-center gap-2 text-[11px] text-amber-900 dark:text-amber-200 shadow-sm transition-colors">
        <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
        <p className="leading-tight font-semibold">
          <strong>تنبيه:</strong> سيتم فتح لوحة الاتصال بالكود المجهز، فقط اضغط على (اتصال).
        </p>
      </div>
    </div>
  );
};



