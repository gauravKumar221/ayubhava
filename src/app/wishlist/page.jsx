'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import { wishlistActions } from '@/store/wishlist-slice';
import { ChevronLeft, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/shared/lazy-image';
import { useToast } from '@/hooks/use-toast';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const removeItem = (id) => {
    dispatch(wishlistActions.removeItem(id));
    toast({
      title: "Removed from Wishlist",
      description: "The ritual has been removed from your saved list.",
    });
  };

  const addToBag = (item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.-]/g, '')) : item.price;
    
    dispatch(cartActions.addItem({
      id: item.id,
      title: item.title,
      price: price || 0,
      image: item.image
    }));

    dispatch(wishlistActions.removeItem(item.id));

    toast({
      title: "Added to Bag!",
      description: `${item.title} is ready for checkout.`,
    });
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />

      <main className="flex-1 container mx-auto max-w-4xl px-4 py-12 lg:py-20">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                My Saved <br /><span className="text-primary">Rituals.</span>
              </h1>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                {wishlistItems.length} items currently in your collection
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-none border-2 border-black font-black uppercase text-xs tracking-widest h-12 px-8 hover:bg-black hover:text-white transition-all">
              <Link href="/products">
                <ChevronLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
          </div>

          <div className="flex flex-col">
            {wishlistItems.length > 0 ? (
              <div className="divide-y divide-muted/50 border-b border-muted/50">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="relative animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex py-10 sm:py-12 gap-8 group hover:bg-muted/5 transition-colors">
                      <Link href={`/products/${item.id}`} className="relative aspect-square w-32 sm:w-48 shrink-0 overflow-hidden bg-[#f9f9f9] rounded-3xl border border-black/5 shadow-sm transition-transform hover:scale-[1.02]">
                        {item.image && (
                          <LazyImage 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-cover"
                            dataAiHint={item.imageHint}
                          />
                        )}
                      </Link>

                      <div className="flex flex-1 flex-col justify-between py-2">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{item.category}</p>
                              <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors block">
                                <h2 className="text-xl sm:text-2xl font-black leading-tight text-foreground tracking-tight">
                                  {item.title}
                                </h2>
                              </Link>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-2 bg-muted/30 rounded-full"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-black text-foreground">
                              ₹{typeof item.price === 'number' ? item.price.toLocaleString() : (item.price || '0')}
                            </span>
                            <div className="h-1 w-1 bg-muted-foreground/30 rounded-full" />
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">In Stock</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                          <Button 
                            onClick={() => addToBag(item)}
                            className="bg-black hover:bg-black/90 text-white rounded-none px-10 h-14 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] flex-1 sm:flex-none"
                          >
                            Move To Bag
                          </Button>
                          <Button asChild variant="ghost" className="h-14 font-black uppercase text-[10px] tracking-widest group">
                            <Link href={`/products/${item.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 sm:py-48 text-center animate-in fade-in zoom-in-95 duration-700">
                <div className="relative mb-12">
                  <div className="h-32 w-32 rounded-full bg-muted/20 flex items-center justify-center animate-pulse">
                    <Heart className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-4 px-6 max-w-sm mx-auto">
                  <h3 className="text-3xl font-black text-foreground tracking-tight uppercase leading-none">
                    Your Ritual <br />is Empty.
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed uppercase tracking-tight">
                    Start exploring our collection of high-performance nutrition to save your favorites here.
                  </p>
                </div>

                <div className="mt-12">
                  <Button 
                    asChild 
                    className="rounded-none bg-black hover:bg-primary text-white px-12 h-16 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl"
                  >
                    <Link href="/products">Explore rituals</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
