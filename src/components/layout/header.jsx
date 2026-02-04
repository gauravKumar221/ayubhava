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
  Leaf,
  Menu,
  X
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { LoginModal } from '@/components/auth/login-modal';
import { cn } from '@/lib/utils';

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector((state) => state.wishlist.totalQuantity);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-20 items-center justify-between px-4 lg:px-12">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile Navigation Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto px-6 border-r-0 shadow-2xl">
              <SheetHeader className="text-left mb-10 pt-4">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-black text-foreground text-2xl tracking-tighter">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground font-bold text-lg">W</div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 text-left">Wellbeing</span>
                      <span className="text-lg uppercase font-black">AYUBHAVA</span>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-8 text-sm font-black uppercase tracking-widest pb-12">
                <Link href="/products" className="hover:text-primary transition-colors py-1 border-b border-muted">Shop All Rituals</Link>
                
                <div className="space-y-5">
                  <p className="text-[9px] text-primary tracking-[0.3em] font-black uppercase">Wellness Benefits</p>
                  <div className="flex flex-col gap-4 pl-2">
                    <Link href="/products" className="flex items-center gap-3 hover:text-primary transition-all"><Sparkles className="h-4 w-4 text-primary" /> Skin Glow & Hair</Link>
                    <Link href="/products" className="flex items-center gap-3 hover:text-primary transition-all"><Square className="h-4 w-4 text-primary" /> Deep Sleep & Stress</Link>
                    <Link href="/products" className="flex items-center gap-3 hover:text-primary transition-all"><Scale className="h-4 w-4 text-primary" /> Weight & Metabolism</Link>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-[9px] text-primary tracking-[0.3em] font-black uppercase">Product Lines</p>
                  <div className="flex flex-col gap-4 pl-2">
                    <Link href="/products" className="flex items-center gap-3 hover:text-primary transition-all"><Waves className="h-4 w-4 text-primary" /> Marine Collagen</Link>
                    <Link href="/products" className="flex items-center gap-3 hover:text-primary transition-all"><Pill className="h-4 w-4 text-primary" /> Melts Oral Strips</Link>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-[9px] text-primary tracking-[0.3em] font-black uppercase">World of Wellbeing</p>
                  <div className="flex flex-col gap-4 pl-2">
                    <Link href="/our-story" className="flex items-center gap-3 hover:text-primary transition-all"><Info className="h-4 w-4 text-primary" /> Our Story</Link>
                    <Link href="/certificates" className="flex items-center gap-3 hover:text-primary transition-all"><Award className="h-4 w-4 text-primary" /> Certificates</Link>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-muted">
                  <Link href="/blog" className="hover:text-primary transition-colors">Blog & Insights</Link>
                  <Link href="/contact-us" className="text-primary hover:underline transition-colors">FREE Consultation</Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

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

              <DropdownMenuItem asChild className="rounded-xl py-3 cursor-bold text-[11px] uppercase tracking-wider focus:bg-primary focus:text-white transition-colors group">
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
            <Link href="/wishlist" className="relative group block p-1">
              <Heart className={cn(
                "h-5 w-5 cursor-pointer transition-colors", 
                wishlistQuantity > 0 ? "text-red-500 fill-current" : "hover:text-primary"
              )} />
              {wishlistQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-[9px] text-primary-foreground h-4 w-4 flex items-center justify-center rounded-full font-bold animate-in zoom-in duration-300">
                  {wishlistQuantity}
                </span>
              )}
            </Link>
            <Search className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            <CartDrawer>
              <div className="relative cursor-pointer hover:text-primary transition-colors p-1">
                <ShoppingBag className="h-5 w-5" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-[9px] text-white h-4 w-4 flex items-center justify-center rounded-full font-bold animate-in zoom-in duration-300">
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