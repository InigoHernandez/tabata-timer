
import React from 'react';

interface OvalsBackgroundProps {
  isRunning?: boolean;
  timerState?: string;
}

const OvalsBackground: React.FC<OvalsBackgroundProps> = ({ isRunning = false, timerState = 'idle' }) => {
  const getAnimationSpeed = () => {
    if (!isRunning) return 'paused';
    return timerState === 'work' ? '8s' : '12s';
  };

  const getOpacity = () => {
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') return 0.1;
    return timerState === 'work' ? 0.3 : 0.15;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Primary central oval */}
      <div 
        className="absolute"
        style={{
          width: '80%',
          height: '60%',
          top: '20%',
          left: '10%',
          borderRadius: '50%',
          border: `2px solid rgba(254, 100, 23, ${getOpacity()})`,
          animation: `flow1 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
        }}
      />
      
      {/* Secondary overlapping oval */}
      <div 
        className="absolute"
        style={{
          width: '70%',
          height: '50%',
          top: '25%',
          left: '15%',
          borderRadius: '50%',
          border: `1px solid rgba(254, 100, 23, ${getOpacity() * 0.7})`,
          animation: `flow2 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
          animationDelay: '2s',
        }}
      />
      
      {/* Tertiary overlapping oval */}
      <div 
        className="absolute"
        style={{
          width: '90%',
          height: '70%',
          top: '15%',
          left: '5%',
          borderRadius: '50%',
          border: `1px solid rgba(254, 100, 23, ${getOpacity() * 0.5})`,
          animation: `flow3 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
          animationDelay: '4s',
        }}
      />

      {/* Large ambient oval */}
      <div 
        className="absolute"
        style={{
          width: '100%',
          height: '80%',
          top: '10%',
          left: '0%',
          borderRadius: '50%',
          border: `1px solid rgba(254, 100, 23, ${getOpacity() * 0.3})`,
          animation: `flow4 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
          animationDelay: '1s',
        }}
      />

      <style>{`
        @keyframes flow1 {
          0%, 100% {
            transform: scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          25% {
            transform: scale(1.05) translateX(5px) translateY(-3px);
            border-radius: 60% 40% 50% 50%;
          }
          50% {
            transform: scale(0.95) translateX(-3px) translateY(5px);
            border-radius: 40% 60% 50% 50%;
          }
          75% {
            transform: scale(1.02) translateX(4px) translateY(-4px);
            border-radius: 50% 50% 60% 40%;
          }
        }

        @keyframes flow2 {
          0%, 100% {
            transform: scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          33% {
            transform: scale(1.08) translateX(-6px) translateY(4px);
            border-radius: 50% 40% 60% 50%;
          }
          66% {
            transform: scale(0.92) translateX(8px) translateY(-5px);
            border-radius: 60% 50% 40% 50%;
          }
        }

        @keyframes flow3 {
          0%, 100% {
            transform: scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          40% {
            transform: scale(1.1) translateX(4px) translateY(6px);
            border-radius: 40% 50% 50% 60%;
          }
          80% {
            transform: scale(0.9) translateX(-5px) translateY(-4px);
            border-radius: 60% 50% 50% 40%;
          }
        }

        @keyframes flow4 {
          0%, 100% {
            transform: scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          20% {
            transform: scale(1.03) translateX(-4px) translateY(3px);
            border-radius: 55% 45% 50% 50%;
          }
          40% {
            transform: scale(0.97) translateX(6px) translateY(-4px);
            border-radius: 45% 55% 50% 50%;
          }
          60% {
            transform: scale(1.01) translateX(-3px) translateY(5px);
            border-radius: 50% 50% 55% 45%;
          }
          80% {
            transform: scale(0.99) translateX(4px) translateY(-3px);
            border-radius: 50% 50% 45% 55%;
          }
        }
      `}</style>
    </div>
  );
};

export default OvalsBackground;
