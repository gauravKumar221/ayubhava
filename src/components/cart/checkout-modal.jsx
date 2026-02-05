'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Tag,
  Pencil,
  Plus,
  Trash2,
  ChevronUp,
  Box
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { LazyImage } from '@/components/shared/lazy-image';

const initialAddresses = [
  {
    id: 'addr-1',
    name: 'Gaurav Kumar',
    type: 'Home',
    line1: 'Bihar Darbhanga Naka No 5',
    city: 'Darbhanga',
    state: 'Bihar',
    pincode: '846004',
    phone: '+91 9304987505',
    email: 'princegauravaj@gmail.com'
  }
];

export function CheckoutModal({ open, onOpenChange, onBack, triggerCoupons = false }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalSavings = useSelector((state) => state.cart.totalSavings);
  const mrpTotal = totalAmount + totalSavings;

  const [showQR, setShowQR] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  useEffect(() => {
    if (open && triggerCoupons) {
      setIsCouponsOpen(true);
    } else if (!open) {
      setIsCouponsOpen(false);
    }
  }, [open, triggerCoupons]);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Home',
    line1: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: ''
  });

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
    }
  ];

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setFormData(addr);
    setIsAddingNew(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      name: '',
      type: 'Home',
      line1: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: ''
    });
    setIsAddingNew(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (editingAddress) {
      const updated = addresses.map(a => a.id === editingAddress.id ? { ...formData, id: a.id } : a);
      setAddresses(updated);
      if (selectedAddress.id === editingAddress.id) setSelectedAddress({ ...formData, id: editingAddress.id });
    } else {
      const newAddr = { ...formData, id: `addr-${Math.random().toString(36).substr(2, 9)}` };
      setAddresses([...addresses, newAddr]);
    }
    setIsAddingNew(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    if (selectedAddress.id === id && updated.length > 0) setSelectedAddress(updated[0]);
    setIsAddingNew(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] p-0 overflow-hidden bg-[#f4f7f9] border-none gap-0 sm:rounded-[2rem] h-[85vh] flex flex-col shadow-2xl">
        <DialogTitle className="sr-only">Checkout</DialogTitle>
        <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0 border-b border-muted/20">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack || (() => onOpenChange(false))} 
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground font-black text-[10px]">W</div>
          </div>
          
          <div className="flex items-center gap-2">
            {totalSavings > 0 && (
              <div className="bg-[#e6f7f4] px-2 py-1 rounded-full flex items-center gap-1.5 border border-primary/10">
                <span className="text-[10px] font-black text-primary">₹{totalSavings.toLocaleString()} saved so far</span>
              </div>
            )}
            
            <Popover open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
              <PopoverTrigger asChild>
                <div className="flex flex-col items-end leading-none cursor-pointer group">
                  <span className="text-[10px] text-muted-foreground font-bold group-hover:text-primary transition-colors">• {totalQuantity} items</span>
                  <div className="flex items-center gap-1">
                    {totalSavings > 0 && (
                      <span className="text-[10px] text-muted-foreground line-through">₹{mrpTotal.toLocaleString()}</span>
                    )}
                    <span className="text-sm font-black">₹{totalAmount.toLocaleString()}</span>
                    <div className={cn("transition-transform duration-200", isSummaryOpen && "rotate-180")}>
                      <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[440px] p-0 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-none animate-in zoom-in-95 duration-200" align="end" sideOffset={8}>
                <div className="flex flex-col bg-white">
                  <div className="p-6 overflow-y-auto max-h-[450px] [&::-webkit-scrollbar]:hidden space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-muted/30 shrink-0 bg-[#f9f9f9]">
                          {item.image ? (
                            <LazyImage src={item.image} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
                              <Box className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div className="space-y-1">
                            <h4 className="text-[12px] font-bold text-foreground leading-tight line-clamp-2 pr-4">{item.name}</h4>
                            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex flex-col justify-between py-1 min-w-[60px]">
                          <span className="text-[11px] text-muted-foreground line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                          <span className="text-[15px] font-black">₹{item.price === 0 ? '0' : (item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-[#f8f9fa] rounded-[1.5rem] p-5 space-y-3 mt-4">
                      <div className="flex justify-between items-center text-[12px] font-bold text-[#666]">
                        <span>MRP Total</span>
                        <span className="text-[#333]">₹{mrpTotal.toLocaleString()}</span>
                      </div>
                      {totalSavings > 0 && (
                        <div className="flex justify-between items-center text-[12px] font-bold text-[#666]">
                          <span>Discount on MRP</span>
                          <span className="text-[#4a6b5d] font-black">-₹{totalSavings.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-[12px] font-bold text-[#666]">
                        <span>Subtotal</span>
                        <span className="text-[#333]">₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-bold text-[#666]">
                        <span>Shipping</span>
                        <span className="text-[#93ab38] font-black uppercase">Free</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-8 py-5 bg-white border-t flex justify-between items-center">
                    <span className="text-[13px] font-black uppercase tracking-[0.1em]">TO PAY</span>
                    <span className="text-[22px] font-black">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="bg-black text-white text-center py-2 text-[11px] font-bold uppercase tracking-wider shrink-0">
          Upto Rs.100 off on Prepaid Orders
        </div>

        <div className="p-4 space-y-4 overflow-y-auto pb-10 flex-1 [&::-webkit-scrollbar]:hidden">
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Delivery Details</h3>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-white space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black">Deliver To {selectedAddress?.name}</p>
                    <button 
                      onClick={() => setIsAddressSheetOpen(true)}
                      className="text-[10px] font-black text-primary border border-primary/20 px-3 py-1 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                    {selectedAddress?.line1}, {selectedAddress?.city}<br />
                    {selectedAddress?.state}, {selectedAddress?.pincode}<br />
                    {selectedAddress?.phone} | {selectedAddress?.email}
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
                  onClick={() => setIsCouponsOpen(true)}
                >
                  <div className="flex items-center gap-3">
                    <Ticket className="h-4 w-4 text-muted-foreground rotate-45" />
                    <span className="text-xs font-bold">9 coupons available</span>
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase group-hover:underline">View All</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pb-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payment Options</h3>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-white relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rotate-45 border-2 border-foreground flex items-center justify-center rounded-sm">
                    <div className="h-2 w-2 bg-foreground rounded-full" />
                  </div>
                  <span className="text-sm font-black">UPI</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black">₹{totalAmount.toLocaleString()}</span>
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
                      <div className="bg-white border shadow-md px-4 py-2 rounded-full flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Show QR</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Input 
                  placeholder="Pay via UPI ID" 
                  className="h-11 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
                />
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl font-black text-xs uppercase tracking-[0.1em]">
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Sheet open={isCouponsOpen} onOpenChange={setIsCouponsOpen}>
          <SheetContent side="bottom" className="max-w-[480px] mx-auto p-0 rounded-t-[2rem] border-none overflow-hidden h-[80vh] flex flex-col">
            <div className="bg-white flex flex-col h-full">
              <SheetHeader className="px-6 py-5 flex flex-row items-center justify-between border-b bg-white z-10 shrink-0 space-y-0">
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <SheetTitle className="text-sm font-black">Coupons & Offers</SheetTitle>
                </div>
                <button onClick={() => setIsCouponsOpen(false)} className="p-1.5 hover:bg-muted rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto bg-[#f4f7f9] p-4 space-y-6 [&::-webkit-scrollbar]:hidden">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-white">
                  <div className="relative">
                    <Input placeholder="Enter coupon code" className="h-12 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary uppercase tracking-widest">Apply</button>
                  </div>
                </div>
                <div className="space-y-3 pb-10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payment Offers</h4>
                  {paymentOffers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-2xl p-4 border border-white shadow-sm space-y-3 relative group">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0 border bg-[#f8f9fa] flex items-center justify-center">
                          <img src={offer.icon} alt={offer.id} className="h-6 w-6 grayscale" />
                        </div>
                        <div className="flex-1 space-y-1 pr-16">
                          <h5 className="text-[13px] font-black leading-tight">{offer.title}</h5>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{offer.subtitle}</p>
                        </div>
                        <button className="absolute top-4 right-4 h-8 px-5 rounded-xl border-2 border-foreground text-[10px] font-black hover:bg-muted uppercase">PAY</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={isAddressSheetOpen} onOpenChange={setIsAddressSheetOpen}>
          <SheetContent side="bottom" className="max-w-[480px] mx-auto p-0 rounded-t-[2rem] border-none overflow-hidden h-[80vh] flex flex-col">
            <div className="bg-white flex flex-col h-full">
              <SheetHeader className="px-6 py-5 flex flex-row items-center justify-between border-b bg-white z-10 shrink-0 space-y-0">
                <SheetTitle className="text-sm font-black">{isAddingNew ? (editingAddress ? 'Edit Address' : 'Add New Address') : 'Select Delivery Address'}</SheetTitle>
                {!isAddingNew ? (
                  <button 
                    onClick={handleAddNew}
                    className="flex items-center gap-1 text-[10px] font-black text-primary border-2 border-primary/20 rounded-xl px-3 py-1.5 hover:bg-primary/5"
                  >
                    <Plus className="h-3 w-3" /> Add New Address
                  </button>
                ) : (
                  <button onClick={() => setIsAddingNew(false)} className="p-1.5 hover:bg-muted rounded-full transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                )}
              </SheetHeader>

              <div className="flex-1 overflow-y-auto bg-[#f4f7f9] p-4 [&::-webkit-scrollbar]:hidden">
                {isAddingNew ? (
                  <form onSubmit={handleSaveAddress} className="space-y-4 animate-in slide-in-from-right duration-300">
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-white space-y-4">
                      <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                        <Input 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. Gaurav Kumar" 
                          className="h-12 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address Line</Label>
                        <Input 
                          value={formData.line1} 
                          onChange={(e) => setFormData({...formData, line1: e.target.value})}
                          placeholder="House No, Street, Area" 
                          className="h-12 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</Label>
                          <Input 
                            value={formData.city} 
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            placeholder="City" 
                            className="h-12 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Pincode</Label>
                          <Input 
                            value={formData.pincode} 
                            onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                            placeholder="Pincode" 
                            className="h-12 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                        <Input 
                          value={formData.phone} 
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 0000000000" 
                          className="h-12 rounded-xl bg-[#f8f9fa] border-muted/50 text-xs font-bold"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address Type</Label>
                        <div className="flex gap-2">
                          {['Home', 'Work'].map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({...formData, type})}
                              className={cn(
                                "flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all",
                                formData.type === type ? "bg-primary/10 border-primary text-primary" : "bg-[#f8f9fa] border-muted/50 text-muted-foreground"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {editingAddress && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleDeleteAddress(editingAddress.id)}
                          className="flex-1 h-14 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/5 font-black uppercase text-xs"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </Button>
                      )}
                      <Button type="submit" className="flex-[2] h-14 bg-black text-white hover:bg-black/90 rounded-xl font-black uppercase tracking-widest text-xs">
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 pb-10">
                    {addresses.map((addr) => (
                      <div 
                        key={addr.id} 
                        className={cn(
                          "bg-white rounded-2xl p-5 shadow-sm border-2 transition-all relative group",
                          selectedAddress.id === addr.id ? "border-black" : "border-white"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black">{addr.name}</span>
                            <Badge className="bg-[#e6f7f4] text-primary text-[9px] hover:bg-[#e6f7f4] border-none font-black py-0 px-2 rounded-md">
                              {addr.type}
                            </Badge>
                          </div>
                          <button 
                            onClick={() => handleOpenEdit(addr)}
                            className="p-1.5 hover:bg-muted rounded-full transition-colors"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                        
                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                          <p>{addr.line1}, {addr.city}, {addr.state}, {addr.pincode}</p>
                          <p className="mt-1">{addr.phone} | {addr.email}</p>
                        </div>

                        <button 
                          onClick={() => {
                            setSelectedAddress(addr);
                            setIsAddressSheetOpen(false);
                          }}
                          className="w-full mt-5 h-12 bg-black text-white hover:bg-black/90 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg"
                        >
                          Deliver Here
                        </button>
                      </div>
                    ))}
                    {addresses.length === 0 && (
                      <div className="text-center py-20 opacity-40">
                        <MapPin className="h-12 w-12 mx-auto mb-4" />
                        <p className="font-bold text-sm">No saved addresses</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </DialogContent>
    </Dialog>
  );
}
