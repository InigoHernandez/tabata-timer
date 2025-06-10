
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
            className={`w-1 h-4 md:h-6 transition-all duration-500 ease-out ${
              isActive ? 'bg-foreground scale-110 opacity-100' : 
              isCompleted ? 'bg-muted-foreground scale-100 opacity-100' : 
              'bg-[#B2B2B3] scale-100 opacity-50'
            }`}
          />
        );
      }
      
      bars.push(
        <div 
          key={set} 
          className="flex gap-1 transition-all duration-500 ease-out opacity-100"
        >
          {setBars}
        </div>
      );
      
      if (set < totalSets) {
        bars.push(
          <div 
            key={`rest-${set}`} 
            className="flex items-center justify-center w-2 h-4 md:h-6 flex-shrink-0 transition-all duration-500 ease-out opacity-100"
          >
            <span className="text-xs font-medium opacity-60 transition-opacity duration-500">R</span>
          </div>
        );
      }
    }
    
    return bars;
  };

  return (
    <div className="mb-4 md:mb-8 flex items-start overflow-hidden transition-all duration-500 ease-out animate-fade-in">
      <div 
        className="flex gap-1 md:gap-2 items-start justify-start flex-wrap transition-all duration-500 ease-out"
        style={{ 
          minHeight: '24px', // Fixed minimum height to prevent layout shift
          lineHeight: '24px'
        }}
        key={`bars-${totalSets}-${totalRounds}`}
      >
        {renderProgressBars()}
      </div>
    </div>
  );
};

export default ProgressBars;
