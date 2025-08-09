'use client';

import React from 'react';
import Image from 'next/image';
import binance from '@/assets/binance.png';
import trustWallet from '@/assets/trust wallet.png';
import coinbase from '@/assets/coinbase.png';
import okx from '@/assets/okx.png';

const sponsors = [
  {
    name: 'Binance',
    logo: binance,
    url: 'https://www.binance.com',
  },
  {
    name: 'Trust Wallet',
    logo: trustWallet,
    url: 'https://trustwallet.com',
  },
  {
    name: 'Coinbase',
    logo: coinbase,
    url: 'https://www.coinbase.com',
  },
  {
    name: 'OKX',
    logo: okx,
    url: 'https://www.okx.com',
  },
];

export default function Sponsorship() {
  return (
    <section className="w-full relative z-10 bg-[#0e0e11] py-24 px-6 overflow-hidden">
      {/* Background blur lights */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#0f0f12] to-[#1a1a1e] opacity-90 -z-10" />
      <div className="absolute -top-20 -left-32 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse -z-10" />
      <div className="absolute -bottom-24 -right-32 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full animate-pulse -z-10" />

      <div className="max-w-6xl mx-auto text-white text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-blue-400 to-purple-400 text-transparent bg-clip-text">
          Trusted by Leading Crypto Platforms
        </h2>
        <p className="text-gray-400 mb-16 max-w-xl mx-auto">
          Backed by the most reliable names in crypto security and innovation.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg transition duration-300 flex items-center justify-center h-28"
            >
              <div className="relative w-36 h-16">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
