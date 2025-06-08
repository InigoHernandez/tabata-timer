
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

  if (isFullscreen) {
    return (
      <div 
        className="fixed inset-0 w-full h-full flex flex-col p-8 pb-8 overflow-hidden z-50 animate-fade-in transition-colors duration-500"
        style={{ backgroundColor, height: '100vh', width: '100vw' }}
      >
        <TimerInfo
          remainingTime={remainingTime}
          currentSet={currentSet}
          currentRound={currentRound}
          totalSets={totalSets}
          totalRounds={totalRounds}
          isFullscreen={true}
        />

        <div className="mr-32 md:mr-48 flex-shrink-0 animate-fade-in">
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
          isFullscreen={true}
        />

        <div className="flex justify-between items-end flex-shrink-0 animate-fade-in">
          <div>
            <div className="text-sm md:text-base font-normal mb-2 transition-all duration-500" style={{ color: '#0000004d' }}>
              Cycles
            </div>
            <div 
              className="text-2xl md:text-4xl font-roboto-mono transition-all duration-500"
              style={{ letterSpacing: '-0.01em', fontWeight: '400' }}
            >
              {(currentSet - 1) * totalRounds + currentRound}/{totalRounds * totalSets}
            </div>
          </div>

          <TimerControls
            isRunning={isRunning}
            timerState={timerState}
            isFullscreen={true}
            onToggleTimer={onToggleTimer}
            onResetTimer={onResetTimer}
            onToggleFullscreen={toggleFullscreen}
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="lg:col-span-2 p-4 md:p-8 flex flex-col relative min-h-0 overflow-y-auto animate-fade-in transition-colors duration-500"
      style={{ backgroundColor }}
    >
      <TimerInfo
        remainingTime={remainingTime}
        currentSet={currentSet}
        currentRound={currentRound}
        totalSets={totalSets}
        totalRounds={totalRounds}
        isFullscreen={false}
      />

      <div className="mr-20 md:mr-32 lg:mr-48 mb-4 flex-shrink-0 animate-fade-in">
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
        isFullscreen={false}
      />

      <div className="flex justify-between items-end flex-shrink-0 pt-4 animate-fade-in">
        <div>
          <div className="text-sm md:text-base font-normal mb-2 transition-all duration-500" style={{ color: '#0000004d' }}>
            Cycles
          </div>
          <div 
            className="text-xl md:text-2xl lg:text-4xl font-roboto-mono transition-all duration-500"
            style={{ letterSpacing: '-0.01em', fontWeight: '400' }}
          >
            {(currentSet - 1) * totalRounds + currentRound}/{totalRounds * totalSets}
          </div>
        </div>

        <TimerControls
          isRunning={isRunning}
          timerState={timerState}
          isFullscreen={false}
          onToggleTimer={onToggleTimer}
          onResetTimer={onResetTimer}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
