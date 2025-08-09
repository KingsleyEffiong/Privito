"use client";
import React from "react";

interface DashboardNavbarProps {
  title: string;
  referralLink: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  title,
  referralLink,
}) => {
  return (
    <nav className="w-full max-w-6xl backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-4 flex items-center justify-between rounded-b-2xl shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white drop-shadow-md">{title}</h1>

      {/* Referral Link */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-200 bg-white/10 border border-white/20 px-3 py-1 rounded-md backdrop-blur-sm">
          {referralLink}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(referralLink)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm px-4 py-1.5 rounded-md shadow-md transition"
        >
          Copy
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
