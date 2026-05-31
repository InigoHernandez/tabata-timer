import Seo from '@/components/Seo';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy | Stint" description="Stint's privacy policy. We don't collect personal data, we don't show ads, we don't track. Just a simple timer that respects your privacy." path="/privacy" />
      <main className="max-w-3xl mx-auto px-6 py-20 font-aspekta text-foreground/80 leading-relaxed">
        <h1 className="text-4xl font-light mb-6 text-foreground">Privacy Policy</h1>
        <p className="mb-4">Stint runs entirely in your browser. We do not collect, store, or transmit any personal information.</p>
        <p className="mb-4">Timer preferences (selected mode, last used settings) are saved in your browser's local storage. They never leave your device.</p>
        <p className="mb-4">We use privacy-respecting analytics to count page views in aggregate. No cookies, no personal identifiers, no cross-site tracking.</p>
        <p>Questions? Contact us via the GitHub repository linked from the About page.</p>
      </main>
      <Footer />
    </>
  );
}