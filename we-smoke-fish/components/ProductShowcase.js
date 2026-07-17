'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { IMAGES, DISPLAY_CASE_ASPECT } from '@/lib/constants';
import ProductModal from './ProductModal';

/**
 * components/ProductShowcase.js — SECTION 2: THE REFRIGERATOR
 * ------------------------------------------------------------------
 * The case image sits inside a container locked to its own native
 * aspect ratio (DISPLAY_CASE_ASPECT) rather than a viewport-relative
 * height. That's what lets every product's `slot.left/top` percentage
 * (measured straight off the source photo, see lib/constants.js)
 * land on the same tray at any screen width — unlike the hero, there
 * is no conflicting "must be h-screen" requirement here, so the
 * simpler, more accurate fixed-aspect approach is the right one.
 */
export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="relative bg-[#F3EDE1] py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C1272D]">
          Today's Case
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-black uppercase leading-[0.95] text-[#17140F] md:text-5xl">
          Straight off the smoker
        </h2>
        <p className="mt-4 max-w-xl text-sm text-[#17140F]/60 md:text-base">
          Tap a tray to see what's resting on the ice — everything below was
          smoked in-house this week.
        </p>

        <div
          className="relative mt-10 w-full overflow-hidden rounded-2xl shadow-xl md:mt-14"
          style={{ aspectRatio: `${DISPLAY_CASE_ASPECT} / 1` }}
        >
          <Image
            src={IMAGES.displayCase}
            alt="Refrigerated display case with wooden trays, viewed from above"
            fill
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover"
          />

          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelectedProduct(product)}
              style={{ left: `${product.slot.left}%`, top: `${product.slot.top}%` }}
              aria-label={`${product.name}, $${product.price.toFixed(2)} per ${product.unit}`}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-md
                bg-zinc-900 px-1.5 py-1 text-left shadow-lg ring-1 ring-black/30
                transition-transform duration-200 hover:z-10 hover:brightness-110
                focus-visible:z-10 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-[#C1272D]
                sm:px-2.5 sm:py-1.5
                ${product.slot.scale < 1 ? 'scale-90 hover:scale-100' : 'scale-100 hover:scale-110'}`}
            >
              <span className="block whitespace-nowrap text-[9px] font-bold uppercase tracking-wide text-white sm:text-xs">
                {product.name}
              </span>
              <span className="mt-0.5 block whitespace-nowrap font-mono text-[9px] text-white/70 sm:text-xs">
                ${product.price.toFixed(2)} / {product.unit}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
