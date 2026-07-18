'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star, Camera, Play } from "lucide-react";
import HybridHero from "../HybridHero";
import Menu from "../Menu";
import photoBg from "../../../recreate_picture_better_qualities_2K_202607160953.jpeg";
import bricksBg from "../../../materials/bricks.jpeg";
import { useRegionStore } from '@/store/useRegionStore';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function PremiumLayout({ 
  renderToggleButtons, 
  realProducts 
}: { 
  renderToggleButtons: () => React.ReactNode,
  realProducts: any[]
}) {
  const region = useRegionStore((state) => state.region);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="flex flex-col w-full text-white transition-colors duration-500 overflow-x-hidden relative bg-[#050201]">
      


      {/* SVG Noise filter for the CSS Wood Texture */}
      <svg className="hidden">
        <filter id="wood-grain-premium">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.2" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.8 0 0 0  0 0.6 0 0 0  0 0 0 0.2 0" in="noise" result="coloredNoise" />
          <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
          <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
        </filter>
      </svg>

      {/* Hero Environmental Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: `url(${photoBg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: bgY,
            filter: 'contrast(1.2) brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050201_100%)]"></div>
      </div>

      <Menu />

      <div className="relative z-10 flex flex-col w-full">
        {/* ==================== HERO SECTION ==================== */}
        <section 
          className="relative"
        >
          {renderToggleButtons()}
          <HybridHero heroBgSrc={photoBg.src} />
        </section>

        {/* ==================== DYNAMIC STORE SECTION (BRICK TEXTURE) ==================== */}
        <section 
          className="py-32 relative overflow-hidden shadow-[inset_0_20px_50px_rgba(0,0,0,0.9)]"
          style={{
            backgroundImage: `url(${bricksBg.src})`,
            backgroundSize: '800px auto',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center top'
          }}
        >
          {/* Dynamic lighting overlay */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff8c42]/15 rounded-full blur-[150px] pointer-events-none mix-blend-color-dodge z-0"
          />
          <div className="absolute inset-0 bg-[#050201]/80 z-0"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, rotateX: 20, y: 100 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative rounded-[2rem] overflow-hidden p-8 md:p-16 border border-[#3a2012]/50 shadow-[0_40px_80px_rgba(0,0,0,0.9)] bg-[#0a0503]/80 backdrop-blur-2xl"
              
              
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_right,_#ff8c42_0%,_transparent_60%)] pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-10">
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] drop-shadow-xl">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#ffb84d] to-[#ff4a1c]">Smokehouse</span>
                  </h2>
                  <p className="text-white/70 text-xl font-medium max-w-md leading-relaxed">
                    Step into the heat. Smell the cherry wood. Experience the craft in person.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 pt-4">
                    <Link
                      href="/contact"
                      className="group relative inline-flex items-center justify-center h-16 px-10 rounded-2xl bg-gradient-to-r from-[#ff6b2b] to-[#ff8c42] text-[#120804] font-black text-[15px] uppercase tracking-widest overflow-hidden shadow-[0_10px_30px_rgba(255,107,43,0.3)] border border-[#ffa66b]"
                    >
                      <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <span className="relative z-10">Get Directions</span>
                    </Link>
                  </div>
                </div>

                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-white/10 group cursor-none">
                  <img src="/images/interior.png" alt="Smokehouse" className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out sepia-[0.3] brightness-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-black/20 to-transparent"></div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 left-8"
                  >
                    <div className="flex items-center gap-3 bg-[#120804]/90 backdrop-blur-md border border-[#ff8c42]/30 rounded-full px-6 py-3 shadow-2xl">
                      <Clock className="h-5 w-5 text-[#ffb84d]" />
                      <span className="text-white font-bold tracking-widest uppercase text-xs">Open 10:00 – 22:00</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== SOCIAL & TESTIMONIALS SECTION (NEW) ==================== */}
        <section className="py-32 relative bg-[#050201] border-t border-[#1a0a05] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              Community & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb84d] to-[#ff4a1c]">Craft</span>
            </h2>
            <p className="text-white/50 text-lg font-medium max-w-2xl">
              See what our community is saying and watch the craft in action. Tag us on Instagram or TikTok to be featured.
            </p>
          </div>

          <div className="flex gap-6 px-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Elaborate Card 1: The Craft */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative min-w-[360px] md:min-w-[420px] h-[600px] shrink-0 snap-center group"
            >
              <div className="absolute inset-0 bg-[#0a0503] rounded-3xl border border-[#ff4a1c]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:border-[#ff4a1c]/50 group-hover:shadow-[0_30px_60px_rgba(255,74,28,0.15)]">
                {/* Background Glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#ff8c42] rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Framed Image */}
                <div className="absolute top-4 left-4 right-4 h-[52%] rounded-2xl overflow-hidden border border-white/5 z-10 shadow-inner">
                  <img src="/images/smoked_fish.webp" alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent opacity-90"></div>
                  
                  {/* Floating Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-[#ff8c42]/50 flex items-center justify-center group-hover:bg-[#ff8c42]/20 group-hover:scale-110 group-hover:border-[#ff8c42] transition-all duration-500 z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Play className="w-6 h-6 text-[#ff8c42] ml-1" />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-5 right-6 bg-[#120804] border border-[#ff4a1c]/30 px-4 py-2 rounded-full z-30 shadow-xl flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Star className="w-4 h-4 text-[#ffb84d] fill-[#ffb84d]" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Premium Catch</span>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="absolute bottom-0 left-0 right-0 h-[48%] p-6 md:p-8 z-10 flex flex-col justify-between bg-gradient-to-t from-[#050201] to-transparent">
                  <div className="absolute top-0 left-6 text-9xl font-serif text-white/5 select-none pointer-events-none transform -translate-y-10 group-hover:-translate-y-12 transition-transform duration-700">"</div>
                  
                  <div className="relative z-10 mt-2">
                    <h3 className="font-black text-2xl md:text-3xl text-white mb-3 font-serif tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ffb84d] group-hover:to-[#ff4a1c] transition-all duration-500">The Art of Smoking</h3>
                    <p className="text-white/60 text-sm leading-relaxed italic border-l-2 border-[#ff4a1c]/50 pl-4">
                      "The cherry wood flavor is incredible. It's a completely different level of depth and authenticity. Best I've ever had."
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-4 mt-auto group-hover:border-[#ff4a1c]/30 transition-colors duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff8c42] to-[#ff4a1c] p-[2px] shadow-lg">
                        <div className="w-full h-full bg-[#120804] rounded-full flex items-center justify-center text-white font-bold text-xs">BM</div>
                      </div>
                      <div>
                        <span className="block text-white font-bold text-sm">@bbq_master</span>
                        <span className="block text-[#ff8c42]/70 text-[10px] uppercase tracking-widest font-bold">Food Critic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Elaborate Card 2: The Location */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative min-w-[360px] md:min-w-[420px] h-[600px] shrink-0 snap-center group"
            >
              <div className="absolute inset-0 bg-[#0a0503] rounded-3xl border border-[#ff4a1c]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:border-[#ff4a1c]/50 group-hover:shadow-[0_30px_60px_rgba(255,74,28,0.15)]">
                {/* Background Glow */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#e81414] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Framed Image */}
                <div className="absolute top-4 left-4 right-4 h-[52%] rounded-2xl overflow-hidden border border-white/5 z-10 shadow-inner">
                  <img src="/images/recreate_picture_better_qualities_2K_202607160953.jpeg" alt="Location" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent opacity-90"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-5 right-6 bg-[#120804] border border-[#ff4a1c]/30 px-4 py-2 rounded-full z-30 shadow-xl flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Camera className="w-4 h-4 text-[#ffb84d]" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Atmosphere</span>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="absolute bottom-0 left-0 right-0 h-[48%] p-6 md:p-8 z-10 flex flex-col justify-between bg-gradient-to-t from-[#050201] to-transparent">
                  <div className="absolute top-0 left-6 text-9xl font-serif text-white/5 select-none pointer-events-none transform -translate-y-10 group-hover:-translate-y-12 transition-transform duration-700">"</div>
                  
                  <div className="relative z-10 mt-2">
                    <h3 className="font-black text-2xl md:text-3xl text-white mb-3 font-serif tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ffb84d] group-hover:to-[#ff4a1c] transition-all duration-500">Authentic Heritage</h3>
                    <p className="text-white/60 text-sm leading-relaxed italic border-l-2 border-[#ff4a1c]/50 pl-4">
                      "Absolutely stunning setup at the new Smokehouse location. The authenticity is unmatched in the city."
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-4 mt-auto group-hover:border-[#ff4a1c]/30 transition-colors duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px] shadow-lg">
                        <div className="w-full h-full bg-[#120804] rounded-full flex items-center justify-center text-white font-bold text-xs">FM</div>
                      </div>
                      <div>
                        <span className="block text-white font-bold text-sm">@foodie_moldova</span>
                        <span className="block text-[#ff8c42]/70 text-[10px] uppercase tracking-widest font-bold">Chisinau</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Elaborate Card 3: The Heat */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative min-w-[360px] md:min-w-[420px] h-[600px] shrink-0 snap-center group"
            >
              <div className="absolute inset-0 bg-[#0a0503] rounded-3xl border border-[#ff4a1c]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:border-[#ff4a1c]/50 group-hover:shadow-[0_30px_60px_rgba(255,74,28,0.15)]">
                {/* Background Glow */}
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#ff4a1c] rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Framed Image */}
                <div className="absolute top-4 left-4 right-4 h-[52%] rounded-2xl overflow-hidden border border-white/5 z-10 shadow-inner">
                  <img src="/images/smoked_fish.webp" alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale-[0.2] contrast-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-transparent to-transparent opacity-90"></div>
                  
                  {/* Floating Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-[#ff4a1c]/50 flex items-center justify-center group-hover:bg-[#ff4a1c]/20 group-hover:scale-110 group-hover:border-[#ff4a1c] transition-all duration-500 z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Play className="w-6 h-6 text-[#ff4a1c] ml-1" />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-5 right-6 bg-[#120804] border border-[#ff4a1c]/30 px-4 py-2 rounded-full z-30 shadow-xl flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Star className="w-4 h-4 text-[#ff4a1c] fill-[#ff4a1c]" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Behind Scenes</span>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="absolute bottom-0 left-0 right-0 h-[48%] p-6 md:p-8 z-10 flex flex-col justify-between bg-gradient-to-t from-[#050201] to-transparent">
                  <div className="absolute top-0 left-6 text-9xl font-serif text-white/5 select-none pointer-events-none transform -translate-y-10 group-hover:-translate-y-12 transition-transform duration-700">"</div>
                  
                  <div className="relative z-10 mt-2">
                    <h3 className="font-black text-2xl md:text-3xl text-white mb-3 font-serif tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ffb84d] group-hover:to-[#ff4a1c] transition-all duration-500">Mastering The Heat</h3>
                    <p className="text-white/60 text-sm leading-relaxed italic border-l-2 border-[#ff4a1c]/50 pl-4">
                      "Looking closely at these beautiful copper smokers. The heat and passion is real. A true art form."
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-4 mt-auto group-hover:border-[#ff4a1c]/30 transition-colors duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff4a1c] to-[#e81414] p-[2px] shadow-lg">
                        <div className="w-full h-full bg-[#120804] rounded-full flex items-center justify-center text-white font-bold text-xs">CA</div>
                      </div>
                      <div>
                        <span className="block text-white font-bold text-sm">@chef_alex</span>
                        <span className="block text-[#ff8c42]/70 text-[10px] uppercase tracking-widest font-bold">Pitmaster</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Spacing element at the end */}
            <div className="min-w-[6vw] shrink-0"></div>
          </div>
        </section>

        {/* ==================== INTERACTIVE MAP SECTION (NEW) ==================== */}
        <section className="relative h-[80vh] min-h-[600px] bg-[#020101] overflow-hidden border-t border-[#1a0a05]">
          {/* Abstract Dark Map Background */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 140, 66, 0.15) 0%, transparent 60%)'
          }}></div>
          
          {/* Faux Map Grid/Lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            backgroundPosition: 'center center'
          }}></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing rings */}
              <motion.div 
                animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#ff8c42]"
              />
              <motion.div 
                animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#ff4a1c]"
              />
              
              {/* Map Pin */}
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff8c42] to-[#ff4a1c] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,140,66,0.6)] z-10 relative">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 bg-[#0a0503]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-20 shadow-2xl">
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0a0503]/90 border-b border-r border-white/10 rotate-45 backdrop-blur-xl"></div>
                  <h3 className="text-[#ffb84d] font-black text-lg mb-1">Moldova HQ</h3>
                  <p className="text-white/70 text-sm mb-4">Strada Afumatori 12, Chisinau, Moldova</p>
                  <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-bold">
                    <Clock className="w-3 h-3" />
                    <span>Open 10:00 - 22:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Header Overlay */}
          <div className="absolute top-16 left-6 md:left-16 pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-black text-white mix-blend-overlay opacity-80">
              Find<br/>Us
            </h2>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="relative bg-[#020101] pt-24 pb-12 border-t border-[#2a140a]">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
              <div className="md:col-span-1 space-y-8">
                <div className="flex flex-col" style={{ lineHeight: '0.85' }}>
                  <span className="text-[16px] font-black text-white self-center">we</span>
                  <span className="text-[26px] font-black text-[#ff8c42] drop-shadow-[0_0_12px_rgba(255,140,66,0.5)]">smoke</span>
                  <span className="text-[18px] font-black text-white self-center" style={{ marginLeft: '0.2em' }}>fish</span>
                </div>
                <p className="text-white/50 text-sm font-medium leading-relaxed">
                  The absolute pinnacle of traditional smoked fish. Uncompromising quality and real wood fire.
                </p>
              </div>

              <div>
                <h4 className="text-[#ffb84d] font-bold text-xs uppercase tracking-[0.3em] mb-8">Menu</h4>
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

              <div>
                <h4 className="text-[#ffb84d] font-bold text-xs uppercase tracking-[0.3em] mb-8">Social</h4>
                <div className="space-y-4">
                  {['Instagram', 'Facebook', 'TikTok'].map((item) => (
                    <a 
                      key={item} 
                      href="#" 
                      className="block text-white/50 text-sm font-medium hover:text-white transition-colors"
                      
                      
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[#ffb84d] font-bold text-xs uppercase tracking-[0.3em] mb-8">Newsletter</h4>
                <div className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="h-12 w-full bg-white/5 border-b border-white/20 text-white px-2 focus:outline-none focus:border-[#ff8c42] transition-colors"
                    
                    
                  />
                  <button 
                    className="self-start text-[#ff8c42] font-bold text-xs uppercase tracking-widest hover:text-white transition-colors mt-2"
                    
                    
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#2a140a] pt-8 flex justify-between items-center text-white/30 text-xs font-bold tracking-widest uppercase">
              <p>© {new Date().getFullYear()} WE SMOKE FISH</p>
              <p>MOLDOVA / USA</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
