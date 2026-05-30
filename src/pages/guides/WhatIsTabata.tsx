import GuideLayout from '../GuideLayout';
import { Link } from 'react-router-dom';

export default function WhatIsTabata() {
  return (
    <GuideLayout
      path="/guides/what-is-tabata"
      title="What is Tabata? The 4-Minute HIIT Protocol Explained | Stint"
      description="A clear, sourced explanation of the Tabata protocol — its origins, the science behind it, and how to do it well."
      h1="What is Tabata?"
      date="2026-05-30"
    >
      <p>Tabata is a four-minute exercise protocol that alternates 20 seconds of all-out work with 10 seconds of rest, repeated for eight rounds. It is named after Dr. Izumi Tabata, the Japanese researcher who studied it on the Japanese national speed skating team in 1996.</p>
      <h2 className="text-xl text-foreground mt-8">Origins</h2>
      <p>In the early 1990s, Tabata and his colleagues at the National Institute of Fitness and Sports in Kanoya, Japan, worked with head coach Irisawa Koichi to test a high-intensity intermittent training format. The protocol they settled on — eight rounds of 20 seconds work / 10 seconds rest — produced striking results in a 1996 paper published in <em>Medicine & Science in Sports & Exercise</em>. After six weeks, the Tabata group improved both their VO2 max (aerobic capacity) and their anaerobic capacity, while a steady-state cardio control group improved only aerobically.</p>
      <h2 className="text-xl text-foreground mt-8">The science</h2>
      <p>The protocol works because the 10-second rest is too short to allow full recovery. Each subsequent round starts with elevated lactate and an oxygen deficit, forcing the body to recruit both aerobic and anaerobic systems simultaneously. To produce the published effect you must work at roughly 170% of VO2 max during the work intervals — meaning genuinely maximal effort, not a comfortable jog.</p>
      <p>The original study used a stationary bike. The protocol has since been adapted to almost any cyclical movement: burpees, squat jumps, kettlebell swings, assault bike, rower, push-ups. The key constraint is choosing a movement you can hold at near-maximum intensity for 20 seconds without losing form.</p>
      <h2 className="text-xl text-foreground mt-8">How to do it</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Pick one cyclical movement. Burpees and squat jumps are the canonical bodyweight choices.</li>
        <li>Warm up for 5–10 minutes. Tabata is brutal; cold tissue snaps.</li>
        <li>Set a timer for 20s work / 10s rest, 8 rounds. <Link to="/tabata" className="underline">Stint's Tabata timer</Link> is pre-configured.</li>
        <li>Go all out for every 20-second interval. If you can pace it, you are not working hard enough.</li>
        <li>Rest at least 5–10 minutes (or finish the session) before doing another round.</li>
      </ol>
      <h2 className="text-xl text-foreground mt-8">Common misconceptions</h2>
      <p><strong>"Any 20/10 workout is Tabata."</strong> Strictly speaking, only the protocol performed at maximum intensity counts. A moderate 20/10 set is a useful interval workout, but it is not "Tabata" in the research sense.</p>
      <p><strong>"Four minutes is enough exercise."</strong> The original study compared Tabata to steady-state cardio specifically for VO2 max gains. It does not replace strength training, mobility work, or volume cardio.</p>
      <h2 className="text-xl text-foreground mt-8">When to use it</h2>
      <p>Tabata fits well as a finisher at the end of a training session, or as a standalone protocol when you have no time and need a hard cardiovascular hit. Once or twice a week is plenty for most people; the recovery demand is significant.</p>
      <p>Want to try it now? <Link to="/tabata" className="underline">Open the Tabata timer</Link>.</p>
    </GuideLayout>
  );
}