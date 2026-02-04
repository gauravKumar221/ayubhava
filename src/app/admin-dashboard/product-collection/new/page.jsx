'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  Upload, 
  Image as ImageIcon, 
  Video as VideoIcon,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Type,
  Search,
  Plus,
  Trash2,
  Edit,
  ChevronDown,
  Check
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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

  return (
    <div className="flex flex-col rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <div className="flex items-center gap-1 border-b bg-muted/20 p-1.5 flex-wrap">
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('bold')} className="h-8 w-8 p-0" title="Bold"><Bold className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('italic')} className="h-8 w-8 p-0" title="Italic"><Italic className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('underline')} className="h-8 w-8 p-0" title="Underline"><Underline className="h-4 w-4" /></Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('insertUnorderedList')} className="h-8 w-8 p-0" title="Bullet List"><List className="h-4 w-4" /></Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('insertOrderedList')} className="h-8 w-8 p-0" title="Numbered List"><ListOrdered className="h-4 w-4" /></Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-[150px] p-4 outline-none prose prose-sm max-w-none dark:prose-invert overflow-y-auto"
        data-placeholder={placeholder}
      />
    </div>
  );
};

function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [productName, setProductName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0.00');
  const [sku, setSku] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const [conditions, setConditions] = useState([
    { id: Date.now(), field: 'tag', operator: 'equals', value: '' }
  ]);
  
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('bitmax_categories');
    if (saved) {
      const parsedCategories = JSON.parse(saved);
      setCategories(parsedCategories);
      
      if (productId) {
        let foundProduct = null;
        let foundCategoryIds = [];
        
        for (const cat of parsedCategories) {
          const prod = (cat.products || []).find(p => p.id === productId);
          if (prod) {
            foundProduct = prod;
            foundCategoryIds.push(cat.id);
          }
          
          for (const sub of (cat.subcategories || [])) {
            const sprod = (sub.products || []).find(p => p.id === productId);
            if (sprod) {
              foundProduct = sprod;
              if (!foundCategoryIds.includes(cat.id)) foundCategoryIds.push(cat.id);
            }
            for (const ss of (sub.subSubcategories || [])) {
              const ssprod = (ss.products || []).find(p => p.id === productId);
              if (ssprod) {
                foundProduct = ssprod;
                if (!foundCategoryIds.includes(cat.id)) foundCategoryIds.push(cat.id);
              }
            }
          }
        }
        
        if (foundProduct) {
          setProductName(foundProduct.name || '');
          setTitle(foundProduct.title || foundProduct.name || '');
          setDescription(foundProduct.description || '');
          setPrice((foundProduct.price || 0).toFixed(2));
          setSku(foundProduct.sku || '');
          setSelectedCategories(foundCategoryIds);
          setSelectedImages(foundProduct.images || []);
          setSelectedVideos(foundProduct.videos || []);
          
          if (foundProduct.tags && foundProduct.tags.length > 0) {
            setConditions(foundProduct.tags.map((tag, idx) => ({
              id: Date.now() + idx,
              field: 'tag',
              operator: 'equals',
              value: tag
            })));
          }
        }
      }
    }
  }, [productId]);

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

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedVideos(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setSelectedVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now(), field: 'tag', operator: 'equals', value: '' }
    ]);
  };

  const handleRemoveCondition = (id) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(c => c.id !== id));
    }
  };

  const handleConditionChange = (id, field, value) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleSave = () => {
    if (!productName || selectedCategories.length === 0) {
      alert("Please provide a product name and select at least one category.");
      return;
    }

    setIsSaving(true);

    try {
      const currentId = productId || Math.random().toString(36).substr(2, 9);
      const productData = {
        id: currentId,
        name: productName,
        title: title || productName,
        sku: sku,
        price: parseFloat(price) || 0,
        description: description,
        images: selectedImages,
        videos: selectedVideos,
        tags: conditions.map(c => c.value).filter(v => v)
      };

      const updatedCategories = categories.map(c => {
        const updateProductList = (list = []) => {
          return (list || []).filter(p => p.id !== currentId);
        };

        let currentCategory = { ...c };
        currentCategory.products = updateProductList(currentCategory.products);
        currentCategory.subcategories = (currentCategory.subcategories || []).map(s => {
          let currentSub = { ...s };
          currentSub.products = updateProductList(currentSub.products);
          currentSub.subSubcategories = (currentSub.subSubcategories || []).map(ss => {
            let currentSS = { ...ss };
            currentSS.products = updateProductList(currentSS.products);
            return currentSS;
          });
          return currentSub;
        });

        if (selectedCategories.includes(c.id)) {
          currentCategory.products = [...(currentCategory.products || []), productData];
        }
        
        return currentCategory;
      });

      localStorage.setItem('bitmax_categories', JSON.stringify(updatedCategories));
      window.dispatchEvent(new Event('storage'));
      router.push('/admin-dashboard/product-collection');
    } catch (error) {
      console.error('Save failed:', error);
      if (error.name === 'QuotaExceededError') {
        alert("The storage limit has been exceeded. This is likely because the video or image files are too large for browser storage. Please try using smaller files.");
      } else {
        alert("An error occurred while saving. Please check the console for details.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const stripHtml = (html) => {
    if (typeof document === 'undefined') return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const seoDescription = stripHtml(description).trim() || 'Add a title and description to see how this product might appear in a search engine listing.';

  const selectedCategoryObjects = categories.filter(c => selectedCategories.includes(c.id));

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin-dashboard/product-collection">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {productId ? 'Edit Product' : 'Add Product'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild disabled={isSaving}>
            <Link href="/admin-dashboard/product-collection">Discard</Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : (productId ? 'Save Changes' : 'Save Product')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input 
                  id="productName" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Premium Stethoscope" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Page Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Premium Stethoscope | Clinical Equipment" 
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <RichTextEditor value={description} onChange={setDescription} placeholder="Write detailed product description..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Images</Label>
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
                    <span className="text-[10px] text-muted-foreground font-medium">Add Image</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                  <VideoIcon className="h-3 w-3" /> Videos
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedVideos.map((video, index) => (
                    <div key={index} className="relative aspect-square rounded-lg border overflow-hidden group bg-black">
                      <video src={video} className="h-full w-full object-cover" controls />
                      <button 
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div 
                    className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    <Plus className="h-6 w-6 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-medium">Add Video</span>
                  </div>
                </div>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                multiple 
                onChange={handleImageChange} 
              />
              <input 
                type="file" 
                ref={videoInputRef} 
                className="hidden" 
                accept="video/*" 
                multiple 
                onChange={handleVideoChange} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {conditions.map((condition) => (
                  <div key={condition.id} className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full md:w-[200px] justify-between">
                          {condition.field.charAt(0).toUpperCase() + condition.field.slice(1)}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px]">
                        {['tag', 'title', 'price', 'weight', 'color', 'height'].map((f) => (
                          <DropdownMenuCheckboxItem
                            key={f}
                            checked={condition.field === f}
                            onCheckedChange={() => handleConditionChange(condition.id, 'field', f)}
                          >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full md:w-[200px] justify-between">
                          {condition.operator === 'equals' ? 'is equal to' : 'contains'}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px]">
                        <DropdownMenuCheckboxItem
                          checked={condition.operator === 'equals'}
                          onCheckedChange={() => handleConditionChange(condition.id, 'operator', 'equals')}
                        >
                          is equal to
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={condition.operator === 'contains'}
                          onCheckedChange={() => handleConditionChange(condition.id, 'operator', 'contains')}
                        >
                          contains
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Input 
                      placeholder="Condition value" 
                      className="flex-1"
                      value={condition.value}
                      onChange={(e) => handleConditionChange(condition.id, 'value', e.target.value)}
                    />
                    {conditions.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveCondition(condition.id)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={handleAddCondition}>
                <Plus className="mr-2 h-3 w-3" /> Add another condition
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Search engine listing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-2 p-4 rounded-lg bg-muted/30 border border-dashed flex flex-col gap-1">
                <span className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                  {title || productName || 'Product Title'} - Healthcare Store
                </span>
                <span className="text-green-700 text-xs">
                  https://healthstore.com/products/{(productName || 'example').toLowerCase().replace(/\s+/g, '-')}
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
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Pricing & Identification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. SKU-12345" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Product Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Categories</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-auto min-h-10 text-left font-normal py-2 px-3">
                      <div className="flex flex-wrap gap-1">
                        {selectedCategoryObjects.length > 0 ? (
                          selectedCategoryObjects.map((cat) => (
                            <span key={cat.id} className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 group/tag">
                              {cat.name}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCategory(cat.id);
                                }}
                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                              >
                                <X className="h-2 w-2" />
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground">Select Categories</span>
                        )}
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[280px]" align="start">
                    <DropdownMenuLabel>Available Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.length > 0 ? (
                      categories.map(c => (
                        <DropdownMenuCheckboxItem
                          key={c.id}
                          checked={selectedCategories.includes(c.id)}
                          onCheckedChange={() => toggleCategory(c.id)}
                          onSelect={(e) => e.preventDefault()}
                        >
                          {c.name}
                        </DropdownMenuCheckboxItem>
                      ))
                    ) : (
                      <div className="p-2 text-xs text-muted-foreground italic">No categories found</div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Default product
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[240px]">
                  <DropdownMenuCheckboxItem checked>Default product</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Featured product</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Promotional layout</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-20">Loading...</div>}>
      <ProductForm />
    </Suspense>
  );
}
