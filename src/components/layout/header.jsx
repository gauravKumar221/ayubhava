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
  Waves,
  Pill,
  Info,
  Award,
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  MapPin
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
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
            <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto p-0 border-r-0 shadow-2xl bg-white flex flex-col gap-0">
              <SheetHeader className="px-6 py-5 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2 font-black text-foreground text-xl tracking-tighter">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground font-bold text-sm">W</div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-60 text-left">Wellbeing</span>
                        <span className="text-sm uppercase font-black">AYUBHAVA</span>
                      </div>
                    </Link>
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted transition-colors">
                      <X className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto py-2">
                <nav className="flex flex-col">
                  {/* Single Links */}
                  <Link href="/products" className="px-6 py-4 text-sm font-bold border-b border-muted/50 hover:bg-muted/30 transition-colors">
                    Shop All
                  </Link>

                  {/* Collapsible Sections (Accordions) */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="benefits" className="border-b border-muted/50">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 text-sm font-bold">
                        Shop by Benefits
                      </AccordionTrigger>
                      <AccordionContent className="bg-muted/10 pb-2">
                        <div className="flex flex-col">
                          <Link href="/products" className="px-10 py-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3">
                            <Sparkles className="h-3.5 w-3.5" /> Skin Glow & Hair
                          </Link>
                          <Link href="/products" className="px-10 py-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3">
                            <Square className="h-3.5 w-3.5" /> Deep Sleep & Stress
                          </Link>
                          <Link href="/products" className="px-10 py-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3">
                            <Scale className="h-3.5 w-3.5" /> Weight & Metabolism
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="categories" className="border-b border-muted/50">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 text-sm font-bold">
                        Shop by Categories
                      </AccordionTrigger>
                      <AccordionContent className="bg-muted/10 pb-2">
                        <div className="flex flex-col">
                          <Link href="/products" className="px-10 py-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3">
                            <Waves className="h-3.5 w-3.5" /> Marine Collagen
                          </Link>
                          <Link href="/products" className="px-10 py-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3">
                            <Pill className="h-3.5 w-3.5" /> Melts Oral Strips
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="wellbeing" className="border-b border-muted/50">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 text-sm font-bold">
                        World of Wellbeing
                      </AccordionTrigger>
                      <AccordionContent className="bg-muted/10 pb-2">
                        <div className="flex flex-col">
                          <Link href="/our-story" className="px-10 py-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3">
                            <Info className="h-3.5 w-3.5" /> Our Story
                          </Link>
                          <Link href="/certificates" className="px-10 py-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3">
                            <Award className="h-3.5 w-3.5" /> Certificates
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link href="/blog" className="px-6 py-4 text-sm font-bold border-b border-muted/50 hover:bg-muted/30 transition-colors">
                    Blog
                  </Link>
                  <Link href="/contact-us" className="px-6 py-4 text-sm font-bold border-b border-muted/50 hover:bg-muted/30 transition-colors text-primary">
                    FREE Consultation
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="new" className="border-b border-muted/50">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 text-sm font-bold">
                        New Launches
                      </AccordionTrigger>
                      <AccordionContent className="bg-muted/10">
                        <Link href="/products" className="px-10 py-3 text-xs font-semibold text-muted-foreground block">Latest Rituals</Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="px-6 py-4 border-b border-muted/50 flex items-center justify-between text-sm font-bold">
                    <span>Kids</span>
                    <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">New</span>
                  </div>

                  {/* Account Section */}
                  <div className="mt-6 px-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Account</h4>
                    <div className="grid grid-cols-3 border border-muted/50 rounded-lg overflow-hidden">
                      <button onClick={() => setIsLoginOpen(true)} className="p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors border-r border-muted/50">
                        <Instagram className="h-5 w-5 mb-1" />
                      </button>
                      <button className="p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors border-r border-muted/50">
                        <Facebook className="h-5 w-5 mb-1" />
                      </button>
                      <button className="p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors">
                        <Youtube className="h-5 w-5 mb-1" />
                      </button>
                      <button className="p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors border-t border-r border-muted/50">
                        <Twitter className="h-5 w-5 mb-1" />
                      </button>
                      <button className="p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors border-t border-r border-muted/50">
                        <div className="font-bold text-xl leading-none">P</div>
                      </button>
                      <button className="p-4 flex flex-col items-center justify-center hover:bg-muted/30 transition-colors border-t border-muted/50">
                        <Linkedin className="h-5 w-5 mb-1" />
                      </button>
                    </div>
                  </div>

                  {/* App Buttons */}
                  <div className="mt-8 px-6 pb-12 flex flex-col gap-3">
                    <Link href="#" className="w-full">
                      <img src="https://placehold.co/200x60/000000/ffffff?text=GET+IT+ON+Google+Play" alt="Google Play" className="w-full rounded-lg shadow-sm" />
                    </Link>
                    <Link href="#" className="w-full">
                      <img src="https://placehold.co/200x60/000000/ffffff?text=Download+on+App+Store" alt="App Store" className="w-full rounded-lg shadow-sm" />
                    </Link>
                  </div>
                </nav>
              </div>
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
