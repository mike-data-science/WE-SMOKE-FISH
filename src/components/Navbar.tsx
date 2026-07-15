'use client';

import Link from 'next/link';
import { useRegionStore } from '../store/useRegionStore';
import { MapPin, ShoppingBasket, Menu, X, Search, Globe } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { region, setRegion, isHydrated } = useRegionStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const currentRegion = isHydrated ? region : null;

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/shop' },
    { name: 'Catering', href: '/catering' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/mascot.jpg" 
              alt="We Smoke Fish mascot" 
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="flex flex-col items-start" style={{ lineHeight: '0.85', letterSpacing: '-0.02em' }}>
              <span className="text-[15px] font-extrabold text-foreground self-center">we</span>
              <span className="text-[20px] font-black text-accent">smoke</span>
              <span className="text-[16px] font-extrabold text-foreground self-center" style={{ marginLeft: '0.25em' }}>fish</span>
            </div>
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={`nav-link text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
                pathname === link.href ? 'text-accent active' : 'text-muted hover:text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-5">
          {currentRegion && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted bg-warm py-1.5 px-3.5 rounded-full border border-border">
              <MapPin className="h-3 w-3 text-coral" />
              <span>{currentRegion === 'US' ? 'US' : 'MD'}</span>
              <button 
                onClick={() => setRegion(currentRegion === 'US' ? 'MD' : 'US')}
                className="ml-1 text-accent hover:text-accent-hover font-bold"
              >
                Switch
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-3.5 text-foreground">
            <button className="h-9 w-9 rounded-full hover:bg-warm flex items-center justify-center transition-colors duration-200">
              <Search className="h-[17px] w-[17px]" />
            </button>
            <button className="h-9 w-9 rounded-full hover:bg-warm flex items-center justify-center transition-colors duration-200 relative">
              <ShoppingBasket className="h-[17px] w-[17px]" />
              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coral text-[8px] font-bold text-white">2</span>
            </button>
            <button className="h-9 w-9 rounded-full hover:bg-warm flex items-center justify-center transition-colors duration-200">
              <Globe className="h-[17px] w-[17px]" />
            </button>
          </div>
        </div>

        <button 
          className="md:hidden p-2 text-foreground hover:bg-warm rounded-lg transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl p-6 space-y-1 shadow-xl border-t border-border animate-fade-in">
          {links.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-4 rounded-xl text-[15px] font-semibold transition-colors ${
                pathname === link.href 
                  ? 'text-accent bg-accent/5' 
                  : 'text-foreground hover:bg-warm'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {currentRegion && (
            <div className="flex items-center gap-2 py-3 px-4 mt-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-coral" />
              <span>{currentRegion === 'US' ? 'United States' : 'Moldova'}</span>
              <button 
                onClick={() => setRegion(currentRegion === 'US' ? 'MD' : 'US')}
                className="ml-auto text-accent font-semibold"
              >
                Switch Region
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
