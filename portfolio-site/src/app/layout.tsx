// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const horizon = localFont({
  src: "../fonts/Horizon-nMeM.ttf",
  variable: "--font-horizon",
  display: "swap",
});

const oita = localFont({
  src: "../fonts/Oita-Expanded3-Exfont3652.otf",
  variable: "--font-oita",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SuillyCoder - Portfolio",
  description: "Portfolio of SuillyCoder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${horizon.variable} ${oita.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}