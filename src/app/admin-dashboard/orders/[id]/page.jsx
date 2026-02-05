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
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  Ban,
  Scan,
  RefreshCw,
  Wallet
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock data generator for the demo
const getOrderDetails = (id) => {
  const orders = {
    'RIT-7721': {
      id: 'RIT-7721',
      customer: 'Gaurav Kumar',
      email: 'princegauravaj@gmail.com',
      date: '2024-07-20T14:30:00Z',
      deliveryDate: '2024-07-24T10:00:00Z',
      total: 4447,
      status: 'Delivered',
      paymentStatus: 'Paid',
      shippingMethod: 'Express Delivery',
      items: [
        { id: 1, name: 'Deep Sleep Ritual - Restful Melts', sku: 'SLP-10', price: 599, quantity: 1 },
        { id: 2, name: 'Marine Collagen Peptides', sku: 'COL-250', price: 1899, quantity: 2 },
      ]
    }
  };
  return orders[id] || orders['RIT-7721'];
};

export default function AdminOrderDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;
  const initialOrder = getOrderDetails(orderId);
  
  const [mounted, setMounted] = useState(false);
  const [orderStatus, setOrderStatus] = useState(initialOrder.status);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    const savedStatus = localStorage.getItem(`order_status_${orderId}`);
    if (savedStatus) {
      setOrderStatus(savedStatus);
    }
  }, [orderId]);

  const updateStatus = (newStatus) => {
    setOrderStatus(newStatus);
    localStorage.setItem(`order_status_${orderId}`, newStatus);
    toast({
      title: "Status Updated",
      description: `Order ${orderId} is now ${newStatus}`,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
      case 'Delivered':
        return <Badge className="bg-accent text-accent-foreground">{status}</Badge>;
      case 'Return Requested':
      case 'Pickup Scheduled':
      case 'QC in Progress':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">{status}</Badge>;
      case 'Refund Approved':
      case 'Refund Processed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">{status}</Badge>;
      case 'Cancelled':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const isReturnFlow = orderStatus.startsWith('Return') || ['Pickup Scheduled', 'QC in Progress', 'Refund Approved', 'Refund Processed'].includes(orderStatus);

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
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{orderId}</h1>
              {getStatusBadge(orderStatus)}
            </div>
            <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
              <Calendar className="h-3 w-3" />
              Placed on {mounted ? format(new Date(initialOrder.date), 'MMM dd, yyyy') : '...'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Return Management Section */}
          {isReturnFlow && (
            <Card className="border-2 border-orange-100 bg-orange-50/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                      <RotateCcw className="h-5 w-5" /> Return Lifecycle Management
                    </CardTitle>
                    <CardDescription>Review and validate the ritual return request.</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-white border-orange-200 text-orange-700 font-bold uppercase text-[10px]">
                    Action Required
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white p-4 rounded-xl border border-orange-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider">Reason provided:</span>
                    <span className="font-bold text-orange-600">Damaged on arrival</span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    "The outer seal was broken and some tablets were crushed during transit. I am very disappointed."
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {orderStatus === 'Return Requested' && (
                    <>
                      <Button className="bg-orange-600 hover:bg-orange-700 h-12" onClick={() => updateStatus('Return Approved')}>
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Return
                      </Button>
                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 h-12" onClick={() => updateStatus('Return Rejected')}>
                        <Ban className="mr-2 h-4 w-4" /> Reject Request
                      </Button>
                    </>
                  )}
                  {orderStatus === 'Return Approved' && (
                    <Button className="col-span-full bg-blue-600 hover:bg-blue-700 h-12" onClick={() => updateStatus('Pickup Scheduled')}>
                      <Scan className="mr-2 h-4 w-4" /> Generate AWB (Shiprocket)
                    </Button>
                  )}
                  {orderStatus === 'Pickup Scheduled' && (
                    <Button className="col-span-full bg-primary hover:bg-primary/90 h-12" onClick={() => updateStatus('QC in Progress')}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Mark Received (QC Start)
                    </Button>
                  )}
                  {orderStatus === 'QC in Progress' && (
                    <Button className="col-span-full bg-green-600 hover:bg-green-700 h-12" onClick={() => updateStatus('Refund Approved')}>
                      <ShieldCheck className="mr-2 h-4 w-4" /> Approve Refund (QC Pass)
                    </Button>
                  )}
                  {orderStatus === 'Refund Approved' && (
                    <Button className="col-span-full bg-black hover:bg-black/90 text-white h-12" onClick={() => updateStatus('Refund Processed')}>
                      <Wallet className="mr-2 h-4 w-4 text-primary" /> Trigger Refund (Razorpay)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" /> Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {initialOrder.items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-primary">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">₹{item.price.toLocaleString()} x {item.quantity}</p>
                      <p className="text-xs font-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-muted/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{initialOrder.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-extrabold text-primary">₹{initialOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Customer Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {initialOrder.customer.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm">{initialOrder.customer}</p>
                  <p className="text-xs text-muted-foreground">{initialOrder.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Delivery Address</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {initialOrder.customer}<br />
                  Bihar Darbhanga Naka No 5, Darbhanga<br />
                  Bihar, 846004
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> Payment Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={initialOrder.paymentStatus === 'Paid' ? 'default' : 'secondary'} className={cn(initialOrder.paymentStatus === 'Paid' && "bg-accent text-accent-foreground")}>
                  {initialOrder.paymentStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Method</span>
                <span className="text-sm font-medium">UPI • Google Pay</span>
              </div>
              <Separator />
              <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Verified via Razorpay Gateway
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
