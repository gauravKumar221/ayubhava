'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function RefundsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12">Refunds & Cancellation.</h1>
        
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">Returns Policy</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We offer a 30-day "Happiness Ritual" guarantee. If you are not satisfied with your purchase, you may return the unopened product within 30 days of delivery for a full refund or exchange.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">How to Initiate a Return</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              To start a return, please contact our Vitality Experts at rituals@ayubhyava.com with your order number. Once approved, we will provide a prepaid shipping label for your return.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">Refund Process</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Once your return is received and inspected, we will send you an email to notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within 5-7 business days.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">Order Cancellation</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Orders can be cancelled free of charge before they enter the processing stage (typically within 2 hours of placement). After this period, orders are subject to our standard return policy.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}