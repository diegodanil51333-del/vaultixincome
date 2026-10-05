export interface User {
  userId: string;
  accountId: string;
  username: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'USER';
  accountStatus: 'ACTIVE' | 'SUSPENDED';
  balance: number;
  referralEarnings: number;
  totalDeposits: number;
  totalInvestments: number;
  totalProfitLoss: number;
  referralCode: string;
  referredByUsername?: string;
  createdAt: string;
}

export interface CryptoWalletConfig {
  symbol: 'BTC' | 'ETH' | 'USDT' | 'SOL' | 'XRP';
  name: string;
  network: string;
  address: string;
  destinationTag?: string;
  instructions: string;
  isActive: boolean;
}

export interface ReferralConfig {
  bonusAmount: number;
  withdrawalThreshold: number;
  isActive: boolean;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  asset: string;
  dailyYield: number;
  minDeposit: number;
  maxDeposit: number;
  lockDays: number;
  riskLevel: 'Conservative' | 'Moderate' | 'High Yield';
  description: string;
  isActive: boolean;
}

export interface UserInvestment {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  asset: string;
  amount: number;
  dailyReturn: number;
  startDate: string;
  durationDays: number;
  status: 'ACTIVE' | 'COMPLETED' | 'WITHDRAWAL_PENDING' | 'WITHDRAWN';
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'YIELD' | 'REFERRAL_REWARD' | 'ADMIN_CREDIT' | 'ADMIN_DEBIT';
export type TransactionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  timestamp: string;
  processedAt?: string;
  note: string;
}

export interface Invitation {
  id: string;
  inviterUsername: string;
  inviteeUsername: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  timestamp: string;
  rewardClaimed: boolean;
}

export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  targetUserId: string;
  targetUsername: string;
  transactionId?: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
  timestamp: string;
}

export interface CryptoProvider {
  name: string;
  regions: string[];
  paymentMethods: string[];
  supportedCryptos: string[];
  websiteUrl: string;
  tagLine: string;
}
