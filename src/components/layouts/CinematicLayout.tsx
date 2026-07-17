'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star, Play } from "lucide-react";
import { useState, useRef } from "react";
import { useRegionStore } from '@/store/useRegionStore';
import Testimonials from "../Testimonials";

export default function CinematicLayout({ 
  renderToggleButtons, 
  realProducts 
}: { 
  renderToggleButtons: () => React.ReactNode,
  realProducts: any[]
}) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const region = useRegionStore((state) => state.region);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((vid, i) => {
      if (vid && i !== index) {
        vid.pause();
      }
    });
    const vid = videoRefs.current[index];
    if (vid) {
      if (vid.paused) {
        vid.play();
        setActiveVideo(index);
      } else {
        vid.pause();
        setActiveVideo(null);
      }
    }
  };

  const videos = [
    { src: "/videos/4.mp4", title: "The Art of Smoking", desc: "How smoked fish tradition was born — a cinematic journey through centuries of craft", tag: "Documentary" },
    { src: "/videos/1.mp4", title: "Premium Fish & Yucola", desc: "We sell the most expensive fish — and here's how yucola is made", tag: "Educational" },
    { src: "/videos/2.mp4", title: "Building the Smokehouse", desc: "Every expense of building the most modern fish smokehouse, price by price", tag: "Business" },
    { src: "/videos/3.mp4", title: "The Fish King", desc: "The best influencer in the fish field — coming for all your clients 😎", tag: "Fun" },
    { src: "/videos/5.mp4", title: "Grand Opening", desc: "The day we opened our doors in Moldova — a dream come true", tag: "Milestone" },
  ];

  return (
    <div className="flex flex-col w-full bg-[#0d0d0d] transition-colors duration-500 overflow-x-hidden">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative flex items-center min-h-[92vh] overflow-hidden">
        {renderToggleButtons()}

        {/* Background: cinematic video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/images/storefront-wide.png"
            className="w-full h-full object-cover"
          >
            <source src="/videos/4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/85 via-[#1a1a1a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl space-y-6">
            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
              <span className="block">we</span>
              <span className="block text-[#4d7aff]">smoke</span>
              <span className="block">fish</span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-white/75 max-w-md leading-relaxed font-light">
              Premium smoked fish, hand-crafted with tradition and care. From our smokehouse to your table.
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center h-13 px-8 rounded-full bg-white text-[#1a1a1a] font-bold text-[15px] hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl"
              >
                Shop Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center h-13 px-8 rounded-full border-2 border-white/30 text-white font-semibold text-[15px] hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z" fill="var(--warm)"/>
          </svg>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="bg-warm">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Fresh from the smokehouse</span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tight">Our Products</h2>
            </div>
            <Link 
              href="/shop" 
              className="group inline-flex items-center gap-2 text-accent font-bold text-[15px] hover:gap-3 transition-all duration-300"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {realProducts.map((item, i) => {
              const price = region === 'MD' ? `${item.priceMdl} MDL` : `$${item.priceUsd}`;
              return (
                <Link href={`/shop/${item.slug}`} key={i} className={`flex flex-col h-full animate-fade-in-up delay-${(i+1)*100} group relative bg-surface rounded-3xl overflow-hidden border border-border card-hover cursor-pointer block`}>
                  <div className="relative h-56 overflow-hidden shrink-0">
                    <img 
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {item.tag && (
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        item.tag === 'Bestseller' ? 'bg-coral text-white' : 
                        item.tag === 'New' ? 'bg-accent text-white' : 
                        'bg-foreground/80 text-white'
                      }`}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-foreground text-lg line-clamp-2">{item.name}</h3>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-accent font-black text-lg">{price}</span>
                      <button className="h-9 w-9 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                        <span className="text-lg font-light">+</span>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT TEASER ==================== */}
      <section className="bg-warm">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: photos */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in">
                    <img src="/images/interior.png" alt="Store interior" className="w-full h-48 object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in delay-200">
                    <img src="/images/storefront.jpg" alt="Storefront" className="w-full h-56 object-cover" />
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in delay-100">
                    <img src="/images/owner.jpg" alt="Our founder" className="w-full h-56 object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in delay-300 bg-accent flex items-center justify-center p-6 h-48">
                    <img src="/images/flying-fish.jpg" alt="Flying fish" className="w-full h-full object-contain drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/8 border border-accent/15">
                <span className="text-sm font-semibold text-accent tracking-wide uppercase">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-[1.05] tracking-tight">
                From Smokehouse<br />to Your Table
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                Born from a love for authentic flavors and generations of tradition, We Smoke Fish brings you the finest smoked and air-dried fish. Our artisan smokehouse in Chișinău combines time-honored techniques with the freshest ingredients.
              </p>
              <div className="space-y-4 pt-2">
                {[
                  "Hand-selected premium fish, carefully prepared",
                  "Traditional smoking recipes passed through generations",
                  "Two locations — Chișinău, Moldova & United States",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-coral flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-accent font-bold text-[15px] hover:gap-3 transition-all duration-300 pt-2"
              >
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VIDEO REEL ==================== */}
      <section className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center py-20 bg-[#0d0d0d]">
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="var(--warm)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-[#4d7aff] uppercase tracking-wider">Behind the Scenes</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mt-2 tracking-tight">Our Story in Motion</h2>
            <p className="text-white/50 mt-2 text-base">From tradition to innovation — watch how we do it</p>
          </div>

          <div className="flex justify-center items-center gap-4 md:gap-8 mt-12 [perspective:1200px] w-full max-w-6xl mx-auto">
            {videos.slice(0, 3).map((video, i) => {
              let transformClass = '';
              let zIndexClass = '';
              
              if (i === 0) {
                transformClass = '[transform:rotateY(15deg)_translateZ(-20px)] hover:[transform:rotateY(5deg)_translateZ(0px)] opacity-60 hover:opacity-100';
                zIndexClass = 'z-0';
              } else if (i === 1) {
                transformClass = 'scale-110 shadow-[0_0_50px_rgba(77,122,255,0.15)] z-20';
                zIndexClass = 'z-20';
              } else {
                transformClass = '[transform:rotateY(-15deg)_translateZ(-20px)] hover:[transform:rotateY(-5deg)_translateZ(0px)] opacity-60 hover:opacity-100';
                zIndexClass = 'z-0';
              }

              return (
                <div 
                  key={i}
                  className={`relative w-1/3 rounded-3xl overflow-hidden cursor-pointer group border border-white/10 transition-all duration-700 ease-out ${transformClass} ${zIndexClass}`}
                  onClick={() => handleVideoPlay(i)}
                >
                  <video
                    ref={el => { videoRefs.current[i] = el; }}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                    playsInline
                    loop
                    poster={i === 1 ? "/images/storefront-wide.png" : undefined}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-8 transition-opacity duration-300 ${activeVideo === i ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="inline-flex self-start items-center gap-1 px-3 py-1 rounded-full bg-[#4d7aff] text-white text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-3">
                      {video.tag}
                    </span>
                    <h3 className="text-white text-lg md:text-2xl font-black leading-tight">{video.title}</h3>
                    {i === 1 && <p className="text-white/60 text-xs md:text-sm mt-2 max-w-md hidden md:block">{video.desc}</p>}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {activeVideo !== i && (
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-5 w-5 md:h-7 md:w-7 text-white fill-white ml-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,18 1440,30 L1440,60 L0,60 Z" fill="var(--bg)"/>
          </svg>
        </div>
      </section>


      {/* ==================== CLIENT FEEDBACK (VARIANTS) ==================== */}
      <Testimonials variant="marquee" />
      <Testimonials variant="featured" />


      {/* ==================== VISIT US / CTA ==================== */}
      <section className="wave-bg">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative bg-[#1a1a1a] rounded-[2rem] overflow-hidden p-10 md:p-16 border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-0" />
            <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0">
               <img src="/images/interior.png" alt="" className="w-full h-full object-cover opacity-30" />
            </div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                Visit Our Store
              </h2>
              <p className="text-white/75 text-lg mt-4 leading-relaxed">
                Come taste the freshest smoked fish in town. Our doors are open daily.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#4d7aff]" />
                  <span>Șoseaua Balcani 7B, Chișinău</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#4d7aff]" />
                  <span>10:00 – 22:00 Daily</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-13 px-8 rounded-full bg-[#4d7aff] text-white font-bold text-[15px] hover:bg-[#3b66df] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg"
                >
                  Get Directions
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center h-13 px-8 rounded-full border-2 border-white/30 text-white font-semibold text-[15px] hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Order Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#141414] text-white/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col" style={{ lineHeight: '0.85' }}>
                  <span className="text-[14px] font-extrabold text-white self-center">we</span>
                  <span className="text-[18px] font-black text-[#4d7aff]">smoke</span>
                  <span className="text-[15px] font-extrabold text-white self-center" style={{ marginLeft: '0.2em' }}>fish</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Premium smoked fish crafted with generations of tradition. From Chișinău to the world.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigate</h4>
              <div className="space-y-2.5">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <Link 
                    key={item} 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="block text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
              <div className="space-y-2.5 text-sm">
                <p>wesmokefish@gmail.com</p>
                <p>wesmokefishmd@gmail.com</p>
                <p>Șoseaua Balcani 7B, Chișinău</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Hours</h4>
              <div className="space-y-2.5 text-sm">
                <p>Monday – Sunday</p>
                <p className="text-white font-semibold">10:00 – 22:00</p>
              </div>
              <div className="flex items-center gap-1 mt-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs ml-1 text-white/40">9K+ reviews</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">© {new Date().getFullYear()} We Smoke Fish. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs">
              <span>🇲🇩 Moldova</span>
              <span>🇺🇸 United States</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
