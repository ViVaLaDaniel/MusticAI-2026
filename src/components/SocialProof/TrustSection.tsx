"use client";

import { Container } from "@/components/ui/Container";
import { TestimonialMarquee } from "./TestimonialMarquee";
import { Users } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-20 bg-midnight/30 border-y border-white/5">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm mb-6">
            <Users className="w-4 h-4 text-nebula-light" />
            <span className="font-medium text-white">15,000+</span>
            <span className="text-slate-400">souls seeking answers</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Trusted by the Community
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            See what others have discovered about their destiny through the eye of the Oracle.
          </p>
        </div>
      </Container>
      
      <TestimonialMarquee />
    </section>
  );
}
