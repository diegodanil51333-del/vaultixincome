import React, { useState } from 'react';
import { User, InvestmentPlan } from '../types';
import { getPlans, subscribeInvestmentPlan } from '../db';
import { TrendingUp, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

interface VaultsScreenProps {
  user: User;
  onUserUpdated: (user: User) => void;
}

export const VaultsScreen: React.FC<VaultsScreenProps> = ({ user, onUserUpdated }) => {
  const activePlans = getPlans().filter((p) => p.isActive);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan>(activePlans[0] || getPlans()[0]);
  const [depositAmount, setDepositAmount] = useState<number>(selectedPlan.minDeposit);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dailyReturn = (depositAmount * selectedPlan.dailyYield) / 100;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Execute server-side subscription engine
      const res = subscribeInvestmentPlan(user, selectedPlan.id, depositAmount);
      onUserUpdated(res.user);
      setSuccess(`Successfully subscribed $${depositAmount} to ${selectedPlan.name}! Daily return: +$${res.inv.dailyReturn.toFixed(2)}/day.`);
    } catch (err: any) {
      setError(err.message || 'Subscription failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          <span>Yield Vault Strategies</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Automated compounding digital asset management plans ranging from $10 to $100,000
        </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activePlans.map((plan) => {
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
                  <h3 className="font-bold text-white text-sm">{plan.name}</h3>
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
                  <span className="text-slate-400 block">Max Limit</span>
                  <span className="font-bold text-white">${plan.maxDeposit.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Lock Period</span>
                  <span className="font-bold text-[#06B6D4]">{plan.lockDays} Days</span>
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
              <span>Available Balance: ${user.balance.toFixed(2)}</span>
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
              <span className="text-slate-400 block">Estimated Daily Return</span>
              <span className="text-base font-extrabold text-[#10B981]">+${dailyReturn.toFixed(2)} / day</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block">{selectedPlan.lockDays}-Day Total Projected Return</span>
              <span className="text-base font-extrabold text-[#D4AF37]">+${(dailyReturn * selectedPlan.lockDays).toFixed(2)}</span>
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
