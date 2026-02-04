'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  ArrowRight 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-20 px-4 lg:px-8 border-t border-white/10 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white font-bold text-lg">W</div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Wellbeing</span>
                <span className="text-lg uppercase font-black">Nutrition</span>
              </div>
            </Link>
            
            <div className="max-w-md space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest">Join the Vitality Ritual</h3>
              <p className="text-white/60 text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                Subscribe to receive wellness insights, early access to new launches, and curated ritual guides.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-white/5 border-white/10 h-12 rounded-none focus-visible:ring-primary/50 text-[10px] font-black uppercase tracking-[0.2em] placeholder:text-white/20"
                />
                <Button className="bg-white text-black hover:bg-primary hover:text-white h-12 rounded-none px-8 font-black uppercase text-[10px] tracking-[0.2em] transition-all">
                  JOIN
                </Button>
              </div>
            </div>
          </div>

          {/* Shop by Category */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Shop by Category</h3>
            <nav className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-wider text-white/60">
              <Link href="#" className="hover:text-white transition-colors">Marine Collagen</Link>
              <Link href="#" className="hover:text-white transition-colors">Effervescent Tablets</Link>
              <Link href="#" className="hover:text-white transition-colors">Melts Oral Strips</Link>
              <Link href="#" className="hover:text-white transition-colors">Vegan Protein Isolate</Link>
              <Link href="#" className="hover:text-white transition-colors">Wholefood Multivitamins</Link>
            </nav>
          </div>

          {/* Shop by Benefits */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Shop by Benefits</h3>
            <nav className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-wider text-white/60">
              <Link href="#" className="hover:text-white transition-colors">Skin Glow & Hair</Link>
              <Link href="#" className="hover:text-white transition-colors">Deep Sleep & Stress</Link>
              <Link href="#" className="hover:text-white transition-colors">Weight & Metabolism</Link>
              <Link href="#" className="hover:text-white transition-colors">Gut Health & Detox</Link>
              <Link href="#" className="hover:text-white transition-colors">Immunity & Defense</Link>
            </nav>
          </div>

          {/* About Us */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">About Us</h3>
            <nav className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-wider text-white/60">
              <Link href="#" className="hover:text-white transition-colors">Our Philosophy</Link>
              <Link href="#" className="hover:text-white transition-colors">Science Board</Link>
              <Link href="#" className="hover:text-white transition-colors">Sustainability</Link>
              <Link href="#" className="hover:text-white transition-colors">Clean Label Project</Link>
              <Link href="#" className="hover:text-white transition-colors">Store Locator</Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Quick Links</h3>
            <nav className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-wider text-white/60">
              <Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link>
              <Link href="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Wellness Blog</Link>
              <Link href="#" className="hover:text-white transition-colors">Track Order</Link>
              <Link href="#" className="hover:text-white transition-colors">FAQs</Link>
            </nav>
          </div>

        </div>

        <Separator className="bg-white/10 my-16" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6">
            <Link href="#" className="text-white/40 hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-white/40 hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-white/40 hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-white/40 hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></Link>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              © 2024 AYUBHYAVA Wellbeing Nutrition. All rights reserved.
            </p>
            <div className="flex gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-white/10">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
