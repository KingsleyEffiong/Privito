"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function DepositPage() {
  const [paymentMethod, setPaymentMethod] = useState<"bitcoin" | "giftcard">(
    "bitcoin"
  );
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 loading state for submit
  const [giftcardPreview, setGiftcardPreview] = useState<string | null>(null); // 🔥 preview
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const btcAddress = "1Pfj6ppwQu5LVHus4vg1gScNUDKMxc9PcD";
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
      showToast("Amount must be between 10 and 1,000,000 dollars");
      return;
    }

    router.push(
      `/dashboard/deposit/preview-deposit?amount=${amount}&method=${paymentMethod}`
    );
  };

  // 🔥 Show preview immediately
  const handleGiftcardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setGiftcardPreview(URL.createObjectURL(file));
  };

  // 🔥 Submit giftcard
  const handleGiftcardSubmit = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      showToast("Please upload a giftcard first!");
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        showToast(
          `Giftcard uploaded: ${file.name}, wait for review and it would be updated on your account soon.`
        );
        // Clear file input & preview
        setGiftcardPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        showToast("Failed to upload giftcard");
      }
    } catch (err) {
      showToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden px-2 sm:px-4 py-8 sm:py-12">
      {/* Background blur circles */}
      <div className="hidden md:block absolute top-24 left-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-24 right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-12 w-full max-w-md sm:max-w-4xl z-10 text-white">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 text-center">
          Deposit
        </h2>

        {/* Payment Switch Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPaymentMethod("bitcoin")}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition ${
              paymentMethod === "bitcoin"
                ? "bg-yellow-400 text-black"
                : "bg-white/20 text-white"
            }`}
          >
            Bitcoin
          </button>

          <button
            onClick={() => setPaymentMethod("giftcard")}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition ${
              paymentMethod === "giftcard"
                ? "bg-yellow-400 text-black"
                : "bg-white/20 text-white"
            }`}
          >
            Giftcards
          </button>
        </div>

        {/* Bitcoin Section */}
        {paymentMethod === "bitcoin" && (
          <>
            <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-lg flex justify-between items-center mb-8 shadow-sm">
              <span className="font-mono text-lg text-gray-100 truncate">
                {btcAddress.slice(0, 15)}...
              </span>
              <button
                onClick={handleCopy}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-6 py-3 rounded-2xl shadow-md"
              >
                Copy
              </button>
            </div>

            <label className="block text-gray-200 font-semibold mb-2 text-xl">
              Deposit Amount ($)
            </label>
            <input
              type="number"
              min="10"
              max="1000000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-5 rounded-2xl mb-8 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-4 focus:ring-yellow-400 outline-none text-xl transition"
            />

            <p className="text-green-400 text-lg mb-8 font-medium">
              No transaction fee — full amount will be deposited.
            </p>
          </>
        )}

        {/* Giftcard Section */}
        {paymentMethod === "giftcard" && (
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-10">
            <p className="text-xl mb-4">Upload your giftcard here:</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleGiftcardUpload}
              className="w-full bg-white/10 p-4 rounded-xl border border-white/30"
            />

            {/* Giftcard Preview */}
            {giftcardPreview && (
              <div className="mt-6">
                <p className="text-gray-200 mb-3 font-semibold">Preview:</p>
                <img
                  src={giftcardPreview}
                  alt="Giftcard Preview"
                  className="w-full rounded-2xl border border-white/30 shadow-lg"
                />
              </div>
            )}

            <p className="text-gray-300 text-sm mt-3">
              We accept: Amazon, Apple, Steam, Google Play, Walmart, etc.
            </p>
          </div>
        )}

        {message && (
          <div className="mb-10 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-3xl shadow-xl text-lg font-semibold">
            {message}
          </div>
        )}

        {/* Submit Buttons */}
        {paymentMethod === "bitcoin" && (
          <button
            onClick={handleDepositClick}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-5 rounded-3xl text-2xl shadow-lg"
          >
            Continue
          </button>
        )}

        {paymentMethod === "giftcard" && (
          <button
            onClick={handleGiftcardSubmit}
            className="w-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-bold py-5 rounded-3xl text-2xl shadow-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Giftcard"}
          </button>
        )}
      </div>
    </div>
  );
}
