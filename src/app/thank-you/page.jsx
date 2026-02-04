'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center max-w-2xl space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center text-primary mb-8">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
            Ritual <br /><span className="text-primary">Joined.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium uppercase tracking-tight">
            Thank you for joining the AYUBHYAVA inner circle. Your journey to daily vitality starts now.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="h-16 px-12 bg-black text-white hover:bg-primary transition-all rounded-none font-black uppercase tracking-[0.2em] text-xs shadow-xl">
              <Link href="/products">Explore Collections</Link>
            </Button>
            <Button asChild variant="outline" className="h-16 px-12 border-2 border-black text-black hover:bg-black hover:text-white transition-all rounded-none font-black uppercase tracking-[0.2em] text-xs">
              <Link href="/">Back to Home <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
