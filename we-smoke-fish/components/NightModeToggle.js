'use client';

import { Moon, Sun } from 'lucide-react';

/**
 * components/NightModeToggle.js
 * ------------------------------------------------------------------
 * Presentational only — Hero.js owns the `isNightMode` state and
 * just hands this component a value + setter. Kept separate so the
 * toggle's markup/styling can change without touching Hero's layout
 * logic.
 */
export default function NightModeToggle({ isNightMode, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isNightMode}
      aria-label={isNightMode ? 'Switch to day view' : 'Switch to night view'}
      className={`group inline-flex items-center gap-2 rounded-full border px-3 py-2
        backdrop-blur-md transition-colors duration-300 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-[#C1272D]
        ${isNightMode
          ? 'border-white/20 bg-black/40 text-[#F3EDE1]'
          : 'border-black/10 bg-white/70 text-[#17140F]'}
        ${className}`}
    >
      {isNightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="text-xs font-semibold uppercase tracking-wide">
        {isNightMode ? 'Closed' : 'Open'}
      </span>
    </button>
  );
}
