'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  ShoppingBag, 
  HeartPulse, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Zap,
  Coffee,
  Sun,
  LayoutDashboard
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Public Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl">
              <Leaf className="h-6 w-6" />
              <span>AYUBHYAVA</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/blog" className="hover:text-primary transition-colors">Wellness Blog</Link>
            <Link href="/coupons" className="hover:text-primary transition-colors">Ritual Offers</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">Guidance</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/admin-dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Partner Portal
              </Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
              Explore Shop
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary/30 py-24 lg:py-32">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Pure. Potent. Plant-Based.</span>
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-foreground leading-[1.1]">
                Nurture Your <span className="text-primary italic">Inner Glow</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Ancient wisdom meeting modern nutrition. Discover our curated collection of superfoods and supplements designed for cellular vitality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-14 px-10 text-md font-bold rounded-full shadow-lg shadow-primary/20">
                  Shop Wellbeing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-md rounded-full shadow-sm" asChild>
                  <Link href="/contact-us">Free Consultation</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-1000 border-8 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop" 
                alt="Wellbeing Scene" 
                fill 
                className="object-cover"
                priority
                data-ai-hint="wellness lifestyle"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-3 rounded-xl">
                      <HeartPulse className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">New Arrival</p>
                      <p className="text-xs text-muted-foreground">Organic Matcha Ceremonial Grade</p>
                    </div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground font-bold rounded-full">NATURAL</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Holistic Categories */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Shop by Wellness Goal</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                Elevate your daily ritual with high-performance nutrition tailored to your specific path of vitality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Superfoods', icon: <Leaf />, count: '120+ Essentials', color: 'bg-green-50 text-green-600', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format' },
                { name: 'Supplements', icon: <Zap />, count: '85+ Formulas', color: 'bg-amber-50 text-amber-600', img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=400&auto=format' },
                { name: 'Elixirs & Tea', icon: <Coffee />, count: '40+ Blends', color: 'bg-rose-50 text-rose-600', img: 'https://images.unsplash.com/photo-1544787210-2213d84ad960?q=80&w=400&auto=format' },
                { name: 'Rituals', icon: <Sun />, count: 'Mindful Kits', color: 'bg-sky-50 text-sky-600', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format' }
              ].map((cat, i) => (
                <Card key={i} className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all cursor-pointer rounded-3xl">
                  <div className="relative aspect-[4/5]">
                    <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{cat.name}</h3>
                          <p className="text-xs text-white/80">{cat.count}</p>
                        </div>
                        <div className={`p-2 rounded-xl backdrop-blur-md bg-white/20`}>
                          {cat.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 bg-secondary/20 border-y border-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-6">
                <div className="mx-auto bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center text-primary">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold">Traceable Source</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We verify every ingredient from soil to shelf, ensuring zero compromises on purity and potency.
                </p>
              </div>
              <div className="space-y-6">
                <div className="mx-auto bg-accent/10 w-20 h-20 rounded-[2rem] flex items-center justify-center text-accent">
                  <HeartPulse className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold">Bio-Available</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced formulations designed for maximum absorption, working in harmony with your body's natural rhythms.
                </p>
              </div>
              <div className="space-y-6">
                <div className="mx-auto bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center text-primary">
                  <ShoppingBag className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold">Sustainable Rituals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Compostable packaging and ethically traded ingredients that respect our Earth as much as your health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="rounded-[3rem] bg-primary p-10 md:p-20 text-primary-foreground relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-3xl">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
              
              <div className="relative z-10 space-y-6 text-center md:text-left max-w-xl">
                <Badge variant="secondary" className="bg-white/20 text-white font-bold uppercase tracking-[0.2em] rounded-full px-4">Limited Ritual</Badge>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Unlock Your Vitality Blueprint.</h2>
                <p className="text-primary-foreground/90 text-xl font-medium">Get 15% off your first subscription order with code <span className="text-white underline underline-offset-8">VITALITY15</span></p>
              </div>
              
              <div className="relative z-10 flex flex-col gap-6 w-full md:w-auto">
                <Button size="lg" variant="secondary" className="h-16 px-12 font-bold text-primary text-lg rounded-full hover:scale-105 transition-transform shadow-xl shadow-black/10" asChild>
                  <Link href="/coupons">Claim My Ritual</Link>
                </Button>
                <p className="text-center text-sm text-primary-foreground/70 font-medium italic">Join 15,000+ others on their wellness journey.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/30 py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-bold text-primary text-2xl">
                <Leaf className="h-8 w-8" />
                <span>AYUBHYAVA</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Designing the future of human vitality through clean nutrition and holistic lifestyle rituals.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Shop Holistic</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                <li><Link href="#" className="hover:text-primary transition-colors">Daily Supplements</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Adaptogen Teas</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Superfood Powders</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Wellness Bundles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Knowledge</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                <li><Link href="/blog" className="hover:text-primary transition-colors">Vitality Blog</Link></li>
                <li><Link href="/newsletter" className="hover:text-primary transition-colors">Join Newsletter</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Scientific Standards</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help & FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Connection</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                <li>hello@ayubhyava.com</li>
                <li>+1 (800) VITALITY</li>
                <li>Studio Wellness, Karma Way 77</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary pt-10 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-medium">&copy; {new Date().getFullYear()} AYUBHYAVA Wellbeing. All rights reserved.</p>
            <div className="flex items-center gap-8 font-medium">
              <Link href="/admin-dashboard" className="text-primary hover:underline">Partner Portal</Link>
              <Link href="#" className="hover:text-primary transition-colors">Ethical Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}