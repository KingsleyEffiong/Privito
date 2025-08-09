"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dashboardImage from "@/assets/dynamic-data-visualization-3d (1).jpg";
import Background from "@/components/shared/Background";
import DashboardNavbar from "@/components/dashboard/shared/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6 gap-11">
      {/* Background Image */}
      <Image
        src={dashboardImage}
        alt="Dashboard background"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 -z-30"
        priority
      />

      {/* Star Animation */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Background />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"></div>

      {/* Navbar */}
      <div className="w-full max-w-6xl">
        <DashboardNavbar
          title={"Dashboard"}
          referralLink="https://privito.com/referral"
          userName="John Doe"
        />
      </div>

      {/* Page Content */}
      <div className="relative w-full max-w-6xl">{children}</div>
    </div>
  );
};

export default DashboardLayout;
