'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import { useScrollSequence } from '@/hooks/useScrollSequence';

/**
 * app/page.js
 * ------------------------------------------------------------------
 * The hero lives inside a tall spacer (`h-[160vh]`) and is pinned
 * with `sticky top-0 h-screen` for that spacer's whole scroll range,
 * scaling up and fading per useScrollSequence. Once the spacer is
 * scrolled past, the hero releases naturally and ProductShowcase —
 * a completely normal, always-interactive section — takes over,
 * animating in as its own top edge crosses into view.
 *
 * Bump the spacer height (h-[160vh]) for a slower, longer transition;
 * shrink it for a snappier one. Everything else about the transition
 * lives in hooks/useScrollSequence.js.
 */
export default function HomePage() {
  const {
    heroSpacerRef,
    showcaseRef,
    heroScale,
    heroOpacity,
    showcaseOpacity,
    showcaseY,
  } = useScrollSequence();

  return (
    <main className="relative">
      <div ref={heroSpacerRef} className="relative h-[160vh]">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="sticky top-0 h-screen origin-center"
        >
          <Hero />
        </motion.div>
      </div>

      <motion.div
        ref={showcaseRef}
        style={{ opacity: showcaseOpacity, y: showcaseY }}
        className="relative"
      >
        <ProductShowcase />
      </motion.div>
    </main>
  );
}
