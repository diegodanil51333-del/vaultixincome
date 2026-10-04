import React from 'react';
import { User } from '../types';
import { getInvestments, getTransactions } from '../db';
import { Wallet, TrendingUp, ShieldCheck, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { HowItWorks } from './HowItWorks';

interface DashboardScreenProps {
  user: User;
  onNavigateToTab: (tab: 'vaults' | 'invite' | 'wallet') => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onNavigateToTab }) => {
  const allInvestments = getInvestments().filter((inv) => inv.userId === user.userId);
  const activeInvestments = allInvestments.filter((inv) => inv.status === 'ACTIVE');
  const completedInvestments = allInvestments.filter((inv) => inv.status === 'COMPLETED');
  const allTransactions = getTransactions().filter((tx) => tx.userId === user.userId);

  // Dynamic Metrics Calculation from Real Database State
  const mainBalance = user.balance || 0.0;
  const referralBalance = user.referralEarnings || 0.0;
  const activeVaultsValue = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0.0);
  
  const completedYields = completedInvestments.reduce((sum, inv) => sum + (inv.dailyReturn * inv.durationDays), 0.0);
  const totalYieldProfit = (user.totalProfitLoss || 0.0) + completedYields;

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#141923] via-[#1D2432] to-[#141923] border border-[#D4AF37]/30 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#D4AF37] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">ACCOUNT ID: {user.accountId}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">Welcome, {user.fullName}</h2>
            <p className="text-xs text-slate-400 mt-1">Realtime database portfolio overview and active yield strategies</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToTab('wallet')}
              className="flex-1 md:flex-initial bg-[#D4AF37] hover:bg-[#b8982e] text-black font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md"
            >
              <Wallet className="w-4 h-4" />
              <span>Deposit Funds</span>
            </button>
            <button
              onClick={() => onNavigateToTab('vaults')}
              className="flex-1 md:flex-initial bg-[#10B981] hover:bg-[#0d9668] text-black font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Explore Vaults</span>
            </button>
          </div>
        </div>

        {/* Dynamic Financial Metrics Cards (Zero Fake Defaults!) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 pt-6 border-t border-[#2A3447]">
          <div className="bg-[#0B0E14]/60 p-3.5 rounded-xl border border-[#2A3447]/60">
            <span className="text-[11px] text-slate-400 font-semibold block">Main Balance</span>
            <div className="text-lg md:text-xl font-extrabold text-[#D4AF37] mt-0.5">
              ${mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-[#0B0E14]/60 p-3.5 rounded-xl border border-[#2A3447]/60">
            <span className="text-[11px] text-slate-400 font-semibold block">Referral Balance</span>
            <div className="text-lg md:text-xl font-extrabold text-emerald-400 mt-0.5">
              ${referralBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-[#0B0E14]/60 p-3.5 rounded-xl border border-[#2A3447]/60">
            <span className="text-[11px] text-slate-400 font-semibold block">Active Vaults Value</span>
            <div className="text-lg md:text-xl font-extrabold text-[#06B6D4] mt-0.5">
              ${activeVaultsValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-[#0B0E14]/60 p-3.5 rounded-xl border border-[#2A3447]/60">
            <span className="text-[11px] text-slate-400 font-semibold block">Total Yield & Profit</span>
            <div className="text-lg md:text-xl font-extrabold text-[#10B981] mt-0.5">
              +${totalYieldProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Active Investment Vaults */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Active Investment Vaults ({activeInvestments.length})</span>
          </h3>
          <button
            onClick={() => onNavigateToTab('vaults')}
            className="text-xs font-semibold text-[#D4AF37] hover:underline"
          >
            + Subscribe New Vault
          </button>
        </div>

        {activeInvestments.length === 0 ? (
          <div className="bg-[#141923] border border-[#2A3447] rounded-xl p-8 text-center text-slate-400 text-xs">
            No active vaults currently. Subscribe to a yield vault to start earning daily compound returns.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeInvestments.map((inv) => (
              <div key={inv.id} className="bg-[#141923] border border-[#2A3447] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{inv.planName}</h4>
                    <span className="text-[10px] text-[#D4AF37] font-semibold">{inv.asset} Asset Strategy</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    ACTIVE
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#2A3447] text-xs">
                  <div>
                    <span className="text-slate-400">Principal:</span>
                    <span className="font-bold text-white ml-1.5">${inv.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Daily Return:</span>
                    <span className="font-bold text-[#10B981] ml-1.5">+${inv.dailyReturn.toFixed(2)}/day</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Transactions Activity */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[#06B6D4]" />
          <span>Recent Transaction Activity</span>
        </h3>

        {allTransactions.length === 0 ? (
          <div className="bg-[#141923] border border-[#2A3447] rounded-xl p-6 text-center text-slate-400 text-xs">
            No recent transaction history recorded.
          </div>
        ) : (
          <div className="bg-[#141923] border border-[#2A3447] rounded-xl divide-y divide-[#2A3447] overflow-hidden">
            {allTransactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-[#1D2432]/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'DEPOSIT' || tx.type === 'REFERRAL_REWARD' || tx.type === 'ADMIN_CREDIT' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {tx.type === 'DEPOSIT' || tx.type === 'REFERRAL_REWARD' || tx.type === 'ADMIN_CREDIT' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-white">{tx.note || tx.type}</div>
                    <div className="text-[10px] text-slate-400">{new Date(tx.timestamp).toLocaleString()}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-bold ${tx.type === 'DEPOSIT' || tx.type === 'REFERRAL_REWARD' || tx.type === 'ADMIN_CREDIT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.type === 'DEPOSIT' || tx.type === 'REFERRAL_REWARD' || tx.type === 'ADMIN_CREDIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
