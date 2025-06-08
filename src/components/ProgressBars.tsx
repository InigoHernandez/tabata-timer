
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
    const totalElements = totalSets * totalRounds + (totalSets - 1); // rounds + rest indicators
    const maxBarWidth = Math.max(2, Math.floor((100 - (totalSets - 1) * 2) / totalElements)); // Responsive width with minimum
    
    for (let set = 1; set <= totalSets; set++) {
      const setBars = [];
      for (let round = 1; round <= totalRounds; round++) {
        const isActive = set === currentSet && round === currentRound;
        const isCompleted = set < currentSet || (set === currentSet && round < currentRound);
        
        setBars.push(
          <div
            key={`${set}-${round}`}
            className={`h-8 ${
              isActive ? 'bg-foreground' : 
              isCompleted ? 'bg-muted-foreground' : 
              'bg-border'
            }`}
            style={{ width: `${maxBarWidth}px`, minWidth: '2px' }}
          />
        );
      }
      
      bars.push(
        <div key={set} className="flex gap-1">
          {setBars}
        </div>
      );
      
      if (set < totalSets) {
        bars.push(
          <div key={`rest-${set}`} className="flex items-center justify-center w-8 h-8 flex-shrink-0">
            <span className="text-sm font-medium">R</span>
          </div>
        );
      }
    }
    
    return bars;
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4 items-center justify-start overflow-x-auto">
        {renderProgressBars()}
      </div>
    </div>
  );
};

export default ProgressBars;
