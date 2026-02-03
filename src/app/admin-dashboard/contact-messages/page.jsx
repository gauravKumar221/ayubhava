'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Mail, 
  Trash2, 
  MoreVertical, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('contact_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initial mock data if empty
      const initialData = [
        {
          id: '1',
          name: 'Sarah Wilson',
          email: 'sarah.w@example.com',
          subject: 'Appointment Inquiry',
          message: 'I would like to schedule a cardiology checkup for next week.',
          date: new Date('2024-07-28T10:30:00').toISOString(),
          status: 'Unread'
        },
        {
          id: '2',
          name: 'Mark Thompson',
          email: 'mark.t@clinic.org',
          subject: 'Equipment Billing',
          message: 'Received an incorrect invoice for the surgical masks delivery.',
          date: new Date('2024-07-27T14:15:00').toISOString(),
          status: 'Read'
        }
      ];
      setMessages(initialData);
      localStorage.setItem('contact_messages', JSON.stringify(initialData));
    }

    // Listen for local storage changes (from the other page)
    const handleStorageChange = () => {
      const updated = localStorage.getItem('contact_messages');
      if (updated) setMessages(JSON.parse(updated));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredMessages = messages.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDelete = (id) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
  };

  const toggleReadStatus = (id) => {
    const updated = messages.map(m => 
      m.id === id ? { ...m, status: m.status === 'Read' ? 'Unread' : 'Read' } : m
    );
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Contact Messages" 
        description="Review and manage inquiries submitted through the contact form."
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="font-semibold">{messages.length}</span> Total Submissions
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender Information</TableHead>
                <TableHead>Subject & Content</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((msg) => (
                <TableRow key={msg.id} className={cn(msg.status === 'Unread' && "bg-primary/5 font-medium")}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{msg.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {msg.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold truncate">{msg.subject}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">{msg.message}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        {format(new Date(msg.date), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(msg.date), 'hh:mm a')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={msg.status === 'Read' ? 'secondary' : 'default'}
                      className={cn(
                        "text-[10px] px-2 py-0",
                        msg.status === 'Read' ? "" : "bg-primary text-primary-foreground"
                      )}
                    >
                      {msg.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Manage Inquiry</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleReadStatus(msg.id)}>
                          <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                          Mark as {msg.status === 'Read' ? 'Unread' : 'Read'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(msg.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredMessages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground opacity-50">
                      <Mail className="h-10 w-10 mb-2" />
                      <p>No contact messages found.</p>
                    </div>
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