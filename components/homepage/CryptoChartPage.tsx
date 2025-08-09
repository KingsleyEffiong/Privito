'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TradingViewWidget from '@/components/ui/TradingViewWidget';
import bgImage from '@/assets/dynamic-data-visualization-3d (3).jpg'; // Use a nice crypto/abstract dark background

export default function CryptoChartPage() {
  const [symbol, setSymbol] = useState('BTCUSDT');

  const coins = [
    { name: 'Bitcoin', symbol: 'BTCUSDT' },
    { name: 'Ethereum', symbol: 'ETHUSDT' },
    { name: 'Solana', symbol: 'SOLUSDT' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background image */}
      <Image
        src={bgImage}
        alt="Background"
        fill
        className="object-cover blur-md scale-105 absolute inset-0 -z-20"
        priority
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md -z-10" />

      {/* Glass Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
          Real-time <span className="text-blue-400">{symbol.replace('USDT', '')}</span> Market Chart
        </h1>

        {/* Coin Switcher */}
        <div className="flex gap-4 mb-8">
          {coins.map((coin) => (
            <button
              key={coin.symbol}
              onClick={() => setSymbol(coin.symbol)}
              className={`px-4 py-2 rounded-full border transition duration-300 text-sm font-semibold ${
                symbol === coin.symbol
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-gray-200'
              }`}
            >
              {coin.name}
            </button>
          ))}
        </div>

        {/* Chart Card */}
        <div className="w-full rounded-2xl p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
          <TradingViewWidget symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
