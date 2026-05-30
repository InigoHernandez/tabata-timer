import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import ModeTabs, { type TimerMode } from './ModeTabs';

export interface TrainingSettings {
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restBetweenSets: number;
  countdownTime: number;
}

export interface FocusSettings {
  focusTime: number; // minutes
  shortBreak: number; // minutes
  longBreak: number; // minutes
  sessionsBeforeLongBreak: number;
  countdownTime: number; // seconds
}

interface TimerSettingsProps {
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  trainingSettings: TrainingSettings;
  focusSettings: FocusSettings;
  onTrainingChange: (s: TrainingSettings) => void;
  onFocusChange: (s: FocusSettings) => void;
  isRunning?: boolean;
  timerState?: string;
}
const TimerSettingsPanel = ({
  mode,
  onModeChange,
  trainingSettings,
  focusSettings,
  onTrainingChange,
  onFocusChange,
  isRunning = false,
  timerState = 'idle'
}: TimerSettingsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const updateTraining = (key: keyof TrainingSettings, value: number) => {
    onTrainingChange({ ...trainingSettings, [key]: value });
  };
  const updateFocus = (key: keyof FocusSettings, value: number) => {
    onFocusChange({ ...focusSettings, [key]: value });
  };

  // Disable sliders when timer is running (not idle, paused, or finished)
  const slidersDisabled = isRunning && timerState !== 'idle' && timerState !== 'finished';

  const labelClass = 'text-base font-normal md:text-base text-foreground/30';
  const valueClass = 'font-normal text-base md:text-base font-jetbrains-mono';

  return (
    <div className="flex-1 py-2 animate-fade-in md:py-0 flex flex-col w-full">
      <div className="mb-4 lg:mb-5 w-full">
        <ModeTabs mode={mode} onChange={onModeChange} />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="space-y-4 lg:space-y-5 px-0 py-0 w-full">
          {mode === 'training' ? (
            <>
        <div className="space-y-2 lg:space-y-3 py-[6px]">
          <div className="flex justify-between items-center py-0">
            <span className={labelClass}>Number of tabatas</span>
            <span className={valueClass} style={{ fontWeight: '400' }}>{trainingSettings.sets}</span>
          </div>
          <Slider value={[trainingSettings.sets]} onValueChange={value => updateTraining('sets', value[0])} max={8} min={1} step={1} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className={labelClass}>Rounds per tabatas</span>
            <span className={valueClass} style={{ fontWeight: '400' }}>{trainingSettings.rounds}</span>
          </div>
          <Slider value={[trainingSettings.rounds]} onValueChange={value => updateTraining('rounds', value[0])} max={12} min={1} step={1} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className={labelClass}>Work time</span>
            <span className={valueClass} style={{ fontWeight: '400' }}>{formatTime(trainingSettings.workTime)}</span>
          </div>
          <Slider value={[trainingSettings.workTime]} onValueChange={value => updateTraining('workTime', value[0])} max={60} min={5} step={5} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className={labelClass}>Rest time</span>
            <span className={valueClass} style={{ fontWeight: '400' }}>{formatTime(trainingSettings.restTime)}</span>
          </div>
          <Slider value={[trainingSettings.restTime]} onValueChange={value => updateTraining('restTime', value[0])} max={60} min={5} step={5} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className={labelClass}>Rest between tabatas</span>
            <span className={valueClass} style={{ fontWeight: '400' }}>{formatTime(trainingSettings.restBetweenSets)}</span>
          </div>
          <Slider value={[trainingSettings.restBetweenSets]} onValueChange={value => updateTraining('restBetweenSets', value[0])} max={180} min={30} step={15} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-2 lg:space-y-3 pb-1">
          <div className="flex justify-between items-center">
            <span className={labelClass}>Countdown time</span>
            <span className={valueClass} style={{ fontWeight: '400' }}>{trainingSettings.countdownTime}s</span>
          </div>
          <Slider value={[trainingSettings.countdownTime]} onValueChange={value => updateTraining('countdownTime', value[0])} max={10} min={3} step={1} className="w-full" disabled={slidersDisabled} />
        </div>
            </>
          ) : (
            <>
              <div className="space-y-2 lg:space-y-3 py-[6px]">
                <div className="flex justify-between items-center">
                  <span className={labelClass}>Focus time</span>
                  <span className={valueClass} style={{ fontWeight: '400' }}>{focusSettings.focusTime} min</span>
                </div>
                <Slider value={[focusSettings.focusTime]} onValueChange={v => updateFocus('focusTime', v[0])} max={60} min={5} step={5} className="w-full" disabled={slidersDisabled} />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <div className="flex justify-between items-center">
                  <span className={labelClass}>Short break</span>
                  <span className={valueClass} style={{ fontWeight: '400' }}>{focusSettings.shortBreak} min</span>
                </div>
                <Slider value={[focusSettings.shortBreak]} onValueChange={v => updateFocus('shortBreak', v[0])} max={15} min={1} step={1} className="w-full" disabled={slidersDisabled} />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <div className="flex justify-between items-center">
                  <span className={labelClass}>Long break</span>
                  <span className={valueClass} style={{ fontWeight: '400' }}>{focusSettings.longBreak} min</span>
                </div>
                <Slider value={[focusSettings.longBreak]} onValueChange={v => updateFocus('longBreak', v[0])} max={30} min={5} step={1} className="w-full" disabled={slidersDisabled} />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <div className="flex justify-between items-center">
                  <span className={labelClass}>Sessions before long break</span>
                  <span className={valueClass} style={{ fontWeight: '400' }}>{focusSettings.sessionsBeforeLongBreak}</span>
                </div>
                <Slider value={[focusSettings.sessionsBeforeLongBreak]} onValueChange={v => updateFocus('sessionsBeforeLongBreak', v[0])} max={8} min={2} step={1} className="w-full" disabled={slidersDisabled} />
              </div>

              <div className="space-y-2 lg:space-y-3 pb-1">
                <div className="flex justify-between items-center">
                  <span className={labelClass}>Countdown time</span>
                  <span className={valueClass} style={{ fontWeight: '400' }}>{focusSettings.countdownTime}s</span>
                </div>
                <Slider value={[focusSettings.countdownTime]} onValueChange={v => updateFocus('countdownTime', v[0])} max={10} min={3} step={1} className="w-full" disabled={slidersDisabled} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerSettingsPanel;
