"use client";
import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full max-w-6xl backdrop-blur-lg bg-white/10 border-b border-white/20 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between rounded-b-2xl shadow-lg relative">
      {/* Left - Title */}
      <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
        {title}
      </h1>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Deposit Button (always visible) */}
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition text-sm font-medium">
          Deposit
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg bg-white/10 border border-white/20"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur-md">
          {/* Withdraw Button */}
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md text-sm transition">
            Withdraw
          </button>

          {/* Referral Link */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-200 bg-white/10 px-3 py-1 rounded-md border border-white/20 truncate max-w-[150px]">
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
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-60 bg-white/10 border border-white/20 backdrop-blur-md rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">
          {/* Withdraw Button */}
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow-md text-sm transition">
            Withdraw
          </button>

          {/* Referral Link */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-200 bg-white/10 px-2 py-1 rounded-md border border-white/20 truncate max-w-[120px]">
              {referralLink}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xs px-3 py-1 rounded-md shadow-md transition"
            >
              Copy
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 text-white mt-2">
            <User className="w-5 h-5" />
            <span className="font-medium text-sm">{userName}</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
