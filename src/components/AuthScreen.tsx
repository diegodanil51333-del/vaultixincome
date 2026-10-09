import React, { useState, useEffect } from 'react';
import { User, Transaction } from '../types';
import { getUsers, saveUsers, saveCurrentSession, getTransactions, saveTransactions, SYSTEM_ADMIN_ACCOUNT } from '../db';
import { auth, db, doc, setDoc, getDoc, collection, getDocs, query, where, isFirebaseConfigured, cleanFirestoreData } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { Lock, User as UserIcon, CheckCircle, AlertCircle, Gift, ArrowLeft } from 'lucide-react';
import { AmbientBackground } from './AmbientBackground';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
  initialTab?: 'login' | 'register';
  onBackToLanding?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, initialTab = 'login', onBackToLanding }) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [referralCodeInput, setReferralCodeInput] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setTab(initialTab);
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get('ref') || urlParams.get('referral');
        if (refParam && refParam.trim()) {
          setReferralCodeInput(refParam.trim().toUpperCase());
          setTab('register');
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, [initialTab]);

  // Auto-detect referral code from URL formats like `https://vaultixincome.vercel.app/=VXREF-3316` or `?ref=VXREF-3316`
  useEffect(() => {
    try {
      const fullUrl = window.location.href;
      let detectedCode = '';

      // Check for `=VXREF-` pattern anywhere in path/query/hash
      const matchEqual = fullUrl.match(/=(VXREF-[A-Za-z0-9-]+)/i);
      if (matchEqual && matchEqual[1]) {
        detectedCode = matchEqual[1];
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get('ref');
        if (refParam) {
          detectedCode = refParam;
        }
      }

      if (detectedCode) {
        setReferralCodeInput(detectedCode.toUpperCase());
        setTab('register');
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const cleanId = loginIdentifier.trim();
    const cleanPass = loginPassword.trim();

    if (!cleanId || !cleanPass) {
      setError('Please enter your username/email and password.');
      return;
    }

    try {
      // 1. Resolve email address for Firebase Authentication
      let targetEmail = cleanId;
      if (cleanId.toLowerCase() === 'vaultix_admin') {
        targetEmail = 'vaultixincometeam@outlook.com';
      } else if (!cleanId.includes('@')) {
        const localUsers = getUsers();
        const found = localUsers.find(
          (u) => u.username.toLowerCase() === cleanId.toLowerCase()
        );
        if (found && found.email) {
          targetEmail = found.email;
        } else {
          try {
            const q = query(collection(db, 'users'), where('username', '==', cleanId));
            const snap = await getDocs(q);
            if (!snap.empty) {
              const uData = snap.docs[0].data() as User;
              if (uData && uData.email) {
                targetEmail = uData.email;
              }
            }
          } catch {
            // Ignore offline/permission lookup errors
          }
        }
      }

      // 2. Authenticate strictly via Firebase Authentication
      let authUser: FirebaseUser | null = null;
      try {
        const userCred = await signInWithEmailAndPassword(auth, targetEmail, cleanPass);
        authUser = userCred.user;
      } catch (authErr: any) {
        console.error('Firebase Auth sign-in error:', authErr);
        if (
          authErr.code === 'auth/invalid-credential' ||
          authErr.code === 'auth/wrong-password' ||
          authErr.code === 'auth/user-not-found'
        ) {
          setError('Invalid login credentials. Please check your username/email and password.');
          return;
        } else if (authErr.code === 'auth/too-many-requests') {
          setError('Too many failed attempts. Access to this account has been temporarily disabled. Please wait a moment and try again.');
          return;
        } else {
          setError(`Authentication failed: ${authErr.message || authErr}`);
          return;
        }
      }

      const uid = authUser.uid;
      const userEmail = authUser.email || targetEmail;
      const idTokenResult = await authUser.getIdTokenResult();
      const isUserAdmin =
        userEmail.toLowerCase() === 'vaultixincometeam@outlook.com' ||
        idTokenResult.claims.role === 'ADMIN' ||
        idTokenResult.claims.admin === true;

      let loggedInUser: User | null = null;

      // 3. Retrieve user profile from Cloud Firestore
      try {
        const docSnap = await getDoc(doc(db, 'users', uid));
        if (docSnap.exists()) {
          loggedInUser = docSnap.data() as User;
        }
      } catch (fsErr) {
        console.warn('Could not read user profile from Firestore:', fsErr);
      }

      // 4. Fallback profile initialization if not yet present in Firestore
      if (!loggedInUser) {
        if (isUserAdmin) {
          loggedInUser = {
            userId: uid,
            accountId: 'VX-100001',
            username: 'vaultix_admin',
            fullName: 'Vaultix Administrator',
            email: userEmail,
            role: 'ADMIN',
            accountStatus: 'ACTIVE',
            balance: 0.0,
            referralEarnings: 0.0,
            bonusBalance: 0.0,
            totalDeposits: 0.0,
            totalInvestments: 0.0,
            totalProfitLoss: 0.0,
            referralCode: 'VXREF-ADMIN',
            createdAt: new Date().toISOString()
          };
          try {
            await setDoc(doc(db, 'users', uid), cleanFirestoreData(loggedInUser), { merge: true });
          } catch (writeErr) {
            console.warn('Could not write admin profile to Firestore:', writeErr);
          }
        } else {
          const localUsers = getUsers();
          const found = localUsers.find(
            (u) => u.userId === uid || u.email.toLowerCase() === userEmail.toLowerCase()
          );
          if (found) {
            loggedInUser = { ...found, userId: uid };
          } else {
            loggedInUser = {
              userId: uid,
              accountId: `VX-${Math.floor(100000 + Math.random() * 900000)}`,
              username: userEmail.split('@')[0],
              fullName: userEmail.split('@')[0],
              email: userEmail,
              role: 'USER',
              accountStatus: 'ACTIVE',
              balance: 0.0,
              referralEarnings: 0.0,
              bonusBalance: 0.0,
              totalDeposits: 0.0,
              totalInvestments: 0.0,
              totalProfitLoss: 0.0,
              referralCode: `VXREF-${Math.floor(1000 + Math.random() * 9000)}`,
              createdAt: new Date().toISOString()
            };
          }
          if (loggedInUser) {
            try {
              await setDoc(doc(db, 'users', uid), cleanFirestoreData(loggedInUser), { merge: true });
            } catch (err) {
              console.warn('Could not heal user profile in Firestore:', err);
            }
          }
        }
      }

      if (isUserAdmin && loggedInUser) {
        loggedInUser.role = 'ADMIN';
      }

      if (loggedInUser.accountStatus === 'SUSPENDED') {
        setError('Account suspended. Please contact Vaultix Income support.');
        return;
      }

      saveCurrentSession(loggedInUser);
      onLoginSuccess(loggedInUser);
    } catch (err: any) {
      console.error('Login process error:', err);
      setError(`Login failed: ${err.message || err}`);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!username.trim() || !fullName.trim() || !email.trim() || !password || !passwordConfirm) {
      setError('All required registration fields must be completed.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    const users = getUsers();

    if (users.some((u) => u.username.toLowerCase() === username.trim().toLowerCase())) {
      setError('Username is already taken by another user.');
      return;
    }

    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('Email address is already registered.');
      return;
    }

    let referrerUsername: string | undefined = undefined;
    let referrerDisplayName: string | undefined = undefined;
    let initialBonusBalance = 0.0;
    let referrerUser: User | undefined = undefined;
    const newTxs: any[] = [];
    const txs = getTransactions();

    if (referralCodeInput.trim()) {
      const codeClean = referralCodeInput.trim().toUpperCase();
      
      // 1. First check local cached users
      referrerUser = users.find((u) => u.referralCode?.toUpperCase() === codeClean || u.username?.toUpperCase() === codeClean);

      // 2. If not found locally, query Cloud Firestore for referrer user
      if (!referrerUser) {
        try {
          const qRefCode = query(collection(db, 'users'), where('referralCode', '==', codeClean));
          const snapRefCode = await getDocs(qRefCode);
          if (!snapRefCode.empty) {
            referrerUser = snapRefCode.docs[0].data() as User;
          } else {
            const qRefUser = query(collection(db, 'users'), where('username', '==', referralCodeInput.trim().toLowerCase()));
            const snapRefUser = await getDocs(qRefUser);
            if (!snapRefUser.empty) {
              referrerUser = snapRefUser.docs[0].data() as User;
            }
          }
        } catch (queryErr) {
          console.warn('Firestore referral lookup check:', queryErr);
        }
      }

      // 3. Special admin testing code handling
      if (!referrerUser && codeClean === 'VXREF-ADMIN') {
        referrerUser = users.find((u) => u.role === 'ADMIN') || {
          userId: 'USR-000001',
          accountId: 'VX-100001',
          username: 'vaultix_admin',
          fullName: 'Vaultix Administrator',
          email: 'vaultixincometeam@outlook.com',
          passwordHash: 'Mmadu51366414@',
          role: 'ADMIN',
          accountStatus: 'ACTIVE',
          balance: 0,
          referralEarnings: 0,
          totalDeposits: 0,
          totalInvestments: 0,
          totalProfitLoss: 0,
          referralCode: 'VXREF-ADMIN',
          createdAt: new Date().toISOString()
        };
      }

      if (referrerUser) {
        referrerUsername = referrerUser.username;
        referrerDisplayName = referrerUser.fullName || referrerUser.username;
      } else {
        setError(`Invalid referral code "${referralCodeInput.trim()}" provided. Registration cancelled.`);
        return;
      }
    }

    let uid = '';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      uid = userCredential.user.uid;
    } catch (authErr: any) {
      if (authErr.code === 'auth/email-already-in-use') {
        // If the email already exists in Auth (e.g. from an earlier interrupted attempt where the Firestore write was blocked),
        // authenticate with the provided password to recover the session and create the Firestore document.
        try {
          const signCred = await signInWithEmailAndPassword(auth, email.trim(), password);
          uid = signCred.user.uid;
        } catch {
          setError('This email address is already registered in Firebase. Please log in instead.');
          return;
        }
      } else {
        console.error('Firebase Auth registration error:', authErr);
        setError(`Firebase Auth Registration Failed: ${authErr.message || authErr}. Please verify VITE_FIREBASE_API_KEY on Vercel.`);
        return;
      }
    }

    // Construct secure default user document (strictly 0 balances, NO password fields)
    const newUser: User = {
      userId: uid,
      accountId: `VX-${Math.floor(100000 + Math.random() * 900000)}`,
      username: username.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
      role: 'USER',
      accountStatus: 'ACTIVE',
      balance: 0.0,
      referralEarnings: 0.0,
      bonusBalance: 0.0,
      totalDeposits: 0.0,
      totalInvestments: 0.0,
      totalProfitLoss: 0.0,
      referralCode: `VXREF-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };

    if (phoneNumber.trim()) {
      newUser.phoneNumber = phoneNumber.trim();
    }
    if (referrerUser?.userId) {
      newUser.referredBy = referrerUser.userId;
    }
    if (referrerUsername) {
      newUser.referredByUsername = referrerUsername;
    }
    if (referrerDisplayName) {
      newUser.referredByDisplayName = referrerDisplayName;
    }


    // Direct Awaited Firestore Document Creation with Real-Time Diagnostics
    const cleanedUserData = cleanFirestoreData(newUser);
    const authCurrentUid = auth.currentUser?.uid || '';

    const ruleEvaluationDiagnostics = {
      timestamp: new Date().toISOString(),
      authCurrentUid,
      newUserUserId: newUser.userId,
      uidMatchesUserId: authCurrentUid === newUser.userId,
      targetDocumentPath: `users/${newUser.userId}`,
      userObjectPayload: cleanedUserData,
      ruleChecks: {
        isAuthenticated: Boolean(auth.currentUser),
        isOwnerOfPath: authCurrentUid === newUser.userId,
        userIdMatchesDocument: cleanedUserData.userId === newUser.userId,
        roleIsUser: cleanedUserData.role === 'USER',
        accountStatusIsActive: cleanedUserData.accountStatus === 'ACTIVE',
        balanceZero: cleanedUserData.balance === 0,
        totalDepositsZero: cleanedUserData.totalDeposits === 0,
        totalInvestmentsZero: cleanedUserData.totalInvestments === 0,
        totalProfitLossZero: cleanedUserData.totalProfitLoss === 0,
        referralEarningsZero: cleanedUserData.referralEarnings === 0,
        bonusBalanceZero: !cleanedUserData.bonusBalance || cleanedUserData.bonusBalance === 0,
        noPasswordHash: !('passwordHash' in cleanedUserData),
        noPassword: !('password' in cleanedUserData)
      }
    };

    console.group('🔍 [VAULTIX REGISTRATION DIAGNOSTIC] Firestore Rule Evaluation');
    console.log('Firebase Auth UID:', authCurrentUid);
    console.log('New User ID:', newUser.userId);
    console.log('Document Path:', `users/${newUser.userId}`);
    console.log('Payload Data Structure:', cleanedUserData);
    console.table(ruleEvaluationDiagnostics.ruleChecks);
    console.groupEnd();

    try {
      await setDoc(doc(db, 'users', newUser.userId), cleanedUserData);
      console.log('✅ [VAULTIX REGISTRATION] Document successfully written to Firestore:', `users/${newUser.userId}`);
    } catch (fsErr: any) {
      console.error('❌ [VAULTIX REGISTRATION ERROR] Firestore rejected document write:', fsErr);
      console.error('Diagnostic state at time of rejection:', JSON.stringify(ruleEvaluationDiagnostics, null, 2));
      setError(`Registration Failed: Could not write user document to Cloud Database (${fsErr.message || fsErr}). Check browser console for full rule diagnostic trace.`);
      return;
    }

    const currentUsers = getUsers();
    currentUsers.push(newUser);
    saveUsers(currentUsers);
    saveCurrentSession(newUser);
    onLoginSuccess(newUser);

    setMessage(
      referrerUsername
        ? `Registration successful! Referral by @${referrerUsername} recorded.`
        : 'Registration successful! Welcome to Vaultix Income.'
    );

    setTimeout(() => {
      saveCurrentSession(newUser);
      onLoginSuccess(newUser);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-x-hidden">
      <AmbientBackground />

      {/* Top Navigation / Back Button */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="absolute top-6 left-6 text-xs text-slate-300 hover:text-[#D4AF37] flex items-center space-x-1.5 transition-colors cursor-pointer z-20 bg-[#141923]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#2A3447] shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>
      )}

      {/* Main Container: Dual-Panel Showcase on Desktop, Stacked on Mobile */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12 md:py-8">
        
        {/* Left Side: Visual Showcase Cards using the 3 Reference Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#141923]/80 backdrop-blur-xl border border-[#2A3447] rounded-3xl p-5 md:p-6 shadow-2xl space-y-4 relative overflow-hidden">
            
            {/* Top Showcase Image (bg_profit.jpg) */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 group shadow-xl">
              <img
                src="/bg_profit.jpg"
                alt="Vaultix Income Profit Portfolio"
                className="w-full h-48 sm:h-56 object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white">
                <span className="bg-emerald-500/90 text-black px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-md">
                  PROFIT GROWTH +$157,000
                </span>
                <span className="text-[10px] text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                  Verified Yield
                </span>
              </div>
            </div>

            {/* Bottom Dual Grid (bg_savings.jpg & bg_growth.jpg) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#2A3447] group shadow-lg">
                <img
                  src="/bg_savings.jpg"
                  alt="Vaultix Income Savings"
                  className="w-full h-32 sm:h-36 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/90 via-transparent to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-[#D4AF37] bg-black/70 px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                  Smart Wealth Savings
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-[#2A3447] group shadow-lg">
                <img
                  src="/bg_growth.jpg"
                  alt="Vaultix Income Investment Growth"
                  className="w-full h-32 sm:h-36 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/90 via-transparent to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-emerald-400 bg-black/70 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Compounding Capital
                </span>
              </div>
            </div>

            {/* Platform Tagline */}
            <div className="pt-2 border-t border-[#2A3447]/60 flex items-center justify-between text-[11px] text-slate-300 font-semibold">
              <span>Automated Yield Vaults</span>
              <span>•</span>
              <span>Multi-Asset Protection</span>
              <span>•</span>
              <span className="text-[#D4AF37]">256-Bit TLS</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card (Fully visible, readable, interactive) */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="bg-[#141923]/95 backdrop-blur-2xl border border-[#2A3447] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
            <div className="flex flex-col items-center text-center mb-6">
              <img src="/logo.jpg" alt="Vaultix Income" className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/60 object-cover shadow-lg mb-2" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#D4AF37] tracking-wider">VAULTIX INCOME</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Digital Asset Management & Wealth Platform</p>
            </div>

            <div className="flex border-b border-[#2A3447] mb-6">
              <button
                onClick={() => { setTab('login'); setError(null); setMessage(null); }}
                className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  tab === 'login' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                LOG IN
              </button>
              <button
                onClick={() => { setTab('register'); setError(null); setMessage(null); }}
                className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  tab === 'register' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                REGISTER
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-500/15 border border-red-500/40 text-red-400 text-xs p-3 rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="mb-4 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs p-3 rounded-xl flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Username or Email</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Enter username or email"
                      className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#b8982e] text-black font-extrabold py-3 rounded-xl text-xs transition-all shadow-lg mt-2 cursor-pointer uppercase tracking-wider"
                >
                  SECURE LOG IN
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose username"
                    className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="First and last name"
                    className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Valid Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">Invite / Referral Code</label>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
                      <Gift className="w-3 h-3" />
                      <span>Get $5 Signup Bonus</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={referralCodeInput}
                    onChange={(e) => setReferralCodeInput(e.target.value)}
                    placeholder="Enter referral code (optional)"
                    className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#10B981] hover:bg-[#0d9668] text-black font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-md mt-2 cursor-pointer uppercase tracking-wider"
                >
                  CREATE ACCOUNT
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
