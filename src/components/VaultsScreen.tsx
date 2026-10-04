import React, { useState } from 'react';
import { User, InvestmentPlan, UserInvestment, Transaction } from '../types';
import { INVESTMENT_PLANS, getUsers, saveUsers, getInvestments, saveInvestments, getTransactions, saveTransactions, saveCurrentSession } from '../db';
import { TrendingUp, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

interface VaultsScreenProps {
  user: User;
  onUserUpdated: (user: User) => void;
}

export const VaultsScreen: React.FC<VaultsScreenProps> = ({ user, onUserUpdated }) => {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan>(INVESTMENT_PLANS[0]);
  const [depositAmount, setDepositAmount] = useState<number>(INVESTMENT_PLANS[0].minDeposit);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dailyReturn = (depositAmount * selectedPlan.dailyYield) / 100;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (depositAmount < selectedPlan.minDeposit) {
      setError(`Minimum deposit for ${selectedPlan.name} is $${selectedPlan.minDeposit}.`);
      return;
    }

    if (depositAmount > selectedPlan.maxDeposit) {
      setError(`Maximum deposit limit is $${selectedPlan.maxDeposit}.`);
      return;
    }

    if (user.balance < depositAmount) {
      setError(`Insufficient account balance. Current balance: $${user.balance.toFixed(2)}.`);
      return;
    }

    const updatedUser: User = {
      ...user,
      balance: user.balance - depositAmount,
      totalInvestments: user.totalInvestments + depositAmount
    };

    const users = getUsers();
    const idx = users.findIndex((u) => u.userId === user.userId);
    if (idx !== -1) {
      users[idx] = updatedUser;
      saveUsers(users);
    }

    const newInvestment: UserInvestment = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user.userId,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      asset: selectedPlan.asset,
      amount: depositAmount,
      dailyReturn: dailyReturn,
      startDate: new Date().toISOString(),
      status: 'ACTIVE'
    };

    const investments = getInvestments();
    investments.push(newInvestment);
    saveInvestments(investments);

    const newTx: Transaction = {
      id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: user.userId,
      type: 'YIELD',
      amount: depositAmount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      note: `Subscribed to ${selectedPlan.name}`
    };

    const transactions = getTransactions();
    transactions.unshift(newTx);
    saveTransactions(transactions);

    saveCurrentSession(updatedUser);
    onUserUpdated(updatedUser);
    setSuccess(`Successfully subscribed $${depositAmount} to ${selectedPlan.name}!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          <span>Yield Vault Strategies</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Automated compounding digital asset management plans</p>
      </div>

      {error && (
        <div className="bg-red-500/15 border border-red-500/40 text-red-400 text-xs p-3.5 rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs p-3.5 rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INVESTMENT_PLANS.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => {
                setSelectedPlan(plan);
                setDepositAmount(plan.minDeposit);
                setError(null);
                setSuccess(null);
              }}
              className={`cursor-pointer bg-[#141923] border rounded-2xl p-5 space-y-3 transition-all ${
                isSelected ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5 bg-[#1D2432]' : 'border-[#2A3447] hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{plan.name}</h3>
                  <span className="text-xs text-[#D4AF37] font-semibold">{plan.asset} Base Asset</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[#10B981]">+{plan.dailyYield}%</span>
                  <span className="block text-[10px] text-slate-400">Daily Return</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{plan.description}</p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#2A3447] text-[11px]">
                <div>
                  <span className="text-slate-400 block">Min Deposit</span>
                  <span className="font-bold text-white">${plan.minDeposit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Lock Period</span>
                  <span className="font-bold text-white">{plan.lockDays} Days</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Risk Profile</span>
                  <span className="font-bold text-[#06B6D4]">{plan.riskLevel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#141923] border border-[#2A3447] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-[#D4AF37]" />
          <span>Subscribe to {selectedPlan.name}</span>
        </h3>

        <form onSubmit={handleSubscribe} className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Deposit Amount ($)</span>
              <span>Account Balance: ${user.balance.toFixed(2)}</span>
            </div>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              min={selectedPlan.minDeposit}
              max={selectedPlan.maxDeposit}
              className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="bg-[#1D2432] border border-[#2A3447] rounded-xl p-4 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Estimated Daily Yield</span>
              <span className="text-base font-extrabold text-[#10B981]">+${dailyReturn.toFixed(2)} / day</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block">14-Day Projected Return</span>
              <span className="text-base font-extrabold text-[#D4AF37]">+${(dailyReturn * 14).toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#b8982e] text-black font-bold py-3 rounded-xl text-sm transition-all shadow-md"
          >
            CONFIRM VAULT SUBSCRIPTION
          </button>
        </form>
      </div>
    </div>
  );
};
