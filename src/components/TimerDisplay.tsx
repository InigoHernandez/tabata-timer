
import React from 'react';
import ProgressBars from './ProgressBars';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCcw } from 'lucide-react';

type TimerState = 'idle' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerDisplayProps {
  currentTime: number;
  currentRound: number;
  currentSet: number;
  timerState: TimerState;
  isRunning: boolean;
  totalSets: number;
  totalRounds: number;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

const TimerDisplay = ({ 
  currentTime, 
  currentRound, 
  currentSet, 
  timerState, 
  isRunning, 
  totalSets, 
  totalRounds,
  onToggleTimer,
  onResetTimer
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

      <div className="flex-1 flex items-center justify-center">
        <div className="text-left">
          <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
            {getStateText()}
          </div>
          <div className="text-[12rem] font-extralight tracking-tighter font-roboto-mono leading-none">
            {formatTimeDisplay(currentTime)}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
            Cycles
          </div>
          <div className="text-4xl font-light font-roboto-mono">
            {getCurrentCycleNumber()}/{getTotalCycles()}
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={onResetTimer} 
            size="lg" 
            variant="outline" 
            className="w-16 h-16 rounded-md p-0"
          >
            <RefreshCcw className="w-8 h-8" />
          </Button>
          
          <Button 
            onClick={onToggleTimer} 
            size="lg" 
            className="w-16 h-16 rounded-md p-0 bg-foreground text-background hover:bg-foreground/90"
            disabled={timerState === 'finished'}
          >
            {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
