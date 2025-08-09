'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

import image1 from '@/assets/financial-analysts-analyzing-business-reports-on-planned-investment-projects.jpg';
import image2 from '@/assets/laptop-meeting-and-financial-advisor-with-a-business-black-man-and-woman-client-talking-portfolio.jpg';
import image3 from '@/assets/modern-equipped-computer-lab.jpg';

const slides = [
  {
    title: 'Secure & Reliable',
    description: 'We use top-tier encryption and security for all transactions.',
    image: image1,
  },
  {
    title: 'Fast Transactions',
    description: 'Enjoy quick deposits and withdrawals with no hidden delays.',
    image: image2,
  },
  {
    title: '24/7 Support',
    description: 'Our team is here to assist you anytime you need help.',
    image: image3,
  },
];

export default function Slider() {
  return (
    <section className="w-full h-[90vh] relative text-white overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[90vh]">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover w-full h-full scale-105 transition-transform duration-1000 ease-in-out"
                placeholder="blur"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-10" />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 md:p-14 max-w-2xl w-full text-center shadow-2xl animate-fade-up">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling (optional) */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: white;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
