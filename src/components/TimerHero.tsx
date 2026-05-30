import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className="font-light text-lg leading-relaxed md:text-xl px-[4px] py-0 inline-block hover:opacity-80 transition-opacity">
          stint{' '}
          <span className="text-foreground/60">
            {subtitle}
          </span>
        </Link>
      </div>
      <div className="flex items-center pr-1">
        <ThemeToggle />
      </div>
    </div>;
};
export default TimerHero;