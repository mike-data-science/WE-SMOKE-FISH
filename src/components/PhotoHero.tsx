'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRegionStore } from '../store/useRegionStore';

gsap.registerPlugin(ScrollTrigger);

interface PhotoHeroProps {
  heroBgSrc: string;
  productsBgSrc: string;
}

export default function PhotoHero({ heroBgSrc, productsBgSrc }: PhotoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [realProducts, setRealProducts] = useState<any[]>([]);
  const { region } = useRegionStore();

  useEffect(() => {
    setMounted(true);
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

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // --- Hero entrance animations ---
      gsap.fromTo(
        '.photo-hero-title span',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.3,
        }
      );


      // --- Scroll indicator bounce ---
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

      // --- SCROLL TRANSITION: Hero → Glass Panel ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Hero: scale up slightly and darken
      tl.to(
        heroImgRef.current,
        {
          scale: 1.1,
          duration: 1,
          ease: 'none',
        },
        0
      );

      // Darken overlay
      tl.to(
        '.hero-dark-overlay',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'none',
        },
        0
      );

      tl.to(
        heroContentRef.current,
        {
          opacity: 0,
          y: -40,
          duration: 0.5,
          ease: 'none',
        },
        0
      );

      // Scroll indicator hide early
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'none',
        },
        0
      );

      // Glass Panel: slide up from bottom
      tl.fromTo(
        productsRef.current,
        {
          y: '100%',
        },
        {
          y: '0%',
          duration: 0.8,
          ease: 'power2.out',
        },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div className="photo-hero-root relative w-full h-full">
      {/* Global overrides for this mode */}
      <style>{`
        nav { display: none !important; }
        ::-webkit-scrollbar { display: none !important; }
        html { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
        {/* ============= SECTION 1: HERO (Storefront Wall) ============= */}
        <div ref={heroRef} className="absolute inset-0 z-10">
          {/* Background Image */}
          <div ref={heroImgRef} className="absolute inset-0 will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroBgSrc}
              alt="We Smoke Fish storefront"
              className="w-full h-full object-cover object-[35%_top] xl:object-top"
            />
            {/* Dynamic Dark Overlay for transition */}
            <div className="hero-dark-overlay absolute inset-0 bg-black/60 opacity-0 pointer-events-none transition-opacity" />
          </div>

          {/* Content layer */}
          <div ref={heroContentRef} className="absolute inset-0 z-20">
            {/* "we smoke fish" text — positioned over left brick wall */}
            <div className="absolute top-[20%] left-[6%] sm:top-[22%] sm:left-[8%] md:top-[24%] md:left-[10%] lg:top-[26%] lg:left-[12%] xl:left-[14%]">
              <h1 className="photo-hero-title text-[44px] sm:text-[64px] md:text-[84px] lg:text-[110px] xl:text-[120px] font-black leading-[0.82] tracking-tighter">
                <span className="block text-black mix-blend-multiply drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]">we</span>
                <span className="block text-[#e81414] drop-shadow-[0_2px_12px_rgba(232,20,20,0.2)]">smoke</span>
                <span className="block text-black mix-blend-multiply ml-1 md:ml-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]">fish</span>
              </h1>
            </div>

            {/* Circular window placeholder */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 md:left-[50%] xl:left-[50%] hidden md:flex items-center justify-center">
              <div className="w-[180px] h-[180px] lg:w-[260px] lg:h-[260px] xl:w-[300px] xl:h-[300px] rounded-full border-[3px] border-white/20 bg-transparent backdrop-blur-[1px]"></div>
            </div>


          </div>
        </div>

        {/* ============= SECTION 2: GLASSMORPHIC PRODUCTS PANEL ============= */}
        <div
          ref={productsRef}
          className="absolute bottom-0 left-0 right-0 h-[75vh] sm:h-[65vh] bg-black/40 backdrop-blur-xl border-t border-white/20 rounded-t-[40px] z-30 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.3)] translate-y-full"
        >
          {/* Panel Header */}
          <div className="px-8 pt-10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 shrink-0">
            <div>
              <span className="text-[#e81414] text-[11px] font-bold tracking-widest uppercase mb-2 block">
                Fresh from the smokehouse
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Premium Selection
              </h2>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm transition-colors mt-4 sm:mt-0"
            >
              View Full Menu
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 2 Rows, 4 Columns Grid */}
          <div className="flex-1 overflow-y-auto px-8 pb-8 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 sm:gap-6 h-full min-h-[300px]">
              {displaySlots.map((item, i) => (
                <Link 
                  href={item ? `/shop/${item.slug}` : "#"}
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer flex flex-col h-full"
                >
                  {item ? (
                    <>
                      <div className="h-[65%] w-full relative overflow-hidden bg-black/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.imageUrl || ''}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between bg-black/20 backdrop-blur-sm">
                        <div>
                          <h3 className="font-bold text-white text-sm sm:text-base leading-tight line-clamp-1">{item.name}</h3>
                          <p className="text-white/50 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                        </div>
                        <span className="text-[#e81414] font-black text-sm sm:text-base mt-2">
                          {region === 'MD' ? `${item.priceMdl} MDL` : `$${item.priceUsd}`}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/10">
                      <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Available Soon</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ============= SCROLL INDICATOR ============= */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 mix-blend-multiply">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-black/40 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}
