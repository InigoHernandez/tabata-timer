import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Settings } from 'lucide-react';
import TimerSettingsPanel, { type TrainingSettings, type FocusSettings } from './TimerSettings';
import { type TimerMode } from './ModeTabs';
interface MobileSettingsDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  trainingSettings: TrainingSettings;
  focusSettings: FocusSettings;
  onTrainingChange: (s: TrainingSettings) => void;
  onFocusChange: (s: FocusSettings) => void;
  isRunning: boolean;
  timerState: string;
}
const MobileSettingsDrawer = ({
  isOpen,
  onToggle,
  mode,
  onModeChange,
  trainingSettings,
  focusSettings,
  onTrainingChange,
  onFocusChange,
  isRunning,
  timerState
}: MobileSettingsDrawerProps) => {
  return <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onToggle} />

      {/* Settings Drawer - Positioned lower with smaller height */}
      <div className={`fixed bottom-0 left-0 right-0 bg-background rounded-t-xl shadow-xl z-50 transition-transform duration-300 ease-out md:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{
      maxHeight: '85vh',
      top: '15vh'
    }}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 bg-gray-300 dark:bg-[#3a3a3a] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 dark:border-[#262626] flex-shrink-0">
          <h2 className="text-lg font-normal">Timer settings</h2>
          <Button onClick={onToggle} size="sm" className="rounded-lg w-10 h-10 p-0 bg-foreground text-background hover:bg-foreground/90 transition-all duration-200">
            <Check className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Content - Optimized for all sliders visible */}
        <div className="overflow-y-auto px-6 pb-6 flex-1" style={{
        maxHeight: 'calc(85vh - 80px)'
      }}>
          <TimerSettingsPanel
            mode={mode}
            onModeChange={onModeChange}
            trainingSettings={trainingSettings}
            focusSettings={focusSettings}
            onTrainingChange={onTrainingChange}
            onFocusChange={onFocusChange}
            isRunning={isRunning}
            timerState={timerState}
          />
        </div>
      </div>
    </>;
};

export default MobileSettingsDrawer;
