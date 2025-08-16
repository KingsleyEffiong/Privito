"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Copy, Check } from "lucide-react";
import { useDeposit } from "@/hooks/useDeposit";
import { useUser } from "@/hooks/useUser";

export default function DepositPreviewPage() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = Number(params.get("amount") || 0);
  const btcAddress = "bc1qexamplebtcaddresshere";

  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { mutate: deposit, isPending } = useDeposit();
  const { data: userData } = useUser();
  const email = userData?.data?.email || "";

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(btcAddress);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  // Auto-hide "copied" indicator
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const handleConfirm = () => {
    router.push(`/dashboard/deposit/deposit-receipt/?amount=${amount}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden px-4 sm:px-6 md:px-12 py-8 sm:py-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Background Blobs */}
      <div className="hidden md:block absolute top-24 left-24 w-72 sm:w-96 h-72 sm:h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-24 right-24 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md sm:max-w-3xl md:max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-14 z-10 text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center drop-shadow-lg">
          Preview Deposit
        </h2>

        {/* BTC Address */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <p className="text-gray-300 mb-1 sm:mb-2 text-base sm:text-lg font-semibold tracking-wide uppercase flex items-center justify-between">
            Bitcoin Address
            <button
              onClick={handleCopy}
              className="ml-4 flex items-center gap-1 text-sm text-white/80 hover:text-white transition"
              title="Copy Bitcoin address"
              type="button"
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy
                </>
              )}
            </button>
          </p>
          <p className="font-mono text-base sm:text-lg md:text-xl text-gray-100 bg-white/10 border border-white/30 p-4 sm:p-6 rounded-lg select-all break-words shadow-sm">
            {btcAddress}
          </p>
        </div>

        {/* Amount */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <p className="text-gray-300 mb-1 sm:mb-2 text-base sm:text-lg font-semibold tracking-wide uppercase">
            Deposit Amount
          </p>
          <p className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-wide">
            {amount} BTC
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 max-w-md sm:max-w-xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 sm:py-5 rounded-3xl text-lg sm:text-xl transition-shadow shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className={`flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
              text-black font-bold py-3 sm:py-5 rounded-3xl text-lg sm:text-xl transition-shadow shadow-lg ${
                isPending ? "opacity-60 cursor-not-allowed" : ""
              }`}
          >
            {isPending ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
