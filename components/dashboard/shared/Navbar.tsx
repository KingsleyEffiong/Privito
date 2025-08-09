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
    <nav className="w-full max-w-6xl backdrop-blur-lg bg-white/10 border-b border-white/20 px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row items-center md:justify-between gap-3 rounded-b-2xl shadow-lg">
      {/* Left - Title */}
      <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-md text-center md:text-left">
        {title}
      </h1>

      {/* Right - Referral & Profile */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 border border-white/20 rounded-lg px-3 py-2 md:px-4 md:py-2 backdrop-blur-md w-full sm:w-auto">
        {/* Referral Link */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <span className="text-xs sm:text-sm text-gray-200 bg-white/10 px-2 sm:px-3 py-1 rounded-md border border-white/20 truncate max-w-[200px]">
            {referralLink}
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(referralLink)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xs sm:text-sm px-3 py-1 rounded-md shadow-md transition w-full sm:w-auto"
          >
            Copy
          </button>
        </div>

        {/* Divider (hidden on mobile stacked view) */}
        <div className="hidden sm:block w-px h-6 bg-white/30" />

        {/* Profile */}
        <div className="flex items-center gap-2 text-white">
          <User className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-medium text-sm sm:text-base">{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
