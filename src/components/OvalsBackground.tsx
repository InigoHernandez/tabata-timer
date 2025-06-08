
import React from 'react';

interface OvalsBackgroundProps {
  isRunning?: boolean;
  timerState?: string;
}

const OvalsBackground: React.FC<OvalsBackgroundProps> = ({ isRunning = false, timerState = 'idle' }) => {
  const getAnimationSpeed = () => {
    if (!isRunning) return 'paused';
    return timerState === 'work' ? '3s' : '6s';
  };

  const getOpacity = () => {
    if (!isRunning && timerState !== 'idle' && timerState !== 'finished') return 0.1;
    return timerState === 'work' ? 0.4 : 0.2;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Primary flowing curve */}
      <div 
        className="absolute"
        style={{
          width: '120%',
          height: '60%',
          top: '20%',
          left: '-10%',
          borderRadius: '50%',
          border: `2px solid rgba(254, 100, 23, ${getOpacity()})`,
          animation: `flow1 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
          transform: 'rotate(-15deg)',
        }}
      />
      
      {/* Secondary flowing curve */}
      <div 
        className="absolute"
        style={{
          width: '100%',
          height: '50%',
          top: '40%',
          right: '-20%',
          borderRadius: '50%',
          border: `1px solid rgba(254, 100, 23, ${getOpacity() * 0.7})`,
          animation: `flow2 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
          animationDelay: '1s',
          transform: 'rotate(25deg)',
        }}
      />
      
      {/* Tertiary flowing curve */}
      <div 
        className="absolute"
        style={{
          width: '80%',
          height: '40%',
          bottom: '10%',
          left: '10%',
          borderRadius: '50%',
          border: `1px solid rgba(254, 100, 23, ${getOpacity() * 0.5})`,
          animation: `flow3 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
          animationDelay: '2s',
          transform: 'rotate(-30deg)',
        }}
      />

      {/* Large ambient curve */}
      <div 
        className="absolute"
        style={{
          width: '140%',
          height: '70%',
          top: '10%',
          left: '-20%',
          borderRadius: '50%',
          border: `1px solid rgba(254, 100, 23, ${getOpacity() * 0.3})`,
          animation: `flow4 ${getAnimationSpeed()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          animationPlayState: isRunning ? 'running' : 'paused',
          animationDelay: '0.5s',
          transform: 'rotate(10deg)',
        }}
      />

      <style jsx>{`
        @keyframes flow1 {
          0%, 100% {
            transform: rotate(-15deg) scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          25% {
            transform: rotate(-10deg) scale(1.05) translateX(10px) translateY(-5px);
            border-radius: 60% 40% 50% 50%;
          }
          50% {
            transform: rotate(-20deg) scale(0.95) translateX(-5px) translateY(10px);
            border-radius: 40% 60% 50% 50%;
          }
          75% {
            transform: rotate(-12deg) scale(1.02) translateX(8px) translateY(-8px);
            border-radius: 50% 50% 60% 40%;
          }
        }

        @keyframes flow2 {
          0%, 100% {
            transform: rotate(25deg) scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          33% {
            transform: rotate(30deg) scale(1.08) translateX(-12px) translateY(8px);
            border-radius: 50% 40% 60% 50%;
          }
          66% {
            transform: rotate(20deg) scale(0.92) translateX(15px) translateY(-10px);
            border-radius: 60% 50% 40% 50%;
          }
        }

        @keyframes flow3 {
          0%, 100% {
            transform: rotate(-30deg) scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          40% {
            transform: rotate(-35deg) scale(1.1) translateX(8px) translateY(12px);
            border-radius: 40% 50% 50% 60%;
          }
          80% {
            transform: rotate(-25deg) scale(0.9) translateX(-10px) translateY(-8px);
            border-radius: 60% 50% 50% 40%;
          }
        }

        @keyframes flow4 {
          0%, 100% {
            transform: rotate(10deg) scale(1) translateX(0) translateY(0);
            border-radius: 50%;
          }
          20% {
            transform: rotate(15deg) scale(1.03) translateX(-8px) translateY(5px);
            border-radius: 55% 45% 50% 50%;
          }
          40% {
            transform: rotate(5deg) scale(0.97) translateX(12px) translateY(-8px);
            border-radius: 45% 55% 50% 50%;
          }
          60% {
            transform: rotate(12deg) scale(1.01) translateX(-5px) translateY(10px);
            border-radius: 50% 50% 55% 45%;
          }
          80% {
            transform: rotate(8deg) scale(0.99) translateX(8px) translateY(-5px);
            border-radius: 50% 50% 45% 55%;
          }
        }
      `}</style>
    </div>
  );
};

export default OvalsBackground;
