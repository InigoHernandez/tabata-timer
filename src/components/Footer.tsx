import { Link } from 'react-router-dom';

const trainingLinks = [
  { to: '/tabata', label: 'Tabata' },
  { to: '/hiit', label: 'HIIT' },
  { to: '/emom', label: 'EMOM' },
  { to: '/amrap', label: 'AMRAP' },
  { to: '/intervals', label: 'Intervals' },
  { to: '/rounds', label: 'Rounds' },
  { to: '/circuit', label: 'Circuit' },
  { to: '/boxing-rounds', label: 'Boxing rounds' },
  { to: '/cardio-timer', label: 'Cardio' },
  { to: '/20-10', label: '20/10' },
  { to: '/30-15', label: '30/15' },
  { to: '/45-15', label: '45/15' },
];
const focusLinks = [
  { to: '/pomodoro', label: 'Pomodoro' },
  { to: '/deep-work', label: 'Deep work' },
  { to: '/study-timer', label: 'Study' },
  { to: '/work-timer', label: 'Work' },
  { to: '/focus-timer', label: 'Focus' },
  { to: '/52-17', label: '52/17' },
  { to: '/90-20', label: '90/20' },
];
const genericLinks = [
  { to: '/timer', label: 'Timer' },
  { to: '/online-timer', label: 'Online timer' },
  { to: '/countdown-timer', label: 'Countdown' },
  { to: '/session-timer', label: 'Session' },
];
const moreLinks = [
  { to: '/guides', label: 'Guides' },
  { to: '/about', label: 'About' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
];

function Group({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-foreground/40 mb-3 font-aspekta">{title}</h3>
      <ul className="space-y-1.5">
        {items.map(i => (
          <li key={i.to}>
            <Link to={i.to} className="text-sm text-foreground/70 hover:text-foreground transition-colors">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E8E8] dark:border-[#262626] bg-[#F8F8F8] dark:bg-[#0F0F0F] font-aspekta">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Group title="Training" items={trainingLinks} />
        <Group title="Focus" items={focusLinks} />
        <Group title="Timers" items={genericLinks} />
        <Group title="More" items={moreLinks} />
      </div>
      <div className="border-t border-[#E8E8E8] dark:border-[#262626] py-6 text-center text-xs text-foreground/40">
        © {new Date().getFullYear()} Stint — A minimalist timer for any session.
      </div>
    </footer>
  );
}