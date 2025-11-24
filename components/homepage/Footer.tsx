"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#0d0d0f] to-[#111317] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand / Description */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Apex Capital</h3>
          <p className="text-sm text-gray-400">
            The most secure platform for investors. We help you grow your wealth
            with confidence.
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white text-gray-300 transition">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Apex Capital. All rights reserved.
      </div>
    </footer>
  );
}
