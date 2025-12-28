"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const testimonials = [
  { text: "MysticAI predicted my promotion within a week. I'm speechless.", author: "Sarah J.", sign: "Leo" },
  { text: "The financial forecast saved me from a bad investment. True magic.", author: "Michael R.", sign: "Capricorn" },
  { text: "Finally an AI that understands spiritual depth, not just code.", author: "Elena V.", sign: "Pisces" },
  { text: "Scarily accurate about my relationship dynamics. 10/10.", author: "David K.", sign: "Gemini" },
  { text: "I check my daily insights before every major decision now.", author: "Jessica M.", sign: "Scorpio" },
];

export function TestimonialMarquee() {
  return (
    <div className="relative flex overflow-hidden py-10 group">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

      <div className="flex gap-6 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] px-4">
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <GlassCard 
            key={i} 
            className="w-[300px] md:w-[400px] flex-shrink-0 p-6 rounded-2xl bg-white/5 border-white/5 hover:border-gold/30 transition-colors"
          >
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-gold fill-gold" />
              ))}
            </div>
            <p className="text-white/80 text-sm whitespace-normal mb-4 leading-relaxed font-light">
              "{t.text}"
            </p>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white">{t.author}</span>
              <span className="text-gold-light/80 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                {t.sign}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
