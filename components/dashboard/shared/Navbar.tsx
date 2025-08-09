"use client";
import React from "react";
import { User } from "lucide-react";

interface DashboardNavbarProps {
  title: string;
  referralLink: string;
  userName: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  title,
  referralLink,
  userName,
}) => {
  return (
    <nav className="w-full max-w-6xl backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-4 flex items-center justify-between rounded-b-2xl shadow-lg">
      {/* Left - Title */}
      <h1 className="text-2xl font-bold text-white drop-shadow-md">
        {title}
      </h1>

      {/* Right - Referral & Profile */}
      <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur-md">
        {/* Referral Link */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-200 bg-white/10 px-3 py-1 rounded-md border border-white/20">
            {referralLink}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(referralLink)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm px-3 py-1 rounded-md shadow-md transition"
          >
            Copy
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/30" />

        {/* Profile */}
        <div className="flex items-center gap-2 text-white">
          <User className="w-6 h-6" />
          <span className="font-medium">{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
