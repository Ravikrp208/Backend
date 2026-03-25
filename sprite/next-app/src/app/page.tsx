import Canvas3D from '@/components/Canvas3D';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative w-full text-white bg-black">
      <Canvas3D />
      
      <div className="scroll-container relative z-10 pointer-events-none">
        <section className="h-screen w-full flex items-center px-[5vw]">
          <div className="content pointer-events-auto max-w-2xl opacity-100 transform-none">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest text-[rgba(0,255,0,0.8)] shadow-green-500/50 drop-shadow-2xl mb-6">REFRESH YOUR SENSES</h1>
            <p className="text-xl font-light opacity-80">The ultimate lemon-lime experience.</p>
          </div>
        </section>

        <section className="h-screen w-full flex items-center px-[5vw]">
          <div className="content pointer-events-auto max-w-2xl ml-auto text-right opacity-100 transform-none">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-green-400 mb-6 drop-shadow-xl">CRISP INTENSITY</h2>
            <p className="text-xl font-light opacity-80">Every drop engineered for maximum refreshment.</p>
          </div>
        </section>

        <section className="h-screen w-full flex items-center px-[5vw]">
          <div className="content pointer-events-auto max-w-2xl mr-auto text-left opacity-100 transform-none">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-green-400 mb-6 drop-shadow-xl">UNLEASH THE FIZZ</h2>
            <p className="text-xl font-light opacity-80">An explosion of flavor in every sip.</p>
          </div>
        </section>

        <section className="h-screen w-full flex flex-col items-center justify-center px-[5vw]">
          <div className="content pointer-events-auto text-center opacity-100 transform-none flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-green-400 mb-8 drop-shadow-xl">OBEY YOUR THIRST</h2>
            <Link href="/order" className="px-8 py-3 bg-transparent border-2 border-green-500 text-white uppercase tracking-widest font-bold hover:bg-green-500 hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:shadow-[0_0_30px_rgba(0,255,0,0.6)]">
              EXPERIENCE NOW
            </Link>
          </div>
        </section>
      </div>

      {/* Navigation properly layered */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 mix-blend-difference pointer-events-auto text-white font-semibold uppercase tracking-widest">
        <Link href="/" className="hover:text-green-400 transition-colors">SPRITE</Link>
        <div className="space-x-8">
          <Link href="/login" className="hover:text-green-400 transition-colors">LOGIN</Link>
          <Link href="/register" className="hover:text-green-400 transition-colors">REGISTER</Link>
          <Link href="/order" className="text-green-400 hover:text-white transition-colors">ORDER</Link>
        </div>
      </nav>
    </main>
  );
}
