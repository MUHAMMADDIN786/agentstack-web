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
  title: "AgentStack Calc | AI Voice, LLM & Workflow Cost Calculator",
  description: "Compare API costs and latency for Vapi, Retell AI, Bland AI, ElevenLabs, SpeakSay, Cartesia, Deepgram, n8n, Make, and Zapier. Optimize platform spending dynamically.",
  keywords: [
    "vapi cost calculator",
    "retell ai pricing",
    "bland ai vs vapi",
    "elevenlabs pricing",
    "speaksay cost",
    "cartesia ai calculator",
    "n8n vs zapier savings",
    "ai voice agent cost",
    "llm cost comparison",
    "deepseek pricing tool",
    "sora API cost estimator"
  ],
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
