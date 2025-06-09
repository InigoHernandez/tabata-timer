
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
interface TimerSettings {
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restBetweenSets: number;
  countdownTime: number;
}
interface TimerSettingsProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
  isRunning?: boolean;
  timerState?: string;
}
const TimerSettingsPanel = ({
  settings,
  onSettingsChange,
  isRunning = false,
  timerState = 'idle'
}: TimerSettingsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const updateSetting = (key: keyof TimerSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  // Disable sliders when timer is running (not idle, paused, or finished)
  const slidersDisabled = isRunning && timerState !== 'idle' && timerState !== 'finished';
  return <div className="flex-1 py-4 animate-fade-in md:py-0 flex items-center justify-center">
      <div className="space-y-6 lg:space-y-5 px-0 py-0 w-full">
        <div className="space-y-4 lg:space-y-3 py-[16px]">
          <div className="flex justify-between items-center py-0">
            <span style={{
            color: 'rgba(0, 0, 0, 0.3)'
          }} className="text-base font-normal md:text-base">
              Number of tabatas
            </span>
            <span className="font-normal text-base md:text-base font-jetbrains-mono" style={{
            fontWeight: '400'
          }}>{settings.sets}</span>
          </div>
          <Slider value={[settings.sets]} onValueChange={value => updateSetting('sets', value[0])} max={8} min={1} step={1} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-4 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base md:text-base font-normal" style={{
            color: '#0000004d'
          }}>
              Rounds per tabatas
            </span>
            <span className="font-normal text-base md:text-base font-jetbrains-mono" style={{
            fontWeight: '400'
          }}>{settings.rounds}</span>
          </div>
          <Slider value={[settings.rounds]} onValueChange={value => updateSetting('rounds', value[0])} max={12} min={1} step={1} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-4 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base md:text-base font-normal" style={{
            color: '#0000004d'
          }}>
              Work time
            </span>
            <span className="font-normal text-base md:text-base font-jetbrains-mono" style={{
            fontWeight: '400'
          }}>{formatTime(settings.workTime)}</span>
          </div>
          <Slider value={[settings.workTime]} onValueChange={value => updateSetting('workTime', value[0])} max={60} min={5} step={5} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-4 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base md:text-base font-normal" style={{
            color: '#0000004d'
          }}>
              Rest time
            </span>
            <span className="font-normal text-base md:text-base font-jetbrains-mono" style={{
            fontWeight: '400'
          }}>{formatTime(settings.restTime)}</span>
          </div>
          <Slider value={[settings.restTime]} onValueChange={value => updateSetting('restTime', value[0])} max={60} min={5} step={5} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-4 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base md:text-base font-normal" style={{
            color: '#0000004d'
          }}>
              Rest between tabatas
            </span>
            <span className="font-normal text-base md:text-base font-jetbrains-mono" style={{
            fontWeight: '400'
          }}>{formatTime(settings.restBetweenSets)}</span>
          </div>
          <Slider value={[settings.restBetweenSets]} onValueChange={value => updateSetting('restBetweenSets', value[0])} max={180} min={30} step={15} className="w-full" disabled={slidersDisabled} />
        </div>

        <div className="space-y-4 lg:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base md:text-base font-normal" style={{
            color: '#0000004d'
          }}>
              Countdown time
            </span>
            <span className="font-normal text-base md:text-base font-jetbrains-mono" style={{
            fontWeight: '400'
          }}>{settings.countdownTime}s</span>
          </div>
          <Slider value={[settings.countdownTime]} onValueChange={value => updateSetting('countdownTime', value[0])} max={10} min={3} step={1} className="w-full" disabled={slidersDisabled} />
        </div>
      </div>
    </div>;
};
export default TimerSettingsPanel;
