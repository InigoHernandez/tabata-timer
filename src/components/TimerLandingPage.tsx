import { Link } from 'react-router-dom';
import TabataTimer from './TabataTimer';
import Seo from './Seo';
import Footer from './Footer';
import type { LandingPage } from '@/data/landingPages';

interface Props {
  page: LandingPage;
}

export default function TimerLandingPage({ page }: Props) {
  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
      />
      <div className="h-dvh">
        <TabataTimer
          initialMode={page.mode}
          initialTraining={page.training}
          initialFocus={page.focus}
        />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 font-aspekta text-foreground/80 leading-relaxed">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-light mb-4 text-foreground">{page.h1}</h1>
          <p className="text-lg text-foreground/70">{page.intro}</p>
        </header>

        {page.longContent && (
          <section className="mb-10">
            <p>{page.longContent}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-xl font-normal mb-4 text-foreground">How to use this timer</h2>
          <ol className="list-decimal list-inside space-y-2">
            {page.howTo.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>

        {page.examples && page.examples.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-normal mb-4 text-foreground">Examples</h2>
            <ul className="list-disc list-inside space-y-2">
              {page.examples.map((ex, i) => <li key={i}>{ex}</li>)}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-xl font-normal mb-4 text-foreground">Related timers</h2>
          <ul className="flex flex-wrap gap-2">
            {page.related.map(r => (
              <li key={r.path}>
                <Link
                  to={r.path}
                  className="inline-block px-3 py-1.5 rounded-full border border-[#E8E8E8] dark:border-[#262626] text-sm hover:bg-[#F0F0F0] dark:hover:bg-[#1A1A1A] transition-colors"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <Footer />
    </>
  );
}