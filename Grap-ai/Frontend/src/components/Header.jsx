import React from 'react';
import { Swords, BarChart3, Download, Trash2, Cpu, CheckCircle2 } from 'lucide-react';

export default function Header({ 
  onOpenStats, 
  onExport, 
  onClear, 
  battleCount,
  models,
  isLive 
}) {
  return (
    <header className="h-16 border-b border-white/8 bg-[#090e1c]/80 backdrop-blur-xl px-6 flex items-center justify-between z-20 shrink-0">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284c7] via-[#38bdf8] to-[#818cf8] p-[1px] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.35)]">
          <div className="w-full h-full bg-[#070c18] rounded-[11px] flex items-center justify-center">
            <Swords className="w-5 h-5 text-[#38bdf8] animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-[#dce1fb] to-[#93c5fd] bg-clip-text text-transparent">
              Graph-AI Arena
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30">
              LangGraph Orchestrated
            </span>
          </div>
          <p className="text-[11px] text-[#6b7280]">
            Dual Model Execution &middot; Impartial Gemini Flash Referee
          </p>
        </div>
      </div>

      {/* Model Badges */}
      <div className="hidden md:flex items-center gap-2 bg-[#0d1527]/90 px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
        <div className="flex items-center gap-1.5 text-xs text-[#ff9e44] font-medium px-2 py-0.5 rounded-full bg-orange-500/10">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
          <span>🌪️ Mistral</span>
        </div>
        <span className="text-[11px] font-bold text-gray-500">VS</span>
        <div className="flex items-center gap-1.5 text-xs text-[#4ade80] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>⚡ Cohere</span>
        </div>
        <span className="text-[11px] text-gray-500">&rarr;</span>
        <div className="flex items-center gap-1.5 text-xs text-[#38bdf8] font-medium px-2 py-0.5 rounded-full bg-sky-500/10">
          <Cpu className="w-3 h-3 text-[#38bdf8]" />
          <span>⚖️ Gemini Judge</span>
        </div>
      </div>

      {/* Controls & Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenStats}
          title="View Arena Leaderboard & Stats"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#93c5fd] bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/20 transition-all cursor-pointer"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Leaderboard</span>
          {battleCount > 0 && (
            <span className="bg-[#38bdf8] text-[#041324] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {battleCount}
            </span>
          )}
        </button>

        <button
          onClick={onExport}
          title="Export Battle Arena Report"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-gray-400" />
          <span className="hidden sm:inline">Export</span>
        </button>

        <button
          onClick={onClear}
          title="Clear Arena Feed"
          className="p-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
