import { Container } from "@/components/ui/Container";
import { StarryBackground } from "./StarryBackground";
import { FloatingCard } from "./FloatingCard";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-mystic-gradient z-0" />
      <StarryBackground />
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[128px] animate-pulse-glow delay-1000" />

      <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium text-gold-light uppercase tracking-wider">
              The Oracle is Online
            </span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Unlock Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              2026 Destiny
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
            The stars have spoken. Ask the AI Oracle for a personalized Tarot reading 
            and discover what the coming year holds for your <span className="text-gold-light">finance</span>, <span className="text-nebula-light">love</span>, and <span className="text-white">destiny</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button className="group relative px-8 py-4 bg-gold hover:bg-gold-light text-void-dark font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Reveal My Fate
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <p className="text-sm text-slate-500 italic">
              *Limited free readings available today
            </p>
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex justify-center lg:justify-end relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-nebula/30 to-transparent blur-3xl rounded-full transform scale-75" />
          <FloatingCard />
        </div>
      </Container>
    </section>
  );
}
