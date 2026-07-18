'use client';

import { useState, useEffect } from "react";
import CinematicLayout from "@/components/layouts/CinematicLayout";
import PremiumLayout from "@/components/layouts/PremiumLayout";
import PresentationLayout from "@/components/layouts/PresentationLayout";

export default function Home() {
  const [heroMode, setHeroMode] = useState<'cinematic' | 'premium' | 'presentation'>('presentation');
  const [realProducts, setRealProducts] = useState<any[]>([]);

  useEffect(() => {
    import('../app/shop/actions').then(({ getShopData }) => {
      getShopData().then(data => {
        setRealProducts(data.products.slice(0, 4));
      });
    });
  }, []);

  const renderToggleButtons = () => (
    <div className="absolute top-6 left-6 z-50 flex gap-2 bg-black/50 p-2 rounded-xl backdrop-blur-md flex-wrap max-w-[90vw] border border-white/10 shadow-2xl">
      <button onClick={() => setHeroMode('premium')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'premium' ? 'bg-[#ff8c42] text-black shadow-[0_0_15px_rgba(255,140,66,0.4)]' : 'text-white/70 hover:bg-white/10'}`}>Premium Variant</button>
      <button onClick={() => setHeroMode('cinematic')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'cinematic' ? 'bg-[#4d7aff] text-white' : 'text-white/70 hover:bg-white/10'}`}>Cinematic</button>
      <button onClick={() => setHeroMode('presentation')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'presentation' ? 'bg-[#cca677] text-black shadow-[0_0_15px_rgba(204,166,119,0.4)]' : 'text-white/70 hover:bg-white/10'}`}>Presentation</button>
    </div>
  );

  if (heroMode === 'premium') {
    return <PremiumLayout renderToggleButtons={renderToggleButtons} realProducts={realProducts} />;
  }
  
  if (heroMode === 'presentation') {
    return <PresentationLayout renderToggleButtons={renderToggleButtons} realProducts={realProducts} />;
  }

  return <CinematicLayout renderToggleButtons={renderToggleButtons} realProducts={realProducts} />;
}
