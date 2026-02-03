'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  FileText,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Type
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

// Simple Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);

  // Sync internal editor HTML with the value prop only when it differs.
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleHeadingChange = (val) => {
    execCommand('formatBlock', val);
  };

  return (
    <div className="flex flex-col rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div className="flex items-center gap-1 border-b bg-muted/30 p-1.5 flex-wrap">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('bold')}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('italic')}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('underline')}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        
        <Select onValueChange={handleHeadingChange}>
          <SelectTrigger className="h-8 w-[120px] text-xs bg-transparent border-none hover:bg-muted focus:ring-0">
            <div className="flex items-center gap-2">
              <Type className="h-3.5 w-3.5" />
              <SelectValue placeholder="Heading" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p">Paragraph</SelectItem>
            <SelectItem value="h1">Heading 1</SelectItem>
            <SelectItem value="h2">Heading 2</SelectItem>
            <SelectItem value="h3">Heading 3</SelectItem>
            <SelectItem value="h4">Heading 4</SelectItem>
            <SelectItem value="h5">Heading 5</SelectItem>
            <SelectItem value="h6">Heading 6</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('insertUnorderedList')}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand('insertOrderedList')}
          className="h-8 w-8 p-0 hover:bg-muted"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-[250px] p-4 outline-none prose prose-sm max-w-none dark:prose-invert overflow-y-auto"
      />
    </div>
  );
};

const initialBlogs = [
  { 
    id: '1', 
    title: 'Modern Healthcare Trends 2024', 
    description: 'Exploring the shift towards digital health and remote monitoring.', 
    content: '<p>Telemedicine is no longer just an option; it is a necessity. Artificial intelligence is being integrated into diagnostic tools at an unprecedented rate, helping clinicians identify issues earlier and with greater precision.</p><ul><li>Remote monitoring</li><li>AI Diagnostics</li><li>Patient Empowerment</li></ul>',
    author: 'Dr. Emily Carter',
    status: 'Published', 
    date: '2024-07-20',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: '2', 
    title: 'Top 5 Hospital Management Tips', 
    description: 'Efficiency is key to patient satisfaction. Here is how we optimize our workflows.', 
    content: '<ol><li>Digitize records immediately.</li><li>Automate scheduling.</li><li>Empower nursing staff.</li><li>Maintain a robust supply chain.</li><li>Prioritize patient feedback loops.</li></ol>',
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
  const [editorContent, setEditorContent] = useState('');
  const fileInputRef = useRef(null);

  // Sync editor content when editing starts
  useEffect(() => {
    if (editingBlog) {
      setEditorContent(editingBlog.content);
    } else {
      setEditorContent('');
    }
  }, [editingBlog]);

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
      content: editorContent,
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
    setEditorContent('');
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const openEditDialog = (blog) => {
    setEditingBlog(blog);
    setSelectedImage(blog.image);
    setEditorContent(blog.content);
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
            setEditorContent('');
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Create Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSaveBlog}>
              <DialogHeader>
                <DialogTitle>{editingBlog ? 'Edit Blog Post' : 'New Blog Post'}</DialogTitle>
                <DialogDescription>
                  Draft your article with images and detailed content for your readers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Post Title</Label>
                      <Input id="title" name="title" defaultValue={editingBlog?.title} placeholder="e.g. The Future of Medical AI" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Short Description</Label>
                      <Input id="description" name="description" defaultValue={editingBlog?.description} placeholder="Brief summary of the article" required />
                    </div>
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
                  </div>
                  <div className="grid gap-2">
                    <Label>Cover Image</Label>
                    <div 
                      className="relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80 overflow-hidden"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {selectedImage ? (
                        <>
                          <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
                            <Upload className="h-8 w-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="h-10 w-10 opacity-50" />
                          <span className="text-sm">Click to upload cover image</span>
                        </div>
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

                <div className="grid gap-2">
                  <Label>Full Content / Main Points</Label>
                  <RichTextEditor 
                    value={editorContent} 
                    onChange={setEditorContent} 
                    placeholder="Write the detailed article content here..." 
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
