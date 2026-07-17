'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRegionStore } from '../store/useRegionStore';

gsap.registerPlugin(ScrollTrigger);

interface HybridHeroProps {
  heroBgSrc: string;
  displayCaseBgSrc: string;
}

export default function HybridHero({ heroBgSrc, displayCaseBgSrc }: HybridHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const dioramaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const region = useRegionStore((state) => state.region);
  const [realProducts, setRealProducts] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Intro animations for text
      gsap.fromTo(
        '.photo-hero-title span',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.3 }
      );



      gsap.to(scrollIndicatorRef.current, {
        y: 8, duration: 1.2, ease: 'power1.inOut', repeat: -1, yoyo: true,
      });

      // SCROLL TRANSITION
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Zoom into the storefront heavily
      tl.to(heroImgRef.current, {
        scale: 2.5,
        y: '20%',
        duration: 1,
        ease: 'power1.inOut',
      }, 0);

      // Darken the storefront
      tl.to('.hero-dark-overlay', {
        opacity: 1,
        duration: 0.8,
        ease: 'power1.inOut',
      }, 0.2);

      // Fade out storefront text
      tl.to(heroContentRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.5,
        ease: 'none',
      }, 0);
      
      tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.2 }, 0);

      // 2. Bring in the CSS Diorama Display Case from below in 3D
      tl.fromTo(dioramaRef.current, {
        y: '100%',
        rotateX: 45,
        scale: 0.8,
        opacity: 0,
      }, {
        y: '0%',
        rotateX: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Fetch real products from backend

  const currentStyle = {
    outerTub: "bg-gradient-to-b from-white/10 to-black/40 border-[#1a1a1a]",
    iceBg1: "bg-[#eef5f9] opacity-90 mix-blend-overlay",
    iceBg2: "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-multiply",
    trayLink: "bg-gradient-to-br from-[#8b5a2b] to-[#5c3a18] shadow-[inset_0_10px_20px_rgba(0,0,0,0.6),_0_10px_20px_rgba(0,0,0,0.4)] border-[#3d2610]",
    trayHover: "hover:shadow-[inset_0_10px_20px_rgba(0,0,0,0.6),_0_15px_30px_rgba(0,0,0,0.6)]",
    productImageBg: "bg-black/10",
    priceTag: "bg-black/80 text-white border-white/20",
    bottomLip: "from-gray-900 via-gray-700 to-gray-900 border-white/20"
  };

  useEffect(() => {
    import('../app/shop/actions').then(({ getShopData }) => {
      getShopData().then(data => {
        setRealProducts(data.products.slice(0, 8));
      });
    });
  }, []);

  const displaySlots = Array.from({ length: 8 }).map((_, i) => {
    if (realProducts.length === 0) return null;
    return realProducts[i % realProducts.length];
  });

  const renderLabel = (item: any) => {
    if (!item) return null;
    const priceText = region === 'MD' ? `${item.priceMdl} MDL` : `$${item.priceUsd}`;

    return (
      <div className="absolute top-3 right-3 z-20 pointer-events-none origin-top-right transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
        <div className="bg-[#f4f1ea] px-3 py-2 border border-[#dcd3c6] shadow-[2px_3px_5px_rgba(0,0,0,0.2)] rounded-sm rotate-2 relative overflow-hidden flex flex-col items-end">
          <span className="text-[#5c4a3d] text-[8px] font-bold uppercase tracking-wider mb-0.5">{item.name}</span>
          <span className="text-[#3a2f26] text-[13px] font-black">{priceText}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="hybrid-hero-root relative w-full h-full">
      <style>{`
        nav { display: none !important; }
        ::-webkit-scrollbar { display: none !important; }
        html { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black" style={{ perspective: '1000px' }}>
        
        {/* ============= SECTION 1: HERO (Storefront Wall) ============= */}
        <div ref={heroRef} className="absolute inset-0 z-10" style={{ transformStyle: 'preserve-3d' }}>
          <div ref={heroImgRef} className="absolute inset-0 will-change-transform transform-origin-bottom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroBgSrc} alt="Storefront" className="w-full h-full object-cover object-[35%_top] xl:object-top" />
            <div className="hero-dark-overlay absolute inset-0 bg-black/80 opacity-0 pointer-events-none" />
          </div>

          <div ref={heroContentRef} className="absolute inset-0 z-20">
            <div className="absolute top-[20%] left-[6%] sm:top-[22%] sm:left-[8%] md:top-[24%] md:left-[10%] lg:top-[26%] lg:left-[12%] xl:left-[14%]">
              <h1 className="photo-hero-title text-[44px] sm:text-[64px] md:text-[84px] lg:text-[110px] xl:text-[120px] font-black leading-[0.82] tracking-tighter">
                <span className="block text-black mix-blend-multiply drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]">we</span>
                <span className="block text-[#e81414] drop-shadow-[0_2px_12px_rgba(232,20,20,0.2)]">smoke</span>
                <span className="block text-black mix-blend-multiply ml-1 md:ml-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]">fish</span>
              </h1>
            </div>


          </div>
        </div>

        {/* ============= SECTION 2: CSS 3D DIORAMA (Display Case) ============= */}
        <div ref={dioramaRef} className="absolute inset-0 z-30 flex flex-col justify-end pointer-events-none opacity-0 translate-y-full" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Top text layer - stays flat to screen */}
          <div className="absolute top-24 left-0 w-full text-center z-40">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
              The Display Case
            </h2>
          </div>

          {/* The Physical Display Case built with CSS */}
          <div className="relative w-full h-[85vh] perspective-[1200px] pointer-events-auto flex justify-center items-end pb-8 transition-colors duration-1000">
            {/* Outer glass and metal frame */}
            <div 
              className={`relative w-[95%] max-w-[1400px] h-[90%] backdrop-blur-md border-t-[16px] border-l-[8px] border-r-[8px] rounded-t-2xl overflow-hidden flex flex-col transition-all duration-700 ${currentStyle.outerTub}`}
              style={{ transform: 'rotateX(35deg)', transformOrigin: 'bottom' }}
            >
              {/* Inner depth shadow simulating the tub */}
              <div className="absolute inset-0 shadow-[inset_0_40px_60px_rgba(0,0,0,0.8)] pointer-events-none z-20"></div>
              
              {/* Photorealistic Display Case Background */}
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={displayCaseBgSrc} alt="Display Case" className="w-full h-full object-cover brightness-75 contrast-125 saturate-150" />
                {/* Cool blue/frost overlay to merge the photo with the physical fridge feel */}
                <div className="absolute inset-0 bg-[#eef5f9]/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>
              </div>

              {/* Grid of 8 Wooden Trays */}
              <div className="relative z-10 w-full h-full p-2 sm:p-4 md:p-6 grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 md:gap-5">
                {displaySlots.map((item, i) => (
                  <Link 
                    href={item ? `/shop/${item.slug}` : "#"}
                    key={i} 
                    className={`group relative w-full h-full rounded-md border-b-4 border-r-4 flex items-center justify-center p-1 sm:p-2 transition-all duration-500 ${currentStyle.trayLink} ${item ? `hover:scale-[1.02] ${currentStyle.trayHover} cursor-pointer` : 'cursor-default opacity-80'}`}
                  >
                    {item ? (
                      /* The Fish Product */
                      <div className={`w-full h-full relative rounded shadow-2xl overflow-hidden transition-colors duration-500 ${currentStyle.productImageBg}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl || ''} alt={item.name} className="w-full h-full object-cover" />
                        
                        {/* Render the dynamically selected label style */}
                        {renderLabel(item)}
                      </div>
                    ) : (
                      /* Empty Tray (Ice) */
                      <div className={`w-full h-full rounded shadow-inner flex flex-col items-center justify-center border border-black/5 transition-colors duration-500 ${currentStyle.productImageBg} opacity-50`}>
                        <span className="text-black/30 text-[8px] sm:text-xs font-bold uppercase tracking-widest text-center">Available Soon</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Bottom metal lip */}
              <div className={`absolute bottom-0 w-full h-8 bg-gradient-to-r border-t z-30 transition-colors duration-700 ${currentStyle.bottomLip}`}></div>
            </div>
          </div>
        </div>

        <div ref={scrollIndicatorRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 mix-blend-multiply">Scroll</span>
          <ChevronDown className="h-4 w-4 text-black/40 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}
