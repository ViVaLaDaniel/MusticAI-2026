import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LegalDisclaimerModal } from "@/components/Legal/LegalDisclaimerModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MysticAI 2026 | Unlock Your Destiny",
  description: "AI-powered Tarot reading and 2026 horoscope predictions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          cinzel.variable,
          "antialiased min-h-screen font-body text-foreground bg-void overflow-x-hidden selection:bg-gold/30 selection:text-gold-light"
        )}
      >
        <LegalDisclaimerModal />
        {children}
      </body>
    </html>
  );
}
