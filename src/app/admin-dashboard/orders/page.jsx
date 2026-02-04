'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  ShoppingCart, 
  MoreVertical, 
  Calendar, 
  ChevronDown,
  Eye,
  CheckCircle2,
  Package,
  XCircle,
  Truck
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const initialOrders = [
  {
    id: 'ORD-7721',
    customer: 'Sarah Johnson',
    date: '2024-07-28T14:30:00Z',
    total: 245.50,
    status: 'Processing',
    items: 3
  },
  {
    id: 'ORD-7722',
    customer: 'Michael Smith',
    date: '2024-07-28T15:45:00Z',
    total: 120.00,
    status: 'Completed',
    items: 1
  },
  {
    id: 'ORD-7723',
    customer: 'Emily Davis',
    date: '2024-07-27T10:15:00Z',
    total: 850.75,
    status: 'Pending',
    items: 5
  },
  {
    id: 'ORD-7724',
    customer: 'David Wilson',
    date: '2024-07-26T09:00:00Z',
    total: 45.00,
    status: 'Cancelled',
    items: 2
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

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

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Order Management" 
        description="Track and manage clinical supply orders and shipments."
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Order ID or Customer..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border">
          <ShoppingCart className="h-4 w-4 text-primary" />
          <span className="font-semibold">{orders.length}</span> Total Orders
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs font-bold">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{order.customer}</span>
                      <span className="text-[10px] text-muted-foreground">{order.items} items</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 text-primary" />
                      {mounted ? format(new Date(order.date), 'MMM dd, yyyy hh:mm a') : '...'}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Order Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin-dashboard/orders/${order.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => updateStatus(order.id, 'Processing')}>
                          <Truck className="mr-2 h-4 w-4 text-blue-500" /> Mark Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(order.id, 'Completed')}>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-accent" /> Mark Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => updateStatus(order.id, 'Cancelled')}>
                          <XCircle className="mr-2 h-4 w-4" /> Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground opacity-50">
                      <Package className="h-10 w-10 mb-2" />
                      <p>No orders found matching your search.</p>
                    </div>
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
