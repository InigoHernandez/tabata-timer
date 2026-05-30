
import React, { memo, useMemo } from 'react';

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

const BAR_W = 3; // px
const BAR_H = 24; // px
const ITEM_GAP = 4; // gap between bars (px)
const R_GAP = 10; // equal spacing before and after an R marker (px)

const ProgressBars = memo(({ sequence, activeIndex }: ProgressBarsProps) => {
  // Filter out short rests (between rounds inside a group) — only work bars and longRest "R" markers are shown.
  const visible = useMemo(
    () =>
      sequence
        .map((item, originalIndex) => ({ item, originalIndex }))
        .filter(({ item }) => item.kind !== 'rest'),
    [sequence],
  );

  const toneFor = (originalIndex: number) => {
    if (activeIndex < 0) return 'bg-foreground/20';
    if (originalIndex === activeIndex) return 'bg-foreground';
    if (originalIndex < activeIndex) return 'bg-foreground/50';
    return 'bg-foreground/20';
  };

  const textToneFor = (originalIndex: number) => {
    if (activeIndex < 0) return 'text-foreground/30';
    if (originalIndex === activeIndex) return 'text-foreground';
    if (originalIndex < activeIndex) return 'text-foreground/50';
    return 'text-foreground/30';
  };

  return (
    <div className="mb-4 md:mb-8 w-full transition-all duration-500 ease-out animate-fade-in">
      <div
        className="flex flex-wrap items-end"
        style={{ columnGap: `${ITEM_GAP}px`, rowGap: '8px' }}
      >
        {visible.map(({ item, originalIndex }) => {
          if (item.kind === 'work') {
            return (
              <div
                key={originalIndex}
                className={`${toneFor(originalIndex)} transition-colors duration-300 ease-out`}
                style={{ width: `${BAR_W}px`, height: `${BAR_H}px` }}
              />
            );
          }
          // longRest -> "R" marker with equal spacing on both sides
          return (
            <span
              key={originalIndex}
              className={`${textToneFor(originalIndex)} font-aspekta font-medium leading-none transition-colors duration-300 ease-out select-none`}
              style={{
                fontSize: '14px',
                height: `${BAR_H}px`,
                display: 'inline-flex',
                alignItems: 'center',
                lineHeight: 1,
                marginLeft: `${R_GAP - ITEM_GAP}px`,
                marginRight: `${R_GAP - ITEM_GAP}px`,
              }}
            >
              R
            </span>
          );
        })}
      </div>
    </div>
  );
});

ProgressBars.displayName = 'ProgressBars';

export default ProgressBars;
