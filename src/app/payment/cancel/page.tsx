"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlassCard } from '@/components/ui/GlassCard';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassCard className="text-center p-8 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30 mb-6">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Payment Cancelled</h1>
          <p className="text-slate-300 mb-8">
            The alignment was interrupted. No charge was made. You can try again whenever you are ready.
          </p>

          <GlowButton onClick={() => router.push('/')} variant="secondary" className="w-full">
            Return to Home
          </GlowButton>
        </GlassCard>
      </motion.div>
    </div>
  );
}
