'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import NightModeToggle from '@/components/NightModeToggle';

export default function Hero() {
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <section className="relative h-full w-full overflow-hidden bg-zinc-900">
      {/* ---- Background: brick (left) / wood + window (center) / shelves (right) ---- */}
      <Image
        src="/hero-bg.jpg"
        alt="We Smoke Fish storefront — white brick wall, wood-paneled window, and open shelving"
        fill
        priority
        sizes="100vw"
        className={cn(
          'object-cover transition-[filter] duration-700 ease-out',
          // Mobile/tablet: shift the visible crop window toward the left so
          // the right-side shelves fall completely outside the frame.
          // Tune this % once the real photo is in place — it should land
          // right at the seam where the wood-paneled center section ends.
          'object-[28%_center] md:object-center',
          isNightMode && 'brightness-50'
        )}
      />

      {/* ---- Wordmark, over the left brick zone ---- */}
      <h1
        className={cn(
          'absolute left-[5%] top-[30%] font-sans font-black uppercase leading-[0.82] tracking-tight transition-[filter] duration-700 sm:top-[28%]',
          isNightMode && 'drop-shadow-[0_0_28px_rgba(245,80,63,0.9)]'
        )}
      >
        <span className="block text-[13vw] text-[#14161A] sm:text-6xl md:text-7xl lg:text-8xl">
          We
        </span>
        <span className="block text-[13vw] text-[#F5503F] sm:text-6xl md:text-7xl lg:text-8xl">
          Smoke
        </span>
        <span className="block text-[13vw] text-[#14161A] sm:text-6xl md:text-7xl lg:text-8xl">
          Fish
        </span>
      </h1>

      {/* ---- Circular window, centered over the wood-panel cutout ---- */}
      <div className="absolute left-1/2 top-[46%] aspect-square w-[26vw] min-w-[120px] max-w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-2xl ring-4 ring-black/50 sm:top-[44%]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/window-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/window-loop.mp4" type="video/mp4" />
        </video>

        {/* Retro CLOSED sign, fades in only in night mode */}
        <AnimatePresence>
          {isNightMode && (
            <motion.img
              key="closed-sign"
              src="/closed-sign.png"
              alt="Closed"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 h-full w-full object-contain p-3"
            />
          )}
        </AnimatePresence>
      </div>

      <NightModeToggle isNightMode={isNightMode} onToggle={() => setIsNightMode((v) => !v)} />

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/70">
        Scroll
      </div>
    </section>
  );
}
