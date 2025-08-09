"use client";
import React from "react";

function Navbar() {
  const isLoggedIn = false; // Replace this with real auth logic

  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto relative z-20">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">YourLogo</div>

      {/* Desktop Navigation */}
      {/* <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#features" className="hover:text-blue-400 transition">About Us</a>
        <a href="#pricing" className="hover:text-blue-400 transition">Licence</a>
        <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
      </nav> */}

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {/* Login (glass style) */}
        {!isLoggedIn && (
          <a
            href="/login"
            className="px-8 py-4 cursor-pointer rounded-full text-lg font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-md transition duration-300 hover:bg-white/20"
          >
            Login
          </a>
        )}

        {/* Sign Up (solid blue) */}
        {!isLoggedIn && (
          <a
            href="/signup"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition duration-300"
          >
            Sign Up
          </a>
        )}

        {/* Dashboard (only when logged in) */}
        {isLoggedIn && (
          <a
            href="/dashboard"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition duration-300"
          >
            Dashboard
          </a>
        )}
      </div>

      {/* Mobile Menu Icon */}
      {/* <button className="md:hidden text-2xl focus:outline-none">☰</button> */}
    </header>
  );
}

export default Navbar;
