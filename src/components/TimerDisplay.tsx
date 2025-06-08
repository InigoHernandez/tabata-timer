import React, { useState, useEffect } from 'react';
import ProgressBars from './ProgressBars';
import TimerControls from './TimerControls';
import TimerInfo from './TimerInfo';
import TimerMainDisplay from './TimerMainDisplay';
import { getBackgroundColor } from '@/utils/timerUtils';

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerDisplayProps {
  currentTime: number;
  currentRound: number;
  currentSet: number;
  timerState: TimerState;
  isRunning: boolean;
  totalSets: number;
  totalRounds: number;
  remainingTime: number;
  workTime: number;
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
  remainingTime,
  workTime,
  onToggleTimer,
  onResetTimer
}: TimerDisplayProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const backgroundColor = getBackgroundColor(isRunning, timerState);

  return (
    <div 
      className={`${isFullscreen ? 'col-span-3 w-screen h-screen p-8' : 'lg:col-span-2 p-4 md:p-8'} flex flex-col relative min-h-0 overflow-y-auto animate-fade-in transition-colors duration-500`}
      style={{ backgroundColor }}
    >
      <TimerInfo
        remainingTime={remainingTime}
        currentSet={currentSet}
        currentRound={currentRound}
        totalSets={totalSets}
        totalRounds={totalRounds}
        isFullscreen={isFullscreen}
      />

      <div className={`${isFullscreen ? 'mr-32 md:mr-48' : 'mr-20 md:mr-32 lg:mr-48'} mb-4 flex-shrink-0 animate-fade-in`}>
        <ProgressBars 
          currentSet={currentSet}
          currentRound={currentRound}
          totalSets={totalSets}
          totalRounds={totalRounds}
        />
      </div>

      <TimerMainDisplay
        currentTime={currentTime}
        timerState={timerState}
        isRunning={isRunning}
        workTime={workTime}
        isFullscreen={isFullscreen}
      />

      <div className="flex justify-between items-end flex-shrink-0 pt-4 animate-fade-in">
        <div>
          <div className={`${isFullscreen ? 'text-sm md:text-base' : 'text-sm md:text-base'} font-normal mb-2 transition-all duration-500`} style={{ color: '#0000004d' }}>
            Cycles
          </div>
          <div 
            className={`${isFullscreen ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl lg:text-4xl'} font-roboto-mono transition-all duration-500`}
            style={{ letterSpacing: '-0.01em', fontWeight: '400' }}
          >
            {(currentSet - 1) * totalRounds + currentRound}/{totalRounds * totalSets}
          </div>
        </div>

        <TimerControls
          isRunning={isRunning}
          timerState={timerState}
          isFullscreen={isFullscreen}
          onToggleTimer={onToggleTimer}
          onResetTimer={onResetTimer}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
