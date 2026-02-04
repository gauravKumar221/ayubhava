'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShieldCheck, 
  BadgePercent, 
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoginModal({ open, onOpenChange }) {
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[850px] p-0 overflow-hidden border-none gap-0 rounded-[2rem] sm:rounded-[2.5rem] bg-white shadow-2xl">
        <DialogTitle className="sr-only">Login to Wellbeing</DialogTitle>
        
        <div className="flex flex-col md:flex-row h-full min-h-[500px]">
          {/* Left Side: Branding & Benefits */}
          <div className="flex-1 bg-gradient-to-br from-[#e0e0e0] via-[#f5f5f5] to-[#ffffff] p-8 lg:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/40 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/5 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 space-y-8 w-full">
              {/* Logo & Sub-logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground font-black text-2xl tracking-tighter shadow-sm bg-white">W</div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Wellbeing</span>
                  <span className="text-xl uppercase font-black tracking-tighter">AYUBHAVA</span>
                </div>
                <div className="flex items-center gap-1.5 mt-4 opacity-40">
                  <span className="text-[8px] font-bold uppercase tracking-widest">Powered by</span>
                  <div className="font-black text-[10px] italic">GoKwik</div>
                </div>
              </div>

              <h2 className="text-xl lg:text-2xl font-black tracking-tight text-foreground leading-tight max-w-xs mx-auto">
                Welcome! Register to avail the best deals!
              </h2>

              {/* Benefits Grid */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md mx-auto">
                {[
                  { icon: <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />, label: 'Zero Subscription Fees' },
                  { icon: <BadgePercent className="h-5 w-5 text-yellow-500 fill-yellow-500" />, label: 'Lowest price guaranteed' },
                  { icon: <ShieldCheck className="h-5 w-5 text-yellow-500 fill-yellow-500" />, label: '100% secure & spam free' },
                ].map((benefit, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-white shadow-sm transition-transform hover:scale-105">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-inner">
                      {benefit.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase leading-tight tracking-tight text-foreground/70">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full md:w-[380px] bg-white p-8 lg:p-12 flex flex-col justify-center relative border-l border-muted/10">
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-foreground leading-none">
                  Unlock <br />Superior Discounts
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-muted-foreground/20">
                      <img src="https://flagcdn.com/in.svg" alt="India" className="w-5 h-3.5 rounded-sm shadow-sm" />
                      <span className="text-xs font-black">+91</span>
                    </div>
                    <Input 
                      type="tel"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="h-14 pl-24 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20 text-sm font-black tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-bold"
                    />
                  </div>

                  <div className="flex items-start space-x-3 px-1">
                    <Checkbox id="modal-notify" className="mt-1 rounded-sm border-2 border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <label 
                      htmlFor="modal-notify" 
                      className="text-[10px] font-bold text-muted-foreground leading-tight cursor-pointer select-none"
                    >
                      Notify me for any updates & offers
                    </label>
                  </div>
                </div>

                <Button className="w-full h-14 bg-black hover:bg-black/90 text-white rounded-none font-black uppercase tracking-[0.2em] text-sm shadow-xl transition-all active:scale-[0.98]">
                  Continue
                </Button>

                <div className="space-y-4 text-center">
                  <p className="text-[9px] font-bold text-muted-foreground leading-relaxed px-4">
                    I accept that I have read & understood GoKwik's 
                    <button className="text-foreground hover:underline ml-1">Privacy Policy</button> and 
                    <button className="text-foreground hover:underline ml-1">T&Cs</button>.
                  </p>
                  
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline block w-full mt-4">
                    Trouble logging in?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
