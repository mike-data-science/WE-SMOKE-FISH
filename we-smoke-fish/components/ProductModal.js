'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * components/ProductModal.js
 * ------------------------------------------------------------------
 * Controlled entirely by `product` — pass null to keep it closed, or
 * a product object (see data/products.js) to open it. Rendered from
 * ProductShowcase inside its own <AnimatePresence>.
 */
export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#17140F]/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-2xl bg-[#F3EDE1] p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-[#17140F]/60
                hover:bg-[#17140F]/5 hover:text-[#17140F] focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-[#C1272D]"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-widest text-[#C1272D]">
              We Smoke Fish
            </p>
            <h2
              id="product-modal-title"
              className="mt-1 text-2xl font-black uppercase text-[#17140F]"
            >
              {product.name}
            </h2>
            <p className="mt-1 font-mono text-lg text-[#17140F]/80">
              ${product.price.toFixed(2)}{' '}
              <span className="text-sm text-[#17140F]/50">/ {product.unit}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#17140F]/70">
              {product.description}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-[#17140F] py-3 text-sm font-semibold
                uppercase tracking-wide text-[#F3EDE1] transition-colors
                hover:bg-[#C1272D] focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-[#C1272D]"
            >
              Add to order
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
