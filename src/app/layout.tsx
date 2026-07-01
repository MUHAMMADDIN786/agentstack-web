import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentStack | AI Voice & Automation Cost Calculators",
  description: "Compare running costs, latency, and features of Vapi, Retell AI, Bland AI, ElevenLabs, Make.com, and Zapier in seconds. Optimize platform spending.",
  verification: {
    google: "TQ_YjrHmLd6mlF4RnFNXhLyJrEa4roJSCIsUNYHa-Xw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
