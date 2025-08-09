"use client";

import React from "react";

const plans = [
  {
    name: "Starter Plan",
    price: "$100",
    returns: "5% Weekly",
    duration: "1 Month",
    features: [
      "Basic Dashboard Access",
      "Secure Transactions",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Pro Plan",
    price: "$500",
    returns: "8% Weekly",
    duration: "3 Months",
    features: ["Advanced Dashboard", "Priority Support", "Investment Reports"],
    popular: true,
  },
  {
    name: "Premium Plan",
    price: "$1000",
    returns: "12% Weekly",
    duration: "6 Months",
    features: [
      "All Pro Features",
      "Dedicated Account Manager",
      "VIP Market Insights",
    ],
    popular: false,
  },
];

export default function InvestmentPlans() {
  return (
    <section className="w-full py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Choose Your Investment Plan
        </h2>
        <p className="text-gray-300 text-lg">
          Invest smart with flexible options and great returns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className="group [perspective:1200px] relative">
            <div className="relative w-full h-full min-h-[480px] transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* FRONT */}
              <div
                className={`absolute inset-0 bg-white/10 backdrop-blur-lg border p-8 rounded-2xl shadow-xl transition duration-300 hover:shadow-blue-500/20 hover:border-blue-500 [backface-visibility:hidden] ${
                  plan.popular
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : "border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="text-sm bg-blue-500 text-white px-4 py-1 rounded-full mb-4 font-medium inline-block shadow-md">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-extrabold text-blue-400 mb-2">
                  {plan.price}
                </div>
                <div className="text-blue-300 font-medium mb-1">
                  {plan.returns}
                </div>
                <p className="text-gray-400 mb-6">{plan.duration} Duration</p>
                <ul className="space-y-3 text-sm text-gray-200 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 hover:shadow-md hover:shadow-blue-500/30">
                  Get Started
                </button>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center shadow-inner shadow-blue-500/10">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-gray-300 mb-6 max-w-xs">
                  Dive deeper into the {plan.name.toLowerCase()} with{" "}
                  <span className="text-blue-400 font-semibold">
                    {plan.returns}
                  </span>{" "}
                  return for {plan.duration.toLowerCase()}.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
