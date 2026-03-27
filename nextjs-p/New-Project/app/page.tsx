"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-onyx-gradient font-sans text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-gold-metallic tracking-widest">
          HIDDEN HAND
        </div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium text-gold-soft">
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How to Play</Link>
          <Link href="#leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link>
          <Link href="#profile" className="hover:text-primary transition-colors">Profile</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-8 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="display-lg font-serif text-6xl md:text-8xl mb-6 tracking-tight">
            Negotiate the <span className="text-gold-metallic">Impossible</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-soft font-light leading-relaxed max-w-2xl mx-auto mb-12">
            The dealer is firm. Your logic is your only currency. Can you strip away the profit and secure the Chronos Sapphire?
          </p>
          
          <Link href="/negotiate">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gold-metallic text-onyx font-bold rounded-sm text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(242,202,80,0.3)] hover:shadow-[0_0_50px_rgba(242,202,80,0.5)] transition-all flex items-center gap-3 mx-auto"
            >
              Start Negotiation <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Product Display Box */}
        <div className="mt-24 relative w-full max-w-5xl group">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-700"></div>
          <div className="glass rounded-xl p-1 md:p-4 relative overflow-hidden">
            <div className="bg-onyx/80 rounded-lg p-12 border border-gold-dark/20 flex flex-col items-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Placeholder for Watch Image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <Zap size={120} className="text-primary animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-onyx to-transparent"></div>
              </div>
              <div className="mt-8">
                <h3 className="text-3xl font-serif text-white mb-2">Chronos Sapphire</h3>
                <div className="text-gold-metallic font-bold text-2xl tracking-wider">$50,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="mt-40 w-full max-w-6xl text-left">
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="text-primary" />
            <h2 className="text-2xl font-serif uppercase tracking-widest">Global Hall of Fame</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-6 rounded-lg border-gold-dark/10 group cursor-default hover:border-primary/30 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-tighter text-gold-dark">Rank 0{i}</span>
                  <span className="text-primary font-bold">-$12,400</span>
                </div>
                <div className="text-xl font-medium mb-1">Alex Rivet</div>
                <div className="text-sm text-gold-soft opacity-60">Final Price: $37,600</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gold-dark/10 text-center">
         <div className="opacity-30 text-xs uppercase tracking-[0.5em] font-light">
           &copy; 2026 THE HIDDEN HAND • ELITE NEGOTIATION CLUB
         </div>
      </footer>
    </main>
  );
}
