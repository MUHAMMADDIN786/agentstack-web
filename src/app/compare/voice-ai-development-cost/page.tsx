import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Voice AI Development & Infrastructure Cost Guide 2026",
  description: "Comprehensive guide to voice AI development costs, API monthly running costs, and self-hosted infrastructure budget estimation for tech leaders and founders.",
  keywords: ["voice ai development costs", "ai agent scaling infrastructure costs", "how much does voice ai cost", "building voice ai agent cost"],
};

export default function VoiceAIDevelopmentCost() {
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
            CTO & Engineering Budget Guide
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Voice AI Development & Infrastructure Costs Explained
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            How much does it actually cost to develop, host, and scale real-time AI voice agents in 2026? A complete teardown from initial MVP build to 50,000 monthly call minutes.
          </p>
        </div>

        {/* B2B AUDIT CTA BANNER */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/70 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">Enterprise Architecture Support</span>
            <h3 className="text-xl font-bold text-white">Need a Dedicated Voice AI Engineer?</h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Hire our Lead AI Systems Architect on Upwork. We build custom WebRTC/SIP pipelines, integrate function calling, and deploy high-speed voice servers with sub-300ms latency.
            </p>
          </div>
          <a
            href="https://www.upwork.com/freelancers/~01f8ce5ce11decf069?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap text-center"
          >
            👉 Hire Lead Engineer on Upwork
          </a>
        </div>

        {/* COST BREAKDOWN TIERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Phase 1: Custom Build</span>
            <h3 className="text-lg font-bold text-white">Development Cost</h3>
            <span className="text-2xl font-extrabold text-white">$1,500 - $5,000</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Covers fullstack developer contract fees for setting up Vapi/Retell workflows, prompt engineering, custom tool calling webhooks, and CRM/database syncing.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Phase 2: Monthly APIs</span>
            <h3 className="text-lg font-bold text-white">SaaS Running Cost</h3>
            <span className="text-2xl font-extrabold text-white">$0.13 - $0.35 / min</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              The combined cost of Voice platform fees, Deepgram STT, LLM tokens, and ElevenLabs/Cartesia TTS voice generation per active call minute.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Phase 3: Scale Savings</span>
            <h3 className="text-lg font-bold text-white">Self-Hosted Nodes</h3>
            <span className="text-2xl font-extrabold text-emerald-400">$0.01 - $0.03 / min</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              By replacing third-party TTS SaaS with self-hosted Kokoro ONNX engines on Hetzner VPS instances, infrastructure costs drop by up to 90%.
            </p>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="text-center pt-8 border-t border-slate-800 flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold text-white">Calculate your exact team budget</h3>
          <Link
            href="/#calculator"
            className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Open Interactive Cost Simulator
          </Link>
        </div>
      </main>
    </div>
  );
}
