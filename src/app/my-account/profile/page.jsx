'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  ChevronRight,
  Sparkles,
  Camera
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function UserProfilePage() {
  const [mounted, setMounted] = useState(false);
  const avatar = getPlaceholderImage('user-avatar-1');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] font-body">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
        <div className="flex flex-col gap-12">
          {/* Page Header */}
          <div className="space-y-2">
            <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1">
              My Sanctuary
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
              Account <br /><span className="text-primary">Details.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 space-y-4">
              <nav className="flex flex-col gap-2">
                {[
                  { label: 'Profile Information', icon: <User className="h-4 w-4" />, active: true },
                  { label: 'Order History', icon: <ChevronRight className="h-4 w-4" />, href: '/my-account/orders' },
                  { label: 'Saved Rituals', icon: <ChevronRight className="h-4 w-4" />, href: '/wishlist' },
                  { label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
                  { label: 'Security', icon: <ShieldCheck className="h-4 w-4" /> },
                ].map((item) => (
                  <Button 
                    key={item.label}
                    variant={item.active ? "default" : "ghost"}
                    className={cn(
                      "justify-start h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest px-6",
                      item.active ? "bg-black text-white" : "text-muted-foreground hover:bg-white"
                    )}
                    asChild={!!item.href}
                  >
                    {item.href ? (
                      <Link href={item.href}>
                        {item.icon} <span className="ml-3">{item.label}</span>
                      </Link>
                    ) : (
                      <div className="flex items-center">
                        {item.icon} <span className="ml-3">{item.label}</span>
                      </div>
                    )}
                  </Button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-8">
              {/* Profile Card */}
              <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="bg-black text-white p-8 lg:p-12 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group cursor-pointer">
                      <Avatar className="h-32 w-32 border-4 border-white/20 shadow-2xl">
                        <AvatarImage src={avatar?.imageUrl} alt="User" />
                        <AvatarFallback className="bg-primary/20 text-white font-black text-4xl">G</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                      <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">Gaurav Kumar</h2>
                      <p className="text-white/60 font-medium flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest text-[10px]">
                        <Sparkles className="h-3 w-3 text-primary" /> Member Since July 2024
                      </p>
                    </div>
                  </div>
                  {/* Decorative Abstract */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                </CardHeader>
                <CardContent className="p-8 lg:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="Gaurav Kumar" className="h-14 pl-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="gaurav@example.com" className="h-14 pl-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="+91 9304987505" className="h-14 pl-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="Bihar, India" className="h-14 pl-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 font-bold" />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-muted/50" />

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="text-sm font-black uppercase tracking-widest">Wellness Preferences</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Tailor your rituals for better recommendations</p>
                    </div>
                    <Button variant="outline" className="rounded-none border-2 border-black font-black uppercase text-[10px] tracking-widest h-12 px-8 hover:bg-black hover:text-white transition-all">
                      Configure Rituals
                    </Button>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full h-16 bg-black text-white hover:bg-primary rounded-none font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all">
                      Save Sanctuary Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { cn } from '@/lib/utils';
import Link from 'next/link';
