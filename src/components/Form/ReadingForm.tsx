"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowInput } from "@/components/ui/GlowInput";
import { GlowTextarea } from "@/components/ui/GlowTextarea";
import { GlowButton } from "@/components/ui/GlowButton";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Loader2 } from "lucide-react";

import { generateReading } from "@/app/actions";
import { PaymentModal } from "@/components/PaymentModal";
import { Lock } from "lucide-react";

export function ReadingForm() {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [readingData, setReadingData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [currentTier, setCurrentTier] = useState<'free' | 'medium' | 'pro'>('free'); // Changed bool to string tier


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setReadingData(null);

    const formData = new FormData(e.currentTarget);
    formData.append('tier', currentTier); 

    const result = await generateReading(formData);

    setIsLoading(false);

    if (result.error) {
       if (result.error === 'ENERGY_DEPLETED' && 'message' in result) {
         setError(result.message as string);
         setShowPayment(true); // Auto open upgrade for limit hit
       } else {
         setError(result.error);
       }
    } else if (result.success && result.data) {
      setReadingData(result.data);
    }
  };

  const handleUpgrade = (tier: 'medium' | 'pro') => {
    setCurrentTier(tier);
    setError(null); // Clear energy depleted error if any
  };

  return (
    <section className="relative z-20 -mt-20 pb-20">
      <Container className="max-w-4xl">
        <GlassCard className="border-gold/20 shadow-[0_0_50px_rgba(251,191,36,0.1)]">
          <div className="text-center mb-8 space-y-2">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/30 mb-4"
            >
              <Sparkles className="w-6 h-6 text-gold" />
            </motion.div>
            <h2 className="font-heading text-3xl font-bold text-white">
              Connect to the Oracle
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Enter your details to synchronize with the cosmic energy of 2026.
            </p>
          </div>

          <PaymentModal 
            isOpen={showPayment} 
            onClose={() => setShowPayment(false)} 
            onUpgrade={handleUpgrade}
          />

          <AnimatePresence mode="wait">
            {!readingData ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <GlowInput 
                    name="name"
                    label="Mystical Name" 
                    placeholder="Enter your name..." 
                    required 
                  />
                  <GlowInput 
                    name="dob"
                    label="Date of Birth" 
                    placeholder="DD/MM/YYYY" 
                    type="date"
                    required 
                    className="justify-center"
                  />
                </div>
                
                <GlowTextarea 
                  name="question"
                  label="Your Deepest Question for 2026"
                  placeholder="What do the stars hold for my career? Will I find love?..."
                  required
                />

                {error && (
                  <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-500/30">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-center pt-4">
                  <GlowButton type="submit" disabled={isLoading} className="w-full md:w-auto min-w-[200px]">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Channeling Energy...
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        Reveal My Fate
                      </>
                    )}
                  </GlowButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-8"
              >
                <div className="w-20 h-20 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl text-white">
                    The Oracle Has Spoken
                  </h3>
                  {currentTier !== 'free' && (
                    <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs rounded-full border border-gold/30">
                      {currentTier === 'medium' ? 'SEEKER' : 'PROPHET'} STATUS
                    </span>
                  )}
                </div>

                {/* Main Reading */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-slate-200 text-lg leading-relaxed italic relative">
                   <span className="absolute -top-4 -left-2 text-4xl text-gold/30">&quot;</span>
                   {readingData.reading}
                   <span className="absolute -bottom-6 -right-2 text-4xl text-gold/30">&quot;</span>
                </div>

                {/* Extended Content Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                   {/* Lucky Numbers - Open for Medium & Pro */}
                   <div className="bg-black/40 p-4 rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="flex items-center gap-2 mb-2 text-gold">
                        <Star className="w-4 h-4" />
                        <span className="font-bold text-sm uppercase">Lucky Numbers</span>
                      </div>
                      {currentTier !== 'free' ? (
                        <div className="text-2xl font-mono text-white tracking-widest">
                           {readingData.luckyNumbers?.join(" • ")}
                        </div>
                      ) : (
                        <div className="h-8 blur-sm select-none text-white/50 flex items-center justify-center">
                           42 • 12 • 88 • 7
                        </div>
                      )}
                      {currentTier === 'free' && <LockOverlay onClick={() => setShowPayment(true)} />}
                   </div>

                   {/* Power Color - Open for Medium & Pro */}
                   <div className="bg-black/40 p-4 rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="flex items-center gap-2 mb-2 text-purple-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-bold text-sm uppercase">Power Color</span>
                      </div>
                       {currentTier !== 'free' ? (
                        <div className="text-xl text-white capitalize">
                           {readingData.powerColor}
                        </div>
                      ) : (
                        <div className="h-8 blur-sm select-none text-white/50 flex items-center justify-center">
                           Midnight Violet
                        </div>
                      )}
                      {currentTier === 'free' && <LockOverlay onClick={() => setShowPayment(true)} />}
                   </div>
                   
                   {/* Spirit Animal - PRO ONLY */}
                   <div className="bg-black/40 p-4 rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="flex items-center gap-2 mb-2 text-emerald-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-bold text-sm uppercase">Spirit Animal</span>
                      </div>
                       {currentTier === 'pro' ? (
                        <div className="text-xl text-white capitalize">
                           {readingData.spiritAnimal}
                        </div>
                      ) : (
                        <div className="h-8 blur-sm select-none text-white/50 flex items-center justify-center">
                           Golden Eagle
                        </div>
                      )}
                      {currentTier !== 'pro' && <LockOverlay onClick={() => setShowPayment(true)} />}
                   </div>

                   {/* Planet - PRO ONLY */}
                   <div className="bg-black/40 p-4 rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Star className="w-4 h-4" />
                        <span className="font-bold text-sm uppercase">Ruling Planet</span>
                      </div>
                       {currentTier === 'pro' ? (
                        <div className="text-xl text-white capitalize">
                           {readingData.planet}
                        </div>
                      ) : (
                        <div className="h-8 blur-sm select-none text-white/50 flex items-center justify-center">
                           Neptune Retrograde
                        </div>
                      )}
                      {currentTier !== 'pro' && <LockOverlay onClick={() => setShowPayment(true)} />}
                   </div>
                </div>

                {currentTier === 'free' && (
                  <GlowButton onClick={() => setShowPayment(true)} className="w-full animate-pulse">
                     <Lock className="w-4 h-4 mr-2" />
                     Unlock Full Reading
                  </GlowButton>
                )}
                {currentTier === 'medium' && (
                  <GlowButton onClick={() => setShowPayment(true)} className="w-full bg-slate-800 hover:bg-slate-700">
                     <Lock className="w-4 h-4 mr-2" />
                     Upgrade to Prophet (Unlock All)
                  </GlowButton>
                )}

                <GlowButton onClick={() => setReadingData(null)} variant="secondary">
                  Ask Another Question
                </GlowButton>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </Container>
    </section>
  );
}

function LockOverlay({ onClick }: { onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] cursor-pointer hover:bg-black/60 transition-colors z-10"
    >
      <Lock className="w-5 h-5 text-gold/80" />
    </div>
  );
}
