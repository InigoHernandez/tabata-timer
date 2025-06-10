import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import TimerHero from './TimerHero';
import TimerDisplay from './TimerDisplay';
import TimerSettingsPanel from './TimerSettings';
import MobileSettingsDrawer from './MobileSettingsDrawer';
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
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);

  const {
    playCountdownSound,
    playWarningSound,
    playStartSound,
    playFinishSound,
    initializeAudio,
    testAudio
  } = useAudio();

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      initializeAudio();
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [initializeAudio]);

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
    // Initialize audio on explicit timer action
    initializeAudio();
    
    if (timerState === 'idle') {
      setTimerState('countdown');
      setCurrentTime(settings.countdownTime);
      // Play countdown sound immediately when countdown starts
      playCountdownSound();
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev - 1;
          
          // Play audio cues based on the NEW time value (after decrement)
          if (timerState === 'countdown' && newTime > 0) {
            // Play countdown sound for each remaining second
            playCountdownSound();
          } else if ((timerState === 'work' || timerState === 'rest') && newTime <= 5 && newTime > 0) {
            // Play warning sound for last 5 seconds of work and rest
            playWarningSound();
          }
          
          return newTime;
        });
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      // Handle state transitions when time reaches 0
      if (timerState === 'countdown') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
        // Play start sound immediately when work begins
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
        // Play start sound immediately when work begins after rest
        playStartSound();
      } else if (timerState === 'setRest') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
        // Play start sound immediately when work begins after set rest
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

  const toggleMobileSettings = () => {
    setIsMobileSettingsOpen(!isMobileSettingsOpen);
  };

  return (
    <div className="h-dvh bg-[#F8F8F8] font-aspekta animate-fade-in transition-all duration-500 ease-in-out overflow-hidden">
      {/* Mobile Layout - Full viewport adaptation */}
      <div className="md:hidden h-full flex flex-col p-2 overflow-hidden transition-all duration-500 ease-in-out">
        <div className="flex-shrink-0">
          <TimerHero hideInFullscreen={isFullscreen} />
        </div>

        <Card className={`flex-1 overflow-hidden ${isFullscreen ? 'border-0 bg-transparent' : 'border border-[#E8E8E8] bg-[#F5F5F5]'} rounded-xl shadow-none min-h-0 transition-all duration-500 ease-in-out mb-2`}>
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 min-h-0">
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
                onToggleSettings={toggleMobileSettings}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Desktop Layout - 32px padding enforced */}
      <div className="hidden md:block h-full p-8 overflow-hidden transition-all duration-500 ease-in-out">
        <div className="h-full flex flex-col">
          <div className="flex-shrink-0">
            <TimerHero hideInFullscreen={isFullscreen} />
          </div>

          <Card className={`flex-1 overflow-hidden ${isFullscreen ? 'border-0 bg-transparent' : 'border border-[#E8E8E8] bg-[#F5F5F5]'} rounded-xl shadow-none min-h-0 transition-all duration-500 ease-in-out`}>
            {/* Tablet Layout - Similar to desktop but optimized for tablet viewport */}
            <div className="xl:hidden grid grid-cols-3 h-full min-h-0 transition-all duration-500 ease-in-out">
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
                <div className="border-l border-[#E8E8E8] bg-[#F8F8F8] p-4 md:p-6 flex flex-col transition-all duration-500 ease-in-out py-[24px] px-[24px]">
                  <TimerSettingsPanel 
                    settings={settings} 
                    onSettingsChange={setSettings} 
                    isRunning={isRunning} 
                    timerState={timerState} 
                  />
                </div>
              )}
            </div>

            {/* Desktop Layout - Original layout for large screens */}
            <div className="hidden xl:grid xl:grid-cols-3 h-full min-h-0 transition-all duration-500 ease-in-out">
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
                <div className="border-l border-[#E8E8E8] bg-[#F8F8F8] p-4 md:p-6 flex flex-col transition-all duration-500 ease-in-out py-[32px] px-[34px]">
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

      {/* Mobile Settings Drawer */}
      <MobileSettingsDrawer
        isOpen={isMobileSettingsOpen}
        onToggle={toggleMobileSettings}
        settings={settings}
        onSettingsChange={setSettings}
        isRunning={isRunning}
        timerState={timerState}
      />
    </div>
  );
};

export default TabataTimer;
