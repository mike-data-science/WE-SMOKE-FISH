'use client';

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Star } from "lucide-react";
import PhotoHero from "../PhotoHero";
import { useRegionStore } from '@/store/useRegionStore';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function PhotoLayout({ 
  renderToggleButtons, 
  realProducts 
}: { 
  renderToggleButtons: () => React.ReactNode,
  realProducts: any[]
}) {
  const region = useRegionStore((state) => state.region);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax overlay
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="flex flex-col w-full text-[#fcfcfc] font-sans transition-colors duration-500 overflow-x-hidden relative">
      
      {/* Fixed Environmental Background with Parallax Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: `url(/images/recreate_picture_better_qualities_2K_202607160953.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: heroY
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[#0a0a0a]"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      <div className="relative z-10 flex flex-col w-full">
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative">
          {renderToggleButtons()}
          <PhotoHero heroBgSrc="/images/recreate_picture_better_qualities_2K_202607160953.jpeg" productsBgSrc="/images/Fish_market_display_case_products_202607171530.jpeg" />
        </section>

        {/* ==================== THE STORY SCROLL (INTERACTIVE) ==================== */}
        <section className="relative py-32 overflow-hidden border-t border-white/5">
          <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-[#ff8c42]/10 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-24"
            >
              <span className="text-xs font-semibold text-[#ffb84d] uppercase tracking-[0.3em]">The Process</span>
              <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] text-white mt-4">
                Patience, Wood, <br />and Time.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative">
              {/* Sticky Left Content */}
              <div className="lg:sticky lg:top-32 h-fit space-y-8">
                <p className="text-xl text-white/70 font-light leading-relaxed">
                  We believe that the best things cannot be rushed. Our fish is sourced from the finest waters and smoked slowly over carefully selected wood chips, honoring generations of craftsmanship.
                </p>
                <div className="pt-8">
                  <Link
                    href="/about"
                    className="group inline-flex items-center justify-center h-14 px-10 bg-[#ff8c42] text-black font-sans text-sm font-bold tracking-widest uppercase hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(255,140,66,0.2)]"
                  >
                    Read Our Story
                    <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Scrolling Right Images with Staggered Parallax */}
              <div className="space-y-32">
                {[
                  { img: "/images/owner.jpg", caption: "Master Smoker at work" },
                  { img: "/images/interior.png", caption: "The heart of the smokehouse" },
                  { img: "/images/storefront-wide.png", caption: "From smoker to table" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 100 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group cursor-none"
                  >
                    <div className="relative p-2 bg-[#2a1b14]/30 border border-[#4a2e20]/20 rounded-sm shadow-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px]">
                      <img src={item.img} alt="Craftsmanship" className="w-full h-full object-cover rounded-sm sepia-[0.2] transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>
                    <motion.div 
                      className="absolute -bottom-6 -left-6 bg-black/90 backdrop-blur-md border border-white/10 p-6 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <p className="font-serif text-[#ffb84d] text-lg">{item.caption}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== INTERACTIVE PRODUCT GALLERY ==================== */}
        <section className="relative py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
              <span className="text-xs font-semibold text-[#ffb84d] uppercase tracking-[0.3em]">The Catch</span>
              <h2 className="text-5xl md:text-6xl font-serif text-white mt-4">Artisanal Selection</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {realProducts.map((item, i) => {
                const price = region === 'MD' ? `${item.priceMdl} MDL` : `$${item.priceUsd}`;
                return (
                  <Link 
                    href={`/shop/${item.slug}`} 
                    key={i} 
                    className="relative block h-[500px] overflow-hidden group"
                    onMouseEnter={() => setHoveredProduct(i)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="absolute inset-0 bg-[#111]">
                      <img 
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                      {item.tag && (
                        <span className="mb-4 self-start px-3 py-1 bg-white/10 backdrop-blur-md text-[#ffb84d] text-[10px] font-bold uppercase tracking-widest border border-[#ffb84d]/30">
                          {item.tag}
                        </span>
                      )}
                      <h3 className="font-serif text-3xl text-white leading-tight mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.name}</h3>
                      
                      <div className="flex items-center justify-between overflow-hidden">
                        <span className="font-sans font-semibold tracking-wide text-white/80 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-100">{price}</span>
                        <ArrowRight className="h-5 w-5 text-[#ff8c42] opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-200" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== VISIT US ==================== */}
        <section className="relative py-32 text-center overflow-hidden border-t border-[#4a2e20]/30 bg-[#0a0a0a]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#ff8c42]/5 rounded-full blur-[150px] pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto px-6 relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">Experience It</h2>
            <p className="text-xl text-white/60 font-light mb-12">
              The aroma of freshly smoked fish. The crackle of the wood. Our doors are open.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-12 text-sm font-sans tracking-widest text-white/80 mb-16 uppercase">
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-[#ffb84d]" />
                <span>Șoseaua Balcani 7B<br/>Chișinău</span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10"></div>
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-[#ffb84d]" />
                <span>Open Daily<br/>10:00 – 22:00</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-16 px-12 border-2 border-[#ff8c42] text-[#ff8c42] font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#ff8c42] hover:text-black transition-colors shadow-[0_0_30px_rgba(255,140,66,0.15)]"
            >
              Get Directions
            </Link>
          </motion.div>
        </section>

        {/* ==================== MATERIAL FOOTER ==================== */}
        <footer className="relative bg-[#020202] border-t border-white/5 text-white/50 font-sans pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
              <div className="md:col-span-1 space-y-6">
                <div className="flex flex-col" style={{ lineHeight: '0.85' }}>
                  <span className="text-[14px] font-extrabold text-[#ffb84d]">we</span>
                  <span className="text-[24px] font-serif text-white italic">smoke</span>
                  <span className="text-[15px] font-extrabold text-[#ffb84d]">fish</span>
                </div>
                <p className="text-sm font-light leading-relaxed">
                  Premium smoked fish crafted with tradition.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-8">Explore</h4>
                <div className="space-y-4">
                  {['Home', 'Products', 'About', 'Contact'].map((item) => (
                    <Link 
                      key={item} 
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                      className="block text-sm hover:text-[#ffb84d] transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-8">Contact</h4>
                <div className="space-y-4 text-sm font-light">
                  <p className="hover:text-white transition-colors cursor-pointer">wesmokefish@gmail.com</p>
                  <p className="hover:text-white transition-colors cursor-pointer">Șoseaua Balcani 7B, Chișinău</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-8">Hours</h4>
                <div className="space-y-4 text-sm font-light">
                  <p>Monday – Sunday</p>
                  <p className="font-medium text-white/80">10:00 – 22:00</p>
                </div>
                <div className="flex items-center gap-2 mt-8">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-[#ffb84d] text-[#ffb84d]" />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light tracking-widest uppercase">
              <p>© {new Date().getFullYear()} We Smoke Fish.</p>
              <div className="flex items-center gap-8">
                <span className="hover:text-white cursor-pointer transition-colors">Moldova</span>
                <span className="hover:text-white cursor-pointer transition-colors">United States</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
