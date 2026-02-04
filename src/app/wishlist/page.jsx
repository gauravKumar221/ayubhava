
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Trash2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/shared/lazy-image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const initialWishlist = [
  {
    id: 'sleep-1',
    title: 'Restful Sleep Melts (10mg)',
    category: 'Sleep & Stress',
    price: 599,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=800&auto=format&fit=crop',
    imageHint: 'health product'
  },
  {
    id: 'best-1',
    title: 'Premium Collagen Peptides',
    category: 'Best Sellers',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop',
    imageHint: 'skincare portrait'
  }
];

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('wellbeing_wishlist');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(initialWishlist);
      localStorage.setItem('wellbeing_wishlist', JSON.stringify(initialWishlist));
    }
  }, []);

  const saveToStorage = (newItems) => {
    setItems(newItems);
    localStorage.setItem('wellbeing_wishlist', JSON.stringify(newItems));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    saveToStorage(updated);
    toast({
      title: "Removed from Wishlist",
      description: "The item has been removed from your saved list.",
    });
  };

  const addToBag = (item) => {
    const updated = items.filter(i => i.id !== item.id);
    saveToStorage(updated);
    toast({
      title: "Added to Bag!",
      description: `${item.title} is ready for checkout.`,
    });
  };

  if (!mounted) return null;

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
            My Wishlist ({items.length})
          </h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-2xl px-0 sm:px-4">
        <div className="flex flex-col">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.id} className="relative animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex p-4 sm:p-6 gap-6 group hover:bg-muted/5 transition-colors">
                  {/* Product Image */}
                  <Link href={`/products/${item.id}`} className="relative aspect-[3/4] w-32 sm:w-40 shrink-0 overflow-hidden bg-muted rounded-xl">
                    <LazyImage 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover"
                      dataAiHint={item.imageHint}
                    />
                  </Link>

                  {/* Content Area */}
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                          <h2 className="text-base sm:text-lg font-bold leading-tight text-foreground">
                            {item.title}
                          </h2>
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
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
                        ₹{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
                      </span>
                      <Button 
                        onClick={() => addToBag(item)}
                        className="bg-black hover:bg-black/90 text-white rounded-none px-6 py-6 h-auto text-xs font-black uppercase tracking-widest transition-transform active:scale-95 shadow-lg"
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                </div>
                {index < items.length - 1 && (
                  <Separator className="bg-muted/50" />
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-32 sm:py-48 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="relative mb-8">
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M110 50L70 30L30 50V90L70 110L110 90V50Z" fill="#E2E2E2" />
                  <path d="M70 30L30 50L70 70L110 50L70 30Z" fill="#F2F2F2" />
                  <path d="M110 50L70 70V110L110 90V50Z" fill="#D4D4D4" />
                  <path d="M70 110V70L30 50V90L70 110Z" fill="#E2E2E2" />
                  <path d="M70 30V70" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
                  <path d="M78 35C78 33.3431 76.6569 32 75 32C73.3431 32 72 33.3431 72 35C72 38 75 41 75 41C75 41 78 38 78 35Z" fill="#FF5A5F" />
                </svg>
              </div>
              
              <div className="space-y-3 px-6">
                <h3 className="text-2xl font-black text-foreground tracking-tight">
                  Your Wishlist is Empty
                </h3>
                <p className="text-muted-foreground text-sm font-medium max-w-[280px] mx-auto leading-relaxed">
                  Tap heart button to start saving your favorite items.
                </p>
              </div>

              <div className="mt-10">
                <Button 
                  asChild 
                  variant="outline" 
                  className="rounded-none border-2 border-black px-10 h-14 font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
                >
                  <Link href="/">Add Now</Link>
                </Button>
              </div>
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
