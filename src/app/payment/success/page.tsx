"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlassCard } from '@/components/ui/GlassCard';
import Cookies from 'js-cookie';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tier = searchParams.get('tier');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (tier) {
       // Ideally this should be a verified server-side set-cookie after webhook verification
       // For this MVP, we set a client-side marker or just rely on the user knowing they bought it
       // To actually "activate" it based on our previous logic, let's set a simple cookie
       // NOTE: This is insecure for real production without webhooks, but fits the "Immediate" constraint.
       Cookies.set('mystic_purchased_tier', tier, { expires: 30 }); 
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tier, router]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassCard className="text-center p-8 border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 mb-6 shadow-lg animate-pulse">
            <Check className="w-10 h-10 text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-300 mb-8">
            The stars have aligned. Your access to <span className="text-gold font-bold uppercase">{tier === 'medium' ? 'Seeker' : 'Prophet'}</span> wisdom is now unlocked.
          </p>

          <GlowButton onClick={() => router.push('/')} className="w-full mb-4">
            Return to Oracle ({countdown}s)
          </GlowButton>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="text-white text-center pt-20">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
