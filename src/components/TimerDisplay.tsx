
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
        className="fixed inset-0 w-screen h-screen flex flex-col overflow-hidden animate-fade-in transition-colors duration-500"
        style={{ backgroundColor }}
      >
        {/* Top Section - Progress Bars and Remaining Time */}
        <div className="flex justify-between items-start p-8 flex-shrink-0">
          {/* Progress Bars - Top Left */}
          <div className="flex-1 max-w-md animate-fade-in">
            <ProgressBars 
              currentSet={currentSet}
              currentRound={currentRound}
              totalSets={totalSets}
              totalRounds={totalRounds}
            />
          </div>

          {/* Remaining Time - Top Right */}
          <div className="text-right animate-fade-in">
            <div className="text-sm md:text-base font-normal mb-2 transition-all duration-500" style={{ color: '#0000004d' }}>
              Remaining time
            </div>
            <div className="text-2xl md:text-4xl font-roboto-mono transition-all duration-500" style={{ letterSpacing: '-0.01em', fontWeight: '400' }}>
              {formatTime(remainingTime)}
            </div>
          </div>
        </div>

        {/* Center Section - Main Timer Display */}
        <div className="flex-1 flex items-center justify-center animate-fade-in">
          <TimerMainDisplay
            currentTime={currentTime}
            timerState={timerState}
            isRunning={isRunning}
            workTime={workTime}
            isFullscreen={isFullscreen}
          />
        </div>

        {/* Bottom Section - Cycles and Controls */}
        <div className="flex justify-between items-end p-8 flex-shrink-0">
          {/* Cycles - Bottom Left */}
          <div className="animate-fade-in">
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

          {/* Controls - Bottom Right */}
          <div className="animate-fade-in">
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
        isFullscreen={isFullscreen}
      />

      <div className="mr-20 md:mr-32 lg:mr-48 mb-4 flex-shrink-0 animate-fade-in">
        <ProgressBars 
          currentSet={currentSet}
          currentRound={currentRound}
          totalSets={totalSets}
          totalRounds={totalRounds}
        />
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 py-4 -mt-16 animate-fade-in">
        <TimerMainDisplay
          currentTime={currentTime}
          timerState={timerState}
          isRunning={isRunning}
          workTime={workTime}
          isFullscreen={isFullscreen}
        />
      </div>

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
          isFullscreen={isFullscreen}
          onToggleTimer={onToggleTimer}
          onResetTimer={onResetTimer}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>
    </div>
  );
};

// Helper function to format time
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default TimerDisplay;
