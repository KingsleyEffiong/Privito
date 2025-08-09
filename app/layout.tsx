// app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Privit",
  description: "All in one investment platform for crypto, stocks, and more",
  keywords: ["Privito", "Investment", "Crypto", "Stocks"],
  metadataBase: new URL("https://privito.vercel.app"),
  openGraph: {
    title: "Privit",
    description: "All in one investment platform for crypto, stocks, and more",
    url: "https://privito.vercel.app",
    siteName: "Privit",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
