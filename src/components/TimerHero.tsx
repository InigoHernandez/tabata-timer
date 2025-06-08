import React from 'react';
interface TimerHeroProps {
  hideInFullscreen?: boolean;
}
const TimerHero = ({
  hideInFullscreen = false
}: TimerHeroProps) => {
  if (hideInFullscreen) return null;
  return <div className="flex justify-between items-start mb-6 md:mb-12 animate-fade-in">
      <div className="text-left">
        
      </div>
      <div className="text-right max-w-md">
        <p className="font-light text-lg leading-relaxed md:text-xl">
          Effective intervals for busy lives.
          <br />
          <span style={{
          color: '#0000004d'
        }}>Train smart, see results fast.</span>
        </p>
      </div>
    </div>;
};
export default TimerHero;