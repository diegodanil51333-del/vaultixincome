import { User, Transaction } from './types';

const CLOUD_DOC_ID = 'ff808181a09d98f701a11ac753111f07';
const CLOUD_URL = `https://api.restful-api.dev/objects/${CLOUD_DOC_ID}`;
const USERS_KEY = 'vaultix_users_v13';
const TRANSACTIONS_KEY = 'vaultix_transactions_v13';

let isSyncing = false;

// Get local stored users
function getLocalUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed: User[] = raw ? JSON.parse(raw) : [];
    const map = new Map<string, User>();
    parsed.forEach((u) => {
      if (u && u.userId) map.set(u.userId, u);
    });
    return Array.from(map.values());
  } catch {
    return [];
  }
}

// Get local stored transactions
function getLocalTxs(): Transaction[] {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Emit update events to trigger React state updates across tabs
function emitUpdateEvents(type: 'users' | 'txs' | 'all' = 'all') {
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

// Fetch global cloud data and merge into local state
export async function fetchAndMergeCloudData(): Promise<{ users: User[]; transactions: Transaction[] }> {
  if (isSyncing) {
    return { users: getLocalUsers(), transactions: getLocalTxs() };
  }

  isSyncing = true;
  try {
    const response = await fetch(CLOUD_URL, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (!response.ok) {
      isSyncing = false;
      return { users: getLocalUsers(), transactions: getLocalTxs() };
    }

    const json = await response.json();
    const cloudUsers: User[] = (json.data && json.data.users) ? json.data.users : [];
    const cloudTxs: Transaction[] = (json.data && json.data.transactions) ? json.data.transactions : [];

    const localUsers = getLocalUsers();
    const localTxs = getLocalTxs();

    // Union merge users (cloud takes priority for status/balance, local added if new)
    const userMap = new Map<string, User>();
    localUsers.forEach((u) => {
      if (u && u.userId) userMap.set(u.userId, u);
    });
    cloudUsers.forEach((u) => {
      if (u && u.userId) userMap.set(u.userId, u);
    });
    const mergedUsers = Array.from(userMap.values());

    // Union merge transactions
    const txMap = new Map<string, Transaction>();
    localTxs.forEach((t) => {
      if (t && t.id) txMap.set(t.id, t);
    });
    cloudTxs.forEach((t) => {
      if (t && t.id) txMap.set(t.id, t);
    });
    const mergedTxs = Array.from(txMap.values());

    let usersChanged = false;
    if (mergedUsers.length !== localUsers.length || JSON.stringify(mergedUsers) !== JSON.stringify(localUsers)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(mergedUsers));
      usersChanged = true;
    }

    let txsChanged = false;
    if (mergedTxs.length !== localTxs.length || JSON.stringify(mergedTxs) !== JSON.stringify(localTxs)) {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(mergedTxs));
      txsChanged = true;
    }

    if (usersChanged) emitUpdateEvents('users');
    if (txsChanged) emitUpdateEvents('txs');

    isSyncing = false;
    return { users: mergedUsers, transactions: mergedTxs };
  } catch (err) {
    console.warn('Cloud persistence fetch notice:', err);
    isSyncing = false;
    return { users: getLocalUsers(), transactions: getLocalTxs() };
  }
}

// Push local state to global cloud document
export async function pushStateToCloud(users?: User[], txs?: Transaction[]): Promise<boolean> {
  try {
    const currentUsers = users || getLocalUsers();
    const currentTxs = txs || getLocalTxs();

    const payload = {
      name: 'vaultix_income_production_db_v1',
      data: {
        users: currentUsers,
        transactions: currentTxs
      }
    };

    const res = await fetch(CLOUD_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return res.ok;
  } catch (err) {
    console.warn('Cloud persistence push notice:', err);
    return false;
  }
}

// Background auto-sync polling loop
export function startCloudSyncLoop(intervalMs = 3000) {
  if (typeof window === 'undefined') return;

  // Initial fetch
  fetchAndMergeCloudData();

  // Periodic poll
  const timer = setInterval(() => {
    fetchAndMergeCloudData();
  }, intervalMs);

  return () => clearInterval(timer);
}
