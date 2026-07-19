'use client';

import Link from 'next/link';
import { useRegionStore } from '../store/useRegionStore';
import { MapPin, ShoppingBag, Menu, X, Search, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { region, setRegion, isHydrated } = useRegionStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentRegion = isHydrated ? region : null;
  const isCinematic = pathname === '/cinematic';

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const { t } = useTranslation();

  const links = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/shop' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
      isCinematic
        ? scrolled 
          ? 'bg-[#050505]/80 backdrop-blur-xl shadow-2xl py-2' 
          : 'bg-transparent py-4 md:py-6'
        : 'bg-background/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] sticky'
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">

            <div className="flex flex-col items-start" style={{ lineHeight: '0.85', letterSpacing: '-0.02em' }}>
              <span className={`text-[15px] font-extrabold self-center transition-colors duration-300 ${isCinematic ? 'text-white' : 'text-foreground'}`}>we</span>
              <span className={`text-[20px] font-black transition-colors duration-300 ${isCinematic ? 'text-[#cca677]' : 'text-accent'}`}>smoke</span>
              <span className={`text-[16px] font-extrabold self-center transition-colors duration-300 ${isCinematic ? 'text-white' : 'text-foreground'}`} style={{ marginLeft: '0.25em' }}>fish</span>
            </div>
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            
            let linkClass = 'nav-link text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ';
            if (isCinematic) {
              linkClass += isActive ? 'text-[#cca677]' : 'text-white/60 hover:text-white';
            } else {
              linkClass += isActive ? 'text-accent active' : 'text-muted hover:text-foreground';
            }

            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={linkClass}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-5">
          <div className={`flex items-center gap-3.5 ${isCinematic ? 'text-white' : 'text-foreground'}`}>
            <button className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors duration-200 ${isCinematic ? 'hover:bg-white/10 hover:text-[#cca677]' : 'hover:bg-warm'}`}>
              <Search className="h-[17px] w-[17px]" />
            </button>
            <button className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors duration-200 relative ${isCinematic ? 'hover:bg-white/10 hover:text-[#cca677]' : 'hover:bg-warm'}`}>
              <ShoppingBag className="h-[17px] w-[17px]" />
              <span className={`absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold text-white ${isCinematic ? 'bg-[#cca677]' : 'bg-coral'}`}>2</span>
            </button>
            <LanguageSwitcher />
          </div>
        </div>

        <button 
          className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${isCinematic ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-warm'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden p-6 space-y-1 shadow-xl border-t animate-fade-in ${isCinematic ? 'bg-[#050505]/95 backdrop-blur-xl border-white/5' : 'bg-surface/95 backdrop-blur-xl border-border'}`}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            
            let mobileLinkClass = 'block py-3 px-4 rounded-xl text-[15px] font-semibold transition-colors ';
            if (isCinematic) {
              mobileLinkClass += isActive ? 'text-[#cca677] bg-[#cca677]/10' : 'text-white/80 hover:bg-white/5 hover:text-white';
            } else {
              mobileLinkClass += isActive ? 'text-accent bg-accent/5' : 'text-foreground hover:bg-warm';
            }

            return (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
