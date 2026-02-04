'use client';
import Link from 'next/link';
import {
  Leaf,
  CreditCard,
  Home,
  Tags,
  Newspaper,
  Users,
  Ticket,
  BookOpen,
  MessageSquare,
  ShoppingBag,
  User,
  Package,
  Shield
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

export const menuItems = [
  { href: '/admin-dashboard', icon: <Home className="h-4 w-4" />, label: 'Overview' },
  {
    href: '/admin-dashboard/orders',
    icon: <ShoppingBag className="h-4 w-4" />,
    label: 'Wellness Orders',
  },
  {
    href: '/admin-dashboard/users',
    icon: <Shield className="h-4 w-4" />,
    label: 'Community',
  },
  {
    href: '/admin-dashboard/categories',
    icon: <Tags className="h-4 w-4" />,
    label: 'Wellness Lines',
  },
  {
    href: '/admin-dashboard/product-collection',
    icon: <Package className="h-4 w-4" />,
    label: 'Nutrition Shop',
  },
  {
    href: '/admin-dashboard/newsletter',
    icon: <Newspaper className="h-4 w-4" />,
    label: 'Wellness Mail',
  },
  {
    href: '/admin-dashboard/blog',
    icon: <BookOpen className="h-4 w-4" />,
    label: 'Insights Hub',
  },
  {
    href: '/admin-dashboard/subscribers',
    icon: <Users className="h-4 w-4" />,
    label: 'Followers',
  },
  {
    href: '/admin-dashboard/coupons',
    icon: <Ticket className="h-4 w-4" />,
    label: 'Ritual Promos',
  },
  {
    href: '/admin-dashboard/contact-messages',
    icon: <MessageSquare className="h-4 w-4" />,
    label: 'Inquiries',
  },
  {
    href: '/admin-dashboard/payments',
    icon: <CreditCard className="h-4 w-4" />,
    label: 'Revenue',
  },
  { href: '/admin-dashboard/profile', icon: <User className="h-4 w-4" />, label: 'My Account' },
];

export const promos = [
  { title: 'Ritual Bundle -15%', tag: 'Monthly Subscriber' },
  { title: 'Superfood Buy 2 Get 1', tag: 'New Customer' },
  { title: 'Free Vitality Guide', tag: 'Limited Offer' },
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
            className="flex items-center gap-2 font-bold text-primary"
          >
            <Leaf className="h-6 w-6" />
            <span className={cn(!isSidebarOpen && 'hidden')}>AYUBHYAVA</span>
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
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5',
                        pathname === item.href && 'bg-primary/10 text-primary',
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
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Current Rituals
              </p>
              <Carousel className="w-full">
                <CarouselContent>
                  {promos.map((promo, index) => (
                    <CarouselItem key={index}>
                      <div className="flex h-24 flex-col justify-between rounded-2xl bg-primary p-4 text-primary-foreground shadow-lg shadow-primary/10">
                        <span className="w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-bold backdrop-blur-sm uppercase tracking-wide">
                          {promo.tag}
                        </span>
                        <p className="text-md font-extrabold leading-tight">
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