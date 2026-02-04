'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, 
  Mail, 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Phone,
  Trash2,
  History,
  Smartphone,
  Info
} from 'lucide-react';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function UserProfileDetailPage({ params }) {
  const unwrappedParams = use(params);
  const userId = unwrappedParams?.id;
  
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (userId) {
      const foundUser = users.find(u => u.id === userId);
      setUser(foundUser || users[0]);
    }
  }, [userId]);

  if (!user) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  const avatar = getPlaceholderImage(user.avatarId);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-accent text-accent-foreground"><CheckCircle2 className="w-3 h-3 mr-1" /> {status}</Badge>;
      case 'Inactive':
        return <Badge variant="secondary"><XCircle className="w-3 h-3 mr-1" /> {status}</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50"><Clock className="w-3 h-3 mr-1" /> {status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin-dashboard/users">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{user.name}</h1>
              {getStatusBadge(user.status)}
            </div>
            <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-primary" />
              System Account • Joined {user.joinedDate}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-primary/5 pb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
                <AvatarFallback className="text-2xl font-bold">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="h-4 w-4" /> {user.email}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                  <Badge variant="secondary" className="bg-white/50 text-[10px] font-bold uppercase tracking-wider">
                    ID: {user.accountId || 'N/A'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" /> User Metadata
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Display Name</Label>
                    <p className="text-sm font-medium">{user.name}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Primary Email</Label>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Account Created</Label>
                    <p className="text-sm font-medium">{user.joinedDate}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" /> Session Activity
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Last Login</Label>
                    <p className="text-sm font-medium">{user.lastLogin || 'Unknown'}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Login Method</Label>
                    <div className="flex items-center gap-2">
                      {user.loginMethod === 'Phone' ? <Smartphone className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                      <p className="text-sm font-medium">{user.loginMethod || 'Email'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Auth Provider</Label>
                    <p className="text-sm font-medium">Internal Database</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent User Activity</CardTitle>
            <CardDescription>A log of the latest actions performed by this user.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Profile updated', time: '2 hours ago', icon: <Clock className="h-4 w-4" /> },
                { action: 'Logged in successfully', time: '5 hours ago', icon: <Shield className="h-4 w-4" /> },
                { action: 'Session started', time: 'Yesterday', icon: <History className="h-4 w-4" /> },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {log.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}