
'use client';

import { LazyImage } from '@/components/shared/lazy-image';
import { Button } from '@/components/ui/button';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

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
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Let Influencers Talk
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4 snap-x">
          {influencerTalks.map((talk) => {
            const media = getPlaceholderImage(talk.imageId);
            return (
              <div 
                key={talk.id} 
                className="flex-none w-[280px] sm:w-[320px] snap-start group flex flex-col"
              >
                {/* Media Card */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm bg-muted mb-4 border border-border/50">
                  <LazyImage 
                    src={media?.imageUrl} 
                    alt={talk.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    dataAiHint={media?.imageHint}
                  />
                  
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
