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
      style={{ contain: 'strict' }}
    >
      {/* 1. Deep Multi-Tier Institutional Radial Glows */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#1E293B]/60 via-indigo-950/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#D4AF37]/15 via-amber-950/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-950/25 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#0F172A]/90 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />

      {/* 2. Subtle Financial Chart Line & Network Pattern Silhouettes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00AAE4" stopOpacity="0.3" />
          </linearGradient>
          <pattern id="tradingGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2A3447" strokeWidth="0.8" />
            <circle cx="60" cy="0" r="1.5" fill="#D4AF37" fillOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tradingGrid)" />
        {/* Subtle decorative yield growth wave */}
        <path
          d="M 0 550 Q 300 420 600 480 T 1200 360 T 1800 240 T 2400 180"
          fill="none"
          stroke="url(#chartGrad)"
          strokeWidth="2"
        />
        <path
          d="M 0 650 Q 350 540 700 590 T 1400 460 T 2100 340 T 2800 280"
          fill="none"
          stroke="#2A3447"
          strokeWidth="1.2"
          strokeDasharray="4,4"
        />
      </svg>

      {/* 3. Smooth Hardware-Accelerated Floating Top Cryptocurrencies */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'paint' }}>
        {/* Bitcoin (BTC) */}
        <div className="absolute top-[8%] left-[6%] sm:left-[10%] animate-float-slow opacity-45 md:opacity-60 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/90 border border-[#F7931A]/40 backdrop-blur-md shadow-xl shadow-[#F7931A]/10 flex items-center space-x-2">
            <BitcoinLogo className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white block">BTC</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+2.85%</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono block">Bitcoin Vault</span>
            </div>
          </div>
        </div>

        {/* Ethereum (ETH) */}
        <div className="absolute top-[16%] right-[6%] sm:right-[10%] animate-float-reverse opacity-45 md:opacity-60 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/90 border border-[#627EEA]/40 backdrop-blur-md shadow-xl shadow-[#627EEA]/10 flex items-center space-x-2">
            <EthereumLogo className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white block">ETH</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+1.92%</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono block">Ethereum Yield</span>
            </div>
          </div>
        </div>

        {/* Tether (USDT) */}
        <div className="absolute top-[36%] left-[4%] sm:left-[8%] animate-float-diagonal opacity-45 md:opacity-60 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/90 border border-[#26A17B]/40 backdrop-blur-md shadow-xl shadow-[#26A17B]/10 flex items-center space-x-2">
            <TetherLogo className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white block">USDT</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">1.00 USD</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono block">TRC20 Liquidity</span>
            </div>
          </div>
        </div>

        {/* Solana (SOL) */}
        <div className="absolute top-[48%] right-[5%] sm:right-[9%] animate-float-bob opacity-45 md:opacity-60 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/90 border border-[#9945FF]/40 backdrop-blur-md shadow-xl shadow-[#9945FF]/10 flex items-center space-x-2">
            <SolanaLogo className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white block">SOL</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+2.10%</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono block">High-Speed Node</span>
            </div>
          </div>
        </div>

        {/* BNB Chain */}
        <div className="absolute top-[64%] left-[6%] sm:left-[11%] animate-float-slow opacity-45 md:opacity-60 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/90 border border-[#F3BA2F]/40 backdrop-blur-md shadow-xl shadow-[#F3BA2F]/10 flex items-center space-x-2">
            <BnbLogo className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white block">BNB</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+3.15%</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono block">BNB Reserves</span>
            </div>
          </div>
        </div>

        {/* Ripple (XRP) */}
        <div className="absolute top-[76%] right-[6%] sm:right-[11%] animate-float-reverse opacity-45 md:opacity-60 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/90 border border-[#00AAE4]/40 backdrop-blur-md shadow-xl shadow-[#00AAE4]/10 flex items-center space-x-2">
            <XrpLogo className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white block">XRP</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+4.12%</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono block">XRPL Liquidity</span>
            </div>
          </div>
        </div>

        {/* TRON (TRX) */}
        <div className="absolute top-[88%] left-[8%] sm:left-[14%] animate-float-diagonal opacity-45 md:opacity-60 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/90 border border-[#EB0029]/40 backdrop-blur-md shadow-xl shadow-[#EB0029]/10 flex items-center space-x-2">
            <TronLogo className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white block">TRX</span>
                <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+1.45%</span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono block">TRON Smart Rails</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
