
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCcw, Maximize, Minimize, SlidersHorizontal } from 'lucide-react';

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerControlsProps {
  isRunning: boolean;
  timerState: TimerState;
  isFullscreen: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onToggleFullscreen: () => void;
  onToggleSettings?: () => void;
  isMobile?: boolean;
}

const TimerControls = ({
  isRunning,
  timerState,
  isFullscreen,
  onToggleTimer,
  onResetTimer,
  onToggleFullscreen,
  onToggleSettings,
  isMobile = false
}: TimerControlsProps) => {
  const buttonSizes = isFullscreen
    ? "w-12 h-12 md:w-16 md:h-16"
    : isMobile 
    ? "w-14 h-14"  // All buttons same size in mobile
    : "w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16";

  const iconSizes = isFullscreen
    ? "w-6 h-6 md:w-8 md:h-8"
    : isMobile
    ? "w-5 h-5"
    : "w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8";

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 items-center justify-end">
        {/* Settings Button - Same size as CTA */}
        <Button 
          onClick={onToggleSettings} 
          size="lg" 
          variant="outline" 
          className={`${buttonSizes} rounded-lg p-0 active:scale-95 transition-all duration-300 ease-out border-foreground/20 hover:bg-foreground/10 hover:border-foreground/30`}
        >
          <SlidersHorizontal className={`${iconSizes} transition-colors duration-300 ease-out`} />
        </Button>
        
        {/* Reset Button - Same size as CTA */}
        <Button 
          onClick={onResetTimer} 
          size="lg" 
          variant="outline" 
          className={`${buttonSizes} rounded-lg p-0 active:scale-95 transition-all duration-300 ease-out border-foreground/20 hover:bg-foreground/10 hover:border-foreground/30`}
        >
          <RefreshCcw className={`${iconSizes} transition-colors duration-300 ease-out`} />
        </Button>
        
        {/* Play/Pause Button - Same size as others */}
        <Button 
          onClick={onToggleTimer} 
          size="lg" 
          className={`${buttonSizes} rounded-lg p-0 bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-all duration-300 ease-out`}
          disabled={timerState === 'finished'}
        >
          {isRunning ? (
            <Pause className={`${iconSizes} fill-current transition-colors duration-300 ease-out`} />
          ) : (
            <Play className={`${iconSizes} fill-current transition-colors duration-300 ease-out`} />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex ${isFullscreen ? 'gap-4' : 'gap-2 md:gap-4'} items-center transition-all duration-500`}>
      {/* Hide fullscreen button on mobile (md:block to show on tablet and up) */}
      <Button 
        onClick={onToggleFullscreen} 
        size="lg" 
        variant="outline" 
        className={`${buttonSizes} rounded-md p-0 active:scale-95 transition-all duration-300 ease-out hidden md:flex border-foreground/20 hover:bg-foreground/10 hover:border-foreground/30`}
      >
        {isFullscreen ? (
          <Minimize className={`${iconSizes} transition-colors duration-300 ease-out`} />
        ) : (
          <Maximize className={`${iconSizes} transition-colors duration-300 ease-out`} />
        )}
      </Button>
      
      <Button 
        onClick={onResetTimer} 
        size="lg" 
        variant="outline" 
        className={`${buttonSizes} rounded-md p-0 active:scale-95 transition-all duration-300 ease-out border-foreground/20 hover:bg-foreground/10 hover:border-foreground/30`}
      >
        <RefreshCcw className={`${iconSizes} transition-colors duration-300 ease-out`} />
      </Button>
      
      <Button 
        onClick={onToggleTimer} 
        size="lg" 
        className={`${buttonSizes} rounded-md p-0 bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-all duration-300 ease-out`}
        disabled={timerState === 'finished'}
      >
        {isRunning ? (
          <Pause className={`${iconSizes} fill-current transition-colors duration-300 ease-out`} />
        ) : (
          <Play className={`${iconSizes} fill-current transition-colors duration-300 ease-out`} />
        )}
      </Button>
    </div>
  );
};

export default TimerControls;
