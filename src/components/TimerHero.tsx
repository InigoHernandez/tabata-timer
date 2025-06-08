
import React from 'react';

const TimerHero = () => {
  return (
    <div className="flex justify-between items-start mb-6 md:mb-12 animate-fade-in">
      <div className="text-left">
        <div className="text-[#FF6B35] text-xs font-medium tracking-wider mb-4">
          TABAT.APP — HIGH INTENSITY TRAINING
        </div>
      </div>
      <div className="text-right max-w-md">
        <p className="font-light text-lg md:text-2xl leading-relaxed">
          Effective intervals for busy lives.
          <br />
          <span style={{ color: '#0000004d' }}>Train smart, see results fast.</span>
        </p>
      </div>
    </div>
  );
};

export default TimerHero;
