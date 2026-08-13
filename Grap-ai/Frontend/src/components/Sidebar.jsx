import React, { useState } from 'react';
import { 
  Plus, 
  History, 
  Trophy, 
  Flame, 
  Code2, 
  Layers, 
  Zap, 
  Sparkles,
  ChevronRight,
  Trash2
} from 'lucide-react';

export default function Sidebar({
  history,
  activeBattleId,
  onSelectBattle,
  onNewBattle,
  onClearHistory,
  stats,
  models
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Arenas', icon: Flame },
    { id: 'code', label: 'Code & Logic', icon: Code2 },
    { id: 'arch', label: 'Architecture', icon: Layers },
    { id: 'sprint', label: 'Rapid Sprint', icon: Zap },
  ];

  return (
    <aside className="w-80 bg-[#070c18]/95 backdrop-blur-2xl border-r border-white/8 flex flex-col h-full shrink-0 select-none z-10">
      {/* Top Action */}
      <div className="p-4 border-b border-white/5 space-y-3">
        <button
          onClick={onNewBattle}
          className="w-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#6366f1] hover:from-[#0369a1] hover:via-[#0284c7] hover:to-[#4f46e5] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(56,189,248,0.35)] hover:shadow-[0_6px_30px_rgba(56,189,248,0.5)] hover:scale-[1.01] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Arena Match</span>
        </button>

        {/* Quick Filter Categories */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-white/10 text-white border border-white/15'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#38bdf8]' : 'text-gray-500'}`} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* History Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        <div className="flex items-center justify-between px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
          <div className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-gray-400" />
            <span>Match History</span>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              title="Clear all saved history"
              className="text-[11px] text-gray-500 hover:text-red-400 transition-all cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-xs space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center text-gray-600">
              ⚔️
            </div>
            <p>No matches fought yet.</p>
            <p className="text-[11px] text-gray-600">Send a prompt to start the benchmark duel!</p>
          </div>
        ) : (
          history.map((battle) => {
            const isCurrent = battle.id === activeBattleId;
            const winner = battle.judge?.winner;
            const winnerBadge = 
              winner === 'solution_1' ? { label: 'Mistral Won', color: 'text-orange-400 bg-orange-500/10' } :
              winner === 'solution_2' ? { label: 'Cohere Won', color: 'text-emerald-400 bg-emerald-500/10' } :
              { label: 'Tie', color: 'text-sky-400 bg-sky-500/10' };

            return (
              <div
                key={battle.id}
                onClick={() => onSelectBattle(battle)}
                className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                  isCurrent
                    ? 'bg-[#121c33] border-[#38bdf8]/50 shadow-[0_0_15px_rgba(56,189,248,0.15)] text-white'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10 text-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-xs font-semibold line-clamp-1 group-hover:text-[#38bdf8] transition-colors">
                    {battle.problem || 'Untitled Battle'}
                  </h4>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isCurrent ? 'text-[#38bdf8] translate-x-0.5' : 'text-gray-600 group-hover:text-gray-400'}`} />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className={`px-2 py-0.5 rounded font-medium ${winnerBadge.color}`}>
                    {winnerBadge.label}
                  </span>
                  <span className="text-gray-500 font-mono text-[10px]">
                    {battle.judge?.solution_1_score?.toFixed(1) || '0'} - {battle.judge?.solution_2_score?.toFixed(1) || '0'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Arena Standings Mini Box */}
      <div className="p-3 border-t border-white/5 bg-[#060a14]/60">
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Leaderboard</span>
            </span>
            <span className="text-gray-500 font-mono">{stats.total} Duels</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-orange-500/10 p-1.5 rounded-lg border border-orange-500/20">
              <div className="text-[10px] text-orange-400 font-semibold truncate">Mistral</div>
              <div className="text-sm font-extrabold text-white">{stats.mistralWins}</div>
            </div>
            <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
              <div className="text-[10px] text-emerald-400 font-semibold truncate">Cohere</div>
              <div className="text-sm font-extrabold text-white">{stats.cohereWins}</div>
            </div>
            <div className="bg-sky-500/10 p-1.5 rounded-lg border border-sky-500/20">
              <div className="text-[10px] text-sky-400 font-semibold truncate">Ties</div>
              <div className="text-sm font-extrabold text-white">{stats.ties}</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Footer */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          <span className="font-mono text-gray-400">LangGraph v1.2</span>
        </div>
        <span className="font-mono text-gray-600">3 Models Active</span>
      </div>
    </aside>
  );
}
