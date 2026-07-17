'use client';

import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * hooks/useScrollSequence.js
 * ------------------------------------------------------------------
 * All of the "Section 1 → Section 2" scroll math lives here and
 * nowhere else — tweak the ranges/offsets below to change the feel
 * of the transition without touching either section's markup.
 *
 * Two independent scroll trackers, on purpose:
 *
 * 1. heroRef watches a tall spacer that WRAPS the pinned hero. The
 *    hero sits `sticky top-0` inside it, so it stays on screen while
 *    the user scrolls through the spacer's extra height — that's the
 *    "walking forward" beat (scale up, fade out).
 *
 * 2. showcaseRef watches the showcase section itself, using the
 *    normal "as it scrolls into view" pattern. This keeps the
 *    showcase living in regular document flow (so it stays visible
 *    and clickable long after the transition finishes) rather than
 *    trapping it inside the same pinned/fixed layer as the hero.
 *
 * They're not mathematically the same scroll progress, but tuning
 * heroSpacerHeight and the showcase offsets together makes the two
 * feel concurrent, which is what the effect is going for.
 */
export function useScrollSequence() {
  const heroSpacerRef = useRef(null);
  const showcaseRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSpacerRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'start center'],
  });

  // "Walking forward": the storefront scales up slightly and fades
  // as you scroll past it, like stepping through it toward the case.
  const heroScale = useTransform(
    heroProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.15]
  );
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);

  // "Looking down into the case": the showcase rises and fades in
  // as its top edge crosses into view.
  const showcaseOpacity = useTransform(showcaseProgress, [0, 1], [0, 1]);
  const showcaseY = useTransform(
    showcaseProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [80, 0]
  );

  return {
    heroSpacerRef,
    showcaseRef,
    heroScale,
    heroOpacity,
    showcaseOpacity,
    showcaseY,
  };
}
