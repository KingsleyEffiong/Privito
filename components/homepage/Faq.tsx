'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: 'What is the minimum amount required to start investing?',
    answer:
      'You can start investing with as little as $100. Our platform supports both small and large investors.',
  },
  {
    question: 'Is my investment secure?',
    answer:
      'Absolutely. We use bank-level encryption, secure wallets, and your funds are held with regulated custodians.',
  },
  {
    question: 'How can I withdraw my earnings?',
    answer:
      'Withdrawals are fast and simple. Head to your dashboard and click "Withdraw Funds". Processing takes 24–48 hours.',
  },
  {
    question: 'Do you charge any hidden fees?',
    answer:
      'No, we believe in full transparency. All fees are clearly shown before transactions are processed.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0e0e11] via-[#111317] to-[#0f0f11] text-white px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Get quick answers to our most common questions.
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-2xl overflow-hidden border border-white/10 shadow-lg ${
                openIndex === index
                  ? 'bg-white/10 backdrop-blur-md shadow-blue-500/10'
                  : 'bg-white/5 backdrop-blur-sm'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full px-6 py-5 text-left text-white font-semibold transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-base sm:text-lg">{item.question}</span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                )}
              </button>

              <div
                className={`px-6 transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 opacity-0 py-0'
                } overflow-hidden text-gray-300 text-sm sm:text-base`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
