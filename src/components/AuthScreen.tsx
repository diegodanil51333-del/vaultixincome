import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { getUsers, saveUsers, saveCurrentSession, getTransactions, saveTransactions, getReferralConfig } from '../db';
import { Lock, User as UserIcon, CheckCircle, AlertCircle, Gift } from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [referralCodeInput, setReferralCodeInput] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setError('Please enter your username/email and password.');
      return;
    }

    const users = getUsers();
    const foundUser = users.find(
      (u) =>
        (u.username.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
          u.email.toLowerCase() === loginIdentifier.trim().toLowerCase()) &&
        u.passwordHash === loginPassword
    );

    if (!foundUser) {
      setError('Invalid login credentials. Please check your username/email and password.');
      return;
    }

    if (foundUser.accountStatus === 'SUSPENDED') {
      setError('Account suspended. Please contact Vaultix Income support.');
      return;
    }

    saveCurrentSession(foundUser);
    onLoginSuccess(foundUser);
  };

  const handleRegister = (e: React.FormEvent) => {
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

    const refConfig = getReferralConfig();
    let referrerUsername: string | undefined = undefined;
    let initialReferralEarnings = 0;

    const txs = getTransactions();

    if (referralCodeInput.trim()) {
      const referrer = users.find((u) => u.referralCode.toLowerCase() === referralCodeInput.trim().toLowerCase());
      if (referrer) {
        referrerUsername = referrer.username;
        // Referrer receives $25 referral bonus
        referrer.referralEarnings += refConfig.bonusAmount || 25.0;

        // Record referrer bonus transaction
        txs.unshift({
          id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
          userId: referrer.userId,
          type: 'REFERRAL_REWARD',
          amount: refConfig.bonusAmount || 25.0,
          currency: 'USD',
          status: 'COMPLETED',
          timestamp: new Date().toISOString(),
          note: `Referral Reward for inviting @${username.trim()}`
        });

        // Newly registered user receives $5 signup referral bonus
        initialReferralEarnings = 5.0;
      } else {
        setError('Invalid referral code provided. Registration cancelled.');
        return;
      }
    }

    // REQUIREMENT 1: DEFAULT STARTING BALANCE IS $0.00
    const newUser: User = {
      userId: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
      accountId: `VX-${Math.floor(100000 + Math.random() * 900000)}`,
      username: username.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
      passwordHash: password,
      role: 'USER',
      accountStatus: 'ACTIVE',
      balance: 0.0, // Default starting balance is $0.00 until deposit is approved
      referralEarnings: initialReferralEarnings,
      totalDeposits: 0.0,
      totalInvestments: 0.0,
      totalProfitLoss: 0.0,
      referralCode: `VXREF-${Math.floor(1000 + Math.random() * 9000)}`,
      referredByUsername: referrerUsername,
      createdAt: new Date().toISOString()
    };

    if (initialReferralEarnings > 0) {
      txs.unshift({
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: newUser.userId,
        type: 'REFERRAL_REWARD',
        amount: initialReferralEarnings,
        currency: 'USD',
        status: 'COMPLETED',
        timestamp: new Date().toISOString(),
        note: `Referral Signup Bonus ($5.00)`
      });
    }

    users.push(newUser);
    saveUsers(users);
    saveTransactions(txs);

    setMessage(
      initialReferralEarnings > 0
        ? 'Registration successful! $5 Referral Signup Bonus applied to your account.'
        : 'Registration successful! Welcome to Vaultix Income.'
    );

    setTimeout(() => {
      saveCurrentSession(newUser);
      onLoginSuccess(newUser);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#141923] border border-[#2A3447] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-6">
          <img src="/logo.jpg" alt="Vaultix Income" className="w-20 h-20 rounded-full border-2 border-[#D4AF37]/60 object-cover shadow-lg mb-3" />
          <h1 className="text-2xl font-extrabold text-[#D4AF37] tracking-wider">VAULTIX INCOME</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Digital Asset Management & Wealth Platform</p>
        </div>

        <div className="flex border-b border-[#2A3447] mb-6">
          <button
            onClick={() => { setTab('login'); setError(null); setMessage(null); }}
            className={`flex-1 py-2.5 text-sm font-bold border-b-2 transition-all ${
              tab === 'login' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            LOG IN
          </button>
          <button
            onClick={() => { setTab('register'); setError(null); setMessage(null); }}
            className={`flex-1 py-2.5 text-sm font-bold border-b-2 transition-all ${
              tab === 'register' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            REGISTER
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/15 border border-red-500/40 text-red-400 text-xs p-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-4 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs p-3 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username or Email</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Enter username or email"
                  className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#b8982e] text-black font-bold py-2.5 rounded-lg text-sm transition-all shadow-md mt-2"
            >
              SECURE LOG IN
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose username"
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
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
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
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
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
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
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Invite / Referral Code (Optional)</label>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
                  <Gift className="w-3 h-3" />
                  <span>Get $5 Signup Bonus</span>
                </span>
              </div>
              <input
                type="text"
                value={referralCodeInput}
                onChange={(e) => setReferralCodeInput(e.target.value)}
                placeholder="e.g. VXREF-8921"
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#0d9668] text-black font-bold py-2.5 rounded-lg text-sm transition-all shadow-md mt-2"
            >
              CREATE ACCOUNT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
