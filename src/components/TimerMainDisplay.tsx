
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { formatTimeDisplay, getStateInfo } from '@/utils/timerUtils';

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

interface TimerMainDisplayProps {
  currentTime: number;
  timerState: TimerState;
  isRunning: boolean;
  workTime: number;
  isFullscreen: boolean;
}

const TimerMainDisplay = ({
  currentTime,
  timerState,
  isRunning,
  workTime,
  isFullscreen
}: TimerMainDisplayProps) => {
  const stateInfo = getStateInfo(isRunning, timerState);

  const getDisplayTime = () => {
    if (timerState === 'idle') {
      return workTime;
    }
    return timerState === 'countdown' ? currentTime : currentTime;
  };

  const badgeClasses = isFullscreen
    ? "mb-6 px-4 py-2 text-lg"
    : "mb-4 px-3 py-1 text-sm";

  const timeClasses = isFullscreen
    ? "text-[8rem] md:text-[16rem] lg:text-[20rem]"
    : "text-[6rem] md:text-[10rem] lg:text-[14rem]";

  // Format time with custom colon styling
  const formatTimeWithCustomColon = (seconds: number) => {
    const timeString = formatTimeDisplay(seconds);
    const [minutes, secs] = timeString.split(':');
    
    return (
      <>
        {minutes}
        <span style={{ fontSize: '0.6em', verticalAlign: 'middle' }}>:</span>
        {secs}
      </>
    );
  };

  return (
    <div className="text-center transition-all duration-300 ease-in-out">
      <Badge 
        className={`${stateInfo.color} text-black ${badgeClasses} font-jetbrains-mono flex items-center mx-auto w-fit transition-all duration-300 rounded-[4px] cursor-default`}
        style={{ fontWeight: '400' }}
      >
        {stateInfo.text}
      </Badge>
      <div 
        className={`${timeClasses} font-jetbrains-mono leading-none transition-all duration-300`}
        style={{ letterSpacing: '-0.04em', fontWeight: '300' }}
      >
        {formatTimeWithCustomColon(getDisplayTime())}
      </div>
    </div>
  );
};

export default TimerMainDisplay;
