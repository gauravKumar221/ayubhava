'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LazyImage } from '@/components/shared/lazy-image';
import { Sparkles, Leaf, Microscope, Heart } from 'lucide-react';

export default function OurStoryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-20 lg:py-32 border-b overflow-hidden relative">
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles className="h-3 w-3" /> The AYUBHAVA Ritual
            </div>
            <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Modern Science.<br />
              <span className="text-primary">Ancient Roots.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground font-medium leading-relaxed uppercase tracking-tight font-serif italic">
              We started with a simple question: Why should daily vitality be a chore? 
              AYUBHAVA was born to turn high-performance nutrition into a beautiful, effortless daily ritual.
            </p>
          </div>
          
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-0" />
        </section>

        {/* Content Sections */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <LazyImage 
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop" 
                  alt="Natural Ingredients" 
                  fill 
                  className="object-cover"
                  dataAiHint="fresh herbs"
                />
              </div>
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none">The Genesis.</h2>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Our journey began in the Himalayan foothills, where we witnessed the profound impact of nature's potent botanicals. We realized that while the world moved faster, our bodies were still designed for the pure, bioavailable nutrients our ancestors thrived on.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <h4 className="font-black uppercase tracking-tight">Purity First</h4>
                    <p className="text-sm text-muted-foreground font-medium">No fillers, no synthetic colors, just raw vitality.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
                      <Microscope className="h-6 w-6" />
                    </div>
                    <h4 className="font-black uppercase tracking-tight">Bio-Engineered</h4>
                    <p className="text-sm text-muted-foreground font-medium">Enhanced delivery systems for maximum absorption.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Marquee or Quote */}
        <section className="bg-black text-white py-24 text-center overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <Heart className="h-12 w-12 text-primary mx-auto mb-8 animate-pulse" />
            <blockquote className="text-3xl lg:text-6xl font-black uppercase tracking-tighter leading-none max-w-5xl mx-auto italic">
              "We don't just sell supplements. We design the infrastructure for a more vibrant, high-energy life."
            </blockquote>
            <p className="mt-8 text-primary font-black uppercase tracking-[0.3em] text-sm">
              Founded on Ritual • {mounted ? new Date().getFullYear() : '2024'}
            </p>
          </div>
          <div className="absolute inset-0 bg-primary/10 opacity-30" />
        </section>

        {/* Closing Section */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-8">Join the Evolution.</h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-12">
              Today, AYUBHAVA serves a global community of ritual-seekers. From our Marine Collagen to our Melts Oral Strips, every product is a testament to our commitment to your daily vitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="h-16 px-12 bg-black text-white hover:bg-primary transition-all rounded-none font-black uppercase tracking-[0.2em] text-xs shadow-xl">
                Shop the Collection
              </button>
              <button className="h-16 px-12 border-2 border-black text-black hover:bg-black hover:text-white transition-all rounded-none font-black uppercase tracking-[0.2em] text-xs">
                Contact Our Experts
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}