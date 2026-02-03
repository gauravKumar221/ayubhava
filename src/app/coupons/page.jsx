'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Ticket,
  Globe,
  Lock,
  CalendarOff,
  Edit,
  Trash2,
  MoreVertical,
  Clock,
  Calendar,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const initialCoupons = [
  { 
    id: '1', 
    code: 'HEALTH20', 
    type: 'Percentage', 
    value: 20, 
    expiryDate: '2024-12-31T23:59', 
    usage: '45/100', 
    status: 'Public', 
    tag: 'Via Barcode Code',
    isFlashSale: false
  },
  { 
    id: 'flash-1', 
    code: 'FLASH50', 
    type: 'Percentage', 
    value: 50, 
    expiryDate: '2024-08-15T12:00', 
    usage: '88/100', 
    status: 'Public', 
    tag: 'Flash Sale Promo', 
    isFlashSale: true,
    avatarId: 'flash-sale-1'
  },
  { 
    id: '2', 
    code: 'CHECKUP50', 
    type: 'Fixed Amount', 
    value: 50, 
    expiryDate: '2024-08-15T12:00', 
    usage: '12/50', 
    status: 'Public', 
    tag: 'Via Payment with Credit Card',
    isFlashSale: false
  },
  { 
    id: '3', 
    code: 'WELCOME10', 
    type: 'Percentage', 
    value: 10, 
    expiryDate: '2024-01-01T00:00', 
    usage: '100/100', 
    status: 'Expired', 
    tag: 'Via Barcode Code',
    isFlashSale: false
  },
  { 
    id: '4', 
    code: 'VIP_PRIVATE', 
    type: 'Fixed Amount', 
    value: 100, 
    expiryDate: '2025-11-20T18:30', 
    usage: '5/10', 
    status: 'Private', 
    tag: 'Exclusive Access',
    isFlashSale: false
  },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Promo');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  const getIsExpired = (expiryDate) => {
    if (!currentTime) return false;
    return new Date(expiryDate) < currentTime;
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const isExpired = getIsExpired(c.expiryDate);
    
    let matchesFilter = true;
    if (filter === 'Public') matchesFilter = c.status === 'Public' && !isExpired;
    else if (filter === 'Private') matchesFilter = c.status === 'Private' && !isExpired;
    else if (filter === 'Expired') matchesFilter = isExpired || c.status === 'Expired';
    else if (filter === 'Flash Sale') matchesFilter = c.isFlashSale && !isExpired;
    else if (filter === 'All Promo') matchesFilter = true;

    return matchesSearch && matchesFilter;
  });

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expiryDate = formData.get('expiryDate');
    const isExpired = getIsExpired(expiryDate);
    const isFlashSale = formData.get('isFlashSale') === 'true';
    
    const couponData = {
      code: formData.get('code').toUpperCase(),
      type: formData.get('type'),
      value: parseFloat(formData.get('value')),
      expiryDate: expiryDate,
      usage: editingCoupon ? editingCoupon.usage : `0/${formData.get('limit') || '∞'}`,
      status: isExpired ? 'Expired' : (formData.get('status') || 'Public'),
      tag: isFlashSale ? 'Flash Sale Promo' : (editingCoupon ? editingCoupon.tag : 'New Promotion'),
      isFlashSale,
      avatarId: isFlashSale ? 'flash-sale-1' : null
    };

    if (editingCoupon) {
      setCoupons(coupons.map(c => c.id === editingCoupon.id ? { ...couponData, id: c.id } : c));
    } else {
      setCoupons([...coupons, { ...couponData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    
    setIsDialogOpen(false);
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  const openEditDialog = (coupon) => {
    setEditingCoupon(coupon);
    setIsDialogOpen(true);
  };

  const filters = [
    { label: 'All Promo', icon: <Ticket className="h-4 w-4" /> },
    { label: 'Flash Sale', icon: <Zap className="h-4 w-4" /> },
    { label: 'Public', icon: <Globe className="h-4 w-4" /> },
    { label: 'Private', icon: <Lock className="h-4 w-4" /> },
    { label: 'Expired', icon: <CalendarOff className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Manage Promos" 
        description="Create and organize your discount campaigns with flash sale support."
      >
        <div className="flex flex-col items-end gap-1 mr-4 hidden sm:flex">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
            <Calendar className="h-3 w-3 text-primary" />
            <span>Today: {currentTime ? format(currentTime, 'MMMM do, yyyy') : '...'}</span>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingCoupon(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSaveCoupon}>
              <DialogHeader>
                <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'New Coupon'}</DialogTitle>
                <DialogDescription>
                  Define the discount details and validity period.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input id="code" name="code" defaultValue={editingCoupon?.code} placeholder="e.g. SUMMER2024" required className="uppercase" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" defaultValue={editingCoupon?.type || 'Percentage'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Percentage">Percentage (%)</SelectItem>
                        <SelectItem value="Fixed Amount">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="value">Value</Label>
                    <Input id="value" name="value" type="number" step="0.01" defaultValue={editingCoupon?.value} placeholder="20" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date & Time</Label>
                  <div className="relative group">
                    <Input 
                      id="expiryDate" 
                      name="expiryDate" 
                      type="datetime-local" 
                      defaultValue={editingCoupon?.expiryDate} 
                      required 
                      className="pr-10"
                    />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isFlashSale">Campaign Type</Label>
                  <Select name="isFlashSale" defaultValue={editingCoupon?.isFlashSale?.toString() || 'false'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Standard Promo</SelectItem>
                      <SelectItem value="true">Flash Sale (Featured)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Privacy Status</Label>
                  <Select name="status" defaultValue={editingCoupon?.status || 'Public'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public (Global)</SelectItem>
                      <SelectItem value="Private">Private (Exclusive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingCoupon ? 'Save Changes' : 'Create Coupon'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((f) => (
            <Button
              key={f.label}
              variant={filter === f.label ? 'default' : 'outline'}
              className={cn(
                "flex items-center gap-2 rounded-lg",
                filter === f.label && "bg-primary text-primary-foreground"
              )}
              onClick={() => setFilter(f.label)}
            >
              {f.icon}
              {f.label}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coupon codes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCoupons.map((coupon) => {
            const isExpired = getIsExpired(coupon.expiryDate);
            const displayDate = coupon.expiryDate 
              ? format(new Date(coupon.expiryDate), 'MM/dd/yyyy hh:mm a') 
              : 'No date';
            const promoImage = coupon.avatarId ? getPlaceholderImage(coupon.avatarId) : null;

            return (
              <Card 
                key={coupon.id} 
                className={cn(
                  "group relative overflow-hidden transition-all hover:shadow-lg border-none flex flex-col h-full",
                  isExpired ? 'opacity-60 grayscale' : ''
                )}
              >
                <CardContent className="p-0 flex-1 flex flex-col">
                  <div className={cn(
                    "relative h-44 flex flex-col justify-between p-5 text-primary-foreground transition-colors overflow-hidden",
                    isExpired ? "bg-muted-foreground" : (coupon.isFlashSale ? "bg-orange-600" : "bg-primary")
                  )}>
                    {promoImage && !isExpired && (
                      <div className="absolute inset-0 z-0">
                        <Image 
                          src={promoImage.imageUrl} 
                          alt="Promo" 
                          fill 
                          className="object-cover opacity-40 mix-blend-overlay"
                          data-ai-hint={promoImage.imageHint}
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between relative z-10">
                      <Badge variant="secondary" className={cn(
                        "bg-white/20 text-white border-none backdrop-blur-sm",
                        coupon.isFlashSale && "bg-yellow-400 text-orange-900 font-bold"
                      )}>
                        {isExpired ? 'Expired' : (coupon.isFlashSale ? <Zap className="h-3 w-3 mr-1 fill-current" /> : null)}
                        {isExpired ? 'Expired' : coupon.tag}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(coupon)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Promo
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCoupon(coupon.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Coupon
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold tracking-tight">
                        {coupon.type === 'Percentage' ? `Discount ${coupon.value}%` : `Save $${coupon.value}`}
                      </h3>
                      <p className="mt-1 text-sm text-white/80 font-mono">
                        CODE: {coupon.code}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium">
                          Usage: <span className="text-foreground">{coupon.usage}</span>
                        </span>
                        {coupon.isFlashSale && !isExpired && (
                          <Badge variant="outline" className="text-[10px] text-orange-600 border-orange-200 bg-orange-50">
                            FLASH SALE ACTIVE
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                        Expiry Date & Time
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/50">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>{displayDate}</span>
                        <Calendar className="h-3.5 w-3.5 ml-auto opacity-40" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => openEditDialog(coupon)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filteredCoupons.length === 0 && (
            <div className="col-span-full flex h-40 items-center justify-center rounded-xl border-2 border-dashed text-muted-foreground">
              No promotions found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}