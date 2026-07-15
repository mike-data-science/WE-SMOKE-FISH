'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, FolderTree, Settings, LogOut, Anchor } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl flex flex-col h-full hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-tight">
          <Anchor className="h-6 w-6 text-blue-500" />
          <span>Admin Panel</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white font-medium shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="h-5 w-5 text-slate-500" />
          Exit to Store
        </Link>
      </div>
    </aside>
  );
}
