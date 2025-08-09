"use client";

import Image from "next/image";
import HeroImage from "@/assets/dynamic-data-visualization-3d (2).jpg";
import Background from "@/components/shared/Background";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/homepage/Hero";
import TradingUI from "@/components/homepage/TradingUI";
import Slider from "@/components/homepage/Slider";
import InvestmentPlans from "@/components/homepage/InvestmentPlans";
import CryptoChartPage from "@/components/homepage/CryptoChartPage";
import Transactions from "@/components/homepage/Transactions";
import Faq from "@/components/homepage/Faq";
import Sponsorship from "@/components/homepage/Sposorship";
import AboutUs from "@/components/homepage/AboutUs";
import Footer from "@/components/homepage/Footer";
import InvestorTestimonials from "@/components/homepage/Investors";
import Trading from "@/assets/business-person-futuristic-business-environment.jpg";
import CryptoNews from "@/components/homepage/CryptoNews";
import NewsLetter from "@/components/homepage/NewsLetter";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Background />
      </div>
      <div className="relative min-h-screen text-white">
        {/* 3D Canvas Background with Stars and Floating Shapes */}

        {/* Background Image Overlay */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={Trading}
            alt="Background"
            fill
            placeholder="blur"
            priority
            className="object-cover w-full h-full blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <Navbar />
        <Hero />
      </div>
      <TradingUI />
      <InvestmentPlans />
      <CryptoChartPage />
      <Transactions />
      <CryptoNews />
      <Faq />
      <Sponsorship />
      <InvestorTestimonials />
      <AboutUs />
      <NewsLetter />
      <Footer />
      {/* <Slider /> */}
    </>
  );
}
