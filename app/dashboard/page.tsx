"ise client";
// app/page.tsx
import React from "react";
import Image from "next/image";
import dashboardImage from "@/assets/dynamic-data-visualization-3d (1).jpg";
import Background from "@/components/shared/Background";
import UserTransactions from "@/components/dashboard/UserTransactions";
import DashboardNavbar from "@/components/dashboard/shared/Navbar";

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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 gap-11">
      <DashboardNavbar
        title={"Dashboard"}
        referralLink="https://privito.com/referral"
        userName="John Doe"
      />
      {/* Background Image - lowest layer */}
      <Image
        src={dashboardImage}
        alt="Dashboard background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 -z-30"
        priority
      />

      {/* Star Animation - above background image */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Background />
      </div>

      {/* Dark overlay - above stars */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"></div>

      {/* Stats grid - top layer */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
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
      <UserTransactions />
    </div>
  );
};

export default Page;
