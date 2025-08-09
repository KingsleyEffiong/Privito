"use client";

import Image from "next/image";
import Trading from "@/assets/business-person-futuristic-business-environment.jpg";
import Investor from "@/assets/austin-distel-EMPZ7yRZoGw-unsplash.jpg";
import bgImage from "@/assets/dynamic-data-visualization-3d (1).jpg";

export default function TradingUI() {
  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20 blur-sm"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 py-24 md:py-32 gap-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Empower Your Investments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 transition-transform hover:scale-[1.02] hover:shadow-2xl duration-300">
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
              <Image
                src={Investor}
                alt="Investor Insight"
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Real-Time Market Analysis
            </h3>
            <p className="text-gray-300 mb-6">
              Stay ahead of the game with our AI-powered data insights and
              real-time performance tracking tools.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300">
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 transition-transform hover:scale-[1.02] hover:shadow-2xl duration-300">
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
              <Image
                src={Trading}
                alt="Platform UI"
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Seamless Investment Experience
            </h3>
            <p className="text-gray-300 mb-6">
              From deposits to returns, everything is automated for your peace
              of mind. Trade like a pro effortlessly.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold transition duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
