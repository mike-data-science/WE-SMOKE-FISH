'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Fridge from '@/components/Fridge';
import { useSectionTransition } from '@/hooks/useSectionTransition';

export default function HomePage() {
  const { containerRef, heroStyle, fridgePreviewStyle } = useSectionTransition();

  return (
    <main className="bg-zinc-950">
      {/*
        Pinned transition container — 200vh tall so the sticky child below
        stays pinned to the viewport for one full extra screen-height of
        scrolling, which is what gives useSectionTransition room to animate
        the hand-off. See hooks/useSectionTransition.ts for how the math works.
      */}
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Outgoing: Hero scales up and fades — "walking through the door" */}
          <motion.div style={heroStyle} className="absolute inset-0 z-10">
            <Hero />
          </motion.div>

          {/* Incoming preview: a non-interactive stand-in for the Fridge that
              exists only to crossfade in underneath the Hero. It's
              aria-hidden and pointer-events-none because it's purely
              visual — the real, clickable Fridge follows right below. */}
          <motion.div style={fridgePreviewStyle} className="absolute inset-0 z-0">
            <Fridge interactive={false} />
          </motion.div>
        </div>
      </div>

      {/*
        The real Fridge: fully opaque, static, interactive. It sits directly
        after the pinned container, so once the sticky hero releases, this
        section is already in the exact visual state the preview above
        animated to — no jump, no flicker.
      */}
      <Fridge />
    </main>
  );
}
