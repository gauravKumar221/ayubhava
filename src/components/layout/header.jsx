'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Zap,
  ChevronDown,
  LayoutDashboard,
  Sparkles,
  Square,
  Scale,
  Smile,
  ShieldCheck,
  Waves,
  Apple,
  Pill,
  Activity,
  Info,
  Award,
  Calendar,
  Star,
  Leaf
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { LoginModal } from '@/components/auth/login-modal';

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-20 items-center justify-between px-4 lg:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-black text-foreground text-2xl tracking-tighter">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground font-bold text-lg">W</div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Wellbeing</span>
              <span className="text-lg uppercase font-black">AYUBHAVA</span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-bold uppercase tracking-tight text-foreground/80">
          <Link href="/products" className="hover:text-primary transition-colors">Shop All</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors outline-none py-2">
                Shop by Benefits <ChevronDown className="h-3 w-3" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-3 rounded-2xl shadow-2xl border-none mt-2 animate-in slide-in-from-top-2 duration-200">
              <DropdownMenuLabel className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 px-2">Health Goals</DropdownMenuLabel>
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-xl py-3 cursor-pointer font-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-primary-foreground outline-none transition-colors group">
                  <Sparkles className="mr-3 h-4 w-4 text-primary group-focus:text-white" /> Skin Glow & Hair
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-56 p-2 rounded-2xl shadow-2xl border-none ml-1 animate-in slide-in-from-left-1 duration-200">
                    <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer font-bold text-[10px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors">
                      <Link href="/products">Marine Collagen</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer font-bold text-[10px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors">
                      <Link href="/products">Skin Fuel</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors group">
                <Link href="/products" className="flex items-center">
                  <Square className="mr-3 h-4 w-4 text-primary group-focus:text-white" /> Deep Sleep & Stress
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors group">
                <Link href="/products" className="flex items-center">
                  <Scale className="mr-3 h-4 w-4 text-primary group-focus:text-white" /> Weight & Metabolism
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors outline-none py-2">
                Shop by Categories <ChevronDown className="h-3 w-3" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-3 rounded-2xl shadow-2xl border-none mt-2 animate-in slide-in-from-top-2 duration-200">
              <DropdownMenuLabel className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 px-2">Product Lines</DropdownMenuLabel>
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors group">
                <Link href="/products" className="flex items-center">
                  <Waves className="mr-3 h-4 w-4 text-primary group-focus:text-white" /> Marine Collagen
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors group">
                <Link href="/products" className="flex items-center">
                  <Pill className="mr-3 h-4 w-4 text-primary group-focus:text-white" /> Melts Oral Strips
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors outline-none py-2">
                World of Wellbeing <ChevronDown className="h-3 w-3" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-3 rounded-2xl shadow-2xl border-none mt-2 animate-in slide-in-from-top-2 duration-200">
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors group">
                <Link href="/our-story" className="flex items-center">
                  <Info className="mr-3 h-4 w-4 text-primary group-focus:text-white" /> Our Story
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer font-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors group">
                <Link href="/certificates" className="flex items-center">
                  <Award className="mr-3 h-4 w-4 text-primary group-focus:text-white" /> Certificates
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/contact-us" className="hover:text-primary transition-colors">FREE Consultation</Link>
        </nav>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 text-foreground/70">
            <Zap 
              className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setIsLoginOpen(true)}
            />
            <Link href="/wishlist">
              <Heart className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            </Link>
            <Search className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            <CartDrawer>
              <div className="relative cursor-pointer hover:text-primary transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-[9px] text-white h-4 w-4 flex items-center justify-center rounded-full font-bold animate-in zoom-in duration-300">
                    {cartQuantity}
                  </span>
                )}
              </div>
            </CartDrawer>
          </div>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex rounded-full">
            <Link href="/admin-dashboard">
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </header>
  );
}
