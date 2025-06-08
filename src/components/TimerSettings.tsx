
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
}

const TimerSettingsPanel = ({
  settings,
  onSettingsChange
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

  return (
    <div className="flex-1 space-y-8 py-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-normal" style={{ color: '#0000004d' }}>
            Number of tabatas
          </span>
          <span className="font-normal">{settings.sets}</span>
        </div>
        <Slider 
          value={[settings.sets]} 
          onValueChange={value => updateSetting('sets', value[0])} 
          max={8} 
          min={1} 
          step={1} 
          className="w-full [&_.relative]:h-1 [&_.absolute]:h-1" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-normal" style={{ color: '#0000004d' }}>
            Rounds per tabatas
          </span>
          <span className="font-normal">{settings.rounds}</span>
        </div>
        <Slider 
          value={[settings.rounds]} 
          onValueChange={value => updateSetting('rounds', value[0])} 
          max={12} 
          min={1} 
          step={1} 
          className="w-full [&_.relative]:h-1 [&_.absolute]:h-1" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-normal" style={{ color: '#0000004d' }}>
            Time on
          </span>
          <span className="font-normal">{formatTime(settings.workTime)}</span>
        </div>
        <Slider 
          value={[settings.workTime]} 
          onValueChange={value => updateSetting('workTime', value[0])} 
          max={60} 
          min={5} 
          step={5} 
          className="w-full [&_.relative]:h-1 [&_.absolute]:h-1" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-normal" style={{ color: '#0000004d' }}>
            Time off
          </span>
          <span className="font-normal">{formatTime(settings.restTime)}</span>
        </div>
        <Slider 
          value={[settings.restTime]} 
          onValueChange={value => updateSetting('restTime', value[0])} 
          max={60} 
          min={5} 
          step={5} 
          className="w-full [&_.relative]:h-1 [&_.absolute]:h-1" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-normal" style={{ color: '#0000004d' }}>
            Rest between tabatas
          </span>
          <span className="font-normal">{formatTime(settings.restBetweenSets)}</span>
        </div>
        <Slider 
          value={[settings.restBetweenSets]} 
          onValueChange={value => updateSetting('restBetweenSets', value[0])} 
          max={180} 
          min={30} 
          step={15} 
          className="w-full [&_.relative]:h-1 [&_.absolute]:h-1" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-normal" style={{ color: '#0000004d' }}>
            Countdown time
          </span>
          <span className="font-normal">{settings.countdownTime}s</span>
        </div>
        <Slider 
          value={[settings.countdownTime]} 
          onValueChange={value => updateSetting('countdownTime', value[0])} 
          max={10} 
          min={3} 
          step={1} 
          className="w-full [&_.relative]:h-1 [&_.absolute]:h-1" 
        />
      </div>
    </div>
  );
};

export default TimerSettingsPanel;
