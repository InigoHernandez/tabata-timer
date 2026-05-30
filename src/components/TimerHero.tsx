import React from 'react';
import ThemeToggle from './ThemeToggle';
interface TimerHeroProps {
  hideInFullscreen?: boolean;
}
const TimerHero = ({
  hideInFullscreen = false
}: TimerHeroProps) => {
  if (hideInFullscreen) return null;
  return <div className="flex justify-between items-center mb-4 md:mb-6 animate-fade-in">
      <div className="text-left max-w-md">
        <p className="font-light text-lg leading-relaxed md:text-xl px-[4px] py-0">
          tabata{' '}
          <span className="text-foreground/30">
            minimalist HIIT timer
          </span>
        </p>
      </div>
      <div className="flex items-center pr-1">
        <ThemeToggle />
      </div>
    </div>;
};
export default TimerHero;