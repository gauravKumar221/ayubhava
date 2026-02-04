'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  MoreVertical,
  Circle,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const initialNotifications = [
  {
    id: '1',
    orderId: 'ORD-7721',
    title: 'New Order Received',
    message: 'Sarah Johnson placed a new order for 3 clinical items (ORD-7721).',
    time: new Date().toISOString(),
    type: 'order',
    read: false,
  },
  {
    id: '2',
    orderId: 'ORD-7722',
    title: 'Order Completed',
    message: 'Order ORD-7722 for Michael Smith has been marked as completed.',
    time: new Date(Date.now() - 3600000).toISOString(),
    type: 'order',
    read: false,
  },
  {
    id: '3',
    orderId: 'ORD-7723',
    title: 'Payment Confirmed',
    message: 'Payment for order ORD-7723 from Emily Davis has been confirmed.',
    time: new Date(Date.now() - 86400000).toISOString(),
    type: 'payment',
    read: true,
  },
  {
    id: '4',
    orderId: 'ORD-7724',
    title: 'Order Cancelled',
    message: 'David Wilson cancelled their order (ORD-7724).',
    time: new Date(Date.now() - 172800000).toISOString(),
    type: 'order',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <PageHeader 
        title="Notifications" 
        description="Stay updated with order status and system alerts."
      >
        <Button variant="outline" size="sm" onClick={markAllRead}>
          Mark all as read
        </Button>
      </PageHeader>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card key={notification.id} className={cn(
              "transition-all border-none shadow-sm hover:bg-muted/50 relative overflow-hidden group",
              !notification.read ? "bg-primary/5 ring-1 ring-primary/10" : "bg-card"
            )}>
              <div className="flex">
                <Link 
                  href={`/admin-dashboard/orders/${notification.orderId}`}
                  className="flex-1 p-4 flex gap-4 no-underline text-inherit"
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    notification.type === 'order' ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                  )}>
                    {notification.type === 'order' ? <ShoppingCart className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{notification.title}</h4>
                        {!notification.read && <Circle className="h-2 w-2 fill-primary text-primary" />}
                      </div>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>

                <div className="flex items-center p-4 pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleRead(notification.id)}>
                        {notification.read ? 'Mark as unread' : 'Mark as read'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
            <Bell className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="font-bold">No notifications</p>
              <p className="text-sm text-muted-foreground">You're all caught up!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
