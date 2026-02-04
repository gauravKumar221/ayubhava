
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { LazyImage } from '@/components/shared/lazy-image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const categories = [
  "All", "Best Sellers", "Immunity", "Sleep & Stress", "Gut", "Weight", "Detox", "Beauty", "Essentials", "Energy & Me"
];

const allProducts = [
  // Sleep & Stress
  {
    id: 'sleep-1',
    category: "Sleep & Stress",
    title: 'Restful Sleep Melts (10mg)',
    reviews: 919,
    price: 599,
    tags: ["Deep Sleep", "Sleep Cycle"],
    imageId: 'product-sleep-melts-10',
    isHighlyReordered: true
  },
  {
    id: 'sleep-2',
    category: "Sleep & Stress",
    title: 'Triple Magnesium Complex',
    reviews: 781,
    price: 1329,
    originalPrice: 1399,
    discount: 'Save 5%',
    tags: ["Sleep", "Cognition & Muscle"],
    imageId: 'product-magnesium-complex',
    isHighlyReordered: true
  },
  {
    id: 'sleep-3',
    category: "Sleep & Stress",
    title: 'Restful Sleep (5mg)',
    reviews: 549,
    price: 599,
    tags: ["Deep Sleep", "Sleep Cycle"],
    imageId: 'product-sleep-melts-5',
    isHighlyReordered: false
  },
  // Immunity
  {
    id: 'imm-1',
    category: "Immunity",
    title: 'Daily Immunity Defense',
    reviews: 420,
    price: 899,
    tags: ["Shield", "Vitamin C"],
    imageId: 'goal-supplements',
    isHighlyReordered: true
  },
  // Gut
  {
    id: 'gut-1',
    category: "Gut",
    title: '4B CFU Probiotic Mix',
    reviews: 1205,
    price: 1499,
    tags: ["Digestion", "Gut Health"],
    imageId: 'goal-superfoods',
    isHighlyReordered: true
  },
  // Best Sellers
  {
    id: 'best-1',
    category: "Best Sellers",
    title: 'Premium Collagen Peptides',
    reviews: 2500,
    price: 1899,
    tags: ["Skin", "Anti-Aging"],
    imageId: 'influencer-3',
    isHighlyReordered: true
  }
];

export function ShopByHealthNeeds() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();

  const handleAddToWishlist = (product) => {
    const existing = JSON.parse(localStorage.getItem('wellbeing_wishlist') || '[]');
    if (existing.some(item => item.id === product.id)) {
      toast({
        title: "Already in Wishlist",
        description: "This item is already saved in your wishlist.",
      });
      return;
    }

    const media = getPlaceholderImage(product.imageId);
    const newWishlistItem = {
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      image: media?.imageUrl,
      imageHint: media?.imageHint
    };

    const updated = [...existing, newWishlistItem];
    localStorage.setItem('wellbeing_wishlist', JSON.stringify(updated));
    
    toast({
      title: "Added to Wishlist",
      description: "The product has been saved to your list.",
    });
  };

  const displayProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Shop by Health Needs
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-lg border-2 font-bold text-sm transition-all whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-black text-white border-black shadow-lg scale-105" 
                  : "bg-white text-foreground border-black/5 hover:border-black/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {displayProducts.map((product) => {
            const media = getPlaceholderImage(product.imageId);
            return (
              <div key={product.id} className="flex flex-col group h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Image Container */}
                <div className="relative aspect-square bg-[#f9f9f9] rounded-2xl overflow-hidden mb-6">
                  <Link href={`/products/${product.id}`} className="block h-full w-full">
                    <LazyImage 
                      src={media?.imageUrl} 
                      alt={product.title} 
                      fill 
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      dataAiHint={media?.imageHint}
                    />
                  </Link>
                  
                  {product.isHighlyReordered && (
                    <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-bl-xl">
                      Highly reordered
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button 
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:text-red-500 transition-colors z-10"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col space-y-4 px-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Pack:</span>
                      <div className="flex gap-1.5">
                        <button className="h-6 w-6 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black bg-black text-white">1</button>
                        <button className="h-6 w-6 rounded-full border-2 border-black/10 flex items-center justify-center text-[10px] font-black hover:border-black/30">2</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black text-white w-fit px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                      <Star className="h-3 w-3 fill-white" />
                      {product.reviews} reviews
                    </div>

                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-black text-foreground leading-tight tracking-tight hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.tags.map(tag => (
                        <span key={tag} className="bg-[#eef4f2] text-[#4a6b5d] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black">₹{product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-muted-foreground line-through font-bold">₹{product.originalPrice}</span>
                          <span className="text-sm font-black text-[#4caf50] uppercase">{product.discount}</span>
                        </>
                      )}
                    </div>

                    <Button className="w-full h-12 bg-black hover:bg-black/90 text-white rounded-none font-black uppercase tracking-[0.2em] transition-all">
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          {displayProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-50">
              <p className="text-lg font-bold">No products found in this category.</p>
              <Button variant="link" onClick={() => setActiveCategory("All")}>Show all products</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
