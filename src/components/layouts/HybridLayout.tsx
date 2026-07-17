'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star } from "lucide-react";
import HybridHero from "../HybridHero";
import photoBg from "../../../recreate_picture_better_qualities_2K_202607160953.jpeg";
import productsBg from "../../../Fish_market_display_case_products_202607161742.jpeg";


import { useRegionStore } from '@/store/useRegionStore';
import { useEffect, useRef } from "react";
import bricksBg from "../../../materials/bricks.jpeg";

export default function HybridLayout({ 
  renderToggleButtons, 
  realProducts 
}: { 
  renderToggleButtons: () => React.ReactNode,
  realProducts: any[]
}) {
  const region = useRegionStore((state) => state.region);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple marquee animation logic could go here or be handled entirely by CSS
  }, []);

  return (
    <div className="flex flex-col w-full text-white transition-colors duration-500 overflow-x-hidden relative bg-[#0a0503]">
      
      {/* SVG Noise filter for the CSS Wood Texture */}
      <svg className="hidden">
        <filter id="wood-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.3" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.8 0 0 0  0 0.6 0 0 0  0 0 0 0.2 0" in="noise" result="coloredNoise" />
          <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
          <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
        </filter>
      </svg>

      <div className="relative z-10 flex flex-col w-full">
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative border-b-[8px] border-[#2a140a]">
          {renderToggleButtons()}
          <HybridHero heroBgSrc={photoBg.src} displayCaseBgSrc={productsBg.src} />
        </section>

        {/* ==================== SCROLLING MARQUEE (CSS WOOD TEXTURE) ==================== */}
        <div 
          className="w-full py-6 overflow-hidden flex whitespace-nowrap border-b-[8px] border-[#1f0f08] relative shadow-[inset_0_10px_30px_rgba(0,0,0,0.8),_0_20px_50px_rgba(0,0,0,0.9)] bg-[#2b170c]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 42px), linear-gradient(0deg, #1f0f08 0%, #3a2012 50%, #1f0f08 100%)`,
            filter: 'url(#wood-grain)'
          }}
        >
          {/* Subtle lighting overlay on the wood */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" style={{ filter: 'none' }}></div>
          
          <div className="animate-marquee flex gap-12 items-center text-[#ffb84d]/90 font-black uppercase tracking-[0.2em] text-sm md:text-base relative z-20">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="hover:text-white transition-colors text-shadow-sm mix-blend-hard-light">100% NATURAL WOOD</span>
                <span className="w-2 h-2 bg-[#ff8c42] rounded-full shadow-[0_0_12px_#ff8c42]"></span>
                <span className="hover:text-white transition-colors text-shadow-sm mix-blend-hard-light">NO PRESERVATIVES</span>
                <span className="w-2 h-2 bg-[#ff8c42] rounded-full shadow-[0_0_12px_#ff8c42]"></span>
                <span className="hover:text-white transition-colors text-shadow-sm mix-blend-hard-light">SMOKED DAILY</span>
                <span className="w-2 h-2 bg-[#ff8c42] rounded-full shadow-[0_0_12px_#ff8c42]"></span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== DYNAMIC STORE SECTION (BRICK TEXTURE) ==================== */}
        <section 
          className="py-24 relative overflow-hidden border-b-[8px] border-[#2a140a] shadow-[inset_0_20px_50px_rgba(0,0,0,0.9)]"
          style={{
            backgroundImage: `url(${bricksBg.src})`,
            backgroundSize: '800px auto', // Tiling size
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center top'
          }}
        >
          {/* Grungy vignette and lighting on the brick wall */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050201_90%)] pointer-events-none"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#ff8c42]/30 rounded-full blur-[150px] pointer-events-none mix-blend-color-dodge"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* The store info panel is a wooden plank board mounted on the brick wall */}
            <div 
              className="relative rounded-2xl overflow-hidden p-8 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.9),_inset_0_2px_4px_rgba(255,255,255,0.1)] border border-[#3a2012] bg-[#2b170c]"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.3) 42px), linear-gradient(90deg, #1f0f08 0%, #3a2012 50%, #1f0f08 100%)`,
                filter: 'url(#wood-grain)'
              }}
            >
              {/* Dark overlay to make text readable on the wood */}
              <div className="absolute inset-0 bg-[#0a0503]/70" style={{ filter: 'none' }}></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10" style={{ filter: 'none' }}>
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-xl">
                    Taste the <br/><span className="text-[#ffb84d]">Fire & Wood</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    Visit our flagship store in Chișinău. Smell the cherry wood and pick your fish fresh out of the smoker.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 bg-[#120804] border border-[#2a140a] rounded-xl px-4 py-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                      <MapPin className="h-5 w-5 text-[#ff8c42]" />
                      <span className="font-semibold text-sm text-white/90">Șoseaua Balcani 7B</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#120804] border border-[#2a140a] rounded-xl px-4 py-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                      <Clock className="h-5 w-5 text-[#ff8c42]" />
                      <span className="font-semibold text-sm text-white/90">10:00 – 22:00 Daily</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center h-14 px-8 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#ff8c42] text-[#120804] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-[0_10px_30px_rgba(255,107,43,0.3),_inset_0_2px_4px_rgba(255,255,255,0.4)] border border-[#ffa66b]"
                    >
                      Get Directions
                    </Link>
                  </div>
                </div>

                <div className="relative h-80 lg:h-full min-h-[320px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-[#2a140a]">
                  <img src="/images/interior.png" alt="Smokehouse" className="absolute inset-0 w-full h-full object-cover sepia-[0.3] brightness-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent flex items-end p-8">
                    <div className="flex items-center gap-2 bg-[#120804]/80 backdrop-blur-md border border-[#3a2012] rounded-full px-4 py-2 shadow-lg">
                      <Star className="h-4 w-4 fill-[#ffb84d] text-[#ffb84d]" />
                      <span className="text-white font-bold text-sm">Authentic Craftsmanship</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MATERIAL FOOTER (CSS WOOD TEXTURE) ==================== */}
        <footer 
          className="relative pt-20 pb-10 shadow-[inset_0_20px_50px_rgba(0,0,0,0.9)] bg-[#2b170c]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 80px, rgba(0,0,0,0.4) 80px, rgba(0,0,0,0.4) 85px), linear-gradient(0deg, #120804 0%, #2a140a 100%)`,
            filter: 'url(#wood-grain)'
          }}
        >
          {/* Heavy dark wash over the wood floor for the footer */}
          <div className="absolute inset-0 bg-[#070302]/90 mix-blend-multiply pointer-events-none" style={{ filter: 'none' }}></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10" style={{ filter: 'none' }}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col" style={{ lineHeight: '0.85' }}>
                    <span className="text-[16px] font-black text-white self-center">we</span>
                    <span className="text-[22px] font-black text-[#ff8c42] drop-shadow-[0_0_12px_rgba(255,140,66,0.5)]">smoke</span>
                    <span className="text-[18px] font-black text-white self-center" style={{ marginLeft: '0.2em' }}>fish</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium max-w-sm leading-relaxed text-shadow-sm">
                  The future of traditional smoked fish. We combine generations of know-how with uncompromising quality and real wood fire.
                </p>
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-[#120804] border border-[#3a2012] flex items-center justify-center hover:border-[#ff8c42] transition-colors cursor-pointer group shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                      <div className="h-4 w-4 bg-[#ffb84d] transition-colors drop-shadow-[0_0_8px_rgba(255,184,77,0.5)]" style={{ maskImage: 'url(/globe.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="text-[#ffb84d] font-bold text-sm tracking-wider mb-6 drop-shadow-md">EXPLORE</h4>
                <div className="space-y-4">
                  {['Shop', 'Our Story', 'Locations', 'Contact'].map((item) => (
                    <Link 
                      key={item} 
                      href={item === 'Shop' ? '/shop' : `/${item.toLowerCase().replace(' ', '-')}`} 
                      className="block text-white/50 text-sm font-medium hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 bg-[#0a0503] border border-[#2a140a] p-6 rounded-2xl shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),_0_2px_0_rgba(255,255,255,0.05)]">
                <h4 className="text-[#ffb84d] font-bold text-sm tracking-wider mb-4 drop-shadow-md">JOIN THE SMOKEHOUSE</h4>
                <p className="text-white/60 text-sm font-medium mb-4">Get notified about fresh catches and exclusive tasting events.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="flex-grow h-12 rounded-xl bg-[#050201] border border-[#1a0c06] px-4 text-white text-sm focus:outline-none focus:border-[#ff8c42] shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)]"
                  />
                  <button className="h-12 px-6 rounded-xl bg-gradient-to-b from-[#ff8c42] to-[#d66b26] text-black font-bold text-sm hover:brightness-110 transition-all shadow-[0_4px_10px_rgba(255,140,66,0.3),_inset_0_1px_1px_rgba(255,255,255,0.4)] border border-[#ff8c42]">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-[#2a140a] flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs font-medium">
              <p>© {new Date().getFullYear()} WE SMOKE FISH. FIRE & WOOD.</p>
              <div className="flex gap-6">
                <span>MOLDOVA</span>
                <span>USA</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
