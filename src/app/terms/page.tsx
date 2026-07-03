import React from "react";

export default function TermsPage() {
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
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 md:py-24">
        <span className="px-3 py-1 text-[10px] uppercase font-bold text-indigo-400 bg-indigo-900/40 border border-indigo-500/20 rounded-full mb-6 inline-block">
          Rules & Terms
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">
          Terms of Service
        </h1>

        <div className="flex flex-col gap-6 text-slate-300 text-sm leading-relaxed">
          <p className="text-xs text-slate-500">Last updated: July 3, 2026</p>
          
          <p>
            Welcome to AgentStack.io. By accessing and using this website, you agree to comply with the following Terms of Service.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">1. Use of Calculators & Information Disclaimer</h2>
          <p>
            All price calculations, latency scores, and API comparisons on AgentStack.io are provided **strictly for estimation purposes**. While we check rates weekly, providers (OpenAI, Anthropic, ElevenLabs, Vapi, etc.) fluctuate their pricing regularly.
          </p>
          <p>
            AgentStack.io is not liable for billing discrepancies between estimates shown here and your actual provider invoices. Please verify the actual running rates on the official provider dashboards before launching production pipelines.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">2. Code Auditor Tool Use</h2>
          <p>
            The API Code Auditor tool is a static rule-based system analyzing keywords to suggest cost optimizations. It does not compile, execute, or store your code. We suggest reviewing all structural changes locally before applying optimizations to production repositories.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">3. Referral & Affiliate Disclosures</h2>
          <p>
            In compliance with FTC guidelines, please note that some outgoing links (like Make.com or ElevenLabs) are referral/affiliate links. If you sign up using these links, we may receive a commission at zero additional cost to you.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">4. Intellectual Property</h2>
          <p>
            The custom design, layout, calculators, latency charts, and content of AgentStack.io are protected under copyright. You may share screenshots and calculations on social media with proper citation.
          </p>
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
