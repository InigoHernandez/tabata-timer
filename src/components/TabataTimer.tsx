import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import TimerHero from './TimerHero';
import TimerDisplay from './TimerDisplay';
import TimerSettingsPanel from './TimerSettings';
import { useAudio } from '@/hooks/useAudio';

interface TimerSettings {
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restBetweenSets: number;
  countdownTime: number;
}

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

const TabataTimer = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    workTime: 20,
    restTime: 10,
    rounds: 8,
    sets: 2,
    restBetweenSets: 40,
    countdownTime: 5
  });

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(settings.workTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    playCountdownSound,
    playWarningSound,
    playStartSound,
    playFinishSound
  } = useAudio();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (timerState === 'idle') {
      setCurrentTime(settings.workTime);
    }
  }, [settings.workTime, timerState]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setCurrentTime(settings.workTime);
    setCurrentRound(1);
    setCurrentSet(1);
    setTimerState('idle');
  }, [settings.workTime]);

  const toggleTimer = () => {
    if (timerState === 'idle') {
      setTimerState('countdown');
      setCurrentTime(settings.countdownTime);
      playStartSound();
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev <= 3 && prev > 0 && (timerState === 'work' || timerState === 'rest')) {
            playWarningSound();
          }
          if (timerState === 'countdown' && prev > 0) {
            playCountdownSound();
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      if (timerState === 'countdown') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
        playStartSound();
      } else if (timerState === 'work') {
        if (currentRound < settings.rounds) {
          setTimerState('rest');
          setCurrentTime(settings.restTime);
        } else if (currentSet < settings.sets) {
          setTimerState('setRest');
          setCurrentTime(settings.restBetweenSets);
          setCurrentRound(1);
          setCurrentSet(prev => prev + 1);
        } else {
          setTimerState('finished');
          setIsRunning(false);
          playFinishSound();
        }
      } else if (timerState === 'rest') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
        setCurrentRound(prev => prev + 1);
        playStartSound();
      } else if (timerState === 'setRest') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
        playStartSound();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime, timerState, currentRound, currentSet, settings, playCountdownSound, playWarningSound, playStartSound, playFinishSound]);

  const getRemainingTime = () => {
    const timePerSet = settings.rounds * settings.workTime + (settings.rounds - 1) * settings.restTime;
    const totalWorkoutTime = settings.sets * timePerSet + (settings.sets - 1) * settings.restBetweenSets;
    if (timerState === 'idle' || timerState === 'countdown') {
      return totalWorkoutTime;
    }
    if (timerState === 'finished') {
      return 0;
    }
    let remaining = currentTime;
    if (timerState === 'work') {
      const remainingRoundsInSet = settings.rounds - currentRound;
      remaining += remainingRoundsInSet * (settings.workTime + settings.restTime);
    } else if (timerState === 'rest') {
      const remainingRoundsInSet = settings.rounds - currentRound;
      remaining += remainingRoundsInSet * (settings.workTime + settings.restTime);
    } else if (timerState === 'setRest') {
      remaining += settings.rounds * settings.workTime + (settings.rounds - 1) * settings.restTime;
    }
    if (currentSet < settings.sets) {
      const remainingSets = settings.sets - currentSet;
      remaining += remainingSets * timePerSet;
      if (timerState !== 'setRest') {
        remaining += remainingSets * settings.restBetweenSets;
      } else {
        remaining += (remainingSets - 1) * settings.restBetweenSets;
      }
    }
    return remaining;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-aspekta animate-fade-in transition-all duration-500 ease-in-out">
      <div className="h-screen flex flex-col p-2 md:p-4 lg:p-8 overflow-hidden transition-all duration-500 ease-in-out">
        <div className="flex-shrink-0">
          <TimerHero hideInFullscreen={isFullscreen} />
        </div>

        <Card className={`flex-1 overflow-hidden ${isFullscreen ? 'border-0 bg-transparent' : 'border border-[#E8E8E8] bg-[#F5F5F5]'} rounded-xl shadow-none min-h-0 transition-all duration-500 ease-in-out`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full min-h-0 transition-all duration-500 ease-in-out">
            <TimerDisplay 
              currentTime={currentTime} 
              currentRound={currentRound} 
              currentSet={currentSet} 
              timerState={timerState} 
              isRunning={isRunning} 
              totalSets={settings.sets} 
              totalRounds={settings.rounds} 
              remainingTime={getRemainingTime()} 
              workTime={settings.workTime} 
              onToggleTimer={toggleTimer} 
              onResetTimer={resetTimer} 
            />

            {!isFullscreen && (
              <div className="border-l border-[#E8E8E8] bg-[#F5F5F5] p-4 md:p-6 flex flex-col transition-all duration-500 ease-in-out px-[32px] py-[31px]">
                <TimerSettingsPanel 
                  settings={settings} 
                  onSettingsChange={setSettings} 
                  isRunning={isRunning} 
                  timerState={timerState} 
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TabataTimer;
