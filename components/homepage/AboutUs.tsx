"use client";

import React from "react";
import Image from "next/image";
import aboutImg from "@/assets/business-concept-with-graphic-holography.jpg"; // Replace with your image

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-[#0d0d0e] text-white py-20 px-6 flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            About Our Platform
          </h2>
          <p className="text-gray-300 text-lg">
            We’re a forward-thinking financial platform built for the next
            generation of investors. Our mission is to make investment simple,
            secure, and accessible to everyone—whether you are a beginner or a
            pro.
          </p>
          <p className="text-gray-400">
            Our technology combines security, performance, and transparency.
            With partnerships from industry leaders and a passionate global
            team, we’re committed to helping you grow your wealth and reach your
            financial goals.
          </p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold text-white transition duration-300">
            Learn More
          </button>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-80 md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={aboutImg}
            alt="About us"
            fill
            className="object-cover object-center rounded-xl"
            placeholder="blur"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl" />
        </div>
      </div>
    </section>
  );
}
