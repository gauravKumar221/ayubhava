'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  Star,
  ChevronRight,
  Filter,
  CheckCircle2,
  Tag,
  LayoutGrid,
  List
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

const categories = [
  "All", "Marine Collagen", "Effervescent Tablets", "Melts Oral Strips", "Vegan Protein Isolate", "Wholefood Multivitamins"
];

const allProducts = [
  {
    id: 'sleep-1',
    category: "Melts Oral Strips",
    title: 'Deep Sleep Ritual - Restful Melts',
    reviews: 919,
    price: 599,
    originalPrice: 699,
    tags: ["Deep Sleep", "Sleep Cycle"],
    imageId: 'product-sleep-melts-10',
    isHighlyReordered: true
  },
  {
    id: 'sleep-2',
    category: "Wholefood Multivitamins",
    title: 'Vitality Ritual - Triple Magnesium',
    reviews: 781,
    price: 1329,
    originalPrice: 1399,
    discount: 'Save 5%',
    tags: ["Sleep", "Cognition & Muscle"],
    imageId: 'product-magnesium-complex',
    isHighlyReordered: true
  },
  {
    id: 'best-1',
    category: "Marine Collagen",
    title: 'Glow Ritual - Marine Collagen',
    reviews: 2500,
    price: 1899,
    originalPrice: 1999,
    tags: ["Skin", "Anti-Aging"],
    imageId: 'influencer-3',
    isHighlyReordered: true
  },
  {
    id: 'protein-1',
    category: "Vegan Protein Isolate",
    title: 'Performance Ritual - Vegan Isolate',
    reviews: 1420,
    price: 3824,
    originalPrice: 4200,
    tags: ["Recovery", "Muscle"],
    imageId: 'influencer-2',
    isHighlyReordered: false
  },
  {
    id: 'glow-1',
    category: "Marine Collagen",
    title: 'Skin Ritual - Marine Glow',
    reviews: 850,
    price: 1899,
    originalPrice: 1999,
    tags: ["Hydration", "Elasticity"],
    imageId: 'influencer-4',
    isHighlyReordered: true
  },
  {
    id: 'kids-1',
    category: "Wholefood Multivitamins",
    title: 'Growth Ritual - Kids Superfuel',
    reviews: 340,
    price: 854,
    originalPrice: 950,
    tags: ["Focus", "Growth"],
    imageId: 'influencer-6',
    isHighlyReordered: false
  }
];

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToWishlist = (product) => {
    toast({
      title: "Added to Wishlist",
      description: `${product.title} has been saved to your rituals.`,
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
      description: `${product.title} is ready for checkout.`,
    });
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />

      <main className="flex-1">
        {/* Collection Hero */}
        <section className="bg-muted/30 py-12 lg:py-20 border-b">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                <Tag className="h-3 w-3" /> The Ritual Collection
              </div>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                Elevate Your <br />Daily Ritual.
              </h1>
              <p className="text-muted-foreground text-lg font-medium font-serif italic uppercase tracking-tight">
                Curated high-performance nutrition designed for modern vitality.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-12 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Sidebar: Filters */}
            <aside className="lg:w-64 shrink-0 space-y-12">
              <div className="sticky top-32 space-y-12">
                {/* Search in Sidebar */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="PRODUCT NAME..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 rounded-none border-2 border-black/5 bg-[#f9f9f9] focus-visible:ring-primary/20 font-black text-[10px] uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
                    />
                  </div>
                </div>

                {/* Categories List */}
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Browse Rituals</h3>
                  <div className="flex flex-col items-start gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "text-left font-black text-[11px] uppercase tracking-[0.15em] transition-all hover:translate-x-1",
                          activeCategory === cat 
                            ? "text-primary" 
                            : "text-foreground/60 hover:text-foreground"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Banner Promo in Sidebar */}
                <div className="bg-black text-white p-8 space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Limited Offer</p>
                  <h4 className="text-xl font-black uppercase tracking-tighter leading-none">Get 10% OFF Your First Ritual.</h4>
                  <p className="text-[10px] font-bold text-white/40 uppercase leading-relaxed">Join the community today.</p>
                  <Button className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-none h-10 text-[9px] font-black uppercase tracking-widest mt-4">
                    Join Ritual
                  </Button>
                </div>
              </div>
            </aside>

            {/* Right Side: Product Tools & Grid */}
            <div className="flex-1 space-y-12">
              {/* Top Tools bar (Sort & Info) */}
              <div className="flex items-center justify-between border-b pb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Showing {filteredProducts.length} Rituals
                </p>
                
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-2 mr-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border-2 border-black">
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border-2 border-black/5 opacity-40">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors outline-none">
                        Sort: {sortBy} <ChevronRight className="h-3 w-3 rotate-90" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-none border-2 border-black shadow-2xl p-2">
                      {["Featured", "Price: Low to High", "Price: High to Low", "Newest"].map((s) => (
                        <DropdownMenuItem 
                          key={s} 
                          onClick={() => setSortBy(s)}
                          className="rounded-none py-3 font-black text-[9px] uppercase tracking-widest cursor-pointer focus:bg-primary focus:text-white"
                        >
                          {s}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => {
                  const media = getPlaceholderImage(product.imageId);
                  return (
                    <div key={product.id} className="group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {/* Image Area */}
                      <div className="relative aspect-square bg-[#f9f9f9] rounded-none overflow-hidden mb-8 border border-black/5 transition-all group-hover:border-black/10 shadow-sm group-hover:shadow-2xl">
                        <Link href={`/products/${product.id}`} className="block h-full w-full">
                          <LazyImage 
                            src={media?.imageUrl} 
                            alt={product.title} 
                            fill 
                            className="object-contain p-12 transition-transform duration-700 group-hover:scale-110"
                            dataAiHint={media?.imageHint}
                          />
                        </Link>
                        
                        {product.isHighlyReordered && (
                          <div className="absolute top-0 right-0 bg-black text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest shadow-lg">
                            Highly Reordered
                          </div>
                        )}

                        <button 
                          onClick={() => handleAddToWishlist(product)}
                          className="absolute bottom-6 right-6 h-12 w-12 bg-white/80 backdrop-blur shadow-xl flex items-center justify-center text-foreground hover:text-red-500 hover:bg-white transition-all transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 duration-300"
                        >
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 flex flex-col px-1">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                              {product.category}
                            </span>
                            <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded text-[9px] font-black uppercase">
                              <Star className="h-2.5 w-2.5 fill-white" />
                              {product.reviews}
                            </div>
                          </div>

                          <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl lg:text-2xl font-black text-foreground leading-tight tracking-tight hover:text-primary transition-colors">
                              {product.title}
                            </h3>
                          </Link>

                          <div className="flex flex-wrap gap-2">
                            {product.tags.map(tag => (
                              <span key={tag} className="bg-[#eef4f2] text-[#4a6b5d] px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border border-[#dcece6]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-muted/50 flex items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-black">₹{product.price.toLocaleString()}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest">In Stock</p>
                          </div>

                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="h-12 px-8 bg-black hover:bg-black/90 text-white rounded-none font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all active:scale-[0.98]"
                          >
                            Quick Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 opacity-40">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight">No Rituals Found.</h3>
                    <p className="text-sm font-medium">Try adjusting your filters or search terms.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchTerm("");
                    }}
                    variant="outline"
                    className="rounded-none border-2 border-black font-black uppercase text-xs tracking-widest px-8 h-12"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Brand Promise Banner */}
        <section className="bg-black text-white py-16">
          <div className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto" />
              <h4 className="font-black uppercase tracking-widest text-sm">Clean Label Project®</h4>
              <p className="text-white/40 text-[10px] font-bold uppercase leading-relaxed tracking-wider">Certified purity and safety standards.</p>
            </div>
            <div className="space-y-3">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto" />
              <h4 className="font-black uppercase tracking-widest text-sm">Bioavailable Formulas</h4>
              <p className="text-white/40 text-[10px] font-bold uppercase leading-relaxed tracking-wider">Maximum absorption for maximum impact.</p>
            </div>
            <div className="space-y-3">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto" />
              <h4 className="font-black uppercase tracking-widest text-sm">Expert Crafted</h4>
              <p className="text-white/40 text-[10px] font-bold uppercase leading-relaxed tracking-wider">Formulated by leading nutritionists.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
