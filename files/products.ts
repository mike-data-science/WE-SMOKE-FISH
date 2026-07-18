export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  /** Placement over the fridge background image, as percentages + a slight
   *  hand-placed rotation. Nudge these once the real photo is in place so
   *  each tag actually sits on a wooden tray. */
  position: {
    top: string;
    left: string;
    rotate?: string;
  };
}

export const products: Product[] = [
  {
    id: 'smoked-salmon',
    name: 'Smoked Salmon',
    price: 189,
    unit: '/ 300g',
    description:
      'Cold-smoked over beechwood for six hours, then hand-sliced to order.',
    position: { top: '24%', left: '15%', rotate: '-3deg' },
  },
  {
    id: 'smoked-mackerel',
    name: 'Smoked Mackerel',
    price: 89,
    unit: '/ 250g',
    description:
      'A firmer, richer smoke — cured whole and finished over fruitwood.',
    position: { top: '20%', left: '47%', rotate: '2deg' },
  },
  {
    id: 'salmon-tuna-roll',
    name: 'Salmon & Tuna Roll',
    price: 219,
    unit: '/ 300g',
    description: 'Our flagship rulada — two cold-smoked fish rolled into one.',
    position: { top: '18%', left: '78%', rotate: '-2deg' },
  },
  {
    id: 'trio-roll',
    name: 'Trio Roll',
    price: 259,
    unit: '/ 400g',
    description: 'Salmon, tuna, and swordfish, layered and rolled by hand.',
    position: { top: '60%', left: '25%', rotate: '3deg' },
  },
  {
    id: 'smoked-tuna',
    name: 'Smoked Tuna',
    price: 199,
    unit: '/ 300g',
    description: 'Dense, dark, and deeply smoked — best sliced thin.',
    position: { top: '57%', left: '58%', rotate: '-4deg' },
  },
  {
    id: 'yucola',
    name: 'Traditional Yucola',
    price: 149,
    unit: '/ 300g',
    description: "Wind-dried the old way, following an in-house family recipe.",
    position: { top: '62%', left: '87%', rotate: '2deg' },
  },
];
