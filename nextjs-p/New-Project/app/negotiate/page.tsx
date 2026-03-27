"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, TrendingDown, Clock, User, ShieldCheck, ArrowLeft, Info, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Message {
  role: "ai" | "user";
  text: string;
}

export default function NegotiatePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Welcome to the Inner Sanctum. I am The Curator. The Chronos Sapphire is a masterpiece of temporal engineering. $50,000 is its value. Do you have a proposal, or are you merely admiring the craftsmanship?" }
  ]);
  const [input, setInput] = useState("");
  const [currentOffer, setCurrentOffer] = useState(50000);
  const [round, setRound] = useState(1);
  const [patience, setPatience] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isSending || isGameOver) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsSending(true);

    try {
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          currentOffer,
          round,
          patience
        })
      });

      const data = await res.json();
      
      setMessages(prev => [...prev, { role: "ai", text: data.response }]);
      setCurrentOffer(data.newOffer);
      setRound(prev => prev + 1);
      setPatience(data.newPatience);
      
      if (data.status === "DEAL" || data.status === "FAILED" || round >= 10) {
        setIsGameOver(true);
      }
    } catch (error) {
      console.error("Negotiation failed", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-onyx flex flex-col font-sans text-foreground">
      {/* Header */}
      <div className="border-b border-gold-dark/10 glass px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2 text-gold-soft hover:text-primary transition-colors uppercase tracking-[0.2em] text-xs font-bold">
          <ArrowLeft size={14} /> Exit Sanctum
        </Link>
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-center">
             <span className="text-[10px] uppercase tracking-tighter text-gold-soft/50">Current Offer</span>
             <span className="text-primary font-serif font-bold text-xl">${currentOffer.toLocaleString()}</span>
           </div>
           <div className="w-px h-8 bg-gold-dark/20"></div>
           <div className="flex flex-col items-center">
             <span className="text-[10px] uppercase tracking-tighter text-gold-soft/50">Round</span>
             <span className="text-white font-serif font-bold text-xl">{round}/10</span>
           </div>
        </div>
        <div className="flex items-center gap-4">
           {/* Patience Gauge */}
           <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] uppercase tracking-tighter text-gold-soft/50">Curator Patience</span>
             <div className="w-32 h-1 bg-gold-dark/20 mt-1 overflow-hidden rounded-full">
               <motion.div 
                 initial={{ width: "100%" }}
                 animate={{ width: `${patience}%` }}
                 className={`h-full ${patience > 50 ? 'bg-primary' : patience > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
               />
             </div>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
        {/* Left: Product Info */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center bg-onyx-gradient border-r border-gold-dark/10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full"></div>
             {/* Using the generated image path placeholder */}
             <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in">
                <Image 
                  src="/chronos_sapphire_watch.png" 
                  alt="Chronos Sapphire" 
                  fill
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 0 30px rgba(0,0,0,0.5))" }}
                />
             </div>
          </motion.div>
          
          <div className="mt-12 text-center max-w-sm">
             <h2 className="text-4xl font-serif text-white mb-2">Chronos Sapphire</h2>
             <p className="text-gold-soft text-sm font-light leading-relaxed mb-6">
               Hand-crafted in the hidden workshops of Geneva. Single sapphire casing. 8-day power reserve. The preferred timepiece of the shadows.
             </p>
             <div className="flex justify-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-gold-soft">
                  <ShieldCheck size={12} className="text-primary" /> Authenticated
               </div>
               <div className="flex items-center gap-2 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-gold-soft">
                  <Clock size={12} className="text-primary" /> 1/1 Global
               </div>
             </div>
          </div>
        </div>

        {/* Right: Negotiation Chat */}
        <div className="w-full md:w-1/2 flex flex-col bg-onyx/50 backdrop-blur-md">
          <div 
            ref={scrollRef}
            className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gold-dark/20"
          >
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === "ai" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-lg text-sm leading-relaxed ${
                    msg.role === "ai" 
                    ? "glass border-gold-dark/10 text-white font-serif italic" 
                    : "bg-gold-metallic text-onyx font-bold self-end"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isSending && (
              <div className="flex justify-start">
                 <div className="glass p-4 rounded-lg flex gap-1">
                   {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: `${i*0.1}s` }} />)}
                 </div>
              </div>
            )}
            {isGameOver && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 glass border-primary/30 rounded-xl text-center flex flex-col items-center gap-4"
              >
                <Trophy size={48} className="text-primary" />
                <h3 className="text-2xl font-serif">Negotiation Concluded</h3>
                <p className="text-gold-soft font-light">Final Price Agreed: <span className="text-white font-bold">${currentOffer.toLocaleString()}</span></p>
                <div className="flex gap-4 mt-4">
                  <Link href="/leaderboard" className="px-6 py-2 glass border-primary/20 text-xs font-bold uppercase tracking-widest hover:bg-primary/10 transition-all">Submit Score</Link>
                  <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-onyx text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all">New Play</button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-gold-dark/10 glass bg-onyx/80">
            <div className="flex gap-4">
              <input 
                type="text"
                placeholder={isGameOver ? "Negotiation is closed..." : "Propose a price or state your reasoning..."}
                disabled={isGameOver || isSending}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent border-b border-gold-dark text-white p-2 font-light focus:outline-none focus:border-primary transition-all disabled:opacity-50"
              />
              <button
                disabled={isGameOver || isSending || !input.trim()}
                onClick={handleSend}
                className="w-12 h-12 flex items-center justify-center bg-gold-metallic text-onyx rounded-sm disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-widest text-gold-soft/50 font-bold">
               <div className="flex items-center gap-2"><Info size={12} /> Pro-Tip: Be respectful, yet firm with your logic.</div>
               <div className="flex items-center gap-1"><User size={12} /> Signed in as Guest</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
