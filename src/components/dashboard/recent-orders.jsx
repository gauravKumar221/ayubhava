'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';
import { orders } from '@/lib/data';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Completed':
      return <Badge className="bg-accent text-accent-foreground text-[10px] py-0">{status}</Badge>;
    case 'Processing':
      return <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-[10px] py-0">{status}</Badge>;
    case 'Pending':
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-[10px] py-0">{status}</Badge>;
    default:
      return <Badge variant="secondary" className="text-[10px] py-0">{status}</Badge>;
  }
};

export function RecentOrders() {
  return (
    <Card className="h-full border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Recent Orders</CardTitle>
          <CardDescription>Latest clinical transactions</CardDescription>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin-dashboard/orders">
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">{order.id}</p>
                  <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">{order.customer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">${order.total.toFixed(2)}</p>
                <div className="mt-1">
                  {getStatusBadge(order.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-8 text-xs font-bold uppercase tracking-wider" asChild>
          <Link href="/admin-dashboard/orders">View All Orders</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
