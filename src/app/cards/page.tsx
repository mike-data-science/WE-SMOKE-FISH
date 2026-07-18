import React from 'react';
import { Play, ArrowRight, Star, Camera } from 'lucide-react';
import Link from 'next/link';

// Mock product
const item = {
  name: "Signature Chess Roll",
  priceUsd: 45,
  imageUrl: "/images/469165267_122201614952080814_277418126812541061_n.jpg",
  tag: "Best Seller",
  slug: "signature-chess-roll"
};

export default function CardsDemoPage() {
  return (
    <div className="min-h-screen bg-[#050505] p-10 font-sans pb-32">
      <h1 className="text-3xl md:text-5xl font-serif text-white mb-12 text-center mt-10">10 Card Design Variants</h1>
      <p className="text-white/50 text-center max-w-2xl mx-auto mb-20 text-sm md:text-base">
        A gallery showcasing 10 radically different ways to design the product cards for the We Smoke Fish application. 
        From cinematic to brutalist to interactive accordion styles.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24 max-w-[1400px] mx-auto">
        
        {/* 1. Cinematic (Current) */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[#cca677] text-xs uppercase tracking-[0.2em] font-bold">1. The Cinematic (Current)</h2>
          <Link href={`#`} className="group block relative w-full h-[500px] rounded-[2rem] overflow-hidden bg-[#050505] shadow-2xl">
            <div className="absolute inset-2 border border-white/10 rounded-[1.5rem] overflow-hidden z-10 transition-colors duration-700 group-hover:border-[#cca677]/60">
              <div className="absolute inset-0 bg-[#000]">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-50 group-hover:opacity-90" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
              <div className="absolute top-4 left-4 z-20 rounded-full">
                <div className="absolute inset-0 bg-[#cca677]/10 backdrop-blur-md"></div>
                <span className="relative px-3 py-1.5 flex items-center justify-center text-[#cca677] text-[10px] font-black uppercase tracking-[0.2em] border border-[#cca677]/30 rounded-full">{item.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.25,1,0.5,1]">
                <div className="w-8 h-[2px] bg-[#cca677] mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2 leading-tight">{item.name}</h3>
                <div className="flex items-center justify-between mt-4 pt-2">
                  <span className="text-white/70 font-sans tracking-widest">${item.priceUsd}</span>
                  <div className="flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <span className="text-[#cca677] text-[10px] font-bold uppercase tracking-[0.2em]">View</span>
                    <div className="h-8 w-8 rounded-full border border-[#cca677]/30 flex items-center justify-center text-[#cca677] bg-[#cca677]/10"><ArrowRight className="h-3 w-3" /></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 4. Editorial Museum */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[#e2e2e2] text-xs uppercase tracking-[0.2em] font-serif italic">4. The Museum Plaque</h2>
          <Link href={`#`} className="group block relative w-full h-[500px] bg-[#e2e2e2] p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10">
            <div className="w-full h-[70%] border border-black/10 relative overflow-hidden shadow-inner">
               <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-500" />
            </div>
            <div className="flex flex-col items-center justify-center h-[30%] text-center">
               <span className="text-black/40 text-[9px] uppercase tracking-[0.3em] mb-2">No. 01 — {item.tag}</span>
               <h3 className="font-serif text-xl font-bold text-black mb-1">{item.name}</h3>
               <span className="text-black/60 font-serif italic">${item.priceUsd}.00</span>
               <div className="w-0 h-[1px] bg-black mt-3 transition-all duration-500 group-hover:w-12"></div>
            </div>
          </Link>
        </div>

        {/* 9. Polaroid Stack */}
        <div className="flex flex-col gap-6">
          <h2 className="text-white text-xs uppercase tracking-[0.2em] font-bold">9. Vintage Polaroid</h2>
          <Link href={`#`} className="group block relative w-full h-[500px] p-8">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-[90%] h-[90%] bg-[#fafafa] p-4 shadow-2xl transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-500 flex flex-col z-20 border border-black/10">
                 <div className="flex-grow w-full bg-black relative overflow-hidden shadow-inner">
                   <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover filter sepia-[0.4] group-hover:sepia-0 transition-all duration-500" />
                 </div>
                 <div className="h-24 w-full flex items-center justify-between px-2">
                   <h3 className="font-serif text-xl font-bold text-black">{item.name}</h3>
                   <span className="font-serif text-2xl text-black/50">${item.priceUsd}</span>
                 </div>
               </div>
               {/* Background polaroid for depth */}
               <div className="absolute w-[90%] h-[90%] bg-[#e0e0e0] p-4 shadow-xl transform -rotate-6 transition-transform duration-500 z-10 border border-black/10"></div>
             </div>
          </Link>
        </div>

        {/* NEW 1: The Clear Showcase */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#cca677] text-xs uppercase tracking-[0.2em] font-bold">New: The Clear Showcase</h2>
          <Link href={`#`} className="group block relative w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
             {/* Image container - 100% visible, no filters */}
             <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden">
               <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
               
               {/* Hidden interactive drawer that slides up on hover */}
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-between border-t border-black/5">
                 <span className="font-bold text-sm text-black uppercase tracking-widest">Quick Add</span>
                 <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white">
                   <Play className="h-3 w-3 ml-0.5" />
                 </div>
               </div>
             </div>
             {/* Text content - safely below the image */}
             <div className="p-6 flex flex-col items-center text-center">
               <span className="text-black/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{item.tag}</span>
               <h3 className="font-serif text-2xl font-bold text-black leading-tight mb-2">{item.name}</h3>
               <span className="text-lg font-sans text-black/80 font-medium">${item.priceUsd}</span>
             </div>
          </Link>
        </div>

        {/* NEW 2: The Modern Split */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-xs uppercase tracking-[0.2em] font-bold">New: The Modern Split</h2>
          <Link href={`#`} className="group block relative w-full rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 transition-colors duration-500 hover:border-white/20">
             {/* Pure image section */}
             <div className="w-full aspect-square relative overflow-hidden bg-black">
               <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                 View Details
               </div>
             </div>
             {/* Information section */}
             <div className="p-6 md:p-8 flex flex-col justify-between h-[180px] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
               <div>
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-sans text-xl md:text-2xl font-bold text-white leading-tight">{item.name}</h3>
                   <span className="text-[#cca677] font-bold text-xl ml-4">${item.priceUsd}</span>
                 </div>
                 <span className="text-white/40 text-xs uppercase tracking-widest">{item.tag}</span>
               </div>
               
               {/* Interactive expanding line */}
               <div className="w-full mt-auto relative h-10 flex items-end">
                 <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10"></div>
                 <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#cca677] group-hover:w-full transition-all duration-700 ease-out"></div>
                 <div className="flex items-center gap-2 text-white/50 group-hover:text-[#cca677] transition-colors duration-300 pb-2">
                   <span className="text-xs uppercase font-bold tracking-widest">Explore</span>
                   <ArrowRight className="w-3 h-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                 </div>
               </div>
             </div>
          </Link>
        </div>

        {/* NEW 3: The Floating Canvas */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#cca677] text-xs uppercase tracking-[0.2em] font-bold">New: The Floating Canvas</h2>
          <Link href={`#`} className="group block relative w-full h-[600px] bg-transparent flex flex-col items-center justify-end">
             {/* Floating Image */}
             <div className="absolute top-0 w-[85%] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl z-10 transform group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
               <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
             </div>
             
             {/* Background Card */}
             <div className="w-full h-[45%] bg-[#121212] rounded-[2rem] border border-white/5 p-8 pt-16 flex flex-col justify-end relative z-0 group-hover:border-[#cca677]/30 transition-colors duration-500">
               <div className="flex justify-between items-end w-full">
                 <div className="flex flex-col gap-1 max-w-[70%]">
                   <span className="text-[#cca677] text-[10px] font-bold uppercase tracking-[0.2em]">{item.tag}</span>
                   <h3 className="font-serif text-2xl font-bold text-white leading-none">{item.name}</h3>
                 </div>
                 <div className="flex flex-col items-end gap-3">
                   <span className="text-xl font-light text-white">${item.priceUsd}</span>
                   <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#cca677] group-hover:border-[#cca677] transition-colors duration-300">
                     <Play className="h-3 w-3 text-white group-hover:text-black ml-0.5" />
                   </div>
                 </div>
               </div>
             </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
