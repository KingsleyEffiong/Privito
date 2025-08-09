"use client";

import React from "react";

function NewsLetter() {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-black text-white overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-8 sm:p-12 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          📩 Stay Updated with <span className="text-blue-500">Privito</span>
        </h2>
        <p className="text-gray-300 text-center max-w-lg mx-auto mb-8">
          Subscribe to our newsletter and get the latest updates on crypto,
          stocks, and investment trends delivered straight to your inbox.
        </p>

        {/* Input and button */}
        <form className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-5 py-3 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition font-semibold text-white shadow-md"
          >
            Subscribe
          </button>
        </form>

        {/* Optional privacy note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          We care about your data in our{" "}
          <span className="underline">privacy policy</span>.
        </p>
      </div>
    </section>
  );
}

export default NewsLetter;
