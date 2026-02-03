'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  ChevronDown,
  Ticket,
  Calendar as CalendarIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
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

const initialCoupons = [
  { id: '1', code: 'HEALTH20', type: 'Percentage', value: 20, expiryDate: '2024-12-31', usage: '45/100', status: 'Active' },
  { id: '2', code: 'CHECKUP50', type: 'Fixed Amount', value: 50, expiryDate: '2024-08-15', usage: '12/50', status: 'Active' },
  { id: '3', code: 'WELCOME10', type: 'Percentage', value: 10, expiryDate: '2024-01-01', usage: '100/100', status: 'Expired' },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const filteredCoupons = coupons.filter(c =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const couponData = {
      code: formData.get('code').toUpperCase(),
      type: formData.get('type'),
      value: parseFloat(formData.get('value')),
      expiryDate: formData.get('expiryDate'),
      usage: `0/${formData.get('limit') || '∞'}`,
      status: 'Active',
    };

    if (editingCoupon) {
      setCoupons(coupons.map(c => c.id === editingCoupon.id ? { ...couponData, id: c.id, usage: c.usage } : c));
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

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Coupon Management" 
        description="Create and manage discount codes for patient services."
      >
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingCoupon(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSaveCoupon}>
              <DialogHeader>
                <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'New Coupon'}</DialogTitle>
                <DialogDescription>
                  Define a new discount code for your medical center.
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
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" name="expiryDate" type="date" defaultValue={editingCoupon?.expiryDate} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="limit">Usage Limit</Label>
                  <Input id="limit" name="limit" type="number" placeholder="Leave empty for unlimited" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingCoupon ? 'Update Coupon' : 'Create Coupon'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by coupon code..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-bold">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-primary" />
                      {coupon.code}
                    </div>
                  </TableCell>
                  <TableCell>
                    {coupon.type === 'Percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      {coupon.expiryDate}
                    </div>
                  </TableCell>
                  <TableCell>{coupon.usage}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={coupon.status === 'Active' ? 'default' : 'secondary'}
                      className={coupon.status === 'Active' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {coupon.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          Actions
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Coupon Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openEditDialog(coupon)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCoupon(coupon.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Coupon
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCoupons.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No coupons found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
