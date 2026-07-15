import React from "react";

/**
 * "We Smoke Fish" hero — built directly on top of the straightened shop photo,
 * so the layout is a genuine 1:1 match rather than a CSS approximation.
 *
 * WHY aspect-square:
 * The source photo is 1024x1024. Locking the container to aspect-square means
 * object-cover never actually crops anything, at any viewport width — so the
 * circle and the lights stay at *exactly* the coordinates measured below,
 * pixel-perfect, on every screen size. If you swap in a wider photo later,
 * re-measure the two coordinate blocks below against the new image.
 *
 * Swap these for real assets:
 *  - /images/hero-shop.png            → the straightened photo (already in place)
 *  - /videos/window-person-loop.mp4   → short muted loop, cropped to fill the circle
 *  - /images/window-person-poster.jpg → first-frame poster (avoids a blank circle pre-load)
 */

// Measured directly from the 1024x1024 reference photo, as % of width/height —
// this is what makes the overlay line up with the real circle in the image.
const CIRCLE = {
  leftPct: 50.5,
  topPct: 48.1,
  sizePct: 13.2,
};

// Approximate x-centers (as % of width) of the ceiling fixtures visible in the
// photo's light band (~14%–22% of height). These sit ON TOP of the real,
// already-lit fixtures and just add a soft animated "breathing" glow.
const LIGHT_X_PERCENTS = [5, 30, 53, 58, 71, 96];

export default function SmokeFishHero() {
  return (
    <section className="relative w-full max-w-[1600px] mx-auto aspect-square overflow-hidden bg-neutral-900 text-white">
      {/* Real screen-reader/SEO heading — the visible wordmark is baked into the photo,
          so this exists purely for accessibility and search, not for display. */}
      <h1 className="sr-only">We Smoke Fish</h1>

      {/* The straightened shop photo — no cropping occurs since the container
          ratio matches the image ratio exactly. */}
      <img
        src="/images/hero-shop.png"
        alt="We Smoke Fish shop interior, glass display counters, and smoking room window"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Ambient light glow, one blob per fixture, staggered flicker */}
      <div className="absolute inset-x-0 top-[13%] h-[10%] pointer-events-none">
        {LIGHT_X_PERCENTS.map((x, i) => (
          <span
            key={x}
            className="hero-light absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-20 sm:h-8 sm:w-28 rounded-full"
            style={{
              left: `${x}%`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      {/* Circular window — looping video positioned exactly over the real
          circle in the photo */}
      <div
        className="absolute rounded-full overflow-hidden ring-2 ring-white/10 hero-glow"
        style={{
          left: `${CIRCLE.leftPct}%`,
          top: `${CIRCLE.topPct}%`,
          width: `${CIRCLE.sizePct}%`,
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
        }}
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/window-person-loop.mp4"
          poster="/images/window-person-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <style>{`
        .hero-light {
          background: radial-gradient(closest-side, rgba(255,225,170,0.55), rgba(255,225,170,0) 70%);
          mix-blend-mode: screen;
          animation: hero-flicker 3.4s ease-in-out infinite;
        }
        .hero-glow {
          box-shadow: 0 0 36px 8px rgba(255, 205, 130, 0.3);
        }
        @keyframes hero-flicker {
          0%, 100% { opacity: 0.4;  transform: translate(-50%, -50%) scale(0.92); }
          45%      { opacity: 0.9;  transform: translate(-50%, -50%) scale(1);    }
          50%      { opacity: 0.65; }
          55%      { opacity: 0.9;  transform: translate(-50%, -50%) scale(1);    }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-light { animation: none; opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
