import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Star, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Product {
  id: string;
  name: string;
  priceUsd: number;
  priceMdl: number;
  imageUrl: string;
  tag?: string;
  slug: string;
}

export default function PresentationLayout({ renderToggleButtons, realProducts }: { renderToggleButtons: () => React.ReactNode, realProducts: Product[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const presentationRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
    // Hero Text Entrance
    gsap.from('.hero-text-anim', {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.2
    });

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
  }, { scope: presentationRef });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const slideHeight = window.innerHeight;
    const currentScroll = e.currentTarget.scrollTop;
    const slideIndex = Math.round(currentScroll / slideHeight);
    if (slideIndex !== activeSlide) {
      setActiveSlide(slideIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    const container = document.getElementById('presentation-container');
    if (container) {
      container.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
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
      
      {/* Scroll indicator dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {[0, 1, 2, 3, 4].map((idx) => (
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
        className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        
        {/* Slide 0: Hero Video (9:16 Format) */}
        <section className="h-[100dvh] w-full snap-start relative overflow-hidden flex flex-col items-center justify-center bg-[#050505] pt-16 pb-20 px-6 md:p-0 md:block">
          
          {/* Mobile Text (Top) */}
          <div className="w-full z-20 flex flex-col items-center justify-center text-center md:hidden shrink-0 mb-6 relative">
            <div>
              <h2 className="hero-text-anim text-[#0033FF] uppercase tracking-[0.4em] text-[10px] font-bold mb-3 drop-shadow-lg">The Experience</h2>
              <h1 className="hero-text-anim text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                Hear<br/>The Heat
              </h1>
            </div>
          </div>

          <div className="relative z-0 flex-grow w-full flex items-center justify-center md:h-full md:py-10">
            {/* 9:16 Video Container */}
            <div className="relative w-full max-w-[340px] aspect-[9/16] md:max-w-none md:w-auto md:h-[90vh] md:aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
              <video 
                ref={videoRef}
                src="/videos/5.mp4" 
                className={`absolute inset-0 w-full h-full object-cover scale-100 opacity-100`}
                autoPlay 
                loop 
                muted={false} 
                playsInline
              />
            </div>
          </div>
          
          {/* Ambient Glow behind the video on desktop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[60vh] bg-[#0033FF]/20 blur-[150px] rounded-full pointer-events-none hidden md:block z-0"></div>

          {/* Desktop Left Text */}
          <div className="absolute left-8 lg:left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex flex-col items-start">
            <h2 className="hero-text-anim text-[#0033FF] uppercase tracking-[0.4em] text-sm font-bold mb-4">
              The Experience
            </h2>
            <h1 className="hero-text-anim text-[8vw] xl:text-[10vw] font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
              Hear
            </h1>
          </div>

          {/* Desktop Right Text */}
          <div className="absolute right-8 lg:right-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex flex-col items-end text-right">
            <h1 className="hero-text-anim text-[8vw] xl:text-[10vw] font-black text-[#0033FF] uppercase tracking-tighter leading-none drop-shadow-2xl">
              The<br/>Heat
            </h1>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <div 
              className="animate-bounce flex flex-col items-center gap-2 text-white/50 cursor-pointer hover:text-white transition-colors"
              onClick={() => scrollToSlide(1)}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </section>

        {/* Slide 1: Product Showcase */}
        <section className="products-section h-[100dvh] w-full snap-start relative bg-[#050201] flex flex-col justify-center py-10 overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0033FF]/5 blur-[120px] rounded-full pointer-events-none"></div>
           
           <div className="relative z-10 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="hero-text-anim text-[#0033FF] uppercase tracking-[0.3em] font-bold text-sm block mb-4">The Collection</span>
                  <h2 className="hero-text-anim text-4xl md:text-6xl font-serif text-white font-bold">Premium Cuts</h2>
                </div>
              </div>

              <div className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {realProducts.map((item, i) => (
                  <Link href={`/shop/${item.slug}`} key={i} className="product-card-anim group relative min-w-[300px] w-[80vw] md:w-[400px] h-[55vh] md:h-[60vh] shrink-0 snap-center rounded-[2rem] overflow-hidden bg-[#050505] shadow-2xl">
                    <div className="absolute inset-2 border border-white/10 rounded-[1.5rem] overflow-hidden z-10 transition-colors duration-700 group-hover:border-[#0033FF]/60">
                      <div className="absolute inset-0 bg-[#000]">
                        {/* 100% opacity from the start, no filters */}
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-100" />
                      </div>
                      
                      {/* Only a bottom gradient so text is readable, rest of image is untouched */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80"></div>
                      
                      {item.tag && (
                        <div className="absolute top-4 left-4 z-20 rounded-full">
                          <div className="absolute inset-0 bg-[#0033FF]/10 backdrop-blur-md"></div>
                          <span className="relative px-3 py-1.5 flex items-center justify-center text-[#0033FF] text-[10px] font-black uppercase tracking-[0.2em] border border-[#0033FF]/30 rounded-full">{item.tag}</span>
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.25,1,0.5,1]">
                        <div className="w-8 h-[2px] bg-[#0033FF] mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                        <h3 className="font-serif text-2xl font-bold text-white mb-2 leading-tight">{item.name}</h3>
                        <div className="flex items-center justify-between mt-4 pt-2">
                          <span className="text-white/70 font-sans tracking-widest">${item.priceUsd}</span>
                          <div className="flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                            <span className="text-[#0033FF] text-[10px] font-bold uppercase tracking-[0.2em]">View</span>
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
        <section className="h-[100dvh] w-full snap-start relative bg-[#020202] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#0033FF]/5 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="text-center z-20 mb-8 md:mb-12 absolute top-16 md:top-24">
            <h2 className="text-[#0033FF] uppercase tracking-[0.3em] font-bold text-sm mb-2">Social Echo</h2>
            <h1 className="text-3xl md:text-5xl font-serif text-white font-bold">The Vibe</h1>
          </div>
          
          {/* 3D Carousel Perspective Container */}
          <div className="relative w-full max-w-[1400px] flex items-center justify-center h-[50vh] md:h-[65vh] z-10" style={{ perspective: '1200px' }}>
            
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

        {/* Slide 3: Map Section */}
        <section className="map-section h-[100dvh] w-full snap-start relative bg-[#050505] flex flex-col justify-center py-10 px-6 md:px-12">
          <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
            {/* Text Information */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left z-20">
               <span className="text-[#0033FF] uppercase tracking-[0.3em] font-bold text-sm block mb-4">Location</span>
               <h2 className="text-4xl md:text-6xl font-serif text-white font-bold mb-6">Where to find us</h2>
               <div className="h-[2px] w-12 bg-[#0033FF] mb-8 hidden md:block"></div>
               <p className="text-white/70 text-lg mb-4 font-light">Șos. Balcani 7B<br/>Tel. 061222213</p>
               <div className="text-sm text-white/50 space-y-2 mb-8">
                 <p><strong className="text-white">Mon - Fri:</strong> 11:00 AM - 9:00 PM</p>
                 <p><strong className="text-white">Sat - Sun:</strong> 10:00 AM - 10:00 PM</p>
               </div>
               <button className="border border-[#0033FF] text-[#0033FF] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#0033FF] hover:text-white transition-colors duration-300">
                 Get Directions
               </button>
            </div>
            
            {/* Map UI */}
            <div className="map-anim w-full md:w-2/3 h-[45vh] md:h-[65vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,51,255,0.08)] relative z-10 group bg-[#111]">
               <iframe 
                 src="https://maps.google.com/maps?q=We%20Smoke%20Fish,%20Şoseaua%20Balcani%207B,%20Chișinău&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: 'grayscale(100%) invert(100%) sepia(100%) hue-rotate(180deg) saturate(400%) contrast(90%) brightness(80%)' }} 
                 allowFullScreen 
                 loading="lazy" 
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
             <h2 className="text-5xl md:text-8xl font-serif text-white font-bold mb-8 drop-shadow-2xl">Taste the Tradition</h2>
             <Link href="/shop" className="group relative overflow-hidden bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
               <span className="relative z-10 flex items-center gap-3">
                 Enter the Shop
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
