'use client';

import { useRef, type RefObject } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

interface TransitionStyle {
  scale?: MotionValue<number>;
  opacity: MotionValue<number>;
  y?: MotionValue<number>;
}

interface UseSectionTransitionResult {
  containerRef: RefObject<HTMLDivElement>;
  heroStyle: TransitionStyle;
  fridgePreviewStyle: TransitionStyle;
}

/**
 * Drives the pinned "walk forward" hand-off between the Hero and the Fridge.
 *
 * HOW THE ILLUSION WORKS
 * The container this hook targets is 200vh tall. Its child is `sticky top-0
 * h-screen`, so it stays pinned to the viewport for exactly one extra
 * screen-height of scrolling (see app/page.tsx). We read scroll progress
 * across *that whole pinned range* — offset ['start start', 'end end'] means
 * progress 0 is the instant the container's top hits the viewport top (pin
 * begins), and progress 1 is the instant the container's bottom hits the
 * viewport bottom (pin ends). That range is what "0 to 1" means below.
 *
 * A common bug here is tying the incoming section's fade-in to the *same*
 * progress window as the outgoing section's fade-out. If both run over,
 * say, [0, 1], the incoming section is already fully visible by the time the
 * pin releases, so its "reveal" happens off-screen and you never see it
 * animate. Instead, the hero's fade-out and the fridge's fade-in are
 * staggered so they genuinely overlap mid-scroll (a real crossfade) and the
 * fridge finishes settling right as the pin lets go — not before.
 *
 * TUNING
 * - Widen/narrow the hero's opacity window (e.g. [0, 0.95]) to keep it
 *   legible for longer before it gives way.
 * - Move the fridge's window earlier (e.g. [0.2, 1]) for a longer overlap,
 *   or later (e.g. [0.55, 1]) for a snappier hand-off.
 * - Change h-[200vh] in app/page.tsx to make the whole transition take more
 *   or less scrolling.
 */
export function useSectionTransition(): UseSectionTransitionResult {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Outgoing: hero scales up and fades, like stepping through the doorway.
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Incoming: fridge rises slightly and fades in, "looking down into the case".
  const fridgeOpacity = useTransform(scrollYProgress, [0.35, 1], [0, 1]);
  const fridgeY = useTransform(scrollYProgress, [0.35, 1], [100, 0]);

  return {
    containerRef,
    heroStyle: { scale: heroScale, opacity: heroOpacity },
    fridgePreviewStyle: { opacity: fridgeOpacity, y: fridgeY },
  };
}
