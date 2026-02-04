'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Bell, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReferralProgramPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      toast({
        title: "You're on the list!",
        description: "We'll notify you as soon as the Referral Ritual launches.",
      });
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl z-10 py-20 lg:py-32">
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> 
              Coming Soon
            </div>

            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-foreground">
                SHARED <br />
                <span className="text-primary">VITALITY.</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed uppercase tracking-tight">
                Our Referral Ritual is being meticulously crafted. Get ready to share the glow and earn exclusive rewards.
              </p>
            </div>

            {/* Subscription Form */}
            <div className="max-w-md mx-auto">
              {isSubscribed ? (
                <div className="bg-primary/10 border border-primary/20 p-6 rounded-[2rem] animate-in zoom-in duration-500">
                  <p className="font-black uppercase tracking-widest text-primary text-sm flex items-center justify-center gap-2">
                    <Bell className="h-4 w-4" /> Ritual Notification Active
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                  <div className="relative group">
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER EMAIL FOR EARLY ACCESS"
                      className="h-16 rounded-none border-2 border-black/5 bg-[#f9f9f9] text-center font-black text-xs uppercase tracking-[0.2em] focus-visible:ring-primary focus-visible:border-black transition-all"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="h-16 bg-black text-white hover:bg-primary transition-all rounded-none font-black uppercase tracking-[0.3em] text-xs shadow-2xl group"
                  >
                    Notify Me <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>

            {/* Bottom Insight */}
            <div className="pt-12">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] opacity-40">
                The AYUBHYAVA Community Ritual • 2024
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
