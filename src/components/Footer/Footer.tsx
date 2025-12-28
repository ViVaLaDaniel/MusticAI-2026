"use client";

import { Container } from "@/components/ui/Container";
import { Sparkles, Moon, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-void-dark border-t border-white/5 pt-16 pb-8 relative z-10">
      <Container>
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                MysticAI <span className="text-gold">2026</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm max-w-xs font-light">
              The world's most advanced AI Oracle, blending ancient wisdom with 
              neural networks to predict your destiny.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Features</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-gold transition-colors">Tarot Reading</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Daily Horoscope</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Crystal Ball</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Compatibility</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-gold transition-colors">About the Oracle</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Contact Spirits</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            © 2024-2026 MysticAI. Made with ✨ Magic & Code.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">
              <Moon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
