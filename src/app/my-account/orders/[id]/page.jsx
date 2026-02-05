'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  CreditCard,
  Download,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { format } from 'date-fns';
import { LazyImage } from '@/components/shared/lazy-image';
import { cn } from '@/lib/utils';

export default function OrderDetailPage({ params }) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Mock data for detail
  const order = {
    id: id || 'RIT-7721',
    date: '2024-07-28T14:30:00Z',
    status: 'Processing',
    paymentMethod: 'UPI • Google Pay',
    address: {
      name: 'Gaurav Kumar',
      line1: 'Bihar Darbhanga Naka No 5',
      city: 'Darbhanga',
      state: 'Bihar',
      pincode: '846004'
    },
    tracking: [
      { time: '2024-07-28 02:30 PM', label: 'Order Confirmed', description: 'Your vitality ritual has been recorded.', completed: true },
      { time: '2024-07-28 04:45 PM', label: 'Meticulous Packing', description: 'Items are being handled with care.', completed: true },
      { time: 'Pending', label: 'Rapid Dispatch', description: 'Awaiting courier pickup.', completed: false },
      { time: 'Pending', label: 'Delivered', description: 'Arrival at your sanctuary.', completed: false },
    ],
    items: [
      { id: 1, name: 'Deep Sleep Ritual - Restful Melts', qty: 1, price: 599, originalPrice: 699, image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=200&auto=format&fit=crop' },
      { id: 2, name: 'Marine Collagen Peptides', qty: 2, price: 1899, originalPrice: 1999, image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=200&auto=format&fit=crop' }
    ],
    summary: {
      mrp: 4697,
      savings: 250,
      shipping: 0,
      total: 4447
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] font-body">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
        <div className="space-y-12">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 border-black/5 hover:bg-black hover:text-white transition-all">
                <Link href="/my-account/orders">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl lg:text-4xl font-black uppercase tracking-widest">{order.id}</h1>
                  <Badge className="bg-[#e6f7f4] text-primary border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                    {order.status}
                  </Badge>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  Ordered on {format(new Date(order.date), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-none border-2 border-black font-black uppercase text-[10px] tracking-widest h-12 px-6">
                <Download className="mr-2 h-4 w-4" /> Invoice
              </Button>
              <Button className="rounded-none bg-black text-white hover:bg-primary h-12 px-8 font-black uppercase text-[10px] tracking-widest shadow-xl transition-all">
                Help <HelpCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Tracking & Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tracking Visual */}
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-8 border-b border-muted/50 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" /> Ritual Journey
                  </CardTitle>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Est. Arrival: July 31
                  </span>
                </CardHeader>
                <CardContent className="p-8 lg:p-12">
                  <div className="relative space-y-12 pl-10 before:absolute before:left-[1.35rem] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted/50">
                    {order.tracking.map((step, idx) => (
                      <div key={idx} className="relative group">
                        <div className={cn(
                          "absolute -left-[1.1rem] top-0 h-8 w-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-all duration-500",
                          step.completed ? "bg-primary text-white scale-110" : "bg-muted text-muted-foreground scale-100"
                        )}>
                          {step.completed ? <CheckCircle2 className="h-4 w-4" /> : <div className="h-2 w-2 rounded-full bg-current" />}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className={cn(
                              "text-sm font-black uppercase tracking-tight",
                              step.completed ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {step.label}
                            </h4>
                            <span className="text-[9px] font-bold text-muted-foreground uppercase">{step.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed uppercase tracking-tight opacity-70">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Items Card */}
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-8 border-b border-muted/50">
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" /> Rituals Selected
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-muted/50">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-8 flex items-center gap-6 group hover:bg-muted/5 transition-colors">
                        <div className="relative h-24 w-24 rounded-2xl overflow-hidden border border-black/5 bg-[#f9f9f9] shrink-0">
                          <LazyImage src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-black tracking-tight leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Qty: {item.qty}</span>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Save ₹{item.originalPrice - item.price}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground line-through font-bold">₹{(item.originalPrice * item.qty).toLocaleString()}</p>
                          <p className="text-xl font-black">₹{(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Address & Summary */}
            <div className="space-y-8">
              {/* Delivery Address */}
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="p-8 border-b border-muted/50">
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Delivery Sanctuary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-black uppercase">{order.address.name}</p>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed uppercase tracking-tight">
                      {order.address.line1}, {order.address.city}<br />
                      {order.address.state}, {order.address.pincode}
                    </p>
                  </div>
                  <Separator className="bg-muted/50" />
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Paid Via</p>
                      <p className="text-[11px] font-black uppercase tracking-wider">{order.paymentMethod}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-black text-white relative">
                <CardHeader className="p-8">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-60">
                      <span>Subtotal</span>
                      <span>₹{order.summary.mrp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-primary">
                      <span>Ritual Savings</span>
                      <span>-₹{order.summary.savings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-60">
                      <span>Shipping</span>
                      <span className="text-primary">Free</span>
                    </div>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase tracking-widest">To Pay</span>
                    <span className="text-3xl font-black text-primary">₹{order.summary.total.toLocaleString()}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3 mt-4">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                      You saved a total of ₹{order.summary.savings} on this ritual journey.
                    </p>
                  </div>
                </CardContent>
                {/* Visual Accent */}
                <div className="absolute bottom-0 right-0 p-4 opacity-10">
                  <ShoppingBag className="h-24 w-24 rotate-12" />
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="pt-4 space-y-4">
                <Button className="w-full h-16 bg-white border-2 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all group">
                  Repeat This Ritual <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
