'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star, Play } from "lucide-react";
import { useState, useRef } from "react";
import { useRegionStore } from '@/store/useRegionStore';
import Testimonials from "../Testimonials";
import { motion, useScroll, useTransform } from "framer-motion";
import { googleReviews } from '../../data/reviews';
import { useTranslation } from '../../hooks/useTranslation';

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
  const { t } = useTranslation();
  
  // Scroll hooks for subtle parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
    <div ref={containerRef} className="flex flex-col w-full bg-[#050505] transition-colors duration-500 overflow-x-hidden relative">
      


      {/* ==================== HERO SECTION ==================== */}
      <section className="relative flex items-center min-h-[100vh] overflow-hidden">
        {renderToggleButtons()}

        {/* Background: cinematic video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/images/storefront-wide.png"
            className="w-full h-full object-cover scale-105"
          >
            <source src="/videos/4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full py-10 md:py-20 mt-12 md:mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl space-y-8"
          >

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-2xl text-white/60 max-w-lg leading-relaxed font-medium"
            >
              {t('cinematic.hero_desc')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 pt-6"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center h-14 px-8 sm:h-16 sm:px-10 bg-white text-black font-semibold tracking-widest uppercase text-xs overflow-hidden transition-all duration-500 hover:bg-[#cca677] hover:text-white"
              >
                <span className="relative z-10 transition-colors duration-500 flex items-center">
                  {t('cinematic.explore')}
                  <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 md:h-48 translate-y-6 md:translate-y-12">
            <path d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,18 1440,30 L1440,60 L0,60 Z" fill="#0a0a0a"/>
          </svg>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="bg-[#0a0a0a] py-10 md:py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-tight">{t('cinematic.featured_title')}</h2>
              <p className="text-[#cca677] mt-1 md:mt-4 text-[10px] sm:text-sm font-bold tracking-widest uppercase">{t('cinematic.featured_subtitle')}</p>
            </div>
            <Link 
              href="/shop" 
              className="group inline-flex items-center gap-2 md:gap-3 text-xs md:text-base text-white/50 font-bold hover:text-white transition-all duration-300"
            >
              {t('cinematic.view_full_cast')}
              <span className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#cca677]">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {realProducts.map((item, i) => {
              const price = region === 'MD' ? `${item.priceMdl} MDL` : `$${item.priceUsd}`;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                >
                  {i % 2 === 0 ? (
                    <Link href={`/shop/${item.slug}`} className="group block relative w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-shadow duration-500">
                       <div className="relative w-full aspect-square md:aspect-[4/5] bg-zinc-100 overflow-hidden">
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out" />
                         <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-between border-t border-black/5">
                           <span className="font-bold text-sm text-black uppercase tracking-widest">{t('cinematic.view_details')}</span>
                           <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white">
                             <ArrowRight className="h-3 w-3" />
                           </div>
                         </div>
                       </div>
                       <div className="p-6 flex flex-col items-center text-center">
                         <span className="text-black/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{item.tag || t('cinematic.classic')}</span>
                         <h3 className="font-serif text-2xl font-bold text-black leading-tight mb-2">{item.name}</h3>
                         <span className="text-lg font-sans text-black/80 font-medium">{price}</span>
                       </div>
                    </Link>
                  ) : (
                    <Link href={`/shop/${item.slug}`} className="group block relative w-full aspect-square md:aspect-[4/5] bg-[#e2e2e2] p-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 md:hover:-translate-y-2 md:hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                      <div className="w-full h-[65%] border border-black/10 relative overflow-hidden shadow-inner bg-[#d5d5d5]">
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover filter contrast-125 saturate-100 md:saturate-50 md:group-hover:saturate-100 transition-all duration-500" />
                      </div>
                      <div className="flex flex-col items-center justify-center h-[35%] text-center mt-2">
                         <span className="text-black/40 text-[9px] uppercase tracking-[0.3em] mb-2">No. 0{i + 1} — {item.tag || t('cinematic.reserve')}</span>
                         <h3 className="font-serif text-xl font-bold text-black mb-1">{item.name}</h3>
                         <span className="text-black/60 font-serif italic">{price}</span>
                         <div className="w-8 md:w-0 h-[1px] bg-black mt-3 transition-all duration-500 md:group-hover:w-12"></div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== VIDEO REEL ==================== */}
      <section className="h-[100dvh] w-full snap-start relative bg-[#050505] flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[#cca677]/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="text-center z-20 mb-8 md:mb-12 absolute top-16 md:top-24">
          <h2 className="text-[#cca677] uppercase tracking-[0.3em] font-bold text-sm mb-2">{t('cinematic.social_echo')}</h2>
          <h1 className="text-3xl md:text-5xl font-serif text-white font-bold">{t('cinematic.the_vibe')}</h1>
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
          <div className="absolute left-1/2 z-20 w-[140px] sm:w-[190px] md:w-[360px] aspect-[9/16] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(204,166,119,0.25)] border border-[#cca677]/40 hover:scale-105 transition-transform duration-700" 
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

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="h-[100dvh] w-full snap-start relative bg-[#020202] flex flex-col justify-center py-10 overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cca677]/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 px-6 md:px-12 w-full max-w-[1600px] mx-auto mb-10">
          <span className="text-[#cca677] uppercase tracking-[0.3em] font-bold text-sm block mb-4">{t('testimonials.subtitle')}</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white font-bold">{t('testimonials.title')}</h2>
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

        <div className="relative w-full overflow-hidden py-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none"></div>
          
          <div className="animate-scroll-left gap-6 px-6">
            {/* Duplicate array for seamless infinite scroll */}
            {[...googleReviews, ...googleReviews].map((review, i) => (
              <div key={i} className="w-[300px] md:w-[450px] bg-[#0a0a0a] rounded-3xl p-6 md:p-8 border border-white/5 hover:border-[#cca677]/30 transition-colors duration-500 shrink-0 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#cca677]/20 border border-[#cca677]/50 flex items-center justify-center text-white font-bold text-base md:text-lg">
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm md:text-lg">{review.author}</h4>
                        <span className="text-white/40 text-[10px] md:text-xs">{review.time}</span>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 md:w-4 md:h-4 text-[#cca677] fill-[#cca677]" />
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
      </section>

      {/* ==================== MAP ==================== */}
      <section className="map-section h-[100dvh] w-full snap-start relative bg-[#050505] flex flex-col justify-center py-10 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
          {/* Text Information */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left z-20">
             <span className="text-[#cca677] uppercase tracking-[0.3em] font-bold text-sm block mb-4">{t('location.subtitle')}</span>
             <h2 className="text-4xl md:text-6xl font-serif text-white font-bold mb-6">{t('location.title')}</h2>
             <div className="h-[2px] w-12 bg-[#cca677] mb-8 hidden md:block"></div>
             <p className="text-white/70 text-lg mb-4 font-light">{t('location.address')}<br/>{t('location.phone')}</p>
             <div className="text-sm text-white/50 space-y-2 mb-8">
               <p><strong className="text-white">{t('location.schedule')}</strong> {t('location.hours')}</p>
             </div>
             <button className="border border-[#cca677] text-[#cca677] px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-[#cca677] hover:text-white transition-colors duration-300">
               {t('location.get_directions')}
             </button>
          </div>
          
          {/* Map UI */}
          <div className="map-anim w-full md:w-2/3 h-[45vh] md:h-[65vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(204,166,119,0.08)] relative z-10 group bg-[#111]">
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



      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#020202] text-white/50 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#cca677]/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex flex-col" style={{ lineHeight: '0.85' }}>
                  <span className="text-[16px] font-extrabold text-white self-center">we</span>
                  <span className="text-[22px] font-black text-[#cca677]">smoke</span>
                  <span className="text-[18px] font-extrabold text-white self-center" style={{ marginLeft: '0.2em' }}>fish</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed font-medium">
                {t('footer.desc')}
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">{t('footer.navigate')}</h4>
              <div className="space-y-4">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <Link 
                    key={item} 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="block text-sm hover:text-[#cca677] transition-colors"
                  >
                    {t(`nav.${item.toLowerCase()}`)}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">{t('footer.contact')}</h4>
              <div className="space-y-4 text-sm">
                <p className="hover:text-white transition-colors cursor-pointer">wesmokefish@gmail.com</p>
                <p className="hover:text-white transition-colors cursor-pointer">Șoseaua Balcani 7B, Chișinău</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">{t('footer.experience')}</h4>
              <div className="space-y-4 text-sm">
                <p>{t('footer.schedule')}</p>
                <p className="text-[#cca677] font-bold">{t('footer.hours')}</p>
              </div>
              <div className="flex items-center gap-1 mt-6">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-white text-white" />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 md:mt-20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-center md:text-left">© {new Date().getFullYear()} We Smoke Fish.</p>
            <div className="flex items-center gap-6">
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#cca677]/10 hover:border-[#cca677] hover:text-[#cca677] transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#cca677]/10 hover:border-[#cca677] hover:text-[#cca677] transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#cca677]/10 hover:border-[#cca677] hover:text-[#cca677] transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
            <div className="flex items-center gap-6 md:gap-8 text-[10px] md:text-xs font-bold tracking-widest uppercase">
              <span className="hover:text-white transition-colors cursor-pointer">{t('footer.moldova')}</span>
              <span className="hover:text-white transition-colors cursor-pointer">{t('footer.usa')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
