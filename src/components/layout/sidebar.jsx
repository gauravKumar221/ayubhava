'use client';
import Link from 'next/link';
import {
  Building,
  CreditCard,
  Calendar,
  User,
  Home,
  Package,
  Tags,
  Newspaper,
  Users,
  Ticket,
  BookOpen,
  MessageSquare,
  ShoppingCart,
} from 'lucide-react';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const menuItems = [
  { href: '/admin-dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
  {
    href: '/admin-dashboard/orders',
    icon: <ShoppingCart className="h-4 w-4" />,
    label: 'Orders',
  },
  {
    href: '/admin-dashboard/categories',
    icon: <Tags className="h-4 w-4" />,
    label: 'Categories',
  },
  {
    href: '/admin-dashboard/products',
    icon: <Package className="h-4 w-4" />,
    label: 'Products',
  },
  {
    href: '/admin-dashboard/newsletter',
    icon: <Newspaper className="h-4 w-4" />,
    label: 'Newsletter',
  },
  {
    href: '/admin-dashboard/blog',
    icon: <BookOpen className="h-4 w-4" />,
    label: 'Blog Manager',
  },
  {
    href: '/admin-dashboard/subscribers',
    icon: <Users className="h-4 w-4" />,
    label: 'Subscribers',
  },
  {
    href: '/admin-dashboard/coupons',
    icon: <Ticket className="h-4 w-4" />,
    label: 'Coupons',
  },
  {
    href: '/admin-dashboard/contact-messages',
    icon: <MessageSquare className="h-4 w-4" />,
    label: 'Contact Messages',
  },
  {
    href: '/admin-dashboard/payments',
    icon: <CreditCard className="h-4 w-4" />,
    label: 'Payments',
  },
  {
    href: '/admin-dashboard/schedule',
    icon: <Calendar className="h-4 w-4" />,
    label: 'Schedule',
  },
  { href: '/admin-dashboard/profile', icon: <User className="h-4 w-4" />, label: 'Profile' },
];

const promos = [
  { title: 'Buy 2 Get 1', tag: 'Via Barcode Code' },
  { title: 'Discount 15%', tag: 'Via Credit Card' },
  { title: 'Discount 20%', tag: 'Special Offer' },
];

export function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'hidden border-r bg-muted/40 transition-all duration-300 md:block sticky top-0 h-screen overflow-hidden',
        isSidebarOpen ? 'w-[220px] lg:w-[280px]' : 'w-[68px]'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 shrink-0">
          <Link
            href="/admin-dashboard"
            className="flex items-center gap-2 font-semibold text-primary"
          >
            <Building className="h-6 w-6" />
            <span className={cn(!isSidebarOpen && 'hidden')}>Bit Max</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <TooltipProvider delayDuration={0}>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
              {menuItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50',
                        pathname === item.href && 'bg-muted text-primary',
                        !isSidebarOpen && 'justify-center'
                      )}
                    >
                      {item.icon}
                      <span className={cn(!isSidebarOpen && 'hidden')}>
                        {item.label}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  {!isSidebarOpen && (
                    <TooltipContent side="right" className="font-semibold">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>

          {isSidebarOpen && (
            <div className="mt-8 px-4 pb-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Promos
              </p>
              <Carousel className="w-full">
                <CarouselContent>
                  {promos.map((promo, index) => (
                    <CarouselItem key={index}>
                      <div className="flex h-24 flex-col justify-between rounded-xl bg-primary p-3 text-primary-foreground shadow-sm">
                        <span className="w-fit rounded-full bg-white/20 px-2 py-0.5 text-[10px] backdrop-blur-sm">
                          {promo.tag}
                        </span>
                        <p className="text-lg font-bold leading-tight">
                          {promo.title}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}