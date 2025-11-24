"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/libs/sessions"; // adjust path to your session file
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const session = await getSession();
      setIsLoggedIn(!!session?.token);
    }
    checkLogin();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto relative z-20">
      {/* Logo */}
      <Image src="/Apex Logo.png" alt="Logo" height={100} width={100} />

      {/* Auth Buttons (mobile + desktop) */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="px-4 py-2 md:px-8 md:py-4 cursor-pointer rounded-full text-sm md:text-lg font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-md transition duration-300 hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 md:px-8 md:py-4 rounded-full text-sm md:text-lg font-semibold transition duration-300"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            href="/dashboard"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 md:px-8 md:py-4 rounded-full text-sm md:text-lg font-semibold transition duration-300"
          >
            Dashboard
          </Link>
        )}
      </div>
    </header>
  );
}
