"use client";
import React from "react";
import UserTransactions from "@/components/dashboard/UserTransactions";

interface Stat {
  label: string;
  value: string;
}

const Page: React.FC = () => {
  const stats: Stat[] = [
    { label: "Deposit Wallet Balance", value: "$5,200" },
    { label: "Interest Wallet Balance", value: "$1,250" },
    { label: "Total Invest", value: "$8,000" },
    { label: "Total Deposit", value: "$12,000" },
    { label: "Total Withdraw", value: "$4,500" },
    { label: "Referral Earnings", value: "$650" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <p className="text-gray-300 text-sm">{stat.label}</p>
            <h2 className="text-3xl font-bold text-white mt-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="mt-8">
        <UserTransactions />
      </div>
    </>
  );
};

export default Page;
