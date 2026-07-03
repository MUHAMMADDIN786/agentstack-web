import React from "react";

export default function PrivacyPage() {
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
          Legal & Security
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">
          Privacy Policy
        </h1>

        <div className="flex flex-col gap-6 text-slate-300 text-sm leading-relaxed">
          <p className="text-xs text-slate-500">Last updated: July 3, 2026</p>
          
          <p>
            At AgentStack.io, we value the privacy and security of our users. This Privacy Policy details how we handle user inputs, cookies, and data transparency across our calculators and code auditing tools.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">1. Data Storage & Local Ingestion</h2>
          <p>
            AgentStack.io does **not** store, record, or upload any user-provided data inputs to remote database servers. All slider modifications (Monthly Call Minutes, Token volumes, tasks), code snippets pasted into the API Code Auditor, and calculation metrics are processed and rendered **locally in your browser memory**.
          </p>
          <p>
            Once you close your browser tab or refresh the page, all pasted code inputs and calculator histories are completely deleted from your browser memory.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">2. Cookies & Traffic Analytics</h2>
          <p>
            We use minimal cookies and tracking analytics (like Google Search Console) to track anonymized visits, click-through rates on external links, sitemap indexing, and search impressions. We do not track individual users or compile search profiles.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">3. Outgoing Third-Party Links</h2>
          <p>
            Our comparison cards and links redirect to third-party developers (like Vapi.ai, Retell, Bland, Make.com, Namecheap, ElevenLabs). These third-party sites maintain their own privacy policies. We encourage users to verify policies before executing live platform subscriptions or uploading private API keys.
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">4. Contact Us</h2>
          <p>
            If you have questions regarding this policy or data safety on AgentStack.io, please contact us at **azzadaamir786@gmail.com**.
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
