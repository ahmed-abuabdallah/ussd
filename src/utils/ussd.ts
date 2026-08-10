import { WalletConfig, WalletType, PaymentType, FavoriteContact, TransferHistoryItem } from '../types';

export const WALLETS: Record<WalletType, WalletConfig> = {
  jawwal_pay: {
    id: 'jawwal_pay',
    nameAr: 'جوال باي',
    iconColor: '#00A859',
    badgeBg: 'bg-[#00A859]/10 text-[#00A859]',
    activeBg: 'bg-[#00A859]',
    activeBorder: 'border-[#00A859]',
    activeText: 'text-[#00A859]',
    gradientFrom: 'from-[#00A859]',
    gradientTo: 'to-[#008f4c]',
    ussdPrefix: '*268*1*',
    formatUSSD: (phone: string, amount: string, paymentType: PaymentType = 'friend') => {
      const cleanP = phone.trim();
      const cleanA = amount.trim();
      if (paymentType === 'merchant') {
        return `*268*2*${cleanP}*${cleanA}#`;
      }
      return `*268*1*${cleanP}*${cleanA}#`;
    },
  },
  palpay: {
    id: 'palpay',
    nameAr: 'بال باي',
    iconColor: '#7C3AED',
    badgeBg: 'bg-[#7C3AED]/10 text-[#7C3AED]',
    activeBg: 'bg-[#7C3AED]',
    activeBorder: 'border-[#7C3AED]',
    activeText: 'text-[#7C3AED]',
    gradientFrom: 'from-[#7C3AED]',
    gradientTo: 'to-[#6D28D9]',
    ussdPrefix: '*370*1*1*',
    formatUSSD: (phone: string, amount: string, paymentType: PaymentType = 'friend') => {
      const cleanP = phone.trim();
      const cleanA = amount.trim();
      if (paymentType === 'merchant') {
        return `*370*2*${cleanP}*${cleanA}#`;
      }
      return `*370*1*1*${cleanP}*${cleanA}#`;
    },
  },
};

export const QUICK_AMOUNTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const FAVORITES_KEY = 'ussd_palestine_favorites_v2';
const HISTORY_KEY = 'ussd_palestine_history_v1';

// Initial favorites list (empty by default, users can save their own favorites)
const INITIAL_FAVORITES: FavoriteContact[] = [];

export function getFavorites(): FavoriteContact[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    if (!data) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(INITIAL_FAVORITES));
      return INITIAL_FAVORITES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_FAVORITES;
  }
}

export function saveFavorites(favorites: FavoriteContact[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites', e);
  }
}

export function addFavorite(name: string, phone: string, wallet?: WalletType): FavoriteContact[] {
  const list = getFavorites();
  const existing = list.find((f) => f.phone === phone);
  if (existing) {
    existing.name = name;
    if (wallet) existing.wallet = wallet;
    saveFavorites(list);
    return list;
  }
  const newItem: FavoriteContact = {
    id: Date.now().toString(),
    name: name.trim(),
    phone: phone.trim(),
    wallet,
    createdAt: Date.now(),
  };
  const updated = [newItem, ...list];
  saveFavorites(updated);
  return updated;
}

export function deleteFavorite(id: string): FavoriteContact[] {
  const list = getFavorites().filter((f) => f.id !== id);
  saveFavorites(list);
  return list;
}

export function getHistory(): TransferHistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveHistory(history: TransferHistoryItem[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history', e);
  }
}

export function addHistoryItem(
  wallet: WalletType,
  phone: string,
  amount: string,
  ussdCode: string,
  contactName?: string,
  paymentType: PaymentType = 'friend'
): TransferHistoryItem[] {
  const list = getHistory();
  const newItem: TransferHistoryItem = {
    id: Date.now().toString(),
    wallet,
    walletName: WALLETS[wallet].nameAr,
    paymentType,
    phone,
    amount,
    contactName,
    ussdCode,
    timestamp: Date.now(),
  };
  const updated = [newItem, ...list].slice(0, 100); // keep last 100
  saveHistory(updated);
  return updated;
}

export function deleteHistoryItem(id: string): TransferHistoryItem[] {
  const list = getHistory().filter((h) => h.id !== id);
  saveHistory(list);
  return list;
}

export function clearHistory(): TransferHistoryItem[] {
  saveHistory([]);
  return [];
}

/**
 * Clean phone number to digits
 */
export function sanitizePhone(input: string): string {
  // Convert Eastern Arabic numerals to Western digits if needed
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let sanitized = input;
  for (let i = 0; i < 10; i++) {
    sanitized = sanitized.replace(new RegExp(arabicNumbers[i], 'g'), i.toString());
  }
  return sanitized.replace(/[^\d]/g, '');
}

/**
 * Validate Palestinian phone number (e.g., 05XXXXXXXX, 10 digits)
 */
export function validatePhone(phone: string): { isValid: boolean; message?: string } {
  const clean = sanitizePhone(phone);
  if (!clean) {
    return { isValid: false, message: 'يرجى إدخال رقم هاتف المستلم' };
  }
  if (!clean.startsWith('05')) {
    return { isValid: false, message: 'يجب أن يبدأ رقم الهاتف بـ 05' };
  }
  if (clean.length !== 10) {
    return { isValid: false, message: 'رقم الهاتف يجب أن يتكون من 10 أرقام (05XXXXXXXX)' };
  }
  return { isValid: true };
}

/**
 * Validate amount (greater than 0)
 */
export function validateAmount(amount: string): { isValid: boolean; message?: string } {
  const clean = amount.trim();
  if (!clean) {
    return { isValid: false, message: 'يرجى إدخال مبلغ التحويل' };
  }
  const num = parseFloat(clean);
  if (isNaN(num) || num <= 0) {
    return { isValid: false, message: 'يرجى إدخال مبلغ صحيح أكبر من الصفر' };
  }
  return { isValid: true };
}

/**
 * Execute Dial action and copy to clipboard
 */
export async function executeUSSDDial(ussdCode: string): Promise<boolean> {
  let copied = false;
  try {
    await navigator.clipboard.writeText(ussdCode);
    copied = true;
  } catch (err) {
    // Fallback copy strategy
    const textArea = document.createElement('textarea');
    textArea.value = ussdCode;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      copied = true;
    } catch (e) {
      console.error('Copy fallback failed', e);
    }
    document.body.removeChild(textArea);
  }

  // Dial link execution: tel:*268*1*0599000000*10#
  // Hash character '#' needs URL encoding as %23 when passing to tel link
  const encodedUSSD = ussdCode.replace(/#/g, '%23');
  const telUrl = `tel:${encodedUSSD}`;

  // Trigger dialer
  window.location.href = telUrl;

  return copied;
}
