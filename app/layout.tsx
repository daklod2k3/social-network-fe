import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trang chủ - Kết nối nhanh",
  description: "by Tran Dac Loc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image/logo.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased max-h-screen overflow-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
