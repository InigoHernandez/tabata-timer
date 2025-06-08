
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square } from 'lucide-react';

type TimerState = 'idle' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerControlsProps {
  isRunning: boolean;
  timerState: TimerState;
  remainingTime: number;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

const TimerControls = ({ 
  isRunning, 
  timerState, 
  remainingTime, 
  onToggleTimer, 
  onResetTimer 
}: TimerControlsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pt-6 border-t border-[#E8E8E8]">
      <div className="text-center">
        <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wider">
          REMAINING
        </div>
        <div className="text-2xl font-light font-mono">
          {formatTime(remainingTime)}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          onClick={onResetTimer} 
          size="lg" 
          variant="outline" 
          className="w-12 h-12 rounded-full p-0"
        >
          <Square className="w-5 h-5" />
        </Button>
        
        <Button 
          onClick={onToggleTimer} 
          size="lg" 
          className="w-16 h-16 rounded-full p-0 bg-foreground text-background hover:bg-foreground/90"
          disabled={timerState === 'finished'}
        >
          {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </Button>
      </div>
    </div>
  );
};

export default TimerControls;
