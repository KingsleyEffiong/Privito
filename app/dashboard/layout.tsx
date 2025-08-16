"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useInterest } from "@/hooks/useInterest";
import dashboardImage from "@/assets/dynamic-data-visualization-3d (1).jpg";
import Background from "@/components/shared/Background";
import DashboardNavbar from "@/components/dashboard/shared/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data, isLoading } = useUser();
  const { mutate: applyInterest } = useInterest();

  const userName =
    data?.success && data?.data?.username
      ? data.data.username
      : isLoading
      ? ""
      : "Guest";

     

  // Automatically trigger interest if 24h passed
  useEffect(() => {
    if (!data?.success || !data.data?._id) return;

    const now = new Date();
    const lastApplied = new Date(data.data.lastInterestApplied || 0);
    const hoursSince =
      (now.getTime() - lastApplied.getTime()) / (1000 * 60 * 60);

    if (hoursSince >= 24) {
      applyInterest({ userId: data.data._id });
    }
  }, [data, applyInterest]);

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
          title="Dashboard"
          referralLink="https://privito.com/referral"
          userName={userName}
          loading={isLoading}
        />
      </div>
      {/* <button
        onClick={click}
        className="mt-11 cursor-pointer bg-amber-800 px-2.5 py-3.5"
      >
        clik
      </button> */}

      {/* Page Content */}
      <div className="relative w-full max-w-6xl mt-7">{children}</div>
    </div>
  );
};

export default DashboardLayout;
