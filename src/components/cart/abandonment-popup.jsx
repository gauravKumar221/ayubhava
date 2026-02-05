'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { X, Star, Leaf, Beaker, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AbandonmentPopup() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3569); // Starts around 59:29 for visual accuracy to screenshot

  useEffect(() => {
    // Check localStorage for 24h logic
    const lastShown = localStorage.getItem('last_abandonment_popup');
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (cartQuantity > 5 && (!lastShown || now - parseInt(lastShown) > twentyFourHours)) {
      // Delay slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('last_abandonment_popup', now.toString());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cartQuantity]);

  // Countdown timer logic
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      mins: mins.toString().padStart(2, '0'),
      secs: secs.toString().padStart(2, '0')
    };
  };

  const { mins, secs } = formatTime(timeLeft);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[320px] bg-[#eef1f2] rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-right-8 duration-500 border border-white/50">
      {/* Close Button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-0 right-0 bg-black text-white p-1 hover:bg-red-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="p-6 flex flex-col items-center text-center space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a]">Still Thinking?</h2>
          <div className="space-y-0">
            <p className="text-sm font-bold text-[#1a1a1a]/80 uppercase tracking-tight leading-none">Your Cart Is Loaded</p>
            <p className="text-sm font-black text-[#1a1a1a] uppercase tracking-tight">With <span className="text-primary text-lg">5% OFF!</span></p>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pt-1">Don't miss out</p>
        </div>

        {/* Timer */}
        <div className="flex gap-2 w-full">
          {[
            { label: 'Days', val: '00' },
            { label: 'Hours', val: '00' },
            { label: 'Minutes', val: mins },
            { label: 'Seconds', val: secs },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 bg-white rounded-lg p-2 flex flex-col items-center shadow-sm border border-black/5">
              <span className="text-lg font-black leading-none">{item.val}</span>
              <span className="text-[8px] font-bold uppercase text-muted-foreground pt-1">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button className="w-full h-12 bg-[#1a1a1a] hover:bg-primary text-white rounded-md font-black uppercase text-xs tracking-widest shadow-lg transition-all">
          GET DISCOUNT CODE
        </Button>

        {/* Social Proof */}
        <div className="space-y-1">
          <div className="flex justify-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Based on 20,000+ Reviews</p>
        </div>

        {/* Features */}
        <div className="flex justify-between w-full pt-4 border-t border-black/5">
          <div className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-white/50 flex items-center justify-center">
              <Zap className="h-3 w-3 text-[#1a1a1a]" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-tighter">No Sugar</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-white/50 flex items-center justify-center">
              <Leaf className="h-3 w-3 text-[#1a1a1a]" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-tighter">Natural</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-white/50 flex items-center justify-center">
              <Beaker className="h-3 w-3 text-[#1a1a1a]" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-tighter">Lab Tested</span>
          </div>
        </div>
      </div>
    </div>
  );
}
