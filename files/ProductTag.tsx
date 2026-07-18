'use client';

import type { Product } from '@/data/products';

interface ProductTagProps {
  product: Product;
  onSelect: () => void;
  /** Pass -1 when this tag is rendered inside the non-interactive scroll
   *  preview layer, so keyboard users don't tab into an invisible duplicate. */
  tabIndex?: number;
}

export default function ProductTag({ product, onSelect, tabIndex = 0 }: ProductTagProps) {
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      onClick={onSelect}
      style={{
        top: product.position.top,
        left: product.position.left,
        transform: `translateX(-50%) rotate(${product.position.rotate ?? '0deg'})`,
      }}
      className="group absolute flex flex-col items-center gap-2 outline-none"
    >
      {/* Product silhouette, standing in for a real photo on the tray */}
      <span
        aria-hidden
        className="h-14 w-20 rounded-[40%] bg-gradient-to-br from-[#E8A968] to-[#9C4A2E] shadow-lg ring-1 ring-black/20 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:brightness-110 group-focus-visible:scale-105"
      />

      {/* Physical plastic price tag */}
      <span className="rounded-sm bg-zinc-900 px-3 py-1.5 text-center shadow-md transition-transform duration-300 ease-out group-hover:scale-105 group-hover:brightness-110 group-focus-visible:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-[#F0913D]">
        <span className="block whitespace-nowrap text-[11px] font-bold uppercase tracking-wide text-white">
          {product.name}
        </span>
        <span className="block whitespace-nowrap text-[10px] font-medium uppercase text-zinc-400">
          {product.price} MDL {product.unit}
        </span>
      </span>
    </button>
  );
}
