
import React from 'react';
import { formatTime } from '@/utils/timerUtils';

interface TimerInfoProps {
  remainingTime: number;
  currentSet: number;
  currentRound: number;
  totalSets: number;
  totalRounds: number;
  isFullscreen: boolean;
}

const TimerInfo = ({
  remainingTime,
  isFullscreen
}: TimerInfoProps) => {
  const textSizes = isFullscreen
    ? "text-sm md:text-base"
    : "text-sm md:text-base";

  const timeSizes = isFullscreen
    ? "text-2xl md:text-4xl"
    : "text-xl md:text-2xl lg:text-4xl";

  // Format time with custom colon styling
  const formatTimeWithCustomColon = (seconds: number) => {
    const timeString = formatTime(seconds);
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
    <>
      {/* Remaining Time */}
      <div 
        className={`absolute text-right z-10 animate-fade-in`}
        style={{
          top: '0px',
          right: '0px'
        }}
      >
        <div className={`${textSizes} font-normal mb-2 transition-all duration-500`} style={{ color: '#0000004d' }}>
          Remaining time
        </div>
        <div className={`${timeSizes} font-jetbrains-mono transition-all duration-500`} style={{ letterSpacing: '-0.01em', fontWeight: '400' }}>
          {formatTimeWithCustomColon(remainingTime)}
        </div>
      </div>
    </>
  );
};

export default TimerInfo;
