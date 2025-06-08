
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCcw, Maximize, Minimize } from 'lucide-react';

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerControlsProps {
  isRunning: boolean;
  timerState: TimerState;
  isFullscreen: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onToggleFullscreen: () => void;
}

const TimerControls = ({
  isRunning,
  timerState,
  isFullscreen,
  onToggleTimer,
  onResetTimer,
  onToggleFullscreen
}: TimerControlsProps) => {
  const buttonSizes = isFullscreen
    ? "w-12 h-12 md:w-16 md:h-16"
    : "w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16";

  const iconSizes = isFullscreen
    ? "w-6 h-6 md:w-8 md:h-8"
    : "w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8";

  return (
    <div className={`flex ${isFullscreen ? 'gap-4' : 'gap-2 md:gap-4'} items-center transition-all duration-500`}>
      <Button 
        onClick={onToggleFullscreen} 
        size="lg" 
        variant="outline" 
        className={`${buttonSizes} rounded-md p-0 active:scale-95 transition-transform duration-100`}
      >
        {isFullscreen ? (
          <Minimize className={iconSizes} />
        ) : (
          <Maximize className={iconSizes} />
        )}
      </Button>
      
      <Button 
        onClick={onResetTimer} 
        size="lg" 
        variant="outline" 
        className={`${buttonSizes} rounded-md p-0 active:scale-95 transition-transform duration-100`}
      >
        <RefreshCcw className={iconSizes} />
      </Button>
      
      <Button 
        onClick={onToggleTimer} 
        size="lg" 
        className={`${buttonSizes} rounded-md p-0 bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-transform duration-100`}
        disabled={timerState === 'finished'}
      >
        {isRunning ? (
          <Pause className={`${iconSizes} fill-current`} />
        ) : (
          <Play className={`${iconSizes} fill-current`} />
        )}
      </Button>
    </div>
  );
};

export default TimerControls;
