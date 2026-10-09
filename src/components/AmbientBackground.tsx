import React from 'react';
import { BitcoinLogo, EthereumLogo, TetherLogo, BnbLogo, XrpLogo, TronLogo, SolanaLogo } from './CryptoLogos';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0B0E14]">
      {/* Deep Institutional Trading Radial Ambient Lights */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1E293B]/40 via-indigo-950/25 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#D4AF37]/10 via-amber-950/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-900/15 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#0F172A]/80 via-[#0B0E14] to-transparent blur-3xl pointer-events-none" />

      {/* Floating Animated Cryptocurrency Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Bitcoin */}
        <div className="absolute top-[12%] left-[8%] md:left-[12%] animate-float-slow opacity-20 hover:opacity-40 transition-opacity">
          <div className="p-3 rounded-2xl bg-[#141923]/60 border border-[#F7931A]/30 backdrop-blur-sm shadow-lg shadow-[#F7931A]/5 flex items-center space-x-2">
            <BitcoinLogo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-bold text-[#F7931A] block">BTC</span>
              <span className="text-[9px] text-slate-400 font-mono">Vault Benchmark</span>
            </div>
          </div>
        </div>

        {/* Floating Ethereum */}
        <div className="absolute top-[28%] right-[6%] md:right-[14%] animate-float-reverse opacity-20 hover:opacity-40 transition-opacity">
          <div className="p-3 rounded-2xl bg-[#141923]/60 border border-[#627EEA]/30 backdrop-blur-sm shadow-lg shadow-[#627EEA]/5 flex items-center space-x-2">
            <EthereumLogo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-bold text-[#627EEA] block">ETH</span>
              <span className="text-[9px] text-slate-400 font-mono">Smart Yield</span>
            </div>
          </div>
        </div>

        {/* Floating Tether (USDT) */}
        <div className="absolute top-[48%] left-[4%] md:left-[8%] animate-float-reverse opacity-20 hover:opacity-40 transition-opacity">
          <div className="p-2.5 rounded-2xl bg-[#141923]/60 border border-[#26A17B]/30 backdrop-blur-sm shadow-lg shadow-[#26A17B]/5 flex items-center space-x-2">
            <TetherLogo className="w-7 h-7 md:w-9 md:h-9" />
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-bold text-[#26A17B] block">USDT</span>
              <span className="text-[9px] text-slate-400 font-mono">TRC20 Liquidity</span>
            </div>
          </div>
        </div>

        {/* Floating BNB */}
        <div className="absolute top-[65%] right-[8%] md:right-[12%] animate-float-slow opacity-20 hover:opacity-40 transition-opacity">
          <div className="p-2.5 rounded-2xl bg-[#141923]/60 border border-[#F3BA2F]/30 backdrop-blur-sm shadow-lg shadow-[#F3BA2F]/5 flex items-center space-x-2">
            <BnbLogo className="w-7 h-7 md:w-9 md:h-9" />
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-bold text-[#F3BA2F] block">BNB</span>
              <span className="text-[9px] text-slate-400 font-mono">BEP20 Protocol</span>
            </div>
          </div>
        </div>

        {/* Floating XRP */}
        <div className="absolute top-[80%] left-[10%] md:left-[16%] animate-float-slow opacity-20 hover:opacity-40 transition-opacity">
          <div className="p-2.5 rounded-2xl bg-[#141923]/60 border border-[#00AAE4]/30 backdrop-blur-sm shadow-lg shadow-[#00AAE4]/5 flex items-center space-x-2">
            <XrpLogo className="w-7 h-7 md:w-8 md:h-8" />
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-bold text-[#00AAE4] block">XRP</span>
              <span className="text-[9px] text-slate-400 font-mono">Ledger Settlement</span>
            </div>
          </div>
        </div>

        {/* Floating TRON (TRX) */}
        <div className="absolute top-[86%] right-[15%] md:right-[22%] animate-float-reverse opacity-20 hover:opacity-40 transition-opacity">
          <div className="p-2.5 rounded-2xl bg-[#141923]/60 border border-[#EB0029]/30 backdrop-blur-sm shadow-lg shadow-[#EB0029]/5 flex items-center space-x-2">
            <TronLogo className="w-7 h-7 md:w-8 md:h-8" />
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-bold text-[#EB0029] block">TRX</span>
              <span className="text-[9px] text-slate-400 font-mono">TRON Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Trading Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #2A3447 1px, transparent 1px), linear-gradient(to bottom, #2A3447 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};
