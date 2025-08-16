// components/UserTransactions.tsx
"use client";
import React, { useMemo } from "react";
import { useUser } from "@/hooks/useUser";

interface Transaction {
  date: string;
  id: string;
  amount: string;
  wallet: string;
  details: string;
  postBalance: string;
  receiptUrl?: string;
}

const UserTransactions: React.FC = () => {
  const { data, isLoading } = useUser();

  // Transform depositHistory into our table-friendly format
  const transactions: Transaction[] = useMemo(() => {
    if (data?.success && data?.data?.depositHistory) {
      return data.data.depositHistory.map((tx: any, idx: number) => ({
        date: new Date(tx.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        id: tx.transactionId || `TXN-${idx + 1}`,
        amount: `$${tx.amount}`,
        wallet: "Deposit Wallet",
        details: "Deposit",
        postBalance: `$${tx.amount}`, // 🔑 you can replace with running balance if API provides
        receiptUrl: tx.receiptUrl,
      }));
    }
    return [];
  }, [data]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white">
            User Transactions
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[200px] text-gray-400 animate-pulse">
            Loading transactions...
          </div>
        ) : transactions.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-gray-300">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Transaction ID</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Wallet</th>
                    <th className="px-4 py-3 text-left">Details</th>
                    <th className="px-4 py-3 text-left">Post Balance</th>
                    <th className="px-4 py-3 text-left">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3">{tx.date}</td>
                      <td className="px-4 py-3">{tx.id}</td>
                      <td className="px-4 py-3 text-green-400">{tx.amount}</td>
                      <td className="px-4 py-3">{tx.wallet}</td>
                      <td className="px-4 py-3">{tx.details}</td>
                      <td className="px-4 py-3">{tx.postBalance}</td>
                      <td className="px-4 py-3">
                        {tx.receiptUrl ? (
                          <a
                            href={tx.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={tx.receiptUrl}
                              alt="Receipt"
                              className="h-12 w-12 object-cover rounded-lg border border-white/20 hover:scale-105 transition-transform"
                            />
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-4 space-y-4">
              {transactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 text-gray-200 space-y-2"
                >
                  <p>
                    <span className="font-semibold">Date:</span> {tx.date}
                  </p>
                  <p>
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {tx.id}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span>{" "}
                    <span className="text-green-400">{tx.amount}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Wallet:</span> {tx.wallet}
                  </p>
                  <p>
                    <span className="font-semibold">Details:</span> {tx.details}
                  </p>
                  <p>
                    <span className="font-semibold">Post Balance:</span>{" "}
                    {tx.postBalance}
                  </p>
                  {tx.receiptUrl && (
                    <div>
                      <span className="font-semibold">Receipt:</span>
                      <a
                        href={tx.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={tx.receiptUrl}
                          alt="Receipt"
                          className="mt-2 h-32 w-full object-cover rounded-lg border border-white/20 hover:scale-105 transition-transform"
                        />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-gray-400">
            No transactions yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTransactions;
