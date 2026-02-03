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
  Settings2
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
      />
    </div>
  );
};

export default function NewProductPage() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Logic to save product would go here
    router.push('/admin-dashboard/product-collection');
  };

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
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g. Premium Stethoscope, Surgical Masks Pack" />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <RichTextEditor value={description} onChange={setDescription} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Product type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="manual">
                <div className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value="manual" id="manual" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="manual" className="font-medium">Manual</Label>
                    <p className="text-xs text-muted-foreground">Add products to this collection one by one.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 mt-4">
                  <RadioGroupItem value="smart" id="smart" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="smart" className="font-medium">Smart</Label>
                    <p className="text-xs text-muted-foreground">Existing and future products that match the conditions you set will automatically be added.</p>
                  </div>
                </div>
              </RadioGroup>
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
              <p className="text-xs text-muted-foreground">Add a title and description to see how this product might appear in a search engine listing.</p>
              <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-dashed flex flex-col gap-1">
                <span className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">Product Title - Healthcare Store</span>
                <span className="text-green-700 text-xs">https://healthstore.com/products/example</span>
                <span className="text-muted-foreground text-xs line-clamp-2">This is an example description of the product showing how it will look on Google results.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
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
              <CardTitle className="text-sm font-semibold">Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-3 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <>
                    <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-full bg-background border shadow-sm">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-center px-4">
                      <Button variant="link" className="text-primary h-auto p-0">Add image</Button>
                      <p className="text-[10px] text-muted-foreground mt-1">or drop an image to upload</p>
                    </div>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
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
