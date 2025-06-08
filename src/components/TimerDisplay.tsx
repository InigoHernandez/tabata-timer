
import React, { useState, useEffect } from 'react';
import ProgressBars from './ProgressBars';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCcw, Maximize, Minimize } from 'lucide-react';

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

  const formatTimeDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStateText = () => {
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
      return 'Paused';
    }
    
    switch (timerState) {
      case 'countdown':
        return 'Get ready';
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

  const getStateColor = () => {
    switch (timerState) {
      case 'work':
        return 'text-green-600';
      case 'rest':
      case 'setRest':
        return 'text-blue-600';
      case 'countdown':
        return 'text-[#FF6B35]';
      case 'finished':
        return 'text-purple-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCurrentCycleNumber = () => (currentSet - 1) * totalRounds + currentRound;
  const getTotalCycles = () => totalRounds * totalSets;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (isFullscreen) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col p-8 animate-fade-in">
        {/* Remaining time in top right */}
        <div className="absolute top-8 right-8 text-right z-10">
          <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
            Remaining time
          </div>
          <div className="text-2xl md:text-4xl font-light font-roboto-mono">
            {formatTime(remainingTime)}
          </div>
        </div>

        {/* Progress bars */}
        <div className="mr-32 md:mr-48">
          <ProgressBars 
            currentSet={currentSet}
            currentRound={currentRound}
            totalSets={totalSets}
            totalRounds={totalRounds}
          />
        </div>

        {/* Main timer display */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div 
              className={`text-xl md:text-2xl font-normal mb-6 transition-all duration-300 ${getStateColor()}`}
              key={`${timerState}-${isRunning}`}
            >
              {getStateText()}
            </div>
            <div 
              className="text-[8rem] md:text-[16rem] lg:text-[20rem] font-extralight tracking-tighter font-roboto-mono leading-none animate-fade-in"
              key={`time-${timerState}-transition`}
            >
              {timerState === 'countdown' ? currentTime : formatTimeDisplay(currentTime)}
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
              Cycles
            </div>
            <div 
              className="text-2xl md:text-4xl font-light font-roboto-mono transition-all duration-300"
              key={`cycles-${getCurrentCycleNumber()}`}
            >
              {getCurrentCycleNumber()}/{getTotalCycles()}
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Button 
              onClick={toggleFullscreen} 
              size="lg" 
              variant="outline" 
              className="w-12 h-12 md:w-16 md:h-16 rounded-md p-0 active:scale-95 transition-transform duration-100"
            >
              <Minimize className="w-6 h-6 md:w-8 md:h-8" />
            </Button>
            
            <Button 
              onClick={onResetTimer} 
              size="lg" 
              variant="outline" 
              className="w-12 h-12 md:w-16 md:h-16 rounded-md p-0 active:scale-95 transition-transform duration-100"
            >
              <RefreshCcw className="w-6 h-6 md:w-8 md:h-8" />
            </Button>
            
            <Button 
              onClick={onToggleTimer} 
              size="lg" 
              className="w-12 h-12 md:w-16 md:h-16 rounded-md p-0 bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-transform duration-100"
              disabled={timerState === 'finished'}
            >
              {isRunning ? <Pause className="w-6 h-6 md:w-8 md:h-8 fill-current" /> : <Play className="w-6 h-6 md:w-8 md:h-8 fill-current" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 p-4 md:p-8 flex flex-col bg-white relative animate-fade-in">
      {/* Remaining time in top right with proper spacing */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 text-right z-10">
        <div className="text-sm md:text-base font-normal mb-2" style={{ color: '#0000004d' }}>
          Remaining time
        </div>
        <div className="text-2xl md:text-4xl font-light font-roboto-mono">
          {formatTime(remainingTime)}
        </div>
      </div>

      {/* Progress bars with proper margin to avoid overlap */}
      <div className="mr-24 md:mr-48 mb-4">
        <ProgressBars 
          currentSet={currentSet}
          currentRound={currentRound}
          totalSets={totalSets}
          totalRounds={totalRounds}
        />
      </div>

      <div className="flex-1 flex items-center justify-center -mt-4 md:-mt-10">
        <div className="text-left">
          <div 
            className={`text-base md:text-lg font-normal mb-4 transition-all duration-300 ${getStateColor()}`}
            key={`${timerState}-${isRunning}`}
          >
            {getStateText()}
          </div>
          <div 
            className="text-[8rem] md:text-[14rem] font-extralight tracking-tighter font-roboto-mono leading-none animate-fade-in"
            key={`time-${timerState}-transition`}
          >
            {timerState === 'countdown' ? currentTime : formatTimeDisplay(currentTime)}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm md:text-base font-normal mb-2" style={{ color: '#0000004d' }}>
            Cycles
          </div>
          <div 
            className="text-2xl md:text-4xl font-light font-roboto-mono transition-all duration-300"
            key={`cycles-${getCurrentCycleNumber()}`}
          >
            {getCurrentCycleNumber()}/{getTotalCycles()}
          </div>
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
          <Button 
            onClick={toggleFullscreen} 
            size="lg" 
            variant="outline" 
            className="w-12 h-12 md:w-16 md:h-16 rounded-md p-0 active:scale-95 transition-transform duration-100"
          >
            <Maximize className="w-6 h-6 md:w-8 md:h-8" />
          </Button>
          
          <Button 
            onClick={onResetTimer} 
            size="lg" 
            variant="outline" 
            className="w-12 h-12 md:w-16 md:h-16 rounded-md p-0 active:scale-95 transition-transform duration-100"
          >
            <RefreshCcw className="w-6 h-6 md:w-8 md:h-8" />
          </Button>
          
          <Button 
            onClick={onToggleTimer} 
            size="lg" 
            className="w-12 h-12 md:w-16 md:h-16 rounded-md p-0 bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-transform duration-100"
            disabled={timerState === 'finished'}
          >
            {isRunning ? <Pause className="w-6 h-6 md:w-8 md:h-8 fill-current" /> : <Play className="w-6 h-6 md:w-8 md:h-8 fill-current" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
