
import React from 'react';

type TimerState = 'idle' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerControlsProps {
  isRunning: boolean;
  timerState: TimerState;
  remainingTime: number;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

const TimerControls = ({ 
  remainingTime
}: TimerControlsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 py-8 border-t border-[#E8E8E8]">
      <div className="text-center">
        <div className="text-base font-normal mb-2" style={{ color: '#0000004d' }}>
          Remaining
        </div>
        <div className="text-2xl font-light font-roboto-mono">
          {formatTime(remainingTime)}
        </div>
      </div>
    </div>
  );
};

export default TimerControls;
