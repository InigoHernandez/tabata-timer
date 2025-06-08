
import React, { useState, useEffect } from 'react';
import ProgressBars from './ProgressBars';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RefreshCcw, Maximize, Minimize, Hourglass, Dumbbell } from 'lucide-react';

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

  const getStateInfo = () => {
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') {
      return { text: 'PAUSED', color: 'bg-yellow-500', icon: Pause };
    }
    
    switch (timerState) {
      case 'idle':
        return { text: 'READY', color: 'bg-gray-400', icon: Hourglass };
      case 'countdown':
        return { text: 'GET READY', color: 'bg-orange-500', icon: Bolt };
      case 'work':
        return { text: 'WORK', color: 'bg-green-500', icon: Dumbbell };
      case 'rest':
        return { text: 'REST', color: 'bg-blue-500', icon: Pause };
      case 'setRest':
        return { text: 'SET REST', color: 'bg-blue-600', icon: Pause };
      case 'finished':
        return { text: 'FINISHED', color: 'bg-purple-500', icon: Bolt };
      default:
        return { text: 'READY', color: 'bg-gray-400', icon: Hourglass };
    }
  };

  // Import Bolt icon for countdown and finished states
  const Bolt = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 2L4.5 11h5v9l7-9h-5V2z"/>
    </svg>
  );

  const getCurrentCycleNumber = () => (currentSet - 1) * totalRounds + currentRound;
  const getTotalCycles = () => totalRounds * totalSets;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Get the display time - for idle state, show work time instead of current time
  const getDisplayTime = () => {
    if (timerState === 'idle') {
      return workTime;
    }
    return timerState === 'countdown' ? currentTime : currentTime;
  };

  const stateInfo = getStateInfo();
  const StateIcon = stateInfo.icon;

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col p-8 animate-fade-in overflow-hidden z-50">
        <div className="absolute top-8 right-8 text-right z-10">
          <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
            Remaining time
          </div>
          <div className="text-2xl md:text-4xl font-light font-roboto-mono">
            {formatTime(remainingTime)}
          </div>
        </div>

        <div className="mr-32 md:mr-48 flex-shrink-0">
          <ProgressBars 
            currentSet={currentSet}
            currentRound={currentRound}
            totalSets={totalSets}
            totalRounds={totalRounds}
          />
        </div>

        <div className="flex-1 flex items-center justify-center min-h-0 -mt-8">
          <div className="text-center">
            <Badge 
              className={`${stateInfo.color} text-white mb-6 px-4 py-2 text-lg font-medium flex items-center gap-2 mx-auto w-fit transition-all duration-300 rounded-lg`}
              key={`${timerState}-${isRunning}`}
            >
              <StateIcon className="w-4 h-4 fill-current" />
              {stateInfo.text}
            </Badge>
            <div 
              className="text-[8rem] md:text-[16rem] lg:text-[20rem] font-extralight tracking-tighter font-roboto-mono leading-none animate-fade-in"
              key={`time-${timerState}-transition`}
            >
              {formatTimeDisplay(getDisplayTime())}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end flex-shrink-0 pb-8">
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
    <div className="lg:col-span-2 p-4 md:p-8 flex flex-col bg-white relative animate-fade-in min-h-0 overflow-y-auto">
      <div className="absolute top-4 right-4 md:top-8 md:right-8 text-right z-10">
        <div className="text-sm md:text-base font-normal mb-2" style={{ color: '#0000004d' }}>
          Remaining time
        </div>
        <div className="text-xl md:text-2xl lg:text-4xl font-light font-roboto-mono">
          {formatTime(remainingTime)}
        </div>
      </div>

      <div className="mr-20 md:mr-32 lg:mr-48 mb-4 flex-shrink-0">
        <ProgressBars 
          currentSet={currentSet}
          currentRound={currentRound}
          totalSets={totalSets}
          totalRounds={totalRounds}
        />
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 py-4 -mt-4">
        <div className="text-center">
          <Badge 
            className={`${stateInfo.color} text-white mb-4 px-3 py-1 text-sm font-medium flex items-center gap-2 mx-auto w-fit transition-all duration-300 rounded-lg`}
            key={`${timerState}-${isRunning}`}
          >
            <StateIcon className="w-4 h-4 fill-current" />
            {stateInfo.text}
          </Badge>
          <div 
            className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-extralight tracking-tighter font-roboto-mono leading-none animate-fade-in"
            key={`time-${timerState}-transition`}
          >
            {formatTimeDisplay(getDisplayTime())}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end flex-shrink-0 pt-4">
        <div>
          <div className="text-sm md:text-base font-normal mb-2" style={{ color: '#0000004d' }}>
            Cycles
          </div>
          <div 
            className="text-xl md:text-2xl lg:text-4xl font-light font-roboto-mono transition-all duration-300"
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
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-md p-0 active:scale-95 transition-transform duration-100"
          >
            <Maximize className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </Button>
          
          <Button 
            onClick={onResetTimer} 
            size="lg" 
            variant="outline" 
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-md p-0 active:scale-95 transition-transform duration-100"
          >
            <RefreshCcw className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </Button>
          
          <Button 
            onClick={onToggleTimer} 
            size="lg" 
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-md p-0 bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-transform duration-100"
            disabled={timerState === 'finished'}
          >
            {isRunning ? <Pause className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 fill-current" /> : <Play className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 fill-current" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
