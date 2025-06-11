
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
  onToggleSettings?: () => void;
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
  onResetTimer,
  onToggleSettings
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
  const shouldWorkPulse = isRunning && timerState === 'work';
  const shouldRestPulse = isRunning && timerState === 'rest';

  // Format time with custom colon styling for fullscreen
  const formatTimeWithCustomColon = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const [minutes, secsFormatted] = timeString.split(':');
    
    return (
      <>
        {minutes}
        <span style={{ fontSize: '0.6em', verticalAlign: 'middle' }}>:</span>
        {secsFormatted}
      </>
    );
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 w-screen h-screen flex flex-col overflow-hidden opacity-0 translate-y-2 animate-[fade-in-up_400ms_ease-out_forwards]">
        {/* Background Layer with Animation */}
        <div 
          className={`absolute inset-0 ${shouldWorkPulse ? 'animate-work-pulse' : shouldRestPulse ? 'animate-rest-pulse' : ''}`}
          style={shouldWorkPulse || shouldRestPulse ? {} : { backgroundColor }}
        />
        
        {/* Content Layer - Responsive design for different screen sizes */}
        <div className="relative z-10 w-full h-full flex flex-col min-h-0">
          {/* Desktop Layout (xl and above) */}
          <div className="hidden xl:flex xl:flex-col xl:h-full xl:p-8">
            {/* Top Section - Progress Bars and Remaining Time */}
            <div className="flex justify-between items-start flex-shrink-0 mb-6">
              {/* Progress Bars - Top Left */}
              <div className="flex-1 max-w-md">
                <ProgressBars 
                  currentSet={currentSet}
                  currentRound={currentRound}
                  totalSets={totalSets}
                  totalRounds={totalRounds}
                />
              </div>

              {/* Remaining Time - Top Right */}
              <div className="text-right">
                <div className="text-base font-normal mb-1" style={{ color: '#0000004d' }}>
                  Remaining time
                </div>
                <div className="text-3xl font-jetbrains-mono" style={{ letterSpacing: '-0.01em', fontWeight: '400' }}>
                  {formatTimeWithCustomColon(remainingTime)}
                </div>
              </div>
            </div>

            {/* Center Section - Main Timer Display */}
            <div className="flex-1 flex items-center justify-center min-h-0 py-4">
              <TimerMainDisplay
                currentTime={currentTime}
                timerState={timerState}
                isRunning={isRunning}
                workTime={workTime}
                isFullscreen={isFullscreen}
              />
            </div>

            {/* Bottom Section - Cycles and Controls */}
            <div className="flex justify-between items-end flex-shrink-0 mt-6">
              {/* Cycles - Bottom Left */}
              <div>
                <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
                  Cycles
                </div>
                <div 
                  className="text-3xl font-jetbrains-mono"
                  style={{ letterSpacing: '-0.01em', fontWeight: '400' }}
                >
                  {(currentSet - 1) * totalRounds + currentRound}/{totalRounds * totalSets}
                </div>
              </div>

              {/* Controls - Bottom Right */}
              <div>
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

          {/* Tablet Layout (md to lg) - iPad specific optimizations with proper bottom spacing */}
          <div className="md:flex md:flex-col md:h-full xl:hidden p-4 md:p-6 lg:p-8">
            {/* Top Section - Progress Bars and Remaining Time */}
            <div className="flex justify-between items-start flex-shrink-0 mb-4 lg:mb-6">
              {/* Progress Bars - Top Left */}
              <div className="flex-1 max-w-[240px] lg:max-w-[280px]">
                <ProgressBars 
                  currentSet={currentSet}
                  currentRound={currentRound}
                  totalSets={totalSets}
                  totalRounds={totalRounds}
                />
              </div>

              {/* Remaining Time - Top Right */}
              <div className="text-right">
                <div className="text-sm lg:text-base font-normal mb-1" style={{ color: '#0000004d' }}>
                  Remaining time
                </div>
                <div className="text-xl lg:text-2xl font-jetbrains-mono" style={{ letterSpacing: '-0.01em', fontWeight: '400' }}>
                  {formatTimeWithCustomColon(remainingTime)}
                </div>
              </div>
            </div>

            {/* Center Section - Main Timer Display (flexible height but constrained) */}
            <div className="flex-1 flex items-center justify-center min-h-0 py-2 lg:py-4">
              <TimerMainDisplay
                currentTime={currentTime}
                timerState={timerState}
                isRunning={isRunning}
                workTime={workTime}
                isFullscreen={isFullscreen}
              />
            </div>

            {/* Bottom Section - Cycles and Controls with consistent spacing */}
            <div className="flex justify-between items-end flex-shrink-0 mt-4 lg:mt-6 mb-6 lg:mb-8">
              {/* Cycles - Bottom Left */}
              <div>
                <div className="text-sm lg:text-base font-normal mb-1 lg:mb-2" style={{ color: '#0000004d' }}>
                  Cycles
                </div>
                <div 
                  className="text-xl lg:text-2xl font-jetbrains-mono"
                  style={{ letterSpacing: '-0.01em', fontWeight: '400' }}
                >
                  {(currentSet - 1) * totalRounds + currentRound}/{totalRounds * totalSets}
                </div>
              </div>

              {/* Controls - Bottom Right */}
              <div>
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

          {/* Mobile Layout (below md) */}
          <div className="md:hidden flex flex-col h-full p-4">
            {/* Top section - Progress bars and remaining time */}
            <div className="flex justify-between items-start mb-4 flex-shrink-0">
              <div className="flex-1 max-w-[180px]">
                <ProgressBars 
                  currentSet={currentSet}
                  currentRound={currentRound}
                  totalSets={totalSets}
                  totalRounds={totalRounds}
                />
              </div>
              <div className="text-right">
                <div className="text-xs font-normal mb-1" style={{ color: '#0000004d' }}>
                  Remaining time
                </div>
                <div className="text-base font-jetbrains-mono" style={{ letterSpacing: '-0.01em', fontWeight: '400' }}>
                  {formatTimeWithCustomColon(remainingTime)}
                </div>
              </div>
            </div>

            {/* Center section - Timer display */}
            <div className="flex-1 flex items-center justify-center min-h-0 py-2">
              <TimerMainDisplay
                currentTime={currentTime}
                timerState={timerState}
                isRunning={isRunning}
                workTime={workTime}
                isFullscreen={false}
              />
            </div>

            {/* Bottom section - Cycles and Controls */}
            <div className="flex justify-between items-end flex-shrink-0 pt-2 pb-4">
              <div>
                <div className="text-xs font-normal mb-1" style={{ color: '#0000004d' }}>
                  Cycles
                </div>
                <div 
                  className="text-base font-jetbrains-mono"
                  style={{ letterSpacing: '-0.01em', fontWeight: '400' }}
                >
                  {(currentSet - 1) * totalRounds + currentRound}/{totalRounds * totalSets}
                </div>
              </div>
              
              <div>
                <TimerControls
                  isRunning={isRunning}
                  timerState={timerState}
                  isFullscreen={isFullscreen}
                  onToggleTimer={onToggleTimer}
                  onResetTimer={onResetTimer}
                  onToggleFullscreen={toggleFullscreen}
                  onToggleSettings={onToggleSettings}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile Layout (updated with better viewport adaptation)
  return (
    <div className="lg:col-span-2 h-full flex flex-col relative min-h-0 overflow-hidden">
      {/* Background Layer with Animation */}
      <div 
        className={`absolute inset-0 ${shouldWorkPulse ? 'animate-work-pulse' : shouldRestPulse ? 'animate-rest-pulse' : ''}`}
        style={shouldWorkPulse || shouldRestPulse ? {} : { backgroundColor }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Mobile Card Layout - Better space distribution */}
        <div className="md:hidden flex-1 flex flex-col p-4 min-h-0">
          {/* Top section - Progress bars and remaining time */}
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="flex-1 max-w-[200px]">
              <ProgressBars 
                currentSet={currentSet}
                currentRound={currentRound}
                totalSets={totalSets}
                totalRounds={totalRounds}
              />
            </div>
            <div className="text-right">
              <div className="text-sm font-normal mb-1" style={{ color: '#0000004d' }}>
                Remaining time
              </div>
              <div className="text-lg font-jetbrains-mono" style={{ letterSpacing: '-0.01em', fontWeight: '400' }}>
                {formatTimeWithCustomColon(remainingTime)}
              </div>
            </div>
          </div>

          {/* Center section - Timer display (perfectly centered and flexible) */}
          <div className="flex-1 flex items-center justify-center min-h-0 py-2">
            <TimerMainDisplay
              currentTime={currentTime}
              timerState={timerState}
              isRunning={isRunning}
              workTime={workTime}
              isFullscreen={false}
            />
          </div>

          {/* Bottom section - Cycles and Controls (always visible) */}
          <div className="flex justify-between items-end flex-shrink-0 pt-2">
            <div>
              <div className="text-sm font-normal mb-1" style={{ color: '#0000004d' }}>
                Cycles
              </div>
              <div 
                className="text-xl font-jetbrains-mono"
                style={{ letterSpacing: '-0.01em', fontWeight: '400' }}
              >
                {(currentSet - 1) * totalRounds + currentRound}/{totalRounds * totalSets}
              </div>
            </div>
            
            {/* Vertical Button Stack - aligned with Cycles */}
            <div>
              <TimerControls
                isRunning={isRunning}
                timerState={timerState}
                isFullscreen={isFullscreen}
                onToggleTimer={onToggleTimer}
                onResetTimer={onResetTimer}
                onToggleFullscreen={toggleFullscreen}
                onToggleSettings={onToggleSettings}
                isMobile={true}
              />
            </div>
          </div>
        </div>

        {/* Tablet/Desktop Layout - Keep existing layout */}
        <div className="hidden md:flex md:flex-col md:h-full md:p-4 lg:p-8">
          <TimerInfo
            remainingTime={remainingTime}
            currentSet={currentSet}
            currentRound={currentRound}
            totalSets={totalSets}
            totalRounds={totalRounds}
            isFullscreen={isFullscreen}
          />

          <div className="mr-20 md:mr-32 lg:mr-48 mb-4 flex-shrink-0">
            <ProgressBars 
              currentSet={currentSet}
              currentRound={currentRound}
              totalSets={totalSets}
              totalRounds={totalRounds}
            />
          </div>

          <div className="flex-1 flex items-center justify-center min-h-0 py-4 -mt-16">
            <TimerMainDisplay
              currentTime={currentTime}
              timerState={timerState}
              isRunning={isRunning}
              workTime={workTime}
              isFullscreen={isFullscreen}
            />
          </div>

          <div className="flex justify-between items-end flex-shrink-0 pt-4">
            <div>
              <div className="text-sm md:text-base font-normal mb-2" style={{ color: '#0000004d' }}>
                Cycles
              </div>
              <div 
                className="text-xl md:text-2xl lg:text-4xl font-jetbrains-mono"
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
      </div>
    </div>
  );
};

export default TimerDisplay;
