"use client";

import React, { JSX, useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

type Status = "Completed" | "Pending" | "Failed";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: Status;
}

const allTransactions: Transaction[] = [
  {
    id: "TXN-1001",
    type: "Deposit",
    amount: 5000,
    currency: "USD",
    date: "2025-08-01",
    status: "Completed",
  },
  {
    id: "TXN-1002",
    type: "Withdrawal",
    amount: -2000,
    currency: "USD",
    date: "2025-08-02",
    status: "Pending",
  },
  {
    id: "TXN-1003",
    type: "Investment",
    amount: -1500,
    currency: "USD",
    date: "2025-08-03",
    status: "Completed",
  },
  {
    id: "TXN-1004",
    type: "Return",
    amount: 600,
    currency: "USD",
    date: "2025-08-04",
    status: "Completed",
  },
  {
    id: "TXN-1005",
    type: "Withdrawal",
    amount: -800,
    currency: "USD",
    date: "2025-08-05",
    status: "Failed",
  },
  {
    id: "TXN-1006",
    type: "Deposit",
    amount: 3000,
    currency: "USD",
    date: "2025-08-06",
    status: "Completed",
  },
  {
    id: "TXN-1007",
    type: "Investment",
    amount: -2500,
    currency: "USD",
    date: "2025-08-07",
    status: "Pending",
  },
  {
    id: "TXN-1008",
    type: "Withdrawal",
    amount: -1000,
    currency: "USD",
    date: "2025-08-08",
    status: "Completed",
  },
  {
    id: "TXN-1009",
    type: "Deposit",
    amount: 7000,
    currency: "USD",
    date: "2025-08-09",
    status: "Completed",
  },
  {
    id: "TXN-1010",
    type: "Return",
    amount: 400,
    currency: "USD",
    date: "2025-08-10",
    status: "Completed",
  },
];

const statusColors: Record<Status, string> = {
  Completed: "text-green-500",
  Pending: "text-yellow-400",
  Failed: "text-red-500",
};

const typeIcons: Record<string, JSX.Element> = {
  Deposit: <ArrowDownLeft className="text-green-400 w-5 h-5" />,
  Withdrawal: <ArrowUpRight className="text-red-400 w-5 h-5" />,
  Investment: <TrendingUp className="text-blue-400 w-5 h-5" />,
  Return: <ArrowDownLeft className="text-emerald-400 w-5 h-5" />,
};

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const sortedTransactions = [...allTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const visible = sortedTransactions.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(sortedTransactions.length / perPage);
  const latestTransaction = sortedTransactions[0];
  const latestWithdrawal = sortedTransactions.find(
    (tx) => tx.type === "Withdrawal"
  );

  const renderTransactionCard = (tx: Transaction) => (
    <div
      key={tx.id}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg hover:shadow-blue-500/10 transition"
    >
      <div className="flex items-center gap-4">
        <div className="bg-white/10 p-3 rounded-full">{typeIcons[tx.type]}</div>
        <div>
          <h3 className="font-semibold text-lg">{tx.type}</h3>
          <p className="text-sm text-gray-400">{tx.date}</p>
        </div>
      </div>

      <div
        className={`text-right font-semibold ${
          tx.amount >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {tx.amount >= 0 ? "+" : "-"}${Math.abs(tx.amount).toLocaleString()}{" "}
        {tx.currency}
      </div>

      <div className="flex items-center gap-2">
        {tx.status === "Completed" && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
        {tx.status === "Pending" && (
          <Clock className="w-5 h-5 text-yellow-400" />
        )}
        {tx.status === "Failed" && <XCircle className="w-5 h-5 text-red-500" />}
        <span className={`text-sm font-medium ${statusColors[tx.status]}`}>
          {tx.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e11] to-[#111315] px-4 py-20 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Transaction Overview
          </h1>
          <p className="text-gray-400">
            Track your deposits, withdrawals, investments and more in real time.
          </p>
        </div>

        {/* Latest Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {latestTransaction && (
            <div>
              <h2 className="text-xl font-bold mb-2">Latest Transaction</h2>
              {renderTransactionCard(latestTransaction)}
            </div>
          )}
          {latestWithdrawal && (
            <div>
              <h2 className="text-xl font-bold mb-2">Latest Withdrawal</h2>
              {renderTransactionCard(latestWithdrawal)}
            </div>
          )}
        </div>

        {/* All Transactions */}
        <div className="grid gap-6">{visible.map(renderTransactionCard)}</div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-300 border-white/20 hover:border-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
