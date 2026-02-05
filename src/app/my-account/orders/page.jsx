'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingBag, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Truck,
  Box,
  Tag
} from 'lucide-react';
import { format } from 'date-fns';
import { LazyImage } from '@/components/shared/lazy-image';

const mockOrders = [
  {
    id: 'RIT-7721',
    date: '2024-07-28T14:30:00Z',
    total: 2450,
    status: 'Processing',
    items: [
      { name: 'Deep Sleep Ritual - Restful Melts', qty: 1, image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=200&auto=format&fit=crop' },
      { name: 'Marine Collagen', qty: 2, image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=200&auto=format&fit=crop' }
    ]
  },
  {
    id: 'RIT-6542',
    date: '2024-06-15T10:15:00Z',
    total: 1899,
    status: 'Delivered',
    items: [
      { name: 'Vitality Ritual - Triple Magnesium', qty: 1, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop' }
    ]
  }
];

export default function MyOrdersPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case 'Processing': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Shipped': return <Truck className="h-4 w-4 text-blue-500" />;
      default: return <Box className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] font-body">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 lg:py-20 max-w-4xl">
        <div className="space-y-12">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                Ritual Tracker
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                Order <br /><span className="text-primary">History.</span>
              </h1>
            </div>
            <Button asChild variant="outline" className="rounded-none border-2 border-black font-black uppercase text-xs tracking-widest h-12 px-8 hover:bg-black hover:text-white transition-all">
              <Link href="/products">Shop New Rituals</Link>
            </Button>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id} className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-0">
                  {/* Order Top Bar */}
                  <div className="bg-black text-white px-8 py-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Order ID</p>
                        <p className="text-sm font-black tracking-widest">{order.id}</p>
                      </div>
                      <div className="hidden sm:block h-8 w-px bg-white/10" />
                      <div className="hidden sm:block space-y-1">
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Placed On</p>
                        <p className="text-sm font-bold">{format(new Date(order.date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Total Ritual Value</p>
                        <p className="text-lg font-black">₹{order.total.toLocaleString()}</p>
                      </div>
                      <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                        <Link href={`/my-account/orders/${order.id}`}>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Order Summary Content */}
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-full border border-border/50">
                        {getStatusIcon(order.status)}
                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">{order.status}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {order.items.length} {order.items.length === 1 ? 'Ritual' : 'Rituals'} Included
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-black/5 bg-[#f9f9f9] shrink-0">
                            <LazyImage src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[11px] font-black leading-tight uppercase line-clamp-1">{item.name}</h4>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">Quantity: {item.qty}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="bg-muted/50" />

                    <div className="flex justify-between items-center">
                      <Button asChild variant="link" className="p-0 h-auto font-black text-[10px] uppercase tracking-[0.2em] text-primary hover:text-black">
                        <Link href={`/my-account/orders/${order.id}`}>Track Detailed Journey</Link>
                      </Button>
                      <Button variant="ghost" className="h-10 px-6 rounded-full font-black uppercase text-[10px] tracking-widest border border-black/5 hover:bg-black hover:text-white transition-all">
                        <Tag className="mr-2 h-3.5 w-3.5" /> Buy Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 opacity-40">
                <ShoppingBag className="h-16 w-16" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight">No Rituals Yet.</h3>
                  <p className="text-sm font-medium uppercase tracking-tight">Your order history will blossom as you begin your journey.</p>
                </div>
                <Button asChild className="rounded-none bg-black text-white px-12 h-14 font-black text-xs uppercase tracking-[0.2em]">
                  <Link href="/products">Explore Store</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
