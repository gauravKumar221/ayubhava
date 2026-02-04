'use client';

import Link from 'next/link';
import { ChevronLeft, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/shared/lazy-image';
import { Separator } from '@/components/ui/separator';

const wishlistItems = [
  {
    id: '10972345',
    title: 'Black Linen Scarf',
    category: 'Scarves',
    price: 21.95,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=400&auto=format&fit=crop',
    imageHint: 'linen scarf'
  },
  {
    id: '10837492',
    title: 'Classic Cateye Sunglasses',
    category: 'Sunglasses',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1511499767390-a73359580bf1?q=80&w=400&auto=format&fit=crop',
    imageHint: 'cateye sunglasses'
  },
  {
    id: '11823409',
    title: 'Performance seamless sports bra',
    category: 'Activewear',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1548330065-2956a164554c?q=80&w=400&auto=format&fit=crop',
    imageHint: 'sports bra'
  }
];

export default function WishlistPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shrink-0">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <h1 className="flex-1 text-center text-lg font-black uppercase tracking-tighter mr-8">
            My Wishlist
          </h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-2xl px-0 sm:px-4">
        <div className="flex flex-col">
          {wishlistItems.map((item, index) => (
            <div key={item.id} className="relative">
              <div className="flex p-4 sm:p-6 gap-6 group hover:bg-muted/5 transition-colors">
                {/* Product Image */}
                <div className="relative aspect-[3/4] w-32 sm:w-40 shrink-0 overflow-hidden bg-muted">
                  <LazyImage 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover"
                    dataAiHint={item.imageHint}
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-4">
                      <h2 className="text-base sm:text-lg font-bold leading-tight text-foreground">
                        {item.title}
                      </h2>
                      <button className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        Item ID: {item.id}
                      </p>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  {/* Price and Button Row */}
                  <div className="flex items-end justify-between mt-4">
                    <span className="text-lg font-black text-foreground">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button 
                      className="bg-black hover:bg-black/90 text-white rounded-none px-6 py-6 h-auto text-xs font-black uppercase tracking-widest transition-transform active:scale-95 shadow-lg"
                    >
                      Add to Bag
                    </Button>
                  </div>
                </div>
              </div>
              {/* Divider between items, but not after the last one */}
              {index < wishlistItems.length - 1 && (
                <Separator className="bg-muted/50" />
              )}
            </div>
          ))}

          {wishlistItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tight">Your wishlist is empty</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">Items you save will appear here for easy access later.</p>
              </div>
              <Button asChild className="bg-black rounded-none px-10 h-14 font-black uppercase tracking-widest">
                <Link href="/">Shop New Arrivals</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-black text-foreground text-sm opacity-20">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-foreground font-bold text-[10px]">W</div>
            <span className="uppercase tracking-widest">Wellbeing Nutrition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
