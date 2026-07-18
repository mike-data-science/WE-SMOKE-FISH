'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Product } from '@/data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative w-full max-w-md rounded-lg bg-white p-7 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-zinc-400 transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5503F]"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="text-xs font-bold uppercase tracking-widest text-[#F5503F]">
          Afumat la rece
        </span>
        <h3 id="product-modal-title" className="mt-1 text-2xl font-black uppercase text-zinc-900">
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{product.description}</p>
        <p className="mt-5 text-xl font-bold text-zinc-900">
          {product.price} MDL{' '}
          <span className="text-sm font-normal text-zinc-500">{product.unit}</span>
        </p>

        <button
          type="button"
          className="mt-6 w-full rounded-md bg-zinc-900 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#F5503F]"
        >
          Adaugă în coș
        </button>
      </motion.div>
    </motion.div>
  );
}
