'use client';

import React, { useState } from "react";
import { useRegionStore } from "@/store/useRegionStore";
import { ShoppingBag, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

type Category = { id: number; name: string; slug: string };
type Product = {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  imageUrl: string | null;
  priceUsd: number | null;
  priceMdl: number | null;
  unit: string | null;
  region: 'US' | 'MD' | 'BOTH';
  categoryId: number;
  category?: Category;
};

export default function ShopClient({ categories, products }: { categories: Category[], products: Product[] }) {
  const { region, currency, isHydrated } = useRegionStore();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { t } = useTranslation();

  if (!isHydrated) return <div className="min-h-screen animate-pulse bg-background" />;

  // Filter products by region
  const filteredProducts = products.filter(p => {
    if (!region) return true; // Show all if no region (or maybe force select first)
    if (p.region === 'BOTH') return true;
    return p.region === region;
  }).filter(p => {
    if (activeCategory === null) return true;
    return p.categoryId === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wider transition-colors duration-500">{t('shop.categories')}</h2>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveCategory(null)}
            className={`text-left px-4 py-2 rounded-lg transition-colors duration-500 ${activeCategory === null ? 'bg-accent text-background font-medium' : 'text-muted hover:text-foreground hover:bg-surface'}`}
          >
            {t('shop.all_products')}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-left px-4 py-2 rounded-lg transition-colors duration-500 ${activeCategory === cat.id ? 'bg-accent text-background font-medium' : 'text-muted hover:text-foreground hover:bg-surface'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-foreground transition-colors duration-500">{t('nav.shop')}</h1>
          {region && (
            <div className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20 transition-colors duration-500">
              {t('shop.showing_products_for')} {region === 'US' ? t('footer.usa') : t('footer.moldova')}
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="p-8 rounded-2xl border border-dashed border-border bg-surface flex flex-col items-center justify-center text-center transition-colors duration-500">
            <AlertCircle className="h-12 w-12 text-muted mb-4 transition-colors duration-500" />
            <h3 className="text-lg font-bold text-foreground mb-2 transition-colors duration-500">{t('shop.no_products_found')}</h3>
            <p className="text-muted max-w-md transition-colors duration-500">{t('shop.no_products_desc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Link key={product.id} href={`/shop/${product.slug}`} className="group flex flex-col bg-surface border border-card-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[4/3] relative overflow-hidden bg-background">
                  {product.imageUrl ? (
                    product.imageUrl.includes(',') ? (
                      <div className="w-full h-full flex items-center justify-center gap-2 p-6 bg-black/90">
                        {product.imageUrl.split(',').map((imgUrl, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-accent/30 shadow-lg bg-black/50 shrink-0 transform group-hover:scale-110 transition-transform duration-500">
                              <img src={imgUrl} alt={`${product.name} part ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                            {idx === 0 && <span className="text-white font-black text-3xl mb-1">+</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    )
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted transition-colors duration-500">No Image</div>
                  )}
                  {product.category && (
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white border border-white/10">
                      {product.category.name}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1 transition-colors duration-500">{product.name}</h3>
                  <p className="text-sm text-muted mb-4 line-clamp-2 flex-1 transition-colors duration-500">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-card-border transition-colors duration-500">
                    <span className="text-xl font-extrabold text-foreground transition-colors duration-500">
                      {currency === 'MDL' ? (product.priceMdl ? `${product.priceMdl} MDL` : 'N/A') : (product.priceUsd ? `$${product.priceUsd.toFixed(2)}` : 'N/A')}
                      <span className="text-xs text-muted ml-1 font-normal">/ {product.unit || '100g'}</span>
                    </span>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background group-hover:bg-accent group-hover:text-background text-muted transition-colors border border-card-border">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
