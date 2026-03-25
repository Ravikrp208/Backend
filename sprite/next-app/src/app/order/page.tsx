import Link from 'next/link';

export default function Order() {
  return (
    <div className="min-h-screen bg-[var(--color-sprite-dark)] text-white p-6 relative overflow-x-hidden flex flex-col items-center font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--color-sprite-green)]/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#00ffcc]/5 blur-[150px] rounded-full pointer-events-none animate-float" />
      
      <nav className="w-full max-w-7xl flex justify-between items-center py-6 z-20 relative mix-blend-difference animate-fade-in-up">
        <Link href="/" className="text-2xl font-black uppercase tracking-widest hover:text-[var(--color-sprite-green)] transition-all text-glow">
          SPRITE
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/login" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-[var(--color-sprite-green)] transition-colors">
            ACCOUNT
          </Link>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 cursor-pointer hover:bg-[var(--color-sprite-green)] hover:border-[var(--color-sprite-green)] transition-all group">
            <span className="text-[10px] font-bold group-hover:text-black transition-colors">0</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-16 z-10 py-12">
        
        {/* Product Visual Representation with 3D Hover Effect */}
        <div className="flex-1 flex justify-center w-full animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="relative w-72 h-[500px] p-1 rounded-[40px] group [perspective:1000px]">
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-sprite-green)] via-transparent to-[var(--color-sprite-green)] rounded-[40px] opacity-30 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]"></div>
            
            <div className="w-full h-full bg-[#0a0a0a] rounded-[38px] flex flex-col items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(0,255,0,0.1)] group-hover:shadow-[0_20px_80px_rgba(0,255,0,0.3)] transition-all duration-700 transform-gpu group-hover:[transform:rotateY(12deg)_rotateX(6deg)]">
              {/* Internal glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 bg-[url('/textures/sprite_can.png')] bg-cover bg-center opacity-40 mix-blend-screen scale-95 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 text-center mt-20 transition-transform duration-500 group-hover:[transform:translateZ(30px)]">
                <span className="text-6xl text-white font-black tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,0,0.5)] bg-clip-text text-transparent bg-gradient-to-b from-white to-[var(--color-sprite-green)]">SPRITE</span>
                <p className="tracking-[0.4em] text-[10px] text-[var(--color-sprite-green)] mt-4 font-bold uppercase">PREMIUM CANS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="flex-1 w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl relative animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h1 className="text-4xl font-extrabold uppercase tracking-widest text-[#00ff00] mb-2 text-glow">Checkout</h1>
          <p className="text-gray-400 font-light mb-10 tracking-widest text-xs uppercase">Secure your ultimate refreshment.</p>
          
          <form className="space-y-6 flex flex-col h-full">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-gray-400 pl-1">Quantity Selection</label>
              <div className="relative">
                <select className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white transition-all cursor-pointer appearance-none input-glow font-medium text-sm">
                  <option className="bg-black text-white">1x Premium 12-Pack ($14.99)</option>
                  <option className="bg-black text-white">2x Premium 12-Pack ($27.99)</option>
                  <option className="bg-black text-white">4x Premium 12-Pack ($49.99)</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-sprite-green)]">
                  ▼
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-gray-400 pl-1">Shipping Address</label>
              <textarea className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white transition-all h-28 resize-none input-glow text-sm" placeholder="123 Refreshment Blvd..."></textarea>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-gray-400 pl-1">Payment Details</label>
              <input type="text" className="w-full px-5 py-4 mb-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white transition-all tracking-widest input-glow text-sm" placeholder="CARD NUMBER" />
              <div className="flex gap-3">
                <input type="text" className="w-1/2 px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white transition-all text-center tracking-widest input-glow text-sm" placeholder="MM/YY" />
                <input type="text" className="w-1/2 px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white transition-all text-center tracking-widest input-glow text-sm" placeholder="CVC" />
              </div>
            </div>
            
            <div className="pt-6 mt-auto animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <button 
                type="button" 
                className="w-full py-4 relative group overflow-hidden bg-[var(--color-sprite-green)] text-black rounded-xl uppercase tracking-widest font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] hover:bg-white"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block">PLACE ORDER</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
