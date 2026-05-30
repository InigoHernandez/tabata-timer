import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import TimerHero from './TimerHero';
import TimerDisplay from './TimerDisplay';
import TimerSettingsPanel from './TimerSettings';
import MobileSettingsDrawer from './MobileSettingsDrawer';
import { useAudio } from '@/hooks/useAudio';
import type { TimerMode } from './ModeTabs';
import type { TrainingSettings, FocusSettings } from './TimerSettings';
import type { SequenceItem } from './ProgressBars';

const LONG_BREAK_EVERY = 4;

type TimerState = 'idle' | 'countdown' | 'work' | 'rest' | 'setRest' | 'finished';

const DEFAULT_TRAINING: TrainingSettings = {
  workTime: 20,
  restTime: 10,
  rounds: 8,
  sets: 2,
  restBetweenSets: 40,
  countdownTime: 5,
};

const DEFAULT_FOCUS: FocusSettings = {
  focusTime: 25,
  shortBreak: 5,
  longBreak: 15,
  pomodoros: 4,
};

const loadMode = (): TimerMode => {
  try {
    const v = localStorage.getItem('timerMode');
    return v === 'focus' ? 'focus' : 'training';
  } catch {
    return 'training';
  }
};

interface TabataTimerProps {
  initialMode?: TimerMode;
  initialTraining?: Partial<TrainingSettings>;
  initialFocus?: Partial<FocusSettings>;
}

const TabataTimer = ({ initialMode, initialTraining, initialFocus }: TabataTimerProps = {}) => {
  const [mode, setModeState] = useState<TimerMode>(() => initialMode ?? loadMode());
  const [trainingSettings, setTrainingSettings] = useState<TrainingSettings>({ ...DEFAULT_TRAINING, ...initialTraining });
  const [focusSettings, setFocusSettings] = useState<FocusSettings>({ ...DEFAULT_FOCUS, ...initialFocus });

  // Derived effective engine settings
  const settings = useMemo(() => {
    if (mode === 'training') return trainingSettings;
    return {
      workTime: focusSettings.focusTime * 60,
      restTime: focusSettings.shortBreak * 60,
      rounds: focusSettings.pomodoros,
      sets: 999, // infinite loop in focus mode
      restBetweenSets: focusSettings.longBreak * 60,
      countdownTime: 0, // focus mode skips countdown
    };
  }, [mode, trainingSettings, focusSettings]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(settings.workTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [prevTimerState, setPrevTimerState] = useState<TimerState>('idle');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);

  const {
    playCountdownSound,
    playWarningSound,
    playStartSound,
    playFinishSound,
    initializeAudio,
    testAudio,
    scheduleCountdownBeeps,
    scheduleLastFourBeeps,
    stopAllScheduledBeeps
  } = useAudio();

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
    // Stop all scheduled beeps immediately
    stopAllScheduledBeeps();
    
    setIsRunning(false);
    setCurrentTime(settings.workTime);
    setCurrentRound(1);
    setCurrentSet(1);
    setTimerState('idle');
    setPrevTimerState('idle');
  }, [settings.workTime, stopAllScheduledBeeps]);

  const setMode = useCallback((next: TimerMode) => {
    if (next === mode) return;
    stopAllScheduledBeeps();
    setIsRunning(false);
    setCurrentRound(1);
    setCurrentSet(1);
    setTimerState('idle');
    setPrevTimerState('idle');
    setModeState(next);
    try {
      localStorage.setItem('timerMode', next);
    } catch {
      /* ignore */
    }
  }, [mode, stopAllScheduledBeeps]);

  const toggleTimer = async () => {
    if (timerState === 'idle') {
      // Initialize audio and wait for it to complete before scheduling sounds
      await initializeAudio();
      if (mode === 'focus') {
        // Focus mode starts immediately, no countdown
        handleStateTransition('work', settings.workTime);
      } else {
        setTimerState('countdown');
        setCurrentTime(settings.countdownTime);
        // Schedule all countdown beeps precisely after audio is ready
        scheduleCountdownBeeps(settings.countdownTime);
      }
    } else if (isRunning) {
      // Pausing - stop all scheduled beeps
      stopAllScheduledBeeps();
    }
    
    setIsRunning(!isRunning);
  };

  // Handle state transitions and play appropriate sounds
  const handleStateTransition = useCallback((newState: TimerState, newTime: number) => {
    setPrevTimerState(timerState);
    setTimerState(newState);
    setCurrentTime(newTime);

    // Play sounds immediately when state changes and schedule future beeps
    if (newState === 'work') {
      playStartSound(); // Work start sound immediately
      // Schedule beeps for last 4 seconds (4, 3, 2, 1)
      scheduleLastFourBeeps(newTime);
    } else if (newState === 'rest') {
      playStartSound(); // Rest start sound immediately
      // Schedule beeps for last 4 seconds (4, 3, 2, 1)
      scheduleLastFourBeeps(newTime);
    } else if (newState === 'setRest') {
      playStartSound(); // Set rest start sound immediately
      // Schedule beeps for last 4 seconds if duration > 4
      if (newTime > 4) {
        scheduleLastFourBeeps(newTime);
      }
    } else if (newState === 'finished') {
      playFinishSound(); // Finished sound
    }
  }, [timerState, playStartSound, playFinishSound, scheduleLastFourBeeps]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      // Handle state transitions when time reaches 0
      if (timerState === 'countdown') {
        handleStateTransition('work', settings.workTime);
      } else if (timerState === 'work') {
        if (mode === 'focus') {
          if (currentRound >= settings.rounds) {
            handleStateTransition('finished', 0);
            setIsRunning(false);
          } else if (currentRound % LONG_BREAK_EVERY === 0) {
            handleStateTransition('setRest', settings.restBetweenSets);
          } else {
            handleStateTransition('rest', settings.restTime);
          }
        } else if (currentRound < settings.rounds) {
          handleStateTransition('rest', settings.restTime);
        } else if (currentSet < settings.sets) {
          handleStateTransition('setRest', settings.restBetweenSets);
          setCurrentRound(1);
          setCurrentSet(prev => prev + 1);
        } else {
          handleStateTransition('finished', 0);
          setIsRunning(false);
        }
      } else if (timerState === 'rest') {
        setCurrentRound(prev => prev + 1);
        handleStateTransition('work', settings.workTime);
      } else if (timerState === 'setRest') {
        if (mode === 'focus') {
          setCurrentRound(prev => prev + 1);
        }
        handleStateTransition('work', settings.workTime);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTime, timerState, currentRound, currentSet, settings, mode, handleStateTransition]);

  const remainingTime = useMemo(() => {
    if (mode === 'focus') {
      // Time remaining in current Pomodoro cycle (until end of long break)
      const { workTime, restTime, rounds, restBetweenSets } = settings;
      const cycleTotal = rounds * workTime + (rounds - 1) * restTime + restBetweenSets;
      if (timerState === 'idle' || timerState === 'countdown') return cycleTotal;
      let remaining = currentTime;
      if (timerState === 'work') {
        const roundsLeft = rounds - currentRound; // remaining short breaks + focus rounds after this one
        remaining += roundsLeft * (restTime + workTime) + restBetweenSets;
      } else if (timerState === 'rest') {
        const focusLeft = rounds - currentRound;
        const restsLeft = Math.max(0, focusLeft - 1);
        remaining += focusLeft * workTime + restsLeft * restTime + restBetweenSets;
      }
      // setRest: just currentTime
      return remaining;
    }

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
  }, [settings, mode, timerState, currentTime, currentRound, currentSet]);

  const cyclesText = useMemo(() => {
    if (mode === 'focus') {
      return `${currentRound}/${focusSettings.pomodoros}`;
    }
    return `${(currentSet - 1) * settings.rounds + currentRound}/${settings.rounds * settings.sets}`;
  }, [mode, currentRound, currentSet, focusSettings.pomodoros, settings.rounds, settings.sets]);

  const heroSubtitle = mode === 'focus' ? 'minimalist Pomodoro timer' : 'minimalist HIIT timer';

  const sequence = useMemo<SequenceItem[]>(() => {
    const seq: SequenceItem[] = [];
    if (mode === 'focus') {
      const N = focusSettings.pomodoros;
      for (let r = 1; r <= N; r++) {
        seq.push({ kind: 'work', set: 1, round: r });
        if (r < N) {
          seq.push({
            kind: r % LONG_BREAK_EVERY === 0 ? 'longRest' : 'rest',
            set: 1,
            round: r,
          });
        }
      }
    } else {
      const { sets, rounds } = trainingSettings;
      for (let s = 1; s <= sets; s++) {
        for (let r = 1; r <= rounds; r++) {
          seq.push({ kind: 'work', set: s, round: r });
          if (r < rounds) seq.push({ kind: 'rest', set: s, round: r });
        }
        if (s < sets) seq.push({ kind: 'longRest', set: s, round: rounds });
      }
    }
    return seq;
  }, [mode, focusSettings.pomodoros, trainingSettings.sets, trainingSettings.rounds]);

  const activeIndex = useMemo(() => {
    if (timerState === 'finished') return sequence.length;
    if (timerState === 'idle' || timerState === 'countdown') return -1;
    const matchSet = mode === 'focus' ? 1 : currentSet;
    if (timerState === 'work') {
      return sequence.findIndex(
        (i) => i.kind === 'work' && i.set === matchSet && i.round === currentRound,
      );
    }
    if (timerState === 'rest') {
      return sequence.findIndex(
        (i) => i.kind === 'rest' && i.set === matchSet && i.round === currentRound,
      );
    }
    if (timerState === 'setRest') {
      if (mode === 'focus') {
        return sequence.findIndex(
          (i) => i.kind === 'longRest' && i.round === currentRound,
        );
      }
      // training: currentSet was incremented when entering setRest
      const prevSet = currentSet - 1;
      return sequence.findIndex(
        (i) => i.kind === 'longRest' && i.set === prevSet,
      );
    }
    return -1;
  }, [sequence, mode, timerState, currentSet, currentRound]);

  const toggleMobileSettings = () => {
    setIsMobileSettingsOpen(!isMobileSettingsOpen);
  };

  return (
    <div className="h-dvh bg-[#F8F8F8] dark:bg-[#0F0F0F] font-aspekta animate-fade-in transition-colors duration-500 ease-in-out overflow-hidden">
      {/* Mobile Layout - Full viewport adaptation */}
      <div className="md:hidden h-full flex flex-col p-2 overflow-hidden transition-all duration-500 ease-in-out">
        <div className="flex-shrink-0">
          <TimerHero hideInFullscreen={isFullscreen} subtitle={heroSubtitle} />
        </div>

        <Card className={`flex-1 overflow-hidden ${isFullscreen ? 'border-0 bg-transparent' : 'border border-[#E8E8E8] bg-[#F5F5F5] dark:border-[#262626] dark:bg-[#1A1A1A]'} rounded-xl shadow-none min-h-0 transition-all duration-500 ease-in-out mb-2`}>
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 min-h-0">
              <TimerDisplay sequence={sequence} activeIndex={activeIndex} cyclesText={cyclesText} mode={mode} 
                currentTime={currentTime} 
                currentRound={currentRound} 
                currentSet={currentSet} 
                timerState={timerState} 
                isRunning={isRunning} 
                totalSets={mode === "focus" ? 1 : settings.sets} 
                totalRounds={settings.rounds} 
                 remainingTime={remainingTime}
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
            <TimerHero hideInFullscreen={isFullscreen} subtitle={heroSubtitle} />
          </div>

          <Card className={`flex-1 overflow-hidden ${isFullscreen ? 'border-0 bg-transparent' : 'border border-[#E8E8E8] bg-[#F5F5F5] dark:border-[#262626] dark:bg-[#1A1A1A]'} rounded-xl shadow-none min-h-0 transition-all duration-500 ease-in-out`}>
            {/* Tablet Layout - 2 columns with adjusted proportions for tablet screens */}
            <div className="xl:hidden grid grid-cols-5 h-full min-h-0 transition-all duration-500 ease-in-out">
              <div className="col-span-3">
                <TimerDisplay sequence={sequence} activeIndex={activeIndex} cyclesText={cyclesText} mode={mode} 
                  currentTime={currentTime} 
                  currentRound={currentRound} 
                  currentSet={currentSet} 
                  timerState={timerState} 
                  isRunning={isRunning} 
                  totalSets={mode === "focus" ? 1 : settings.sets} 
                  totalRounds={settings.rounds} 
                   remainingTime={remainingTime}
                  workTime={settings.workTime} 
                  onToggleTimer={toggleTimer} 
                  onResetTimer={resetTimer} 
                />
              </div>

              {!isFullscreen && (
                <div className="col-span-2 border-l border-[#E8E8E8] bg-[#F8F8F8] dark:border-[#262626] dark:bg-[#141414] p-4 md:p-6 flex flex-col transition-all duration-500 ease-in-out py-[24px] px-[24px]">
                  <TimerSettingsPanel 
                    mode={mode}
                    onModeChange={setMode}
                    trainingSettings={trainingSettings}
                    focusSettings={focusSettings}
                    onTrainingChange={setTrainingSettings}
                    onFocusChange={setFocusSettings}
                    isRunning={isRunning} 
                    timerState={timerState} 
                  />
                </div>
              )}
            </div>

            {/* Desktop Layout - Original layout for large screens */}
            <div className="hidden xl:grid xl:grid-cols-3 h-full min-h-0 transition-all duration-500 ease-in-out">
              <TimerDisplay sequence={sequence} activeIndex={activeIndex} cyclesText={cyclesText} mode={mode} 
                currentTime={currentTime} 
                currentRound={currentRound} 
                currentSet={currentSet} 
                timerState={timerState} 
                isRunning={isRunning} 
                totalSets={mode === "focus" ? 1 : settings.sets} 
                totalRounds={settings.rounds} 
                remainingTime={remainingTime} 
                workTime={settings.workTime} 
                onToggleTimer={toggleTimer} 
                onResetTimer={resetTimer} 
              />

              {!isFullscreen && (
                <div className="border-l border-[#E8E8E8] bg-[#F8F8F8] dark:border-[#262626] dark:bg-[#141414] p-4 md:p-6 flex flex-col transition-all duration-500 ease-in-out py-[32px] px-[34px]">
                  <TimerSettingsPanel 
                    mode={mode}
                    onModeChange={setMode}
                    trainingSettings={trainingSettings}
                    focusSettings={focusSettings}
                    onTrainingChange={setTrainingSettings}
                    onFocusChange={setFocusSettings}
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
        mode={mode}
        onModeChange={setMode}
        trainingSettings={trainingSettings}
        focusSettings={focusSettings}
        onTrainingChange={setTrainingSettings}
        onFocusChange={setFocusSettings}
        isRunning={isRunning}
        timerState={timerState}
      />
    </div>
  );
};

export default TabataTimer;
