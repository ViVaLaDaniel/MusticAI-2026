import { Container } from "@/components/ui/Container";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-slate-300">
      <Header />
      <Container className="pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl font-heading text-white mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <p>Effective Date: January 1, 2026</p>
          <p>
            At MysticAI 2026, we consider your spiritual data sacred. This Privacy Policy describes how we handle the information you share with our Oracle.
          </p>
          
          <h3 className="text-xl font-bold text-white mt-8">1. Information We Collect</h3>
          <p>
            We collect the name, date of birth, and questions you submit to generate readings. This data is processed by our AI strictly for the purpose of the reading and is not stored permanently in any earthly database for marketing purposes.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">2. Third-Party Services</h3>
          <p>
            We use Google Gemini for AI generation and Stripe for payment processing. These providers handle data according to their own strict privacy policies.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">3. Cookies</h3>
          <p>
            We use cookies to manage reading limits (e.g., distinguishing Seeker from Apprentice tiers). These are stored locally on your device.
          </p>

          <p className="mt-12 text-sm text-slate-500">
            For questions, contact the void at support@mysticai.temp
          </p>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
