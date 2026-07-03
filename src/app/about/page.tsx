import React from "react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* HEADER */}
      <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <a href="/" className="text-2xl font-bold tracking-tight text-white">
            AgentStack<span className="text-[#10b981] font-extrabold">.io</span>
          </a>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/about" className="text-white transition-colors">About</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 md:py-24">
        <span className="px-3 py-1 text-[10px] uppercase font-bold text-indigo-400 bg-indigo-900/40 border border-indigo-500/20 rounded-full mb-6 inline-block">
          Our Mission
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">
          About AgentStack.io
        </h1>

        <div className="flex flex-col gap-6 text-slate-300 text-sm leading-relaxed">
          <p>
            As artificial intelligence, LLMs, and voice automation scale globally, developers and companies face a significant bottleneck: **API pricing volatility and hidden infrastructure costs**.
          </p>
          <p>
            AgentStack.io was founded to serve as a **cost transparency layer** for modern AI infrastructure. We believe that choosing an AI stack (STT, LLM, TTS, and Workflows) should be based on clear, factual comparison metrics rather than marketing guesswork.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">Who We Are</h2>
          <p>
            Developed by **Muhammad Din**, a Senior AI Engineer & Systems Architect, AgentStack.io provides dynamic, real-time calculators that translate monthly usage (tokens, voice minutes, and tasks) into exact cost estimates across competing providers (OpenAI, Anthropic, Google, ElevenLabs, Vapi, Retell, and n8n).
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">Our Principles</h2>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li><strong>Factual Benchmarks:</strong> All latency and token calculations are derived from real-world developer API logs.</li>
            <li><strong>Local Computation:</strong> Your data inputs, token sliders, and pasted code templates are processed entirely inside your browser and are never uploaded to remote databases.</li>
            <li><strong>Infrastructure Advisory:</strong> We recommend self-hosted alternatives (like self-hosted n8n) to help startups bypass vendor lock-in and save up to 98% on recurring SaaS bills.</li>
          </ul>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-500 bg-slate-950 mt-auto">
        <p className="mb-2">© 2026 AgentStack.io · Transparency layer for AI infrastructure.</p>
        <div className="flex justify-center gap-4 text-[11px] text-slate-400">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
