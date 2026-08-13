import React from 'react';
import { Swords, Zap, Code2, Brain, Shield, Sparkles, Cpu, Layers } from 'lucide-react';

export default function EmptyState({ onSelectPrompt, models }) {
  const promptSuggestions = [
    {
      category: "JavaScript & Algorithms",
      icon: Code2,
      prompt: "Write a high-performance Debounce and Throttle implementation in modern JavaScript with TypeScript types.",
    },
    {
      category: "Backend & Systems",
      icon: Layers,
      prompt: "Design an Express.js JWT authentication middleware with refresh token rotation and Redis rate limiting.",
    },
    {
      category: "Logic & Problem Solving",
      icon: Brain,
      prompt: "Explain how JavaScript Event Loop handles Microtasks vs Macrotasks with a step-by-step tricky execution example.",
    },
    {
      category: "Optimization & Security",
      icon: Shield,
      prompt: "Compare SQL Injection vs NoSQL Injection and demonstrate how to prevent both in Node.js applications.",
    },
    {
      category: "Data Structures",
      icon: Cpu,
      prompt: "Write an optimized LRU Cache (Least Recently Used) in TypeScript using a Doubly Linked List and Hash Map.",
    },
    {
      category: "Quick Coding",
      icon: Zap,
      prompt: "Write an iterative and recursive Factorial function with BigInt handling for large numbers in JS.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full py-8 space-y-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Hero Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0284c7]/20 via-[#38bdf8]/20 to-[#6366f1]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Real-time LLM Benchmarking Platform</span>
        </div>

        <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white">
          Multi-Model{' '}
          <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
            AI Battle Arena
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Submit any coding problem or logic prompt. Two cutting-edge models battle head-to-head in parallel, while <strong className="text-amber-300">Gemini Flash</strong> acts as the impartial referee to score and determine the victor.
        </p>
      </div>

      {/* Matchup Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Model 1 */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-orange-500/40 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl p-2 rounded-xl bg-orange-500/20 border border-orange-500/30">
              🌪️
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-orange-400 tracking-wider">
                Fighter Alpha
              </span>
              <h3 className="font-heading font-bold text-white text-base">
                Mistral Medium
              </h3>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            High precision European reasoning model known for elegant code generation and algorithmic speed.
          </p>
        </div>

        {/* VS / Judge center */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl p-2 rounded-xl bg-amber-500/20 border border-amber-500/30">
              ⚖️
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
                Supreme Referee
              </span>
              <h3 className="font-heading font-bold text-white text-base">
                Gemini Flash
              </h3>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Impartial judge performing multi-criteria evaluations: factual correctness, architectural quality, and efficiency.
          </p>
        </div>

        {/* Model 2 */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              ⚡
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                Fighter Beta
              </span>
              <h3 className="font-heading font-bold text-white text-base">
                Cohere Command-A
              </h3>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Enterprise-grade reasoning champion built for complex problem decomposition and structural depth.
          </p>
        </div>
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#38bdf8]" />
            <span>Try a Prompt Duel in 1-Click</span>
          </span>
          <span className="text-gray-500 font-mono">Select any prompt below</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promptSuggestions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onSelectPrompt(item.prompt)}
                className="group p-4 rounded-xl bg-white/[0.02] border border-white/8 hover:bg-white/[0.06] hover:border-[#38bdf8]/40 text-left transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(56,189,248,0.15)] flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </span>
                  <span className="text-xs text-gray-500 group-hover:text-white transition-colors">
                    Start Match &rarr;
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-medium line-clamp-2 leading-relaxed">
                  "{item.prompt}"
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
