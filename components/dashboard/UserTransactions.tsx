// components/UserTransactions.tsx
import React from "react";

interface Transaction {
  date: string;
  id: string;
  amount: string;
  wallet: string;
  details: string;
  postBalance: string;
}

const UserTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      date: "2025-08-08",
      id: "TXN-001",
      amount: "$1,200",
      wallet: "Deposit Wallet",
      details: "Initial deposit",
      postBalance: "$6,400",
    },
    {
      date: "2025-08-07",
      id: "TXN-002",
      amount: "$150",
      wallet: "Interest Wallet",
      details: "Monthly interest credited",
      postBalance: "$1,400",
    },
    {
      date: "2025-08-05",
      id: "TXN-003",
      amount: "-$500",
      wallet: "Deposit Wallet",
      details: "Withdrawal to bank",
      postBalance: "$5,200",
    },
    {
      date: "2025-08-03",
      id: "TXN-004",
      amount: "$200",
      wallet: "Referral Wallet",
      details: "Referral bonus",
      postBalance: "$850",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white">User Transactions</h2>
        </div>

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
                  <td className={`px-4 py-3 ${tx.amount.startsWith("-") ? "text-red-400" : "text-green-400"}`}>
                    {tx.amount}
                  </td>
                  <td className="px-4 py-3">{tx.wallet}</td>
                  <td className="px-4 py-3">{tx.details}</td>
                  <td className="px-4 py-3">{tx.postBalance}</td>
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
              <p><span className="font-semibold">Date:</span> {tx.date}</p>
              <p><span className="font-semibold">Transaction ID:</span> {tx.id}</p>
              <p>
                <span className="font-semibold">Amount:</span>{" "}
                <span className={tx.amount.startsWith("-") ? "text-red-400" : "text-green-400"}>
                  {tx.amount}
                </span>
              </p>
              <p><span className="font-semibold">Wallet:</span> {tx.wallet}</p>
              <p><span className="font-semibold">Details:</span> {tx.details}</p>
              <p><span className="font-semibold">Post Balance:</span> {tx.postBalance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTransactions;
