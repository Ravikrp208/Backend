import React, { useState } from 'react';
import { Scale, Trophy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Lightbulb, Clock } from 'lucide-react';

export default function JudgeCard({ 
  judge, 
  model1, 
  model2, 
  timeMs 
}) {
  const [expanded, setExpanded] = useState(true);

  if (!judge) return null;

  const score1 = judge.solution_1_score || 0;
  const score2 = judge.solution_2_score || 0;

  const getWinnerTitle = () => {
    if (judge.winner === 'solution_1') {
      return {
        title: `${model1?.name || 'Model 1'} Declared Winner`,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/30',
        avatar: model1?.avatar || '🌪️',
      };
    } else if (judge.winner === 'solution_2') {
      return {
        title: `${model2?.name || 'Model 2'} Declared Winner`,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        avatar: model2?.avatar || '⚡',
      };
    }
    return {
      title: "Dead Heat - Evenly Matched Tie",
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/30',
      avatar: '🤝',
    };
  };

  const winnerInfo = getWinnerTitle();

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#1b1509]/90 via-[#0e121e]/90 to-[#0a0f1d]/90 backdrop-blur-xl shadow-[0_10px_35px_rgba(245,158,11,0.12)] overflow-hidden transition-all duration-300">
      {/* Top Ref Header */}
      <div className="px-6 py-4 border-b border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-base text-amber-200">
                Gemini Flash &middot; Impartial AI Referee
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Benchmark Court
              </span>
            </div>
            <p className="text-xs text-amber-400/70">
              Evaluated for factual correctness, completeness, syntax, and architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {timeMs > 0 && (
            <div className="flex items-center gap-1 text-xs text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              <Clock className="w-3 h-3" />
              <span>{(timeMs / 1000).toFixed(2)}s</span>
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6">
        {/* Winner Banner */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${winnerInfo.bg}`}>
          <div className="flex items-center gap-3">
            <div className="text-2xl p-2 rounded-xl bg-black/30 border border-white/10">
              <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Official Verdict Decision
              </span>
              <h4 className={`text-lg font-black font-heading ${winnerInfo.color}`}>
                {winnerInfo.avatar} {winnerInfo.title}
              </h4>
            </div>
          </div>

          {/* Quick Score Ratio */}
          <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-xl border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-orange-400 block">
                {model1?.name?.split(' ')[0] || 'Mistral'}
              </span>
              <span className="text-base font-extrabold text-white">{score1.toFixed(1)}</span>
            </div>
            <span className="text-gray-500 font-bold text-sm">:</span>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                {model2?.name?.split(' ')[0] || 'Cohere'}
              </span>
              <span className="text-base font-extrabold text-white">{score2.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Score Visualizer Bars */}
        <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-300 mb-1">
            <span>Score Distribution Comparison</span>
            <span className="text-gray-500 font-mono text-[11px]">Scale: 0.0 - 10.0</span>
          </div>

          {/* Model 1 bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-orange-400 font-medium flex items-center gap-1.5">
                <span>🌪️</span> {model1?.name || 'Model 1'}
              </span>
              <span className="font-bold text-orange-300 font-mono">{score1.toFixed(1)} / 10</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden p-[1px] border border-white/5">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                style={{ width: `${Math.min(100, (score1 / 10) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Model 2 bar */}
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-xs">
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span>⚡</span> {model2?.name || 'Model 2'}
              </span>
              <span className="font-bold text-emerald-300 font-mono">{score2.toFixed(1)} / 10</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden p-[1px] border border-white/5">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ width: `${Math.min(100, (score2 / 10) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {expanded && (
          <>
            {/* Executive Verdict Summary */}
            {judge.verdict_summary && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/8">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Executive Benchmarking Synthesis</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-200">
                  {judge.verdict_summary}
                </p>
              </div>
            )}

            {/* Side-by-Side Model Critiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Model 1 Critique */}
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                    🌪️ {model1?.name || 'Mistral'} Critique
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
                    {score1.toFixed(1)}/10
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-gray-300">
                  {judge.solution_1_reasoning || 'Evaluated for syntax, modularity, and efficiency.'}
                </p>
              </div>

              {/* Model 2 Critique */}
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    ⚡ {model2?.name || 'Cohere'} Critique
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {score2.toFixed(1)}/10
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-gray-300">
                  {judge.solution_2_reasoning || 'Evaluated for depth, schema compliance, and robustness.'}
                </p>
              </div>
            </div>

            {/* Key Takeaways */}
            {judge.key_takeaways && judge.key_takeaways.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span>Key Analytical Takeaways</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {judge.key_takeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
