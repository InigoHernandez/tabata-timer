import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Footer from '@/components/Footer';

const guides = [
  { path: '/guides/what-is-tabata', title: 'What is Tabata?', blurb: 'The 4-minute protocol invented by Dr. Izumi Tabata — origins, science, and how to use it.' },
  { path: '/guides/tabata-vs-hiit', title: 'Tabata vs HIIT', blurb: 'Tabata is a specific protocol; HIIT is an umbrella term. Here is the difference.' },
  { path: '/guides/pomodoro-technique', title: 'The Pomodoro Technique', blurb: 'Francesco Cirillo\'s focus protocol — how it works and why.' },
  { path: '/guides/deep-work', title: 'Deep Work', blurb: 'Cal Newport\'s framework for distraction-free cognitive performance.' },
  { path: '/guides/how-to-use-a-timer-for-productivity', title: 'How to use a timer for productivity', blurb: 'A practical playbook for using time-boxing in any work context.' },
];

export default function GuidesIndex() {
  return (
    <>
      <Seo title="Guides — Timers, Protocols & Productivity | Stint" description="Guides on Tabata, HIIT, Pomodoro, Deep Work and how to use timers effectively." path="/guides" />
      <main className="max-w-3xl mx-auto px-6 py-20 font-aspekta text-foreground/80 leading-relaxed">
        <h1 className="text-4xl font-light mb-8 text-foreground">Guides</h1>
        <ul className="space-y-6">
          {guides.map(g => (
            <li key={g.path}>
              <Link to={g.path} className="block group">
                <h2 className="text-xl text-foreground group-hover:underline">{g.title}</h2>
                <p className="text-foreground/60 mt-1">{g.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}