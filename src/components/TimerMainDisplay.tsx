
import React, { memo, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { formatTimeDisplay, getStateInfo, type TimerMode } from '@/utils/timerUtils';

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerMainDisplayProps {
  currentTime: number;
  timerState: TimerState;
  isRunning: boolean;
  workTime: number;
  isFullscreen: boolean;
  mode?: TimerMode;
}

const TimerMainDisplay = memo(({
  currentTime,
  timerState,
  isRunning,
  workTime,
  isFullscreen,
  mode = 'training'
}: TimerMainDisplayProps) => {
  const stateInfo = useMemo(() => getStateInfo(isRunning, timerState, mode), [isRunning, timerState, mode]);

  const displayTime = useMemo(() => {
    if (timerState === 'idle') {
      return workTime;
    }
    return timerState === 'countdown' ? currentTime : currentTime;
  }, [timerState, workTime, currentTime]);

  const badgeClasses = useMemo(() => isFullscreen
    ? "mb-6 px-4 py-2 text-lg"
    : "mb-4 px-3 py-1 text-sm", [isFullscreen]);

  const timeClasses = useMemo(() => isFullscreen
    ? "text-[8rem] md:text-[16rem] lg:text-[20rem]"
    : "text-[7rem] md:text-[11rem] lg:text-[15rem]", [isFullscreen]);

  // Format time with custom colon styling
  const formattedTime = useMemo(() => {
    const timeString = formatTimeDisplay(displayTime);
    if (!timeString.includes(':')) {
      return <>{timeString}</>;
    }
    const [minutes, secs] = timeString.split(':');
    
    return (
      <>
        {minutes}
        <span style={{ fontSize: '0.6em', verticalAlign: 'middle' }}>:</span>
        {secs}
      </>
    );
  }, [displayTime]);

  return (
    <div className="text-center transition-all duration-300 ease-in-out">
      <Badge 
        className={`${stateInfo.color} text-black ${badgeClasses} font-jetbrains-mono flex items-center mx-auto w-fit transition-all duration-300 rounded-[4px] cursor-default`}
        style={{ fontWeight: '400' }}
      >
        {stateInfo.text}
      </Badge>
      <div 
        key={`${mode}-${workTime}`}
        className={`${timeClasses} font-jetbrains-mono leading-none transition-all duration-300`}
        style={{ letterSpacing: '-0.04em', fontWeight: '300' }}
      >
        <span className="inline-block animate-scale-in">{formattedTime}</span>
      </div>
    </div>
  );
});

TimerMainDisplay.displayName = 'TimerMainDisplay';

export default TimerMainDisplay;
