'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import { wishlistActions } from '@/store/wishlist-slice';
import { Button } from '@/components/ui/button';
import { Heart, Star, CheckCircle2 } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { LazyImage } from '@/components/shared/lazy-image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { products } from '@/lib/data';

const categories = [
  "All", "Best Sellers", "Immunity", "Sleep & Stress", "Gut", "Weight", "Detox", "Beauty", "Essentials", "Energy & Me"
];

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="space-y-3 px-1">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-10" />
          <div className="flex gap-1.5">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="pt-4 space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-12 w-full rounded-none" />
        </div>
      </div>
    </div>
  );
}

export function ShopByHealthNeeds() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
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

  const displayProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Shop by Health Needs
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-lg border-2 font-bold text-sm transition-all whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105" 
                  : "bg-white text-foreground border-black/5 hover:border-black/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 min-h-[400px]">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : (
            displayProducts.map((product) => {
              const media = getPlaceholderImage(product.imageId);
              const isInCart = cartItems.some(item => item.id === product.id);
              const isInWishlist = wishlistItems.some(item => item.id === product.id);
              
              return (
                <div key={product.id} className="flex flex-col group h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative mb-4 md:mb-6">
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative aspect-square bg-[#f9f9f9] rounded-2xl overflow-hidden shadow-sm border border-black/5">
                        <LazyImage 
                          src={media?.imageUrl} 
                          alt={product.title} 
                          fill 
                          className="object-contain p-6 md:p-8 group-hover:scale-105 transition-transform duration-500"
                          dataAiHint={media?.imageHint}
                        />
                        {product.isHighlyReordered && (
                          <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 md:px-3 md:py-1 text-[8px] md:text-[10px] font-black uppercase tracking-wider rounded-bl-xl z-10">
                            Highly reordered
                          </div>
                        )}
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
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] md:text-[11px] font-black text-muted-foreground uppercase tracking-widest">Pack:</span>
                        <div className="flex gap-1">
                          <div className="h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-black flex items-center justify-center text-[8px] md:text-[10px] font-black bg-black text-white">1</div>
                          <div className="h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-black/10 flex items-center justify-center text-[8px] md:text-[10px] font-black hover:border-black/30">2</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 bg-black text-white w-fit px-1.5 py-0.5 rounded text-[8px] md:text-[10px] font-black uppercase tracking-wider">
                        <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-white" />
                        {product.reviews} reviews
                      </div>

                      <h3 className="text-sm md:text-lg font-black text-foreground leading-tight tracking-tight hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1">
                        {product.tags.map(tag => (
                          <span key={tag} className="bg-[#eef4f2] text-[#4a6b5d] px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>

                    <div className="mt-auto pt-2 md:pt-4 space-y-3 md:space-y-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg md:text-xl font-black">₹{product.price}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-[10px] md:text-sm text-muted-foreground line-through font-bold">₹{product.originalPrice}</span>
                            {product.discount && (
                              <span className="text-[10px] md:text-sm font-black text-primary uppercase">{product.discount}</span>
                            )}
                          </>
                        )}
                      </div>

                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className={cn(
                          "w-full h-10 md:h-12 rounded-none font-black uppercase text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] transition-all",
                          isInCart 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                            : "bg-black text-white hover:bg-black/90"
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
