"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Search, Filter, Star, TrendingDown } from "lucide-react";
import Link from "next/link";

const MOCK_LEADERBOARD = [
  { name: "Alex Rivet", score: -12400, price: 37600, rank: 1, date: "2026-03-27" },
  { name: "Elena Volkov", score: -11800, price: 38200, rank: 2, date: "2026-03-26" },
  { name: "Marcus Thorne", score: -10500, price: 39500, rank: 3, date: "2026-03-27" },
  { name: "Satoshi N.", score: -9200, price: 40800, rank: 4, date: "2026-03-25" },
  { name: "Julia Grant", score: -8500, price: 41500, rank: 5, date: "2026-03-24" },
  { name: "Julian Voss", score: -7000, price: 43000, rank: 6, date: "2026-03-27" },
  { name: "Sarah Chen", score: -6200, price: 43800, rank: 7, date: "2026-03-26" },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-onyx font-sans text-foreground">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-gold-dark/10">
        <Link href="/" className="text-2xl font-serif font-bold text-gold-metallic tracking-widest">
          HIDDEN HAND
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/negotiate" className="px-6 py-2 bg-gold-metallic text-onyx text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all">Play Now</Link>
          <div className="w-10 h-10 rounded-full bg-gold-dark/20 flex items-center justify-center border border-gold-dark/30">
            <Star size={18} className="text-primary" />
          </div>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <div className="flex items-center gap-3 text-primary mb-2">
              <Trophy size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">The Elite List</span>
            </div>
            <h1 className="text-5xl font-serif">Global <span className="text-gold-metallic">Holdings</span></h1>
            <p className="text-gold-soft opacity-60 mt-4 max-w-md">
              The lower you negotiate, the higher you rise. Only the most persuasive enter this sanctum.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-soft/40 group-focus-within:text-primary transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Seach Negotiator..." 
                  className="bg-onyx-gradient border border-gold-dark/20 rounded-sm py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
             </div>
             <button className="p-2 border border-gold-dark/20 rounded-sm hover:bg-gold-dark/10 transition-all text-gold-soft">
               <Filter size={18} />
             </button>
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <div className="glass rounded-xl overflow-hidden border border-gold-dark/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gold-dark/5 border-b border-gold-dark/10">
              <tr>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gold-soft font-bold">Rank</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gold-soft font-bold">Negotiator</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gold-soft font-bold text-right">Negotiated Off</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-gold-soft font-bold text-right">Deal Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-dark/5">
              {MOCK_LEADERBOARD.map((entry, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-primary/5 transition-colors group cursor-default"
                >
                  <td className="px-8 py-6 font-serif text-xl">
                    <span className={idx < 3 ? "text-gold-metallic font-bold" : "text-white/40"}>
                      #{entry.rank.toString().padStart(2, '0')}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-onyx border border-gold-dark/20 flex items-center justify-center text-[10px] text-primary">
                         {entry.name[0]}
                       </div>
                       <div>
                         <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{entry.name}</div>
                         <div className="text-[10px] text-gold-soft opacity-40 uppercase tracking-tighter">{entry.date}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right font-medium text-primary/80">
                    {entry.score.toLocaleString()}
                  </td>
                  <td className="px-8 py-6 text-right font-serif text-lg text-white">
                    ${entry.price.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-8 bg-onyx-gradient text-center border-t border-gold-dark/5">
            <button className="text-[10px] uppercase tracking-widest font-bold text-gold-soft hover:text-primary transition-all">Load More Legends</button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-5xl mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-lg border-gold-dark/10 group">
          <div className="text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity"><Search size={24} /></div>
          <div className="text-3xl font-serif text-white">2.4k</div>
          <div className="text-xs uppercase tracking-widest text-gold-soft mt-1">Total Attempts</div>
        </div>
        <div className="glass p-8 rounded-lg border-gold-dark/10 group">
          <div className="text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity"><TrendingDown size={24} /></div>
          <div className="text-3xl font-serif text-white">$41,200</div>
          <div className="text-xs uppercase tracking-widest text-gold-soft mt-1">Average Deal</div>
        </div>
        <div className="glass p-8 rounded-lg border-gold-dark/10 group">
          <div className="text-primary mb-4 opacity-40 group-hover:opacity-100 transition-opacity"><Filter size={24} /></div>
          <div className="text-3xl font-serif text-white">12%</div>
          <div className="text-xs uppercase tracking-widest text-gold-soft mt-1">Deal Success Rate</div>
        </div>
      </section>
    </main>
  );
}
