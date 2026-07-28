'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Node {
  id: string;
  name: string;
  ip: string;
  provider: 'Hetzner' | 'AWS' | 'DigitalOcean' | 'BYOS';
  status: 'active' | 'offline' | 'provisioning';
  cpu: number;
  ram: number;
  latency: number;
  activeCalls: number;
}

interface ClonedVoice {
  id: string;
  name: string;
  status: 'ready' | 'training';
  gender: string;
  language: string;
  addedDate: string;
interface ClonedVoice {
  id: string;
  name: string;
  status: 'ready' | 'training';
  gender: string;
  language: string;
  addedDate: string;
}

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

  // French (FR)
  { id: 'ff_siwis', gender: 'Female', accent: 'FR', language: 'French' },

  // Italian (IT)
  { id: 'if_sara', gender: 'Female', accent: 'IT', language: 'Italian' },
  { id: 'im_nicola', gender: 'Male', accent: 'IT', language: 'Italian' },

  // Portuguese (PT)
  { id: 'pf_dora', gender: 'Female', accent: 'PT', language: 'Portuguese' },
  { id: 'pm_alex', gender: 'Male', accent: 'PT', language: 'Portuguese' },

  // Hindi (IN)
  { id: 'hf_alpha', gender: 'Female', accent: 'IN', language: 'Hindi' },
  { id: 'hm_omega', gender: 'Male', accent: 'IN', language: 'Hindi' },

  // Japanese (JP)
  { id: 'jf_alpha', gender: 'Female', accent: 'JP', language: 'Japanese' },
  { id: 'jm_kumo', gender: 'Male', accent: 'JP', language: 'Japanese' },

  // Chinese (CN)
  { id: 'zf_xiaobei', gender: 'Female', accent: 'CN', language: 'Chinese' },
  { id: 'zm_yunxi', gender: 'Male', accent: 'CN', language: 'Chinese' }
];

export default function DeveloperConsole() {
  const [activeTab, setActiveTab] = useState<'nodes' | 'synthesis' | 'cloning' | 'billing' | 'docs'>('nodes');
  const [licenseKey, setLicenseKey] = useState('');
  const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [licenseTier, setLicenseTier] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Audio Synthesis state for transcript generation
  const [ttsText, setTtsText] = useState('Enter transcript text here to generate high-fidelity speech audio...');
  const [ttsLanguage, setTtsLanguage] = useState('English');
  const [ttsAccent, setTtsAccent] = useState('US');
  const [ttsVoice, setTtsVoice] = useState('af_bella');
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
  const [ttsGenTime, setTtsGenTime] = useState<number | null>(null);
  const [ttsError, setTtsError] = useState<string | null>(null);

  const ttsBackendUrl = process.env.NEXT_PUBLIC_TTS_API_URL || 'https://api.agentstackcalc.com';

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

  const filteredVoices = STATIC_VOICES.filter(
    (v) => v.language === ttsLanguage && (ttsLanguage === 'English' ? v.accent === ttsAccent : true)
  );

  const handleLanguageChange = (lang: string) => {
    setTtsLanguage(lang);
    const accents = accentsMap[lang] || [];
    setTtsAccent(accents[0] || '');
  };

  useEffect(() => {
    if (filteredVoices.length > 0) {
      const hasBella = filteredVoices.some(v => v.id === 'af_bella');
      if (ttsLanguage === 'English' && ttsAccent === 'US' && hasBella) {
        setTtsVoice('af_bella');
      } else {
        setTtsVoice(filteredVoices[0].id);
      }
    }
  }, [ttsLanguage, ttsAccent]);

  const handleSynthesizeAudio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ttsText.trim()) return;

    setTtsLoading(true);
    setTtsError(null);
    if (ttsAudioUrl) {
      URL.revokeObjectURL(ttsAudioUrl);
      setTtsAudioUrl(null);
    }
    setTtsGenTime(null);

    const startTime = performance.now();

    try {
      const response = await fetch(`${ttsBackendUrl}/api/v1/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: ttsText.substring(0, 3000),
          voice: ttsVoice,
          speed: ttsSpeed,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'TTS API Server is currently offline.' }));
        throw new Error(errorData.detail || 'Failed to synthesize speech.');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setTtsAudioUrl(url);
      setTtsGenTime(performance.now() - startTime);
    } catch (err: any) {
      console.error('TTS Synthesis Error:', err);
      setTtsError(err.message || 'An error occurred during speech synthesis.');
    } finally {
      setTtsLoading(false);
    }
  };

  // Nodes state
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'node-1', name: 'EU-Munich-Primary', ip: '167.233.154.2', provider: 'Hetzner', status: 'active', cpu: 12, ram: 42, latency: 198, activeCalls: 3 },
    { id: 'node-2', name: 'US-East-Failover', ip: '54.210.88.19', provider: 'AWS', status: 'active', cpu: 8, ram: 28, latency: 124, activeCalls: 1 },
  ]);

  // Voice cloning state
  const [clonedVoices, setClonedVoices] = useState<ClonedVoice[]>([
    { id: 'clone-1', name: 'CEO Custom Brand Voice', status: 'ready', gender: 'Male', language: 'English (US)', addedDate: '2026-07-03' },
    { id: 'clone-2', name: 'Customer Support Lead', status: 'ready', gender: 'Female', language: 'Spanish (ES)', addedDate: '2026-07-05' },
  ]);

  // Modal control
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeProvider, setNewNodeProvider] = useState<'Hetzner' | 'AWS' | 'DigitalOcean' | 'BYOS'>('Hetzner');
  const [apiToken, setApiToken] = useState('');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningStep, setProvisioningStep] = useState(0);

  // Voice cloning upload simulation
  const [isUploading, setIsUploading] = useState(false);
  const [newVoiceName, setNewVoiceName] = useState('');
  const [newVoiceGender, setNewVoiceGender] = useState('Female');
  const [newVoiceLang, setNewVoiceLang] = useState('English');

  // Load license from local storage if saved
  useEffect(() => {
    const savedKey = localStorage.getItem('stackvoice_license');
    if (savedKey) {
      setLicenseKey(savedKey);
      verifyLicenseKey(savedKey);
    }
  }, []);

  const verifyLicenseKey = async (key: string) => {
    if (!key.trim()) return;
    setIsVerifying(true);
    setVerificationError(null);

    // Simulate Lemon Squeezy License Validation API
    setTimeout(() => {
      // Allow any formatted key for test mode
      if (key.includes('C67546686495') || key.length > 8) {
        setIsLicenseValid(true);
        setLicenseTier('Startup Plan ($99/mo)');
        localStorage.setItem('stackvoice_license', key);
      } else {
        setIsLicenseValid(false);
        setLicenseTier(null);
        setVerificationError('Invalid license key. Please check your Lemon Squeezy dashboard.');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleDisconnectLicense = () => {
    localStorage.removeItem('stackvoice_license');
    setLicenseKey('');
    setIsLicenseValid(false);
    setLicenseTier(null);
  };

  // Simulate server node telemetry ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          if (n.status !== 'active') return n;
          // Randomly fluctuate telemetry indicators
          const cpuDelta = Math.floor(Math.random() * 7) - 3;
          const ramDelta = Math.floor(Math.random() * 3) - 1;
          const latencyDelta = Math.floor(Math.random() * 11) - 5;
          return {
            ...n,
            cpu: Math.min(Math.max(n.cpu + cpuDelta, 2), 98),
            ram: Math.min(Math.max(n.ram + ramDelta, 10), 95),
            latency: Math.min(Math.max(n.latency + latencyDelta, 30), 450),
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle adding new node
  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    setIsProvisioning(true);
    setProvisioningStep(1);

    // Simulate provisioning workflow
    setTimeout(() => setProvisioningStep(2), 1500); // Docker install
    setTimeout(() => setProvisioningStep(3), 3000); // ONNX download
    setTimeout(() => setProvisioningStep(4), 4500); // SSL setup
    setTimeout(() => {
      const randomIP = `${Math.floor(Math.random() * 190) + 30}.${Math.floor(Math.random() * 200) + 10}.${Math.floor(Math.random() * 200) + 5}.${Math.floor(Math.random() * 250) + 1}`;
      const newCreatedNode: Node = {
        id: `node-${Date.now()}`,
        name: newNodeName,
        ip: randomIP,
        provider: newNodeProvider,
        status: 'active',
        cpu: 0,
        ram: 0,
        latency: 142,
        activeCalls: 0,
      };
      setNodes((prev) => [...prev, newCreatedNode]);
      setIsProvisioning(false);
      setShowAddNodeModal(false);
      // Reset form states
      setNewNodeName('');
      setApiToken('');
    }, 6000);
  };

  // Handle voice clone creation
  const handleUploadVoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoiceName.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newClone: ClonedVoice = {
        id: `clone-${Date.now()}`,
        name: newVoiceName,
        status: 'ready',
        gender: newVoiceGender,
        language: `${newVoiceLang} (Native)`,
        addedDate: new Date().toISOString().split('T')[0],
      };
      setClonedVoices((prev) => [...prev, newClone]);
      setIsUploading(false);
      setNewVoiceName('');
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="glass-panel border-b border-slate-900 px-6 py-4 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-xl font-bold tracking-tight text-white font-display">
            StackVoice<span className="text-[#10b981] font-extrabold">Console</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">Return to Site</Link>
          <span className="text-slate-700">|</span>
          <span className={`px-2 py-1 rounded border flex items-center gap-1.5 ${
            isLicenseValid 
              ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400' 
              : 'bg-amber-950/40 border-amber-500/20 text-amber-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLicenseValid ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            {isLicenseValid ? licenseTier : 'No Active License'}
          </span>
        </div>
      </header>

      {/* WORKSPACE AREA */}
      <div className="flex flex-1 z-10">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 border-r border-slate-900 bg-slate-950/40 p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">StackVoice API</span>
            <span className="text-xs text-slate-400 font-medium">Control Panel v1.0.4</span>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('nodes')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                activeTab === 'nodes'
                  ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30 border-l-2 border-transparent'
              }`}
            >
              📊 Deployments & Nodes
            </button>
            <button
              onClick={() => setActiveTab('synthesis')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                activeTab === 'synthesis'
                  ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30 border-l-2 border-transparent'
              }`}
            >
              🔊 Audio Generation
            </button>
            <button
              onClick={() => setActiveTab('cloning')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                activeTab === 'cloning'
                  ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30 border-l-2 border-transparent'
              }`}
            >
              🎙️ Voice Studio (Cloning)
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                activeTab === 'billing'
                  ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30 border-l-2 border-transparent'
              }`}
            >
              💳 Billing & License Key
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
                activeTab === 'docs'
                  ? 'bg-indigo-600/10 text-white border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/30 border-l-2 border-transparent'
              }`}
            >
              📖 API Integration Docs
            </button>
          </nav>
        </aside>

        {/* MAIN PANEL CONTENT */}
        <main className="flex-1 p-8">
          
          {/* TAB 1: DEPLOYMENTS & NODES */}
          {activeTab === 'nodes' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white font-display">Speech Synthesis Nodes</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage and provision your self-hosted speech server instances.</p>
                </div>
                <button
                  onClick={() => setShowAddNodeModal(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-indigo-600/25"
                >
                  + Deploy New Node
                </button>
              </div>

              {/* Server Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nodes.map((n) => (
                  <div key={n.id} className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-base">{n.name}</h3>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{n.ip} · {n.provider}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1.5 ${
                        n.status === 'active' 
                          ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-400' 
                          : 'bg-slate-900 border border-slate-800 text-slate-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${n.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                        {n.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-y border-slate-800/80 py-3 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wide">CPU Load</span>
                        <span className="font-bold font-mono text-white mt-1 block">{n.cpu}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wide">RAM Usage</span>
                        <span className="font-bold font-mono text-white mt-1 block">{n.ram}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase tracking-wide">Avg Latency</span>
                        <span className="font-bold font-mono text-emerald-400 mt-1 block">{n.latency}ms</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Active Streams: <strong className="text-white">{n.activeCalls} calls</strong></span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`http://${n.ip}:3005`);
                            alert('Copied endpoint URL to clipboard!');
                          }}
                          className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-md text-[10px] font-semibold transition-all cursor-pointer"
                        >
                          🔗 Copy API URL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AUDIO GENERATION STUDIO */}
          {activeTab === 'synthesis' && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold text-white font-display">Audio Generation Studio</h1>
                <p className="text-xs text-slate-400 mt-1">Generate high-fidelity speech audio WAV files for your transcripts directly using our hosted engine.</p>
              </div>

              <form onSubmit={handleSynthesizeAudio} className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Language */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Language</label>
                    <select
                      value={ttsLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 outline-none cursor-pointer"
                    >
                      {Object.keys(accentsMap).map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  {/* Accent Dialect */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accent Dialect</label>
                    <select
                      value={ttsAccent}
                      onChange={(e) => setTtsAccent(e.target.value)}
                      disabled={ttsLanguage !== 'English'}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 outline-none disabled:opacity-50 cursor-pointer"
                    >
                      {(accentsMap[ttsLanguage] || []).map((acc) => (
                        <option key={acc} value={acc}>{acc === 'US' ? 'American (US)' : acc === 'UK' ? 'British (UK)' : acc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Voice Persona */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Voice Character</label>
                    <select
                      value={ttsVoice}
                      onChange={(e) => setTtsVoice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 outline-none cursor-pointer"
                    >
                      {filteredVoices.map((v) => {
                        const cleanId = v.id.replace(/^(af_|am_|bf_|bm_|ef_|em_|ff_|if_|im_|pf_|pm_|hf_|hm_|jf_|jm_|zf_|zm_)/, '');
                        const name = cleanId.charAt(0).toUpperCase() + cleanId.slice(1);
                        return (
                          <option key={v.id} value={v.id}>
                            {name} ({v.gender})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Speed Slider */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-400 uppercase tracking-wider">Speech Speed</label>
                    <span className="text-indigo-400 font-mono font-bold">{ttsSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={ttsSpeed}
                    onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Slow (0.5x)</span>
                    <span>Normal (1.0x)</span>
                    <span>Fast (2.0x)</span>
                  </div>
                </div>

                {/* Script Textarea */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-400 uppercase tracking-wider">Input Script / Transcript</label>
                    <span className="text-slate-500 font-mono text-[11px]">{ttsText.length}/3000</span>
                  </div>
                  <textarea
                    value={ttsText}
                    onChange={(e) => setTtsText(e.target.value.substring(0, 3000))}
                    rows={6}
                    required
                    placeholder="Paste or type script transcript here..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 resize-none leading-relaxed"
                  />
                </div>

                {/* Synthesize Action Button */}
                <button
                  type="submit"
                  disabled={ttsLoading || !ttsText.trim()}
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-950 disabled:opacity-50 border border-transparent disabled:border-slate-800 rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {ttsLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Generating Audio...</span>
                    </>
                  ) : (
                    <span>🔊 Synthesize Voice Audio</span>
                  )}
                </button>

                {/* Audio Player Output */}
                {ttsAudioUrl && (
                  <div className="p-4 border border-emerald-500/20 bg-emerald-950/10 rounded-xl flex flex-col gap-4 animate-fade-in">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-400 font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Synthesis Complete!
                      </span>
                      {ttsGenTime && (
                        <span className="text-[10px] text-slate-500">
                          Engine Latency: <span className="font-mono text-slate-400">{(ttsGenTime / 1000).toFixed(2)}s</span>
                        </span>
                      )}
                    </div>
                    <audio controls src={ttsAudioUrl} className="w-full rounded-lg" autoPlay />
                    <div className="flex justify-end">
                      <a
                        href={ttsAudioUrl}
                        download="transcript_speech.wav"
                        className="px-4 py-2 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-2 transition-all"
                      >
                        📥 Download Audio WAV
                      </a>
                    </div>
                  </div>
                )}

                {ttsError && (
                  <div className="p-3 border border-red-500/20 bg-red-950/10 text-red-400 text-xs rounded-xl text-center">
                    ⚠️ {ttsError}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 2: VOICE STUDIO (CLONING) */}
          {activeTab === 'cloning' && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold text-white font-display">Voice Cloning Studio</h1>
                <p className="text-xs text-slate-400 mt-1">Train custom brand profiles. Unlocked via active subscription licenses.</p>
              </div>

              {!isLicenseValid ? (
                <div className="glass-panel p-8 text-center rounded-2xl border border-amber-500/10 bg-amber-950/5 flex flex-col items-center gap-3">
                  <span className="text-3xl">🔒</span>
                  <h3 className="font-bold text-white text-base">Voice Studio is Locked</h3>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    Voice cloning requires an active **Startup** or **Scale** subscription. Connect your license key in the billing tab to unlock.
                  </p>
                  <button
                    onClick={() => setActiveTab('billing')}
                    className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Enter License Key
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Upload Voice File Form */}
                  <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col gap-4">
                    <h3 className="font-bold text-white text-base">Clone New Voice</h3>
                    <form onSubmit={handleUploadVoice} className="flex flex-col gap-3 text-xs">
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400 font-semibold">Voice Persona Name:</label>
                        <input
                          type="text"
                          required
                          value={newVoiceName}
                          onChange={(e) => setNewVoiceName(e.target.value)}
                          placeholder="e.g. CEO Brand Agent"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-indigo-500 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400 font-semibold">Gender:</label>
                          <select
                            value={newVoiceGender}
                            onChange={(e) => setNewVoiceGender(e.target.value)}
                            className="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                          >
                            <option>Female</option>
                            <option>Male</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400 font-semibold">Language:</label>
                          <select
                            value={newVoiceLang}
                            onChange={(e) => setNewVoiceLang(e.target.value)}
                            className="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>Hindi</option>
                          </select>
                        </div>
                      </div>

                      {/* File selector input */}
                      <div className="flex flex-col gap-1 mt-1">
                        <label className="text-slate-400 font-semibold">Reference Audio File (10-30s):</label>
                        <div className="border border-dashed border-slate-800 rounded-lg p-6 text-center hover:border-indigo-500/50 transition-colors cursor-pointer bg-slate-950/40">
                          <span className="text-xl block mb-1">📤</span>
                          <span className="text-[10px] text-slate-500 font-medium">Drag & Drop or click to upload Reference WAV</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isUploading || !newVoiceName}
                        className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-900 disabled:opacity-50 text-white rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isUploading ? 'Extracting Voice Embeddings...' : 'Start Training Clone'}
                      </button>
                    </form>
                  </div>

                  {/* Cloned Voices List */}
                  <div className="lg:col-span-8 flex flex-col gap-4">
                    <h3 className="font-bold text-white text-base">Your Custom Personas</h3>
                    <div className="flex flex-col gap-3">
                      {clonedVoices.map((voice) => (
                        <div key={voice.id} className="glass-panel p-4 rounded-xl border border-white/5 bg-slate-900/20 flex justify-between items-center text-xs">
                          <div>
                            <h4 className="font-bold text-white text-sm">{voice.name}</h4>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{voice.gender} · {voice.language} · Added {voice.addedDate}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-[4px] font-bold text-[9px]">
                              READY TO DEPLOY
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* TAB 3: BILLING & LICENSE KEY */}
          {activeTab === 'billing' && (
            <div className="flex flex-col gap-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-bold text-white font-display">License Key & Subscriptions</h1>
                <p className="text-xs text-slate-400 mt-1">Verify your Lemon Squeezy license key to authenticate your nodes.</p>
              </div>

              {/* License box */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-base">Lemon Squeezy License Verification</h3>
                  {isLicenseValid && (
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      ✓ Authenticated
                    </span>
                  )}
                </div>

                {!isLicenseValid ? (
                  <div className="flex flex-col gap-3 text-xs">
                    <p className="text-slate-400 leading-relaxed">
                      Please input the license key issued by **Lemon Squeezy** upon checkout. This unlocks multi-node clustering and advanced voice cloning tools in your deployments.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        placeholder="e.g. XXXX-C67546686495"
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-indigo-500 font-mono text-sm"
                      />
                      <button
                        onClick={() => verifyLicenseKey(licenseKey)}
                        disabled={isVerifying || !licenseKey}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-950 disabled:opacity-50 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
                      >
                        {isVerifying ? 'Verifying...' : 'Link License'}
                      </button>
                    </div>
                    {verificationError && (
                      <span className="text-red-400 font-medium block mt-1">⚠️ {verificationError}</span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="grid grid-cols-2 gap-4 border-b border-slate-800/80 pb-4">
                      <div>
                        <span className="text-slate-500 block uppercase text-[9px] tracking-wide font-bold">Active License</span>
                        <span className="font-mono text-white text-sm block mt-1">XXXX-XXXX-{licenseKey.slice(-4)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block uppercase text-[9px] tracking-wide font-bold">Current Plan</span>
                        <span className="text-emerald-400 text-sm block mt-1 font-bold">{licenseTier}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Deployments allowed: <strong className="text-white">3 nodes</strong> (2 active)</span>
                      <button
                        onClick={handleDisconnectLicense}
                        className="px-3 py-1.5 bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/20 rounded-md text-[10px] font-bold transition-all cursor-pointer"
                      >
                        Disconnect Key
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Cards if not authenticated */}
              {!isLicenseValid && (
                <div className="flex flex-col gap-4 mt-4">
                  <h3 className="font-bold text-white text-base">Select Your Infrastructure Tier</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'Developer', price: '$29', limit: '1 Active Node', clone: '1 Custom Voice' },
                      { name: 'Startup', price: '$99', limit: '3 Active Nodes', clone: '5 Custom Voices', highlight: true },
                      { name: 'Scale', price: '$299', limit: 'Unlimited Nodes', clone: 'Unlimited Voices' },
                    ].map((plan) => (
                      <div key={plan.name} className={`glass-panel p-5 rounded-xl border flex flex-col justify-between gap-4 ${
                        plan.highlight 
                          ? 'border-indigo-500 bg-indigo-950/15' 
                          : 'border-white/5 bg-slate-900/10'
                      }`}>
                        <div>
                          <h4 className="font-bold text-white text-sm">{plan.name}</h4>
                          <span className="text-2xl font-black text-white mt-1 block">{plan.price}<span className="text-xs font-normal text-slate-500">/mo</span></span>
                          <ul className="text-[10px] text-slate-400 flex flex-col gap-1.5 mt-3 list-disc list-inside">
                            <li>{plan.limit}</li>
                            <li>{plan.clone}</li>
                            <li>Flat-rate hosting support</li>
                          </ul>
                        </div>
                        <button
                          onClick={() => {
                            // Link to user's Lemon Squeezy checkout test page
                            window.open('https://speaksay.com', '_blank');
                          }}
                          className={`w-full py-2 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center ${
                            plan.highlight 
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/15' 
                              : 'bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          Subscribe Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: API INTEGRATION DOCS */}
          {activeTab === 'docs' && (
            <div className="flex flex-col gap-6 max-w-3xl">
              <div>
                <h1 className="text-2xl font-bold text-white font-display">API Integration & SDKs</h1>
                <p className="text-xs text-slate-400 mt-1">Connect your nodes directly to telephony systems and conversational agents.</p>
              </div>

              {/* Code Panel */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col gap-4">
                <h3 className="font-bold text-white text-sm">Python Integration (FastAPI/Vapi/Retell)</h3>
                <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`import requests

# Point this directly to your private, self-hosted VPS node
STACKVOICE_NODE_URL = "http://167.233.154.2:3005"

payload = {
    "text": "Hi, I am your self-hosted speech agent. Running with 0 character fees.",
    "voice": "af_bella",
    "speed": 1.0
}

response = requests.post(
    f"{STACKVOICE_NODE_URL}/api/v1/tts",
    json=payload
)

if response.status_code == 200:
    with open("response.wav", "wb") as f:
        f.write(response.content)
    print("✓ Speech successfully synthesized from private node!")`}
                </pre>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col gap-4">
                <h3 className="font-bold text-white text-sm">Vapi / Retell Custom TTS Hook Configuration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To connect your private StackVoice node to telephony platforms, simply choose **Custom TTS** inside Vapi or Retell's dashboard and set your custom URL parameter:
                </p>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white flex justify-between items-center">
                  <span>POST http://167.233.154.2:3005/api/v1/tts</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("http://167.233.154.2:3005/api/v1/tts");
                      alert("Copied custom endpoint to clipboard!");
                    }}
                    className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-[10px] cursor-pointer"
                  >
                    Copy Endpoint
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900 py-6 px-6 text-center text-xs text-slate-500 bg-slate-950 mt-auto">
        <p className="mb-2">© 2026 StackVoice Engine · Managed Self-Hosted Infrastructure</p>
      </footer>

      {/* MODAL: DEPLOY NODE */}
      {showAddNodeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#0f172a] max-w-md w-full flex flex-col gap-4 animate-fade-in text-xs">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white font-display">Deploy StackVoice Server Node</h3>
              <button
                onClick={() => {
                  if (!isProvisioning) setShowAddNodeModal(false);
                }}
                className="text-slate-500 hover:text-white text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {isProvisioning ? (
              <div className="flex flex-col gap-4 py-6 text-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
                <div className="flex flex-col gap-1.5 mt-2">
                  <h4 className="font-bold text-white text-sm">Provisioning in progress...</h4>
                  <ul className="text-[10px] text-slate-400 flex flex-col gap-1 items-start max-w-xs mx-auto mt-2 text-left">
                    <li className={provisioningStep >= 1 ? 'text-emerald-400 font-medium' : 'text-slate-600'}>
                      {provisioningStep >= 1 ? '✓' : '○'} 1. Initializing Cloud VPS Instance...
                    </li>
                    <li className={provisioningStep >= 2 ? 'text-emerald-400 font-medium' : 'text-slate-600'}>
                      {provisioningStep >= 2 ? '✓' : '○'} 2. Installing Docker runtime & Nginx...
                    </li>
                    <li className={provisioningStep >= 3 ? 'text-emerald-400 font-medium' : 'text-slate-600'}>
                      {provisioningStep >= 3 ? '✓' : '○'} 3. Downloading Kokoro ONNX model weights...
                    </li>
                    <li className={provisioningStep >= 4 ? 'text-emerald-400 font-medium' : 'text-slate-600'}>
                      {provisioningStep >= 4 ? '✓' : '○'} 4. Configuring SSL Reverse Proxy routing...
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDeployNode} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-slate-400 font-semibold">Node Server Name:</label>
                  <input
                    type="text"
                    required
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                    placeholder="e.g. US-California-Node"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-slate-400 font-semibold">Cloud Infrastructure Provider:</label>
                  <select
                    value={newNodeProvider}
                    onChange={(e) => setNewNodeProvider(e.target.value as any)}
                    className="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none"
                  >
                    <option value="Hetzner">Hetzner Cloud (Recommended - $7/mo)</option>
                    <option value="Vultr">Vultr Compute</option>
                    <option value="DigitalOcean">DigitalOcean Droplets</option>
                    <option value="BYOS">Bring Your Own Server (Ubuntu VPS)</option>
                  </select>
                </div>

                {newNodeProvider !== 'BYOS' ? (
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-400 font-semibold">Provider API Access Token:</label>
                    <input
                      type="password"
                      required
                      value={apiToken}
                      onChange={(e) => setApiToken(e.target.value)}
                      placeholder="Enter provider write API key"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-indigo-500 font-mono"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">
                      We use this token temporarily to spin up the instance and load the container. It is never stored.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 p-3 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-400 block font-semibold">Run this script on your Ubuntu VPS:</span>
                    <pre className="p-2 bg-[#080c14] border border-slate-900 text-[10px] font-mono text-emerald-400 break-all select-all">
                      {`curl -fsSL https://stackvoice.com/install.sh | sh -s ${isLicenseValid ? licenseKey : 'YOUR_LICENSE_KEY'}`}
                    </pre>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!newNodeName || (newNodeProvider !== 'BYOS' && !apiToken)}
                  className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-950 disabled:opacity-50 text-white rounded-lg font-bold transition-all cursor-pointer"
                >
                  Deploy Node Instance
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
