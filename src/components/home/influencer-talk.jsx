'use client';

import { useState } from 'react';
import { LazyImage } from '@/components/shared/lazy-image';
import { Button } from '@/components/ui/button';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { 
  Volume2, 
  VolumeX, 
  Share2, 
  X, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const influencerTalks = [
  {
    id: 'talk-1',
    title: 'Ultra Strength Magnesium+',
    price: '1,299',
    overlayText: 'relax the muscles',
    overlayStyle: 'italic font-serif text-3xl',
    imageId: 'influencer-1'
  },
  {
    id: 'talk-2',
    title: 'Whey Protein Isolate 26g | 1kg | 4B C...',
    price: '3,824',
    overlayText: 'DIGESTION AND RECOVERY',
    overlayStyle: 'font-black uppercase text-xl text-center bg-black/20 backdrop-blur-sm px-2 py-1',
    imageId: 'influencer-2'
  },
  {
    id: 'talk-3',
    title: 'Pure Korean Marine Collagen Peptide...',
    price: '1,709',
    overlayText: 'Dullness in just 60 days',
    overlayStyle: 'font-bold text-2xl text-center',
    imageId: 'influencer-3'
  },
  {
    id: 'talk-4',
    title: 'Glow Korean Marine Collagen Peptides',
    price: '1,899',
    overlayText: '',
    overlayStyle: '',
    imageId: 'influencer-4'
  },
  {
    id: 'talk-5',
    title: 'Triple Magnesium Complex',
    price: '1,329',
    overlayText: '',
    overlayStyle: '',
    imageId: 'influencer-5'
  },
  {
    id: 'talk-6',
    title: 'Kids Superfuel | Milk Chocolate |...',
    price: '854',
    overlayText: 'and focus at school.',
    overlayStyle: 'font-bold text-sm bottom-20 text-center px-4',
    imageId: 'influencer-6'
  }
];

export function InfluencerTalk() {
  const [selectedTalk, setSelectedTalk] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-24 bg-white">
      <div className="w-full px-4 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Let Influencers Talk
          </h2>
        </div>

        {/* Carousel Slider - Removed Container for Full Width feel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {influencerTalks.map((talk) => {
              const media = getPlaceholderImage(talk.imageId);
              return (
                <CarouselItem 
                  key={talk.id} 
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/6"
                >
                  <div className="group flex flex-col h-full">
                    {/* Media Card */}
                    <div 
                      className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm bg-muted mb-4 border border-border/50 cursor-pointer"
                      onClick={() => setSelectedTalk(talk)}
                    >
                      <LazyImage 
                        src={media?.imageUrl} 
                        alt={talk.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        dataAiHint={media?.imageHint}
                      />
                      
                      {/* Play Indicator */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>

                      {/* Text Overlay */}
                      {talk.overlayText && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                          <p className={cn(
                            "text-white drop-shadow-lg leading-tight",
                            talk.overlayStyle || "font-bold text-xl"
                          )}>
                            {talk.overlayText}
                          </p>
                        </div>
                      )}

                      {/* Gradient bottom shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3 flex-1 flex flex-col px-1">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {talk.title}
                        </h3>
                        <p className="text-sm font-bold text-foreground/80">
                          ₹ {talk.price}
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full h-12 bg-[#1a1a1a] hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest mt-auto"
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="hidden lg:flex items-center gap-2 mt-8 justify-center">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-white border-2 border-black/10 hover:bg-black hover:text-white transition-all shadow-md" />
            <CarouselNext className="static translate-y-0 h-12 w-12 bg-white border-2 border-black/10 hover:bg-black hover:text-white transition-all shadow-md" />
          </div>
        </Carousel>
      </div>

      {/* Reel Player Modal */}
      <Dialog open={!!selectedTalk} onOpenChange={() => setSelectedTalk(null)}>
        <DialogPortal>
          <DialogOverlay className="bg-black/90 backdrop-blur-sm z-[100]" />
          <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] p-0 bg-transparent border-none shadow-none z-[101] focus:outline-none focus-visible:outline-none">
            {selectedTalk && (
              <div className="relative aspect-[9/16] w-full max-h-[90vh] rounded-[2rem] overflow-hidden bg-black animate-in zoom-in-95 duration-300">
                {/* Progress Bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex gap-1 h-1">
                  <div className="flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[40%] animate-pulse" />
                  </div>
                  <div className="flex-1 bg-white/20 rounded-full" />
                  <div className="flex-1 bg-white/20 rounded-full" />
                </div>

                {/* Top Controls */}
                <div className="absolute top-8 right-4 z-20 flex flex-col gap-4">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedTalk(null)}
                  className="fixed top-6 right-6 h-10 w-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-all z-[110]"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Side Controls */}
                <div className="absolute bottom-40 right-4 z-20 flex flex-col gap-6 items-center">
                  <button className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Main Content */}
                <div className="absolute inset-0 z-0">
                  <LazyImage 
                    src={getPlaceholderImage(selectedTalk.imageId)?.imageUrl} 
                    alt="Reel" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay opacity-50" />
                </div>

                {/* Bottom Product Card */}
                <div className="absolute bottom-6 left-4 right-4 z-20">
                  <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] p-4 shadow-2xl space-y-4 border border-white/20">
                    <div className="flex gap-3">
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-black/5 shrink-0 bg-white">
                        <LazyImage 
                          src={getPlaceholderImage(selectedTalk.imageId)?.imageUrl} 
                          alt="Thumb" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-[13px] font-black leading-tight text-black line-clamp-1 flex items-center gap-1.5">
                          {selectedTalk.title}
                          <ExternalLink className="h-3 w-3 opacity-40" />
                        </h4>
                        <p className="text-sm font-bold text-black/80 mt-0.5">₹ {selectedTalk.price}</p>
                      </div>
                    </div>
                    <Button className="w-full h-12 bg-black hover:bg-black/90 text-white rounded-xl text-xs font-black uppercase tracking-[0.1em] shadow-lg">
                      Add To Cart
                    </Button>
                  </div>
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
