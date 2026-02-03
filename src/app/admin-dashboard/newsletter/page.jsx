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
  Plus, 
  Search, 
  Edit, 
  Trash2,
  ChevronDown,
  Send,
  FileText
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const initialNewsletters = [
  { id: '1', title: 'Monthly Health Update', subject: 'Stay Healthy this Summer', status: 'Sent', date: '2024-07-15' },
  { id: '2', title: 'New Equipment Arrival', subject: 'State-of-the-art MRI now available', status: 'Draft', date: '2024-07-20' },
  { id: '3', title: 'Community Wellness Clinic', subject: 'Free checkups next weekend!', status: 'Scheduled', date: '2024-08-01' },
];

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState(initialNewsletters);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState(null);

  const filteredNewsletters = newsletters.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveNewsletter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newsletterData = {
      title: formData.get('title'),
      subject: formData.get('subject'),
      content: formData.get('content'),
      status: formData.get('status') || 'Draft',
      date: new Date().toISOString().split('T')[0],
    };

    if (editingNewsletter) {
      setNewsletters(newsletters.map(n => n.id === editingNewsletter.id ? { ...newsletterData, id: n.id } : n));
    } else {
      setNewsletters([...newsletters, { ...newsletterData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    
    setIsDialogOpen(false);
    setEditingNewsletter(null);
  };

  const handleDeleteNewsletter = (id) => {
    setNewsletters(newsletters.filter(n => n.id !== id));
  };

  const openEditDialog = (newsletter) => {
    setEditingNewsletter(newsletter);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Newsletter Management" 
        description="Communicate updates and health tips to your patient community."
      >
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingNewsletter(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" /> Create Newsletter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleSaveNewsletter}>
              <DialogHeader>
                <DialogTitle>{editingNewsletter ? 'Edit Newsletter' : 'New Newsletter'}</DialogTitle>
                <DialogDescription>
                  Draft your message to be sent to your subscribers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Internal Title</Label>
                  <Input id="title" name="title" defaultValue={editingNewsletter?.title} placeholder="e.g. August Wellness Campaign" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input id="subject" name="subject" defaultValue={editingNewsletter?.subject} placeholder="e.g. 5 Tips for Better Sleep" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingNewsletter?.status || 'Draft'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    name="content" 
                    className="min-h-[200px]"
                    defaultValue={editingNewsletter?.content} 
                    placeholder="Write your newsletter content here..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingNewsletter ? 'Update Campaign' : 'Create Campaign'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search newsletters..."
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
                <TableHead>Campaign Title</TableHead>
                <TableHead>Subject Line</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNewsletters.map((newsletter) => (
                <TableRow key={newsletter.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {newsletter.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{newsletter.subject}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={newsletter.status === 'Sent' ? 'default' : newsletter.status === 'Scheduled' ? 'outline' : 'secondary'}
                      className={newsletter.status === 'Sent' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {newsletter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{newsletter.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          Actions
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Campaign Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openEditDialog(newsletter)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Content
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" /> {newsletter.status === 'Sent' ? 'Resend' : 'Send Now'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteNewsletter(newsletter.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Draft
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredNewsletters.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No newsletter campaigns found.
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