import Link from 'next/link';

export default function Register() {
  return (
    <div className="min-h-screen bg-[var(--color-sprite-dark)] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background ambient glow setup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[var(--color-sprite-green)]/5 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] bg-[#00ffcc]/10 blur-[120px] rounded-full pointer-events-none animate-float" />
      <div className="absolute top-10 left-10 w-[40vw] h-[40vw] bg-[#00ff00]/10 blur-[120px] rounded-full pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="w-full max-w-md glass-panel p-10 rounded-3xl relative z-10 animate-fade-in-up">
        {/* Decorative top bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[var(--color-sprite-green)] to-transparent rounded-b-full opacity-50"></div>
        
        <h1 className="text-4xl font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00ff00] mb-2 text-center text-glow">Create Account</h1>
        <p className="text-center text-gray-400 font-light mb-10 tracking-widest text-xs uppercase">Join the ultimate refreshing experience.</p>
        
        <form className="space-y-6">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-gray-400 pl-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white placeholder-gray-600 transition-all duration-300 input-glow" 
              placeholder="JANE DOE" 
            />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-gray-400 pl-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white placeholder-gray-600 transition-all duration-300 input-glow" 
              placeholder="user@example.com" 
            />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 text-gray-400 pl-1">Password</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[var(--color-sprite-green)] text-white placeholder-gray-600 transition-all duration-300 input-glow" 
              placeholder="••••••••" 
            />
          </div>
          
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <button 
              type="button" 
              className="w-full py-4 relative group overflow-hidden bg-[var(--color-sprite-green)] text-black rounded-xl uppercase tracking-widest font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,0,0.4)]"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 inline-block">REGISTER</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-xs tracking-wider text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          ALREADY HAVE AN ACCOUNT? <Link href="/login" className="text-white hover:text-[var(--color-sprite-green)] hover:underline transition-colors font-semibold">LOG IN</Link>
        </p>
      </div>

      <Link href="/" className="absolute top-8 left-8 text-2xl font-black uppercase tracking-widest hover:text-[var(--color-sprite-green)] transition-all z-20 text-glow">
        SPRITE
      </Link>
    </div>
  );
}
