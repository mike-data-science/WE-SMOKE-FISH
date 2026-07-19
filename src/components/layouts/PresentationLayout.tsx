import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Star, ChevronRight, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { googleReviews, reviewStats } from '../../data/reviews';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguageStore } from '../../i18n/store';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Product {
  id: string;
  name: string;
  priceUsd: number;
  priceMdl: number;
  imageUrl: string;
  tag?: string;
  slug: string;
  unit?: string;
}

export default function PresentationLayout({ renderToggleButtons, realProducts }: { renderToggleButtons: () => React.ReactNode, realProducts: Product[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const presentationRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [heroVariant, setHeroVariant] = useState<'A' | 'B'>('A');
  const [reviewVariant, setReviewVariant] = useState<'A' | 'B'>('B');
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  // Intersection Observer for Hero Video Pausing
  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP Animations
  useGSAP(() => {
    // 1. Hero Scroll Scrub Animation
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-track',
        start: 'top top',
        end: 'bottom bottom', // When the bottom of the track hits the bottom of the screen
        scrub: 1, // Smooth scrub
        scroller: '#presentation-container'
      }
    });

    if (heroVariant === 'A') {
      // Variant A: Both Text and Video move left
      heroTl.to('.hero-video-container', {
        x: '-20vw', // Move left towards center
        scale: 0.95,
        ease: 'none'
      }, 0);

      heroTl.to('.hero-front-text', {
        xPercent: -100, // Move left (off screen)
        opacity: 0,
        ease: 'none'
      }, 0);
    } else {
      // Variant B: Text splits outwards, Video scales down
      heroTl.to('.hero-video-container', {
        scale: 0.95,
        ease: 'none'
      }, 0);

      heroTl.to('.hero-left-text', {
        xPercent: -100,
        opacity: 0,
        ease: 'none'
      }, 0);

      heroTl.to('.hero-right-text', {
        xPercent: 100,
        opacity: 0,
        ease: 'none'
      }, 0);

      heroTl.to('.hero-mobile-text', {
        y: -100,
        opacity: 0,
        ease: 'none'
      }, 0);
    }

    // Animate massive background text to fade out
    heroTl.to('.hero-bg-text', {
      opacity: 0,
      scale: 0.95,
      y: -50,
      ease: 'none'
    }, 0);

    heroTl.to('.hero-scroll-indicator', {
      opacity: 0,
      ease: 'none'
    }, 0);

    // Product Cards Entrance
    gsap.from('.product-card-anim', {
      scrollTrigger: {
        trigger: '.products-section',
        start: 'top 60%',
        scroller: '#presentation-container'
      },
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Map Entrance Zoom
    gsap.from('.map-anim', {
      scrollTrigger: {
        trigger: '.map-section',
        start: 'top 60%',
        scroller: '#presentation-container'
      },
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: 'back.out(1.2)'
    });
  }, { scope: presentationRef, dependencies: [heroVariant] });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const slideHeight = window.innerHeight;
    const currentScroll = e.currentTarget.scrollTop;
    
    // Map scroll position to visual active dot.
    // Slide 0 (Hero) is 200vh tall, so the other slides are pushed down by 100vh.
    let slideIndex = 0;
    if (currentScroll < slideHeight * 1.5) slideIndex = 0;
    else if (currentScroll < slideHeight * 2.5) slideIndex = 1;
    else if (currentScroll < slideHeight * 3.5) slideIndex = 2;
    else if (currentScroll < slideHeight * 4.5) slideIndex = 3;
    else if (currentScroll < slideHeight * 5.5) slideIndex = 4;
    else slideIndex = 5;

    if (slideIndex !== activeSlide) {
      setActiveSlide(slideIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    const container = document.getElementById('presentation-container');
    if (container) {
      const top = index === 0 ? 0 : (index + 1) * window.innerHeight;
      container.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white relative" ref={presentationRef}>
      <style>{`
        /* Hide global navbar for the presentation layout to provide a clean cinematic feel */
        header { display: none !important; }
        nav.sticky { display: none !important; }
      `}</style>
      
      {renderToggleButtons()}
      
      <div className="absolute top-6 right-6 z-50 flex gap-1 bg-black/50 p-1.5 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl">
        <button onClick={() => setLanguage('ro')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${language === 'ro' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'}`}>RO</button>
        <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${language === 'en' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'}`}>EN</button>
        <button onClick={() => setLanguage('ru')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${language === 'ru' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'}`}>RU</button>
      </div>


      {/* Scroll indicator dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <button 
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${activeSlide === idx ? 'bg-[#0033FF] scale-125 shadow-[0_0_10px_rgba(0,51,255,0.8)]' : 'bg-white/20 hover:bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div 
        id="presentation-container"
        onScroll={handleScroll}
        className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        
        {/* Slide 0: Hero Scroll-Scrub Track */}
        <section id="hero-track" className="h-[200dvh] w-full relative bg-[#050505]">
          
          {/* Sticky container that stays on screen while scrolling the 200vh track */}
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center pt-16 pb-20 px-6 md:p-0 md:block">
            
            {/* Variant Toggles (Dev / Demo) */}
            <div className="absolute top-24 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex gap-2 bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/20">
              {(['A', 'B'] as const).map(v => (
                <button 
                  key={v}
                  onClick={() => setHeroVariant(v)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${heroVariant === v ? 'bg-[#0033FF] text-white' : 'text-white/50 hover:text-white'}`}
                >
                  {v === 'A' ? t('hero.variant_a') : t('hero.variant_b')}
                </button>
              ))}
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[60vh] bg-[#0033FF]/20 blur-[150px] rounded-full pointer-events-none hidden md:block z-0"></div>

            {/* Massive Background Text (Like V5) */}
            <div className="hero-bg-text absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none pt-[10vh]">
               <h1 className="text-center text-[18vw] font-black text-white uppercase tracking-tighter leading-none opacity-20">
                 {t('hero.wait_is_over_1')}<br/>{t('hero.wait_is_over_2')}
               </h1>
            </div>

            {/* The Content: Text and Video Layouts */}
            {heroVariant === 'A' ? (
              <div className="hero-video-wrapper relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 pt-20 pb-10 md:py-10">
                <div className="hero-front-text flex flex-col items-center md:items-start justify-center z-30 text-center md:text-left">
                    <h1 className="text-[12vw] md:text-[8vw] lg:text-[10vw] font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-[0_0_30px_rgba(0,51,255,0.8)]">
                      {t('hero.we_are_1')}<br/><span className="text-[#0033FF]">{t('hero.open')}</span>
                    </h1>
                </div>

                <div className="hero-video-container relative w-full max-w-[320px] aspect-[9/16] md:max-w-none md:w-auto md:h-[80vh] md:aspect-[9/16] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,51,255,0.2)] bg-black shrink-0">
                  <video src="/videos/5.mp4" autoPlay loop muted={isMuted} playsInline className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="absolute bottom-4 right-4 z-50 bg-black/50 hover:bg-black/80 backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10 shadow-lg pointer-events-auto">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="hero-video-wrapper relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-6 pt-20 pb-10 md:py-10">
                <div className="hero-left-text hidden md:flex flex-col items-end justify-center z-30 text-right w-1/4">
                    <h1 className="text-[8vw] font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-[0_0_30px_rgba(0,51,255,0.8)]">
                      {t('hero.we_are_2')}<br/>{t('hero.we_are_3')}
                    </h1>
                </div>

                <div className="hero-video-container relative w-full max-w-[320px] aspect-[9/16] md:max-w-none md:w-auto md:h-[80vh] md:aspect-[9/16] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,51,255,0.2)] bg-black shrink-0">
                  <video src="/videos/5.mp4" autoPlay loop muted={isMuted} playsInline className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="absolute bottom-4 right-4 z-50 bg-black/50 hover:bg-black/80 backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10 shadow-lg pointer-events-auto">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
                
                <div className="hero-right-text hidden md:flex flex-col items-start justify-center z-30 text-left w-1/4">
                    <h1 className="text-[10vw] font-black text-[#0033FF] uppercase tracking-tighter leading-[0.85] drop-shadow-[0_0_30px_rgba(0,51,255,0.8)]">
                      {t('hero.open').toUpperCase()}
                    </h1>
                </div>

                <div className="hero-mobile-text flex md:hidden flex-col items-center justify-center z-30 text-center">
                    <h1 className="text-[12vw] font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-[0_0_30px_rgba(0,51,255,0.8)]">
                      {t('hero.we_are_1')}<br/><span className="text-[#0033FF]">{t('hero.open')}</span>
                    </h1>
                </div>
              </div>
            )}

            <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto hidden md:block">
              <div 
                className="animate-bounce flex flex-col items-center gap-2 text-white/50 cursor-pointer hover:text-white transition-colors"
                onClick={() => scrollToSlide(1)}
              >
                <span className="text-[10px] uppercase tracking-widest font-bold">{t('hero.scroll_down')}</span>
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

          </div>
        </section>

        {/* Slide 1: Product Showcase */}
        <section className="products-section h-[100dvh] w-full relative bg-[#050201] flex flex-col justify-center py-10 overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0033FF]/5 blur-[120px] rounded-full pointer-events-none"></div>
           
           <div className="relative z-10 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mb-3">
                <div>
                  <span className="hero-text-anim text-[#0033FF] uppercase tracking-[0.3em] font-bold text-sm block mb-4">{t('products.subtitle')}</span>
                  <h2 className="hero-text-anim text-4xl md:text-6xl font-serif text-white font-bold leading-none">{t('products.title')}</h2>
                </div>
                
                <Link href="/shop" className="hero-text-anim flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                  <span className="text-xs uppercase tracking-widest font-bold">{t('products.view_all')}</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#0033FF] group-hover:bg-[#0033FF]/10 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              <div className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {realProducts.map((item, i) => (
                  <Link href={`/shop/${item.slug}`} key={i} className="product-card-anim group relative min-w-[280px] w-[75vw] aspect-[3/4] md:w-[380px] md:aspect-[3/4] md:h-auto shrink-0 snap-center rounded-[2rem] overflow-hidden bg-[#050505] shadow-2xl">
                    <div className="absolute inset-2 border border-white/10 rounded-[1.5rem] overflow-hidden z-10 transition-colors duration-700 md:group-hover:border-[#0033FF]/60">
                      <div className="absolute inset-0 bg-[#000]">
                        {item.imageUrl.includes(',') ? (
                          <div className="w-full h-full flex items-center justify-center gap-2 p-6 pb-20">
                            {item.imageUrl.split(',').map((imgUrl, idx) => (
                              <React.Fragment key={idx}>
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#0033FF]/30 shadow-[0_0_20px_rgba(0,51,255,0.2)] bg-black/50 shrink-0 transform group-hover:scale-110 transition-transform duration-700">
                                  <img src={imgUrl} alt={`${item.name} part ${idx + 1}`} className="w-full h-full object-cover" />
                                </div>
                                {idx === 0 && <span className="text-white/80 font-black text-4xl mb-2 drop-shadow-lg">+</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        ) : (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-100" />
                        )}
                      </div>
                      
                      {/* Only a bottom gradient so text is readable, rest of image is untouched */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80"></div>
                      
                      {item.tag && (
                        <div className="absolute top-4 left-4 z-20 rounded-full">
                          <div className="absolute inset-0 bg-[#0033FF]/10 backdrop-blur-md"></div>
                          <span className="relative px-3 py-1.5 flex items-center justify-center text-[#0033FF] text-[10px] font-black uppercase tracking-[0.2em] border border-[#0033FF]/30 rounded-full">{item.tag}</span>
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 md:pb-16 z-20 flex flex-col justify-end transform translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-700 ease-[0.25,1,0.5,1]">
                        <div className="w-8 h-[2px] bg-[#0033FF] mb-4 transform origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-700"></div>
                        <h3 className="font-serif text-2xl font-bold text-white mb-2 leading-tight">{item.name}</h3>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <span className="text-white/70 font-sans tracking-widest text-sm md:text-base">${item.priceUsd} <span className="text-[10px] md:text-xs text-white/40">/ {item.unit || t('products.unit')}</span></span>
                          <div className="flex items-center gap-3 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-200">
                            <span className="text-[#0033FF] text-[10px] font-bold uppercase tracking-[0.2em]">{t('products.view', { fallback: 'View' })}</span>
                            <div className="h-8 w-8 rounded-full border border-[#0033FF]/30 flex items-center justify-center text-[#0033FF] bg-[#0033FF]/10"><ArrowRight className="h-3 w-3" /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
           </div>
        </section>

        {/* Slide 2: TikTok 3D Gallery */}
        <section className="w-full relative bg-[#050505] flex flex-col items-center pt-4 md:pt-8 pb-8 md:pb-12 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 bg-[#0033FF]/5 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="text-center z-20 mb-4 md:mb-6 flex flex-col items-center">
            <span className="text-[#0033FF] text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">{t('gallery.meet_makers')}</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white font-black tracking-tight">{t('gallery.title')}</h2>
          </div>
          
          {/* 3D Carousel Perspective Container */}
          <div className="relative w-full max-w-[1400px] flex items-center justify-center h-[350px] sm:h-[450px] md:h-[700px] z-10" style={{ perspective: '1200px' }}>
            
            {/* Far Left Video */}
            <div className="absolute left-[5%] md:left-[10%] z-0 w-[100px] sm:w-[130px] md:w-[260px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-30 hover:opacity-100 hover:z-30 transition-all duration-700 cursor-pointer" 
                 style={{ transform: 'translate(-50%, 0) rotateY(35deg) rotateZ(-5deg) scale(0.7)' }}>
              <video src="/videos/1.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
              <div className="absolute inset-0 bg-black/50 hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Left Video */}
            <div className="absolute left-[20%] sm:left-[25%] md:left-[25%] z-10 w-[120px] sm:w-[160px] md:w-[320px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-60 hover:opacity-100 hover:z-30 transition-all duration-700 cursor-pointer" 
                 style={{ transform: 'translate(-50%, 0) rotateY(15deg) rotateZ(-2deg) scale(0.85)' }}>
              <video src="/videos/2.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
              <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Center Video */}
            <div className="absolute left-1/2 z-20 w-[140px] sm:w-[190px] md:w-[360px] aspect-[9/16] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,51,255,0.25)] border border-[#0033FF]/40 hover:scale-105 transition-transform duration-700" 
                 style={{ transform: 'translate(-50%, 0)' }}>
              <video src="/videos/3.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
            </div>

            {/* Right Video */}
            <div className="absolute right-[20%] sm:right-[25%] md:right-[25%] z-10 w-[120px] sm:w-[160px] md:w-[320px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-60 hover:opacity-100 hover:z-30 transition-all duration-700 cursor-pointer" 
                 style={{ transform: 'translate(50%, 0) rotateY(-15deg) rotateZ(2deg) scale(0.85)' }}>
              <video src="/videos/4.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
              <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Far Right Video */}
            <div className="absolute right-[5%] md:right-[10%] z-0 w-[100px] sm:w-[130px] md:w-[260px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-30 hover:opacity-100 hover:z-30 transition-all duration-700 cursor-pointer" 
                 style={{ transform: 'translate(50%, 0) rotateY(-35deg) rotateZ(5deg) scale(0.7)' }}>
              <video src="/videos/5.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
              <div className="absolute inset-0 bg-black/50 hover:bg-transparent transition-colors duration-500"></div>
            </div>

          </div>
        </section>

        {/* Slide 3: Google Reviews */}
        <section className="w-full relative bg-[#020202] flex flex-col py-24 md:py-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0033FF]/5 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 px-6 md:px-12 w-full max-w-[1600px] mx-auto mb-2 flex justify-end items-end">
            
            {/* Review Variant Toggles (Dev / Demo) */}
            <div className="hidden md:flex gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10">
              {(['A', 'B'] as const).map(v => (
                <button 
                  key={v}
                  onClick={() => setReviewVariant(v)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${reviewVariant === v ? 'bg-[#0033FF] text-white' : 'text-white/50 hover:text-white'}`}
                >
                  {v === 'A' ? t('hero.variant_a') : t('hero.variant_b')}
                </button>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 12px)); }
            }
            .animate-scroll-left {
              animation: scroll-left 350s linear infinite;
              display: flex;
              width: max-content;
            }
            .animate-scroll-left:hover {
              animation-play-state: paused;
            }
          `}</style>

          {reviewVariant === 'A' ? (
            <div className="relative w-full overflow-hidden py-8">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none"></div>
              
              <div className="animate-scroll-left gap-6 px-6">
                {/* Duplicate array for seamless infinite scroll */}
                {[...googleReviews, ...googleReviews].map((review, i) => (
                  <div key={i} className="w-[85vw] md:w-[450px] bg-[#0a0a0a] rounded-3xl p-6 md:p-8 border border-white/5 hover:border-[#0033FF]/30 transition-colors duration-500 shrink-0 flex flex-col justify-between shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0033FF]/20 border border-[#0033FF]/50 flex items-center justify-center text-white font-bold text-base md:text-lg overflow-hidden shrink-0">
                            {review.avatarUrl ? (
                              <img src={review.avatarUrl} alt={review.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              review.avatar
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-sm md:text-lg">{review.author}</h4>
                            <span className="text-white/40 text-[10px] md:text-xs">{review.time}</span>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 md:w-4 md:h-4 text-[#0033FF] fill-[#0033FF]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/80 font-light leading-relaxed text-sm md:text-base line-clamp-4">"{review.text}"</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                         <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest">Google Review</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative z-10 px-6 md:px-12 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 h-full max-h-[60vh]">
              {/* Left Column */}
              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <div>
                  <span className="text-[#0033FF] uppercase tracking-[0.3em] font-bold text-xs block mb-3">{t('testimonials.subtitle')}</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">{t('testimonials.title')}</h2>
                  <p className="text-white/70 font-light leading-relaxed text-base md:text-lg">
                    {t('testimonials.description')}
                  </p>
                </div>

                {/* Avatars & Rating */}
                <div className="flex items-center gap-5 mt-6">
                  {/* 1. Avatars Group */}
                  <div className="flex -space-x-5">
                    {googleReviews.slice(0, 3).map((review, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-full border-2 border-[#020202] bg-[#0033FF]/20 flex items-center justify-center text-white font-bold text-lg relative z-10 overflow-hidden shrink-0">
                        {review.avatarUrl ? (
                          <img src={review.avatarUrl} alt={review.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          review.avatar
                        )}
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-[#020202] bg-[#0033FF] flex items-center justify-center text-white text-sm font-black shadow-[0_0_15px_rgba(0,51,255,0.4)] z-20">
                      +{reviewStats.totalReviews > 3 ? reviewStats.totalReviews - 3 : 0}
                    </div>
                  </div>

                  {/* 2. Large Average Score */}
                  <div className="text-white text-4xl font-black tracking-tight">
                    {reviewStats.averageRating.toFixed(1)}
                  </div>

                  {/* 3. Stars and Total Reviews */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(reviewStats.averageRating) ? 'text-[#0033FF] fill-[#0033FF]' : 'text-white/20'}`} />)}
                    </div>
                    <span className="text-white/60 text-xs font-bold">
                      {reviewStats.totalReviews}+ Reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Carousel */}
              <div className="w-full lg:w-2/3 relative overflow-hidden py-8" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div className="animate-scroll-left gap-6 px-6">
                  {/* Duplicate array for seamless infinite scroll */}
                  {[...googleReviews, ...googleReviews].map((review, i) => (
                    <div key={i} className="w-[85vw] md:w-[400px] bg-[#0a0a0a] rounded-3xl p-6 md:p-8 border border-white/5 hover:border-[#0033FF]/30 transition-colors duration-500 shrink-0 flex flex-col justify-between shadow-2xl">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0033FF]/20 border border-[#0033FF]/50 flex items-center justify-center text-white font-bold text-base md:text-lg overflow-hidden shrink-0">
                              {review.avatarUrl ? (
                                <img src={review.avatarUrl} alt={review.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                review.avatar
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-sm md:text-lg">{review.author}</h4>
                              <span className="text-white/40 text-[10px] md:text-xs">{review.time}</span>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, idx) => (
                              <Star key={idx} className="w-3 h-3 md:w-4 md:h-4 text-[#0033FF] fill-[#0033FF]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/80 font-light leading-relaxed text-sm md:text-base line-clamp-4">"{review.text}"</p>
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                           <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest">{t('testimonials.google_review')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Slide 4: Map Section */}
        <section className="map-section w-full relative bg-black flex flex-col items-center pt-12 pb-24 md:pt-16 md:pb-32 px-6 md:px-12">
          <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
            {/* Text Information */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left z-20">
               <span className="text-[#0033FF] uppercase tracking-[0.3em] font-bold text-sm block mb-4">{t('location.subtitle')}</span>
               <h2 className="text-4xl md:text-6xl font-serif text-white font-bold mb-6">{t('location.title')}</h2>
               <div className="h-[2px] w-12 bg-[#0033FF] mb-8 hidden md:block"></div>
               <p className="text-white/70 text-lg mb-4 font-light">{t('location.address')}<br/>{t('location.phone')}</p>
               <div className="text-sm text-white/50 space-y-2 mb-8">
                 <p><strong className="text-white">{t('location.schedule')}</strong> {t('location.hours')}</p>
               </div>
               <button className="border border-[#0033FF] text-[#0033FF] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#0033FF] hover:text-white transition-colors duration-300">
                 {t('location.get_directions')}
               </button>
            </div>
            
            {/* Map UI */}
            <div className="map-anim w-full md:w-2/3 h-[45vh] md:h-[65vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,51,255,0.08)] relative z-10 group bg-[#111]">
               <iframe 
                 src="https://maps.google.com/maps?q=We+Smoke+Fish+Chisinau&t=m&z=15&output=embed&iwloc=near" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: 'grayscale(100%) invert(100%) sepia(100%) hue-rotate(180deg) saturate(400%) contrast(90%) brightness(80%)' }} 
                 allowFullScreen 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="transition-transform duration-[3s]"
                 title="We Smoke Fish Location"
               ></iframe>
               <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[2rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"></div>
            </div>
          </div>
        </section>

        {/* Slide 4: Outro / Contact */}
        <section className="h-[100dvh] w-full snap-start relative bg-black flex items-center justify-center text-center">
           <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#0033FF] rounded-full blur-[150px] mix-blend-screen animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-white rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
           </div>
           
           <div className="relative z-10 flex flex-col items-center px-6">
             <h2 className="text-5xl md:text-8xl font-serif text-white font-bold mb-8 drop-shadow-2xl">{t('outro.title')}</h2>
             <Link href="/shop" className="group relative overflow-hidden bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
               <span className="relative z-10 flex items-center gap-3">
                 {t('outro.enter_shop')}
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0033FF]/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
             </Link>
             
             {/* Social Links */}
             <div className="mt-20 flex flex-row items-center justify-center gap-10">
               <a href="https://tiktok.com/@wesmokefishmd" target="_blank" rel="noreferrer" className="text-white hover:text-[#0033FF] hover:scale-110 transition-all duration-300" aria-label="TikTok">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="28" height="28" fill="currentColor">
                   <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h.12A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/>
                 </svg>
               </a>
               <a href="https://instagram.com/wesmokefishmd" target="_blank" rel="noreferrer" className="text-[#E1306C] hover:text-[#0033FF] hover:scale-110 transition-all duration-300" aria-label="Instagram">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="28" height="28" fill="currentColor">
                   <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                 </svg>
               </a>
               <a href="https://www.youtube.com/channel/UCl_12DTpE2akQXSpBK7WvLA" target="_blank" rel="noreferrer" className="text-[#FF0000] hover:text-[#0033FF] hover:scale-110 transition-all duration-300" aria-label="YouTube">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="32" height="32" fill="currentColor">
                   <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                 </svg>
               </a>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
}
