
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  ShoppingCart, 
  Stethoscope, 
  ShieldCheck, 
  Truck, 
  Globe, 
  ArrowRight,
  ChevronRight,
  Package,
  Star,
  Clock,
  Phone,
  LayoutDashboard
} from 'lucide-react';
import { promos } from '@/components/layout/sidebar';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Public Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl">
              <Building className="h-6 w-6" />
              <span>Bit Max</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/blog" className="hover:text-primary transition-colors">Insights</Link>
            <Link href="/coupons" className="hover:text-primary transition-colors">Offers</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">Support</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/admin-dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Admin Portal
              </Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Order Supplies
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-32">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>Certified Clinical Equipment</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Advanced Medical Supplies for <span className="text-primary">Modern Clinics</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Streamline your healthcare facility with premium instruments, state-of-the-art diagnostics, and reliable consumables. Trusted by 2,000+ clinicians worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-md font-bold">
                  View Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-md" asChild>
                  <Link href="/admin-dashboard">Dashboard Login</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">Top Rated Store</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Express Global Shipping</span>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-1000">
              <Image 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop" 
                alt="Medical Equipment" 
                fill 
                className="object-cover"
                priority
                data-ai-hint="medical laboratory"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">New Inventory</p>
                      <p className="text-xs text-muted-foreground">Precision Surgical Tools</p>
                    </div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground font-bold">SALE -20%</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse by Clinical Group</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Explore our specialized categories designed to meet the rigorous demands of modern healthcare environments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Instruments', icon: <Stethoscope />, count: '450+ Items', color: 'bg-blue-50 text-blue-600', img: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=400&auto=format' },
                { name: 'Consumables', icon: <Package />, count: '1,200+ Items', color: 'bg-green-50 text-green-600', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format' },
                { name: 'Diagnostics', icon: <Clock />, count: '80+ Items', color: 'bg-orange-50 text-orange-600', img: 'https://images.unsplash.com/photo-1579154235602-3c20546e420d?q=80&w=400&auto=format' },
                { name: 'Emergency', icon: <Phone />, count: '150+ Items', color: 'bg-red-50 text-red-600', img: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=400&auto=format' }
              ].map((cat, i) => (
                <Card key={i} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all cursor-pointer">
                  <div className="relative aspect-video">
                    <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${cat.color}`}>
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{cat.name}</h3>
                        <p className="text-xs text-muted-foreground">{cat.count}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Bit Max */}
        <section className="py-20 bg-muted/50 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All products undergo rigorous clinical testing and meet international ISO healthcare standards.
                </p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center text-accent">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Global Presence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fast, secure shipping to medical facilities across 50+ countries with real-time tracking support.
                </p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Efficient Procurement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specialized bulk ordering system for hospitals and clinics with integrated billing management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion Banner */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl bg-primary p-8 md:p-16 text-primary-foreground relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-4 text-center md:text-left max-w-lg">
                <Badge variant="secondary" className="bg-white/20 text-white font-bold uppercase tracking-wider">Flash Sale Active</Badge>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Save 20% on your first equipment order.</h2>
                <p className="text-primary-foreground/80 text-lg">Use code <span className="font-mono font-bold text-white underline decoration-2 underline-offset-4">HEALTH20</span> at checkout.</p>
              </div>
              
              <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
                <Button size="lg" variant="secondary" className="h-14 px-8 font-bold text-primary" asChild>
                  <Link href="/coupons">Claim Offer Now</Link>
                </Button>
                <p className="text-center text-xs text-primary-foreground/60">* Valid for new clinical accounts only.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-primary text-xl">
                <Building className="h-6 w-6" />
                <span>Bit Max</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your global partner in professional medical equipment and clinical procurement solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Surgical Tools</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Diagnostics</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Mobility Aids</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Bulk Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog" className="hover:text-primary transition-colors">Clinical Insights</Link></li>
                <li><Link href="/newsletter" className="hover:text-primary transition-colors">Newsletter</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="h-3 w-3" /> +1 (555) 000-1234</li>
                <li>support@bitmax.com</li>
                <li>123 Medical District, Suite 400</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} Bit Max Medical Supplies. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/admin-dashboard" className="text-primary hover:underline font-medium">Admin Portal</Link>
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
