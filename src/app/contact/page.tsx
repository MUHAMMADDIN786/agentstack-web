import React from "react";

export default function ContactPage() {
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
          <a href="/contact" className="text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 md:py-24">
        <span className="px-3 py-1 text-[10px] uppercase font-bold text-indigo-400 bg-indigo-900/40 border border-indigo-500/20 rounded-full mb-6 inline-block">
          Support & Consultation
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">
          Contact AgentStack.io
        </h1>

        <div className="flex flex-col gap-6 text-slate-300 text-sm leading-relaxed">
          <p>
            Have questions about our calculation engines, noticed a pricing update, or want to suggest a new LLM / Speech API platform to add to the dashboard? Reach out to us directly!
          </p>

          <h2 className="text-xl font-bold text-white mt-6 mb-2">Systems Architecture Advisory</h2>
          <p>
            If you are a startup or enterprise experiencing high API spending on Voice agents (Vapi, Retell, Bland) or workflows (Zapier, Make), you can book a direct consultation with our Lead Architect to configure secure VPS hosting and custom prompt routes:
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="https://www.upwork.com/freelancers/~01f8ce5ce11decf069?mp_source=share"
              target="_blank"
              className="flex-1 text-center py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/30"
            >
              💼 Hire on Upwork
            </a>
            <a
              href="mailto:azzadaamir786@gmail.com"
              className="flex-1 text-center py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold rounded-xl transition-all"
            >
              ✉️ Email Support
            </a>
          </div>

          <h2 className="text-xl font-bold text-white mt-8 mb-2">General Inquiries</h2>
          <p>
            For partner integrations, listing inquiries, or custom SaaS development requests, please contact us at **azzadaamir786@gmail.com**. We typically respond within 12–24 business hours.
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
