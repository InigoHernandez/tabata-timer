
import React from 'react';
import ProgressBars from './ProgressBars';

type TimerState = 'idle' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerDisplayProps {
  currentTime: number;
  currentRound: number;
  currentSet: number;
  timerState: TimerState;
  isRunning: boolean;
  totalSets: number;
  totalRounds: number;
}

const TimerDisplay = ({ 
  currentTime, 
  currentRound, 
  currentSet, 
  timerState, 
  isRunning, 
  totalSets, 
  totalRounds 
}: TimerDisplayProps) => {
  const formatTimeDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStateText = () => {
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
      return 'PAUSED';
    }
    
    switch (timerState) {
      case 'work':
        return 'WORK';
      case 'rest':
        return 'REST';
      case 'setRest':
        return 'SET REST';
      case 'finished':
        return 'FINISHED';
      default:
        return 'READY';
    }
  };

  const getCurrentCycleNumber = () => (currentSet - 1) * totalRounds + currentRound;
  const getTotalCycles = () => totalRounds * totalSets;

  return (
    <div className="lg:col-span-2 p-8 flex flex-col justify-center">
      <ProgressBars 
        currentSet={currentSet}
        currentRound={currentRound}
        totalSets={totalSets}
        totalRounds={totalRounds}
      />

      <div className="space-y-6">
        <div className="text-left">
          <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wider">
            {getStateText()}
          </div>
          <div className="text-9xl font-light tracking-tighter font-roboto-mono">
            {formatTimeDisplay(currentTime)}
          </div>
        </div>

        <div className="text-left">
          <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wider">
            CYCLES
          </div>
          <div className="text-4xl font-light font-roboto-mono">
            {getCurrentCycleNumber()}/{getTotalCycles()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
