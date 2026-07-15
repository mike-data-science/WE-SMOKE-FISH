'use client';

import { useRegionStore } from '../store/useRegionStore';
import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { region, isHydrated } = useRegionStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, avoid mismatch by not applying dynamic classes until hydration
  if (!mounted || !isHydrated) {
    return <div className="min-h-screen transition-colors duration-500">{children}</div>;
  }

  const themeClass = region === 'MD' ? 'theme-md' : 'theme-us';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClass}`}>
      {children}
    </div>
  );
}
