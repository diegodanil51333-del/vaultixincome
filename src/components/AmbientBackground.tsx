import React from 'react';
import { BitcoinLogo, EthereumLogo, TetherLogo, BnbLogo, XrpLogo, TronLogo, SolanaLogo } from './CryptoLogos';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0B0E14]">
      {/* Deep Institutional Trading Radial Ambient Lights */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#1E293B]/60 via-indigo-950/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#D4AF37]/15 via-amber-950/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-950/20 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#0F172A]/90 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />

      {/* Dynamic Animated Floating Top Cryptocurrencies with Real Vector SVGs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Bitcoin (BTC) */}
        <div className="absolute top-[8%] left-[4%] sm:left-[8%] md:left-[10%] animate-float-slow opacity-40 md:opacity-55 transition-opacity">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#141923]/80 border border-[#F7931A]/40 backdrop-blur-md shadow-xl shadow-[#F7931A]/10 flex items-center space-x-2.5">
            <BitcoinLogo className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[11px] font-extrabold text-white block">BTC</span>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+2.85%</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono block">Bitcoin Digital Gold</span>
            </div>
          </div>
        </div>

        {/* Floating Ethereum (ETH) */}
        <div className="absolute top-[18%] right-[4%] sm:right-[8%] md:right-[12%] animate-float-reverse opacity-40 md:opacity-55 transition-opacity">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#141923]/80 border border-[#627EEA]/40 backdrop-blur-md shadow-xl shadow-[#627EEA]/10 flex items-center space-x-2.5">
            <EthereumLogo className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[11px] font-extrabold text-white block">ETH</span>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+1.92%</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono block">Smart Yield Vaults</span>
            </div>
          </div>
        </div>

        {/* Floating Solana (SOL) */}
        <div className="absolute top-[38%] left-[2%] sm:left-[6%] md:left-[8%] animate-float-diagonal opacity-40 md:opacity-50 transition-opacity">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#141923]/80 border border-[#9945FF]/40 backdrop-blur-md shadow-xl shadow-[#9945FF]/10 flex items-center space-x-2.5">
            <SolanaLogo className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[11px] font-extrabold text-white block">SOL</span>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+2.10%</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono block">High-Speed Liquidity</span>
            </div>
          </div>
        </div>

        {/* Floating Tether (USDT) */}
        <div className="absolute top-[48%] right-[3%] sm:right-[7%] md:right-[10%] animate-float-bob opacity-40 md:opacity-55 transition-opacity">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#141923]/80 border border-[#26A17B]/40 backdrop-blur-md shadow-xl shadow-[#26A17B]/10 flex items-center space-x-2.5">
            <TetherLogo className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[11px] font-extrabold text-white block">USDT</span>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">1.00 USD</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono block">TRC20 Multi-Sig Vault</span>
            </div>
          </div>
        </div>

        {/* Floating BNB */}
        <div className="absolute top-[64%] left-[5%] sm:left-[9%] md:left-[12%] animate-float-slow opacity-40 md:opacity-50 transition-opacity">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#141923]/80 border border-[#F3BA2F]/40 backdrop-blur-md shadow-xl shadow-[#F3BA2F]/10 flex items-center space-x-2.5">
            <BnbLogo className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[11px] font-extrabold text-white block">BNB</span>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+3.15%</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono block">Ecosystem Reserves</span>
            </div>
          </div>
        </div>

        {/* Floating XRP */}
        <div className="absolute top-[78%] right-[4%] sm:right-[10%] md:right-[14%] animate-float-reverse opacity-40 md:opacity-50 transition-opacity">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#141923]/80 border border-[#00AAE4]/40 backdrop-blur-md shadow-xl shadow-[#00AAE4]/10 flex items-center space-x-2.5">
            <XrpLogo className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[11px] font-extrabold text-white block">XRP</span>
                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+4.12%</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono block">XRPL Cross-Border</span>
            </div>
          </div>
        </div>

        {/* Floating TRON (TRX) */}
        <div className="absolute top-[88%] left-[8%] sm:left-[14%] md:left-[18%] animate-float-diagonal opacity-40 md:opacity-50 transition-opacity">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#141923]/80 border border-[#EB0029]/40 backdrop-blur-md shadow-xl shadow-[#EB0029]/10 flex items-center space-x-2">
            <TronLogo className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-extrabold text-white block">TRX</span>
                <span className="text-[8px] text-emerald-400 font-bold bg-emerald-500/15 px-1 rounded">+1.45%</span>
              </div>
              <span className="text-[8px] text-slate-400 font-mono block">TRON Smart Rails</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Coordinate Trading Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #2A3447 1px, transparent 1px), linear-gradient(to bottom, #2A3447 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};
