import { TRAY_SLOTS } from '@/lib/constants';

/**
 * data/products.js
 * ------------------------------------------------------------------
 * Mock catalogue for the display case. Each product owns one of the
 * six bare-wood tray slots (the two iced back-middle compartments
 * are left empty, matching the reference photo). Swap this for a
 * CMS/API call later — ProductShowcase only cares about the shape
 * below, not where the data comes from.
 */
export const PRODUCTS = [
  {
    id: 'classic-smoked-salmon',
    name: 'Classic Smoked Salmon',
    price: 18.5,
    unit: 'lb',
    description:
      'Cold-smoked over alderwood for twelve hours until silky and translucent. Our best seller, sliced thin, cure kept deliberately light so the smoke never overpowers the fish.',
    slot: TRAY_SLOTS.frontLeft,
  },
  {
    id: 'peppered-smoked-salmon',
    name: 'Peppered Smoked Salmon',
    price: 19.5,
    unit: 'lb',
    description:
      'The same twelve-hour alderwood cure, finished with a cracked black pepper crust before smoking. Bolder on the finish, still silky underneath.',
    slot: TRAY_SLOTS.frontMidLeft,
  },
  {
    id: 'smoked-trout-fillet',
    name: 'Smoked Trout Fillet',
    price: 16,
    unit: 'lb',
    description:
      'Applewood-smoked whole fillets from lake-raised trout. Milder and flakier than salmon, skin-on and ready to break apart over a salad or straight off the fork.',
    slot: TRAY_SLOTS.frontMidRight,
  },
  {
    id: 'smoked-mackerel',
    name: 'Smoked Mackerel',
    price: 12,
    unit: 'lb',
    description:
      'A short, hot smoke over oak brings out the natural oils in this Atlantic mackerel. Bold, rich, and best eaten simply — a little lemon is all it needs.',
    slot: TRAY_SLOTS.frontRight,
  },
  {
    id: 'smoked-whitefish',
    name: 'Smoked Whitefish',
    price: 14.5,
    unit: 'lb',
    description:
      'Whole smoked whitefish, mild and flaky. The counter favorite for a proper whitefish salad — ask us to pick the meat for you at no extra charge.',
    slot: TRAY_SLOTS.backLeft,
  },
  {
    id: 'smoked-eel',
    name: 'Smoked Eel',
    price: 22,
    unit: 'lb',
    description:
      'Rich, buttery, and old-world in the best sense. Slow-smoked whole over beechwood, this is the one regulars call ahead to reserve.',
    slot: TRAY_SLOTS.backRight,
  },
];
