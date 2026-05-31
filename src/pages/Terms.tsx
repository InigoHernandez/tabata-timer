import Seo from '@/components/Seo';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <>
      <Seo title="Terms of Service | Stint" description="Terms of service for Stint, the free minimalist timer. Open access, no warranty, use at your own discretion. Read the full terms here." path="/terms" />
      <main className="max-w-3xl mx-auto px-6 py-20 font-aspekta text-foreground/80 leading-relaxed">
        <h1 className="text-4xl font-light mb-6 text-foreground">Terms of Service</h1>
        <p className="mb-4">Stint is provided free of charge, as-is, without warranty of any kind. Use it at your own discretion.</p>
        <p className="mb-4">You are responsible for your own training and your own focus practice. Stint is a timer, not a coach, therapist, or doctor. Consult a qualified professional before starting any intense exercise program.</p>
        <p>By using Stint you agree to use it for lawful purposes and not to attempt to reverse engineer, abuse, or disrupt the service.</p>
      </main>
      <Footer />
    </>
  );
}