import React from 'react';
import ThemeToggle from './ThemeToggle';
interface TimerHeroProps {
  hideInFullscreen?: boolean;
  subtitle?: string;
}
const TimerHero = ({
  hideInFullscreen = false,
  subtitle = '— minimalist timer'
}: TimerHeroProps) => {
  if (hideInFullscreen) return null;
  return <div className="flex justify-between items-center mb-4 md:mb-6 animate-fade-in">
      <div className="text-left max-w-md">
        <p className="font-light text-lg leading-relaxed md:text-xl px-[4px] py-0">
          <a href="/" className="hover:opacity-80 transition-opacity">stint</a>{' '}
          <span className="text-foreground/60">
            {subtitle}
          </span>
        </p>
      </div>
      <div className="flex items-center pr-1">
        <ThemeToggle />
      </div>
    </div>;
};
export default TimerHero;