
import React, { memo } from 'react';

export type SequenceItemKind = 'work' | 'rest' | 'longRest';
export interface SequenceItem {
  kind: SequenceItemKind;
  set: number;
  round: number;
}

interface ProgressBarsProps {
  sequence: SequenceItem[];
  activeIndex: number;
}

const ProgressBars = memo(({ sequence, activeIndex }: ProgressBarsProps) => {
  return (
    <div className="mb-4 md:mb-8 w-full overflow-hidden transition-all duration-500 ease-out animate-fade-in">
      <div
        className="flex items-end gap-[2px] sm:gap-1 w-full"
        style={{ height: '28px' }}
      >
        {sequence.map((item, i) => {
          const isActive = i === activeIndex;
          const isCompleted = activeIndex >= 0 && i < activeIndex;
          const tone = isActive
            ? 'bg-foreground opacity-100'
            : isCompleted
              ? 'bg-foreground opacity-50'
              : 'bg-foreground opacity-20';

          if (item.kind === 'work') {
            return (
              <div
                key={i}
                className={`flex-1 min-w-0 ${tone} transition-all duration-300 ease-out`}
                style={{
                  maxWidth: '6px',
                  height: '24px',
                  transform: isActive ? 'scaleY(1.1)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                }}
              />
            );
          }

          if (item.kind === 'rest') {
            return (
              <div
                key={i}
                className={`flex-1 min-w-0 ${tone} transition-all duration-300 ease-out`}
                style={{ maxWidth: '3px', height: '12px' }}
              />
            );
          }

          // longRest: short bar with a dot marker above
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end flex-1 min-w-0"
              style={{ maxWidth: '6px', height: '24px' }}
            >
              <div
                className={`${tone} rounded-full transition-all duration-300 ease-out`}
                style={{ width: '3px', height: '3px', marginBottom: '2px' }}
              />
              <div
                className={`${tone} transition-all duration-300 ease-out`}
                style={{ width: '100%', maxWidth: '3px', height: '12px' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

ProgressBars.displayName = 'ProgressBars';

export default ProgressBars;
