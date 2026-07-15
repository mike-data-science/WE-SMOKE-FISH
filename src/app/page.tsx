'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star, Waves, Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SmokeFishHero from "../components/SmokeFishHero";

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [heroMode, setHeroMode] = useState<'diorama' | 'magic' | 'cinematic'>('diorama');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoPlay = (index: number) => {
    // Pause all other videos
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
    <div className="flex flex-col w-full bg-background transition-colors duration-500 overflow-x-hidden">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        
        {/* Toggle Controls (Fixed to left side for demo) */}
        <div className="absolute top-6 left-6 z-50 flex gap-2 bg-black/50 p-2 rounded-xl backdrop-blur-md">
          <button onClick={() => setHeroMode('diorama')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'diorama' ? 'bg-[#1a3de8] text-white' : 'text-white/70 hover:bg-white/10'}`}>Digital Diorama</button>
          <button onClick={() => setHeroMode('magic')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'magic' ? 'bg-[#1a3de8] text-white' : 'text-white/70 hover:bg-white/10'}`}>Magic Frame</button>
          <button onClick={() => setHeroMode('cinematic')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${heroMode === 'cinematic' ? 'bg-[#1a3de8] text-white' : 'text-white/70 hover:bg-white/10'}`}>Cinematic</button>
        </div>

        {heroMode === 'cinematic' && (
          <>
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

            {/* Floating mascot */}
            <div className="absolute right-8 bottom-12 hidden lg:block animate-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/mascot.jpg" 
                alt="Cat mascot" 
                className="h-36 w-36 object-contain drop-shadow-2xl opacity-90"
              />
            </div>

            {/* Hero content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
              <div className="max-w-2xl space-y-6">
                {/* Badge */}
                <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                  <Waves className="h-4 w-4 text-[#5b8af5]" />
                  <span className="text-[13px] font-semibold text-white/90 tracking-wide">Artisan Smoked Fish · Chișinău & USA</span>
                </div>

                {/* Heading */}
                <h1 className="animate-fade-in-up delay-100 text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
                  <span className="block">we</span>
                  <span className="block text-[#4d7aff]">smoke</span>
                  <span className="block">fish</span>
                </h1>

                <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-white/75 max-w-md leading-relaxed font-light">
                  Premium smoked fish, hand-crafted with tradition and care. From our smokehouse to your table.
                </p>

                {/* CTAs */}
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
                <path d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z" fill="var(--bg)"/>
              </svg>
            </div>
          </>
        )}

        {heroMode === 'diorama' && (
          <div className="absolute inset-0 bg-subway-tile flex flex-col justify-between pt-16">
            {/* Ceiling Wood Panel */}
            <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-wood-panel flex justify-around items-end pb-0 z-20">
              {/* Track lights hanging */}
              {[1, 2, 3, 4, 5, 6].map((light) => (
                <div key={light} className="relative w-5 h-10 md:w-8 md:h-14 bg-[#1a1a1a] rounded-b-md shadow-lg before:content-[''] before:absolute before:-top-4 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-4 before:bg-[#2a2a2a]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-white rounded-b-sm animate-power-on" style={{ animationDelay: `${light * 0.15}s` }}></div>
                </div>
              ))}
            </div>

            <div className="relative flex-1 flex flex-col md:flex-row items-center max-w-7xl mx-auto w-full px-6 pt-24 z-10 gap-8">
              {/* Left Wall Logo */}
              <div className="flex-1 flex justify-center md:justify-start">
                <h1 className="text-6xl md:text-[100px] lg:text-[130px] font-black text-foreground leading-[0.85] tracking-tighter mix-blend-multiply opacity-90 drop-shadow-sm">
                  <span className="block text-black">we</span>
                  <span className="block text-[#e81414]">smoke</span>
                  <span className="block text-black ml-2 md:ml-4">fish</span>
                </h1>
              </div>

              {/* Center Circular Window (Geam) */}
              <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-[16px] border-[#d29457] shadow-[inset_0_20px_50px_rgba(0,0,0,0.5),0_20px_50px_rgba(0,0,0,0.2)] flex-shrink-0 animate-scale-in">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover scale-[1.15]"
                >
                  <source src="/videos/5.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-1.5 rounded-full text-black font-black text-sm tracking-[0.2em] uppercase shadow-md">Geam</div>
              </div>

              <div className="hidden md:block flex-1"></div>
            </div>

            {/* Bottom Display Cases */}
            <div className="h-48 md:h-64 w-full bg-white border-t border-gray-200 relative overflow-hidden flex justify-center gap-4 md:gap-12 px-4 md:px-12 z-20">
              {/* 3D Glass case simulation */}
              <div className="w-[45%] h-full bg-[#f8f9fa] border-t-[24px] border-[#1a1a1a] shadow-[inset_0_20px_30px_rgba(0,0,0,0.08)] rounded-t-xl relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent flex items-end justify-center pb-8">
                <div className="w-3/4 h-3/4 bg-[#e5e5e5] rounded shadow-inner flex flex-wrap gap-2 p-2">
                   {/* Fake product trays */}
                   <div className="w-[45%] h-[40%] bg-[#d2b48c] rounded-sm opacity-80"></div>
                   <div className="w-[45%] h-[40%] bg-[#cd853f] rounded-sm opacity-80"></div>
                   <div className="w-[45%] h-[40%] bg-[#e0d6c8] rounded-sm opacity-80"></div>
                   <div className="w-[45%] h-[40%] bg-[#b87333] rounded-sm opacity-80"></div>
                </div>
              </div>
              <div className="w-[45%] h-full bg-[#f8f9fa] border-t-[24px] border-[#1a1a1a] shadow-[inset_0_20px_30px_rgba(0,0,0,0.08)] rounded-t-xl relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/60 before:to-transparent flex items-end justify-center pb-8">
                <div className="w-3/4 h-3/4 bg-[#e5e5e5] rounded shadow-inner flex flex-wrap gap-2 p-2">
                   {/* Fake product trays */}
                   <div className="w-[45%] h-[40%] bg-[#a0522d] rounded-sm opacity-80"></div>
                   <div className="w-[45%] h-[40%] bg-[#8b4513] rounded-sm opacity-80"></div>
                   <div className="w-[45%] h-[40%] bg-[#f4a460] rounded-sm opacity-80"></div>
                   <div className="w-[45%] h-[40%] bg-[#d2691e] rounded-sm opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {heroMode === 'magic' && (
          <div className="w-full relative">
            <SmokeFishHero />
          </div>
        )}

      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="relative -mt-1 bg-background">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10K+", label: "Happy Customers", icon: "😊" },
              { value: "100%", label: "Fresh & Natural", icon: "🐟" },
              { value: "39+", label: "Years Tradition", icon: "🏆" },
              { value: "2", label: "Locations", icon: "📍" },
            ].map((stat, i) => (
              <div key={i} className={`animate-fade-in-up delay-${(i+1)*100} flex flex-col items-center text-center p-4 rounded-2xl bg-surface border border-border card-hover`}>
                <span className="text-2xl mb-2">{stat.icon}</span>
                <span className="text-2xl lg:text-3xl font-black text-foreground">{stat.value}</span>
                <span className="text-xs text-muted font-medium mt-1 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT TEASER ==================== */}
      <section className="wave-lines">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: photos */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/interior.png" alt="Store interior" className="w-full h-48 object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in delay-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/storefront.jpg" alt="Storefront" className="w-full h-56 object-cover" />
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in delay-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/owner.jpg" alt="Our founder" className="w-full h-56 object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-border animate-scale-in delay-300 bg-accent flex items-center justify-center p-6 h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
            {[
              { img: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?q=80&w=800&auto=format&fit=crop", title: "Smoked Salmon", price: "$24.99", tag: "Bestseller" },
              { img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=800&auto=format&fit=crop", title: "Smoked Mackerel", price: "$18.99", tag: null },
              { img: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=800&auto=format&fit=crop", title: "Smoked Trout", price: "$21.99", tag: "New" },
              { img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop", title: "Fish Platter", price: "$39.99", tag: "Popular" },
            ].map((item, i) => (
              <div key={i} className={`animate-fade-in-up delay-${(i+1)*100} group relative bg-surface rounded-3xl overflow-hidden border border-border card-hover cursor-pointer`}>
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.img}
                    alt={item.title}
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
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-accent font-black text-lg">{item.price}</span>
                    <button className="h-9 w-9 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-300">
                      <span className="text-lg font-light">+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VIDEO REEL ==================== */}
      <section className="relative overflow-hidden py-20 bg-[#0d0d0d]">
        {/* Wave divider top */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="var(--warm)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#4d7aff] uppercase tracking-wider">Behind the Scenes</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 tracking-tight">Our Story in Motion</h2>
            <p className="text-white/50 mt-3 text-lg">From tradition to innovation — watch how we do it</p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured large video */}
            <div 
              className="sm:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group border border-white/10"
              onClick={() => handleVideoPlay(0)}
            >
              <video
                ref={el => { videoRefs.current[0] = el; }}
                className="w-full h-full min-h-[320px] object-cover"
                playsInline
                loop
                poster="/images/storefront-wide.png"
              >
                <source src={videos[0].src} type="video/mp4" />
              </video>
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${activeVideo === 0 ? 'opacity-0 hover:opacity-100' : ''}`}>
                <span className="inline-flex self-start items-center gap-1 px-3 py-1 rounded-full bg-[#4d7aff] text-white text-[11px] font-bold uppercase tracking-wider mb-3">
                  {videos[0].tag}
                </span>
                <h3 className="text-white text-2xl font-black">{videos[0].title}</h3>
                <p className="text-white/60 text-sm mt-1 max-w-md">{videos[0].desc}</p>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {activeVideo !== 0 && (
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-7 w-7 text-white fill-white ml-1" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Remaining videos */}
            {videos.slice(1).map((video, idx) => {
              const i = idx + 1;
              return (
                <div
                  key={i}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group border border-white/10"
                  onClick={() => handleVideoPlay(i)}
                >
                  <video
                    ref={el => { videoRefs.current[i] = el; }}
                    className="w-full h-64 object-cover"
                    playsInline
                    loop
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 transition-opacity duration-300 ${activeVideo === i ? 'opacity-0 hover:opacity-100' : ''}`}>
                    <span className={`inline-flex self-start items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                      video.tag === 'Fun' ? 'bg-coral text-white' :
                      video.tag === 'Milestone' ? 'bg-green-500 text-white' :
                      video.tag === 'Business' ? 'bg-amber-500 text-white' :
                      'bg-white/20 text-white'
                    }`}>
                      {video.tag}
                    </span>
                    <h3 className="text-white text-lg font-bold">{video.title}</h3>
                    <p className="text-white/50 text-xs mt-1 line-clamp-2">{video.desc}</p>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {activeVideo !== i && (
                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,18 1440,30 L1440,60 L0,60 Z" fill="var(--bg)"/>
          </svg>
        </div>
      </section>

      {/* ==================== VISIT US / CTA ==================== */}
      <section className="wave-bg">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative bg-accent rounded-[2rem] overflow-hidden p-10 md:p-16">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/flying-fish.jpg" alt="" className="h-40 w-40 object-contain" />
            </div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                Visit Our Store
              </h2>
              <p className="text-white/75 text-lg mt-4 leading-relaxed">
                Come taste the freshest smoked fish in town. Our doors are open daily.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white/60" />
                  <span>Șoseaua Balcani 7B, Chișinău</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white/60" />
                  <span>10:00 – 22:00 Daily</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-13 px-8 rounded-full bg-white text-accent font-bold text-[15px] hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg"
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

            {/* Mascot */}
            <div className="absolute bottom-0 right-8 hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mascot.jpg" alt="Mascot" className="h-48 object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#141414] text-white/60">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/mascot.jpg" alt="Mascot" className="h-10 w-10 rounded-full object-cover border-2 border-white/10" />
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

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigate</h4>
              <div className="space-y-2.5">
                {['Home', 'Products', 'Catering', 'About', 'Contact'].map((item) => (
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

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
              <div className="space-y-2.5 text-sm">
                <p>wesmokefish@gmail.com</p>
                <p>wesmokefishmd@gmail.com</p>
                <p>Șoseaua Balcani 7B, Chișinău</p>
              </div>
            </div>

            {/* Hours */}
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
