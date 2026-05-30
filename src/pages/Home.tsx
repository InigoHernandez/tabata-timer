import { Link } from 'react-router-dom';
import TabataTimer from '@/components/TabataTimer';
import Seo from '@/components/Seo';
import Footer from '@/components/Footer';

const popular = [
  { path: '/tabata', label: 'Tabata', desc: '20/10 × 8 rounds — the classic 4-minute protocol.' },
  { path: '/hiit', label: 'HIIT', desc: 'Customizable intervals for any conditioning workout.' },
  { path: '/pomodoro', label: 'Pomodoro', desc: '25-minute focus blocks with short breaks.' },
  { path: '/deep-work', label: 'Deep Work', desc: 'Long uninterrupted focus sessions.' },
  { path: '/emom', label: 'EMOM', desc: 'Every Minute On the Minute — CrossFit standard.' },
  { path: '/amrap', label: 'AMRAP', desc: 'As Many Rounds As Possible in a fixed window.' },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Stint?', acceptedAnswer: { '@type': 'Answer', text: 'Stint is a free, minimalist timer for training intervals and focus sessions. It runs in any browser with no signup and no ads.' } },
    { '@type': 'Question', name: 'Is Stint free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Stint is completely free, with no ads, no signup, and no paid tiers.' } },
    { '@type': 'Question', name: 'Does Stint work offline?', acceptedAnswer: { '@type': 'Answer', text: 'Once the page is loaded, the timer runs entirely in your browser without needing a network connection.' } },
    { '@type': 'Question', name: 'What timer protocols does Stint support?', acceptedAnswer: { '@type': 'Answer', text: 'Tabata, HIIT, EMOM, AMRAP, custom intervals, Pomodoro, Deep Work, 52/17, 90/20, and any custom focus or training session.' } },
    { '@type': 'Question', name: 'Do I need to sign up?', acceptedAnswer: { '@type': 'Answer', text: 'No. There is no account system. Open the page and press start.' } },
  ],
};

export default function Home() {
  return (
    <>
      <Seo
        title="Stint — Free Online Timer for Training, Focus & Sessions"
        description="Free minimalist timer for HIIT, Tabata, Pomodoro, Deep Work and any timed session. No ads, no signup. Just press start."
        path="/"
        jsonLd={faqLd}
      />
      <div className="h-dvh">
        <h1 className="sr-only">Stint — Free Online Timer for Training, Focus & Sessions</h1>
        <TabataTimer />
      </div>

      <section className="max-w-5xl mx-auto px-6 py-20 font-aspekta">
        <h2 className="text-2xl md:text-3xl font-light mb-2 text-foreground">Popular protocols</h2>
        <p className="text-foreground/60 mb-10">One timer, every common training and focus protocol.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map(p => (
            <Link
              key={p.path}
              to={p.path}
              className="block p-5 rounded-xl border border-[#E8E8E8] dark:border-[#262626] bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:border-foreground/30 transition-colors"
            >
              <div className="text-lg text-foreground mb-1">{p.label}</div>
              <div className="text-sm text-foreground/60">{p.desc}</div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}