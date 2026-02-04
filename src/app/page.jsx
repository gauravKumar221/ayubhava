'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Zap,
  ChevronRight,
  ChevronLeft,
  Award,
  Coffee,
  Sun,
  Pill,
  Hexagon,
  Waves,
  Square
} from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { LazyImage } from '@/components/shared/lazy-image';
import { InfluencerTalk } from '@/components/home/influencer-talk';
import { ShopByHealthNeeds } from '@/components/home/shop-by-health-needs';
import { Header } from '@/components/layout/header';

const wellnessGoals = [
  {
    id: 'superfoods',
    title: 'Superfoods',
    subtitle: '120+ Essentials',
    icon: <Leaf className="h-4 w-4" />,
    imageId: 'goal-superfoods'
  },
  {
    id: 'supplements',
    title: 'Supplements',
    subtitle: '85+ Formulas',
    icon: <Zap className="h-4 w-4" />,
    imageId: 'goal-supplements'
  },
  {
    id: 'elixirs',
    title: 'Elixirs & Tea',
    subtitle: '40+ Blends',
    icon: <Coffee className="h-4 w-4" />,
    imageId: 'goal-elixirs'
  },
  {
    id: 'rituals',
    title: 'Rituals',
    subtitle: 'Mindful Kits',
    icon: <Sun className="h-4 w-4" />,
    imageId: 'goal-rituals'
  }
];

const trendingSearches = [
  { label: 'Magnesium', icon: <Pill className="h-5 w-5 rotate-[135deg]" /> },
  { label: 'Collagen', icon: <Hexagon className="h-5 w-5" /> },
  { label: 'Protein', icon: <Waves className="h-5 w-5" /> },
  { label: 'Omega', icon: <Pill className="h-5 w-5 rotate-45" /> },
  { label: 'Sleep', icon: <Square className="h-5 w-5" /> }
];

export default function HomePage() {
  const heroBg = getPlaceholderImage('wellness-hero-bg');
  const productSet = getPlaceholderImage('protein-pouch-set');

  return (
    <div className="flex flex-col min-h-screen font-body relative">
      {/* Floating Discount Tab */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] hidden lg:block">
        <div className="bg-primary text-primary-foreground py-3 px-1.5 rounded-r-md cursor-pointer hover:bg-primary/90 transition-all shadow-md [writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 rotate-180">
          Get 10% OFF
        </div>
      </div>

      <Header />

      <main className="flex-1">
        {/* Rebranded Hero Section */}
        <section className="relative w-full h-[600px] lg:h-[750px] overflow-hidden bg-[#f8f5f2]">
          <div className="absolute inset-0 z-0">
            <LazyImage 
              src={heroBg.imageUrl} 
              alt="Background" 
              fill 
              className="object-cover opacity-40 mix-blend-multiply"
              priority={true}
              dataAiHint={heroBg.imageHint}
            />
          </div>
          
          <div className="container mx-auto h-full px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between pt-12 lg:pt-0">
            <div className="flex flex-col gap-4 text-center lg:text-left max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
              <h1 className="text-6xl md:text-8xl font-black text-[#2d2d2d] leading-[0.9] tracking-tighter">
                NO BLOAT.<br />NO FARTS.
              </h1>
              <div className="space-y-2 mt-4">
                <p className="text-2xl md:text-4xl font-black text-primary/80 tracking-tighter uppercase">
                  THE LIGHTER,<br />QUIETER WHEY.
                </p>
                <p className="text-lg md:text-xl font-bold text-[#2d2d2d]/60 uppercase tracking-tight max-w-md mx-auto lg:mx-0">
                  WITH 4B CFU PROBIOTICS<br />& DIGESTIVE ENZYMES
                </p>
              </div>
              <div className="pt-8">
                <Button size="lg" className="h-14 px-12 text-sm font-black rounded-full bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-widest shadow-xl">
                  Shop Now
                </Button>
              </div>
            </div>

            <div className="relative flex-1 w-full lg:w-auto h-[400px] lg:h-full flex items-center justify-center lg:justify-end animate-in fade-in zoom-in-95 duration-1000 delay-300">
              {/* Product Pouch Cluster */}
              <div className="relative aspect-square w-full max-w-[600px]">
                <LazyImage 
                  src={productSet.imageUrl} 
                  alt="Whey Protein Pouches" 
                  fill 
                  className="object-contain drop-shadow-2xl"
                  priority={true}
                  dataAiHint={productSet.imageHint}
                />
                
                {/* Certification Badges */}
                <div className="absolute top-1/2 -left-12 lg:-left-20 -translate-y-1/2 flex flex-col gap-4 items-center">
                  <div className="bg-white/90 backdrop-blur rounded-full p-4 border border-foreground/5 shadow-lg flex flex-col items-center justify-center text-center max-w-[100px]">
                    <span className="text-[8px] font-black uppercase text-foreground/40 leading-none">clean label</span>
                    <span className="text-[10px] font-black uppercase leading-tight">Project®</span>
                    <div className="h-px w-full bg-foreground/10 my-1" />
                    <span className="text-[8px] font-black uppercase text-foreground/40 leading-none">Purity</span>
                    <span className="text-[10px] font-black uppercase leading-tight">Award</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Navigation */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white/80 border-none shadow-md hover:bg-white transition-all">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-white/80 border-none shadow-md hover:bg-white transition-all">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* Benefits Quick View */}
        <section className="py-16 bg-white border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="container mx-auto px-4 flex justify-between items-center gap-12">
            {[
              { label: 'Plant Based', icon: <Leaf className="h-5 w-5" /> },
              { label: 'No Added Sugar', icon: <Zap className="h-5 w-5" /> },
              { label: 'Gut Friendly', icon: <Award className="h-5 w-5" /> },
              { label: 'Non-GMO', icon: <Award className="h-5 w-5" /> },
              { label: 'Bioavailable', icon: <Zap className="h-5 w-5" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default min-w-fit">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className="text-sm font-black uppercase tracking-widest text-foreground/60">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Shop by Wellness Goal Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                Shop by Wellness Goal
              </h2>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed px-4">
                Elevate your daily ritual with high-performance nutrition tailored to your specific path of vitality.
              </p>

              {/* Trending Searches */}
              <div className="pt-10 flex flex-col items-center gap-6">
                <h3 className="text-xl font-bold text-foreground tracking-tight">Trending searches</h3>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {trendingSearches.map((item, idx) => (
                    <Link 
                      key={idx}
                      href="#" 
                      className="flex items-center gap-3 px-8 py-3.5 rounded-full border border-black/10 hover:border-black hover:shadow-md transition-all text-sm font-bold bg-white group"
                    >
                      <span className="text-foreground/60 group-hover:text-primary transition-colors">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-16">
              {wellnessGoals.map((goal) => {
                const goalImg = getPlaceholderImage(goal.imageId);
                return (
                  <Link 
                    key={goal.id} 
                    href={`/admin-dashboard/product-collection?goal=${goal.id}`}
                    className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 z-0">
                      <LazyImage 
                        src={goalImg?.imageUrl} 
                        alt={goal.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        dataAiHint={goalImg?.imageHint}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 lg:p-8">
                      <div className="flex items-end justify-between w-full">
                        <div className="space-y-1 text-white">
                          <h3 className="text-xl lg:text-2xl font-black leading-tight">
                            {goal.title}
                          </h3>
                          <p className="text-xs lg:text-sm font-bold opacity-80 uppercase tracking-widest">
                            {goal.subtitle}
                          </p>
                        </div>
                        <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:bg-white group-hover:text-primary">
                          {goal.icon}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shop by Health Needs Section */}
        <ShopByHealthNeeds />

        {/* Let Influencers Talk Section */}
        <InfluencerTalk />
      </main>

      {/* Simple Footer */}
      <footer className="bg-white py-12 border-t">
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
