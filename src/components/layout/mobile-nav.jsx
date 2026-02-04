'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Store',
      icon: Store,
      href: '/products',
      active: pathname.startsWith('/products'),
    },
    {
      label: 'Wishlist',
      icon: Heart,
      href: '/wishlist',
      active: pathname === '/wishlist',
    },
    {
      label: 'Profile',
      icon: User,
      href: '/profile',
      active: pathname === '/profile',
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-[100] md:hidden">
      <nav className="bg-[#1a1a1a] border border-white/5 shadow-2xl rounded-full h-16 px-6 flex items-center justify-between">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 group relative py-1 min-w-[60px]"
          >
            {/* Active Pill Background */}
            <div 
              className={cn(
                "absolute inset-0 -top-1 -bottom-1 rounded-full transition-all duration-300",
                item.active ? "bg-white/10 opacity-100 scale-100" : "bg-transparent opacity-0 scale-75"
              )} 
            />
            
            <item.icon 
              className={cn(
                "h-5 w-5 transition-all duration-300 relative z-10",
                item.active ? "text-white" : "text-white/40 group-hover:text-white/70"
              )} 
            />
            
            <span 
              className={cn(
                "text-[10px] font-black uppercase tracking-wider transition-all duration-300 relative z-10",
                item.active ? "text-white" : "text-white/40 group-hover:text-white/70"
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
