'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Truck, Globe, Clock, ShieldCheck } from 'lucide-react';

export default function OrdersShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12">Orders & Shipping.</h1>
        
        <div className="grid gap-12">
          <div className="flex gap-6 items-start">
            <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black uppercase tracking-tight">Processing Times</h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Most rituals begin within 24-48 hours. Orders placed before 12 PM local time are typically processed the same day. You will receive a tracking link via email once your package is dispatched.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black uppercase tracking-tight">Shipping Costs</h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                We offer complimentary standard shipping on all orders over ₹1500. For orders below this threshold, a flat rate of ₹100 applies. Premium express shipping is available at checkout for an additional fee.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black uppercase tracking-tight">International Delivery</h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                We currently ship to over 50 countries. International transit typically takes 7-14 business days depending on customs clearance in your region.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black uppercase tracking-tight">Secure Packaging</h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Your vitality essentials are packed in eco-friendly, tamper-evident materials to ensure they arrive in pristine, bioavailable condition.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}