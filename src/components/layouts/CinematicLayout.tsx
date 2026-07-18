'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star, Play } from "lucide-react";
import { useState, useRef } from "react";
import { useRegionStore } from '@/store/useRegionStore';
import Testimonials from "../Testimonials";
import { motion, useScroll, useTransform } from "framer-motion";

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
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              <span className="block">we</span>
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#cca677] to-[#e6cdb3]"
              >
                smoke
              </motion.span>
              <span className="block">fish</span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-2xl text-white/60 max-w-lg leading-relaxed font-medium"
            >
              The director's cut of smoked fish. Uncompromising quality, cinematic flavor.
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
                  Explore Collection
                  <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="bg-[#0a0a0a] py-10 md:py-32 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-tight">The Cast</h2>
              <p className="text-[#cca677] mt-1 md:mt-4 text-[10px] sm:text-sm font-bold tracking-widest uppercase">Starring Roles</p>
            </div>
            <Link 
              href="/shop" 
              className="group inline-flex items-center gap-2 md:gap-3 text-xs md:text-base text-white/50 font-bold hover:text-white transition-all duration-300"
            >
              View Full Cast
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
                  <Link href={`/shop/${item.slug}`} className="group block relative w-full h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden bg-[#050505] shadow-2xl">
                    {/* Inner frame */}
                    <div className="absolute inset-2 md:inset-3 border border-white/10 rounded-[1.5rem] overflow-hidden z-10 transition-colors duration-700 group-hover:border-[#cca677]/60">
                      
                      {/* Image Layer */}
                      <div className="absolute inset-0 bg-[#000]">
                        <img 
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-50 group-hover:opacity-90"
                        />
                      </div>
                      
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>

                      {/* Tag Badge */}
                      {item.tag && (
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 overflow-hidden rounded-full">
                          <div className="absolute inset-0 bg-[#cca677]/10 backdrop-blur-md"></div>
                          <span className="relative px-3 py-1.5 md:px-4 md:py-2 flex items-center justify-center text-[#cca677] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] border border-[#cca677]/30 rounded-full">
                            {item.tag}
                          </span>
                        </div>
                      )}

                      {/* Details Area */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.25,1,0.5,1]">
                        <div className="w-8 h-[2px] bg-[#cca677] mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100"></div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#cca677] group-hover:to-white transition-all duration-500">
                          {item.name}
                        </h3>
                        
                        <div className="flex items-center justify-between mt-4 overflow-hidden pt-2">
                          <span className="text-white/70 font-sans text-sm md:text-base tracking-widest">{price}</span>
                          
                          {/* Animated Arrow Button */}
                          <div className="flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                            <span className="text-[#cca677] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">View Details</span>
                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-[#cca677]/30 flex items-center justify-center text-[#cca677] bg-[#cca677]/10 shadow-[0_0_15px_rgba(204,166,119,0.2)]">
                              <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#cca677] opacity-0 blur-[100px] rounded-full pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-1000"></div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE TIMELINE (NEW) ==================== */}
      <section className="py-10 md:py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-[#cca677]/5 rounded-full blur-[100px] md:blur-[200px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[#cca677] font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">The Process</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mt-4">Three Acts of Flavor</h2>
          </motion.div>

          <div className="space-y-20 md:space-y-32">
            {[
              { title: "Act I: The Selection", desc: "We source only the most premium fish from pristine waters. Each catch is hand-selected for perfect fat content.", img: "/images/storefront-wide.png" },
              { title: "Act II: The Smoke", desc: "Smoked slow and low over carefully curated cherry and apple wood. The smoke is thin, blue, and sweet.", img: "/images/interior.png" },
              { title: "Act III: The Cut", desc: "Rested to perfection and carved with precision. Every slice reveals a translucent, jewel-like quality.", img: "/images/straight-interior-wide.png" }
            ].map((act, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 lg:gap-24`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-video group cursor-pointer">
                    <img src={act.img} alt={act.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">{act.title}</h3>
                  <p className="text-lg sm:text-xl text-white/60 leading-relaxed">{act.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VIDEO REEL ==================== */}
      <section className="relative overflow-hidden min-h-[50dvh] md:min-h-[100dvh] flex flex-col justify-center py-10 md:py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-20"
          >
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter">Behind the Scenes</h2>
            <p className="text-[#cca677] mt-2 md:mt-6 text-[10px] sm:text-lg md:text-xl font-bold tracking-[0.2em] uppercase">Press Play</p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mt-8 md:mt-12 md:[perspective:2000px] w-full max-w-6xl mx-auto">
            {videos.slice(0, 3).map((video, i) => {
              let transformClass = '';
              let zIndexClass = '';
              
              if (i === 0) {
                transformClass = 'md:[transform:rotateY(25deg)_translateZ(-100px)] md:hover:[transform:rotateY(10deg)_translateZ(0px)] opacity-60 md:opacity-40 md:hover:opacity-100';
                zIndexClass = 'z-0';
              } else if (i === 1) {
                transformClass = 'md:scale-110 shadow-[0_0_50px_rgba(204,166,119,0.1)] md:shadow-[0_0_100px_rgba(204,166,119,0.2)] z-20';
                zIndexClass = 'z-20';
              } else {
                transformClass = 'md:[transform:rotateY(-25deg)_translateZ(-100px)] md:hover:[transform:rotateY(-10deg)_translateZ(0px)] opacity-60 md:opacity-40 md:hover:opacity-100';
                zIndexClass = 'z-0';
              }

              return (
                <div 
                  key={i}
                  className={`relative w-full md:w-1/3 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer group border border-white/10 transition-all duration-700 ease-out ${transformClass} ${zIndexClass}`}
                  onClick={() => handleVideoPlay(i)}
                >
                  <video
                    ref={el => { videoRefs.current[i] = el; }}
                    className="w-full h-48 sm:h-72 md:h-96 lg:h-[500px] object-cover"
                    playsInline
                    loop
                    poster={i === 1 ? "/images/storefront-wide.png" : undefined}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4 md:p-10 transition-opacity duration-500 ${activeVideo === i ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="inline-flex self-start items-center px-2 py-0.5 md:px-4 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#cca677] text-[8px] md:text-xs font-black uppercase tracking-widest mb-1 md:mb-4">
                      {video.tag}
                    </span>
                    <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-black leading-tight">{video.title}</h3>
                    {i === 1 && <p className="text-white/60 text-xs md:text-sm mt-1 md:mt-3 max-w-sm hidden md:block">{video.desc}</p>}
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {activeVideo !== i && (
                        <div className="h-12 w-12 md:h-20 md:w-20 rounded-full bg-[#cca677]/90 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(204,166,119,0.5)]">
                          <Play className="h-4 w-4 md:h-8 md:w-8 text-white fill-white ml-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CLIENT FEEDBACK ==================== */}
      <Testimonials variant="featured" />

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
                Premium smoked fish crafted with generations of tradition. From Chișinău to the world.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Navigate</h4>
              <div className="space-y-4">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <Link 
                    key={item} 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="block text-sm hover:text-[#cca677] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Contact</h4>
              <div className="space-y-4 text-sm">
                <p className="hover:text-white transition-colors cursor-pointer">wesmokefish@gmail.com</p>
                <p className="hover:text-white transition-colors cursor-pointer">Șoseaua Balcani 7B, Chișinău</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Experience</h4>
              <div className="space-y-4 text-sm">
                <p>Monday – Sunday</p>
                <p className="text-[#cca677] font-bold">10:00 – 22:00</p>
              </div>
              <div className="flex items-center gap-1 mt-6">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-white text-white" />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 md:mt-20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-center md:text-left">© {new Date().getFullYear()} We Smoke Fish.</p>
            <div className="flex items-center gap-6 md:gap-8 text-[10px] md:text-xs font-bold tracking-widest uppercase">
              <span className="hover:text-white transition-colors cursor-pointer">Moldova</span>
              <span className="hover:text-white transition-colors cursor-pointer">USA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
