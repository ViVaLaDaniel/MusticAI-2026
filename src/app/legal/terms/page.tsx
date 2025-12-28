import { Container } from "@/components/ui/Container";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-slate-300">
      <Header />
      <Container className="pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl font-heading text-white mb-8">Terms of Service</h1>
        <div className="space-y-6">
          <p>Effective Date: January 1, 2026</p>
          <p>
            By accessing MysticAI 2026, you agree to these Terms. If you disagree, please do not disturb the spirits.
          </p>
          
          <h3 className="text-xl font-bold text-white mt-8">1. Entertainment Purposes Only</h3>
          <p>
            All readings, predictions, and advice provided by MysticAI are for entertainment purposes only. Do not make life-altering decisions (financial, medical, legal) based on our AI Oracle.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">2. Refunds</h3>
          <p>
            The flow of digital energy is final. However, if the service fails to deliver a reading due to technical technicalities, please contact support for a refund.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">3. Usage Limits</h3>
          <p>
            Do not spam the Oracle. We reserve the right to ban IPs that abuse the API limits.
          </p>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
