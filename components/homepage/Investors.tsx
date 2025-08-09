"use client";

import React from "react";
import { Quote } from "lucide-react";
import Image from "next/image";
import woman1 from "@/assets/woman1.jpg";
import woman2 from "@/assets/woman2.jpg";
import woman3 from "@/assets/woman3.jpg";
import woman4 from "@/assets/woman4.jpg";
import man1 from "@/assets/man1.jpg";
import man2 from "@/assets/man2.jpg";
import man3 from "@/assets/man3.jpg";
import man4 from "@/assets/man4.jpg";
import bgImage from "@/assets/dynamic-data-visualization-3d.jpg";

const testimonials = [
  {
    name: "Sarah Christopher",
    role: "Angel Investor",
    image: woman1,
    quote:
      "This platform has completely transformed how I invest. Transparent, fast, and trustworthy!",
    rating: 4.5,
  },
  {
    name: "Michael Karnest",
    role: "VC Partner",
    image: man1,
    quote:
      "We've seen incredible returns since joining. The real-time analytics and risk management tools are world-class.",
    rating: 4.5,
  },
  {
    name: "David Freedom",
    role: "Retail Investor",
    image: man2,
    quote:
      "Investing has never felt this easy and rewarding. I love the clean dashboard and support.",
    rating: 4.5,
  },
  {
    name: "Dannie Pokman",
    role: "Crypto Enthusiast",
    image: man3,
    quote:
      "From stocks to crypto, this is my go-to platform. Great community, great support!",
    rating: 5,
  },
  {
    name: "Kenneth Rice",
    role: "Crypto Enthusiast",
    image: woman4,
    quote:
      "From stocks to crypto, this is my go-to platform. Great community, great support!",
    rating: 4.5,
  },
  {
    name: "Udenn Redmond",
    role: "Crypto Enthusiast",
    image: man4,
    quote:
      "From stocks to crypto, this is my go-to platform. Great community, great support!",
    rating: 4,
  },
  {
    name: "Esther Green",
    role: "Crypto Enthusiast",
    image: woman2,
    quote:
      "From stocks to crypto, this is my go-to platform. Great community, great support!",
    rating: 4,
  },
  {
    name: "Flowers Hobson",
    role: "Crypto Enthusiast",
    image: woman3,
    quote:
      "From stocks to crypto, this is my go-to platform. Great community, great support!",
    rating: 3.5,
  },
];

const renderStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.906 1.456 8.275L12 18.896l-7.392 4.591 1.456-8.275L0 9.306l8.332-1.151z" />
        </svg>
      );
    } else if (i - rating === 0.5) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-${i})`}
            stroke="currentColor"
            strokeWidth="1"
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.906 1.456 8.275L12 18.896l-7.392 4.591 1.456-8.275L0 9.306l8.332-1.151z"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.688-1.54 1.118l-3.974-2.89a1 1 0 00-1.176 0l-3.974 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.537 10.1c-.784-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.52-4.674z"
          />
        </svg>
      );
    }
  }

  return <div className="flex justify-center mb-2">{stars}</div>;
};

const InvestorTestimonials = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10 blur-sm"
          priority
        />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">
          What Our Investors Say
        </h2>
        <p className="text-gray-300 mb-12">
          Hear from the people who trust and use our platform to grow their
          wealth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white/50"
              />
              <Quote className="w-8 h-8 text-indigo-400 mb-4" />
              <p className="text-white italic mb-4">{testimonial.quote}</p>

              {/* Star Rating */}
              {renderStars(testimonial.rating)}

              <h4 className="text-lg font-semibold text-white">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-300">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorTestimonials;
