import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";
import HomeProvider from "@/components/provider/HomeProvider";
import { Suspense } from "react";
import ProgressBar from "@/lib/progress/Progressbar";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Capitronix - Start Your Journey Toward Financial Freedom",
  description:
    "Professional investment platform offering secure and profitable investment plans. Start your journey toward financial freedom today.",
  generator: "v0.app",
  icons : {
    icon : "/fab.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} antialiased`}
    >
      <body className="font-sans">
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <HomeProvider>{children}</HomeProvider>
      </body>
    </html>
  );
}
