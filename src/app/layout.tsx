import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const displayFont = Baloo_2({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Beyond the Code — GA 2026",
  description: "CCS-CSC General Assembly 2026: frame generator, program flow, attendance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={displayFont.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
