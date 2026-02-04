'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Trash2, Edit } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Profile" description="Manage your account settings and view complete details." />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@bitmax.com" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Save Changes</Button>
              <Button variant="outline" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground">
                <Edit className="mr-2 h-4 w-4" /> Edit Detailed Profile
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password. It's a good idea to use a strong password
                that you're not using elsewhere.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Login method and security information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Login Method</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    <Mail className="mr-1.5 h-3 w-3" /> Email & Password
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Alternate Login</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground italic flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Phone not linked
                  </span>
                </div>
              </div>
              <div className="space-y-1 pt-2 border-t">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Account Status</Label>
                <div>
                  <Badge className="bg-accent text-accent-foreground border-none">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-appointment">New appointments</Label>
                <Switch id="new-appointment" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-success">Successful payments</Label>
                <Switch id="payment-success" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="system-alerts">System alerts</Label>
                <Switch id="system-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-summary">Weekly summary email</Label>
                <Switch id="weekly-summary" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}