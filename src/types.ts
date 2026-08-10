export type WalletType = 'jawwal_pay' | 'palpay';
export type PaymentType = 'friend' | 'merchant';

export interface WalletConfig {
  id: WalletType;
  nameAr: string;
  iconColor: string;
  badgeBg: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  gradientFrom: string;
  gradientTo: string;
  ussdPrefix: string;
  formatUSSD: (phone: string, amount: string, paymentType?: PaymentType) => string;
}

export interface FavoriteContact {
  id: string;
  name: string;
  phone: string;
  wallet?: WalletType;
  createdAt: number;
}

export interface TransferHistoryItem {
  id: string;
  wallet: WalletType;
  walletName: string;
  paymentType?: PaymentType;
  phone: string;
  amount: string;
  contactName?: string;
  ussdCode: string;
  timestamp: number;
}
