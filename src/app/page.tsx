"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"voice" | "llm" | "tts" | "stt" | "video" | "workflow" | "latency">("voice");

  // Voice AI State
  const [callMinutes, setCallMinutes] = useState<number>(5000);
  const [telephony, setTelephony] = useState<"native" | "byon">("native");
  const [ttsProvider, setTtsProvider] = useState<"elevenlabs" | "cartesia" | "deepgram">("cartesia");
  const [llmModel, setLlmModel] = useState<"gpt-4o-mini" | "claude-sonnet">("gpt-4o-mini");

  // LLM Calculator State
  const [inputTokens, setInputTokens] = useState<number>(500000);
  const [outputTokens, setOutputTokens] = useState<number>(200000);

  // TTS Calculator State
  const [ttsChars, setTtsChars] = useState<number>(1000000);

  // STT Calculator State
  const [sttHours, setSttHours] = useState<number>(200);

  // Video Generator State
  const [videoMinutes, setVideoMinutes] = useState<number>(100);

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
        <div className="flex flex-wrap p-1 bg-slate-900/60 border border-slate-800 rounded-xl max-w-4xl mx-auto mb-12 gap-1 md:gap-0">
          <button
            onClick={() => setActiveTab("voice")}
            className={`flex-1 min-w-[120px] py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "voice"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🎙️ Voice AI
          </button>
          <button
            onClick={() => setActiveTab("llm")}
            className={`flex-1 min-w-[120px] py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "llm"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🧠 LLM Cost
          </button>
          <button
            onClick={() => setActiveTab("tts")}
            className={`flex-1 min-w-[120px] py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "tts"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🗣️ TTS Voice
          </button>
          <button
            onClick={() => setActiveTab("stt")}
            className={`flex-1 min-w-[120px] py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "stt"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📝 STT Transcribe
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`flex-1 min-w-[120px] py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "video"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🎬 Video Gen
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`flex-1 min-w-[120px] py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "workflow"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚙️ Workflows
          </button>
          <button
            onClick={() => setActiveTab("latency")}
            className={`flex-1 min-w-[120px] py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "latency"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ⚡ Latency
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

        {/* TAB: LLM CALCULATOR */}
        {activeTab === "llm" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Configure Token Volumes</h2>
              
              {/* Input Tokens Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Monthly Input Tokens:</span>
                  <span className="text-white font-bold text-lg">{(inputTokens / 1000).toLocaleString()}k</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={inputTokens}
                  onChange={(e) => setInputTokens(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 text-right font-light">Prompts, instructions, semantic context</span>
              </div>

              {/* Output Tokens Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Monthly Output Tokens:</span>
                  <span className="text-white font-bold text-lg">{(outputTokens / 1000).toLocaleString()}k</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="5000000"
                  step="5000"
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 text-right font-light">Tokens generated by AI response</span>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { name: "GPT-4o-mini", provider: "OpenAI", inRate: 0.15, outRate: 0.60, url: "https://platform.openai.com", note: "Best speed and price ratio for simple logic and structured outputs." },
                { name: "DeepSeek-V3", provider: "DeepSeek", inRate: 0.14, outRate: 0.28, url: "https://platform.deepseek.com", note: "Incredibly cheap, high-intelligence open-weights model matching GPT-4o capabilities at a fraction of the cost." },
                { name: "Claude 3.5 Sonnet", provider: "Anthropic", inRate: 3.00, outRate: 15.00, url: "https://console.anthropic.com", note: "Industry standard for complex logic, multi-step code generation, and complex tasks." },
                { name: "GPT-4o", provider: "OpenAI", inRate: 5.00, outRate: 15.00, url: "https://platform.openai.com", note: "High general intelligence, excellent tool execution and multilingual translation." },
                { name: "Claude 3.5 Haiku", provider: "Anthropic", inRate: 0.80, outRate: 4.00, url: "https://console.anthropic.com", note: "Blazing fast response speeds, excellent for low-latency voice bot integrations." },
                { name: "Gemini 1.5 Flash", provider: "Google", inRate: 0.075, outRate: 0.30, url: "https://aistudio.google.com", note: "Cheapest model, massive context window (2M tokens) for document-heavy parsing." },
                { name: "Gemini 1.5 Pro", provider: "Google", inRate: 1.25, outRate: 5.00, url: "https://aistudio.google.com", note: "High intelligence and massive context. Perfect for complex document RAG audits." }
              ].map((model) => {
                const totalCost = (inputTokens * model.inRate) / 1000000 + (outputTokens * model.outRate) / 1000000;
                return (
                  <div key={model.name} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">By {model.provider}</span>
                        <p className="text-xs text-slate-400 max-w-sm">{model.note}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-xs border-t border-slate-800/80 pt-3 text-slate-500">
                        <span>Input (${model.inRate.toFixed(3)}/1M):</span>
                        <span className="text-slate-300 text-right">${((inputTokens * model.inRate) / 1000000).toFixed(2)}</span>
                        <span>Output (${model.outRate.toFixed(3)}/1M):</span>
                        <span className="text-slate-300 text-right">${((outputTokens * model.outRate) / 1000000).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                        <span className="text-3xl font-extrabold text-[#10b981]">${totalCost.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block">For {((inputTokens + outputTokens) / 1000).toLocaleString()}k tokens</span>
                      </div>
                      <a
                        href={model.url}
                        target="_blank"
                        className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                      >
                        API Dashboard
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: TTS CALCULATOR */}
        {activeTab === "tts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Configure Audio Volumes</h2>
              
              {/* TTS Characters Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Monthly Characters:</span>
                  <span className="text-white font-bold text-lg">{ttsChars.toLocaleString()} chars</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="20000000"
                  step="50000"
                  value={ttsChars}
                  onChange={(e) => setTtsChars(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 text-right font-light">Approx. {Math.round(ttsChars / 750).toLocaleString()} voice output minutes</span>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { name: "SpeakSay.com Pro", provider: "SpeakSay", ratePer1k: 0.017, url: "https://speaksay.com", note: "Outstanding pricing and high-fidelity multilingual voice clones. Best for budget scaling." },
                { name: "Cartesia Sonic", provider: "Cartesia", ratePer1k: 0.002, url: "https://cartesia.ai", note: "Lightning-fast audio generation (sub-100ms first byte). The industry standard for real-time bots." },
                { name: "Deepgram Aura", provider: "Deepgram", ratePer1k: 0.015, url: "https://deepgram.com", note: "Low-latency synthesized voices fully optimized for conversational dialog agents." },
                { name: "ElevenLabs API", provider: "ElevenLabs", ratePer1k: 0.15, url: "https://try.elevenlabs.io/5cdakn4gv0w6", note: "Unmatched emotional depth and realistic vocal inflections. Premium quality but high API costs." },
                { name: "Play.ht API", provider: "Play.ht", ratePer1k: 0.050, url: "https://play.ht", note: "Massive library of cloned and conversational voices for general speech tasks." }
              ].map((model) => {
                const totalCost = (ttsChars * model.ratePer1k) / 1000;
                return (
                  <div key={model.name} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">By {model.provider}</span>
                        <p className="text-xs text-slate-400 max-w-sm">{model.note}</p>
                      </div>
                      <div className="text-xs border-t border-slate-800/80 pt-3 text-slate-500 flex justify-between">
                        <span>API Rate:</span>
                        <span className="text-slate-300">${model.ratePer1k.toFixed(3)} / 1,000 chars</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                        <span className="text-3xl font-extrabold text-[#10b981]">${totalCost.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block">For {(ttsChars / 1000).toLocaleString()}k chars</span>
                      </div>
                      <a
                        href={model.url}
                        target="_blank"
                        className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                      >
                        API Dashboard
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: STT CALCULATOR */}
        {activeTab === "stt" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Configure Audio Hours</h2>
              
              {/* STT Hours Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Monthly Audio:</span>
                  <span className="text-white font-bold text-lg">{sttHours.toLocaleString()} Hours</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={sttHours}
                  onChange={(e) => setSttHours(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 text-right font-light">Approx. {(sttHours * 60).toLocaleString()} total audio minutes</span>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { name: "Deepgram Nova-2", provider: "Deepgram", ratePerHr: 0.0043 * 60, url: "https://deepgram.com", note: "Unmatched speed and lowest word error rate (WER) for live streaming transcriptions." },
                { name: "AssemblyAI Best", provider: "AssemblyAI", ratePerHr: 0.37, url: "https://assemblyai.com", note: "Highly accurate and robust for async audio files, includes automatic speaker diarization." },
                { name: "OpenAI Whisper API", provider: "OpenAI", ratePerHr: 0.006 * 60, url: "https://platform.openai.com", note: "Excellent translation and accents decoding. Capped by higher file-upload wait limits." },
                { name: "Gladia API", provider: "Gladia", ratePerHr: 0.57, url: "https://gladia.io", note: "Advanced enterprise routing, real-time code-switching, and multilingual compliance logs." }
              ].map((model) => {
                const totalCost = sttHours * model.ratePerHr;
                return (
                  <div key={model.name} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">By {model.provider}</span>
                        <p className="text-xs text-slate-400 max-w-sm">{model.note}</p>
                      </div>
                      <div className="text-xs border-t border-slate-800/80 pt-3 text-slate-500 flex justify-between">
                        <span>API Rate:</span>
                        <span className="text-slate-300">${model.ratePerHr.toFixed(3)} / Hour</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                        <span className="text-3xl font-extrabold text-[#10b981]">${totalCost.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block">For {sttHours.toLocaleString()} hours</span>
                      </div>
                      <a
                        href={model.url}
                        target="_blank"
                        className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                      >
                        API Dashboard
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: VIDEO GENERATOR */}
        {activeTab === "video" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Configure Video Volumes</h2>
              
              {/* Video Minutes Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-400">Monthly Video output:</span>
                  <span className="text-white font-bold text-lg">{videoMinutes.toLocaleString()} Minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={videoMinutes}
                  onChange={(e) => setVideoMinutes(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 text-right font-light">Approx. {Math.round(videoMinutes * 12).toLocaleString()} generated 5-sec video clips</span>
              </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                { name: "Runway Gen-3 Alpha API", provider: "RunwayML", ratePerMin: 15.00, url: "https://runwayml.com", note: "Photorealistic rendering and complex physics simulation. Standard choice for high-end cinematic ads." },
                { name: "Sora API (Estimated)", provider: "OpenAI", ratePerMin: 10.00, url: "https://platform.openai.com", note: "Elite prompt-adherence, spatial consistency, and multi-camera angle simulation." },
                { name: "Luma Dream Machine", provider: "Luma Labs", ratePerMin: 1.80, url: "https://lumalabs.ai", note: "Excellent speed and highly fluid camera movement pans. Very cost-efficient." },
                { name: "MiniMax Video (Hailuo)", provider: "MiniMax", ratePerMin: 1.50, url: "https://hailuoai.com", note: "Exceptional representation of human movement and facial features at a low price point." },
                { name: "Kling AI Pro API", provider: "Kuaishou", ratePerMin: 1.20, url: "https://klingai.com", note: "Outstanding pricing structure, supports custom camera motion variables." }
              ].map((model) => {
                const totalCost = videoMinutes * model.ratePerMin;
                return (
                  <div key={model.name} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">By {model.provider}</span>
                        <p className="text-xs text-slate-400 max-w-sm">{model.note}</p>
                      </div>
                      <div className="text-xs border-t border-slate-800/80 pt-3 text-slate-500 flex justify-between">
                        <span>API Rate:</span>
                        <span className="text-slate-300">${model.ratePerMin.toFixed(2)} / Minute</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Estimated Cost</span>
                        <span className="text-3xl font-extrabold text-[#10b981]">${totalCost.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block">For {videoMinutes.toLocaleString()} mins</span>
                      </div>
                      <a
                        href={model.url}
                        target="_blank"
                        className="w-full mt-4 py-2 text-center text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                      >
                        API Dashboard
                      </a>
                    </div>
                  </div>
                );
              })}
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

        {/* TAB: LATENCY LEADERBOARD */}
        {activeTab === "latency" && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Live Conversational Latency Benchmarks</h2>
              <p className="text-xs text-slate-400">
                Turn-taking response delay (in milliseconds) across popular speech-to-text, LLM, and synthesis pipelines. Human conversational response delay is around **300ms - 400ms**.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  title: "OpenAI Realtime API (Direct WebSockets)",
                  desc: "Direct web socket stream of speech tokens. Ultra fast but extremely high operational tokens cost.",
                  stt: 90, llm: 140, tts: 80, overhead: 40,
                  total: 350,
                  status: "Near-Human Speed",
                  color: "bg-[#10b981]"
                },
                {
                  title: "Vapi.ai (Deepgram Nova-2 + GPT-4o-mini + Cartesia)",
                  desc: "Most optimized production pipeline. Incredible response times with high cost savings.",
                  stt: 120, llm: 180, tts: 90, overhead: 120,
                  total: 510,
                  status: "Highly Responsive",
                  color: "bg-[#10b981]"
                },
                {
                  title: "Retell AI (Deepgram Nova-2 + Claude 3.5 Sonnet + ElevenLabs)",
                  desc: "Premium natural voice quality with advanced reasoning, yielding a minor latency trade-off.",
                  stt: 120, llm: 350, tts: 210, overhead: 120,
                  total: 800,
                  status: "Acceptable Pause",
                  color: "bg-indigo-500"
                },
                {
                  title: "Bland AI (Standard Telephony)",
                  desc: "Flat-rate outbound calling pipeline. Capped context latency, best suited for voicemail automation.",
                  stt: 200, llm: 500, tts: 250, overhead: 150,
                  total: 1100,
                  status: "Noticeable Delay",
                  color: "bg-red-500"
                }
              ].map((stack) => {
                const percent = Math.min((stack.total / 1200) * 100, 100);
                return (
                  <div key={stack.title} className="flex flex-col gap-2 border-b border-slate-800/40 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-white">{stack.title}</h3>
                        <p className="text-[11px] text-slate-400 max-w-xl">{stack.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-white block">{stack.total}ms</span>
                        <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">{stack.status}</span>
                      </div>
                    </div>

                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden flex relative mt-1">
                      <div 
                        style={{ width: `${percent}%` }}
                        className={`h-full ${stack.color} rounded-full transition-all duration-500`}
                      />
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 font-medium mt-1">
                      <span>STT Ingestion: <strong className="text-slate-400">{stack.stt}ms</strong></span>
                      <span>LLM Inference: <strong className="text-slate-400">{stack.llm}ms</strong></span>
                      <span>TTS Voice Synthesis: <strong className="text-slate-400">{stack.tts}ms</strong></span>
                      <span>Transport & BYON Overhead: <strong className="text-slate-400">{stack.overhead}ms</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* COMPARISON TABLES */}
      <section id="comparison" className="w-full max-w-5xl mx-auto px-6 py-12 mb-12 border-t border-slate-900">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Deep Technical Comparison</h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12 text-sm">
          Beyond monthly pricing, choose your software stack based on latency benchmarks, data privacy requirements, and customization support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Table 1: Voice AI */}
          <div className="glass-panel p-6 rounded-2xl overflow-hidden">
            <h3 className="text-lg font-bold text-indigo-400 mb-6 flex items-center gap-2">🎙️ Voice AI Platforms</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-3 font-semibold">Capability</th>
                    <th className="pb-3 font-semibold text-right">Vapi.ai</th>
                    <th className="pb-3 font-semibold text-right">Retell AI</th>
                    <th className="pb-3 font-semibold text-right">Bland AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Avg. Latency</td>
                    <td className="py-3 text-right text-white">600ms - 800ms</td>
                    <td className="py-3 text-right text-white font-bold text-indigo-400">500ms - 700ms</td>
                    <td className="py-3 text-right text-slate-400">1.0s - 1.5s</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">HIPAA Compliance</td>
                    <td className="py-3 text-right text-[#10b981]">Yes (BAA Req.)</td>
                    <td className="py-3 text-right text-[#10b981]">Yes (BAA Req.)</td>
                    <td className="py-3 text-right text-[#10b981]">Yes (Enterprise)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Custom LLM Keys</td>
                    <td className="py-3 text-right text-[#10b981]">Full Support</td>
                    <td className="py-3 text-right text-[#10b981]">Full Support</td>
                    <td className="py-3 text-right text-slate-400">Limited API</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Voice Synthesis</td>
                    <td className="py-3 text-right text-slate-300">12+ Providers</td>
                    <td className="py-3 text-right text-slate-300">8+ Providers</td>
                    <td className="py-3 text-right text-slate-400">Built-in + ElevenLabs</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Visual Canvas Editor</td>
                    <td className="py-3 text-right text-white">Yes</td>
                    <td className="py-3 text-right text-white font-bold text-indigo-400">Advanced Node-Editor</td>
                    <td className="py-3 text-right text-white">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Telephony BYON</td>
                    <td className="py-3 text-right text-slate-300">Twilio / Vonage</td>
                    <td className="py-3 text-right text-slate-300">Twilio / Vonage</td>
                    <td className="py-3 text-right text-slate-400">Bland Native only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Workflow Automation */}
          <div className="glass-panel p-6 rounded-2xl overflow-hidden">
            <h3 className="text-lg font-bold text-indigo-400 mb-6 flex items-center gap-2">⚙️ Automation Engines</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-3 font-semibold text-left">Feature</th>
                    <th className="pb-3 font-semibold text-left">Zapier</th>
                    <th className="pb-3 font-semibold text-left">Make.com</th>
                    <th className="pb-3 font-semibold text-right">Self-Hosted n8n</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Runs Limit</td>
                    <td className="py-3 text-slate-400">Strict Cap</td>
                    <td className="py-3 text-slate-400">Strict Cap</td>
                    <td className="py-3 text-right text-[#10b981] font-bold">Unlimited (Free)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Cost at 50k runs</td>
                    <td className="py-3 text-red-400">$674/mo</td>
                    <td className="py-3 text-slate-300">$84.72/mo</td>
                    <td className="py-3 text-right text-[#10b981] font-bold">$5.00/mo (VPS droplet)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Custom Code Block</td>
                    <td className="py-3 text-slate-400">Basic JS/Python</td>
                    <td className="py-3 text-slate-400">Needs External Server</td>
                    <td className="py-3 text-right text-[#10b981]">Full npm packages (Unlimited)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">GDPR & Privacy</td>
                    <td className="py-3 text-slate-400">Cloud Hosting Only</td>
                    <td className="py-3 text-slate-400">Cloud Hosting Only</td>
                    <td className="py-3 text-right text-[#10b981] font-bold">100% Secure Local Hosting</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-slate-300">Complex Looping</td>
                    <td className="py-3 text-slate-400">Fragile / Sub-zaps</td>
                    <td className="py-3 text-slate-300">Iterators / Aggregators</td>
                    <td className="py-3 text-right text-white">Infinite loops allowed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

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
