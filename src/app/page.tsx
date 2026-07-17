'use client';

import { useState, useEffect } from "react";
import CinematicLayout from "@/components/layouts/CinematicLayout";
import PhotoLayout from "@/components/layouts/PhotoLayout";
import HybridLayout from "@/components/layouts/HybridLayout";

export default function Home() {
  const [heroMode, setHeroMode] = useState<'cinematic' | 'photo' | 'hybrid'>('hybrid');
  const [realProducts, setRealProducts] = useState<any[]>([]);

  useEffect(() => {
    import('../app/shop/actions').then(({ getShopData }) => {
      getShopData().then(data => {
        setRealProducts(data.products.slice(0, 4));
      });
    });
  }, []);

  const renderToggleButtons = () => (
    <div className="absolute top-6 left-6 z-50 flex gap-2 bg-black/50 p-2 rounded-xl backdrop-blur-md flex-wrap max-w-[90vw]">
      <button onClick={() => setHeroMode('hybrid')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'hybrid' ? 'bg-[#1a3de8] text-white' : 'text-white/70 hover:bg-white/10'}`}>Hybrid Variant</button>
      <button onClick={() => setHeroMode('photo')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'photo' ? 'bg-[#1a3de8] text-white' : 'text-white/70 hover:bg-white/10'}`}>Photo Variant</button>
      <button onClick={() => setHeroMode('cinematic')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'cinematic' ? 'bg-[#1a3de8] text-white' : 'text-white/70 hover:bg-white/10'}`}>Cinematic</button>
    </div>
  );

  if (heroMode === 'photo') {
    return <PhotoLayout renderToggleButtons={renderToggleButtons} realProducts={realProducts} />;
  }

  if (heroMode === 'hybrid') {
    return <HybridLayout renderToggleButtons={renderToggleButtons} realProducts={realProducts} />;
  }

  return <CinematicLayout renderToggleButtons={renderToggleButtons} realProducts={realProducts} />;
}
