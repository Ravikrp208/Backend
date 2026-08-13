import React, { useEffect, useState } from 'react';
import { Cpu, Zap, Scale, Sparkles, Loader2 } from 'lucide-react';

export default function ThinkingStage({ problem }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Dispatching Parallel Agents", desc: "Invoking Mistral Medium & Cohere Command-A simultaneously via LangGraph", icon: Zap },
    { title: "Generating Comparative Solutions", desc: "Receiving raw model output streams and analyzing response structures", icon: Cpu },
    { title: "Gemini Flash Referee Court", desc: "Evaluating correctness, complexity, best practices, and calculating precise scores", icon: Scale },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1800);
    const timer2 = setTimeout(() => setCurrentStep(2), 4200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Live Pipeline Stepper */}
      <div className="p-5 rounded-2xl bg-[#0e162b]/80 border border-[#38bdf8]/30 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8]">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <span>Arena Evaluation Pipeline in Progress</span>
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping"></span>
            </h3>
            <p className="text-xs text-gray-400">
              Orchestrating multi-model LangGraph workflow...
            </p>
          </div>
        </div>

        {/* Stepper items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx;

            return (
              <div 
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  isCurrent 
                    ? 'bg-[#38bdf8]/10 border-[#38bdf8]/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-white/[0.02] border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#38bdf8] animate-bounce' : isDone ? 'text-emerald-400' : 'text-gray-500'}`} />
                  <span className="text-xs font-bold truncate">
                    {step.title}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pulsing Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Model 1 Skeleton */}
        <div className="p-6 rounded-2xl bg-[#0f172a]/60 border border-orange-500/20 backdrop-blur-xl space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center text-lg">🌪️</div>
              <div>
                <div className="h-4 w-28 bg-orange-500/30 rounded"></div>
                <div className="h-3 w-20 bg-white/10 rounded mt-1.5"></div>
              </div>
            </div>
            <div className="h-6 w-16 bg-white/10 rounded-lg"></div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3.5 bg-white/10 rounded w-full"></div>
            <div className="h-3.5 bg-white/10 rounded w-5/6"></div>
            <div className="h-20 bg-black/40 rounded-xl border border-white/5"></div>
            <div className="h-3.5 bg-white/10 rounded w-4/6"></div>
          </div>
        </div>

        {/* Model 2 Skeleton */}
        <div className="p-6 rounded-2xl bg-[#0f172a]/60 border border-emerald-500/20 backdrop-blur-xl space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-lg">⚡</div>
              <div>
                <div className="h-4 w-32 bg-emerald-500/30 rounded"></div>
                <div className="h-3 w-20 bg-white/10 rounded mt-1.5"></div>
              </div>
            </div>
            <div className="h-6 w-16 bg-white/10 rounded-lg"></div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3.5 bg-white/10 rounded w-full"></div>
            <div className="h-3.5 bg-white/10 rounded w-3/4"></div>
            <div className="h-20 bg-black/40 rounded-xl border border-white/5"></div>
            <div className="h-3.5 bg-white/10 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
