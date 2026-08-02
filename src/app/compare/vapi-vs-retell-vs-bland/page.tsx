import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vapi vs Retell AI vs Bland AI: Pricing Calculator 2026",
  description: "B2B voice AI agent platform cost comparison. Compare Vapi ($0.05/min), Retell AI ($0.08/min), and Bland AI ($0.09/min) platform rates, telephony routing, and LLM overhead.",
  keywords: ["vapi pricing calculator", "vapi vs retell", "bland ai cost comparison", "voice ai agent platform pricing", "retell ai pricing"],
};

export default function VapiVsRetellVsBland() {
  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100">
      {/* HEADER */}
      <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-2xl font-bold tracking-tight text-white">
            AgentStack<span className="text-[#10b981] font-extrabold">Calc</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/#calculator" className="hover:text-white transition-colors">Cost Simulators</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Pricing Guides</Link>
          <Link href="/voice" className="hover:text-white transition-colors">Voice Playground</Link>
        </nav>
        <div>
          <a
            href="https://www.upwork.com/freelancers/~01f8ce5ce11decf069?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
          >
            Hire Lead Architect
          </a>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        {/* HERO HEADER */}
        <div className="flex flex-col gap-4 text-center">
          <span className="px-3 py-1 text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-500/20 rounded-full w-fit mx-auto">
            Voice AI Platform Pricing Comparison 2026
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Vapi vs Retell AI vs Bland AI: Cost Simulator & Breakdown
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Detailed unit cost teardown of conversational voice orchestration platforms. Learn how platform fees, telephony markup, and TTS selection determine your true monthly invoice.
          </p>
        </div>

        {/* B2B AUDIT CTA BANNER */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/70 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">B2B Voice Architecture Audit</span>
            <h3 className="text-xl font-bold text-white">Scaling Voice AI Past 1,000 Monthly Minutes?</h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Connect with our Lead AI Architect on Upwork. We audit your Twilio BYON setup, optimize prompt token routing, and deploy custom WebSocket backends to save up to 70%.
            </p>
          </div>
          <a
            href="https://www.upwork.com/freelancers/~01f8ce5ce11decf069?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap text-center"
          >
            👉 Book Audit on Upwork
          </a>
        </div>

        {/* COMPARISON TABLE */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white">Voice Agent Platform Pricing Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Flat Platform Fee</th>
                  <th className="py-3 px-4">BYON / Telephony</th>
                  <th className="py-3 px-4">Est. Total (with Cartesia + GPT-4o-mini)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-indigo-400">Vapi.ai</td>
                  <td className="py-3.5 px-4 font-mono">$0.05 / minute</td>
                  <td className="py-3.5 px-4 font-mono">$0.015 / min (Twilio)</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">~$0.13 / minute</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-purple-400">Retell AI</td>
                  <td className="py-3.5 px-4 font-mono">$0.08 / minute</td>
                  <td className="py-3.5 px-4 font-mono">Included or BYON</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300">~$0.16 / minute</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-amber-400">Bland AI</td>
                  <td className="py-3.5 px-4 font-mono">$0.09 / minute</td>
                  <td className="py-3.5 px-4 font-mono">Bundled Telephony</td>
                  <td className="py-3.5 px-4 font-mono text-amber-300">~$0.18 / minute</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ARCHITECTURE ADVICE */}
        <div className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">How to Optimize Voice Agent Overhead</h2>
          <p>
            While <strong>Vapi.ai</strong> offers the lowest base platform fee ($0.05/min), the overall cost of a voice call is determined by 4 underlying layers:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-xs">
            <li><strong>Platform Fee</strong>: Vapi ($0.05) vs Retell ($0.08) vs Bland ($0.09).</li>
            <li><strong>STT (Speech-to-Text)</strong>: Deepgram Nova-2 (~$0.007/min).</li>
            <li><strong>LLM Intent Engine</strong>: GPT-4o-mini (~$0.01/min) vs Claude 3.5 Sonnet (~$0.08/min).</li>
            <li><strong>TTS (Text-to-Speech)</strong>: Cartesia (~$0.06/min) vs ElevenLabs (~$0.24/min).</li>
          </ul>
        </div>

        {/* FOOTER CTA */}
        <div className="text-center pt-8 border-t border-slate-800 flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold text-white">Simulate your exact call volume and stack</h3>
          <Link
            href="/#calculator"
            className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Launch Full Voice AI Simulator
          </Link>
        </div>
      </main>
    </div>
  );
}
