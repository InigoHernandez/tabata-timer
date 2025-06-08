
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import TimerHero from './TimerHero';
import TimerDisplay from './TimerDisplay';
import TimerSettingsPanel from './TimerSettings';

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
    workTime: 30,
    restTime: 15,
    rounds: 8,
    sets: 4,
    restBetweenSets: 45,
    countdownTime: 5
  });
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(settings.workTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [timerState, setTimerState] = useState<TimerState>('idle');

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
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      // Handle state transitions
      if (timerState === 'countdown') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
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
        }
      } else if (timerState === 'rest') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
        setCurrentRound(prev => prev + 1);
      } else if (timerState === 'setRest') {
        setTimerState('work');
        setCurrentTime(settings.workTime);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTime, timerState, currentRound, currentSet, settings]);

  const getRemainingTime = () => {
    // Calculate total remaining time based on current state
    if (timerState === 'idle') {
      // When idle, show the total workout time (excluding countdown)
      return settings.sets * settings.rounds * (settings.workTime + settings.restTime) + (settings.sets - 1) * settings.restBetweenSets;
    }
    
    // Don't include countdown time in remaining time calculation
    if (timerState === 'countdown') {
      return settings.sets * settings.rounds * (settings.workTime + settings.restTime) + (settings.sets - 1) * settings.restBetweenSets;
    }

    let remaining = currentTime;
    
    // Add remaining rounds in current set
    if (timerState === 'work' && currentRound < settings.rounds) {
      const remainingRoundsInSet = settings.rounds - currentRound;
      remaining += remainingRoundsInSet * (settings.workTime + settings.restTime);
    } else if (timerState === 'rest' && currentRound < settings.rounds) {
      const remainingRoundsInSet = settings.rounds - currentRound - 1;
      remaining += remainingRoundsInSet * (settings.workTime + settings.restTime) + settings.workTime;
    }
    
    // Add remaining sets
    if (currentSet < settings.sets) {
      const remainingSets = settings.sets - currentSet;
      remaining += remainingSets * (settings.rounds * (settings.workTime + settings.restTime) + settings.restBetweenSets);
    }
    
    return remaining;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-aspekta">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <TimerHero />

        <Card className="overflow-hidden border border-[#E8E8E8] bg-[#F5F5F5] rounded-xl shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
            <TimerDisplay
              currentTime={currentTime}
              currentRound={currentRound}
              currentSet={currentSet}
              timerState={timerState}
              isRunning={isRunning}
              totalSets={settings.sets}
              totalRounds={settings.rounds}
              onToggleTimer={toggleTimer}
              onResetTimer={resetTimer}
            />

            <div className="border-l border-[#E8E8E8] bg-[#F5F5F5] p-6 flex flex-col">
              <TimerSettingsPanel
                settings={settings}
                remainingTime={getRemainingTime()}
                onSettingsChange={setSettings}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TabataTimer;
