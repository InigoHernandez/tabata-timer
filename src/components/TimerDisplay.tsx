
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
      return 'Paused';
    }
    
    switch (timerState) {
      case 'work':
        return 'Work';
      case 'rest':
        return 'Rest';
      case 'setRest':
        return 'Set rest';
      case 'finished':
        return 'Finished';
      default:
        return 'Ready';
    }
  };

  const getCurrentCycleNumber = () => (currentSet - 1) * totalRounds + currentRound;
  const getTotalCycles = () => totalRounds * totalSets;

  return (
    <div className="lg:col-span-2 p-8 flex flex-col bg-white relative">
      <ProgressBars 
        currentSet={currentSet}
        currentRound={currentRound}
        totalSets={totalSets}
        totalRounds={totalRounds}
      />

      <div className="flex-1 flex items-center">
        <div className="text-left">
          <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
            {getStateText()}
          </div>
          <div className="text-[12rem] font-light tracking-tighter font-roboto-mono leading-none">
            {formatTimeDisplay(currentTime)}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8">
        <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
          Cycles
        </div>
        <div className="text-4xl font-light font-roboto-mono">
          {getCurrentCycleNumber()}/{getTotalCycles()}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
