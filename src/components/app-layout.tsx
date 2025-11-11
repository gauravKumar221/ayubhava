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
  FileText,
  UserCog,
  Settings,
  LogOut,
  Hospital,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Button } from './ui/button';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/patients',
    label: 'Patients',
    icon: Users,
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
    href: '/reports',
    label: 'AI Reports',
    icon: FileText,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: UserCog,
  },
];

function MainSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
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
              !open &&
                'w-0 opacity-0 transition-all duration-300 ease-in-out'
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
                  !open &&
                    'w-0 opacity-0 transition-all duration-300 ease-in-out'
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
                  !open &&
                    'w-0 opacity-0 transition-all duration-300 ease-in-out'
                )}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <MainSidebar />
        <main className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Add search or other header content here */}
            </div>
          </header>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
