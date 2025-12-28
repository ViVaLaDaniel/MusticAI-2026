import { HeroSection } from "@/components/Hero/HeroSection";
import { ReadingForm } from "@/components/Form/ReadingForm";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { TrustSection } from "@/components/SocialProof/TrustSection";
import { Footer } from "@/components/Footer/Footer";
import { PricingSection } from "@/components/Sections/PricingSection";
import { FAQSection } from "@/components/Sections/FAQSection";
import { Header } from "@/components/Header/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-purple-500/30">
      <Header />
      <div id="hero" className="scroll-mt-32 text-gray-500"><HeroSection /></div>
      <div id="reading-form" className="scroll-mt-32"><ReadingForm /></div>
      <div id="how-it-works" className="scroll-mt-32"><HowItWorks /></div>
      <div id="pricing" className="scroll-mt-32"><PricingSection /></div>
      <div id="faq" className="scroll-mt-32"><FAQSection /></div>
      <TrustSection />
      <Footer />
    </main>
  );
}
