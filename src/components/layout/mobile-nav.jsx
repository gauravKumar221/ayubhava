'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { CartDrawer } from '@/components/cart/cart-drawer';

export function MobileNav() {
  const pathname = usePathname();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

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
      label: 'Cart',
      icon: ShoppingBag,
      isCart: true,
      active: false,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-[100] md:hidden">
      <nav className="bg-[#1a1a1a] border border-white/5 shadow-2xl rounded-full h-16 px-6 flex items-center justify-between">
        {navItems.map((item) => {
          const itemContent = (
            <div className="flex flex-col items-center gap-1 group relative py-1 min-w-[60px] cursor-pointer">
              {/* Active Pill Background */}
              <div 
                className={cn(
                  "absolute inset-0 -top-1 -bottom-1 rounded-full transition-all duration-300",
                  item.active ? "bg-white/10 opacity-100 scale-100" : "bg-transparent opacity-0 scale-75"
                )} 
              />
              
              <div className="relative">
                <item.icon 
                  className={cn(
                    "h-5 w-5 transition-all duration-300 relative z-10",
                    item.active ? "text-white" : "text-white/40 group-hover:text-white/70"
                  )} 
                />
                {item.isCart && cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-[8px] text-white h-4 w-4 flex items-center justify-center rounded-full font-black animate-in zoom-in duration-300">
                    {cartQuantity}
                  </span>
                )}
              </div>
              
              <span 
                className={cn(
                  "text-[10px] font-black uppercase tracking-wider transition-all duration-300 relative z-10",
                  item.active ? "text-white" : "text-white/40 group-hover:text-white/70"
                )}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.isCart) {
            return (
              <CartDrawer key={item.label}>
                {itemContent}
              </CartDrawer>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
            >
              {itemContent}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
