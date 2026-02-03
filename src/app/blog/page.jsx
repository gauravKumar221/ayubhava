'use client';

import { useState, useRef } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Image as ImageIcon,
  Upload,
  X,
  Calendar,
  User,
  FileText
} from 'lucide-react';
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
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const initialBlogs = [
  { 
    id: '1', 
    title: 'Modern Healthcare Trends 2024', 
    description: 'Exploring the shift towards digital health and remote monitoring.', 
    content: 'Telemedicine is no longer just an option; it is a necessity. Artificial intelligence is being integrated into diagnostic tools at an unprecedented rate, helping clinicians identify issues earlier and with greater precision.',
    author: 'Dr. Emily Carter',
    status: 'Published', 
    date: '2024-07-20',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: '2', 
    title: 'Top 5 Hospital Management Tips', 
    description: 'Efficiency is key to patient satisfaction. Here is how we optimize our workflows.', 
    content: '1. Digitize records immediately. 2. Automate scheduling. 3. Empower nursing staff. 4. Maintain a robust supply chain. 5. Prioritize patient feedback loops.',
    author: 'Admin',
    status: 'Draft', 
    date: '2024-07-25',
    image: null
  },
];

export default function BlogManagerPage() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      content: formData.get('content'),
      status: formData.get('status') || 'Draft',
      author: 'Admin',
      date: editingBlog?.date || format(new Date(), 'yyyy-MM-dd'),
      image: selectedImage || null
    };

    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...b, ...blogData } : b));
    } else {
      setBlogs([...blogs, { ...blogData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    
    setIsDialogOpen(false);
    setEditingBlog(null);
    setSelectedImage(null);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const openEditDialog = (blog) => {
    setEditingBlog(blog);
    setSelectedImage(blog.image);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Blog Manager" 
        description="Create and manage your medical articles and health news."
      >
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingBlog(null);
            setSelectedImage(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Create Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSaveBlog}>
              <DialogHeader>
                <DialogTitle>{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</DialogTitle>
                <DialogDescription>
                  Draft your article with images and detailed content for your readers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input id="title" name="title" defaultValue={editingBlog?.title} placeholder="e.g. The Future of Medical AI" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Input id="description" name="description" defaultValue={editingBlog?.description} placeholder="Brief summary of the article" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingBlog?.status || 'Draft'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Cover Image</Label>
                    <div className="flex items-center gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" /> {selectedImage ? 'Change Image' : 'Upload Image'}
                      </Button>
                      {selectedImage && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setSelectedImage(null)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {selectedImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="content">Full Content / Main Points</Label>
                  <Textarea 
                    id="content" 
                    name="content" 
                    defaultValue={editingBlog?.content} 
                    className="min-h-[200px]" 
                    placeholder="Write the detailed article content here..." 
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">{editingBlog ? 'Save Changes' : 'Publish Article'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} className="group overflow-hidden flex flex-col h-full border-none shadow-md transition-all hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              {blog.image ? (
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary/40">
                  <ImageIcon className="h-12 w-12" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge className={cn(
                  "border-none shadow-sm backdrop-blur-md font-bold",
                  blog.status === 'Published' ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {blog.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <Calendar className="h-3 w-3 text-primary" />
                {blog.date}
                <span className="mx-1 opacity-50">•</span>
                <User className="h-3 w-3 text-primary" />
                {blog.author}
              </div>
              <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4 leading-relaxed">
                {blog.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                <Button variant="ghost" size="sm" onClick={() => openEditDialog(blog)} className="h-8 text-xs font-semibold">
                  <Edit className="mr-2 h-3.5 w-3.5" /> Edit Post
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteBlog(blog.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredBlogs.length === 0 && (
          <div className="col-span-full flex h-60 flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 text-muted-foreground bg-muted/5">
            <FileText className="h-10 w-10 mb-2 opacity-20" />
            <p className="font-medium">No blog posts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
