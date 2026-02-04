'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChevronLeft, Star, Heart, ShoppingBag, CheckCircle2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { LazyImage } from '@/components/shared/lazy-image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products as sharedProducts } from '@/lib/data';

export default function ProductDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  // Find product from shared data
  const product = sharedProducts.find(p => p.id === id) || sharedProducts[0];
  const media = getPlaceholderImage(product.imageId);
  
  // Carousel State
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate initial load for UX and scroll to top
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleThumbnailClick = (index) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const handleAddToCart = () => {
    const media = getPlaceholderImage(product.imageId);
    // Dispatch multiple times for quantity logic
    for(let i = 0; i < quantity; i++) {
      dispatch(cartActions.addItem({
        ...product,
        image: media?.imageUrl
      }));
    }
    toast({
      title: "Added to Cart!",
      description: `${product.title} (${quantity}) added to your ritual.`,
    });
  };

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-body">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6">
              <Skeleton className="aspect-square w-full rounded-3xl" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-3/4" />
                <div className="flex items-center gap-4 pt-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-10 w-32" />
              <Separator className="my-2" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-14 flex-1" />
                  <Skeleton className="h-14 w-14" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="mb-8">
          <Link href="/products" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Rituals
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery Slider */}
          <div className="space-y-6">
            <div className="relative group">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {[1, 2, 3, 4].map((i) => (
                    <CarouselItem key={i}>
                      <div className="relative aspect-square bg-[#f9f9f9] rounded-3xl overflow-hidden shadow-sm">
                        <LazyImage 
                          src={media?.imageUrl} 
                          alt={`${product.title} view ${i}`} 
                          fill 
                          className="object-contain p-12"
                          dataAiHint={media?.imageHint}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <CarouselPrevious className="static pointer-events-auto h-10 w-10 bg-white shadow-md border-none rounded-full" />
                  <CarouselNext className="static pointer-events-auto h-10 w-10 bg-white shadow-md border-none rounded-full" />
                </div>
              </Carousel>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div 
                  key={index} 
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-muted/30",
                    current === index ? "border-black" : "border-transparent"
                  )}
                >
                  <LazyImage 
                    src={media?.imageUrl} 
                    alt="thumbnail" 
                    fill 
                    className={cn("object-cover transition-opacity", current === index ? "opacity-100" : "opacity-60")} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Buy Section */}
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <CheckCircle2 className="h-3 w-3" /> {product.category}
              </div>
              <h1 className="text-3xl lg:text-5xl font-black tracking-tighter text-foreground leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded text-xs font-black">
                  <Star className="h-3 w-3 fill-white" /> 4.5
                </div>
                <span className="text-sm font-bold text-muted-foreground underline cursor-pointer">
                  {product.reviews} Reviews
                </span>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-[#eef4f2] text-[#4a6b5d] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#dcece6] flex items-center gap-1">
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 italic">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="flex items-baseline gap-3 pt-4">
              <span className="text-3xl font-black">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through font-bold">₹{product.originalPrice}</span>
                  {product.discount && (
                    <span className="text-sm font-black text-primary uppercase bg-primary/10 px-2 py-1 rounded">{product.discount} OFF</span>
                  )}
                </>
              )}
            </div>

            <Separator className="my-2" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest">Quantity</span>
                <div className="flex items-center border-2 border-black rounded-full overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-muted transition-colors font-bold">-</button>
                  <span className="px-4 py-2 font-black text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted transition-colors font-bold">+</button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 h-14 bg-black hover:bg-black/90 text-white rounded-none font-black uppercase tracking-[0.2em] text-sm shadow-xl"
                >
                  Add To Cart
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-none border-2 border-black">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="bg-[#f8f9fa] rounded-2xl p-6 mt-4 space-y-4">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                <ShoppingBag className="h-4 w-4 text-primary" /> Free Shipping on all orders
              </div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                <CheckCircle2 className="h-4 w-4 text-primary" /> 100% Satisfaction Guaranteed
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-8">
                <TabsTrigger 
                  value="details" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 text-base lg:text-lg font-bold"
                >
                  Product Details
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 text-base lg:text-lg font-bold">Features</TabsTrigger>
                <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 text-base lg:text-lg font-bold">Care Guides</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-2xl">{product.description}</p>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black uppercase tracking-widest w-32">Pattern:</span>
                    <span className="text-sm font-medium text-muted-foreground">{product.pattern || "N/A"}</span>
                  </div>
                  <Separator className="bg-muted/50" />
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black uppercase tracking-widest w-32">Material:</span>
                    <span className="text-sm font-medium text-muted-foreground">{product.material || "N/A"}</span>
                  </div>
                  <Separator className="bg-muted/50" />
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black uppercase tracking-widest w-32">Size & Fit:</span>
                    <span className="text-sm font-medium text-muted-foreground">{product.sizeFit || "N/A"}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}