'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  UserPlus, 
  Search, 
  Edit, 
  Trash2,
  ChevronDown,
  Mail,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const initialSubscribers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', status: 'Active', joinedDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@health.org', status: 'Active', joinedDate: '2024-02-20' },
  { id: '3', name: 'Robert Wilson', email: 'r.wilson@webmail.com', status: 'Unsubscribed', joinedDate: '2023-11-05' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@provider.net', status: 'Active', joinedDate: '2024-05-12' },
  { id: '5', name: 'Michael Brown', email: 'mbrown99@gmail.com', status: 'Active', joinedDate: '2024-06-01' },
];

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);

  const filteredSubscribers = subscribers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveSubscriber = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subscriberData = {
      name: formData.get('name'),
      email: formData.get('email'),
      status: formData.get('status') || 'Active',
      joinedDate: editingSubscriber?.joinedDate || new Date().toISOString().split('T')[0],
    };

    if (editingSubscriber) {
      setSubscribers(subscribers.map(s => s.id === editingSubscriber.id ? { ...subscriberData, id: s.id } : s));
    } else {
      setSubscribers([...subscribers, { ...subscriberData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    
    setIsDialogOpen(false);
    setEditingSubscriber(null);
  };

  const handleDeleteSubscriber = (id) => {
    setSubscribers(subscribers.filter(s => s.id !== id));
  };

  const toggleStatus = (id) => {
    setSubscribers(subscribers.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Unsubscribed' : 'Active' };
      }
      return s;
    }));
  };

  const openEditDialog = (subscriber) => {
    setEditingSubscriber(subscriber);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Email Subscribers" 
        description="Manage your patient mailing list and newsletter recipients."
      >
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingSubscriber(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <UserPlus className="mr-2 h-4 w-4" /> Add Subscriber
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSaveSubscriber}>
              <DialogHeader>
                <DialogTitle>{editingSubscriber ? 'Edit Subscriber' : 'New Subscriber'}</DialogTitle>
                <DialogDescription>
                  Enter the details of the patient or staff member subscribing to updates.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={editingSubscriber?.name} placeholder="e.g. Alice Johnson" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" defaultValue={editingSubscriber?.email} placeholder="e.g. alice@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Subscription Status</Label>
                  <Select name="status" defaultValue={editingSubscriber?.status || 'Active'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Unsubscribed">Unsubscribed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingSubscriber ? 'Update Subscriber' : 'Add Subscriber'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subscriber</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <span className="text-xs font-bold">{subscriber.name.charAt(0)}</span>
                      </div>
                      {subscriber.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {subscriber.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={subscriber.status === 'Active' ? 'default' : 'secondary'}
                      className={subscriber.status === 'Active' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {subscriber.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscriber.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Manage</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openEditDialog(subscriber)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(subscriber.id)}>
                          <Mail className="mr-2 h-4 w-4" /> 
                          {subscriber.status === 'Active' ? 'Unsubscribe' : 'Resubscribe'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteSubscriber(subscriber.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSubscribers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No subscribers found.
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