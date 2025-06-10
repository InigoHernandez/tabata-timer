import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Settings } from 'lucide-react';
import TimerSettingsPanel from './TimerSettings';
interface TimerSettings {
  workTime: number;
  restTime: number;
  rounds: number;
  sets: number;
  restBetweenSets: number;
  countdownTime: number;
}
interface MobileSettingsDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
  isRunning: boolean;
  timerState: string;
}
const MobileSettingsDrawer = ({
  isOpen,
  onToggle,
  settings,
  onSettingsChange,
  isRunning,
  timerState
}: MobileSettingsDrawerProps) => {
  return <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onToggle} />

      {/* Settings Drawer */}
      <div className={`fixed bottom-0 left-0 right-0 bg-background rounded-t-xl shadow-xl z-50 transition-transform duration-300 ease-out md:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{
      maxHeight: '70vh'
    }}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-normal">Timer Settings</h2>
          <Button onClick={onToggle} size="sm" className="rounded-full w-10 h-10 p-0 bg-foreground text-background hover:bg-foreground/90">
            <Check className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Content */}
        <div className="overflow-y-auto px-6 pb-6" style={{
        maxHeight: 'calc(70vh - 80px)'
      }}>
          <TimerSettingsPanel settings={settings} onSettingsChange={onSettingsChange} isRunning={isRunning} timerState={timerState} />
        </div>
      </div>
    </>;
};
export default MobileSettingsDrawer;