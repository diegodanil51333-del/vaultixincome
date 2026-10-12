import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  runTransaction,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyD0UqOpQzQ3lM7kMcDclnkZIQXFS8s0xEE",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "vaultixincome.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "vaultixincome",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "vaultixincome.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "158283505064",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:158283505064:web:d9997660ea2d085386919d"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

function cleanFirestoreData(data: Record<string, any>) {
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === 'passwordHash' || key === 'password') continue;
    if (value !== undefined) {
      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        cleaned[key] = cleanFirestoreData(value);
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, planId, amount, planName, asset, dailyYield, lockDays, idempotencyKey } = req.body || {};

  if (!userId || !planId || !amount || amount <= 0 || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid investment parameters.' });
  }

  try {
    // 1. Idempotency Check: prevent duplicate processing across network retries
    if (idempotencyKey) {
      const q = query(
        collection(db, 'investments'),
        where('userId', '==', userId),
        where('idempotencyKey', '==', idempotencyKey)
      );
      const existing = await getDocs(q);
      if (!existing.empty) {
        const invData = existing.docs[0].data();
        return res.status(200).json({
          success: true,
          message: 'Already processed (idempotent)',
          investment: invData
        });
      }
    }

    const invId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const txId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
    const dailyReturn = (amount * ((dailyYield || 2.0) / 100));

    const newInv = {
      id: invId,
      userId: userId,
      planId: planId,
      planName: planName || 'Yield Vault Plan',
      asset: asset || 'USDT',
      amount: amount,
      dailyReturn: dailyReturn,
      startDate: new Date().toISOString(),
      durationDays: lockDays || 14,
      status: 'ACTIVE',
      idempotencyKey: idempotencyKey || undefined
    };

    const invTx = {
      id: txId,
      userId: userId,
      type: 'YIELD',
      amount: amount,
      currency: asset || 'USDT',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      processedAt: new Date().toISOString(),
      idempotencyKey: idempotencyKey || undefined,
      note: `Subscribed to ${planName || 'Investment Plan'} ($${amount.toFixed(2)})`
    };

    // 2. ATOMIC FIRESTORE TRANSACTION:
    // Guarantees balance check, deduction, investment record, and ledger entry commit atomically.
    const result = await runTransaction(db, async (firestoreTx) => {
      const userRef = doc(db, 'users', userId);
      const userDoc = await firestoreTx.get(userRef);

      if (!userDoc.exists()) {
        throw new Error(`USER NOT FOUND: Target user ${userId} does not exist in Firestore.`);
      }

      const cloudUserData = userDoc.data();
      const currentBalance = typeof cloudUserData.balance === 'number' ? cloudUserData.balance : 0;

      if (currentBalance < amount) {
        throw new Error(
          `Insufficient balance. Authoritative balance is $${currentBalance.toFixed(2)}, but investment requires $${amount.toFixed(2)}.`
        );
      }

      const updatedUser = {
        ...cloudUserData,
        balance: Math.max(0, Math.round((currentBalance - amount) * 100) / 100),
        totalInvestments: Math.round(((cloudUserData.totalInvestments || 0) + amount) * 100) / 100
      };

      const invRef = doc(db, 'investments', newInv.id);
      const txRef = doc(db, 'transactions', invTx.id);

      firestoreTx.set(userRef, cleanFirestoreData(updatedUser));
      firestoreTx.set(invRef, cleanFirestoreData(newInv));
      firestoreTx.set(txRef, cleanFirestoreData(invTx));

      return {
        user: updatedUser,
        investment: newInv,
        tx: invTx
      };
    });

    return res.status(200).json({
      success: true,
      user: result.user,
      investment: result.investment,
      tx: result.tx
    });
  } catch (err: any) {
    console.error('Serverless investment processing error:', err);
    return res.status(400).json({
      error: err.message || 'Investment processing failed.'
    });
  }
}
