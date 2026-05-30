import GuideLayout from '../GuideLayout';
import { Link } from 'react-router-dom';

export default function TabataVsHiit() {
  return (
    <GuideLayout
      path="/guides/tabata-vs-hiit"
      title="Tabata vs HIIT — What's the Difference? | Stint"
      description="Tabata is one specific protocol. HIIT is an umbrella term. Here's how they differ and when to use each."
      h1="Tabata vs HIIT"
      date="2026-05-30"
    >
      <p>People use "Tabata" and "HIIT" interchangeably, but they are not the same thing. <strong>HIIT</strong> — High-Intensity Interval Training — is an umbrella term for any workout that alternates hard effort with planned recovery. <strong>Tabata</strong> is one specific HIIT protocol with fixed parameters.</p>
      <h2 className="text-xl text-foreground mt-8">Tabata in one sentence</h2>
      <p>8 rounds of 20 seconds of all-out work + 10 seconds of rest, for a total of 4 minutes. See <Link to="/guides/what-is-tabata" className="underline">What is Tabata?</Link> for the full history.</p>
      <h2 className="text-xl text-foreground mt-8">HIIT in one sentence</h2>
      <p>Any interval workout that includes high-intensity work bouts followed by recovery — typical work bouts range from 15 seconds to several minutes.</p>
      <h2 className="text-xl text-foreground mt-8">When to choose Tabata</h2>
      <p>You have 4 minutes, no patience for warmup excuses, and want a brutal cardiovascular hit.</p>
      <h2 className="text-xl text-foreground mt-8">When to choose generic HIIT</h2>
      <p>You want more total volume, you want to mix movements, or you want a less punishing intensity that still keeps the heart rate high.</p>
      <p>Stint runs both: <Link to="/tabata" className="underline">Tabata timer</Link> and a customizable <Link to="/hiit" className="underline">HIIT timer</Link>.</p>
    </GuideLayout>
  );
}