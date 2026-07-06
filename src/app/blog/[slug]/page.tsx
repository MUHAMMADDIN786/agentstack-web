import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData } from '@/lib/blog';
import WaitlistForm from '@/components/WaitlistForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | AgentStack Calc',
    };
  }

  return {
    title: `${post.title} | AgentStack Calc`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
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

      {/* ARTICLE CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 pt-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Article Body */}
        <article className="lg:col-span-8 flex flex-col gap-6">
          <Link href="/blog" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors mb-4 w-fit">
            ← Back to Cost Reports
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <span>{post.category}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-400 border-y border-white/5 py-4 my-2">
            <span>By <strong>{post.author}</strong></span>
            <span className="text-slate-600">•</span>
            <span>Published on <strong>{post.date}</strong></span>
          </div>

          {/* Rendered HTML Body */}
          <div 
            className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base flex flex-col gap-6 blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        {/* Right Side: Sidebar Call To Actions */}
        <aside className="lg:col-span-4 flex flex-col gap-6 self-start lg:sticky lg:top-24">
          
          {/* CTA Card 1: Try the Simulator */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-indigo-950/20 to-slate-900/60 backdrop-blur-md flex flex-col gap-4 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20 w-fit">
              Simulate Costs
            </span>
            <h3 className="text-lg font-bold text-white font-display">Benchmark your volumes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculate your exact monthly costs for Speech AI, LLM tokens, and workflow systems based on your live volume metrics.
            </p>
            <Link href="/" className="w-full py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl text-center transition-colors shadow-lg shadow-indigo-600/25">
              Launch Calculators
            </Link>
          </div>

          {/* CTA Card 2: StackVoice Beta Sign up */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-slate-950/30 to-slate-900/40 backdrop-blur-md flex flex-col gap-4 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 w-fit">
              Join Beta
            </span>
            <h3 className="text-lg font-bold text-white font-display">StackVoice TTS Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Benchmark your applications with our low-latency, hyper-realistic voice engine at just **$4 per million characters**.
            </p>
            
            {/* Embedded Email Input Waitlist form */}
            <WaitlistForm />
          </div>

        </aside>
      </main>

      {/* Embedded CSS for typography layout */}
      <style>{`
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: 'Outfit', sans-serif;
        }
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-family: 'Outfit', sans-serif;
        }
        .blog-content p {
          margin-bottom: 1rem;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content strong {
          color: #ffffff;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        .blog-content th {
          text-align: left;
          padding: 0.75rem;
          border-bottom: 2px solid rgba(255,255,255,0.1);
          color: #ffffff;
          font-weight: 600;
        }
        .blog-content td {
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: #cbd5e1;
        }
        .blog-content blockquote {
          border-left: 4px solid #4f46e5;
          padding-left: 1rem;
          font-style: italic;
          color: #94a3b8;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
