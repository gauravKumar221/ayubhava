'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Gift, Heart, Users, Sparkles } from 'lucide-react';

export default function ReferralProgramPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1">
        <section className="bg-black text-white py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="h-3 w-3" /> Shared Vitality
            </div>
            <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">Share the Ritual. Get Rewarded.</h1>
            <p className="text-lg text-white/60 font-medium max-w-xl mx-auto">
              Introduce your circle to the AYUBHYAVA lifestyle. They get a discount, and you earn vitality credits for your next ritual.
            </p>
            <Button className="h-14 px-12 bg-white text-black hover:bg-primary hover:text-white rounded-none font-black uppercase tracking-widest text-xs">Join Program</Button>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="bg-muted h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Gift className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">1. Invite Friends</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Send your unique referral link to friends and family through social, mail, or text.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="bg-muted h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">2. They Get ₹200 OFF</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Your friends receive ₹200 off their first order of ₹1000 or more.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="bg-muted h-20 w-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">3. You Get ₹200 Credit</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Once their order is complete, you earn ₹200 in ritual credits automatically.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}