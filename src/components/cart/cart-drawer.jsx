'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '@/store/cart-slice';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  X, 
  Minus, 
  Plus, 
  Trash2, 
  Clock, 
  ChevronDown,
  Ticket,
  CheckCircle2,
  Box
} from 'lucide-react';
import { LazyImage } from '@/components/shared/lazy-image';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { CheckoutModal } from './checkout-modal';

export function CartDrawer({ children }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalSavings = useSelector((state) => state.cart.totalSavings);
  
  const [mounted, setMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [triggerCoupons, setTriggerCoupons] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckoutClick = () => {
    setTriggerCoupons(false);
    setIsSheetOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCouponClick = () => {
    setTriggerCoupons(true);
    setIsSheetOpen(false);
    setIsCheckoutOpen(true);
  };

  // Progress logic for freebies (mock thresholds)
  const progressPercent = Math.min((totalAmount / 6000) * 100, 100);

  if (!mounted) return children;

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 flex flex-col gap-0 border-l-0 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-20">
            <h2 className="text-lg font-black uppercase tracking-tight">Your Cart ({totalQuantity} items)</h2>
            <SheetClose asChild>
              <button className="rounded-full p-1 hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#fafafa] [&::-webkit-scrollbar]:hidden">
            {/* Limited Time Offer */}
            <div className="bg-[#fff9f0] border-b border-[#ffeccf] py-2 px-4 flex items-center justify-center gap-2 text-[11px] font-bold">
              <span className="uppercase tracking-wide opacity-70">Limited Time Offer</span>
              <div className="flex items-center gap-1">
                <div className="bg-black text-white px-1 rounded-sm">08m</div>
                <span>:</span>
                <div className="bg-black text-white px-1 rounded-sm">52s</div>
              </div>
            </div>

            {/* Progress Bar for Freebies */}
            <div className="p-6 bg-white border-b space-y-4">
              <p className="text-center text-[13px] font-black tracking-tight">
                {totalAmount < 6000 ? (
                  <>Add more to get <span className="text-primary">Free Korean Marine Collagen</span></>
                ) : (
                  <span className="text-primary">Congratulations! You earned a free gift!</span>
                )}
              </p>
              <div className="relative pt-6">
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="absolute top-0 left-0 w-full flex justify-between px-0">
                  <div className="flex flex-col items-center gap-1 -translate-x-1/2">
                    <span className="text-[9px] font-bold">₹2,499.00</span>
                    <div className="h-3 w-px bg-border" />
                    <span className="text-[8px] font-black uppercase text-muted-foreground">Vegan Collagen</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold">₹3,999.00</span>
                    <div className="h-3 w-px bg-border" />
                    <span className="text-[8px] font-black uppercase text-muted-foreground">Hydrasalt</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 translate-x-1/2">
                    <span className="text-[9px] font-bold">₹5,999.00</span>
                    <div className="h-3 w-px bg-border" />
                    <span className="text-[8px] font-black uppercase text-muted-foreground">Vegan Protein</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="p-4 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="p-4 bg-white rounded-2xl border shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-xl overflow-hidden border bg-muted shrink-0">
                        {item.image ? (
                          <LazyImage src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-muted">
                            <Box className="h-8 w-8 text-muted-foreground opacity-20" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-black leading-tight line-clamp-2">{item.name}</h3>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] text-muted-foreground line-through block">₹{item.originalPrice.toLocaleString()}</span>
                            <span className="text-sm font-black block">₹{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <div className="flex items-center gap-1 border rounded-full px-2 py-1 text-[10px] font-bold cursor-pointer hover:bg-muted">
                            {item.variant} <ChevronDown className="h-3 w-3 opacity-50" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border rounded-lg bg-muted/30">
                        <button 
                          onClick={() => dispatch(cartActions.removeItem(item.id))}
                          className="p-1.5 hover:text-primary transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(cartActions.addItem({ id: item.id, price: item.price }))}
                          className="p-1.5 hover:text-primary transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button 
                        onClick={() => dispatch(cartActions.deleteItem(item.id))}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                  <ShoppingBag className="h-12 w-12 mb-4" />
                  <p className="font-bold text-sm">Your cart is empty</p>
                  <SheetClose asChild>
                    <Button variant="link" className="text-primary font-black uppercase text-[10px] tracking-widest mt-2">Start Ritual</Button>
                  </SheetClose>
                </div>
              )}
            </div>

            {/* Coupon Input */}
            {cartItems.length > 0 && (
              <div className="px-4 pb-10">
                <div 
                  className="relative group cursor-pointer"
                  onClick={handleCouponClick}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                    <Ticket className="h-4 w-4 rotate-45" />
                  </div>
                  <Input 
                    readOnly
                    placeholder="Enter Coupon Code" 
                    className="pl-10 h-12 rounded-xl border-dashed bg-white border-2 border-primary/20 focus-visible:ring-primary/20 focus-visible:border-primary text-xs font-bold uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal cursor-pointer"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="bg-white border-t p-6 space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sticky bottom-0 z-20">
              {totalSavings > 0 && (
                <div className="bg-[#e6f7f4] py-1.5 px-4 rounded-full flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider">₹{totalSavings.toLocaleString()} Saved so far!</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <ShoppingBag className="h-3.5 w-3.5" /> Estimated Total
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black block">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <Button 
                onClick={handleCheckoutClick}
                className="w-full h-14 bg-black text-white hover:bg-black/90 rounded-xl text-sm font-black uppercase tracking-[0.2em]"
              >
                CHECKOUT
              </Button>
              <div className="flex items-center justify-center gap-1.5 opacity-40">
                <span className="text-[8px] font-bold uppercase tracking-widest">Powered by</span>
                <div className="font-black text-[10px] italic">GoKwik</div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen} 
        onBack={handleBackToCart}
        triggerCoupons={triggerCoupons}
      />
    </>
  );
}