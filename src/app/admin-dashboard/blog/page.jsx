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
  Type,
  Tags,
  CheckCircle2
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { LazyImage } from '@/components/shared/lazy-image';

// Simple Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);

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

const initialCategories = [
  { id: 'cat-1', name: 'Health Tips' },
  { id: 'cat-2', name: 'Medical Research' },
  { id: 'cat-3', name: 'Hospital Updates' },
];

const initialBlogs = [
  { 
    id: '1', 
    title: 'Modern Healthcare Trends 2024', 
    description: 'Exploring the shift towards digital health and remote monitoring.', 
    content: '<p>Telemedicine is no longer just an option; it is a necessity. Artificial intelligence is being integrated into diagnostic tools at an unprecedented rate, helping clinicians identify issues earlier and with greater precision.</p><ul><li>Remote monitoring</li><li>AI Diagnostics</li><li>Patient Empowerment</li></ul>',
    author: 'Dr. Emily Carter',
    category: 'Medical Research',
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
    category: 'Hospital Updates',
    status: 'Draft', 
    date: '2024-07-25',
    image: null
  },
];

export default function BlogManagerPage() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  
  // Dialog controls
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  
  // Editing state
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingBlog) {
      setEditorContent(editingBlog.content);
    } else {
      setEditorContent('');
    }
  }, [editingBlog]);

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
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
      category: formData.get('category'),
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
    
    setIsBlogDialogOpen(false);
    setEditingBlog(null);
    setSelectedImage(null);
    setEditorContent('');
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('categoryName');

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, name } : c));
    } else {
      setCategories([...categories, { id: `cat-${Math.random().toString(36).substr(2, 9)}`, name }]);
    }
    
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const openEditBlogDialog = (blog) => {
    setEditingBlog(blog);
    setSelectedImage(blog.image);
    setEditorContent(blog.content);
    setIsBlogDialogOpen(true);
  };

  const openEditCategoryDialog = (category) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Blog Manager" 
        description="Organize categories and create medical articles for your community."
      >
        <div className="flex items-center gap-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Tags className="mr-2 h-4 w-4" /> Manage Categories
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSaveCategory}>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? 'Edit Category' : 'New Blog Category'}</DialogTitle>
                  <DialogDescription>
                    Create a label for grouping your health news and updates.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input 
                    id="categoryName" 
                    name="categoryName" 
                    defaultValue={editingCategory?.name} 
                    placeholder="e.g. Health Tips" 
                    required 
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">{editingCategory ? 'Update' : 'Create'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isBlogDialogOpen} onOpenChange={(open) => {
            setIsBlogDialogOpen(open);
            if (!open) {
              setEditingBlog(null);
              setSelectedImage(null);
              setEditorContent('');
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" /> New Blog Post
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
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue={editingBlog?.category} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                            <LazyImage src={selectedImage} alt="Preview" fill className="object-cover" />
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
        </div>
      </PageHeader>

      <Tabs defaultValue="posts" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles or categories..."
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
                    <LazyImage 
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
                  <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
                    <Badge className={cn(
                      "border-none shadow-sm backdrop-blur-md font-bold",
                      blog.status === 'Published' ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {blog.status}
                    </Badge>
                    <Badge variant="outline" className="bg-white/80 text-primary border-primary/20 backdrop-blur-sm">
                      {blog.category}
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
                    <Button variant="ghost" size="sm" onClick={() => openEditBlogDialog(blog)} className="h-8 text-xs font-semibold">
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
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Card key={cat.id} className="relative group transition-all hover:shadow-md border border-border/50">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Tags className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{cat.name}</h4>
                      <p className="text-[10px] text-muted-foreground">
                        {blogs.filter(b => b.category === cat.name).length} Articles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditCategoryDialog(cat)}>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteCategory(cat.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card 
              className="border-2 border-dashed border-muted-foreground/20 bg-muted/5 flex items-center justify-center h-[90px] cursor-pointer hover:bg-muted/10 transition-colors"
              onClick={() => setIsCategoryDialogOpen(true)}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Add Category</span>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
