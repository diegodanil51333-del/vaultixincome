import React from 'react';
import { 
  BitcoinLogo, 
  EthereumLogo, 
  TetherLogo, 
  BnbLogo, 
  XrpLogo, 
  TronLogo, 
  SolanaLogo 
} from './CryptoLogos';

export const AmbientBackground: React.FC = () => {
  return (
    <div 
      id="vaultix-ambient-bg"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0B0E14]"
      aria-hidden="true"
    >
      {/* 1. Deep Multi-Tier Institutional Radial Glows (Stationary, Non-Shaking) */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1E293B]/40 via-indigo-950/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#D4AF37]/10 via-amber-950/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-28 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-950/20 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#0F172A]/70 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />

      {/* 2. Subtle Financial Chart Line & Network Pattern Silhouettes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00AAE4" stopOpacity="0.3" />
          </linearGradient>
          <pattern id="tradingGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2A3447" strokeWidth="0.6" />
            <circle cx="60" cy="0" r="1.2" fill="#D4AF37" fillOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tradingGrid)" />
        <path
          d="M 0 750 Q 350 620 700 680 T 1400 560 T 2100 440 T 2800 380"
          fill="none"
          stroke="url(#chartGrad)"
          strokeWidth="1.5"
        />
        <path
          d="M 0 820 Q 400 710 800 760 T 1600 640 T 2400 520 T 3200 460"
          fill="none"
          stroke="#2A3447"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      </svg>

      {/* 3. Non-Intrusive, Stable Cryptographic Watermarks (Zero Motion/Zero Shake) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[8%] left-[4%] hidden lg:flex items-center space-x-2 p-2 rounded-2xl bg-[#141923]/40 border border-[#2A3447]/30">
          <BitcoinLogo className="w-6 h-6 opacity-60" />
          <span className="text-[10px] font-mono text-slate-400">BTC</span>
        </div>
        <div className="absolute top-[18%] right-[5%] hidden lg:flex items-center space-x-2 p-2 rounded-2xl bg-[#141923]/40 border border-[#2A3447]/30">
          <EthereumLogo className="w-6 h-6 opacity-60" />
          <span className="text-[10px] font-mono text-slate-400">ETH</span>
        </div>
        <div className="absolute top-[42%] left-[3%] hidden lg:flex items-center space-x-2 p-2 rounded-2xl bg-[#141923]/40 border border-[#2A3447]/30">
          <TetherLogo className="w-6 h-6 opacity-60" />
          <span className="text-[10px] font-mono text-slate-400">USDT</span>
        </div>
        <div className="absolute top-[55%] right-[4%] hidden lg:flex items-center space-x-2 p-2 rounded-2xl bg-[#141923]/40 border border-[#2A3447]/30">
          <SolanaLogo className="w-6 h-6 opacity-60" />
          <span className="text-[10px] font-mono text-slate-400">SOL</span>
        </div>
        <div className="absolute top-[72%] left-[5%] hidden lg:flex items-center space-x-2 p-2 rounded-2xl bg-[#141923]/40 border border-[#2A3447]/30">
          <BnbLogo className="w-6 h-6 opacity-60" />
          <span className="text-[10px] font-mono text-slate-400">BNB</span>
        </div>
        <div className="absolute top-[85%] right-[6%] hidden lg:flex items-center space-x-2 p-2 rounded-2xl bg-[#141923]/40 border border-[#2A3447]/30">
          <XrpLogo className="w-6 h-6 opacity-60" />
          <span className="text-[10px] font-mono text-slate-400">XRP</span>
        </div>
      </div>
    </div>
  );
};
