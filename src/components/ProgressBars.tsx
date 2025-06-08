
import React from 'react';

interface ProgressBarsProps {
  currentSet: number;
  currentRound: number;
  totalSets: number;
  totalRounds: number;
}

const ProgressBars = ({ currentSet, currentRound, totalSets, totalRounds }: ProgressBarsProps) => {
  const renderProgressBars = () => {
    const bars = [];
    
    for (let set = 1; set <= totalSets; set++) {
      const setBars = [];
      for (let round = 1; round <= totalRounds; round++) {
        const isActive = set === currentSet && round === currentRound;
        const isCompleted = set < currentSet || (set === currentSet && round < currentRound);
        
        setBars.push(
          <div
            key={`${set}-${round}`}
            className={`h-4 md:h-6 w-[2px] transition-all duration-500 ease-in-out transform ${
              isActive ? 'bg-foreground scale-110' : 
              isCompleted ? 'bg-muted-foreground scale-100' : 
              'bg-border scale-100'
            } animate-fade-in`}
          />
        );
      }
      
      bars.push(
        <div key={set} className="flex gap-1 transition-all duration-500 ease-in-out animate-fade-in transform">
          {setBars}
        </div>
      );
      
      if (set < totalSets) {
        bars.push(
          <div key={`rest-${set}`} className="flex items-center justify-center w-2 h-4 md:h-6 flex-shrink-0 transition-all duration-500 ease-in-out animate-fade-in">
            <span className="text-xs font-medium">R</span>
          </div>
        );
      }
    }
    
    return bars;
  };

  return (
    <div className="mb-4 md:mb-8 h-8 md:h-10 flex items-start">
      <div className="flex gap-1 md:gap-2 items-start justify-start overflow-x-auto flex-wrap transition-all duration-500 ease-in-out max-h-8 md:max-h-10">
        {renderProgressBars()}
      </div>
    </div>
  );
};

export default ProgressBars;
