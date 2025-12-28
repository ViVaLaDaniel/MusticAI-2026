"use client";

import { motion } from "framer-motion";
import { Check, X, Star, Zap } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { Container } from "@/components/ui/Container";
import { loadStripe } from '@stripe/stripe-js';
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PricingCardProps {
  tier: 'free' | 'medium' | 'pro';
  price: string;
  name: string;
  description: string;
  features: string[];
  missingFeatures?: string[];
  recommended?: boolean;
}

function PricingCard({ tier, price, name, description, features, missingFeatures = [], recommended = false }: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (tier === 'free') return; // Smooth scroll to form or just info

    setLoading(true);
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

      const { error: stripeError } = await (stripe as any).redirectToCheckout({ sessionId });
      if (stripeError) throw stripeError;
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-2xl border flex flex-col ${
        recommended 
          ? "bg-purple-900/20 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)] transform md:-translate-y-4" 
          : "bg-white/5 border-white/10"
      }`}
    >
      {recommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-xl font-heading mb-2 ${recommended ? "text-purple-300" : "text-slate-300"}`}>
          {name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== "Free" && <span className="text-slate-500 text-sm">/month</span>}
        </div>
        <p className="text-slate-400 text-sm mt-2">{description}</p>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        {features.map((feat, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
            <Check className={`w-5 h-5 flex-shrink-0 ${recommended ? "text-purple-400" : "text-green-400/70"}`} />
            <span>{feat}</span>
          </div>
        ))}
        {missingFeatures.map((feat, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-slate-500 opacity-60">
            <X className="w-5 h-5 flex-shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      <GlowButton 
        variant={recommended ? "primary" : "secondary"} 
        className="w-full"
        onClick={handleSubscribe}
        disabled={tier === 'free' || loading}
      >
        {loading ? "Processing..." : (tier === 'free' ? "Current Plan" : `Choose ${name}`)}
      </GlowButton>
    </motion.div>
  );
}

export function PricingSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Star className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium tracking-wider uppercase text-sm">Cosmic Tiers</span>
            <Star className="w-5 h-5 text-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading text-white mb-6"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Destiny</span>
          </motion.h2>
          <p className="text-lg text-slate-400">
            Unlock deeper insights into your future. Whether you are a curious apprentice or a devoted prophet, the stars have a plan for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            tier="free"
            name="Apprentice"
            price="Free"
            description="For the curious soul just starting their journey."
            features={[
              "1 Reading every 24 hours",
              "Short Cryptic Answers",
              "Basic Access"
            ]}
            missingFeatures={[
              "Lucky Numbers & Colors",
              "Spirit Animal Discovery",
              "Ruling Planet Analysis",
              "Priority Channeling"
            ]}
          />
          <PricingCard
            tier="medium"
            name="Seeker"
            price="$4.99"
            description="For those who seek clarity and actionable wisdom."
            recommended={true}
            features={[
              "3 Readings every 24 hours",
              "Standard Detailed Answers",
              "Reveal Lucky Numbers",
              "Reveal Power Colors",
              "Ad-free Experience"
            ]}
            missingFeatures={[
              "Spirit Animal Discovery",
              "Ruling Planet Analysis",
              "Unlimited Access"
            ]}
          />
          <PricingCard
            tier="pro"
            name="Prophet"
            price="$9.99"
            description="The ultimate connection to the cosmic void."
            features={[
              "Unlimited Readings",
              "Deep Esoteric Analysis (300+ words)",
              "All Premium Features Unlocked",
              "Spirit Animal & Planet",
              "Instant Priority Channeling",
              "Early Access to New Rituals"
            ]}
          />
        </div>

        <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">
                Secure payments processed by Stripe. You can cancel anytime.
            </p>
        </div>
      </Container>
    </section>
  );
}
