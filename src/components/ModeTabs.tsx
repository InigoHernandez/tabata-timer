import React from 'react';

export type TimerMode = 'training' | 'focus';

interface ModeTabsProps {
  mode: TimerMode;
  onChange: (mode: TimerMode) => void;
}

const ModeTabs = ({ mode, onChange }: ModeTabsProps) => {
  const tabs: { id: TimerMode; label: string }[] = [
    { id: 'training', label: 'Training' },
    { id: 'focus', label: 'Focus' },
  ];

  return (
    <div
      className="relative grid grid-cols-2 w-full p-1 rounded-lg bg-foreground/5 border border-foreground/10"
      role="tablist"
      aria-label="Timer mode"
    >
      {tabs.map((tab) => {
        const isActive = mode === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 py-2 text-sm font-normal rounded-md transition-colors duration-300 ${
              isActive
                ? 'bg-foreground text-background'
                : 'text-foreground/50 hover:text-foreground/80'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ModeTabs;