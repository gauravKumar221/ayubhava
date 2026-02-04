'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/shared/lazy-image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const initialWishlist = [
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
    // Dispatch event for other components to listen if needed
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
    // In a real app, this would add to cart state
    // For CRUD demo, we'll remove it from wishlist as it' "moved" to bag
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
          {items.map((item, index) => (
            <div key={item.id} className="relative animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex p-4 sm:p-6 gap-6 group hover:bg-muted/5 transition-colors">
                {/* Product Image */}
                <div className="relative aspect-[3/4] w-32 sm:w-40 shrink-0 overflow-hidden bg-muted rounded-xl">
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
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
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
              {/* Divider between items, but not after the last one */}
              {index < items.length - 1 && (
                <Separator className="bg-muted/50" />
              )}
            </div>
          ))}

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 px-4">
              <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center">
                <Heart className="h-12 w-12 text-primary opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tight">Your wishlist is empty</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">Looks like you haven't saved anything yet. Start exploring our nutrition collection!</p>
              </div>
              <Button asChild className="bg-black hover:bg-black/90 text-white rounded-full px-10 h-14 font-black uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1">
                <Link href="/">Shop All Products</Link>
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
