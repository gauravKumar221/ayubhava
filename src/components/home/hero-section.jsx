'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { LazyImage } from '@/components/shared/lazy-image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroSlides = [
  {
    id: 'protein',
    title: "NO BLOAT.\nNO FARTS.",
    subtitle: "THE LIGHTER, QUIETER WHEY.",
    description: "WITH 4B CFU PROBIOTICS & DIGESTIVE ENZYMES",
    bgId: "wellness-hero-bg",
    prodId: "protein-pouch-set",
    accent: "Project®"
  },
  {
    id: 'collagen',
    title: "GLOW FROM\nWITHIN.",
    subtitle: "KOREAN MARINE COLLAGEN.",
    description: "PURE PEPTIDES FOR RADIANT SKIN & HAIR",
    bgId: "goal-superfoods",
    prodId: "influencer-3",
    accent: "Purity Award"
  },
  {
    id: 'sleep',
    title: "DREAM\nDEEPER.",
    subtitle: "RESTFUL SLEEP MELTS.",
    description: "NATURAL MELATONIN FOR A PERFECT CYCLE",
    bgId: "goal-rituals",
    prodId: "product-sleep-melts-10",
    accent: "Sleep Aid"
  },
  {
    id: 'magnesium',
    title: "RECOVER\nFASTER.",
    subtitle: "TRIPLE MAGNESIUM.",
    description: "SUPPORT MUSCLES & COGNITIVE VITALITY",
    bgId: "goal-elixirs",
    prodId: "product-magnesium-complex",
    accent: "Bioavailable"
  },
  {
    id: 'vegan',
    title: "PEAK\nPERFORMANCE.",
    subtitle: "VEGAN ISOLATE.",
    description: "PLANT-BASED STRENGTH WITHOUT COMPROMISE",
    bgId: "goal-supplements",
    prodId: "influencer-2",
    accent: "Non-GMO"
  },
  {
    id: 'gut',
    title: "GUT\nHARMONY.",
    subtitle: "4B CFU PROBIOTIC.",
    description: "DAILY SUPPORT FOR OPTIMAL DIGESTION",
    bgId: "wellness-hero-bg",
    prodId: "goal-superfoods",
    accent: "Clean Label"
  }
];

export function HeroSection() {
  return (
    <section className="relative w-full h-[650px] lg:h-[800px] overflow-hidden bg-[#f8f5f2]">
      <Carousel 
        opts={{
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-[650px] lg:h-[800px] ml-0">
          {heroSlides.map((slide) => {
            const heroBg = getPlaceholderImage(slide.bgId);
            
            return (
              <CarouselItem key={slide.id} className="relative h-full pl-0 basis-full">
                <div className="absolute inset-0 z-0">
                  <LazyImage 
                    src={heroBg?.imageUrl} 
                    alt="Background" 
                    fill 
                    className="object-cover opacity-40 mix-blend-multiply"
                    priority={true}
                    dataAiHint={heroBg?.imageHint}
                  />
                </div>
                
                <div className="container mx-auto h-full px-4 lg:px-12 relative z-10 flex flex-col items-start justify-center pt-12 lg:pt-0">
                  <div className="flex flex-col gap-4 text-left max-w-3xl">
                    <h1 className="text-5xl md:text-8xl font-black text-[#2d2d2d] leading-[0.9] tracking-tighter whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <div className="space-y-2 mt-4">
                      <p className="text-2xl md:text-4xl font-black text-primary/80 tracking-tighter uppercase">
                        {slide.subtitle}
                      </p>
                      <p className="text-lg md:text-xl font-bold text-[#2d2d2d]/60 uppercase tracking-tight max-w-xl">
                        {slide.description}
                      </p>
                    </div>
                    <div className="pt-8">
                      <Button size="lg" asChild className="h-14 px-12 text-sm font-black rounded-full bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-widest shadow-xl cursor-pointer">
                        <Link href="/products">Shop Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        <div className="absolute bottom-12 right-12 z-20 flex gap-3">
          <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-full bg-white/80 border-none shadow-xl hover:bg-black hover:text-white transition-all" />
          <CarouselNext className="static translate-y-0 h-14 w-14 rounded-full bg-white/80 border-none shadow-xl hover:bg-black hover:text-white transition-all" />
        </div>
      </Carousel>
    </section>
  );
}