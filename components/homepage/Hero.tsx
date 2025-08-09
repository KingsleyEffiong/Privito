import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 md:px-12 py-32 md:py-40 max-w-3xl mx-auto relative z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        Invest for Future in Stable Platform{" "}
        <span className="text-blue-300">and Make Fast Money</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10">
        Invest in an Industry Leader, Professional, and Reliable Company. We
        provide you with the most necessary features that will make your
        experience better.
      </p>
      <Link
        href="/signup"
        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition duration-300"
      >
        Get Started
      </Link>
    </section>
  );
}

export default Hero;
