'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  Printer, 
  Truck, 
  Package, 
  CreditCard, 
  User, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data generator for the demo
const getOrderDetails = (id) => {
  const orders = {
    'ORD-7721': {
      id: 'ORD-7721',
      customer: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      date: '2024-07-28T14:30:00Z',
      total: 245.50,
      status: 'Processing',
      paymentStatus: 'Paid',
      shippingMethod: 'Express Delivery',
      items: [
        { id: 1, name: 'Premium Stethoscope', sku: 'ST-500', price: 189.99, quantity: 1 },
        { id: 2, name: 'Disposable Masks (Box of 50)', sku: 'MASK-01', price: 25.00, quantity: 2 },
      ]
    },
    'ORD-7722': {
      id: 'ORD-7722',
      customer: 'Michael Smith',
      email: 'michael.s@example.com',
      date: '2024-07-28T15:45:00Z',
      total: 120.00,
      status: 'Completed',
      paymentStatus: 'Paid',
      shippingMethod: 'Standard Shipping',
      items: [
        { id: 3, name: 'Digital Thermometer', sku: 'TH-200', price: 120.00, quantity: 1 },
      ]
    },
    'ORD-7723': {
      id: 'ORD-7723',
      customer: 'Emily Davis',
      email: 'emily.d@example.com',
      date: '2024-07-27T10:15:00Z',
      total: 850.75,
      status: 'Pending',
      paymentStatus: 'Awaiting Payment',
      shippingMethod: 'Store Pickup',
      items: [
        { id: 4, name: 'Wheelchair - Model X', sku: 'MOB-01', price: 850.75, quantity: 1 },
      ]
    },
    'ORD-7724': {
      id: 'ORD-7724',
      customer: 'David Wilson',
      email: 'david.w@example.com',
      date: '2024-07-26T09:00:00Z',
      total: 45.00,
      status: 'Cancelled',
      paymentStatus: 'Refunded',
      shippingMethod: 'Standard Shipping',
      items: [
        { id: 5, name: 'Cotton Swabs (Large)', sku: 'CONS-05', price: 22.50, quantity: 2 },
      ]
    }
  };
  return orders[id] || orders['ORD-7721'];
};

export default function OrderDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;
  const order = getOrderDetails(orderId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-accent text-accent-foreground">{status}</Badge>;
      case 'Processing':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">{status}</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">{status}</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = mounted 
    ? format(new Date(order.date), 'MMMM dd, yyyy at hh:mm a') 
    : '...';

  const formattedInvoiceDate = mounted
    ? format(new Date(order.date), 'MMMM dd, yyyy')
    : '...';

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between no-print">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin-dashboard/orders">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{order.id}</h1>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
              <Calendar className="h-3 w-3" />
              Placed on {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Invoice
          </Button>
          <Button size="sm">
            Update Status
          </Button>
        </div>
      </div>

      {/* Print only Header (Hidden on screen) */}
      <div className="hidden print:block mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-primary">Bit Max Medical Supplies</h1>
            <p className="text-sm text-muted-foreground">123 Healthcare Ave, Suite 400</p>
            <p className="text-sm text-muted-foreground">Medical District, HC 54321</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">INVOICE</h2>
            <p className="text-sm font-bold">{order.id}</p>
            <p className="text-xs text-muted-foreground">{formattedInvoiceDate}</p>
          </div>
        </div>
        <Separator className="my-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden print:shadow-none print:border">
            <CardHeader className="bg-muted/30 print:bg-transparent">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-primary no-print" /> Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-primary no-print">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                      <p className="text-xs font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-muted/10 print:bg-transparent space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping ({order.shippingMethod})</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-extrabold text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm no-print">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" /> Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Method</p>
                  <p className="text-sm font-medium">{order.shippingMethod}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Tracking Number</p>
                  <p className="text-sm font-mono text-primary font-bold">TRK-772144</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm print:shadow-none print:border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary no-print" /> Customer Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold no-print">
                  {order.customer.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Billing & Shipping Address</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  123 Healthcare Ave, Suite 400<br />
                  Medical District, HC 54321
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm print:shadow-none print:border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary no-print" /> Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'} className={cn(order.paymentStatus === 'Paid' && "bg-accent text-accent-foreground")}>
                  {order.paymentStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium">Visa •••• 4242</span>
              </div>
              <Separator className="no-print" />
              <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-2 text-xs text-muted-foreground no-print">
                <AlertCircle className="h-4 w-4 text-primary" />
                This payment was processed securely.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Print Footer */}
      <div className="hidden print:block mt-12 text-center text-xs text-muted-foreground border-t pt-8">
        <p>Thank you for choosing Bit Max Medical Supplies.</p>
        <p>For support, contact support@bitmax.com or call +1 (555) 000-1234</p>
      </div>
    </div>
  );
}
