'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Our Story', href: '/story' },
  { name: 'Locations', href: '/locations' },
  { name: 'Contact', href: '/contact' },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: 'circle(0% at 100% 0%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      clipPath: 'circle(150% at 100% 0%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants: Variants = {
    closed: { y: 100, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3 + i * 0.1, ease: 'easeOut' }
    })
  };

  return (
    <>
      {/* Sticky Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-[150] w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:bg-white/10 hover:scale-105"
        aria-label="Open Menu"
      >
        <MenuIcon size={24} />
      </button>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[200] bg-[#050201]/95 backdrop-blur-3xl flex flex-col justify-center px-12 md:px-24"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-white/10 hover:rotate-90"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            {/* Menu Links */}
            <nav className="flex flex-col gap-6 md:gap-10">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-6"
                    >
                      <span className="text-white/20 text-2xl font-bold tracking-widest transition-colors duration-300 group-hover:text-[#ff8c42]">
                        0{i + 1}
                      </span>
                      <span className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ffb84d] group-hover:to-[#ff4a1c] group-hover:pl-4">
                        {t(`nav.${link.name.toLowerCase().replace(' ', '_')}`)}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Footer info in menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8"
            >
              <div className="flex flex-col text-sm text-white/50">
                <span className="text-white font-bold mb-2 uppercase tracking-widest">{t('menu.get_in_touch')}</span>
                <span>hello@wesmokefish.com</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-white/50">
                <a href="#" className="hover:text-[#ff8c42] transition-colors">IG</a>
                <a href="#" className="hover:text-[#ff8c42] transition-colors">FB</a>
                <a href="#" className="hover:text-[#ff8c42] transition-colors">TT</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
