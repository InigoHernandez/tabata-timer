
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
const ITEM_GAP = 4; // gap between bars / R within a group (px)
const GROUP_GAP = 12; // gap between groups (px)

const ProgressBars = memo(({ sequence, activeIndex }: ProgressBarsProps) => {
  // Filter out short rests (between rounds inside a group) — only work bars and longRest "R" markers are shown.
  const visible = useMemo(
    () =>
      sequence
        .map((item, originalIndex) => ({ item, originalIndex }))
        .filter(({ item }) => item.kind !== 'rest'),
    [sequence],
  );

  // Split into groups: a group is a run of work bars optionally terminated by a longRest "R".
  const groups = useMemo(() => {
    const result: { item: SequenceItem; originalIndex: number }[][] = [];
    let current: { item: SequenceItem; originalIndex: number }[] = [];
    for (const entry of visible) {
      current.push(entry);
      if (entry.item.kind === 'longRest') {
        result.push(current);
        current = [];
      }
    }
    if (current.length) result.push(current);
    return result;
  }, [visible]);

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
        style={{ columnGap: `${GROUP_GAP}px`, rowGap: '8px' }}
      >
        {groups.map((group, gi) => (
          <div
            key={gi}
            className="flex items-end"
            style={{ gap: `${ITEM_GAP}px`, height: `${BAR_H}px` }}
          >
            {group.map(({ item, originalIndex }) => {
              if (item.kind === 'work') {
                return (
                  <div
                    key={originalIndex}
                    className={`${toneFor(originalIndex)} transition-colors duration-300 ease-out`}
                    style={{ width: `${BAR_W}px`, height: `${BAR_H}px` }}
                  />
                );
              }
              // longRest -> "R" marker
              return (
                <span
                  key={originalIndex}
                  className={`${textToneFor(originalIndex)} font-aspekta font-medium leading-none transition-colors duration-300 ease-out select-none`}
                  style={{
                    fontSize: '14px',
                    height: `${BAR_H}px`,
                    display: 'inline-flex',
                    alignItems: 'flex-end',
                    lineHeight: 1,
                  }}
                >
                  R
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

ProgressBars.displayName = 'ProgressBars';

export default ProgressBars;
