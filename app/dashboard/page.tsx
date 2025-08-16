"use client";
import React from "react";
import UserTransactions from "@/components/dashboard/UserTransactions";
import InterestChart from "@/components/dashboard/InterestChart";
import { useUser } from "@/hooks/useUser";
import CountUp from "react-countup";
import GlassSkeleton from "@/components/ui/glassSkeleton";

interface Stat {
  label: string;
  value: number;
}

const Page: React.FC = () => {
  const { data, isLoading } = useUser();

  const totalDeposit =
    data?.success && data?.data?.depositBalance
      ? Math.round(data.data.depositBalance)
      : 0;

  const totalInterest =
    data?.success && data?.data?.interestHistory
      ? Math.round(
          data.data.interestHistory.reduce(
            (sum, interest) => sum + (interest?.amountAdded || 0),
            0
          )
        )
      : 0;

  const stats: Stat[] = [
    { label: "Total Deposit", value: totalDeposit },
    { label: "Interest Wallet Balance", value: totalInterest },
    { label: "Total Withdraw", value: 0 },
    // { label: "Referral Earnings", value: 0 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <GlassSkeleton key={idx} className="h-28 p-6 shadow-lg" />
            ))
          : stats.map((stat, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <p className="text-gray-300 text-sm">{stat.label}</p>
                <h2 className="text-3xl font-bold text-white mt-2">
                  $
                  <CountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    decimals={2}
                  />
                </h2>
              </div>
            ))}
      </div>

      {/* Interest Chart */}
      <div className="mt-8 mb-8">
        <InterestChart />
      </div>

      {/* Transactions */}
      <div className="mt-8">
        <UserTransactions />
      </div>
    </>
  );
};

export default Page;
