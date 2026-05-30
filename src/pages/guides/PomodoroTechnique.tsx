import GuideLayout from '../GuideLayout';
import { Link } from 'react-router-dom';

export default function PomodoroTechnique() {
  return (
    <GuideLayout
      path="/guides/pomodoro-technique"
      title="The Pomodoro Technique — A Practical Guide | Stint"
      description="The Pomodoro Technique is a simple time-boxing protocol invented by Francesco Cirillo. Here's how it works and how to use it well."
      h1="The Pomodoro Technique"
      date="2026-05-30"
    >
      <p>The Pomodoro Technique is a time-management protocol invented in the late 1980s by Francesco Cirillo, then a university student in Italy. He used a tomato-shaped kitchen timer (<em>pomodoro</em> is Italian for tomato) to break study sessions into manageable, finishable chunks.</p>
      <h2 className="text-xl text-foreground mt-8">The protocol</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Pick one task.</li>
        <li>Set the timer for 25 minutes. This is one pomodoro.</li>
        <li>Work on the task until the timer rings. No phones, no inbox, no quick checks.</li>
        <li>Take a 5-minute break. Stand up, drink water, look at something other than the screen.</li>
        <li>After four pomodoros, take a longer break (15–30 minutes).</li>
      </ol>
      <h2 className="text-xl text-foreground mt-8">Why it works</h2>
      <p>The technique works for three reasons. First, it converts vague intent ("I should work on this") into a discrete, finishable unit. Second, it externalises self-control: the timer is the boundary, not your willpower. Third, it builds momentum.</p>
      <h2 className="text-xl text-foreground mt-8">Common mistakes</h2>
      <p><strong>Checking your phone during the pomodoro.</strong> The whole point is unbroken attention.</p>
      <p><strong>Skipping the break.</strong> The break is what makes the next pomodoro possible.</p>
      <p><strong>Multi-tasking the pomodoro.</strong> One task per pomodoro.</p>
      <h2 className="text-xl text-foreground mt-8">When to deviate</h2>
      <p>25 minutes is canonical, but some kinds of work benefit from longer blocks. See the <Link to="/52-17" className="underline">52/17</Link> and <Link to="/90-20" className="underline">90/20</Link> variants, or the <Link to="/deep-work" className="underline">Deep Work timer</Link>.</p>
      <h2 className="text-xl text-foreground mt-8">Try it</h2>
      <p>Open <Link to="/pomodoro" className="underline">Stint's Pomodoro timer</Link>, pick one task, press start.</p>
    </GuideLayout>
  );
}