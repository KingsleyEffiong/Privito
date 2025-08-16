"use client";
import React from "react";

const GlassSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default GlassSkeleton;
