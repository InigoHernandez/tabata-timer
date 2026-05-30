import GuideLayout from '../GuideLayout';
import { Link } from 'react-router-dom';

export default function DeepWorkGuide() {
  return (
    <GuideLayout
      path="/guides/deep-work"
      title="Deep Work — Cal Newport's Framework, Explained | Stint"
      description="Deep Work is professional activity performed in a state of distraction-free concentration. Here's how to actually do it."
      h1="Deep Work"
      date="2026-05-30"
    >
      <p>"Deep work" is a phrase popularized by computer scientist Cal Newport in his 2016 book of the same name. He defines it as "professional activity performed in a state of distraction-free concentration that pushes your cognitive capabilities to their limit."</p>
      <h2 className="text-xl text-foreground mt-8">How to practise it</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Block time on your calendar. 60 to 120 minutes per block.</li>
        <li>Remove distractions before the block starts. Phone in another room, notifications off, one tab.</li>
        <li>Work on one cognitively demanding task.</li>
        <li>Stop when the block ends. Take a real break.</li>
      </ol>
      <p>Open the <Link to="/deep-work" className="underline">Deep Work timer</Link> to run a session.</p>
    </GuideLayout>
  );
}