'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import { wishlistActions } from '@/store/wishlist-slice';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Heart, 
  Star,
  ChevronRight,
  Tag,
  CheckCircle2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { LazyImage } from '@/components/shared/lazy-image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { products as sharedProducts } from '@/lib/data';

const categories = [
  "All", "Marine Collagen", "Effervescent Tablets", "Melts Oral Strips", "Vegan Protein Isolate", "Wholefood Multivitamins"
];

export default function PublicProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = sharedProducts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.subCategory === activeCategory || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    toast({ title: "Added to Cart!", description: `${product.title} added.` });
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />

      <main className="flex-1">
        <section className="bg-muted/30 py-12 lg:py-20 border-b">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                <Tag className="h-3 w-3" /> The Ritual Shop
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                Wellness <br />Essentials.
              </h1>
              <p className="text-muted-foreground text-lg font-medium font-serif italic uppercase tracking-tight">
                High-performance nutrition for your daily vitality rituals.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-12 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-16">
            <aside className="lg:w-64 shrink-0 space-y-12">
              <div className="sticky top-32 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="FIND RITUAL..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 rounded-none border-2 border-black/5 bg-[#f9f9f9] font-black text-[10px] uppercase tracking-widest"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Browse Rituals</h3>
                  <div className="flex flex-col items-start gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "text-left font-black text-[11px] uppercase tracking-[0.15em] transition-all hover:translate-x-1",
                          activeCategory === cat ? "text-primary" : "text-foreground/60 hover:text-foreground"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 space-y-12">
              <div className="flex items-center justify-between border-b pb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Showing {filteredProducts.length} Items
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] outline-none">
                      Sort: {sortBy} <ChevronRight className="h-3 w-3 rotate-90" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-none border-2 border-black shadow-2xl p-2">
                    {["Featured", "Price: Low to High", "Price: High to Low"].map((s) => (
                      <DropdownMenuItem key={s} onClick={() => setSortBy(s)} className="font-black text-[9px] uppercase tracking-widest cursor-pointer">
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => {
                  const media = getPlaceholderImage(product.imageId);
                  const isInCart = cartItems.some(item => item.id === product.id);
                  const isInWishlist = wishlistItems.some(item => item.id === product.id);

                  return (
                    <div key={product.id} className="group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="relative aspect-square bg-[#f9f9f9] overflow-hidden mb-8 border border-black/5 transition-all shadow-sm hover:shadow-2xl rounded-2xl">
                        <Link href={`/products/${product.id}`} className="block h-full w-full">
                          <LazyImage src={media?.imageUrl} alt={product.title} fill className="object-contain p-12 transition-transform duration-700 group-hover:scale-110" />
                        </Link>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleWishlist(product); }} 
                          className={cn(
                            "absolute bottom-6 right-6 h-12 w-12 bg-white/80 backdrop-blur shadow-xl flex items-center justify-center transition-all rounded-full z-10",
                            isInWishlist ? "text-red-500" : "text-foreground hover:text-red-500"
                          )}
                        >
                          <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")} />
                        </button>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <Link href={`/products/${product.id}`} className="block space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.category}</span>
                            <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded text-[9px] font-black">
                              <Star className="h-2.5 w-2.5 fill-white" /> {product.reviews}
                            </div>
                          </div>
                          <h3 className="text-xl font-black hover:text-primary transition-colors line-clamp-2">{product.title}</h3>
                        </Link>
                        <div className="mt-auto pt-6 flex items-center justify-between">
                          <span className="text-2xl font-black">₹{product.price.toLocaleString()}</span>
                          <Button 
                            onClick={() => handleAddToCart(product)} 
                            className={cn(
                              "rounded-none font-black uppercase text-[10px] px-6 transition-all",
                              isInCart 
                                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                                : "bg-black text-white hover:bg-black/90"
                            )}
                          >
                            {isInCart ? (
                              <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3" /> Already in Cart
                              </span>
                            ) : (
                              "Add To Cart"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}