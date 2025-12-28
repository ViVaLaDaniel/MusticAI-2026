"use client";

import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Star, Lock } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (tier: 'medium' | 'pro') => void;
}

export function PaymentModal({ isOpen, onClose, onUpgrade }: PaymentModalProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async (tier: 'medium' | 'pro') => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const { sessionId, error: apiError } = await response.json();

      if (apiError) throw new Error(apiError);

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) throw stripeError;

    } catch (err: any) {
      console.error("Payment Error:", err);
      setError(err.message || "Payment initialization failed");
      setLoading(false);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === "MYSTIC_MED") {
       onUpgrade('medium'); // Bypass Stripe for code
       onClose();
    } else if (cleanCode === "MYSTIC_PRO") {
       onUpgrade('pro'); // Bypass Stripe for code
       onClose();
    } else {
      setError("Invalid code. Try 'MYSTIC_MED' or 'MYSTIC_PRO'");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl" // Wider for 3 columns
          >
            <GlassCard className="border-gold/30 shadow-[0_0_50px_rgba(251,191,36,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-2">Choose Your Destiny Path</h2>
                  <p className="text-slate-300">
                    Unlock deeper wisdom with our Seeker and Prophet tiers.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Tier 1: Apprentice */}
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col opacity-70 hover:opacity-100 transition-opacity">
                    <h3 className="text-xl font-heading text-slate-300 mb-2">Apprentice</h3>
                    <div className="text-2xl font-bold text-white mb-6">Free</div>
                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-center text-sm text-slate-300"><Check className="w-4 h-4 mr-2 text-slate-500" /> 1 Reading / 24h</li>
                      <li className="flex items-center text-sm text-slate-300"><Check className="w-4 h-4 mr-2 text-slate-500" /> Short Answer</li>
                      <li className="flex items-center text-sm text-slate-500"><X className="w-4 h-4 mr-2" /> No Lucky Numbers</li>
                      <li className="flex items-center text-sm text-slate-500"><X className="w-4 h-4 mr-2" /> No Spirit Animal</li>
                    </ul>
                    <button className="w-full py-2 border border-white/10 rounded text-slate-400 cursor-not-allowed text-sm">Current Plan</button>
                  </div>

                  {/* Tier 2: Seeker */}
                  <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 flex flex-col relative transform hover:scale-105 transition-transform duration-300">
                    <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-bl">Best Value</div>
                    <h3 className="text-xl font-heading text-purple-300 mb-2">Seeker</h3>
                    <div className="text-2xl font-bold text-white mb-6">$4.99 <span className="text-sm font-normal text-slate-400">/ mo</span></div>
                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-purple-400" /> 3 Readings / 24h</li>
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-purple-400" /> Standard Answer</li>
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-purple-400" /> Lucky Numbers</li>
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-purple-400" /> Power Colors</li>
                    </ul>
                    <GlowButton onClick={() => handlePay('medium')} disabled={loading} className="w-full text-sm">
                       {loading ? "Processing..." : "Select Seeker"}
                    </GlowButton>
                  </div>

                  {/* Tier 3: Prophet */}
                  <div className="bg-gold/10 p-6 rounded-xl border border-gold/40 flex flex-col relative transform hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                    <h3 className="text-xl font-heading text-gold mb-2">Prophet</h3>
                    <div className="text-2xl font-bold text-white mb-6">$9.99 <span className="text-sm font-normal text-slate-400">/ mo</span></div>
                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-gold" /> Unlimited Readings</li>
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-gold" /> Deep Esoteric Analysis</li>
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-gold" /> Spirit Animal & Planet</li>
                      <li className="flex items-center text-sm text-white"><Check className="w-4 h-4 mr-2 text-gold" /> Priority Support</li>
                    </ul>
                    <GlowButton onClick={() => handlePay('pro')} disabled={loading} className="w-full text-sm bg-gold/20 border-gold/50 hover:bg-gold/30">
                       {loading ? "Processing..." : "Select Prophet"}
                    </GlowButton>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-slate-400 text-sm mb-4">Have a promo code?</p>
                  <form onSubmit={handleCodeSubmit} className="flex gap-2 max-w-sm mx-auto">
                    <input
                      type="text"
                      placeholder="Enter MYSTIC_MED or MYSTIC_PRO"
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setError("");
                      }}
                    />
                    <button 
                      type="submit"
                      disabled={loading || !code}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 disabled:opacity-50 text-sm"
                    >
                      Apply
                    </button>
                  </form>
                  {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
