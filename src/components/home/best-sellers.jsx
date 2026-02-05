'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import { wishlistActions } from '@/store/wishlist-slice';
import { Button } from '@/components/ui/button';
import { Heart, Star, CheckCircle2, TrendingUp } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { LazyImage } from '@/components/shared/lazy-image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { products } from '@/lib/data';

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="space-y-3 px-1">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <div className="pt-4 space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-12 w-full rounded-none" />
        </div>
      </div>
    </div>
  );
}

export function BestSellers() {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleWishlist = (product) => {
    const media = getPlaceholderImage(product.imageId);
    const isAdding = !wishlistItems.some(item => item.id === product.id);
    
    dispatch(wishlistActions.toggleItem({
      ...product,
      image: media?.imageUrl,
      imageHint: media?.imageHint
    }));

    toast({
      title: isAdding ? "Added to Wishlist" : "Removed from Wishlist",
      description: isAdding ? `${product.title} saved.` : `${product.title} removed.`,
    });
  };

  const handleAddToCart = (product) => {
    const media = getPlaceholderImage(product.imageId);
    dispatch(cartActions.addItem({
      ...product,
      image: media?.imageUrl
    }));
    toast({
      title: "Added to Cart!",
      description: `${product.title} is now in your ritual bag.`,
    });
  };

  const bestSellingProducts = products.filter(p => p.category === "Best Sellers" || p.isHighlyReordered).slice(0, 4);

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              <TrendingUp className="h-3 w-3" /> Community Favorites
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Button asChild variant="link" className="font-black uppercase text-xs tracking-widest p-0 h-auto">
            <Link href="/products">View All Rituals</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : (
            bestSellingProducts.map((product) => {
              const media = getPlaceholderImage(product.imageId);
              const isInCart = cartItems.some(item => item.id === product.id);
              const isInWishlist = wishlistItems.some(item => item.id === product.id);
              
              return (
                <div key={product.id} className="flex flex-col group h-full animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-4 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-all">
                  <div className="relative mb-4 md:mb-6">
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative aspect-square bg-[#f9f9f9] rounded-2xl overflow-hidden shadow-sm">
                        <LazyImage 
                          src={media?.imageUrl} 
                          alt={product.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          dataAiHint={media?.imageHint}
                        />
                        <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-2 py-1 md:px-3 md:py-1 text-[8px] md:text-[10px] font-black uppercase tracking-wider rounded-bl-xl z-10">
                          Top Choice
                        </div>
                      </div>
                    </Link>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      className={cn(
                        "absolute bottom-3 right-3 md:bottom-4 md:right-4 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center transition-colors z-20",
                        isInWishlist ? "text-red-500" : "text-foreground hover:text-red-500"
                      )}
                    >
                      <Heart className={cn("h-4 w-4 md:h-5 md:w-5", isInWishlist && "fill-current")} />
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col space-y-3 md:space-y-4 px-1">
                    <Link href={`/products/${product.id}`} className="space-y-1.5 md:space-y-2 block">
                      <div className="flex items-center gap-1.5 bg-black text-white w-fit px-1.5 py-0.5 rounded text-[8px] md:text-[10px] font-black uppercase tracking-wider">
                        <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-white" />
                        {product.reviews} reviews
                      </div>

                      <h3 className="text-sm md:text-lg font-black text-foreground leading-tight tracking-tight hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                      </h3>

                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {product.tags.map(tag => (
                            <span key={tag} className="bg-[#eef4f2] text-[#4a6b5d] px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-wide border border-[#dcece6]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>

                    <div className="mt-auto pt-2 md:pt-4 space-y-3 md:space-y-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg md:text-xl font-black">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] md:text-sm text-muted-foreground line-through font-bold">₹{product.originalPrice}</span>
                        )}
                      </div>

                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className={cn(
                          "w-full h-10 md:h-12 rounded-none font-black uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] transition-all",
                          isInCart 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "bg-black text-white hover:bg-primary"
                        )}
                      >
                        {isInCart ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3" /> In Cart
                          </span>
                        ) : (
                          "Add To Cart"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}