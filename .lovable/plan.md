## Problem

When the timer enters full view (the in-app fullscreen overlay) on desktop and tablet, the page underneath still scrolls — so the Popular protocols section and footer leak behind the fixed timer (visible in the first screenshot). The timer itself is correctly `fixed inset-0`, but `body`/`html` scroll isn't locked.

## Fix

In `src/components/TimerDisplay.tsx`, when `isFullscreen` is true, lock page scroll for the duration of the overlay:

- Add an effect that, while `isFullscreen === true`, sets `document.body.style.overflow = 'hidden'` (and restores the previous value on cleanup / when exiting fullscreen).
- This applies to the in-app fullscreen state (the existing `isFullscreen` flag, driven by `fullscreenchange`), covering both native fullscreen and the overlay layout on desktop/tablet.

Mobile is unaffected because the fullscreen overlay there already fills the viewport and scroll lock is harmless.

No layout or visual changes — only scroll behavior of the underlying page while the full view is active.

## Files

- `src/components/TimerDisplay.tsx` — add a `useEffect` keyed on `isFullscreen` to toggle `document.body.style.overflow`.
