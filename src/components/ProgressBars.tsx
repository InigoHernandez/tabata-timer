
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
            className={`h-4 md:h-6 w-[2px] transition-all duration-300 ease-out transform ${
              isActive ? 'bg-foreground scale-110 opacity-100' : 
              isCompleted ? 'bg-muted-foreground scale-100 opacity-100' : 
              'bg-[#ABABAB] scale-100 opacity-100'
            }`}
            style={{
              transitionDelay: `${(set - 1) * totalRounds + (round - 1) * 20}ms`,
              animation: 'fadeInScale 0.3s ease-out forwards'
            }}
          />
        );
      }
      
      bars.push(
        <div 
          key={set} 
          className="flex gap-1 transition-all duration-300 ease-out opacity-100 transform"
          style={{
            animation: `fadeInScale 0.4s ease-out forwards`,
            animationDelay: `${(set - 1) * 50}ms`
          }}
        >
          {setBars}
        </div>
      );
      
      if (set < totalSets) {
        bars.push(
          <div 
            key={`rest-${set}`} 
            className="flex items-center justify-center w-2 h-4 md:h-6 flex-shrink-0 transition-all duration-300 ease-out opacity-100"
            style={{
              animation: `fadeInScale 0.3s ease-out forwards`,
              animationDelay: `${set * 100}ms`
            }}
          >
            <span className="text-xs font-medium opacity-60">R</span>
          </div>
        );
      }
    }
    
    return bars;
  };

  return (
    <div className="mb-4 md:mb-8 h-16 md:h-18 flex items-start overflow-hidden">
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes fadeOutScale {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateY(-5px);
          }
        }
      `}</style>
      <div 
        className="flex gap-1 md:gap-2 items-start justify-start flex-wrap transition-all duration-500 ease-out max-h-16 md:max-h-18"
        key={`bars-${totalSets}-${totalRounds}`}
      >
        {renderProgressBars()}
      </div>
    </div>
  );
};

export default ProgressBars;
