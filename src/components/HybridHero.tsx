'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRegionStore } from '../store/useRegionStore';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

interface HybridHeroProps {
  heroBgSrc: string;
}

export default function HybridHero({ heroBgSrc }: HybridHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const dioramaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const region = useRegionStore((state) => state.region);
  const [realProducts, setRealProducts] = useState<any[]>([]);
  const [vitrineStyle, setVitrineStyle] = useState<'authentic' | 'modern' | 'smokehouse'>('authentic');
  const { t } = useTranslation();

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

  const vitrineStyles = {
    authentic: {
      backWall: 'bg-gradient-to-b from-[#e6e6e6] to-[#a0a0a0] border-[#888]',
      backLight: 'bg-[#cca677] shadow-[0_0_50px_#cca677]',
      ceiling: 'bg-gradient-to-b from-[#b0b0b0] to-[#888] border-[#666]',
      glassWallL: 'bg-gradient-to-r from-black/80 to-transparent bg-white/5',
      glassWallR: 'bg-gradient-to-l from-black/80 to-transparent bg-white/5',
      frontGlass: 'border-[#444]',
      floor: 'bg-[#d9d9d9] border-[#888]',
      grill: 'bg-[#1a1a1a]',
      grillStripe: '#333',
      tray: 'bg-[#c19a6b] border-[#a17a4b]',
      trayEmpty: 'text-[#3a2012]',
      tagHolder: 'bg-[#1a1a1a] text-white',
      tagPeg: 'bg-[#444]',
      name: t('hero.style_authentic'),
    },
    modern: {
      backWall: 'bg-gradient-to-b from-[#111] to-[#000] border-[#222]',
      backLight: 'bg-[#fff] shadow-[0_0_50px_#fff]',
      ceiling: 'bg-gradient-to-b from-[#222] to-[#111] border-[#333]',
      glassWallL: 'bg-gradient-to-r from-blue-900/20 to-transparent bg-white/5',
      glassWallR: 'bg-gradient-to-l from-blue-900/20 to-transparent bg-white/5',
      frontGlass: 'border-[#222]',
      floor: 'bg-[#0a0a0a] border-[#222]',
      grill: 'bg-[#000]',
      grillStripe: '#111',
      tray: 'bg-[#1a1a1a] border-[#333]',
      trayEmpty: 'text-white/40',
      tagHolder: 'bg-white text-black',
      tagPeg: 'bg-[#ddd]',
      name: t('hero.style_modern'),
    },
    smokehouse: {
      backWall: 'bg-gradient-to-b from-[#fcfbf9] to-[#f0ece1] border-[#e3dac9]',
      backLight: 'bg-[#ffffff] shadow-[0_0_50px_#ffffff]',
      ceiling: 'bg-gradient-to-b from-[#f5f2eb] to-[#e3dac9] border-[#d1c7b3]',
      glassWallL: 'bg-gradient-to-r from-white/60 to-transparent bg-white/10',
      glassWallR: 'bg-gradient-to-l from-white/60 to-transparent bg-white/10',
      frontGlass: 'border-[#e3dac9]',
      floor: 'bg-[#f5f2eb] border-[#e3dac9]',
      grill: 'bg-[#f0ece1]',
      grillStripe: '#e3dac9',
      tray: 'bg-[#fcfbf9] border-[#e3dac9]',
      trayEmpty: 'text-[#a39887]/50',
      tagHolder: 'bg-[#ffffff] text-[#5c4a3d] border-[#e3dac9]',
      tagPeg: 'bg-[#d1c7b3]',
      name: t('hero.style_smokehouse'),
    }
  };

  const activeStyle = vitrineStyles[vitrineStyle];

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
        
        {/* Style Toggle UI */}
        <div className="absolute top-[30vh] right-[2vw] z-[100] flex flex-col gap-2 bg-black/40 p-2.5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1 px-2 font-bold">{t('hero.display_style')}</div>
          {Object.keys(vitrineStyles).map((key) => {
            const styleKey = key as 'authentic' | 'modern' | 'smokehouse';
            return (
              <button
                key={styleKey}
                onClick={() => setVitrineStyle(styleKey)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 text-left w-[140px] flex items-center justify-between ${vitrineStyle === styleKey ? 'bg-gradient-to-r from-[#ff8c42] to-[#ff4a1c] text-black shadow-[0_5px_15px_rgba(255,140,66,0.4)] scale-105' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                {vitrineStyles[styleKey].name}
                {vitrineStyle === styleKey && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
              </button>
            );
          })}
        </div>
        {/* ============= SECTION 1: HERO (Storefront Wall) ============= */}
        <div ref={heroRef} className="absolute inset-0 z-10" style={{ transformStyle: 'preserve-3d' }}>
          <div ref={heroImgRef} className="absolute inset-0 will-change-transform transform-origin-bottom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroBgSrc} alt="Storefront" className="w-full h-full object-cover object-[35%_top] xl:object-top" />
            <div className="hero-dark-overlay absolute inset-0 bg-black/80 opacity-0 pointer-events-none" />
          </div>

          <div ref={heroContentRef} className="absolute inset-0 z-20 pointer-events-none">
            
            {/* Animated Smoke / Embers Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 mix-blend-screen">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-gradient-to-t from-[#ff4a1c] to-[#ff8c42] opacity-80"
                  style={{
                    width: Math.random() * 6 + 2 + 'px',
                    height: Math.random() * 6 + 2 + 'px',
                    left: Math.random() * 100 + '%',
                    bottom: '-10%',
                    filter: 'blur(1px)',
                    animation: `floatUp ${Math.random() * 5 + 5}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>
            
            <style>{`
              @keyframes floatUp {
                0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
                20% { opacity: 0.8; }
                80% { opacity: 0.5; }
                100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0); opacity: 0; }
              }
            `}</style>

            <div 
              className="absolute top-[20%] left-[6%] sm:top-[22%] sm:left-[8%] md:top-[24%] md:left-[10%] lg:top-[26%] lg:left-[12%] xl:left-[14%] transition-transform duration-1000 ease-out"
              onMouseMove={(e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 30;
                const y = (e.clientY / window.innerHeight - 0.5) * 30;
                e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translate(0px, 0px)`;
              }}
              style={{ pointerEvents: 'auto' }}
            >
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
          
          {/* The Authentic Deli Display Case */}
          <div className="relative w-full h-[85vh] perspective-[1800px] pointer-events-auto flex justify-center items-end pb-[5vh] transition-colors duration-1000">
            
            {/* 3D Box Center (Vertical Plane at Z=0) */}
            <div 
              className="relative w-[95%] max-w-[1400px] h-[350px] group/vitrine"
              style={{ transformStyle: 'preserve-3d', transform: 'scale(1.1) rotateX(-42deg) rotateY(0deg)', transition: 'transform 1s ease-out' }}
            >
              
              {/* 1. Back Wall */}
              <div 
                className={`absolute inset-0 border-[16px] shadow-[inset_0_50px_100px_rgba(0,0,0,0.5)] transition-colors duration-1000 ${activeStyle.backWall}`}
                style={{ transform: 'translateZ(-550px)' }}
              >
                 {/* Internal lighting strip */}
                 <div className={`absolute top-4 left-4 right-4 h-2 blur-[2px] transition-colors duration-1000 ${activeStyle.backLight}`}></div>
              </div>

              {/* 2. Top Metal Shelf (Ceiling) */}
              <div 
                className={`absolute top-0 w-full h-[250px] origin-top border-[12px] transition-colors duration-1000 ${activeStyle.ceiling}`}
                style={{ transform: 'translateZ(-300px) rotateX(-90deg)' }}
              ></div>

              {/* 3. Left Wall (Glass) */}
              <div 
                className={`absolute left-0 w-[550px] h-full origin-left pointer-events-none transition-colors duration-1000 ${activeStyle.glassWallL}`}
                style={{ transform: 'rotateY(90deg)', clipPath: 'polygon(300px 0, 100% 0, 100% 100%, 0 100%)' }}
              ></div>

              {/* 4. Right Wall (Glass) */}
              <div 
                className={`absolute right-0 w-[550px] h-full origin-right pointer-events-none transition-colors duration-1000 ${activeStyle.glassWallR}`}
                style={{ transform: 'rotateY(-90deg)', clipPath: 'polygon(0 0, 250px 0, 100% 100%, 0 100%)' }}
              ></div>

              {/* 5. Slanted Front Glass */}
              <div 
                className={`absolute bottom-0 w-full h-[461px] bg-gradient-to-t from-white/10 to-transparent origin-bottom border-t-[16px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-all duration-[1500ms] ease-in-out group-hover/vitrine:opacity-20 [transform:rotateX(40.6deg)] group-hover/vitrine:[transform:rotateX(130deg)] pointer-events-none overflow-hidden ${activeStyle.frontGlass}`}
              >
                 {/* Specular Reflection on Glass */}
                 <div className="absolute top-0 left-[-20%] w-[140%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-[35deg] transform origin-top-left transition-transform duration-[2000ms] group-hover/vitrine:translate-x-[100%]"></div>
              </div>

              {/* 6. Metal Floor */}
              <div 
                className={`absolute bottom-0 w-full h-[550px] origin-bottom border-x-[16px] shadow-[inset_0_50px_100px_rgba(0,0,0,0.6)] transition-colors duration-1000 ${activeStyle.floor}`}
                style={{ transform: 'rotateX(90deg)', transformStyle: 'preserve-3d' }}
              >
                 {/* Front Grill Texture (at bottom-0 because bottom is front) */}
                 <div className={`absolute bottom-[0px] left-[-16px] right-[-16px] h-[40px] shadow-[0_10px_20px_rgba(0,0,0,0.5)] origin-bottom transition-colors duration-1000 ${activeStyle.grill}`} style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 4px, ${activeStyle.grillStripe} 4px, ${activeStyle.grillStripe} 8px)`, transform: 'translateZ(20px) rotateX(-90deg)' }}></div>
                 
                 {/* Eight Wooden Trays (Attached to Floor) */}
                 <div 
                   className="absolute inset-0 top-[20px] bottom-[40px] px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-2 md:gap-4"
                   style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
                 >
                   {displaySlots.map((item, i) => (
                     <div 
                       key={i} 
                       className={`relative w-full h-full ${i >= 6 ? 'hidden lg:block' : i >= 4 ? 'hidden md:block' : 'block'}`} 
                       style={{ transformStyle: 'preserve-3d' }}
                     >
                       
                       {/* The Wooden Tray Structure */}
                       <div className={`absolute inset-0 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.9)] border-[8px] transition-colors duration-1000 ${activeStyle.tray}`} style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0,0,0,0.08) 15px, rgba(0,0,0,0.08) 18px)' }}>
                          
                          {/* The Fish Product */}
                          {item ? (
                            <Link 
                              href={`/shop/${item.slug}`} 
                              className="absolute inset-[10%] group cursor-pointer transition-transform duration-500 hover:scale-[1.1] hover:-translate-y-4"
                              style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                            >
                              <div className="w-full h-full relative rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden bg-black/80 border-[2px] border-white/10 group-hover:border-[#cca677]/80 group-hover:shadow-[0_40px_80px_rgba(204,166,119,0.4)] transition-all duration-500">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/smoked_fish.webp" alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 pointer-events-none">
                                  {/* White label removed per user request */}
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className="absolute inset-[10%] opacity-40 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] border border-black/20 flex items-center justify-center">
                              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mix-blend-color-burn ${activeStyle.trayEmpty}`}>{t('hero.empty_tray')}</span>
                            </div>
                          )}
                       </div>

                       {/* Price Tag Holder clipped to front lip (bottom edge) */}
                       <div 
                         className={`absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[40px] md:w-[60px] h-[30px] md:h-[40px] rounded shadow-2xl border-t-2 border-white/20 flex items-center justify-center origin-bottom transition-colors duration-1000 ${activeStyle.tagHolder}`}
                         style={{ transform: 'translateZ(20px) rotateX(-45deg)' }}
                       >
                         {item && <span className="text-[10px] font-bold">{region === 'MD' ? `${item.priceMdl} MDL` : `$${item.priceUsd}`}</span>}
                         <div className={`absolute top-[-10px] left-1/2 -translate-x-1/2 w-[15px] h-[10px] rounded-sm shadow-[0_5px_10px_black] transition-colors duration-1000 ${activeStyle.tagPeg}`}></div>
                       </div>
                       
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
          
          {/* Seamless Transition Gradient to Smokehouse */}
          <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050201] to-transparent pointer-events-none z-40"></div>
        </div>

        <div ref={scrollIndicatorRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 mix-blend-multiply">{t('hero.scroll')}</span>
          <ChevronDown className="h-4 w-4 text-black/40 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}
