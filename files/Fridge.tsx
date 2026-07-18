'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { products, type Product } from '@/data/products';
import ProductTag from '@/components/ProductTag';
import ProductModal from '@/components/ProductModal';
import { cn } from '@/lib/utils';

interface FridgeProps {
  /** false when this is rendered as the non-interactive crossfade preview
   *  layer during the hero->fridge scroll transition (see app/page.tsx). */
  interactive?: boolean;
}

export default function Fridge({ interactive = true }: FridgeProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <section
      aria-hidden={!interactive}
      className={cn(
        'relative h-screen w-full overflow-hidden bg-zinc-950',
        !interactive && 'pointer-events-none'
      )}
    >
      {/* Top-down, 45°-angle photo of the empty display case */}
      <Image
        src="/fridge-bg.jpg"
        alt={interactive ? 'Refrigerated display case with wooden trays' : ''}
        fill
        sizes="100vw"
        className="object-cover"
      />

      {products.map((product) => (
        <ProductTag
          key={product.id}
          product={product}
          onSelect={() => setActiveProduct(product)}
          tabIndex={interactive ? 0 : -1}
        />
      ))}

      {interactive && (
        <AnimatePresence>
          {activeProduct && (
            <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
