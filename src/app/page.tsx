'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import PresentationLayout from "@/components/layouts/PresentationLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
  const [realProducts, setRealProducts] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    import('../app/shop/actions').then(({ getShopData }) => {
      getShopData().then(data => {
        setRealProducts(data.products.slice(0, 4));
      });
    });
  }, []);

  const renderToggleButtons = () => (
    <div className="absolute top-6 left-6 z-50 flex gap-2 bg-black/50 p-2 rounded-xl backdrop-blur-md flex-wrap max-w-[90vw] border border-white/10 shadow-2xl">
      <Link href="/premium" className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors text-white/70 hover:bg-white/10`}>{t('nav.premium_variant')}</Link>
      <Link href="/cinematic" className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors text-white/70 hover:bg-white/10`}>{t('nav.cinematic')}</Link>
      <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors bg-[#cca677] text-black shadow-[0_0_15px_rgba(204,166,119,0.4)]`}>{t('nav.presentation')}</Link>
    </div>
  );

  return <PresentationLayout renderToggleButtons={renderToggleButtons} realProducts={realProducts} />;
}
