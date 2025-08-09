"use client";

import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptoNews } from "@/libs/fetchCryptoNews";
import bgImage from "@/assets/dynamic-data-visualization-3d (1).jpg";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
}

export default function CryptoNews() {
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery<Article[]>({
    queryKey: ["cryptoNews"],
    queryFn: fetchCryptoNews,
  });

  return (
    <section className="relative text-white py-20 px-4 sm:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover opacity-20 blur-sm"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12">
          Latest <span className="text-blue-500">Crypto News</span>
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-300">Loading news...</p>
        ) : isError ? (
          <p className="text-center text-red-400">Failed to load news.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 transition-transform hover:-translate-y-1 hover:shadow-lg shadow-white/5"
              >
                {a.urlToImage && (
                  <div className="h-52 w-full relative overflow-hidden">
                    <img
                      src={a.urlToImage}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {a.description}
                  </p>
                  <div className="text-xs text-gray-400 mt-auto pt-2 border-t border-white/10">
                    {new Date(a.publishedAt).toLocaleDateString()} •{" "}
                    {a.source.name}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
