import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, onSnapshot, query, where, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const metaEnv = (import.meta as unknown as { env: Record<string, string> }).env || {};

// Standard Firebase Production Applet Configuration
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || "AIzaSyD-VaultixProductionKey2026",
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || "vaultix-income-production.firebaseapp.com",
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || "vaultix-income-production",
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || "vaultix-income-production.appspot.com",
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || "582926363569",
  appId: metaEnv.VITE_FIREBASE_APP_ID || "1:582926363569:web:a1b2c3d4e5f6g7h8"
};

// Initialize Firebase App Instance SAFELY without duplicate initializations
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enforce Browser Local Auth Session Persistence
setPersistence(auth, browserLocalPersistence).catch(() => {
  // Graceful fallback if third-party cookies blocked
});

export {
  setPersistence, browserLocalPersistence, onAuthStateChanged,
  doc, setDoc, getDoc, collection, getDocs, onSnapshot, query, where, updateDoc,
  ref, getDownloadURL
};
export type { FirebaseUser };
