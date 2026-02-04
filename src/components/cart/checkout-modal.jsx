'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronLeft, 
  ChevronDown, 
  MapPin, 
  Truck, 
  Ticket, 
  Gift, 
  QrCode,
  Eye,
  CheckCircle2,
  X,
  Settings
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function CheckoutModal({ open, onOpenChange }) {
  const [showQR, setShowQR] = useState(false);
  const [activeView, setActiveView] = useState('main'); // 'main' or 'coupons'

  const paymentOffers = [
    {
      id: 'pop-upi',
      title: 'Upto ₹100 cashback on using POP UPI',
      subtitle: 'Valid On All Transactions',
      description: 'Upto ₹100 cashback on using POP UPI',
      icon: 'https://placehold.co/40x40?text=POP',
    },
    {
      id: 'airtel-upi',
      title: 'Upto ₹100 cashback on payments with Airtel Payments Bank UPI',
      subtitle: 'Valid On A Minimum Order Of ₹300',
      description: 'Upto ₹100 cashback on payments with Airtel Payments Bank UPI',
      icon: 'https://placehold.co/40x40?text=Airtel',
    },
    {
      id: 'bhim-upi',
      title: 'Upto ₹100 instant cashback on using BHIM App',
      subtitle: 'Assured Cashback Upto ₹100',
      description: 'Upto ₹100 instant cashback on using BHIM App',
      icon: 'https://placehold.co/40x40?text=BHIM',
    }
  ];

  const renderMainCheckout = () => (
    <>
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onOpenChange(false)} className="p-1 hover:bg-muted rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground font-black text-[10px]">W</div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-[#e6f7f4] px-2 py-1 rounded-full flex items-center gap-1.5">
            <span className="text-[10px] font-black text-primary">₹726 saved so far</span>
          </div>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[10px] text-muted-foreground font-bold">• 7 items</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground line-through">₹7,372</span>
              <span className="text-sm font-black">₹6,646</span>
              <ChevronDown className="h-3 w-3 opacity-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Prepaid Offer Banner */}
      <div className="bg-black text-white text-center py-2 text-[11px] font-bold uppercase tracking-wider">
        Upto Rs.100 off on Prepaid Orders
      </div>

      <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto pb-10">
        {/* Delivery Details */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Delivery Details</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-white space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black">Deliver To Gaurav Kumar</p>
                  <div className="relative">
                    <span className="absolute -top-8 right-0 bg-[#2d2d2d] text-white text-[9px] px-2 py-1 rounded-md whitespace-nowrap font-bold">Tap To Edit Address</span>
                    <button className="text-[10px] font-black text-primary border border-primary/20 px-3 py-1 rounded-lg hover:bg-primary/5 transition-colors">Change</button>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                  Bihar Darbhanga Naka No 5, Darbhanga<br />
                  Bihar, 846004<br />
                  +91 9304987505 | princegauravaj@gmail.com
                </p>
              </div>
            </div>
            <Separator className="bg-muted/50" />
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 flex items-center justify-between">
                <span className="text-xs font-bold">Delivery Option</span>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-black">Free Shipping</span>
                  <Badge className="bg-[#e6f7f4] text-primary text-[9px] hover:bg-[#e6f7f4] border-none font-black py-0 px-1.5 mt-0.5">Free</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offers & Rewards */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Offers & Rewards</h3>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-white">
            <div className="p-4 space-y-4">
              <div className="relative">
                <Input 
                  placeholder="Enter coupon code" 
                  className="h-11 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
                />
              </div>
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => setActiveView('coupons')}
              >
                <div className="flex items-center gap-3">
                  <Ticket className="h-4 w-4 text-muted-foreground rotate-45" />
                  <span className="text-xs font-bold">9 coupons available</span>
                </div>
                <span className="text-[10px] font-black text-primary uppercase group-hover:underline">View All</span>
              </div>
            </div>
            <Separator className="bg-muted/50" />
            <div className="p-4 flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <Gift className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-bold">Have Gift Card?</span>
              </div>
              <span className="text-[10px] font-black text-primary uppercase group-hover:underline">Redeem</span>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payment Options</h3>
          <div className="bg-[#e9ecef] py-2 px-4 rounded-xl text-[11px] font-bold text-muted-foreground">
            Additional 99% discount upto 100 on UPI
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-white relative overflow-hidden">
            {/* Promo Ribbon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="bg-primary text-white text-[8px] font-black px-3 py-0.5 rounded-b-lg uppercase tracking-wider">
                Get 99% discount + cashback
              </div>
            </div>

            <div className="mt-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rotate-45 border-2 border-foreground flex items-center justify-center rounded-sm">
                  <div className="h-2 w-2 bg-foreground rounded-full" />
                </div>
                <span className="text-sm font-black">UPI</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground line-through block font-bold">₹6646</span>
                <span className="text-sm font-black block">₹6546</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <div className={cn(
                  "h-32 w-32 bg-[#f8f9fa] rounded-2xl flex items-center justify-center border transition-all",
                  !showQR && "blur-sm opacity-50"
                )}>
                  <QrCode className="h-20 w-20 text-muted-foreground opacity-20" />
                </div>
                {!showQR && (
                  <button 
                    onClick={() => setShowQR(true)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white border shadow-md px-4 py-2 rounded-full flex items-center gap-2 hover:bg-muted transition-colors">
                      <Eye className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-wider">Show QR</span>
                    </div>
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold text-muted-foreground px-8 leading-tight">
                  Open any UPI Apps & scan QR Code to pay
                </p>
                <div className="flex items-center justify-center gap-3 opacity-60">
                  <div className="h-4 w-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/cc/Paytm_Logo.pxvg')] bg-contain bg-no-repeat bg-center grayscale" />
                  <div className="h-4 w-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e1/PhonePe_Logo.pxvg')] bg-contain bg-no-repeat bg-center grayscale" />
                  <div className="h-4 w-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Pay_Logo.pxvg')] bg-contain bg-no-repeat bg-center grayscale" />
                </div>
              </div>
            </div>

            <div className="relative py-6">
              <Separator className="bg-muted/50" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[9px] font-black text-muted-foreground uppercase tracking-widest">Or</span>
            </div>

            <div className="space-y-3">
              <Input 
                placeholder="Pay via UPI ID" 
                className="h-11 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
              />
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl font-black text-xs uppercase tracking-[0.1em] shadow-lg shadow-primary/20">
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderCouponsView = () => (
    <div className="bg-white flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Coupons Header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b">
        <button onClick={() => setActiveView('main')} className="p-1 hover:bg-muted rounded-full">
          <Settings className="h-5 w-5 rotate-90 text-muted-foreground" />
        </button>
        <h2 className="text-sm font-bold">Coupons & Offers</h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f4f7f9] p-4 space-y-6">
        {/* Coupon Input */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <Input 
            placeholder="Enter coupon code" 
            className="h-12 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Badge className="bg-white text-foreground hover:bg-white border-none py-2 px-4 rounded-xl text-xs font-bold shadow-sm">Active Coupons</Badge>
          <Badge className="bg-[#e9ecef] text-muted-foreground hover:bg-[#e9ecef] border-none py-2 px-4 rounded-xl text-xs font-bold">Payment Offers</Badge>
        </div>

        {/* Payment Offers Section */}
        <div className="space-y-4 pb-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-muted-foreground">Payment Offers</h3>
            <div className="bg-[#e6f7f4] py-2 px-4 rounded-xl text-[10px] font-bold text-primary border border-primary/10">
              Save more with these offers auto-applied on select payment methods
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">UPI</h4>
            {paymentOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl p-4 border shadow-sm space-y-3 relative group">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0 border bg-muted flex items-center justify-center">
                    <img src={offer.icon} alt={offer.id} className="h-6 w-6 grayscale" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h5 className="text-[13px] font-black leading-tight pr-12">{offer.title}</h5>
                    <p className="text-[10px] font-bold text-muted-foreground">{offer.subtitle}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug pt-1">{offer.description}</p>
                    <button className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest hover:underline pt-1 block">Know more</button>
                  </div>
                  <button className="absolute top-4 right-4 h-8 px-4 rounded-xl border-2 border-foreground text-[10px] font-black hover:bg-muted transition-colors">
                    PAY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] p-0 overflow-hidden bg-[#f4f7f9] border-none gap-0 sm:rounded-[2rem]">
        {activeView === 'main' ? renderMainCheckout() : renderCouponsView()}
      </DialogContent>
    </Dialog>
  );
}
