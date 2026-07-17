'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star } from "lucide-react";
import PhotoHero from "../PhotoHero";
import photoBg from "../../../recreate_picture_better_qualities_2K_202607160953.jpeg";
import productsBg from "../../../Fish_market_display_case_products_202607161742.jpeg";
import { useRegionStore } from '@/store/useRegionStore';

export default function PhotoLayout({ 
  renderToggleButtons, 
  realProducts 
}: { 
  renderToggleButtons: () => React.ReactNode,
  realProducts: any[]
}) {
  const region = useRegionStore((state) => state.region);

  return (
    <div 
      className="flex flex-col w-full text-[#fcfcfc] font-sans transition-colors duration-500 overflow-x-hidden relative"
    >
      {/* Fixed Environmental Background with a heavy dark overlay to let the bricks/wood peek through */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${photoBg.src})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/95 via-[#1a1311]/90 to-[#0a0a0a]/95"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full">
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative">
          {renderToggleButtons()}
          <PhotoHero heroBgSrc={photoBg.src} productsBgSrc={productsBg.src} />
        </section>

        {/* ==================== THE PROCESS (ABOUT) ==================== */}
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/10">
          {/* Warm ambient light source */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#ff8c42]/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                <span className="text-xs font-semibold text-[#ffb84d] uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,184,77,0.4)]">The Process</span>
                <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-white text-shadow-sm">
                  Patience, Wood, <br />and Time.
                </h2>
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  We believe that the best things cannot be rushed. Our fish is sourced from the finest waters and smoked slowly over carefully selected wood chips, honoring generations of craftsmanship.
                </p>
                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center h-12 px-8 bg-[#ff8c42] text-black font-sans text-sm font-bold tracking-widest uppercase hover:bg-[#ffa66b] transition-colors shadow-[0_0_20px_rgba(255,140,66,0.3)]"
                  >
                    Read Our Story
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-6 relative">
                  {/* Faux wood frame borders for images */}
                  <div className="mt-12 relative p-2 bg-[#2a1b14]/50 border border-[#4a2e20]/40 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <img src="/images/owner.jpg" alt="Craftsmanship" className="w-full aspect-[3/4] object-cover rounded-sm sepia-[0.2]" />
                  </div>
                  <div className="relative p-2 bg-[#2a1b14]/50 border border-[#4a2e20]/40 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <img src="/images/interior.png" alt="Smokehouse" className="w-full aspect-[3/4] object-cover rounded-sm sepia-[0.2]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== VISIT US ==================== */}
        <section className="relative py-24 md:py-32 text-center overflow-hidden border-t border-[#4a2e20]/30">
          {/* Central warm light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ff8c42]/5 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="max-w-3xl mx-auto px-6 relative z-10 bg-black/40 backdrop-blur-sm p-12 border border-white/5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 text-shadow-sm">Visit Our Smokehouse</h2>
            <p className="text-lg text-white/70 font-light mb-10">
              Experience the aroma of freshly smoked fish. Our doors in Chișinău are open to those who appreciate the true taste of tradition.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm font-sans tracking-wide text-white/80 mb-12">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#ffb84d]" />
                <span>Șoseaua Balcani 7B, Chișinău</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#ffb84d]" />
                <span>10:00 – 22:00 Daily</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-10 border border-[#ff8c42] text-[#ff8c42] font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#ff8c42] hover:text-black transition-colors shadow-[0_0_15px_rgba(255,140,66,0.2)]"
            >
              Get Directions
            </Link>
          </div>
        </section>

        {/* ==================== MATERIAL FOOTER ==================== */}
        <footer className="relative bg-[#050403]/95 border-t border-[#4a2e20]/50 text-white/60 font-sans">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col" style={{ lineHeight: '0.85' }}>
                    <span className="text-[14px] font-extrabold text-[#ffb84d] self-center">we</span>
                    <span className="text-[18px] font-black text-white">smoke</span>
                    <span className="text-[15px] font-extrabold text-[#ffb84d] self-center" style={{ marginLeft: '0.2em' }}>fish</span>
                  </div>
                </div>
                <p className="text-sm font-light leading-relaxed mt-4">
                  Premium smoked fish crafted with tradition.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Explore</h4>
                <div className="space-y-3">
                  {['Home', 'Products', 'About', 'Contact'].map((item) => (
                    <Link 
                      key={item} 
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                      className="block text-sm hover:text-[#ffb84d] transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Contact</h4>
                <div className="space-y-3 text-sm font-light">
                  <p>wesmokefish@gmail.com</p>
                  <p>wesmokefishmd@gmail.com</p>
                  <p>Șoseaua Balcani 7B, Chișinău</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">Hours</h4>
                <div className="space-y-3 text-sm font-light">
                  <p>Monday – Sunday</p>
                  <p className="font-medium text-white/80">10:00 – 22:00</p>
                </div>
                <div className="flex items-center gap-1 mt-6">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-[#ffb84d] text-[#ffb84d]" />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light">
              <p>© {new Date().getFullYear()} We Smoke Fish. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">🇲🇩 Moldova</span>
                <span className="flex items-center gap-2">🇺🇸 United States</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
