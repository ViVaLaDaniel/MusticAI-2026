"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingCard() {
  return (
    <div className="relative w-64 h-96 sm:w-80 sm:h-[28rem] perspective-1000">
      <motion.div
        className={cn(
          "w-full h-full relative preserve-3d cursor-pointer",
          "rounded-2xl border border-gold-glow/30"
        )}
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05, rotateY: 180 }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-void-dark shadow-2xl shadow-gold/20 flex flex-col items-center justify-center border-2 border-gold/10">
          <div className="absolute inset-0 bg-mystic-gradient opacity-50" />
          <div className="relative z-10 p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-gold animate-pulse"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl text-gold-light tracking-widest uppercase">
              The Mystic
            </h3>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <p className="text-xs text-secondary font-light">
              Tap to reveal the unknown
            </p>
          </div>
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30 rounded-br-lg" />
        </div>

        {/* Back of Card (Simulated Revealing) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-nebula-dark flex items-center justify-center border-2 border-gold shadow-[0_0_50px_rgba(124,58,237,0.5)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" />
          <div className="text-center p-6 relative z-10">
             <div className="text-6xl mb-4">🔮</div>
             <h3 className="font-heading text-2xl text-white mb-2">2026</h3>
             <p className="text-gold-light text-sm">Your Destiny Awaits</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
