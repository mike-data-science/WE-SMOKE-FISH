'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import NightModeToggle from './NightModeToggle';
import {
  IMAGES,
  MOBILE_HERO_ASPECT,
  MOBILE_WINDOW,
  STOREFRONT_ZONES,
} from '@/lib/constants';

/**
 * components/Hero.js — SECTION 1: THE STOREFRONT
 * ------------------------------------------------------------------
 * Two full layout branches (mobile vs. `md:`) rather than one set of
 * absolute positions reused everywhere. On mobile the wood-panel/
 * window crop is guaranteed by locking the image band to a fixed
 * aspect ratio instead of stretching it to 100dvh — see the long
 * comment on MOBILE_HERO_ASPECT in lib/constants.js for why a plain
 * `h-screen` + object-cover can't make that guarantee on its own.
 */
export default function Hero() {
  const [isNightMode, setIsNightMode] = useState(false);
  const toggleNightMode = () => setIsNightMode((v) => !v);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#17140F]">
      {/* ---------------- MOBILE / TABLET (below md) ---------------- */}
      <div className="flex h-full w-full flex-col md:hidden">
        <div className="flex flex-1 flex-col justify-end px-6 pb-6">
          <Wordmark isNightMode={isNightMode} />
          <p className="mt-3 max-w-[22rem] text-sm text-[#F3EDE1]/70">
            Cold-smoked in small batches. Cut to order, every day.
          </p>
        </div>

        <div
          className="relative w-full shrink-0"
          style={{ aspectRatio: `${MOBILE_HERO_ASPECT} / 1` }}
        >
          <Image
            src={IMAGES.storefront}
            alt="We Smoke Fish storefront: tiled wall, wood panel and circular window"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-left transition-[filter] duration-700 ${
              isNightMode ? 'brightness-[.45]' : 'brightness-100'
            }`}
          />
          <CircularWindow
            isNightMode={isNightMode}
            leftPct={MOBILE_WINDOW.leftPct}
            topPct={MOBILE_WINDOW.topPct}
            diameterPct={MOBILE_WINDOW.diameterPct}
          />
        </div>

        <div className="flex flex-1 items-start justify-end p-4">
          <NightModeToggle isNightMode={isNightMode} onToggle={toggleNightMode} />
        </div>
      </div>

      {/* ---------------- DESKTOP (md and up) ---------------- */}
      <div className="relative hidden h-full w-full md:block">
        <Image
          src={IMAGES.storefront}
          alt="We Smoke Fish storefront: tiled walls either side of a wood panel with a circular window"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-[filter] duration-700 ${
            isNightMode ? 'brightness-[.45]' : 'brightness-100'
          }`}
        />

        <Wordmark
          isNightMode={isNightMode}
          className="absolute top-1/2 left-[6%] max-w-[30%] -translate-y-1/2"
        />

        <CircularWindow
          isNightMode={isNightMode}
          leftPct={STOREFRONT_ZONES.window.leftPct}
          topPct={STOREFRONT_ZONES.window.topPct}
          diameterPct={STOREFRONT_ZONES.window.diameterPct}
        />

        <NightModeToggle
          isNightMode={isNightMode}
          onToggle={toggleNightMode}
          className="absolute top-6 right-6"
        />
      </div>
    </section>
  );
}

function Wordmark({ isNightMode, className = '' }) {
  return (
    <h1
      className={`font-black uppercase leading-[0.88] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${className}`}
    >
      <span className={isNightMode ? 'text-[#F3EDE1]' : 'text-[#17140F]'}>
        We Smoke
      </span>
      <br />
      <span
        className={`text-[#C1272D] transition-[filter] duration-700 ${
          isNightMode
            ? '[filter:drop-shadow(0_0_6px_#ff4d4d)_drop-shadow(0_0_24px_#ff1a1a)]'
            : ''
        }`}
      >
        Fish
      </span>
    </h1>
  );
}

function CircularWindow({ isNightMode, leftPct, topPct, diameterPct }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 aspect-square overflow-hidden rounded-full ring-4 ring-[#5B3A29] shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
      style={{ left: `${leftPct}%`, top: `${topPct}%`, width: `${diameterPct}%` }}
    >
      {/* Placeholder motion — swap for real back-room footage or a Lottie file.
          Framed as "someone visible moving through the window" per the brief. */}
      <video
        className="h-full w-full object-cover"
        src="/videos/window-loop.mp4"
        poster="https://placehold.co/400x400/2b1c12/2b1c12"
        autoPlay
        muted
        loop
        playsInline
      />
      <AnimatePresence>
        {isNightMode && (
          <motion.img
            key="closed-sign"
            src="https://placehold.co/400x400/1a1a1a/f3ede1?text=CLOSED"
            alt="Closed sign"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
