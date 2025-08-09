"use client";
import React, { useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

export default function DepositPreviewPage() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const btcAddress = "bc1qexamplebtcaddresshere";

  const [transactionId, setTransactionId] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      setReceiptFile(null);
      setPreviewUrl(null);
      return;
    }
    setReceiptFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleConfirm = async () => {
    setError("");
    if (!receiptFile) {
      setError("Please upload your transaction receipt image.");
      return;
    }
    if (!transactionId.trim()) {
      setError("Please enter your transaction ID.");
      return;
    }

    try {
      // TODO: upload receiptFile, transactionId, amount, btcAddress to your backend here

      // Simulate delay
      await new Promise((res) => setTimeout(res, 1000));

      router.push("/deposit/success");
    } catch {
      setError("Failed to submit deposit proof. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden px-4 sm:px-8 md:px-12 py-8 sm:py-12 ">
      {/* Decorative background blobs - hidden on small screens */}
      <div className="hidden lg:block absolute top-24 left-24 w-72 sm:w-96 h-72 sm:h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute bottom-24 right-24 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glass card container */}
      <div
        className="relative w-full max-w-md sm:max-w-4xl lg:max-w-6xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-4xl shadow-2xl
          p-8 sm:p-12 text-white flex flex-col lg:flex-row gap-8 lg:gap-16 overflow-hidden"
      >
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2.5s_infinite] rounded-4xl" />

        {/* Left info side */}
        <div className="flex-1 flex flex-col gap-6 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Confirm Deposit
          </h2>

          <div>
            <p className="text-gray-300 mb-2 font-semibold tracking-wide uppercase text-sm sm:text-base">
              Bitcoin Address
            </p>
            <p className="font-mono text-sm sm:text-base md:text-lg text-gray-100 bg-white/10 border border-white/30 p-4 rounded-xl select-all break-words shadow-sm">
              {btcAddress}
            </p>
          </div>

          <div>
            <p className="text-gray-300 mb-2 font-semibold tracking-wide uppercase text-sm sm:text-base">
              Deposit Amount
            </p>
            <p className="font-bold text-xl sm:text-2xl md:text-3xl tracking-wide">
              {amount} BTC
            </p>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="transactionId"
              className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold tracking-wide"
            >
              Transaction ID *
            </label>
            <input
              id="transactionId"
              type="text"
              placeholder="Enter your transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="p-3 sm:p-5 rounded-2xl bg-white/15 border border-white/30 placeholder-white/50 text-white
                focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-shadow text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Right upload + preview side */}
        <div className="flex-1 flex flex-col gap-6 z-10">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            aria-label="Upload deposit receipt image"
            className={`relative cursor-pointer rounded-3xl border-4 border-dashed border-white/30 bg-white/5 flex flex-col items-center justify-center
              p-12 sm:p-16 text-center transition 
              ${
                dragActive ? "border-yellow-400 bg-yellow-400/10 shadow-lg" : ""
              }
              hover:border-yellow-400 hover:bg-yellow-400/10 hover:shadow-lg
              select-none
            `}
          >
            <UploadCloud
              size={48}
              className="mb-4 sm:mb-6 text-yellow-400 drop-shadow-md"
            />
            <p className="text-white text-xl sm:text-2xl font-semibold mb-1">
              Drag & drop your receipt here
            </p>
            <p className="text-yellow-300 text-lg sm:text-xl font-medium">
              or click to browse
            </p>
            <p className="text-yellow-300 mt-3 sm:mt-4 font-light text-xs sm:text-sm">
              (Only image files supported)
            </p>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              tabIndex={-1}
            />
          </div>

          {/* Preview */}
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Receipt preview"
              className="rounded-3xl w-full h-auto object-contain shadow-2xl border border-white/30"
              width={600}
              height={400}
              unoptimized
            />
          )}

          {/* Error message */}
          {error && (
            <p className="text-red-400 font-semibold text-center mt-1 text-sm sm:text-base">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-auto">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-3xl transition-shadow shadow-sm text-base sm:text-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
              text-black font-bold py-3 rounded-3xl transition-shadow shadow-lg text-base sm:text-lg"
            >
              Submit Deposit Proof
            </button>
          </div>
        </div>
      </div>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -700px 0;
          }
          100% {
            background-position: 700px 0;
          }
        }
        .animate-[shimmer_2.5s_infinite] {
          background-size: 1400px 100%;
          background-repeat: no-repeat;
          animation: shimmer 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
