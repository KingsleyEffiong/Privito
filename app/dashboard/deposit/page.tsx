"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const btcAddress = "bc1qexamplebtcaddresshere"; // Replace with your BTC address
  const router = useRouter();

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(btcAddress);
    showToast("Bitcoin address copied!");
  };

  const handleDepositClick = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value < 10 || value > 1000000) {
      showToast("Amount must be between 10 and 1,000,000 BTC");
      return;
    }
    router.push(`/dashboard/deposit/preview-deposit?amount=${amount}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden px-4 sm:px-8 py-8 sm:py-12">
      {/* Decorative blur circles */}
      <div className="hidden md:block absolute top-24 left-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-24 right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-12 w-full max-w-md sm:max-w-4xl z-10 text-white">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 sm:mb-10 text-center drop-shadow-lg">
          Deposit Bitcoin
        </h2>

        {/* Bitcoin Address */}
        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 shadow-sm gap-2 sm:gap-0">
          <span className="font-mono text-base sm:text-lg text-gray-100 truncate select-all break-all w-full sm:w-auto">
            {btcAddress}
          </span>
          <button
            onClick={handleCopy}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-base sm:text-lg transition-all shadow-md w-full sm:w-auto text-center"
          >
            Copy
          </button>
        </div>

        {/* Amount Input */}
        <label className="block text-gray-200 font-semibold mb-2 text-lg sm:text-xl">
          Deposit Amount (BTC)
        </label>
        <input
          type="number"
          min="10"
          max="1000000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 sm:p-5 rounded-2xl mb-6 sm:mb-8 backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-4 focus:ring-yellow-400 outline-none text-base sm:text-xl transition"
        />

        {/* No Fee Info */}
        <p className="text-green-400 text-base sm:text-lg mb-8 sm:mb-10 font-medium">
          No transaction fee — full amount will be deposited.
        </p>

        {/* Toast Message */}
        <div className="mb-10">
          {message && (
            <div className=" bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 sm:px-8 py-3  sm:py-4 rounded-3xl shadow-xl text-base sm:text-lg font-semibold">
              {message}
            </div>
          )}
        </div>

        {/* Deposit Button */}
        <button
          onClick={handleDepositClick}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 sm:py-5 rounded-3xl text-lg sm:text-2xl transition-all shadow-lg"
        >
          Deposit
        </button>
      </div>
    </div>
  );
}
