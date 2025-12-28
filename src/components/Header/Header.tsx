"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";
import { Container } from "@/components/ui/Container";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Oracle", id: "hero" },
    { name: "How it Works", id: "how-it-works" },
    { name: "Pricing", id: "pricing" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
             <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <Sparkles className="w-5 h-5 text-gold" />
             </div>
             <span className="font-heading font-bold text-xl text-white tracking-wide">
               MysticAI <span className="text-gold">2026</span>
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={`/#${item.id}`}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-widest hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] shadow-transparent"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/#reading-form">
              <GlowButton className="px-6 py-2 text-sm">
                Get Reading
              </GlowButton>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <Container className="py-8 flex flex-col gap-6 items-center">
               {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={`/#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-200 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/#reading-form" onClick={() => setMobileMenuOpen(false)} className="w-full max-w-xs">
                  <GlowButton className="w-full">
                    Begin Journey
                  </GlowButton>
                </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
