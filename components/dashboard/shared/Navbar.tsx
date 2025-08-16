"use client";
import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

interface DashboardNavbarProps {
  title: string;
  referralLink: string;
  userName: string;
  loading?: boolean; // ✅ new prop
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  title,
  referralLink,
  userName,
  loading = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="w-full backdrop-blur-lg bg-white/10 border-b border-white/20 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between rounded-b-2xl shadow-lg fixed top-0 left-0 z-50">
      {/* Left - Title */}
      <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
        {title}
      </h1>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Deposit Button */}
        <Link
          href="/dashboard/deposit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition text-sm font-medium"
        >
          Deposit
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg bg-white/10 border border-white/20"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur-md">
          {/* Withdraw */}
          <Link
            href="/dashboard/withdrawal"
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md text-sm transition"
          >
            Withdraw
          </Link>

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

          {/* Profile with shimmer when loading */}
          {loading ? (
            <div className="flex items-center gap-2 text-white relative">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 animate-shimmer" />
              <div className="h-4 w-20 rounded bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 animate-shimmer" />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white relative">
              <User className="w-6 h-6" />
              <span className="font-medium relative z-10">{userName}</span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow-md text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-60 bg-white/10 border border-white/20 backdrop-blur-xl rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden z-[9999] animate-slideDown">
          {/* Withdraw */}
          <Link
            href="/dashboard/withdrawal"
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow-md text-sm transition"
          >
            Withdraw
          </Link>

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

          {/* Profile with shimmer */}
          {loading ? (
            <div className="flex items-center gap-2 text-white mt-2 relative">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 animate-shimmer" />
              <div className="h-4 w-16 rounded bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 animate-shimmer" />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white mt-2 relative">
              <User className="w-5 h-5" />
              <span className="font-medium text-sm relative z-10">
                {userName}
              </span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md shadow-md text-sm transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }
        .animate-shimmer {
          background-size: 400px 100%;
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </nav>
  );
};

export default DashboardNavbar;
