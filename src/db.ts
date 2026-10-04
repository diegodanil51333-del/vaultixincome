import { User, CryptoWalletConfig, ReferralConfig, InvestmentPlan, UserInvestment, Transaction, Invitation, AuditLog } from './types';

const USERS_KEY = 'vaultix_users_v4';
const TRANSACTIONS_KEY = 'vaultix_transactions_v4';
const INVESTMENTS_KEY = 'vaultix_investments_v4';
const INVITATIONS_KEY = 'vaultix_invitations_v4';
const AUDIT_LOGS_KEY = 'vaultix_audit_v4';
const WALLETS_KEY = 'vaultix_wallets_v4';
const REFERRAL_CONFIG_KEY = 'vaultix_ref_config_v4';
const PLANS_KEY = 'vaultix_plans_v4';
const SESSION_KEY = 'vaultix_session_v4';

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

    // REQUIREMENT 1: Standard seed users start with $0.00 until deposit is approved
    const seedUser: User = {
      userId: 'USR-000002',
      accountId: 'VX-100002',
      username: 'testuser01',
      fullName: 'Alexander Vault',
      email: 'alexander@vaultix.com',
      passwordHash: 'password123',
      role: 'USER',
      accountStatus: 'ACTIVE',
      balance: 0.0,
      referralEarnings: 50.0,
      totalDeposits: 0.0,
      totalInvestments: 0.0,
      totalProfitLoss: 0.0,
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
      balance: 0.0,
      referralEarnings: 5.0,
      totalDeposits: 0.0,
      totalInvestments: 0.0,
      totalProfitLoss: 0.0,
      referralCode: 'VXREF-3341',
      referredByUsername: 'testuser01',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([seedAdmin, seedUser, seedUser2]));
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([]));
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify([]));
    localStorage.setItem(INVITATIONS_KEY, JSON.stringify([]));
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify([]));
    localStorage.setItem(WALLETS_KEY, JSON.stringify(DEFAULT_WALLETS));
    localStorage.setItem(REFERRAL_CONFIG_KEY, JSON.stringify(DEFAULT_REFERRAL_CONFIG));
    localStorage.setItem(PLANS_KEY, JSON.stringify(DEFAULT_INVESTMENT_PLANS));
  }
}

// Data Accessors
export function getUsers(): User[] {
  processMaturedInvestments();
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
  processMaturedInvestments();
  const d = localStorage.getItem(SESSION_KEY);
  if (!d) return null;

  try {
    const sessionUser = JSON.parse(d);
    // Always resolve latest state from USERS_KEY database to prevent stale balance bug on refresh!
    const users = getUsers();
    const freshUser = users.find((u) => u.userId === sessionUser.userId);
    return freshUser || sessionUser;
  } catch {
    return null;
  }
}

export function saveCurrentSession(user: User | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

// --- REQUIREMENT 5 & 6: AUTOMATIC INVESTMENT MATURITY & PROFIT ENGINE (PREVENTS DUPLICATE PROFIT PAYMENTS) ---

export function processMaturedInvestments() {
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

    // Maturity Date Check (startDate + durationDays * 86400000)
    const startDateMs = new Date(inv.startDate).getTime();
    const maturityMs = startDateMs + inv.durationDays * 86400000;

    // For test maturity acceleration: if investment has passed maturity or is marked matured
    if (now >= maturityMs) {
      // Calculate total profit: dailyReturn * durationDays
      const totalProfit = inv.dailyReturn * inv.durationDays;
      const totalReturn = inv.amount + totalProfit; // Principal + Yield Profit

      // Mark investment as COMPLETED (state lock against duplicate credit)
      inv.status = 'COMPLETED';
      changed = true;

      // Credit user's wallet automatically
      const userIdx = users.findIndex((u) => u.userId === inv.userId);
      if (userIdx !== -1) {
        users[userIdx].balance += totalReturn;
        users[userIdx].totalProfitLoss += totalProfit;

        // Record permanent transaction log
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

    // Update active session if necessary
    const currSessionStr = localStorage.getItem(SESSION_KEY);
    if (currSessionStr) {
      const sessionUser = JSON.parse(currSessionStr);
      const updatedUser = users.find((u) => u.userId === sessionUser.userId);
      if (updatedUser) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
      }
    }
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

  if (targetTx.status !== 'PENDING') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status} and cannot be re-processed.`);
  }

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

  // If current session is targetUser, update current session
  const currentSession = getCurrentSession();
  if (currentSession?.userId === targetUser.userId) {
    saveCurrentSession(targetUser);
  }

  // Administrative Audit Log
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

// --- REQUIREMENT 3 & 4: WITHDRAWALS SUBMISSION, ADMIN APPROVAL & CANCELLATION ---

export function submitWithdrawalRequest(
  user: User,
  amount: number,
  currency: string,
  destinationAddress: string,
  network: string
): Transaction {
  if (amount <= 0) {
    throw new Error('Withdrawal amount must be greater than zero.');
  }

  if (!destinationAddress.trim()) {
    throw new Error('Please enter a valid destination crypto wallet address.');
  }

  const users = getUsers();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) throw new Error('User account not found.');

  const dbUser = users[uIdx];

  if (dbUser.balance < amount) {
    throw new Error(`Insufficient available balance. Available: $${dbUser.balance.toFixed(2)}.`);
  }

  // Reserve/deduct withdrawal amount from available balance
  dbUser.balance -= amount;
  users[uIdx] = dbUser;
  saveUsers(users);
  saveCurrentSession(dbUser);

  const txs = getTransactions();
  const newTx: Transaction = {
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: dbUser.userId,
    type: 'WITHDRAWAL',
    amount: amount,
    currency: currency,
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    note: `Withdrawal of $${amount.toFixed(2)} ${currency} to ${destinationAddress} via ${network}`
  };

  txs.unshift(newTx);
  saveTransactions(txs);

  return newTx;
}

export function approveWithdrawalTransaction(adminUser: User, transactionId: string): { user: User; tx: Transaction } {
  if (adminUser.role !== 'ADMIN') {
    throw new Error('UNAUTHORIZED: Admin privileges required.');
  }

  const txs = getTransactions();
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

  const users = getUsers();
  const targetUser = users.find((u) => u.userId === targetTx.userId) || adminUser;

  // Audit
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

  const txs = getTransactions();
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

  // RESTORE RESERVED FUNDS BACK TO USER AVAILABLE BALANCE
  const users = getUsers();
  const uIdx = users.findIndex((u) => u.userId === targetTx.userId);
  let updatedUser = adminUser;

  if (uIdx !== -1) {
    users[uIdx].balance += targetTx.amount;
    updatedUser = users[uIdx];
    saveUsers(users);

    const currentSession = getCurrentSession();
    if (currentSession?.userId === updatedUser.userId) {
      saveCurrentSession(updatedUser);
    }
  }

  // Audit
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

// PERMANENT BALANCE DEDUCTION FOR INVESTMENT (PREVENTS PAGE REFRESH RESET BUG)
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

  const users = getUsers();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) throw new Error('User account not found.');

  const dbUser = users[uIdx];

  if (dbUser.balance < amount) {
    throw new Error(`Insufficient account balance. Available balance: $${dbUser.balance.toFixed(2)}.`);
  }

  const dailyReturn = (amount * plan.dailyYield) / 100;

  // Deduct user balance permanently
  dbUser.balance -= amount;
  dbUser.totalInvestments += amount;
  users[uIdx] = dbUser;
  saveUsers(users);

  // IMMEDIATELY SAVE UPDATED USER TO CURRENT SESSION TO FIX REFRESH BUG
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

  const invs = getInvestments();
  invs.unshift(newInv);
  saveInvestments(invs);

  const txs = getTransactions();
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

  const users = getUsers();
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

  const txs = getTransactions();
  const newTx: Transaction = {
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: dbUser.userId,
    type: 'WITHDRAWAL',
    amount: withdrawalAmount,
    currency: 'USD',
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    note: `Referral Withdrawal to ${destinationAddress.slice(0, 6)}...${destinationAddress.slice(-4)} ($15 Network Fee Confirmed)`
  };

  txs.unshift(newTx);
  saveTransactions(txs);

  return { user: dbUser, tx: newTx };
}
