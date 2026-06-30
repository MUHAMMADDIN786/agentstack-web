"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"voice" | "workflow">("voice");

  // Voice AI State
  const [callMinutes, setCallMinutes] = useState<number>(5000);
  const [telephony, setTelephony] = useState<"native" | "byon">("native");
  const [ttsProvider, setTtsProvider] = useState<"elevenlabs" | "cartesia" | "deepgram">("cartesia");
  const [llmModel, setLlmModel] = useState<"gpt-4o-mini" | "claude-sonnet">("gpt-4o-mini");

  // Workflow State
  const [monthlyTasks, setMonthlyTasks] = useState<number>(20000);
  const [customHosting, setCustomHosting] = useState<boolean>(true);

  // --- VOICE CALCULATIONS ---
  // Constants per minute
  const STT_COST = 0.043; // Deepgram Nova-2
  
  const getTtsCostPerMin = () => {
    // Average 150 words/min (approx. 750 characters)
    const CHARS_PER_MIN = 750;
    if (ttsProvider === "elevenlabs") return (CHARS_PER_MIN * 0.15) / 1000; // $0.15 per 1k chars
    if (ttsProvider === "cartesia") return (CHARS_PER_MIN * 0.02) / 1000;   // $0.02 per 1k chars
    return (CHARS_PER_MIN * 0.015) / 1000;                                 // Deepgram Aura $0.015 per 1k
  };

  const getLlmCostPerMin = () => {
    // Average 12 turns/min (6 user input prompts, 6 agent output answers)
    // Avg 150 input tokens, 100 output tokens per turn
    const INPUT_TOKENS_PER_MIN = 6 * 150;
    const OUTPUT_TOKENS_PER_MIN = 6 * 100;
    
    if (llmModel === "gpt-4o-mini") {
      return (
        (INPUT_TOKENS_PER_MIN * 0.15) / 1000000 +
        (OUTPUT_TOKENS_PER_MIN * 0.60) / 1000000
      );
    } else { // Claude 3.5 Sonnet
      return (
        (INPUT_TOKENS_PER_MIN * 3.00) / 1000000 +
        (OUTPUT_TOKENS_PER_MIN * 15.00) / 1000000
      );
    }
  };

  // Platform Estimations
  const calcVapi = () => {
    const platform = 0.05; // $0.05/min
    const phone = telephony === "native" ? 0.015 : 0.00;
    const tts = getTtsCostPerMin();
    const llm = getLlmCostPerMin();
    
    const ratePerMin = platform + phone + STT_COST + tts + llm;
    const total = ratePerMin * callMinutes;
    
    return {
      total,
      ratePerMin,
      breakdown: {
        platform: platform * callMinutes,
        telephony: phone * callMinutes,
        stt: STT_COST * callMinutes,
        tts: tts * callMinutes,
        llm: llm * callMinutes,
      }
    };
  };

  const calcRetell = () => {
    const platformAndSTT = 0.10; // $0.10/min (includes platform + STT)
    const phone = telephony === "native" ? 0.015 : 0.00;
    const tts = getTtsCostPerMin();
    const llm = getLlmCostPerMin();
    
    const ratePerMin = platformAndSTT + phone + tts + llm;
    const total = ratePerMin * callMinutes;
    
    return {
      total,
      ratePerMin,
      breakdown: {
        platform: 0.10 * callMinutes, // includes STT
        telephony: phone * callMinutes,
        stt: 0, // bundled in platform
        tts: tts * callMinutes,
        llm: llm * callMinutes,
      }
    };
  };

  const calcBland = () => {
    // Bland is a flat $0.09/min including standard STT, TTS, and LLM
    const flatRate = 0.09;
    // If user explicitly chooses premium ElevenLabs, Bland charges extra
    const ttsExtra = ttsProvider === "elevenlabs" ? getTtsCostPerMin() : 0;
    
    const ratePerMin = flatRate + ttsExtra;
    const total = ratePerMin * callMinutes;
    
    return {
      total,
      ratePerMin,
      breakdown: {
        platform: flatRate * callMinutes,
        telephony: 0,
        stt: 0,
        tts: ttsExtra * callMinutes,
        llm: 0,
      }
    };
  };

  // --- WORKFLOW CALCULATIONS ---
  const calcZapier = () => {
    // Zapier tiers (yearly/monthly avg)
    if (monthlyTasks <= 750) return 29;
    if (monthlyTasks <= 2000) return 73;
    if (monthlyTasks <= 5000) return 149;
    if (monthlyTasks <= 10000) return 224;
    if (monthlyTasks <= 20000) return 359;
    if (monthlyTasks <= 50000) return 674;
    return 1199; // 100k tasks
  };

  const calcMake = () => {
    // Make operations tiers
    if (monthlyTasks <= 10000) return 10.59;
    if (monthlyTasks <= 20000) return 21.18;
    if (monthlyTasks <= 40000) return 42.36;
    if (monthlyTasks <= 80000) return 84.72;
    return 105.90; // 100k ops
  };

  const calcN8nCloud = () => {
    // n8n cloud tiers
    if (monthlyTasks <= 2500) return 22;
    if (monthlyTasks <= 5000) return 55;
    if (monthlyTasks <= 15000) return 132;
    return 264; // up to 50k
  };

  const calcN8nSelfHosted = () => {
    // Self-hosted server droplet cost
    return customHosting ? 5.00 : 0.00;
  };

  const vapiResult = calcVapi();
  const retellResult = calcRetell();
  const blandResult = calcBland();

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            AgentStack<span className="text-[#10b981] font-extrabold">.io</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#calculator" className="hover:text-white transition-colors">Cost Simulators</a>
          <a href="#comparison" className="hover:text-white transition-colors">Compare Platforms</a>
          <a href="#about" className="hover:text-white transition-colors">Infrastructure Strategy</a>
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

      {/* HERO SECTION */}
      <section className="relative px-6 py-20 md:py-28 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <span className="px-3 py-1 text-xs font-medium text-indigo-400 bg-indigo-900/40 border border-indigo-500/20 rounded-full mb-6">
          Version 1.2 — Live Cost Simulators
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight mb-6">
          The Cost Transparency Layer <br/>for AI & Voice Stacks
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
          Estimate and optimize the exact monthly running costs of conversational Voice AI models and workflow automation engines. Discover the cheapest path to scale.
        </p>
      </section>

      {/* TABS CONTROLLER */}
      <div id="calculator" className="w-full max-w-5xl mx-auto px-6 mb-12">
        <div className="flex p-1 bg-slate-900/60 border border-slate-800 rounded-xl max-w-md mx-auto mb-12">
          <button
            onClick={() => setActiveTab("voice")}
            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "voice"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🎙️ Voice AI Agents
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "workflow"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚙️ Workflow Automation
          </button>
        </div>

        {/* TAB 1: VOICE CALCULATOR */}
        {activeTab === "voice" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Configure Call Metrics</h2>
              
              {/* Call Minutes Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Monthly Call Minutes:</span>
                  <span className="text-white font-bold text-lg">{callMinutes.toLocaleString()} min</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={callMinutes}
                  onChange={(e) => setCallMinutes(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 text-right">Avg. 150 words per minute</span>
              </div>

              {/* Telephony Type Selection */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-400">Telephony Routing:</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTelephony("native")}
                    className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-all ${
                      telephony === "native"
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    Vapi/Retell Native Num
                  </button>
                  <button
                    onClick={() => setTelephony("byon")}
                    className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-all ${
                      telephony === "byon"
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    Custom Twilio (BYON)
                  </button>
                </div>
              </div>

              {/* TTS Voice Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-400">Text-to-Speech Voice:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTtsProvider("cartesia")}
                    className={`py-2 text-xs font-semibold border rounded-lg transition-all ${
                      ttsProvider === "cartesia"
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    Cartesia (Standard)
                  </button>
                  <button
                    onClick={() => setTtsProvider("elevenlabs")}
                    className={`py-2 text-xs font-semibold border rounded-lg transition-all ${
                      ttsProvider === "elevenlabs"
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    ElevenLabs
                  </button>
                  <button
                    onClick={() => setTtsProvider("deepgram")}
                    className={`py-2 text-xs font-semibold border rounded-lg transition-all ${
                      ttsProvider === "deepgram"
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    Deepgram Aura
                  </button>
                </div>
              </div>

              {/* LLM Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-400">Brain (LLM Model):</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLlmModel("gpt-4o-mini")}
                    className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-all ${
                      llmModel === "gpt-4o-mini"
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    GPT-4o-mini (Fast/Cheap)
                  </button>
                  <button
                    onClick={() => setLlmModel("claude-sonnet")}
                    className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-all ${
                      llmModel === "claude-sonnet"
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    Claude 3.5 Sonnet
                  </button>
                </div>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Card 1: Vapi */}
              <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 text-[10px] uppercase font-bold bg-indigo-600/30 text-indigo-400 border-l border-b border-indigo-500/20 rounded-bl-xl">
                  Highly Customizable
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Vapi.ai Setup</h3>
                    <p className="text-xs text-slate-400 max-w-sm">Best choice for complex backend integration and custom logic hooks.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs border-t border-slate-800/80 pt-3">
                    <span className="text-slate-500">Vapi Platform Fee:</span>
                    <span className="text-slate-300 text-right">${vapiResult.breakdown.platform.toFixed(2)}</span>
                    <span className="text-slate-500">Telephony Routing:</span>
                    <span className="text-slate-300 text-right">${vapiResult.breakdown.telephony.toFixed(2)}</span>
                    <span className="text-slate-500">Deepgram STT:</span>
                    <span className="text-slate-300 text-right">${vapiResult.breakdown.stt.toFixed(2)}</span>
                    <span className="text-slate-500">Voice Synthesis (<a href="https://try.elevenlabs.io/5cdakn4gv0w6" target="_blank" className="underline hover:text-indigo-400">TTS</a>):</span>
                    <span className="text-slate-300 text-right">${vapiResult.breakdown.tts.toFixed(2)}</span>
                    <span className="text-slate-500">LLM Inference:</span>
                    <span className="text-slate-300 text-right">${vapiResult.breakdown.llm.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                    <span className="text-3xl font-extrabold text-[#10b981]">${vapiResult.total.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">${vapiResult.ratePerMin.toFixed(3)} / min</span>
                  </div>
                  <a
                    href="https://vapi.ai"
                    target="_blank"
                    className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  >
                    Deploy to Vapi
                  </a>
                </div>
              </div>

              {/* Card 2: Retell AI */}
              <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Retell AI Setup</h3>
                    <p className="text-xs text-slate-400 max-w-sm">Excellent out-of-the-box performance with built-in agent visual editors.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs border-t border-slate-800/80 pt-3">
                    <span className="text-slate-500">Retell + STT Bundle:</span>
                    <span className="text-slate-300 text-right">${retellResult.breakdown.platform.toFixed(2)}</span>
                    <span className="text-slate-500">Telephony Routing:</span>
                    <span className="text-slate-300 text-right">${retellResult.breakdown.telephony.toFixed(2)}</span>
                    <span className="text-slate-500">Voice Synthesis (<a href="https://try.elevenlabs.io/5cdakn4gv0w6" target="_blank" className="underline hover:text-indigo-400">TTS</a>):</span>
                    <span className="text-slate-300 text-right">${retellResult.breakdown.tts.toFixed(2)}</span>
                    <span className="text-slate-500">LLM Inference:</span>
                    <span className="text-slate-300 text-right">${retellResult.breakdown.llm.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                    <span className="text-3xl font-extrabold text-[#10b981]">${retellResult.total.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">${retellResult.ratePerMin.toFixed(3)} / min</span>
                  </div>
                  <a
                    href="https://retellai.com"
                    target="_blank"
                    className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  >
                    Deploy to Retell
                  </a>
                </div>
              </div>

              {/* Card 3: Bland AI */}
              <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 text-[10px] uppercase font-bold bg-[#10b981]/20 text-[#34d399] border-l border-b border-[#10b981]/20 rounded-bl-xl">
                  Cheapest All-In
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Bland AI</h3>
                    <p className="text-xs text-slate-400 max-w-sm">All-in platform ideal for high-volume cold outreach and basic inbound queues.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs border-t border-slate-800/80 pt-3">
                    <span className="text-slate-500">Bland Base Rate:</span>
                    <span className="text-slate-300 text-right">${blandResult.breakdown.platform.toFixed(2)}</span>
                    <span className="text-slate-500"><a href="https://try.elevenlabs.io/5cdakn4gv0w6" target="_blank" className="underline hover:text-indigo-400">ElevenLabs TTS</a> (Optional):</span>
                    <span className="text-slate-300 text-right">${blandResult.breakdown.tts.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                    <span className="text-3xl font-extrabold text-[#10b981]">${blandResult.total.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">${blandResult.ratePerMin.toFixed(3)} / min</span>
                  </div>
                  <a
                    href="https://bland.ai"
                    target="_blank"
                    className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  >
                    Deploy to Bland
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WORKFLOW CALCULATOR */}
        {activeTab === "workflow" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Configure Workflows</h2>
              
              {/* Tasks Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Monthly Task Operations:</span>
                  <span className="text-white font-bold text-lg">{monthlyTasks.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={monthlyTasks}
                  onChange={(e) => setMonthlyTasks(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 text-right">Includes triggers and active routing nodes</span>
              </div>

              {/* Custom Hosting Toggle */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Self-Hosted Server</span>
                  <span className="text-xs text-slate-400">Deploy on a private droplets for flat pricing</span>
                </div>
                <button
                  onClick={() => setCustomHosting(!customHosting)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    customHosting ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      customHosting ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Card: Self-Hosted n8n + Custom Backend */}
              <div className="glass-card p-6 border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 to-slate-900/60 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 text-[10px] uppercase font-bold bg-[#10b981]/20 text-[#34d399] border-l border-b border-[#10b981]/20 rounded-bl-xl">
                  Recommended Strategy
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">n8n Self-Hosted + Custom Node.js</h3>
                    <p className="text-xs text-slate-400 max-w-sm">Host n8n on a private server droplet combined with custom server middleware scripts to handle complex API endpoints.</p>
                  </div>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 list-disc pl-4">
                    <li>Unlimited monthly runs at zero extra cost.</li>
                    <li>No task-count restrictions or data lock-in.</li>
                    <li>Self-healing webhook endpoints built with custom Node.js.</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                    <span className="text-3xl font-extrabold text-[#10b981]">${calcN8nSelfHosted().toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">Flat / Month</span>
                  </div>
                  <a
                    href="https://www.upwork.com/freelancers/~01f8ce5ce11decf069?mp_source=share"
                    target="_blank"
                    className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-md shadow-indigo-600/30"
                  >
                    Build Custom Stack
                  </a>
                </div>
              </div>

              {/* Card 2: Make.com */}
              <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Make.com</h3>
                    <p className="text-xs text-slate-400 max-w-sm">Great visual drag-and-drop builder for fast mockups and simple integrations.</p>
                  </div>
                  <div className="text-xs text-slate-300">
                    Includes operations limits. Can get expensive with heavy databases loops.
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                    <span className="text-3xl font-extrabold text-[#10b981]">${calcMake().toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">Per Month</span>
                  </div>
                  <a
                    href="https://www.make.com/?pc=agentstackio"
                    target="_blank"
                    className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  >
                    Go to Make
                  </a>
                </div>
              </div>

              {/* Card 3: n8n Cloud */}
              <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">n8n Cloud</h3>
                    <p className="text-xs text-slate-400 max-w-sm">Hosted version of n8n, saving you server setup times but capped on executions.</p>
                  </div>
                  <div className="text-xs text-slate-300">
                    A good halfway point, but still limits scaling compared to self-hosted.
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                    <span className="text-3xl font-extrabold text-[#10b981]">${calcN8nCloud().toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">Per Month</span>
                  </div>
                  <a
                    href="https://n8n.io"
                    target="_blank"
                    className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  >
                    Go to n8n Cloud
                  </a>
                </div>
              </div>

              {/* Card 4: Zapier */}
              <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Zapier</h3>
                    <p className="text-xs text-slate-400 max-w-sm">Most popular automation platform. Very user friendly, but has extremely high pricing at scale.</p>
                  </div>
                  <div className="text-xs text-slate-300">
                    Pricing climbs rapidly. Requires expensive upgrade for multi-path routers.
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                    <span className="text-3xl font-extrabold text-red-400">${calcZapier().toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">Per Month</span>
                  </div>
                  <a
                    href="https://zapier.com"
                    target="_blank"
                    className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  >
                    Go to Zapier
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STRATEGIC INFRASTRUCTURE CALLOUT */}
      <section id="about" className="w-full max-w-5xl mx-auto px-6 py-12 mb-16">
        <div className="glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-indigo-950/10 to-slate-900/80">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Architected by Specialists</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Need a Production-Grade AI Stack Installed?</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We design, build, and deploy custom automation microservices, conversational voice agents, and high-relevance RAG systems. Reduce your monthly platform subscription fees by up to 80% with self-healing, custom code adapters.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px] items-center text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-indigo-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/next.svg" alt="Lead Developer" className="w-full h-full object-cover p-2 dark:invert" />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-white block">Muhammad D.</span>
                <span className="text-xs text-indigo-400 font-semibold block">Senior AI & Backend Architect</span>
              </div>
            </div>
            <a
              href="https://www.upwork.com/freelancers/~01f8ce5ce11decf069?mp_source=share"
              target="_blank"
              className="w-full py-3 px-5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/25"
            >
              Consult an Expert
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/40 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 AgentStack.io · Transparency layer for AI infrastructure. Affiliate disclaimer: some outgoing platform links may generate referral commissions at zero cost to you.</p>
      </footer>
    </div>
  );
}
