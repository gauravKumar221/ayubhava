'use client';

import { useState } from 'react';
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
import { cn } from '@/lib/utils';

const initialCoupons = [
  { id: '1', code: 'HEALTH20', type: 'Percentage', value: 20, expiryDate: '2024-12-31', usage: '45/100', status: 'Public', tag: 'Via Barcode Code' },
  { id: '2', code: 'CHECKUP50', type: 'Fixed Amount', value: 50, expiryDate: '2024-08-15', usage: '12/50', status: 'Public', tag: 'Via Payment with Credit Card' },
  { id: '3', code: 'WELCOME10', type: 'Percentage', value: 10, expiryDate: '2024-01-01', usage: '100/100', status: 'Expired', tag: 'Via Barcode Code' },
  { id: '4', code: 'VIP_PRIVATE', type: 'Fixed Amount', value: 100, expiryDate: '2024-11-20', usage: '5/10', status: 'Private', tag: 'Exclusive Access' },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Promo');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All Promo' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const couponData = {
      code: formData.get('code').toUpperCase(),
      type: formData.get('type'),
      value: parseFloat(formData.get('value')),
      expiryDate: formData.get('expiryDate'),
      usage: `0/${formData.get('limit') || '∞'}`,
      status: 'Public',
      tag: 'New Promotion',
    };

    setCoupons([...coupons, { ...couponData, id: Math.random().toString(36).substr(2, 9) }]);
    setIsDialogOpen(false);
  };

  const filters = [
    { label: 'All Promo', icon: <Ticket className="h-4 w-4" /> },
    { label: 'Public', icon: <Globe className="h-4 w-4" /> },
    { label: 'Private', icon: <Lock className="h-4 w-4" /> },
    { label: 'Expired', icon: <CalendarOff className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Manage Promos" 
        description="Create and organize your discount campaigns."
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSaveCoupon}>
              <DialogHeader>
                <DialogTitle>New Coupon</DialogTitle>
                <DialogDescription>
                  Define a new discount code for your medical center.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input id="code" name="code" placeholder="e.g. SUMMER2024" required className="uppercase" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" defaultValue="Percentage">
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
                    <Input id="value" name="value" type="number" step="0.01" placeholder="20" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" name="expiryDate" type="date" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Coupon</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="flex flex-col gap-6">
        {/* Filters Section */}
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

        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coupon codes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCoupons.map((coupon) => (
            <Card 
              key={coupon.id} 
              className={cn(
                "group relative overflow-hidden transition-all hover:shadow-lg border-none",
                coupon.status === 'Expired' ? 'opacity-60 grayscale' : ''
              )}
            >
              <CardContent className="p-0">
                <div className="flex h-36 flex-col justify-between bg-primary p-5 text-primary-foreground">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-md border-none">
                      {coupon.tag}
                    </Badge>
                    <Ticket className="h-5 w-5 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {coupon.type === 'Percentage' ? `Discount ${coupon.value}%` : `Save $${coupon.value}`}
                    </h3>
                    {coupon.id === '1' && <h3 className="text-2xl font-bold">Buy 2 Get 1</h3>}
                    <p className="mt-1 text-sm text-white/80 font-mono">
                      CODE: {coupon.code}
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Usage: {coupon.usage}</span>
                    <span>Exp: {coupon.expiryDate}</span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredCoupons.length === 0 && (
            <div className="col-span-full flex h-40 items-center justify-center rounded-xl border-2 border-dashed text-muted-foreground">
              No promotions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
