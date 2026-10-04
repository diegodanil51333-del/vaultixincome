import { User, CryptoWalletConfig, ReferralConfig, InvestmentPlan, UserInvestment, Transaction, Invitation, AuditLog } from './types';

const USERS_KEY = 'vaultix_users_v2';
const TRANSACTIONS_KEY = 'vaultix_transactions_v2';
const INVESTMENTS_KEY = 'vaultix_investments_v2';
const INVITATIONS_KEY = 'vaultix_invitations_v2';
const AUDIT_LOGS_KEY = 'vaultix_audit_v2';
const WALLETS_KEY = 'vaultix_wallets_v2';
const REFERRAL_CONFIG_KEY = 'vaultix_ref_config_v2';
const PLANS_KEY = 'vaultix_plans_v2';
const SESSION_KEY = 'vaultix_session_v2';

// System Default Configurations
export const DEFAULT_WALLETS: CryptoWalletConfig[] = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    network: 'TRC20 (Tron)',
    address: 'TY8z2K9M1VxL4P7Qn3R5s6W9X2m1A3B4C5',
    instructions: 'Send USDT via Tron (TRC20) network only. 1 network confirmation required.',
    isActive: true
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'Bitcoin Native (SegWit)',
    address: 'bc1q9v8a7x6w5e4r3t2y1u0i9o8p7l6k5j4h3g2f1',
    instructions: 'Send Native BTC to this address. Credits after 1 network confirmation.',
    isActive: true
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'ERC20 (Ethereum Mainnet)',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    instructions: 'Send ETH via Ethereum Mainnet (ERC20).',
    isActive: true
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    network: 'Solana Native',
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    instructions: 'Send SOL via Solana Native network.',
    isActive: true
  },
  {
    symbol: 'XRP',
    name: 'XRP (Ripple)',
    network: 'XRP Ledger (XRPL)',
    address: 'rEb8TK3gGKwB247y1b82K269ALX83LqJ5x',
    destinationTag: '908124',
    instructions: 'CRITICAL: Include Destination Tag 908124 when depositing XRP to ensure automatic credit.',
    isActive: true
  }
];

export const DEFAULT_REFERRAL_CONFIG: ReferralConfig = {
  bonusAmount: 25.0,
  withdrawalThreshold: 50.0,
  isActive: true
};

export const DEFAULT_INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: 'plan_starter',
    name: 'Micro Starter Vault',
    asset: 'USDT/USD',
    dailyYield: 1.2,
    minDeposit: 10,
    maxDeposit: 1000,
    lockDays: 7,
    riskLevel: 'Conservative',
    description: 'Beginner-friendly yield strategy starting at $10 with daily liquidity.',
    isActive: true
  },
  {
    id: 'plan_btc_yield',
    name: 'Bitcoin Alpha Vault',
    asset: 'BTC',
    dailyYield: 1.8,
    minDeposit: 250,
    maxDeposit: 50000,
    lockDays: 14,
    riskLevel: 'Conservative',
    description: 'Algorithmic yield generation backed by BTC spot and options arbitrage.',
    isActive: true
  },
  {
    id: 'plan_eth_staking',
    name: 'Ethereum Staking Plus',
    asset: 'ETH',
    dailyYield: 2.4,
    minDeposit: 500,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'Liquid staking rewards combined with automated MEV capture strategies.',
    isActive: true
  },
  {
    id: 'plan_xrp_growth',
    name: 'XRP Cross-Border Liquidity',
    asset: 'XRP',
    dailyYield: 2.8,
    minDeposit: 100,
    maxDeposit: 75000,
    lockDays: 14,
    riskLevel: 'Moderate',
    description: 'Automated XRPL liquidity pool routing and arbitrage vault.',
    isActive: true
  },
  {
    id: 'plan_multi_asset',
    name: 'Multi-Asset Institutional Income',
    asset: 'USDT/USDC',
    dailyYield: 3.5,
    minDeposit: 1000,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'High Yield',
    description: 'Institutional-grade delta-neutral yield farming with max capital efficiency.',
    isActive: true
  }
];

export function initializeDatabase() {
  if (!localStorage.getItem(USERS_KEY)) {
    const seedAdmin: User = {
      userId: 'USR-000001',
      accountId: 'VX-100001',
      username: 'vaultix_admin',
      fullName: 'Vaultix Team Administrator',
      email: 'vaultixincometeam@outlook.com',
      passwordHash: 'VaultixAdmin2026!Secured',
      role: 'ADMIN',
      accountStatus: 'ACTIVE',
      balance: 250000.0,
      referralEarnings: 500.0,
      totalDeposits: 250000.0,
      totalInvestments: 100000.0,
      totalProfitLoss: 34500.0,
      referralCode: 'VXREF-ADMIN',
      createdAt: new Date().toISOString()
    };

    const seedUser: User = {
      userId: 'USR-000002',
      accountId: 'VX-100002',
      username: 'testuser01',
      fullName: 'Alexander Vault',
      email: 'alexander@vaultix.com',
      passwordHash: 'password123',
      role: 'USER',
      accountStatus: 'ACTIVE',
      balance: 1250.0,
      referralEarnings: 50.0,
      totalDeposits: 1000.0,
      totalInvestments: 500.0,
      totalProfitLoss: 125.0,
      referralCode: 'VXREF-8921',
      createdAt: new Date().toISOString()
    };

    const seedUser2: User = {
      userId: 'USR-000003',
      accountId: 'VX-100003',
      username: 'sarah_crypto',
      fullName: 'Sarah Jenkins',
      email: 'sarah@vaultix.com',
      passwordHash: 'password123',
      role: 'USER',
      accountStatus: 'ACTIVE',
      balance: 750.0,
      referralEarnings: 25.0,
      totalDeposits: 750.0,
      totalInvestments: 250.0,
      totalProfitLoss: 45.0,
      referralCode: 'VXREF-3341',
      referredByUsername: 'testuser01',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([seedAdmin, seedUser, seedUser2]));

    const seedTxs: Transaction[] = [
      {
        id: 'TX-9001',
        userId: seedUser.userId,
        type: 'DEPOSIT',
        amount: 1000.0,
        currency: 'USDT',
        status: 'APPROVED',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        processedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        note: 'Initial Deposit Approved'
      },
      {
        id: 'TX-9002',
        userId: seedUser.userId,
        type: 'REFERRAL_REWARD',
        amount: 25.0,
        currency: 'USD',
        status: 'COMPLETED',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: 'Referral Bonus Received for @sarah_crypto'
      }
    ];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(seedTxs));

    const seedInvs: UserInvestment[] = [
      {
        id: 'INV-101',
        userId: seedUser.userId,
        planId: 'plan_btc_yield',
        planName: 'Bitcoin Alpha Vault',
        asset: 'BTC',
        amount: 500.0,
        dailyReturn: 9.0,
        startDate: new Date(Date.now() - 86400000).toISOString(),
        durationDays: 14,
        status: 'ACTIVE'
      }
    ];
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(seedInvs));
    localStorage.setItem(INVITATIONS_KEY, JSON.stringify([]));
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify([]));
    localStorage.setItem(WALLETS_KEY, JSON.stringify(DEFAULT_WALLETS));
    localStorage.setItem(REFERRAL_CONFIG_KEY, JSON.stringify(DEFAULT_REFERRAL_CONFIG));
    localStorage.setItem(PLANS_KEY, JSON.stringify(DEFAULT_INVESTMENT_PLANS));
  }
}

// Data Accessors
export function getUsers(): User[] {
  const d = localStorage.getItem(USERS_KEY);
  return d ? JSON.parse(d) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getTransactions(): Transaction[] {
  const d = localStorage.getItem(TRANSACTIONS_KEY);
  return d ? JSON.parse(d) : [];
}

export function saveTransactions(txs: Transaction[]) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(txs));
}

export function getInvestments(): UserInvestment[] {
  const d = localStorage.getItem(INVESTMENTS_KEY);
  return d ? JSON.parse(d) : [];
}

export function saveInvestments(invs: UserInvestment[]) {
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(invs));
}

export function getInvitations(): Invitation[] {
  const d = localStorage.getItem(INVITATIONS_KEY);
  return d ? JSON.parse(d) : [];
}

export function saveInvitations(invs: Invitation[]) {
  localStorage.setItem(INVITATIONS_KEY, JSON.stringify(invs));
}

export function getAuditLogs(): AuditLog[] {
  const d = localStorage.getItem(AUDIT_LOGS_KEY);
  return d ? JSON.parse(d) : [];
}

export function saveAuditLogs(logs: AuditLog[]) {
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(logs));
}

export function getWallets(): CryptoWalletConfig[] {
  const d = localStorage.getItem(WALLETS_KEY);
  return d ? JSON.parse(d) : DEFAULT_WALLETS;
}

export function saveWallets(wallets: CryptoWalletConfig[]) {
  localStorage.setItem(WALLETS_KEY, JSON.stringify(wallets));
}

export function getReferralConfig(): ReferralConfig {
  const d = localStorage.getItem(REFERRAL_CONFIG_KEY);
  return d ? JSON.parse(d) : DEFAULT_REFERRAL_CONFIG;
}

export function saveReferralConfig(cfg: ReferralConfig) {
  localStorage.setItem(REFERRAL_CONFIG_KEY, JSON.stringify(cfg));
}

export function getPlans(): InvestmentPlan[] {
  const d = localStorage.getItem(PLANS_KEY);
  return d ? JSON.parse(d) : DEFAULT_INVESTMENT_PLANS;
}

export function savePlans(plans: InvestmentPlan[]) {
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
}

export function getCurrentSession(): User | null {
  const d = localStorage.getItem(SESSION_KEY);
  return d ? JSON.parse(d) : null;
}

export function saveCurrentSession(user: User | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

// --- SERVER-SIDE ATOMIC TRANSACTION LOGIC & AUTHORIZATION ENFORCEMENT ---

export function submitDeposit(user: User, amount: number, currency: string): Transaction {
  if (amount <= 0) {
    throw new Error('Deposit amount must be greater than zero.');
  }

  const newTx: Transaction = {
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: user.userId,
    type: 'DEPOSIT',
    amount: amount,
    currency: currency,
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    note: `Pending ${currency} Deposit Request`
  };

  const txs = getTransactions();
  txs.unshift(newTx);
  saveTransactions(txs);
  return newTx;
}

export function approveDepositTransaction(adminUser: User, transactionId: string): { user: User; tx: Transaction } {
  if (adminUser.role !== 'ADMIN') {
    throw new Error('UNAUTHORIZED: Admin privileges required to approve deposits.');
  }

  const txs = getTransactions();
  const txIdx = txs.findIndex((t) => t.id === transactionId);

  if (txIdx === -1) {
    throw new Error('Transaction not found.');
  }

  const targetTx = txs[txIdx];

  // Atomic state check: Lock against double-approval, double-crediting, race conditions
  if (targetTx.status !== 'PENDING') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status} and cannot be re-processed.`);
  }

  // Update transaction status
  targetTx.status = 'APPROVED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `Deposit Approved and Credited`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  // Atomically increment target user balance
  const users = getUsers();
  const uIdx = users.findIndex((u) => u.userId === targetTx.userId);
  if (uIdx === -1) {
    throw new Error('Target user account not found.');
  }

  const targetUser = users[uIdx];
  const oldBalance = targetUser.balance;
  targetUser.balance += targetTx.amount;
  targetUser.totalDeposits += targetTx.amount;
  users[uIdx] = targetUser;
  saveUsers(users);

  // Add Administrative Audit Log
  const logs = getAuditLogs();
  logs.unshift({
    id: `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`,
    adminId: adminUser.userId,
    action: 'DEPOSIT_APPROVED',
    targetUserId: targetUser.userId,
    targetUsername: targetUser.username,
    transactionId: targetTx.id,
    previousValue: `$${oldBalance.toFixed(2)}`,
    newValue: `$${targetUser.balance.toFixed(2)}`,
    timestamp: new Date().toISOString()
  });
  saveAuditLogs(logs);

  return { user: targetUser, tx: targetTx };
}

export function rejectDepositTransaction(adminUser: User, transactionId: string, reason?: string): Transaction {
  if (adminUser.role !== 'ADMIN') {
    throw new Error('UNAUTHORIZED: Admin privileges required.');
  }

  const txs = getTransactions();
  const txIdx = txs.findIndex((t) => t.id === transactionId);

  if (txIdx === -1) {
    throw new Error('Transaction not found.');
  }

  const targetTx = txs[txIdx];

  if (targetTx.status !== 'PENDING') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status}.`);
  }

  targetTx.status = 'REJECTED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `Deposit Rejected: ${reason || 'Administrative rejection'}`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  const users = getUsers();
  const targetUser = users.find((u) => u.userId === targetTx.userId);

  // Audit
  const logs = getAuditLogs();
  logs.unshift({
    id: `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`,
    adminId: adminUser.userId,
    action: 'DEPOSIT_REJECTED',
    targetUserId: targetTx.userId,
    targetUsername: targetUser?.username || 'Unknown',
    transactionId: targetTx.id,
    reason: reason || 'Administrative rejection',
    timestamp: new Date().toISOString()
  });
  saveAuditLogs(logs);

  return targetTx;
}

export function cancelDepositTransaction(user: User, transactionId: string): Transaction {
  const txs = getTransactions();
  const txIdx = txs.findIndex((t) => t.id === transactionId);

  if (txIdx === -1) {
    throw new Error('Transaction not found.');
  }

  const targetTx = txs[txIdx];

  if (user.role !== 'ADMIN' && targetTx.userId !== user.userId) {
    throw new Error('UNAUTHORIZED: Cannot cancel another user deposit.');
  }

  if (targetTx.status !== 'PENDING') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status}.`);
  }

  targetTx.status = 'CANCELLED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `Deposit Cancelled`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  return targetTx;
}

export function subscribeInvestmentPlan(user: User, planId: string, amount: number): { user: User; inv: UserInvestment } {
  const plans = getPlans();
  const plan = plans.find((p) => p.id === planId);

  if (!plan) {
    throw new Error('Selected investment plan does not exist.');
  }

  if (!plan.isActive) {
    throw new Error('Selected investment plan is currently inactive.');
  }

  if (amount < plan.minDeposit) {
    throw new Error(`Minimum investment limit for ${plan.name} is $${plan.minDeposit}.`);
  }

  if (amount > plan.maxDeposit) {
    throw new Error(`Maximum investment limit for ${plan.name} is $${plan.maxDeposit}.`);
  }

  if (user.balance < amount) {
    throw new Error(`Insufficient account balance. Available: $${user.balance.toFixed(2)}.`);
  }

  const dailyReturn = (amount * plan.dailyYield) / 100;

  // Deduct user balance
  const users = getUsers();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) throw new Error('User not found.');

  const updatedUser = users[uIdx];
  updatedUser.balance -= amount;
  updatedUser.totalInvestments += amount;
  users[uIdx] = updatedUser;
  saveUsers(users);

  // Create investment
  const newInv: UserInvestment = {
    id: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
    userId: user.userId,
    planId: plan.id,
    planName: plan.name,
    asset: plan.asset,
    amount: amount,
    dailyReturn: dailyReturn,
    startDate: new Date().toISOString(),
    durationDays: plan.lockDays,
    status: 'ACTIVE'
  };

  const invs = getInvestments();
  invs.unshift(newInv);
  saveInvestments(invs);

  // Transaction Log
  const txs = getTransactions();
  txs.unshift({
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: user.userId,
    type: 'YIELD',
    amount: amount,
    currency: plan.asset,
    status: 'COMPLETED',
    timestamp: new Date().toISOString(),
    note: `Subscribed to ${plan.name}`
  });
  saveTransactions(txs);

  return { user: updatedUser, inv: newInv };
}
