'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Voice {
  id: string;
  gender: string;
  accent: string;
  language: string;
}

const STATIC_VOICES: Voice[] = [
  // American English (US)
  { id: 'af_bella', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_sarah', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_nicole', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_sky', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_heart', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_alloy', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_aoede', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_jessica', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_kore', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_river', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'af_nova', gender: 'Female', accent: 'US', language: 'English' },
  { id: 'am_adam', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_michael', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_fenrir', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_puck', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_echo', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_eric', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_liam', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_onyx', gender: 'Male', accent: 'US', language: 'English' },
  { id: 'am_santa', gender: 'Male', accent: 'US', language: 'English' },
  
  // British English (UK)
  { id: 'bf_emma', gender: 'Female', accent: 'UK', language: 'English' },
  { id: 'bf_isabella', gender: 'Female', accent: 'UK', language: 'English' },
  { id: 'bf_alice', gender: 'Female', accent: 'UK', language: 'English' },
  { id: 'bf_lily', gender: 'Female', accent: 'UK', language: 'English' },
  { id: 'bm_george', gender: 'Male', accent: 'UK', language: 'English' },
  { id: 'bm_lewis', gender: 'Male', accent: 'UK', language: 'English' },
  { id: 'bm_daniel', gender: 'Male', accent: 'UK', language: 'English' },
  { id: 'bm_fable', gender: 'Male', accent: 'UK', language: 'English' },
  
  // Spanish (ES)
  { id: 'ef_dora', gender: 'Female', accent: 'ES', language: 'Spanish' },
  { id: 'em_alex', gender: 'Male', accent: 'ES', language: 'Spanish' },
  { id: 'em_santa', gender: 'Male', accent: 'ES', language: 'Spanish' },
  
  // French (FR)
  { id: 'ff_siwis', gender: 'Female', accent: 'FR', language: 'French' },
  
  // Italian (IT)
  { id: 'if_sara', gender: 'Female', accent: 'IT', language: 'Italian' },
  { id: 'im_nicola', gender: 'Male', accent: 'IT', language: 'Italian' },
  
  // Portuguese (PT)
  { id: 'pf_dora', gender: 'Female', accent: 'PT', language: 'Portuguese' },
  { id: 'pm_alex', gender: 'Male', accent: 'PT', language: 'Portuguese' },
  { id: 'pm_santa', gender: 'Male', accent: 'PT', language: 'Portuguese' },

  // Hindi (IN)
  { id: 'hf_alpha', gender: 'Female', accent: 'IN', language: 'Hindi' },
  { id: 'hf_beta', gender: 'Female', accent: 'IN', language: 'Hindi' },
  { id: 'hm_omega', gender: 'Male', accent: 'IN', language: 'Hindi' },
  { id: 'hm_psi', gender: 'Male', accent: 'IN', language: 'Hindi' },
  
  // Japanese (JA)
  { id: 'jf_alpha', gender: 'Female', accent: 'JP', language: 'Japanese' },
  { id: 'jf_gongitsune', gender: 'Female', accent: 'JP', language: 'Japanese' },
  { id: 'jf_nezumi', gender: 'Female', accent: 'JP', language: 'Japanese' },
  { id: 'jf_tebukuro', gender: 'Female', accent: 'JP', language: 'Japanese' },
  { id: 'jm_kumo', gender: 'Male', accent: 'JP', language: 'Japanese' },
  
  // Chinese (ZH)
  { id: 'zf_xiaobei', gender: 'Female', accent: 'CN', language: 'Chinese' },
  { id: 'zf_xiaoni', gender: 'Female', accent: 'CN', language: 'Chinese' },
  { id: 'zf_xiaoxiao', gender: 'Female', accent: 'CN', language: 'Chinese' },
  { id: 'zf_xiaoyi', gender: 'Female', accent: 'CN', language: 'Chinese' },
  { id: 'zm_yunjian', gender: 'Male', accent: 'CN', language: 'Chinese' },
  { id: 'zm_yunxi', gender: 'Male', accent: 'CN', language: 'Chinese' },
  { id: 'zm_yunxia', gender: 'Male', accent: 'CN', language: 'Chinese' },
  { id: 'zm_yunyang', gender: 'Male', accent: 'CN', language: 'Chinese' }
];
export default function VoicePlayground() {

  const [text, setText] = useState('Hi, I am StackVoice, a hyper-realistic speech synthesis engine. Try typing your own text and hear the performance in real-time!');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedAccent, setSelectedAccent] = useState('US');
  const [selectedVoice, setSelectedVoice] = useState('af_bella');
  const [speed, setSpeed] = useState(1.0);
  const [voices, setVoices] = useState<Voice[]>(STATIC_VOICES);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fallback to localhost in dev, custom domain in prod
  const backendUrl = process.env.NEXT_PUBLIC_TTS_API_URL || 'http://localhost:3005';

  // Available English accents
  const accentsMap: Record<string, string[]> = {
    English: ['US', 'UK'],
    Spanish: ['ES'],
    French: ['FR'],
    Italian: ['IT'],
    Portuguese: ['PT'],
    Hindi: ['IN'],
    Japanese: ['JP'],
    Chinese: ['CN'],
  };

  // Fetch available voices on load
  useEffect(() => {
    async function fetchVoices() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/voices`);
        if (!res.ok) throw new Error('Failed to load voices');
        const data = await res.json();
        setVoices(data.voices);
      } catch (err) {
        console.error('Error fetching voices:', err);
        // Fallback static list if server is offline
        setVoices([
          { id: 'af_bella', gender: 'Female', accent: 'US', language: 'English' },
          { id: 'af_sarah', gender: 'Female', accent: 'US', language: 'English' },
          { id: 'am_adam', gender: 'Male', accent: 'US', language: 'English' },
          { id: 'bf_emma', gender: 'Female', accent: 'UK', language: 'English' },
          { id: 'bm_george', gender: 'Male', accent: 'UK', language: 'English' },
        ]);
      }
    }
    fetchVoices();
  }, [backendUrl]);

  // Handle Language selection change
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const accents = accentsMap[lang] || [];
    const defaultAccent = accents[0] || '';
    setSelectedAccent(defaultAccent);
  };

  // Filter voices based on selected criteria
  const filteredVoices = voices.filter(
    (v) => v.language === selectedLanguage && (selectedLanguage === 'English' ? v.accent === selectedAccent : true)
  );

  // Set first filtered voice as default when filters change
  useEffect(() => {
    if (filteredVoices.length > 0) {
      // Find matching default or fallback
      const hasBella = filteredVoices.some(v => v.id === 'af_bella');
      if (selectedLanguage === 'English' && selectedAccent === 'US' && hasBella) {
        setSelectedVoice('af_bella');
      } else {
        setSelectedVoice(filteredVoices[0].id);
      }
    }
  }, [selectedLanguage, selectedAccent, voices]);

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setGenerationTime(null);

    const startTime = performance.now();

    try {
      const response = await fetch(`${backendUrl}/api/v1/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.substring(0, 500), // Enforce 500 limit on demo
          voice: selectedVoice,
          speed: speed,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'API Server is currently offline.' }));
        throw new Error(errorData.detail || 'Failed to synthesize speech.');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const latency = response.headers.get('X-Response-Time-Ms');
      setGenerationTime(latency ? parseFloat(latency) : performance.now() - startTime);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'API connection refused. Please ensure your Python server is active on Port 3005.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
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
          <Link href="/console" className="hover:text-white transition-colors text-indigo-400 font-bold">Console</Link>
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

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10 w-full flex-grow">
        <div className="text-center flex flex-col gap-4 mb-12">
          <span className="px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 rounded-full w-fit mx-auto uppercase tracking-widest">
            StackVoice Demo Engine
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight">
            Interactive Speech Playground
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Synthesize text dynamically using 54 native US, UK, Spanish, French, and Mandarin voice personas.
          </p>
        </div>

        {/* PLAYGROUND CARD */}
        <div className="glass-panel border border-slate-900 bg-slate-950/40 p-6 md:p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSynthesize} className="flex flex-col gap-6">
            
            {/* STEP 1: VOICE CONFIG */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Language Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 outline-none transition-all"
                >
                  {Object.keys(accentsMap).map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Accent (Only for English) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accent Dialect</label>
                <select
                  value={selectedAccent}
                  disabled={selectedLanguage !== 'English'}
                  onChange={(e) => setSelectedAccent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedLanguage === 'English' ? (
                    accentsMap['English'].map((acc) => (
                      <option key={acc} value={acc}>{acc === 'US' ? 'American (US)' : 'British (UK)'}</option>
                    ))
                  ) : (
                    <option value="">N/A (Standard)</option>
                  )}
                </select>
              </div>

              {/* Voice Profile */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Voice Character</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 outline-none transition-all"
                >
                  {filteredVoices.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.id.split('_')[1].toUpperCase()} ({v.gender})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* STEP 2: SPEED SLIDER */}
            <div className="flex flex-col gap-2 p-4 bg-slate-900/40 border border-slate-900 rounded-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider">Speech Speed</span>
                <span className="text-indigo-400 font-mono font-bold">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                <span>Slow (0.5x)</span>
                <span>Normal</span>
                <span>Fast (2.0x)</span>
              </div>
            </div>

            {/* STEP 3: TEXT AREA */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-400 uppercase tracking-wider">Input Script</label>
                <span className="text-slate-600 font-mono">{text.length}/500</span>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.substring(0, 500))}
                rows={4}
                required
                placeholder="Type script here..."
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 resize-none leading-relaxed"
              />
            </div>

            {/* ACTION BUTTON */}
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-900 border border-transparent disabled:border-slate-800 rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Synthesizing Speech...
                </>
              ) : (
                'Synthesize Voice'
              )}
            </button>

          </form>

          {/* AUDIO PLAYER OUTPUT */}
          {audioUrl && (
            <div className="mt-8 p-4 border border-emerald-500/10 bg-emerald-950/5 rounded-xl flex flex-col gap-4 animate-fade-in">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-emerald-400">Synthesis Complete!</span>
                </div>
                {generationTime && (
                  <span className="text-[10px] text-slate-500">
                    Engine Latency: <span className="font-mono text-slate-400">{(generationTime / 1000).toFixed(2)}s</span>
                  </span>
                )}
              </div>
              <audio controls src={audioUrl} className="w-full" autoPlay />
              <div className="flex justify-end">
                <a
                  href={audioUrl}
                  download={`stackvoice_${selectedVoice}.wav`}
                  className="px-3 py-1.5 text-[10px] font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  📥 Download Audio WAV
                </a>
              </div>
            </div>
          )}

          {/* ERROR STATUS */}
          {error && (
            <div className="mt-6 p-3 border border-red-500/10 bg-red-950/5 text-red-400 text-xs rounded-xl text-center leading-relaxed">
              ⚠️ {error}
            </div>
          )}

        </div>

        {/* DEDICATED WAITLIST CRM CTA */}
        <section className="mt-12 text-center max-w-xl mx-auto flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white font-display">Ready to self-host StackVoice?</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            StackVoice is 100% open-source and free. Get the official API source code and VPS deployment instructions to run your own dedicated speech server with no character limits.
          </p>
          <div className="flex justify-center mt-2">
            <a
              href="https://github.com/MUHAMMADDIN786/2b-lead-automation-microservice"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-5 py-2.5 rounded-xl transition-all shadow-md"
            >
              Get API Source Code
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-500 bg-slate-950 mt-auto">
        <p className="mb-2">© 2026 AgentStackCalc.com · Powered by StackVoice Engine</p>
        <div className="flex justify-center gap-4 text-[11px] text-slate-400">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
