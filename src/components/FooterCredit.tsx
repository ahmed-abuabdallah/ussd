import React from 'react';
import { Heart } from 'lucide-react';

export const FooterCredit: React.FC = () => {
  return (
    <footer className="w-full">
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-2.5 shadow-sm border border-slate-200/80 dark:border-slate-700/80 text-center space-y-0.5 transition-colors">
        <p className="text-xs font-black text-slate-800 dark:text-slate-100">
          تصميم : أحمد جمال أبوعبدالله
        </p>
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 fill-red-500 text-red-500 inline" />
          <span>صدقة جارية عن روح أبي رحمه الله</span>
        </p>
      </div>
    </footer>
  );
};
