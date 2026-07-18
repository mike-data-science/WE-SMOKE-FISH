'use client';

import { Moon, Sun } from 'lucide-react';

interface NightModeToggleProps {
  isNightMode: boolean;
  onToggle: () => void;
}

export default function NightModeToggle({ isNightMode, onToggle }: NightModeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isNightMode}
      aria-label={isNightMode ? 'Switch to day view' : 'Switch to night view'}
      className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md ring-1 ring-white/25 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5503F] sm:right-8 sm:top-8"
    >
      {isNightMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
