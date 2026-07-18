# We Smoke Fish — Homepage (Hero + Fridge)

Two-section, scroll-driven homepage: a full-screen storefront hero with a
night-mode toggle, handing off into a clickable product display case.
Built for Next.js App Router + Tailwind CSS.

## Install

Assumes an existing Next.js + Tailwind project.

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

## Files

```
app/page.tsx                     assembles Hero + Fridge, owns the pinned crossfade
components/Hero.tsx               Section 1 — storefront, night mode, circular window
components/NightModeToggle.tsx    the sun/moon toggle button
components/Fridge.tsx             Section 2 — display case + product mapping
components/ProductTag.tsx         one clickable product + its price tag
components/ProductModal.tsx       product detail popup
data/products.ts                  mock product array — edit to add/remove/reposition
hooks/useSectionTransition.ts     all scroll-linked scale/opacity/translate logic
lib/utils.ts                      cn() classname helper (clsx + tailwind-merge)
```

Import paths use the `@/*` alias — the default in `create-next-app` (checked
via `tsconfig.json` → `compilerOptions.paths`). If your project doesn't have
it, either add it or switch the imports to relative paths.

## Assets to add to `/public`

| Path | What it is |
|---|---|
| `/public/hero-bg.jpg` | Storefront photo: brick (left) / wood + window (center) / shelves (right) |
| `/public/window-loop.mp4` | Short looping video inside the circular window |
| `/public/window-poster.jpg` | Poster/fallback frame for that video |
| `/public/closed-sign.png` | Retro "CLOSED" sign graphic, transparent background |
| `/public/fridge-bg.jpg` | 45°, top-down photo of the empty display case |

## How the scroll illusion actually works

The naive version of this effect — animate Section 1 out over scroll
progress 0→1, animate Section 2 in over the *same* 0→1 — has a bug: Section
2 finishes fading in before it's ever scrolled into view, so you never see
it animate.

Instead, `app/page.tsx` stacks both sections as absolutely-positioned
layers inside one `sticky` container, so they're genuinely overlapping
on-screen at the same time. `hooks/useSectionTransition.ts` staggers their
opacity windows (hero fades over `[0, 0.85]`, fridge fades in over
`[0.35, 1]`) so there's a real crossfade in the middle of the scroll, and
the fridge finishes settling *exactly* as the pin releases. A second, fully
interactive `<Fridge />` sits right after in normal document flow and takes
over with no visible seam. The preview layer is `aria-hidden` and
`pointer-events-none` so it doesn't create duplicate tab stops or get
announced twice by screen readers.

Full comments are in `useSectionTransition.ts` — that's the one file to
open if you want to change timing.

## Things you'll likely want to tune

- **Hero.tsx** — `object-[28%_center]` controls the mobile crop focus point.
  Adjust the percentage once the real photo is in place so the right-side
  shelves land fully outside the frame.
- **data/products.ts** — each product's `position.top` / `left` is a
  percentage over the fridge image; nudge these to match where the trays
  actually sit in your photo.
- **useSectionTransition.ts** — the two arrays in each `useTransform` call
  control *when* (0–1 scroll progress) and *how far* each property moves.
- **app/page.tsx** — `h-[200vh]` on the container sets how much scrolling
  the whole transition takes. Shorter = snappier, taller = slower and more
  dramatic.

## Brand colors used

Carried over from the site design work: ink `#14161A`, coral `#F5503F`,
amber `#F0913D`, wood `#C89968` / `#9C7248`. They're inlined as Tailwind
arbitrary values (e.g. `text-[#F5503F]`) so this drops into any project
without touching your `tailwind.config`. Promote them to theme colors if
you want shorter class names.
