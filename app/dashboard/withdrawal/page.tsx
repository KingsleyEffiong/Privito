// file: app/dashboard/withdrawal/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Copy, Send, X, Check } from "lucide-react";

export default function WithdrawalPage() {
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const MIN = 1;
  const MAX = 1_000_000;

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const validate = () => {
    setError("");
    const n = parseFloat(amount);
    if (!amount || isNaN(n)) return setError("Enter a valid amount.");
    if (n < MIN) return setError(`Minimum withdrawal is ${MIN}.`);
    if (n > MAX)
      return setError(`Maximum withdrawal is ${MAX.toLocaleString()}.`);
    if (!address || address.trim().length < 15)
      return setError("Enter a valid crypto address.");
    return true;
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address || "");
      setToast({ type: "success", msg: "Address copied to clipboard" });
    } catch {
      setToast({ type: "error", msg: "Copy failed" });
    }
  };

  const handleSubmit = () => {
    if (validate() !== true) return;
    setConfirmOpen(true);
  };

  const confirmWithdraw = async () => {
    setConfirmOpen(false);
    setLoading(true);
    setError("");
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setToast({ type: "success", msg: `Withdrawal of ${amount} submitted` });
      setAmount("");
      setAddress("");
    } catch {
      setToast({ type: "error", msg: "Failed to submit withdrawal" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Main card */}
      <div className="relative w-full max-w-6xl rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Shimmer */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 md:opacity-100 animate-[shimmer_3s_linear_infinite]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12">
          {/* Left Info */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Withdraw Crypto
              </h1>
              <p className="text-sm text-white/70 max-w-lg">
                Enter the amount and destination address. Withdrawals process
                after network confirmation.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 uppercase">
                  Available balance
                </p>
                <p className="text-xl font-semibold text-white mt-1">
                  12,450.32 USD
                </p>
              </div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 uppercase">Network fees</p>
                <p className="text-base text-white mt-1">
                  Estimated: 0.0004 BTC
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Final amount will be shown before confirmation.
                </p>
              </div>
            </div>

            <p className="text-xs text-white/60 mt-4">
              <span className="font-medium text-white/80">Security tip:</span>{" "}
              Always verify addresses before sending.
            </p>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-b from-white/3 to-white/1 rounded-3xl p-6 sm:p-8 border border-white/8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-4"
            >
              {/* Amount */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white/80">
                  Amount (USD)
                </span>
                <input
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl p-4 bg-transparent border border-white/10 text-white placeholder-white/40 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none transition"
                />
              </label>

              {/* Address */}
              <label className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">
                    Crypto Address
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white/90 px-2 py-1 rounded-md transition"
                  >
                    <Copy size={14} /> Copy
                  </button>
                </div>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. bc1q... or 0x..."
                  className="w-full rounded-xl p-4 bg-transparent border border-white/10 text-white placeholder-white/40 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none transition"
                />
              </label>

              {/* Error */}
              {error && (
                <div className="text-red-400 text-sm font-medium rounded-md p-3 bg-red-400/10 border border-red-400/20">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 px-5 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-60 transition shadow-lg"
                >
                  <Send size={18} /> {loading ? "Processing..." : "Withdraw"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAmount("");
                    setAddress("");
                    setError("");
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-white/10 text-white/80 hover:bg-white/5 transition"
                >
                  <X size={16} /> Clear
                </button>
              </div>

              <p className="text-xs text-white/50 mt-1">
                By clicking Withdraw, you agree to our terms.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 z-10">
            <h3 className="text-xl font-bold text-white mb-2">
              Confirm Withdrawal
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Check details before proceeding.
            </p>
            <div className="rounded-xl p-4 bg-white/5 border border-white/10 mb-4">
              <p className="text-sm text-white/80">Amount</p>
              <p className="font-semibold text-white text-lg mt-1">
                ${Number(amount || 0).toFixed(2)}
              </p>
              <p className="text-sm text-white/80 mt-3">Destination</p>
              <p className="font-mono text-sm text-white/90 mt-1 break-all">
                {address}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmWithdraw}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 transition"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-8 left-1/2 z-50 transform -translate-x-1/2 rounded-full px-6 py-3 text-sm font-medium shadow-xl ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" ? <Check size={16} /> : <X size={16} />}
            <span>{toast.msg}</span>
          </div>
        </div>
      )}

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -700px 0; }
          100% { background-position: 700px 0; }
        }
        .animate-[shimmer_3s_linear_infinite] {
          background-size: 1400px 100%;
          background-repeat: no-repeat;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
