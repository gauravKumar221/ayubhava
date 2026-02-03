'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ChevronLeft, 
  Upload, 
  Image as ImageIcon, 
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Type,
  ExternalLink,
  Search,
  Settings2,
  Plus,
  Edit
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);

  const execCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="flex flex-col rounded-md border border-input bg-background">
      <div className="flex items-center gap-1 border-b bg-muted/20 p-1.5 flex-wrap">
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('bold')} className="h-8 w-8 p-0"><Bold className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('italic')} className="h-8 w-8 p-0"><Italic className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('underline')} className="h-8 w-8 p-0"><Underline className="h-4 w-4" /></Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('insertUnorderedList')} className="h-8 w-8 p-0"><List className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('insertOrderedList')} className="h-8 w-8 p-0"><ListOrdered className="h-4 w-4" /></Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-[150px] p-4 outline-none prose prose-sm max-w-none dark:prose-invert"
        placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

export default function NewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImages(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    router.push('/admin-dashboard/product-collection');
  };

  // Helper to strip HTML tags for SEO preview
  const stripHtml = (html) => {
    return html.replace(/<[^>]*>?/gm, ' ');
  };

  const seoDescription = stripHtml(description).trim() || 'Add a title and description to see how this product might appear in a search engine listing.';

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin-dashboard/product-collection">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Add Product</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin-dashboard/product-collection">Discard</Link>
          </Button>
          <Button onClick={handleSave}>Save Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Premium Stethoscope, Surgical Masks Pack" 
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <RichTextEditor value={description} onChange={setDescription} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg border overflow-hidden group">
                    <Image src={img} alt={`Preview ${index}`} fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <div 
                  className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-medium">Add more</span>
                </div>
              </div>
              
              {selectedImages.length === 0 && (
                <div 
                  className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-10 w-10 text-muted-foreground/40 mb-2" />
                  <p className="text-sm font-medium">Add multiple images</p>
                  <p className="text-xs text-muted-foreground mt-1 text-center px-4">Drag and drop images here, or click to browse</p>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                multiple 
                onChange={handleImageChange} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Products must match:</span>
                <RadioGroup defaultValue="all" className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-cond" />
                    <Label htmlFor="all-cond" className="text-sm">all conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any-cond" />
                    <Label htmlFor="any-cond" className="text-sm">any condition</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select defaultValue="tag">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tag">Tag</SelectItem>
                    <SelectItem value="title">Product title</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="equals">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">is equal to</SelectItem>
                    <SelectItem value="contains">contains</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Condition value" />
              </div>
              <Button variant="outline" size="sm"><Plus className="mr-2 h-3 w-3" /> Add another condition</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Search engine listing</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-primary"><Edit className="h-3.5 w-3.5 mr-2" /> Edit</Button>
            </CardHeader>
            <CardContent>
              <div className="mt-2 p-4 rounded-lg bg-muted/30 border border-dashed flex flex-col gap-1">
                <span className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                  {title || 'Product Title'} - Healthcare Store
                </span>
                <span className="text-green-700 text-xs">
                  https://healthstore.com/products/{title.toLowerCase().replace(/\s+/g, '-') || 'example'}
                </span>
                <span className="text-muted-foreground text-xs line-clamp-2">
                  {seoDescription}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Publishing</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-primary">Manage</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sales channels</Label>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Online Store</span>
                  </div>
                  <Settings2 className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    <span>Point of Sale</span>
                  </div>
                  <Settings2 className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Product Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="instruments">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instruments">Instruments</SelectItem>
                    <SelectItem value="consumables">Consumables</SelectItem>
                    <SelectItem value="diagnostics">Diagnostics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="e.g. New, Featured, Medical" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Theme template</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default product</SelectItem>
                  <SelectItem value="featured">Featured product</SelectItem>
                  <SelectItem value="promo">Promotional layout</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
