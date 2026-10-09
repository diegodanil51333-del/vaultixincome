import React from 'react';
import { BitcoinLogo, EthereumLogo, TetherLogo, BnbLogo, XrpLogo, TronLogo, SolanaLogo } from './CryptoLogos';
import { TrendingUp } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  logo: React.ReactNode;
}

const TICKER_DATA: TickerItem[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$64,280.50',
    change: '+2.85%',
    logo: <BitcoinLogo className="w-5 h-5 flex-shrink-0" />
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$3,490.20',
    change: '+1.92%',
    logo: <EthereumLogo className="w-5 h-5 flex-shrink-0" />
  },
  {
    symbol: 'USDT',
    name: 'Tether TRC20',
    price: '$1.0002',
    change: '+0.01%',
    logo: <TetherLogo className="w-5 h-5 flex-shrink-0" />
  },
  {
    symbol: 'BNB',
    name: 'BNB Chain',
    price: '$586.40',
    change: '+3.15%',
    logo: <BnbLogo className="w-5 h-5 flex-shrink-0" />
  },
  {
    symbol: 'XRP',
    name: 'Ripple XRP',
    price: '$0.5840',
    change: '+4.12%',
    logo: <XrpLogo className="w-5 h-5 flex-shrink-0" />
  },
  {
    symbol: 'TRX',
    name: 'Tron',
    price: '$0.1585',
    change: '+1.45%',
    logo: <TronLogo className="w-5 h-5 flex-shrink-0" />
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '$148.75',
    change: '+2.10%',
    logo: <SolanaLogo className="w-5 h-5 flex-shrink-0" />
  }
];

export const CryptoMarquee: React.FC = () => {
  // Duplicate for smooth seamless infinite scroll loop
  const displayItems = [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA];

  return (
    <div 
      className="w-full max-w-full overflow-hidden bg-[#10141D] border-y border-[#2A3447]/80 py-3 relative select-none"
      style={{ contain: 'layout paint' }}
    >

      {/* Gradient edge masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0B0E14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0B0E14] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee items-center gap-6">
        {displayItems.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="flex items-center space-x-2.5 bg-[#141923]/90 hover:bg-[#1D2432] border border-[#2A3447] px-3.5 py-1.5 rounded-xl transition-all flex-shrink-0 shadow-sm"
          >
            {item.logo}
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xs text-white tracking-wide">{item.symbol}</span>
              <span className="text-[11px] font-mono text-slate-300 font-medium">{item.price}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
