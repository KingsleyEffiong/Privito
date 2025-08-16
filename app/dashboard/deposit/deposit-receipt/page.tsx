"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Copy, Check, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useDeposit } from "@/hooks/useDeposit";
import { useUser } from "@/hooks/useUser";
import { uploadToCloudinary } from "@/hooks/uploadImage";

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

  // Upload-related states
  const [transactionId, setTransactionId] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Copy BTC address
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(btcAddress);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  // Auto-hide copied message
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

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  // File handling
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
    if (e.target.files?.length) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // Confirm & upload
  const handleConfirm = async () => {
    setError("");
    if (!email) {
      showToast("User email not found", "error");
      return;
    }
    if (!receiptFile) {
      setError("Please upload your transaction receipt image.");
      return;
    }
    if (!transactionId.trim()) {
      setError("Please enter your transaction ID.");
      return;
    }

    const imageUrl = await uploadToCloudinary(receiptFile);
    console.log(imageUrl);
    // Send all data to backend
    deposit(
      { email, amount, transactionId, receiptUrl: imageUrl },
      {
        onSuccess: (data) => {
          showToast(
            `Deposit successful! New balance: ${data.depositBalance}`,
            "success"
          );
          router.push("/dashboard");
        },
        onError: () => {
          showToast("Failed to deposit, please try again", "error");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden px-4 sm:px-6 md:px-12 py-8 sm:py-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Background */}
      <div className="hidden md:block absolute top-24 left-24 w-72 sm:w-96 h-72 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-24 right-24 w-72 sm:w-96 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-5xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-14 z-10 text-white flex flex-col lg:flex-row gap-8">
        {/* Left side: BTC & Amount */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
            Preview Deposit
          </h2>
          {/* BTC Address */}
          <div className="mb-8">
            <p className="text-gray-300 mb-2 font-semibold uppercase flex justify-between">
              Bitcoin Address
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm"
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
            <p className="font-mono bg-white/10 border border-white/30 p-4 rounded-lg">
              {btcAddress.slice(0, 10)}.....
            </p>
          </div>

          {/* Amount */}
          <div className="mb-8">
            <p className="text-gray-300 mb-2 font-semibold uppercase">
              Deposit Amount
            </p>
            <p className="font-bold text-2xl">{amount} BTC</p>
          </div>

          {/* Transaction ID */}
          <div>
            <label htmlFor="transactionId" className="block mb-2 font-semibold">
              Transaction ID *
            </label>
            <input
              id="transactionId"
              type="text"
              placeholder="Enter your transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/15 border border-white/30"
            />
          </div>
        </div>

        {/* Right side: Upload */}
        <div className="flex-1">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-4 border-dashed rounded-3xl p-10 text-center cursor-pointer ${
              dragActive
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-white/30 bg-white/5"
            }`}
          >
            <UploadCloud size={48} className="mb-4 text-yellow-400" />
            <p>Drag & drop your receipt here</p>
            <p className="text-yellow-300">or click to browse</p>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Receipt preview"
              width={600}
              height={400}
              className="rounded-3xl mt-4"
              unoptimized
            />
          )}

          {error && <p className="text-red-400 mt-2">{error}</p>}

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-white/20 py-3 rounded-3xl"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isPending}
              className={`flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 rounded-3xl ${
                isPending ? "opacity-60" : ""
              }`}
            >
              {isPending ? "Processing..." : "Confirm Deposit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
