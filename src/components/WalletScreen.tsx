import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { getWallets, submitDeposit, submitWithdrawalRequest, getUsers, saveUsers, getTransactions, saveTransactions, saveCurrentSession, cancelDepositTransaction } from '../db';
import { Wallet, ArrowDownLeft, ArrowUpRight, Copy, Check, AlertCircle, CheckCircle, Mail, QrCode } from 'lucide-react';
import { OFFICIAL_SUPPORT_EMAIL } from './SupportScreen';

interface WalletScreenProps {
  user: User;
  onUserUpdated: (user: User) => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({ user, onUserUpdated }) => {
  const wallets = getWallets().filter((w) => w.isActive);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(wallets[0]?.symbol || 'USDT');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Deposit Submit Form
  const [depositAmount, setDepositAmount] = useState('');
  const [depError, setDepError] = useState<string | null>(null);
  const [depSuccess, setDepSuccess] = useState<string | null>(null);

  // Withdrawal Form
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawNetwork, setWithdrawNetwork] = useState('TRC20 (Tron)');
  const [wError, setWError] = useState<string | null>(null);
  const [wSuccess, setWSuccess] = useState<string | null>(null);

  const selectedWallet = wallets.find((w) => w.symbol === selectedSymbol) || wallets[0];
  const userTransactions = getTransactions().filter((tx) => tx.userId === user.userId);

  const handleCopy = () => {
    if (selectedWallet) {
      navigator.clipboard.writeText(selectedWallet.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const handleSubmitDepositRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setDepError(null);
    setDepSuccess(null);

    const amt = Number(depositAmount);
    if (!amt || amt <= 0) {
      setDepError('Please enter a valid deposit amount.');
      return;
    }

    try {
      const tx = submitDeposit(user, amt, selectedWallet.symbol);
      setDepositAmount('');
      setDepSuccess(`Deposit request #${tx.id} of ${amt} ${selectedWallet.symbol} submitted! Status: PENDING`);
      onUserUpdated({ ...user });
    } catch (err: any) {
      setDepError(err.message || 'Failed to submit deposit.');
    }
  };

  // REQUIREMENT 8: USER WITHDRAWAL SUBMISSION
  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setWError(null);
    setWSuccess(null);

    const amount = Number(withdrawAmount);

    if (!amount || amount <= 0) {
      setWError('Please enter a valid withdrawal amount.');
      return;
    }

    if (amount > user.balance) {
      setWError(`Insufficient funds. Your available balance is $${user.balance.toFixed(2)}.`);
      return;
    }

    if (!withdrawAddress.trim()) {
      setWError('Please enter a destination crypto wallet address.');
      return;
    }

    try {
      const tx = submitWithdrawalRequest(user, amount, selectedSymbol, withdrawAddress.trim(), withdrawNetwork);
      
      // Fetch latest updated user object from DB
      const freshUser = getUsers().find((u) => u.userId === user.userId) || user;
      onUserUpdated(freshUser);

      setWithdrawAmount('');
      setWithdrawAddress('');
      // REQUIREMENT 2: EXACT MSG FORMAT
      setWSuccess(`Withdrawal request #${tx.id} of $${amount.toFixed(2)} submitted! Status: PENDING`);
    } catch (err: any) {
      setWError(err.message || 'Withdrawal request failed.');
    }
  };

  const handleCancelUserDeposit = (txId: string) => {
    try {
      cancelDepositTransaction(user, txId);
      const freshUser = getUsers().find((u) => u.userId === user.userId) || user;
      onUserUpdated(freshUser);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleContactSupport = () => {
    window.location.href = `mailto:${OFFICIAL_SUPPORT_EMAIL}?subject=${encodeURIComponent('Deposit/Withdrawal Support Request')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Wallet className="w-5 h-5 text-[#D4AF37]" />
          <span>Crypto Wallet & Fund Operations</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Deposit or withdraw digital assets including XRP, BTC, ETH, USDT, and SOL
        </p>
      </div>

      {/* Asset Deposit Section */}
      <div className="bg-[#141923] border border-[#2A3447] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
          <span>Select Cryptocurrency for Deposit</span>
        </h3>

        {/* Currency Selector */}
        <div className="flex flex-wrap gap-2">
          {wallets.map((w) => (
            <button
              key={w.symbol}
              onClick={() => {
                setSelectedSymbol(w.symbol);
                setWithdrawNetwork(w.network);
                setDepError(null);
                setDepSuccess(null);
              }}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedSymbol === w.symbol
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'bg-[#1D2432] text-slate-300 border border-[#2A3447] hover:border-slate-500'
              }`}
            >
              {w.symbol}
            </button>
          ))}
        </div>

        {/* Selected Wallet Details & Instructions */}
        {selectedWallet && (
          <div className="bg-[#1D2432] border border-[#2A3447] rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-bold text-white">{selectedWallet.name} ({selectedWallet.symbol})</span>
                <span className="text-xs text-emerald-400 font-semibold block mt-0.5">Network: {selectedWallet.network}</span>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex items-center space-x-2 bg-[#0B0E14] border border-[#2A3447] p-2.5 rounded-xl self-start sm:self-auto">
                <QrCode className="w-8 h-8 text-[#D4AF37]" />
                <div className="text-[10px] text-slate-400">
                  <span className="font-bold text-white block">QR Code Active</span>
                  <span>Scan to deposit</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Official Wallet Deposit Address</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={selectedWallet.address}
                  className="flex-1 bg-[#0B0E14] border border-[#2A3447] rounded-xl px-3.5 py-2.5 text-xs text-[#D4AF37] font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="bg-[#2A3447] hover:bg-[#3B4861] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-1 shrink-0"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* XRP Destination Tag Warning */}
            {selectedWallet.symbol === 'XRP' && selectedWallet.destinationTag && (
              <div className="bg-amber-500/15 border border-amber-500/40 text-amber-300 p-3 rounded-xl text-xs space-y-1">
                <span className="font-bold block">⚠️ Destination Tag Required for XRP</span>
                <p className="text-[11px] leading-relaxed">
                  Include Destination Tag <span className="font-mono font-bold text-white">{selectedWallet.destinationTag}</span> when sending XRP. Deposits missing the destination tag cannot be automatically credited.
                </p>
              </div>
            )}

            <p className="text-[11px] text-slate-300 leading-relaxed bg-[#0B0E14] p-3 rounded-lg border border-[#2A3447]/60">
              {selectedWallet.instructions}
            </p>

            {/* Deposit Notification Submission */}
            <form onSubmit={handleSubmitDepositRequest} className="space-y-3 pt-2 border-t border-[#2A3447]">
              <h4 className="text-xs font-bold text-white">Notify System After Transferring Funds:</h4>

              {depError && (
                <div className="bg-red-500/15 border border-red-500/40 text-red-400 text-xs p-3 rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{depError}</span>
                </div>
              )}

              {depSuccess && (
                <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs p-3 rounded-xl flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{depSuccess}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="any"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder={`Amount in ${selectedWallet.symbol} (e.g. 500)`}
                  className="flex-1 bg-[#0B0E14] border border-[#2A3447] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#b8982e] text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-all shrink-0"
                >
                  Submit Deposit Notification
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* REQUIREMENT 8: WITHDRAWAL FORM */}
      <div className="bg-[#141923] border border-[#2A3447] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <ArrowUpRight className="w-4 h-4 text-rose-400" />
          <span>Request Funds Withdrawal</span>
        </h3>

        {wError && (
          <div className="bg-red-500/15 border border-red-500/40 text-red-400 text-xs p-3 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{wError}</span>
          </div>
        )}

        {wSuccess && (
          <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs p-3 rounded-xl flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{wSuccess}</span>
          </div>
        )}

        <form onSubmit={handleWithdrawal} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Asset Asset/Currency</label>
              <select
                value={selectedSymbol}
                onChange={(e) => {
                  setSelectedSymbol(e.target.value);
                  const w = wallets.find((x) => x.symbol === e.target.value);
                  if (w) setWithdrawNetwork(w.network);
                }}
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
              >
                {wallets.map((w) => (
                  <option key={w.symbol} value={w.symbol}>
                    {w.name} ({w.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Blockchain Network</label>
              <input
                type="text"
                value={withdrawNetwork}
                onChange={(e) => setWithdrawNetwork(e.target.value)}
                className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Withdrawal Amount ($ USD)</span>
              <span>Available Balance: ${user.balance.toFixed(2)}</span>
            </div>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="e.g. 250.00"
              className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Personal Destination Crypto Wallet Address</label>
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="Paste destination wallet address"
              className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md"
          >
            SUBMIT WITHDRAWAL REQUEST
          </button>
        </form>
      </div>

      {/* User Transaction History */}
      <div className="bg-[#141923] border border-[#2A3447] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Your Transaction History</h3>
          <button
            onClick={handleContactSupport}
            className="text-xs text-[#D4AF37] hover:underline flex items-center space-x-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Support</span>
          </button>
        </div>

        {userTransactions.length === 0 ? (
          <div className="text-center text-slate-400 text-xs py-6">No transaction records found.</div>
        ) : (
          <div className="divide-y divide-[#2A3447] overflow-hidden rounded-xl border border-[#2A3447]">
            {userTransactions.map((tx) => (
              <div key={tx.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-[#1D2432]/50 transition-colors">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-300">{tx.id}</span>
                    <span className="font-bold text-white">{tx.note || tx.type}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{new Date(tx.timestamp).toLocaleString()}</div>
                </div>

                <div className="text-right flex items-center space-x-3">
                  <div>
                    <div className={`font-bold ${tx.type === 'WITHDRAWAL' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {tx.type === 'WITHDRAWAL' ? '-' : '+'}${tx.amount.toFixed(2)} {tx.currency}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tx.status === 'APPROVED' || tx.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : tx.status === 'PENDING'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>

                  {tx.type === 'DEPOSIT' && tx.status === 'PENDING' && (
                    <button
                      onClick={() => handleCancelUserDeposit(tx.id)}
                      className="text-[10px] text-rose-400 hover:underline border border-rose-500/30 px-2 py-1 rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
