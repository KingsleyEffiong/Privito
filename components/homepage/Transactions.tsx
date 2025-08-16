"use client";

import { useState, useMemo, useEffect, type JSX } from "react";
import { CheckCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { mockTransactions, type Transaction } from "@/data/mockTransactions";

const typeIcons: Record<Transaction["type"], JSX.Element> = {
  Deposit: <ArrowDownLeft className="text-green-400 w-5 h-5" />,
  Withdrawal: <ArrowUpRight className="text-red-400 w-5 h-5" />,
};

// ✅ Client-only safe date formatter
function TransactionDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState(date);

  useEffect(() => {
    setFormatted(new Date(date).toLocaleString());
  }, [date]);

  return <>{formatted}</>;
}

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Sort newest first
  const sortedTransactions = useMemo(
    () =>
      [...mockTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  const visible = useMemo(
    () =>
      sortedTransactions.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      ),
    [sortedTransactions, currentPage]
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
          <p className="text-sm text-gray-400">
            <TransactionDate date={tx.date} />
          </p>
          <p className="text-xs text-gray-400">
            <span className="opacity-70">ID:</span> {tx.id}
          </p>
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
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="text-sm font-medium text-green-500">Completed</span>
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
            Track your deposits and withdrawals in real time.
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
