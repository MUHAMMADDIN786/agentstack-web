import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alibaba Wan 2.1 vs Kling AI vs Runway Gen-3: Video Generator API Pricing",
  description: "AI video generation API pricing comparison 2026. Compare Alibaba Wan 2.1 ($0.50/min), Kling AI ($1.20/min), MiniMax Hailuo ($1.50/min), and Runway Gen-3 ($15.00/min).",
  keywords: ["wan 2.1 vs kling", "hailuo vs runway gen3", "ai video generator api pricing", "alibaba wan 2.1 pricing", "kling ai api cost"],
};

export default function WanVsKlingVsRunway() {
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
            AI Video Generation API Cost Benchmarks 2026
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Alibaba Wan 2.1 vs Kling AI vs Runway Gen-3
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Detailed unit cost comparison of leading text-to-video and image-to-video generation APIs. Calculate your monthly video rendering volume and API overhead.
          </p>
        </div>

        {/* B2B AUDIT CTA BANNER */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/70 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">Video AI Pipeline Integration</span>
            <h3 className="text-xl font-bold text-white">Automating Video Workflows at Scale?</h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Book our Lead Engineer on Upwork to build automated video rendering pipelines, integrate Wan 2.1/Kling API webhooks, and optimize GPU batch rendering.
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
          <h2 className="text-xl font-bold text-white">AI Video Model Pricing Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-4">Video Model</th>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">Est. Rate / Min</th>
                  <th className="py-3 px-4">100 Mins Output Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">Alibaba Wan 2.1</td>
                  <td className="py-3.5 px-4 text-slate-400">Alibaba Cloud</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">$0.50 / min</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">$50.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-indigo-400">Kling AI 3.0 Pro</td>
                  <td className="py-3.5 px-4 text-slate-400">Kuaishou</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">$1.20 / min</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">$120.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-purple-400">MiniMax (Hailuo)</td>
                  <td className="py-3.5 px-4 text-slate-400">MiniMax AI</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300">$1.50 / min</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300">$150.00</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-amber-400">Runway Gen-3 Alpha</td>
                  <td className="py-3.5 px-4 text-slate-400">RunwayML</td>
                  <td className="py-3.5 px-4 font-mono text-amber-300">$15.00 / min</td>
                  <td className="py-3.5 px-4 font-mono text-amber-300 font-bold">$1,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="text-center pt-8 border-t border-slate-800 flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold text-white">Simulate video rendering costs for your product</h3>
          <Link
            href="/#calculator"
            className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Open Video Cost Simulator
          </Link>
        </div>
      </main>
    </div>
  );
}
