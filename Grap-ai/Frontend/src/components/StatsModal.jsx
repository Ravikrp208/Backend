import React from 'react';
import { X, Trophy, Zap, Clock, Star, Flame, BarChart2 } from 'lucide-react';

export default function StatsModal({ isOpen, onClose, stats, history }) {
  if (!isOpen) return null;

  const total = stats.total || 0;
  const mistralWinRate = total > 0 ? ((stats.mistralWins / total) * 100).toFixed(1) : '0.0';
  const cohereWinRate = total > 0 ? ((stats.cohereWins / total) * 100).toFixed(1) : '0.0';
  const tieRate = total > 0 ? ((stats.ties / total) * 100).toFixed(1) : '0.0';

  // Compute average scores
  let totalScore1 = 0;
  let totalScore2 = 0;
  let scoreCount = 0;

  history.forEach(h => {
    if (h.judge?.solution_1_score && h.judge?.solution_2_score) {
      totalScore1 += h.judge.solution_1_score;
      totalScore2 += h.judge.solution_2_score;
      scoreCount++;
    }
  });

  const avgScore1 = scoreCount > 0 ? (totalScore1 / scoreCount).toFixed(2) : '0.00';
  const avgScore2 = scoreCount > 0 ? (totalScore2 / scoreCount).toFixed(2) : '0.00';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#090e1c] border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Arena Analytics & Leaderboard
              </h3>
              <p className="text-xs text-gray-400">
                Lifetime win rates, benchmark scores, and battle statistics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Top Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center space-y-1">
              <span className="text-2xl">🌪️</span>
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                Mistral Medium
              </div>
              <div className="text-2xl font-black font-heading text-white">
                {stats.mistralWins} <span className="text-xs font-normal text-gray-400">wins ({mistralWinRate}%)</span>
              </div>
              <div className="text-[11px] text-gray-400 font-mono">Avg Score: {avgScore1}/10</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
              <span className="text-2xl">⚡</span>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Cohere Command-A
              </div>
              <div className="text-2xl font-black font-heading text-white">
                {stats.cohereWins} <span className="text-xs font-normal text-gray-400">wins ({cohereWinRate}%)</span>
              </div>
              <div className="text-[11px] text-gray-400 font-mono">Avg Score: {avgScore2}/10</div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-center space-y-1">
              <span className="text-2xl">🤝</span>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Even Ties
              </div>
              <div className="text-2xl font-black font-heading text-white">
                {stats.ties} <span className="text-xs font-normal text-gray-400">({tieRate}%)</span>
              </div>
              <div className="text-[11px] text-gray-400 font-mono">Total Duels: {total}</div>
            </div>
          </div>

          {/* Win Rate Visual Distribution */}
          <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between text-xs font-bold text-gray-300">
              <span>Arena Dominance Ratio</span>
              <span className="text-gray-400 font-mono">{total} Matches Total</span>
            </div>

            {total > 0 ? (
              <div className="w-full h-4 rounded-full overflow-hidden flex bg-white/5 p-[1px]">
                <div 
                  className="bg-orange-500 transition-all duration-700" 
                  style={{ width: `${mistralWinRate}%` }} 
                  title={`Mistral: ${mistralWinRate}%`}
                />
                <div 
                  className="bg-sky-500 transition-all duration-700" 
                  style={{ width: `${tieRate}%` }} 
                  title={`Ties: ${tieRate}%`}
                />
                <div 
                  className="bg-emerald-500 transition-all duration-700" 
                  style={{ width: `${cohereWinRate}%` }} 
                  title={`Cohere: ${cohereWinRate}%`}
                />
              </div>
            ) : (
              <div className="w-full h-3 rounded-full bg-white/10"></div>
            )}

            <div className="flex justify-between text-[11px] text-gray-400 pt-1">
              <span className="text-orange-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Mistral ({mistralWinRate}%)
              </span>
              <span className="text-sky-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span> Ties ({tieRate}%)
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Cohere ({cohereWinRate}%)
              </span>
            </div>
          </div>

          {/* Impartial Referee Info */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <div className="text-2xl p-2 rounded-xl bg-amber-500/20">⚖️</div>
            <div>
              <h4 className="text-sm font-bold text-amber-300">
                Impartial Referee: Google Gemini Flash
              </h4>
              <p className="text-xs text-amber-200/70 leading-relaxed mt-0.5">
                Every battle is graded through a multi-dimensional rubric covering functional accuracy, readability, security, and edge-case handling to guarantee unbiased evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/8 bg-black/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
