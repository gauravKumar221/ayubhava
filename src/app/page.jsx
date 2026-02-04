
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Search, 
  Heart, 
  ShoppingBag, 
  Zap,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  LayoutDashboard,
  Award
} from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function HomePage() {
  const heroBg = getPlaceholderImage('wellness-hero-bg');
  const productSet = getPlaceholderImage('protein-pouch-set');

  return (
    <div className="flex flex-col min-h-screen font-body relative">
      {/* Floating Discount Tab */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] hidden lg:block">
        <div className="bg-primary text-primary-foreground py-3 px-1.5 rounded-r-md cursor-pointer hover:bg-primary/90 transition-all shadow-md [writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 rotate-180">
          Get 10% OFF
        </div>
      </div>

      {/* Public Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-black text-foreground text-2xl tracking-tighter">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground font-bold text-lg">W</div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Wellbeing</span>
                <span className="text-lg uppercase font-black">Nutrition</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-bold uppercase tracking-tight text-foreground/80">
            <Link href="#" className="hover:text-primary transition-colors">Shop All</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
              Shop by Benefits <ChevronDown className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
              Shop by Categories <ChevronDown className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
              World of Wellbeing <ChevronDown className="h-3 w-3" />
            </div>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">FREE Consultation</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
              New Launches <ChevronDown className="h-3 w-3" />
            </div>
            <div className="relative group">
              <Link href="#" className="hover:text-primary transition-colors">Kids</Link>
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-[8px] text-white px-1.5 py-0.5 rounded font-black animate-pulse">NEW</span>
            </div>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-foreground/70">
              <Zap className="h-5 w-5 cursor-pointer hover:text-primary" />
              <Heart className="h-5 w-5 cursor-pointer hover:text-primary" />
              <Search className="h-5 w-5 cursor-pointer hover:text-primary" />
              <div className="relative cursor-pointer hover:text-primary">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-black text-[9px] text-white h-4 w-4 flex items-center justify-center rounded-full font-bold">1</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex rounded-full">
              <Link href="/admin-dashboard">
                <LayoutDashboard className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Rebranded Hero Section */}
        <section className="relative w-full h-[600px] lg:h-[750px] overflow-hidden bg-[#f8f5f2]">
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroBg.imageUrl} 
              alt="Background" 
              fill 
              className="object-cover opacity-40 mix-blend-multiply"
              priority
              data-ai-hint={heroBg.imageHint}
            />
          </div>
          
          <div className="container mx-auto h-full px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between pt-12 lg:pt-0">
            <div className="flex flex-col gap-4 text-center lg:text-left max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="text-6xl md:text-8xl font-black text-[#2d2d2d] leading-[0.9] tracking-tighter">
                NO BLOAT.<br />NO FARTS.
              </h1>
              <div className="space-y-2 mt-4">
                <p className="text-2xl md:text-4xl font-black text-primary/80 tracking-tighter uppercase">
                  THE LIGHTER,<br />QUIETER WHEY.
                </p>
                <p className="text-lg md:text-xl font-bold text-[#2d2d2d]/60 uppercase tracking-tight max-w-md mx-auto lg:mx-0">
                  WITH 4B CFU PROBIOTICS<br />& DIGESTIVE ENZYMES
                </p>
              </div>
              <div className="pt-8">
                <Button size="lg" className="h-14 px-12 text-sm font-black rounded-full bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-widest shadow-xl">
                  Shop Now
                </Button>
              </div>
            </div>

            <div className="relative flex-1 w-full lg:w-auto h-[400px] lg:h-full flex items-center justify-center lg:justify-end animate-in fade-in zoom-in-95 duration-1000 delay-300">
              {/* Product Pouch Cluster */}
              <div className="relative aspect-square w-full max-w-[600px]">
                <Image 
                  src={productSet.imageUrl} 
                  alt="Whey Protein Pouches" 
                  fill 
                  className="object-contain drop-shadow-2xl"
                  data-ai-hint={productSet.imageHint}
                />
                
                {/* Certification Badges */}
                <div className="absolute top-1/2 -left-12 lg:-left-20 -translate-y-1/2 flex flex-col gap-4 items-center">
                  <div className="bg-white/90 backdrop-blur rounded-full p-4 border border-foreground/5 shadow-lg flex flex-col items-center justify-center text-center max-w-[100px]">
                    <span className="text-[8px] font-black uppercase text-foreground/40 leading-none">clean label</span>
                    <span className="text-[10px] font-black uppercase leading-tight">Project®</span>
                    <div className="h-px w-full bg-foreground/10 my-1" />
                    <span className="text-[8px] font-black uppercase text-foreground/40 leading-none">Purity</span>
                    <span className="text-[10px] font-black uppercase leading-tight">Award</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Navigation */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white/80 border-none shadow-md hover:bg-white transition-all">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white/80 border-none shadow-md hover:bg-white transition-all">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* Benefits Quick View */}
        <section className="py-16 bg-white border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="container mx-auto px-4 flex justify-between items-center gap-12">
            {[
              { label: 'Plant Based', icon: <Leaf className="h-5 w-5" /> },
              { label: 'No Added Sugar', icon: <Zap className="h-5 w-5" /> },
              { label: 'Gut Friendly', icon: <Award className="h-5 w-5" /> },
              { label: 'Non-GMO', icon: <Award className="h-5 w-5" /> },
              { label: 'Bioavailable', icon: <Zap className="h-5 w-5" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default min-w-fit">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className="text-sm font-black uppercase tracking-widest text-foreground/60">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-black text-foreground text-xl mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground font-bold text-xs">W</div>
            <span className="uppercase tracking-tighter">Wellbeing Nutrition</span>
          </div>
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-[0.3em]">© 2024 AYUBHYAVA Wellbeing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
