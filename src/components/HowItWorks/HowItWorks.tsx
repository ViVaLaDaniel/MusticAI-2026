"use client";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { User, Sparkles, ScrollText } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Connect Your Energy",
    description: "Enter your mystical name and birth date to align your energy signature with the cosmos.",
    delay: 0,
  },
  {
    icon: Sparkles,
    title: "The Oracle Processes",
    description: "Our AI Oracle analyzes celestial patterns and Tarot archetypes specific to your unique path.",
    delay: 0.2,
  },
  {
    icon: ScrollText,
    title: "Receive Your Truth",
    description: "Get an instant, personalized forecast for 2026 revealing your financial and spiritual destiny.",
    delay: 0.4,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-nebula/10 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                How The Oracle Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
            <p className="text-slate-400">Three steps to unlock your future</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <GlassCard 
                key={index} 
                className="text-center relative group hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: step.delay, duration: 0.5 }}
                viewport={{ once: true }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-void border border-gold/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.2)] group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-gold" />
              </div>
              
              <div className="mt-8 space-y-4">
                <h3 className="font-heading text-xl text-white group-hover:text-gold-light transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-[-1]" />
              )}
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
