
'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, Heart, Share2, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { LazyImage } from '@/components/shared/lazy-image';
import { useToast } from '@/hooks/use-toast';

// Mock product database
const allProducts = [
  {
    id: 'sleep-1',
    category: "Sleep & Stress",
    title: 'Restful Sleep Melts (10mg)',
    reviews: 919,
    price: 599,
    tags: ["Deep Sleep", "Sleep Cycle"],
    imageId: 'product-sleep-melts-10',
    description: "Everyone should have something like this in their ritual. These melts will make you appreciate everyone who looks at you. Many people like its modern and clean style. It's a one-of-a-kind piece created in our newly remodeled facility.",
    pattern: "Fine Powder",
    material: "Natural Extracts",
    sizeFit: "30 Melts Pack"
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
    description: "Elevate your magnesium levels with our triple complex. Designed for muscle recovery and cognitive support, this formula ensures you wake up refreshed and ready for the day.",
    pattern: "Capsules",
    material: "Magnesium Citrate, Malate, Glycinate",
    sizeFit: "60 Capsules"
  },
  {
    id: 'best-1',
    category: "Best Sellers",
    title: 'Premium Collagen Peptides',
    reviews: 2500,
    price: 1899,
    tags: ["Skin", "Anti-Aging"],
    imageId: 'influencer-3',
    description: "Our #1 best seller. Sourced from deep-sea marine life, these peptides are bioavailable and designed to restore your skin's natural glow within 60 days.",
    pattern: "Marine Peptides",
    material: "Pure Fish Collagen",
    sizeFit: "250g Jar"
  }
];

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);
  const { toast } = useToast();
  const product = allProducts.find(p => p.id === id) || allProducts[0];
  const media = getPlaceholderImage(product.imageId);

  const ratingStats = [
    { stars: 5, count: 28, value: 85 },
    { stars: 4, count: 5, value: 15 },
    { stars: 3, count: 2, value: 8 },
    { stars: 2, count: 5, value: 15 },
    { stars: 1, count: 1, value: 3 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur px-4">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <div className="flex items-center gap-4">
            <Share2 className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            <Heart className="h-5 w-5 cursor-pointer hover:text-red-500 transition-colors" />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-[#f9f9f9] rounded-3xl overflow-hidden shadow-sm">
              <LazyImage 
                src={media?.imageUrl} 
                alt={product.title} 
                fill 
                className="object-contain p-12"
                dataAiHint={media?.imageHint}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-black cursor-pointer bg-muted/30">
                  <LazyImage src={media?.imageUrl} alt="thumbnail" fill className="object-cover opacity-60" />
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
            </div>

            <div className="flex items-baseline gap-3 pt-4">
              <span className="text-3xl font-black">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through font-bold">₹{product.originalPrice}</span>
                  <span className="text-sm font-black text-primary uppercase bg-primary/10 px-2 py-1 rounded">{product.discount} OFF</span>
                </>
              )}
            </div>

            <Separator className="my-2" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest">Quantity</span>
                <div className="flex items-center border-2 border-black rounded-full overflow-hidden">
                  <button className="px-4 py-2 hover:bg-muted transition-colors font-bold">-</button>
                  <span className="px-4 py-2 font-black text-sm">1</span>
                  <button className="px-4 py-2 hover:bg-muted transition-colors font-bold">+</button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button className="flex-1 h-14 bg-black hover:bg-black/90 text-white rounded-none font-black uppercase tracking-[0.2em] text-sm shadow-xl">
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

        {/* High Fidelity Detail Section (Matches Reference Image) */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Detail Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-8">
                <TabsTrigger 
                  value="details" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 text-base lg:text-lg font-bold"
                >
                  Product Details
                </TabsTrigger>
                <TabsTrigger 
                  value="features" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 text-base lg:text-lg font-bold opacity-40 data-[state=active]:opacity-100"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger 
                  value="care" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 text-base lg:text-lg font-bold opacity-40 data-[state=active]:opacity-100"
                >
                  Care Guides
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-8 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-2xl">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black uppercase tracking-widest w-32">Pattern:</span>
                    <span className="text-sm font-medium text-muted-foreground">{product.pattern}</span>
                  </div>
                  <Separator className="bg-muted/50" />
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black uppercase tracking-widest w-32">Material:</span>
                    <span className="text-sm font-medium text-muted-foreground">{product.material}</span>
                  </div>
                  <Separator className="bg-muted/50" />
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black uppercase tracking-widest w-32">Size & Fit:</span>
                    <span className="text-sm font-medium text-muted-foreground">{product.sizeFit}</span>
                  </div>
                </div>

                <div className="pt-10 space-y-4">
                  <h3 className="text-xl font-black tracking-tight">Why the AYUBHYAVA brand?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                    AYUBHYAVA sells high-performance nutrition designed for modern lifestyles. Our formulas are clean-label, bioavailable, and meticulously sourced to ensure your vitality is never compromised.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="pt-8">
                <p className="text-muted-foreground italic">Product features coming soon...</p>
              </TabsContent>
              <TabsContent value="care" className="pt-8">
                <p className="text-muted-foreground italic">Care and dosage guides coming soon...</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Ratings Sidebar */}
          <div className="space-y-8">
            <Card className="rounded-3xl border-none shadow-sm bg-[#fcfcfc] p-8">
              <CardContent className="p-0 space-y-8">
                <h2 className="text-xl font-black tracking-tight">Ratings & Reviews</h2>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-6xl font-black leading-none">4,5</div>
                    <div className="text-sm font-bold text-muted-foreground mt-1">/5</div>
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    {ratingStats.map((stat) => (
                      <div key={stat.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-6">
                          <span className="text-xs font-bold">{stat.stars}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress value={stat.value} className="h-1.5 flex-1 bg-muted rounded-full" />
                        <span className="text-[10px] font-bold text-muted-foreground w-6 text-right">
                          {stat.count.toString().padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm font-bold text-muted-foreground">({product.reviews}+ Reviews)</p>
              </CardContent>
            </Card>

            {/* Individual Review */}
            <div className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg">Love these Cloths! Really amazing</h4>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">7 days ago</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I really wanted to love this but it doesn't look quite right on me. The seam that should sit under the bust sits across it. I should have gone up a size but I'm small everywhere else. Anyway, my fault not the product. I'm still wearing it it's just not as cute on me as the model.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider">James Cameron</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-primary">
                      <CheckCircle2 className="h-2.5 w-2.5" /> Verified Ritual
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="bg-muted/50" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-black text-foreground text-xl mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground font-bold text-xs">W</div>
            <span className="uppercase tracking-tighter">Wellbeing Nutrition</span>
          </div>
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-[0.3em]">© 2024 AYUBHYAVA Wellbeing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
