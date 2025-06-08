
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
            className={`md:h-6 w-[2px] transition-all duration-300 ease-out ${
              isActive ? 'bg-foreground scale-110 opacity-100 h-12' : 
              isCompleted ? 'bg-muted-foreground scale-100 opacity-100 h-4' : 
              'bg-[#B2B2B3] scale-100 opacity-50 h-4'
            }`}
          />
        );
      }
      
      bars.push(
        <div 
          key={set} 
          className="flex gap-1 transition-opacity duration-300 ease-out opacity-100"
        >
          {setBars}
        </div>
      );
      
      if (set < totalSets) {
        bars.push(
          <div 
            key={`rest-${set}`} 
            className="flex items-center justify-center w-2 h-4 md:h-6 flex-shrink-0 transition-opacity duration-300 ease-out opacity-100"
          >
            <span className="text-xs font-medium opacity-60">R</span>
          </div>
        );
      }
    }
    
    return bars;
  };

  return (
    <div className="mb-4 md:mb-8 h-16 md:h-18 flex items-start overflow-hidden transition-all duration-300">
      <div 
        className="flex gap-1 md:gap-2 items-start justify-start flex-wrap transition-opacity duration-300 ease-out max-h-16 md:max-h-18"
        key={`bars-${totalSets}-${totalRounds}`}
      >
        {renderProgressBars()}
      </div>
    </div>
  );
};

export default ProgressBars;
