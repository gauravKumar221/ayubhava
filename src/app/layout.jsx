'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster.jsx';
import { Menu, Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Sidebar } from '@/components/layout/sidebar';
import { SidebarProvider, useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

function AppLayout({ children }) {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebar();

  // Admin shell is only shown for routes starting with /admin-dashboard
  const isAdminRoute = pathname?.startsWith('/admin-dashboard');

  if (!isAdminRoute) {
    return (
      <div className="min-h-screen w-full bg-background flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid min-h-screen w-full',
        isSidebarOpen
          ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'
          : 'md:grid-cols-[68px_1fr]'
      )}
    >
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SidebarToggleButton />
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full bg-background">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={getPlaceholderImage('user-avatar-1')?.imageUrl}
                      alt="Admin"
                      data-ai-hint={
                        getPlaceholderImage('user-avatar-1')?.imageHint
                      }
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
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
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarToggleButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="outline"
      size="icon"
      className="shrink-0"
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <SidebarProvider>
          <AppLayout>{children}</AppLayout>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}