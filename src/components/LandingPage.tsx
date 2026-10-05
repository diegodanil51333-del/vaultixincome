import React from 'react';
import { MarketTracker } from './MarketTracker';
import { ShieldCheck, TrendingUp, Lock, ArrowRight, BookOpen, Layers, Zap, Award, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white font-sans flex flex-col selection:bg-[#D4AF37] selection:text-black">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-[#2A3447]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.jpg" alt="Vaultix Income" className="w-10 h-10 rounded-full border border-[#D4AF37]/60 object-cover shadow-md" />
            <div>
              <span className="font-black text-lg text-[#D4AF37] tracking-wider block">VAULTIX INCOME</span>
              <span className="text-[10px] text-slate-400 font-bold block -mt-1 uppercase">Wealth & Yield Platform</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <a href="#assets" className="hover:text-[#D4AF37] transition-colors">Supported Assets</a>
            <a href="#features" className="hover:text-[#D4AF37] transition-colors">Platform Features</a>
            <a href="#market" className="hover:text-[#D4AF37] transition-colors">Market Intelligence</a>
            <a href="#strategies" className="hover:text-[#D4AF37] transition-colors">Educational Strategies</a>
            <a href="#security" className="hover:text-[#D4AF37] transition-colors">Security</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-[#2A3447] hover:border-slate-500 transition-all cursor-pointer"
            >
              LOG IN
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="bg-[#D4AF37] hover:bg-[#b8982e] text-black font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-[#D4AF37]/10 cursor-pointer"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-[#2A3447]">
        {/* Dark Premium Financial Radial Lighting Overlay */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-[#1D2432]/90 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#D4AF37] tracking-wide uppercase">Institutional Digital Asset Yield Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Algorithmic Yield Strategies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]">Digital Wealth Management</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Automated compounding yield vaults, multi-asset liquidity routing across USDT, BTC, ETH, SOL, and XRP with transparent portfolio reporting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#b8982e] text-black font-extrabold px-8 py-3.5 rounded-xl text-sm transition-all shadow-xl shadow-[#D4AF37]/15 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>CREATE FREE ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="w-full sm:w-auto bg-[#141923] hover:bg-[#1D2432] text-white font-bold px-8 py-3.5 rounded-xl text-sm border border-[#2A3447] transition-all cursor-pointer"
            >
              SECURE CLIENT LOGIN
            </button>
          </div>

          {/* Authentic Vector Cryptocurrency Asset Grid */}
          <div id="assets" className="pt-12">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mb-4">
              SUPPORTED BENCHMARK ASSETS & VAULTS
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {/* Bitcoin (BTC) */}
              <div className="bg-[#141923] border border-[#2A3447] p-3.5 rounded-2xl flex items-center space-x-3 hover:border-[#F7931A]/50 transition-all">
                <div className="w-9 h-9 rounded-full bg-[#F7931A]/20 text-[#F7931A] flex items-center justify-center font-extrabold text-lg border border-[#F7931A]/40">
                  ₿
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-white text-xs block">Bitcoin</span>
                  <span className="text-[10px] text-slate-400 font-mono">BTC</span>
                </div>
              </div>

              {/* Ethereum (ETH) */}
              <div className="bg-[#141923] border border-[#2A3447] p-3.5 rounded-2xl flex items-center space-x-3 hover:border-[#627EEA]/50 transition-all">
                <div className="w-9 h-9 rounded-full bg-[#627EEA]/20 text-[#627EEA] flex items-center justify-center font-extrabold text-lg border border-[#627EEA]/40">
                  Ξ
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-white text-xs block">Ethereum</span>
                  <span className="text-[10px] text-slate-400 font-mono">ETH</span>
                </div>
              </div>

              {/* Tether (USDT) */}
              <div className="bg-[#141923] border border-[#2A3447] p-3.5 rounded-2xl flex items-center space-x-3 hover:border-[#26A17B]/50 transition-all">
                <div className="w-9 h-9 rounded-full bg-[#26A17B]/20 text-[#26A17B] flex items-center justify-center font-extrabold text-lg border border-[#26A17B]/40">
                  ₮
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-white text-xs block">Tether</span>
                  <span className="text-[10px] text-slate-400 font-mono">USDT TRC20</span>
                </div>
              </div>

              {/* Solana (SOL) */}
              <div className="bg-[#141923] border border-[#2A3447] p-3.5 rounded-2xl flex items-center space-x-3 hover:border-[#9945FF]/50 transition-all">
                <div className="w-9 h-9 rounded-full bg-[#9945FF]/20 text-[#9945FF] flex items-center justify-center font-extrabold text-xs border border-[#9945FF]/40">
                  SOL
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-white text-xs block">Solana</span>
                  <span className="text-[10px] text-slate-400 font-mono">SOL</span>
                </div>
              </div>

              {/* Ripple (XRP) */}
              <div className="bg-[#141923] border border-[#2A3447] p-3.5 rounded-2xl flex items-center space-x-3 hover:border-[#00AAE4]/50 transition-all col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-full bg-[#00AAE4]/20 text-[#00AAE4] flex items-center justify-center font-extrabold text-xs border border-[#00AAE4]/40">
                  XRP
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-white text-xs block">Ripple</span>
                  <span className="text-[10px] text-slate-400 font-mono">XRPL Tag</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Section */}
      <section id="market" className="py-16 md:py-24 bg-[#0B0E14] border-b border-[#2A3447]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest">Market Intelligence</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Realtime Cryptocurrency Market Tracker</h2>
            <p className="text-xs md:text-sm text-slate-400">
              Track live spot prices, percentage movements, and 24-hour liquidity data across key benchmark assets.
            </p>
          </div>

          <MarketTracker />
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-16 md:py-24 bg-[#141923]/50 border-b border-[#2A3447]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest">Core Capabilities</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Engineered for Transparency & Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141923] border border-[#2A3447] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Automated Vault Compound Yield</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Algorithmic arbitrage and liquid staking strategies engineered to generate daily yield liquidity starting at $10.
              </p>
            </div>

            <div className="bg-[#141923] border border-[#2A3447] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Instant Multi-Currency Wallet</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Support for USDT (TRC20), Native BTC, ETH (ERC20), Native SOL, and XRP Ledger with Destination Tag verification.
              </p>
            </div>

            <div className="bg-[#141923] border border-[#2A3447] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Community Referral Program</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Earn $10.00 in referral rewards for every invited partner, while your referred partner receives an instant $5.00 signup bonus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Investment Strategies Section */}
      <section id="strategies" className="py-16 md:py-24 bg-[#0B0E14] border-b border-[#2A3447]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-widest">Financial Education</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Investment Principles & Risk Management</h2>
            <p className="text-xs md:text-sm text-slate-400">
              Understanding market volatility, diversification, and long-term asset security strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#141923] border border-[#2A3447] p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Understanding Market Risk & Diversification</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Diversification spreads capital across uncorrelated base assets (e.g. USDT, BTC, ETH) to reduce exposure to single-token volatility during broader market adjustments.
              </p>
            </div>

            <div className="bg-[#141923] border border-[#2A3447] p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-[#06B6D4]">
                <Layers className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Long-Term vs Short-Term Liquidity</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Short-term vault strategies prioritize daily return liquidity for immediate needs, whereas longer lock periods benefit from compounding returns across extended market cycles.
              </p>
            </div>

            <div className="bg-[#141923] border border-[#2A3447] p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Navigating Volatility with Delta-Neutral Arbitrage</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combining spot holdings with automated futures/options hedging allows strategies to capture yield differentials without directional market bias.
              </p>
            </div>

            <div className="bg-[#141923] border border-[#2A3447] p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-2 text-purple-400">
                <Lock className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Protecting Account Credentials & Security</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always ensure strong passwords, verify destination wallet addresses before transferring digital assets, and never share private account credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Architecture Section */}
      <section id="security" className="py-16 md:py-24 bg-[#141923]/30 border-b border-[#2A3447]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Institutional-Grade Platform Security</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Vaultix Income enforces end-to-end encrypted session persistence, atomic Firestore database transactions, and zero-trust administrative boundaries.
          </p>
        </div>
      </section>

      {/* Call to Action Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-[#141923] via-[#1D2432] to-[#141923] text-center border-b border-[#2A3447]">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Start Building Your Digital Portfolio?</h2>
          <p className="text-xs text-slate-300">Create your account in seconds and explore our active yield vaults.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenAuth('register')}
              className="bg-[#D4AF37] hover:bg-[#b8982e] text-black font-extrabold px-8 py-3 rounded-xl text-xs transition-all cursor-pointer shadow-lg"
            >
              CREATE ACCOUNT
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="bg-[#0B0E14] hover:bg-[#141923] text-white font-bold px-8 py-3 rounded-xl text-xs border border-[#2A3447] transition-all cursor-pointer"
            >
              LOG IN TO DASHBOARD
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0B0E14] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-bold text-[#D4AF37]">VAULTIX INCOME</span> — Digital Asset Management & Yield Platform
            <p className="text-[10px] text-slate-600 mt-1">© 2026 Vaultix Income. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#assets" className="hover:text-slate-300">Assets</a>
            <a href="#features" className="hover:text-slate-300">Features</a>
            <a href="#market" className="hover:text-slate-300">Market Data</a>
            <a href="#strategies" className="hover:text-slate-300">Educational Guide</a>
            <button onClick={() => onOpenAuth('login')} className="hover:text-slate-300 cursor-pointer">Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
