'use client';

import { useEffect, useState } from 'react';
import { useRegionStore } from '../store/useRegionStore';
import { MapPin, Globe } from 'lucide-react';

export default function RegionModal() {
  const { region, setRegion, isHydrated } = useRegionStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isHydrated && !region) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isHydrated, region]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
          <Globe className="h-6 w-6 text-accent" />
        </div>
        
        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">Select Your Region</h2>
        <p className="mb-8 text-center text-sm text-muted">
          Please select your delivery region so we can show you the correct products and pricing.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setRegion('US')}
            className="group flex w-full items-center justify-between rounded-xl border border-border bg-background p-4 transition-all hover:bg-border/50 hover:border-accent"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇺🇸</span>
              <div className="text-left">
                <div className="font-semibold text-foreground">United States</div>
                <div className="text-xs text-muted">Nationwide Shipping • USD ($)</div>
              </div>
            </div>
            <MapPin className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
          </button>

          <button
            onClick={() => setRegion('MD')}
            className="group flex w-full items-center justify-between rounded-xl border border-border bg-background p-4 transition-all hover:bg-border/50 hover:border-accent"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇲🇩</span>
              <div className="text-left">
                <div className="font-semibold text-foreground">Moldova</div>
                <div className="text-xs text-muted">Chișinău Store • MDL (Lei)</div>
              </div>
            </div>
            <MapPin className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
