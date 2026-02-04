'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ChevronDown
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email) {
      router.push('/thank-you');
    }
  };

  const footerSections = [
    {
      title: "Shop Rituals",
      links: [
        { label: "Marine Collagen", href: "/products" },
        { label: "Effervescent Tablets", href: "/products" },
        { label: "Melts Oral Strips", href: "/products" },
        { label: "Vegan Protein Isolate", href: "/products" },
        { label: "Wholefood Multivitamins", href: "/products" },
      ]
    },
    {
      title: "Benefits",
      links: [
        { label: "Skin Glow & Hair", href: "/products" },
        { label: "Deep Sleep & Stress", href: "/products" },
        { label: "Weight & Metabolism", href: "/products" },
        { label: "Gut Health & Detox", href: "/products" },
        { label: "Immunity & Defense", href: "/products" },
      ]
    },
    {
      title: "About Us",
      links: [
        { label: "Our Story", href: "/our-story" },
        { label: "Certificates", href: "/certificates" },
        { label: "Wellness Blog", href: "/blog" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact-us" },
        { label: "My Wishlist", href: "/wishlist" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Orders & Shipping", href: "/orders-shipping" },
        { label: "Refunds & Cancellation", href: "/refunds-cancellation" },
      ]
    }
  ];

  return (
    <footer className="bg-black text-white py-16 lg:py-20 px-4 lg:px-8 border-t border-white/10 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white font-bold text-lg text-white">W</div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 text-white">Wellbeing</span>
                <span className="text-lg uppercase font-black text-white">AYUBHAVA</span>
              </div>
            </Link>
            
            <div className="max-w-md space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary">Join the Vitality Ritual</h3>
              <p className="text-white/60 text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                Subscribe to receive wellness insights, early access to new launches, and curated ritual guides.
              </p>
              <form onSubmit={handleJoin} className="flex gap-2">
                <Input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS" 
                  className="bg-white/5 border-white/10 h-12 rounded-none focus-visible:ring-primary/50 text-[10px] font-black uppercase tracking-[0.2em] placeholder:text-white/20 text-white"
                />
                <Button type="submit" className="bg-white text-black hover:bg-primary hover:text-white h-12 rounded-none px-8 font-black uppercase text-[10px] tracking-[0.2em] transition-all">
                  JOIN
                </Button>
              </form>
            </div>
          </div>

          {/* Desktop Navigation Grid */}
          <div className="hidden lg:grid lg:col-span-4 grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">{section.title}</h3>
                <nav className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-wider text-white/60">
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Mobile Accordion Navigation */}
          <div className="lg:hidden w-full">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {footerSections.map((section) => (
                <AccordionItem key={section.title} value={section.title} className="border-none">
                  <AccordionTrigger className="flex h-14 items-center justify-between rounded-full border border-white/20 bg-white/5 px-6 hover:no-underline py-0 group data-[state=open]:border-primary data-[state=open]:bg-primary/5">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white group-data-[state=open]:text-primary">
                      {section.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2 px-6">
                    <nav className="flex flex-col gap-4">
                      {section.links.map((link) => (
                        <Link 
                          key={link.label} 
                          href={link.href} 
                          className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              © {mounted ? new Date().getFullYear() : '2024'} AYUBHAVA Wellbeing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
