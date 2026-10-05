import React, { useState } from 'react';
import { User, InvestmentPlan, UserInvestment } from '../types';
import { getPlans, subscribeInvestmentPlan, getInvestments, submitWithdrawalRequest, getUsers } from '../db';
import { TrendingUp, CheckCircle, AlertCircle, DollarSign, ArrowUpRight, ShieldCheck, X } from 'lucide-react';

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

  // Investment Withdrawal Modal State
  const [selectedInvForWithdraw, setSelectedInvForWithdraw] = useState<UserInvestment | null>(null);
  const [invWithdrawAddress, setInvWithdrawAddress] = useState('');
  const [invWithdrawNetwork, setInvWithdrawNetwork] = useState('TRC20 (Tron)');
  const [invWError, setInvWError] = useState<string | null>(null);
  const [invWSuccess, setInvWSuccess] = useState<string | null>(null);

  const userInvestments = getInvestments().filter((inv) => inv.userId === user.userId);
  const dailyReturn = (depositAmount * selectedPlan.dailyYield) / 100;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = subscribeInvestmentPlan(user, selectedPlan.id, depositAmount);
      onUserUpdated(res.user);
      setSuccess(`Successfully subscribed $${depositAmount} to ${selectedPlan.name}! Daily return: +$${res.inv.dailyReturn.toFixed(2)}/day.`);
    } catch (err: any) {
      setError(err.message || 'Subscription failed.');
    }
  };

  const handleExecuteInvestmentWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setInvWError(null);
    setInvWSuccess(null);

    if (!selectedInvForWithdraw) return;

    if (!invWithdrawAddress.trim()) {
      setInvWError('Please enter a destination crypto wallet address.');
      return;
    }

    try {
      const profit = selectedInvForWithdraw.dailyReturn * selectedInvForWithdraw.durationDays;
      const totalAmount = selectedInvForWithdraw.amount + profit;

      const tx = submitWithdrawalRequest(
        user,
        totalAmount,
        selectedInvForWithdraw.asset,
        invWithdrawAddress.trim(),
        invWithdrawNetwork,
        selectedInvForWithdraw.id
      );

      const freshUser = getUsers().find((u) => u.userId === user.userId) || user;
      onUserUpdated(freshUser);

      // REQUIREMENT 2: EXACT MSG: "Withdrawal request #TX-275898 of $10.00 submitted! Status: PENDING"
      setInvWSuccess(`Withdrawal request #${tx.id} of $${totalAmount.toFixed(2)} submitted! Status: PENDING`);
      setSelectedInvForWithdraw(null);
      setInvWithdrawAddress('');
    } catch (err: any) {
      setInvWError(err.message || 'Investment withdrawal failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          <span>Yield Vault Strategies & Portfolio</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Automated compounding digital asset yield strategies with instant withdrawal routing
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

      {invWSuccess && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs p-3.5 rounded-xl flex items-center space-x-2 font-mono">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{invWSuccess}</span>
        </div>
      )}

      {/* Vault Plans Grid */}
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

      {/* Subscribe Form */}
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
            className="w-full bg-[#D4AF37] hover:bg-[#b8982e] text-black font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
          >
            CONFIRM VAULT SUBSCRIPTION
          </button>
        </form>
      </div>

      {/* REQUIREMENT 1: USER ACTIVE & MATURED INVESTMENTS WITH WITHDRAW OPTION */}
      <div className="bg-[#141923] border border-[#2A3447] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>Your Active & Matured Investments ({userInvestments.length})</span>
        </h3>

        {userInvestments.length === 0 ? (
          <div className="text-center text-slate-400 text-xs py-6">No investment subscriptions recorded yet.</div>
        ) : (
          <div className="space-y-3">
            {userInvestments.map((inv) => {
              const profit = inv.dailyReturn * inv.durationDays;
              const totalPayout = inv.amount + profit;
              const isEligibleForWithdrawal = inv.status === 'COMPLETED' || inv.status === 'ACTIVE';

              return (
                <div key={inv.id} className="bg-[#1D2432] border border-[#2A3447] rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{inv.planName}</span>
                        <span className="text-xs text-[#D4AF37] font-mono">({inv.id})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inv.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : inv.status === 'ACTIVE'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Asset: {inv.asset} • Start Date: {new Date(inv.startDate).toLocaleDateString()} • Lock Period: {inv.durationDays} Days
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-white">${inv.amount.toFixed(2)} Principal</div>
                      <div className="text-xs font-extrabold text-[#10B981]">+${profit.toFixed(2)} Earned Profit</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#2A3447]">
                    <div className="text-xs">
                      <span className="text-slate-400">Total Withdrawal Value: </span>
                      <span className="font-bold text-[#D4AF37]">${totalPayout.toFixed(2)} USD</span>
                    </div>

                    {isEligibleForWithdrawal && inv.status !== 'WITHDRAWAL_PENDING' && inv.status !== 'WITHDRAWN' && (
                      <button
                        onClick={() => setSelectedInvForWithdraw(inv)}
                        className="bg-[#10B981] hover:bg-[#0d9668] text-black font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-md cursor-pointer"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>Withdraw Investment</span>
                      </button>
                    )}

                    {inv.status === 'WITHDRAWAL_PENDING' && (
                      <span className="text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl">
                        Withdrawal Request Pending Admin
                      </span>
                    )}

                    {inv.status === 'WITHDRAWN' && (
                      <span className="text-xs text-slate-400 font-bold bg-slate-700/30 px-3 py-1 rounded-xl">
                        Fully Withdrawn
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* WITHDRAW INVESTMENT MODAL */}
      {selectedInvForWithdraw && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141923] border border-[#2A3447] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedInvForWithdraw(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ArrowUpRight className="w-5 h-5 text-[#10B981]" />
              <span>Withdraw Investment ({selectedInvForWithdraw.planName})</span>
            </h3>

            <div className="bg-[#1D2432] border border-[#2A3447] rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Principal Amount:</span><span className="font-bold text-white">${selectedInvForWithdraw.amount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Earned Profit:</span><span className="font-bold text-[#10B981]">+${(selectedInvForWithdraw.dailyReturn * selectedInvForWithdraw.durationDays).toFixed(2)}</span></div>
              <div className="flex justify-between pt-1 border-t border-[#2A3447]"><span className="text-slate-300 font-bold">Total Payout:</span><span className="font-extrabold text-[#D4AF37]">${(selectedInvForWithdraw.amount + (selectedInvForWithdraw.dailyReturn * selectedInvForWithdraw.durationDays)).toFixed(2)} USD</span></div>
            </div>

            {invWError && (
              <div className="bg-red-500/15 border border-red-500/40 text-red-400 text-xs p-3 rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{invWError}</span>
              </div>
            )}

            <form onSubmit={handleExecuteInvestmentWithdrawal} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Blockchain Network</label>
                <input
                  type="text"
                  value={invWithdrawNetwork}
                  onChange={(e) => setInvWithdrawNetwork(e.target.value)}
                  className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Destination Crypto Wallet Address</label>
                <input
                  type="text"
                  value={invWithdrawAddress}
                  onChange={(e) => setInvWithdrawAddress(e.target.value)}
                  placeholder="Paste destination wallet address"
                  className="w-full bg-[#1D2432] border border-[#2A3447] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#10B981]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#10B981] hover:bg-[#0d9668] text-black font-bold py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer mt-2"
              >
                SUBMIT INVESTMENT WITHDRAWAL
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
