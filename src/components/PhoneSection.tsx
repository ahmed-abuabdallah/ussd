import React from 'react';
import { FavoriteContact } from '../types';
import { Phone, X, Star, UserCheck, Plus } from 'lucide-react';

interface PhoneSectionProps {
  phone: string;
  onPhoneChange: (val: string) => void;
  favorites: FavoriteContact[];
  onSelectFavorite: (fav: FavoriteContact) => void;
  onOpenSaveFavoriteModal: () => void;
  selectedFavoriteName?: string;
}

export const PhoneSection: React.FC<PhoneSectionProps> = ({
  phone,
  onPhoneChange,
  favorites,
  onSelectFavorite,
  onOpenSaveFavoriteModal,
  selectedFavoriteName,
}) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800/90 rounded-2xl p-3 shadow-sm border border-slate-200/80 dark:border-slate-700/80 space-y-2 transition-colors">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>رقم جوال المستلم:</span>
        </label>
        {phone.trim().length >= 9 && (
          <button
            type="button"
            onClick={onOpenSaveFavoriteModal}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 px-2 py-0.5 rounded-lg border border-amber-200/80 dark:border-amber-800/50 transition-colors"
          >
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>حفظ بالمفضلة</span>
          </button>
        )}
      </div>

      {/* Input container */}
      <div className="relative">
        <input
          type="tel"
          dir="ltr"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="0599123456"
          maxLength={10}
          className="w-full py-2.5 pl-9 pr-11 text-base font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono tracking-wider text-right"
        />

        {/* Start Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
          <Phone className="w-4 h-4" />
        </div>

        {/* Clear Icon */}
        {phone && (
          <button
            type="button"
            onClick={() => onPhoneChange('')}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            title="مسح الرقم"
            aria-label="مسح الرقم"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Display selected contact name if matching */}
      {selectedFavoriteName && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>المستلم المحدد: <strong className="font-bold">{selectedFavoriteName}</strong></span>
        </div>
      )}

      {/* Horizontal Pills for Favorites */}
      {favorites.length > 0 && (
        <div className="pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 px-1">
            <span>المفضلة السريعة:</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal text-[10px]">انقر للاختيار</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none dir-rtl">
            {favorites.map((fav) => {
              const isSelected = phone === fav.phone;
              return (
                <button
                  key={fav.id}
                  type="button"
                  onClick={() => onSelectFavorite(fav)}
                  className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <Star className={`w-3 h-3 ${isSelected ? 'fill-white text-white' : 'text-amber-500'}`} />
                  <span>{fav.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
