
import React from 'react';
interface TimerHeroProps {
  hideInFullscreen?: boolean;
}
const TimerHero = ({
  hideInFullscreen = false
}: TimerHeroProps) => {
  if (hideInFullscreen) return null;
  return <div className="flex justify-between items-start mb-4 md:mb-6 animate-fade-in">
      <div className="text-left max-w-md">
        <p className="font-light text-lg leading-relaxed md:text-xl">
          tabata{' '}
          <span style={{
          color: '#0000004d'
        }}>
            high intensity training timer
          </span>
        </p>
      </div>
      <div className="text-left">
        
      </div>
    </div>;
};
export default TimerHero;
