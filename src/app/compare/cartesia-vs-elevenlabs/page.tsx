import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cartesia vs ElevenLabs: Pricing & Latency Comparison 2026",
  description: "Comprehensive B2B cost breakdown comparing Cartesia Sonic ($0.06/min) vs ElevenLabs ($0.24/min). Calculate your exact monthly voice API savings and self-hosted alternatives.",
  keywords: ["cartesia vs elevenlabs", "elevenlabs vs cartesia", "cartesia pricing", "elevenlabs pricing calculator", "voice tts api cost"],
};

export default function CartesiaVsElevenLabs() {
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
          <span className="px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 rounded-full w-fit mx-auto">
            B2B Voice TTS Price Analysis 2026
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Cartesia vs ElevenLabs: Complete Cost & Latency Teardown
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Comparing the two leading ultra-low latency Text-to-Speech (TTS) engines for conversational AI agents. Discover how choosing Cartesia or self-hosted StackVoice can cut your monthly voice bill by up to 80%.
          </p>
        </div>

        {/* B2B AUDIT CTA BANNER */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/70 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">Free B2B Cost Audit</span>
            <h3 className="text-xl font-bold text-white">High ElevenLabs or Cartesia Bill?</h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Book a custom Infrastructure Audit on Upwork. We optimize your TTS voice model routing and deploy self-hosted Kokoro ONNX instances to cut monthly API costs down to zero.
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
          <h2 className="text-xl font-bold text-white">Direct Unit Economics Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-3 px-4">Feature / Metric</th>
                  <th className="py-3 px-4 text-indigo-400">Cartesia Sonic</th>
                  <th className="py-3 px-4 text-purple-400">ElevenLabs Multilingual</th>
                  <th className="py-3 px-4 text-emerald-400">StackVoice (Self-Hosted)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Cost per 1k Characters</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">$0.02 / 1k chars</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300">$0.15 - $0.24 / 1k chars</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">$0.00 (Self-Hosted)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Est. Cost per Audio Minute</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">~$0.06 / min</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300">~$0.24 / min</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">$0.005 / min (VPS RAM)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Average Latency (TTFB)</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">~90ms (Ultra-Fast)</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">~250ms - 400ms</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">~120ms (Dedicated Node)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Voice Emotion Control</td>
                  <td className="py-3.5 px-4 text-slate-300">Speed & Emotion tags</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">Best-in-class expressiveness</td>
                  <td className="py-3.5 px-4 text-slate-300">54 Native Personas</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Scaling Trap at 10,000 Mins</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">$600 / month</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300 font-bold text-red-400">$2,400 / month</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">$14 / month (Hetzner)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* DEEP DIVE ANALYSIS */}
        <div className="flex flex-col gap-6 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">When to use Cartesia vs ElevenLabs</h2>
          <p>
            <strong>ElevenLabs</strong> remains the gold standard for voice quality, nuance, and emotional storytelling. However, for real-time conversational AI agents (handling customer support, dispatch, or inbound phone calls), its <strong>$0.24/minute</strong> price tag and ~300ms latency create major scaling bottlenecks.
          </p>
          <p>
            <strong>Cartesia Sonic</strong> was purpose-built for real-time AI agents. At <strong>$0.06/minute</strong> ($0.02 per 1,000 characters) and a sub-100ms response time, it is 4x cheaper than ElevenLabs while delivering hyper-realistic audio.
          </p>
          <p>
            For startups operating at scale (&gt;5,000 minutes/month), self-hosting open-weight models like Kokoro-82M on a $7 Hetzner VPS yields an incredible <strong>95% cost reduction</strong> while keeping total latency below 150ms.
          </p>
        </div>

        {/* FOOTER CTA */}
        <div className="text-center pt-8 border-t border-slate-800 flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold text-white">Ready to simulate your exact monthly volume?</h3>
          <Link
            href="/#calculator"
            className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Launch Interactive Voice Calculator
          </Link>
        </div>
      </main>
    </div>
  );
}
