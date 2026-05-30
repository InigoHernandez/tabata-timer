import Seo from '@/components/Seo';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      <Seo
        title="About Stint — A Minimalist Timer for Any Session"
        description="Stint is a free, minimalist, distraction-free timer for training and focus sessions. Built by Iñigo Hernandez."
        path="/about"
      />
      <main className="max-w-3xl mx-auto px-6 py-20 font-aspekta text-foreground/80 leading-relaxed">
        <h1 className="text-4xl font-light mb-6 text-foreground">About Stint</h1>
        <p className="mb-4">Stint is a free, minimalist timer for any kind of timed session — training intervals, focus blocks, study sessions, meditation, breathing practice. No ads, no signup, no app to install.</p>
        <p className="mb-4">It runs entirely in your browser. Two modes cover the common cases: Training (interval-based workouts like Tabata, HIIT, EMOM, AMRAP) and Focus (Pomodoro and deep work sessions).</p>
        <p className="mb-4">The design philosophy is restraint. No leaderboards, no streaks, no notifications begging for re-engagement. Press start, do the work, close the tab.</p>
        <p>Stint was built by Iñigo Hernandez. The project lives at <a href="https://stint.run" className="underline">stint.run</a>.</p>
      </main>
      <Footer />
    </>
  );
}