import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';

export const metadata = {
  title: 'AI Infrastructure Cost Reports & Pricing Guides | AgentStack Calc',
  description: 'Deep-dive comparison guides on AI model token price cuts, text-to-speech costs, video generators, and self-hosted n8n workflows.',
};

export default function BlogListPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-2xl font-bold tracking-tight text-white font-display">
            AgentStack<span className="text-[#10b981] font-extrabold">Calc</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/#calculator" className="hover:text-white transition-colors">Cost Simulators</Link>
          <Link href="/#comparison" className="hover:text-white transition-colors">Compare Platforms</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Pricing Guides</Link>
          <Link href="/voice" className="hover:text-white transition-colors">Voice Playground</Link>
        </nav>
        <div>
          <a
            href="https://www.upwork.com/freelancers/~01f8ce5ce11decf069?mp_source=share"
            target="_blank"
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
          >
            Hire Lead Architect
          </a>
        </div>
      </header>

      {/* HERO HERO SECTION */}
      <main className="max-w-4xl mx-auto px-6 pt-16 relative z-10">
        <div className="text-center flex flex-col gap-4 mb-16">
          <span className="px-3.5 py-1 text-xs font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 rounded-full w-fit mx-auto uppercase tracking-widest">
            AI Infrastructure Economics
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight font-display leading-tight">
            Cost Reports & Pricing Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Deep-dive technical articles comparing token pricing, API latency, and architectural tradeoffs to help you build cost-effective AI agents.
          </p>
        </div>

        {/* ARTICLES GRID */}
        {posts.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl border border-white/5 bg-slate-900/10 backdrop-blur-md">
            <p className="text-slate-400">Our pricing analysts are compiling the first reports. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="glass-panel group p-6 rounded-2xl flex flex-col gap-4 border border-white/5 bg-slate-900/10 hover:border-indigo-500/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 duration-300 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span className="text-slate-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors font-display leading-tight">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="text-xs text-slate-500">
                    By {post.author} • {post.date}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1.5 transition-colors">
                    Read Article <i className="fa-solid fa-arrow-right group-hover:translate-x-0.5 transition-transform"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
