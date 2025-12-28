"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LegalDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has already accepted
    const accepted = localStorage.getItem("mystic_legal_accepted_v1");
    // Don't show modal on legal pages themselves to allow reading
    const isLegalPage = pathname?.startsWith("/legal");
    
    if (!accepted && !isLegalPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
        // If already accepted or on legal page, verify acceptance status for state but don't blocking view if just reading
        if (accepted) setHasAccepted(true);
    }
  }, [pathname]);

  const handleAccept = () => {
    localStorage.setItem("mystic_legal_accepted_v1", "true");
    setIsOpen(false);
    setHasAccepted(true);
    document.body.style.overflow = 'unset';
  };

  if (hasAccepted && !isOpen) return null;
  // Double check to ensure we don't render on legal pages even if state says open (react hydration safety)
  if (pathname?.startsWith("/legal")) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto z-[101]"
          >
            <GlassCard className="border-red-500/30 shadow-[0_0_100px_rgba(239,68,68,0.2)] p-8 md:p-10">
              
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 shrink-0">
                   <Shield className="w-8 h-8 text-red-500" />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                     Global Legal Agreement
                   </h2>
                   <p className="text-red-400 text-sm font-medium">
                     Review and Acceptance Required
                   </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar mb-8">
                <p className="uppercase font-bold text-white">
                    BY ACCESSING MYSTICAI 2026, YOU AGREE TO OUR <Link href="/legal/terms" className="text-gold hover:underline">TERMS OF SERVICE</Link> AND <Link href="/legal/privacy" className="text-gold hover:underline">PRIVACY POLICY</Link>.
                </p>

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="text-white font-bold flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        1. ENTERTAINMENT ONLY & NO LIABILITY
                    </h3>
                    <p>
                        You acknowledge that this service uses Artificial Intelligence to generate fictitious responses for entertainment. 
                        We explicitly disclaim all liability for any actions you take based on this content. 
                        Read the full <Link href="/legal/terms" className="text-gold hover:underline">Terms of Service</Link> for the complete liability waiver.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-white mt-4 mb-2">2. DATA PROCESSING</h3>
                    <p>
                        By continuing, you consent to the processing of your inputs as described in our <Link href="/legal/privacy" className="text-gold hover:underline">Privacy Policy</Link>. We do not sell your personal data to extensive third-party networks, but process it strictly for providing the reading.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-white mt-4 mb-2">3. AGE & JURISDICTION</h3>
                    <p>
                        You confirm you are at least 18 years of age and are accessing this site in compliance with the local laws of your jurisdiction.
                    </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-green-200">
                          I have read and agree to the <Link href="/legal/terms" className="underline hover:text-white">Terms of Service</Link> and <Link href="/legal/privacy" className="underline hover:text-white">Privacy Policy</Link>. I understand this is an AI simulation.
                      </p>
                  </div>

                  <GlowButton 
                    onClick={handleAccept} 
                    className="w-full py-4 text-lg bg-red-600 hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                  >
                    I ACCEPT & ENTER
                  </GlowButton>
              </div>

            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
