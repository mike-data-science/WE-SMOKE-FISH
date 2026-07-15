'use client';

import { useRegionStore } from "@/store/useRegionStore";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

type Category = { id: number; name: string; slug: string };
type Product = {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  imageUrl: string | null;
  priceUsd: number | null;
  priceMdl: number | null;
  region: 'US' | 'MD' | 'BOTH';
  categoryId: number;
  category?: Category;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { region, currency, isHydrated } = useRegionStore();

  if (!isHydrated) return <div className="min-h-screen animate-pulse bg-background" />;

  const price = currency === 'MDL' 
    ? (product.priceMdl ? `${product.priceMdl} MDL` : 'N/A') 
    : (product.priceUsd ? `$${product.priceUsd.toFixed(2)}` : 'N/A');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 transition-colors duration-500">
      <Link href="/shop" className="inline-flex items-center text-muted hover:text-accent mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="bg-surface border border-card-border rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] relative group">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              No Image Available
            </div>
          )}
          {product.category && (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md text-sm font-medium text-white border border-white/10">
              {product.category.name}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 transition-colors duration-500">{product.name}</h1>
            <p className="text-3xl font-bold text-accent mb-6 transition-colors duration-500">{price}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted transition-colors duration-500">{product.description}</p>
          </div>

          <div className="pt-8 border-t border-card-border mt-4 transition-colors duration-500">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-accent text-background px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-accent/20">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
            <p className="text-sm text-muted mt-4 text-center sm:text-left transition-colors duration-500">
              Free shipping on orders over $150 (US) / 2000 MDL (Moldova)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
