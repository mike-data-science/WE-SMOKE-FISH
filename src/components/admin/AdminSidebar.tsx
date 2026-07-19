'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Package, FolderTree, Settings, LogOut, Anchor, Menu, X } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Anchor className="h-5 w-5 text-[#0033FF]" />
          <span className="text-xs uppercase tracking-[0.3em] font-black text-white">Admin</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white/70 hover:text-white transition-colors">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed md:relative top-0 md:top-4 left-0 z-50 w-64 md:h-[calc(100vh-2rem)] md:ml-4 md:mr-4 border-r md:border border-white/10 bg-[#050505] md:bg-white/[0.02] md:backdrop-blur-xl md:rounded-[2rem] flex flex-col h-full transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-hidden shadow-2xl`}>
        <div className="h-16 md:h-24 flex items-center px-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0033FF] to-[#00F2FE] flex items-center justify-center shadow-lg shadow-[#0033FF]/20">
              <Anchor className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm uppercase tracking-[0.3em] font-black text-white">Admin</span>
          </Link>
        </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold uppercase tracking-[0.1em] text-xs ${
                isActive 
                  ? 'bg-gradient-to-r from-[#0033FF] to-[#00F2FE] text-white shadow-lg shadow-[#0033FF]/25 scale-105' 
                  : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <link.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white/40'}`} />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/5">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-white/50 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 transition-colors uppercase tracking-[0.1em] text-xs font-bold"
        >
          <LogOut className="h-5 w-5" />
          Exit to Store
        </Link>
      </div>
      </aside>
    </>
  );
}
