import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-foreground/15 bg-foreground/5 transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      <span
        className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-sm ring-0 transition-transform duration-300 ${
          isDark ? 'translate-x-[22px]' : 'translate-x-[2px]'
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-foreground" />
        ) : (
          <Sun className="h-3 w-3 text-foreground" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;