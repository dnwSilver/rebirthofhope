import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import mongoose from "mongoose";
import { savior } from "@/db";
import SaviorCards from "@/components/savior-cards";
import Greeting from "@/components/greeting";
import StatusPanel from "@/components/status-panel";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "K8S",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          marginLeft: "2%",
          marginRight: "2%",
          display: "grid",
          gridTemplateColumns: "340px auto",
        }}
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <SaviorCards />
        <main>{children}</main>
        <Greeting />
        <StatusPanel />
      </body>
    </html>
  );
}
