import React, { useState, useEffect } from 'react';
import {
  WalletType,
  PaymentType,
  TransferHistoryItem,
  FavoriteContact,
} from './types';
import {
  WALLETS,
  getFavorites,
  getHistory,
  addFavorite,
  deleteFavorite,
  addHistoryItem,
  deleteHistoryItem,
  clearHistory,
  validatePhone,
  validateAmount,
  executeUSSDDial,
  sanitizePhone,
} from './utils/ussd';
import { HeaderBanner } from './components/HeaderBanner';
import { PaymentTypeSelector } from './components/PaymentTypeSelector';
import { WalletSelector } from './components/WalletSelector';
import { PhoneSection } from './components/PhoneSection';
import { AmountSection } from './components/AmountSection';
import { ActionButton } from './components/ActionButton';
import { NoticeBanner } from './components/NoticeBanner';
import { FooterCredit } from './components/FooterCredit';
import { HistorySheet } from './components/HistorySheet';
import { SaveFavoriteModal } from './components/SaveFavoriteModal';
import { InstallModal } from './components/InstallModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  const [paymentType, setPaymentType] = useState<PaymentType>('friend');
  const [selectedWallet, setSelectedWallet] = useState<WalletType>('jawwal_pay');
  const [phone, setPhone] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [favorites, setFavorites] = useState<FavoriteContact[]>([]);
  const [history, setHistory] = useState<TransferHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isSaveFavoriteOpen, setIsSaveFavoriteOpen] = useState<boolean>(false);
  const [isInstallOpen, setIsInstallOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Dark Mode State with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      // Default to system preference if available
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Sync dark mode class with HTML element & localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Load favorites & history on mount + listen for PWA install prompt & first visit auto popup
  useEffect(() => {
    setFavorites(getFavorites());
    setHistory(getHistory());

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Auto show install popup on first visit
    try {
      const hasSeenPopup = localStorage.getItem('hasSeenInstallPrompt_v3');
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsInstallOpen(true);
          localStorage.setItem('hasSeenInstallPrompt_v3', 'true');
        }, 600);
        return () => {
          clearTimeout(timer);
          window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
      }
    } catch {
      // Fallback
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallNative = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        showToast('success', 'تم تثبيت التطبيق!', 'شكراً لتثبيت تطبيق صانع الكود المختصر على هاتفك');
      }
      setDeferredPrompt(null);
      setIsInstallOpen(false);
    }
  };

  // Check if current phone matches a favorite name
  const matchedFav = favorites.find((f) => f.phone === sanitizePhone(phone));

  const handlePhoneChange = (val: string) => {
    const cleaned = sanitizePhone(val);
    setPhone(cleaned);
  };

  const handleSelectFavorite = (fav: FavoriteContact) => {
    setPhone(fav.phone);
    if (fav.wallet) {
      setSelectedWallet(fav.wallet);
    }
  };

  const handleSelectHistoryItem = (item: TransferHistoryItem) => {
    setSelectedWallet(item.wallet);
    if (item.paymentType) {
      setPaymentType(item.paymentType);
    }
    setPhone(item.phone);
    setAmount(item.amount);
    const typeText = item.paymentType === 'merchant' ? 'دفع لتاجر' : 'دفع لصديق';
    showToast('info', 'تم تعبئة البيانات', `النوع: ${typeText} | المحفظة: ${WALLETS[item.wallet].nameAr} | المبلغ: ${item.amount} ₪`);
  };

  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    setToast({
      id: Date.now().toString(),
      type,
      title,
      message,
    });
  };

  const handleDial = async () => {
    // 1. Validate phone
    const phoneVal = validatePhone(phone);
    if (!phoneVal.isValid) {
      showToast('error', 'خطأ في رقم الجوال', phoneVal.message);
      return;
    }

    // 2. Validate amount
    const amountVal = validateAmount(amount);
    if (!amountVal.isValid) {
      showToast('error', 'خطأ في المبلغ', amountVal.message);
      return;
    }

    const cleanP = sanitizePhone(phone);
    const cleanA = amount.trim();
    const config = WALLETS[selectedWallet];
    const ussdCode = config.formatUSSD(cleanP, cleanA, paymentType);

    // Save to local history
    const contactName = matchedFav?.name;
    const updatedHistory = addHistoryItem(selectedWallet, cleanP, cleanA, ussdCode, contactName, paymentType);
    setHistory(updatedHistory);

    // Trigger copy to clipboard & dialer
    const copied = await executeUSSDDial(ussdCode);

    if (copied) {
      showToast(
        'success',
        'تم نسخ الكود وجاري الاتصال...',
        `الكود المجهز: ${ussdCode}`
      );
    } else {
      showToast(
        'info',
        'جاري توجيهك إلى الاتصال',
        `جارٍ طلب الكود عبر ${config.nameAr}`
      );
    }
  };

  const handleSaveFavoriteSubmit = (name: string, phoneNum: string, wallet: WalletType) => {
    const updated = addFavorite(name, phoneNum, wallet);
    setFavorites(updated);
    showToast('success', 'تم الحفظ في المفضلة', `تم حفظ "${name}" لسرعة الوصول`);
  };

  const handleDeleteFavorite = (id: string) => {
    const updated = deleteFavorite(id);
    setFavorites(updated);
    showToast('info', 'تم الحذف', 'تم إزالة الاسم من المفضلة');
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleClearHistoryAll = () => {
    const updated = clearHistory();
    setHistory(updated);
    showToast('info', 'تم مسح السجل', 'تم حذف جميع عمليات التحويل من السجل');
  };

  return (
    <div className="min-h-screen bg-slate-200/60 dark:bg-slate-950 font-['Cairo',sans-serif] antialiased text-slate-800 dark:text-slate-100 flex flex-col items-center justify-start sm:justify-center p-0 sm:p-4 selection:bg-emerald-500 selection:text-white dir-rtl transition-colors duration-200">
      {/* Toast Notification Container */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Main Container framed like an Android App View */}
      <div className="w-full max-w-md mx-auto bg-slate-50 dark:bg-slate-900 rounded-none sm:rounded-[28px] shadow-2xl border-x sm:border border-slate-200/80 dark:border-slate-800 flex flex-col relative overflow-hidden pb-3.5 space-y-2.5 transition-colors duration-200">
        
        {/* Header Banner */}
        <HeaderBanner
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenInstall={() => setIsInstallOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          historyCount={history.length}
          favoritesCount={favorites.length}
        />

        {/* Form Body Padding */}
        <main className="px-3.5 space-y-2.5">
          {/* Option Selection: Pay to Friend vs Pay to Merchant */}
          <PaymentTypeSelector
            paymentType={paymentType}
            onSelectPaymentType={setPaymentType}
            selectedWallet={selectedWallet}
          />

          {/* Wallet Selection */}
          <WalletSelector
            selectedWallet={selectedWallet}
            onSelectWallet={setSelectedWallet}
          />

          {/* Phone Number Input */}
          <PhoneSection
            phone={phone}
            onPhoneChange={handlePhoneChange}
            favorites={favorites}
            onSelectFavorite={handleSelectFavorite}
            onOpenSaveFavoriteModal={() => setIsSaveFavoriteOpen(true)}
            selectedFavoriteName={matchedFav?.name}
          />

          {/* Transfer Amount Section */}
          <AmountSection
            amount={amount}
            onAmountChange={setAmount}
          />

          {/* Big Emerald Action Call Button */}
          <ActionButton
            onDial={handleDial}
          />

          {/* Notice Banner */}
          <NoticeBanner />

          {/* Footer Credit Section */}
          <FooterCredit />
        </main>
      </div>

      {/* Modal Bottom Sheet: History & Favorites */}
      <HistorySheet
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        favorites={favorites}
        onSelectHistoryItem={handleSelectHistoryItem}
        onSelectFavoriteItem={handleSelectFavorite}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onClearHistory={handleClearHistoryAll}
        onDeleteFavoriteItem={handleDeleteFavorite}
        onOpenAddFavorite={() => {
          setIsHistoryOpen(false);
          setIsSaveFavoriteOpen(true);
        }}
      />

      {/* Modal: Save Favorite */}
      <SaveFavoriteModal
        isOpen={isSaveFavoriteOpen}
        onClose={() => setIsSaveFavoriteOpen(false)}
        phone={phone || '0599000000'}
        defaultWallet={selectedWallet}
        onSave={handleSaveFavoriteSubmit}
      />

      {/* Modal: Install App Guide */}
      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        deferredPrompt={deferredPrompt}
        onInstallNative={handleInstallNative}
      />
    </div>
  );
}

