/**
 * lib/constants.js
 * ------------------------------------------------------------------
 * Every "magic number" used to align UI on top of the two reference
 * photos lives here. If the photos change, or you want to nudge an
 * overlay, this is the only file you should need to touch.
 *
 * All percentages below were measured directly against the source
 * images (2752×1536 for the storefront, 1376×768 for the display
 * case — both a 1.79:1 crop) by overlaying a coordinate grid, not
 * eyeballed from a thumbnail. Comments show how each derived value
 * was produced so you can re-derive them if you swap in new photos.
 */

export const IMAGES = {
  storefront: '/images/storefront.jpg',
  displayCase: '/images/display-case.jpg',
};

// Native aspect ratio of the storefront photo (width / height).
// Used to keep the mobile crop math exact regardless of device size.
export const STOREFRONT_ASPECT = 2752 / 1536; // 1.7917

/**
 * STOREFRONT ZONES (as % of full image width/height)
 * Left brick wall   : 0%   → 38%
 * Center wood panel : 38%  → 61%
 * Right shelving     : 61%  → 100%   <- must be fully hidden on mobile
 * Circular window    : centered at (50%, 67%), ~10.5% of the image
 *                       width in diameter.
 */
export const STOREFRONT_ZONES = {
  brickEnd: 38,
  woodEnd: 61,
  window: { leftPct: 50, topPct: 67, diameterPct: 11 },
};

/**
 * MOBILE CROP MATH
 * ----------------
 * object-fit: cover on a literal `h-screen` box can't guarantee a
 * fixed crop fraction — the visible slice of a wide image depends on
 * the *device's own* aspect ratio (visibleFraction = boxAspect /
 * imageAspect), so a phone and a small tablet crop differently even
 * with identical CSS. To make "hide everything past the wood panel"
 * a hard guarantee instead of a per-device coin flip, the mobile
 * image band is locked to a fixed aspect ratio (width-driven, height
 * auto) instead of stretching to 100dvh. That makes the visible
 * fraction constant on every phone width:
 *
 *   visibleFraction = MOBILE_HERO_ASPECT / STOREFRONT_ASPECT
 *   0.586            = 1.05               / 1.7917
 *
 * At object-position: left (0%), that shows image range [0%, 58.6%]
 * — full brick wall, the full circular window (ends at 56%), and
 * most of the wood panel, with a safety margin before the shelving
 * starts at 61%. Raise MOBILE_HERO_ASPECT to reveal more of the wood
 * panel; lower it for a tighter guarantee against the shelf ever
 * peeking in.
 */
export const MOBILE_HERO_ASPECT = 1.05; // width / height, e.g. Tailwind aspect-[21/20]
export const MOBILE_VISIBLE_FRACTION = MOBILE_HERO_ASPECT / STOREFRONT_ASPECT; // ~0.586

/**
 * DISPLAY CASE compartments (as % of the display-case image, which
 * is shown inside a container locked to its own native aspect ratio
 * — see ProductShowcase — so these percentages stay pixel-accurate
 * at every viewport width, unlike the hero above).
 *
 * The case is 2 rows × 4 columns = 8 compartments. The two back-row
 * middle compartments hold crushed ice (no product placed there);
 * the remaining 6 are bare wood trays, which is where PRODUCTS in
 * data/products.js each get one slot.
 */
export const TRAY_SLOTS = {
  backLeft: { left: 21, top: 34, scale: 0.85 },
  backRight: { left: 76, top: 34, scale: 0.85 },
  frontLeft: { left: 14, top: 60, scale: 1 },
  frontMidLeft: { left: 36, top: 60, scale: 1 },
  frontMidRight: { left: 59, top: 60, scale: 1 },
  frontRight: { left: 81, top: 60, scale: 1 },
};

export const DISPLAY_CASE_ASPECT = 1376 / 768; // 1.7917

/**
 * The mobile crop only trims horizontally (the band matches the full
 * image height, see the comment above MOBILE_HERO_ASPECT), so a
 * point's vertical % carries over unchanged, but its horizontal %
 * has to be re-expressed against the narrower visible slice:
 *   bandXPct = originalXPct / MOBILE_VISIBLE_FRACTION
 * Sizes (like the window's diameter) scale the same way on X.
 * Pre-computed here so Hero.js never repeats this math inline.
 */
export const MOBILE_WINDOW = {
  leftPct: STOREFRONT_ZONES.window.leftPct / MOBILE_VISIBLE_FRACTION,
  topPct: STOREFRONT_ZONES.window.topPct,
  diameterPct: STOREFRONT_ZONES.window.diameterPct / MOBILE_VISIBLE_FRACTION,
};
