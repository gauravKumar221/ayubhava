'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  UserCog,
  Settings,
  LogOut,
  Hospital,
  Search,
  ChevronLeft,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/payments',
    label: 'Payments',
    icon: CreditCard,
  },
  {
    href: '/schedule',
    label: 'Schedule',
    icon: Calendar,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: UserCog,
  },
];

function MainSidebar() {
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();
  const userAvatar = getPlaceholderImage('user-avatar-1');

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground',
              !open && 'h-8 w-8'
            )}
          >
            <Hospital className={cn(open && 'h-6 w-6')} />
          </div>
          <span
            className={cn(
              'text-xl font-semibold',
              !open && 'w-0 opacity-0 transition-all duration-300 ease-in-out'
            )}
          >
            Bit max
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={pathname === item.href}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton icon={<Settings />} tooltip="Settings">
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg p-2 transition-colors',
                open && 'bg-secondary'
              )}
            >
              <Avatar className="h-8 w-8">
                {userAvatar && (
                  <AvatarImage
                    src={userAvatar.imageUrl}
                    alt="Admin"
                    data-ai-hint={userAvatar.imageHint}
                  />
                )}
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'flex flex-col text-sm',
                  !open && 'w-0 opacity-0 transition-all duration-300 ease-in-out'
                )}
              >
                <span className="font-semibold">Admin</span>
                <span className="text-muted-foreground">admin@bitmax.com</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'ml-auto h-8 w-8',
                  !open && 'w-0 opacity-0 transition-all duration-300 ease-in-out'
                )}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-center"
              size="icon"
              onClick={toggleSidebar}
            >
              <ChevronLeft
                className={cn(
                  'h-6 w-6 transition-transform',
                  !open && 'rotate-180'
                )}
              />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const userAvatar = getPlaceholderImage('user-avatar-1');
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <MainSidebar />
        <main className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-full max-w-sm bg-background pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-9 w-9">
                    {userAvatar && (
                      <AvatarImage
                        src={userAvatar.imageUrl}
                        alt="Admin"
                        data-ai-hint={userAvatar.imageHint}
                      />
                    )}
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
