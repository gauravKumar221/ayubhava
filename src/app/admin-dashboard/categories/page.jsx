'use client';

import { useState, useEffect } from 'react';
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
  ChevronDown,
  Layers,
  MoreHorizontal,
  Package,
  Tag,
  ChevronRight,
  ListTree,
  Check
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

const initialCategories = [
  { 
    id: '1', 
    name: 'Instruments', 
    description: 'Medical tools and machinery', 
    subcategories: [
      { 
        id: 's1', 
        name: 'Surgical Tools',
        subSubcategories: [
          { id: 'ss1', name: 'Scalpels' },
          { id: 'ss2', name: 'Forceps' }
        ]
      }
    ],
    products: [
      { id: 'p1', name: 'Premium Stethoscope', sku: 'ST-500', price: 189.99 }
    ]
  }
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog controls
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubcategoryDialogOpen, setIsSubcategoryDialogOpen] = useState(false);
  const [isSubSubcategoryDialogOpen, setIsSubSubcategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  
  // Active items for context
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editingSubSubcategory, setEditingSubSubcategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  // Deletion confirmation
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Global Product List for the "Existing Product" dropdown
  const [allGlobalProducts, setAllGlobalProducts] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bitmax_categories');
    if (saved) {
      const cats = JSON.parse(saved);
      setCategories(cats);
      // Flatten all products for the dropdown
      const flattened = cats.flatMap(c => c.products || []);
      setAllGlobalProducts(flattened);
    }
  }, []);

  const persistCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('bitmax_categories', JSON.stringify(newCategories));
    // Flatten and update global products list
    const flattened = newCategories.flatMap(c => c.products || []);
    setAllGlobalProducts(flattened);
    window.dispatchEvent(new Event('storage'));
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const categoryData = {
      name: formData.get('name'),
      description: formData.get('description'),
    };

    let newCategories;
    if (editingCategory) {
      newCategories = categories.map(c => c.id === editingCategory.id ? { ...c, ...categoryData } : c);
    } else {
      newCategories = [...categories, { 
        ...categoryData, 
        id: Math.random().toString(36).substr(2, 9), 
        subcategories: [],
        products: []
      }];
    }
    persistCategories(newCategories);
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSaveSubcategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('subcategoryName');
    
    if (activeCategory) {
      let newCategories;
      if (editingSubcategory) {
        newCategories = categories.map(c => 
          c.id === activeCategory.id 
            ? { 
                ...c, 
                subcategories: (c.subcategories || []).map(s => 
                  s.id === editingSubcategory.id ? { ...s, name } : s
                ) 
              } 
            : c
        );
      } else {
        const newSub = { id: Math.random().toString(36).substr(2, 9), name, subSubcategories: [] };
        newCategories = categories.map(c => 
          c.id === activeCategory.id 
            ? { ...c, subcategories: [...(c.subcategories || []), newSub] } 
            : c
        );
      }
      persistCategories(newCategories);
    }
    setIsSubcategoryDialogOpen(false);
    setEditingSubcategory(null);
  };

  const handleSaveSubSubcategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('subSubName');
    
    if (activeCategory && activeSubcategory) {
      const newCategories = categories.map(c => {
        if (c.id === activeCategory.id) {
          return {
            ...c,
            subcategories: (c.subcategories || []).map(s => {
              if (s.id === activeSubcategory.id) {
                if (editingSubSubcategory) {
                  return {
                    ...s,
                    subSubcategories: (s.subSubcategories || []).map(ss => 
                      ss.id === editingSubSubcategory.id ? { ...ss, name } : ss
                    )
                  };
                } else {
                  return {
                    ...s,
                    subSubcategories: [...(s.subSubcategories || []), { id: Math.random().toString(36).substr(2, 9), name }]
                  };
                }
              }
              return s;
            })
          };
        }
        return c;
      });
      persistCategories(newCategories);
    }
    setIsSubSubcategoryDialogOpen(false);
    setEditingSubSubcategory(null);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      name: formData.get('productName'),
      sku: formData.get('sku'),
      price: parseFloat(formData.get('price') || '0'),
    };

    if (activeCategory) {
      let newCategories;
      if (editingProduct) {
        newCategories = categories.map(c => 
          c.id === activeCategory.id 
            ? { 
                ...c, 
                products: (c.products || []).map(p => 
                  p.id === editingProduct.id ? { ...p, ...productData } : p
                ) 
              } 
            : c
        );
      } else {
        const newProd = { ...productData, id: Math.random().toString(36).substr(2, 9) };
        newCategories = categories.map(c => 
          c.id === activeCategory.id 
            ? { ...c, products: [...(c.products || []), newProd] } 
            : c
        );
      }
      persistCategories(newCategories);
    }
    setIsProductDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    const { type, categoryId, subcategoryId, subSubcategoryId, productId } = itemToDelete;

    let newCategories;
    if (type === 'category') {
      newCategories = categories.filter(c => c.id !== categoryId);
    } else if (type === 'subcategory') {
      newCategories = categories.map(c => 
        c.id === categoryId ? { ...c, subcategories: (c.subcategories || []).filter(s => s.id !== subcategoryId) } : c
      );
    } else if (type === 'subsubcategory') {
      newCategories = categories.map(c => {
        if (c.id === categoryId) {
          return {
            ...c,
            subcategories: (c.subcategories || []).map(s => 
              s.id === subcategoryId ? { ...s, subSubcategories: (s.subSubcategories || []).filter(ss => ss.id !== subSubcategoryId) } : s
            )
          };
        }
        return c;
      });
    } else if (type === 'product') {
      newCategories = categories.map(c => 
        c.id === categoryId ? { ...c, products: (c.products || []).filter(p => p.id !== productId) } : c
      );
    }
    persistCategories(newCategories);
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const openSubSubDialog = (category, subcategory, subSub = null) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setEditingSubSubcategory(subSub);
    setIsSubSubcategoryDialogOpen(true);
  };

  const handleSelectExistingProduct = (productId) => {
    const selected = allGlobalProducts.find(p => p.id === productId);
    if (selected && activeCategory) {
      const newCategories = categories.map(c => {
        if (c.id === activeCategory.id) {
          // Avoid duplicate SKUs in same category if desired, but here we just add
          return { ...c, products: [...(c.products || []), { ...selected, id: Math.random().toString(36).substr(2, 9) }] };
        }
        return c;
      });
      persistCategories(newCategories);
      setIsProductDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Category Management" 
        description="Organize clinical groupings, subcategories, sub-subcategories, and products."
      >
        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSaveCategory}>
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input id="name" name="name" defaultValue={editingCategory?.name} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingCategory?.description} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Dialog open={isSubcategoryDialogOpen} onOpenChange={setIsSubcategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveSubcategory}>
            <DialogHeader><DialogTitle>Subcategory</DialogTitle></DialogHeader>
            <div className="py-4">
              <Label>Name</Label>
              <Input name="subcategoryName" defaultValue={editingSubcategory?.name} required />
            </div>
            <DialogFooter><Button type="submit">Save</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubSubcategoryDialogOpen} onOpenChange={setIsSubSubcategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveSubSubcategory}>
            <DialogHeader><DialogTitle>Sub-Subcategory</DialogTitle></DialogHeader>
            <div className="py-4">
              <Label>Name</Label>
              <Input name="subSubName" defaultValue={editingSubSubcategory?.name} required />
            </div>
            <DialogFooter><Button type="submit">Save</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-6 py-4">
            <div>
              <Label className="mb-2 block">Quick Select Existing Product</Label>
              <Select onValueChange={handleSelectExistingProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select from collection..." />
                </SelectTrigger>
                <SelectContent>
                  {allGlobalProducts.length > 0 ? (
                    allGlobalProducts.map(p => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.sku})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-xs text-muted-foreground text-center">No existing products found</div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <form onSubmit={handleSaveProduct} className="grid gap-4">
              <DialogHeader><DialogTitle>{editingProduct ? 'Edit Product' : 'Create New Product'}</DialogTitle></DialogHeader>
              <div className="grid gap-2">
                <Label>Product Name</Label>
                <Input name="productName" placeholder="e.g. Stethoscope" defaultValue={editingProduct?.name} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>SKU</Label>
                  <Input name="sku" placeholder="SKU-123" defaultValue={editingProduct?.sku} />
                </div>
                <div className="grid gap-2">
                  <Label>Price ($)</Label>
                  <Input name="price" type="number" step="0.01" placeholder="0.00" defaultValue={editingProduct?.price} />
                </div>
              </div>
              <DialogFooter><Button type="submit" className="w-full">Add to {activeCategory?.name}</Button></DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Confirm Delete</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search categories..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="grid gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden border-none shadow-sm bg-card">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={category.id} className="border-none">
                <div className="flex items-center justify-between p-4 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setActiveCategory(category); setIsSubcategoryDialogOpen(true); }}>
                          <Plus className="mr-2 h-4 w-4" /> Add Subcategory
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveCategory(category); setIsProductDialogOpen(true); }}>
                          <Package className="mr-2 h-4 w-4" /> Add Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { setEditingCategory(category); setIsCategoryDialogOpen(true); }}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => { setItemToDelete({ type: 'category', categoryId: category.id }); setIsDeleteDialogOpen(true); }}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AccordionTrigger className="p-0 hover:no-underline" />
                  </div>
                </div>

                <AccordionContent className="bg-muted/30 px-6 pb-6 pt-2">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <Tag className="h-4 w-4 text-primary" /> Subcategories
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {(category.subcategories || []).map((sub) => (
                          <div key={sub.id} className="rounded-lg border bg-background p-4 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-md flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-primary" />
                                {sub.name}
                              </h4>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openSubSubDialog(category, sub)}>
                                  <Plus className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setActiveCategory(category); setEditingSubcategory(sub); setIsSubcategoryDialogOpen(true); }}>
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { setItemToDelete({ type: 'subcategory', categoryId: category.id, subcategoryId: sub.id }); setIsDeleteDialogOpen(true); }}>
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>

                            {sub.subSubcategories && sub.subSubcategories.length > 0 && (
                              <div className="pl-6 space-y-2">
                                <p className="text-[10px] font-bold uppercase text-muted-foreground/60 flex items-center gap-1">
                                  <ListTree className="h-3 w-3" /> Sub-Subcategories
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                  {sub.subSubcategories.map((ss) => (
                                    <div key={ss.id} className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border/50 group/ss">
                                      <span className="text-xs font-medium">{ss.name}</span>
                                      <div className="flex items-center opacity-0 group-hover/ss:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => openSubSubDialog(category, sub, ss)}>
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive" onClick={() => { setItemToDelete({ type: 'subsubcategory', categoryId: category.id, subcategoryId: sub.id, subSubcategoryId: ss.id }); setIsDeleteDialogOpen(true); }}>
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!category.subcategories || category.subcategories.length === 0) && (
                          <div className="text-center py-4 border border-dashed rounded-lg text-muted-foreground text-xs italic">
                            No subcategories defined.
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="bg-border/50" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <Package className="h-4 w-4 text-accent" /> Product Items in {category.name}
                      </div>
                      {category.products && category.products.length > 0 ? (
                        <Card className="border-none shadow-sm overflow-hidden">
                          <Table>
                            <TableHeader className="bg-muted/50">
                              <TableRow>
                                <TableHead className="h-10 text-xs font-bold uppercase">Name</TableHead>
                                <TableHead className="h-10 text-xs font-bold uppercase">SKU</TableHead>
                                <TableHead className="h-10 text-xs font-bold uppercase">Price</TableHead>
                                <TableHead className="text-right text-xs font-bold uppercase">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="bg-background">
                              {category.products.map((product) => (
                                <TableRow key={product.id}>
                                  <TableCell className="py-3 font-medium">{product.name}</TableCell>
                                  <TableCell className="py-3 font-mono text-xs">{product.sku || 'N/A'}</TableCell>
                                  <TableCell className="py-3 font-bold text-xs">${product.price.toFixed(2)}</TableCell>
                                  <TableCell className="py-3 text-right">
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setActiveCategory(category); setEditingProduct(product); setIsProductDialogOpen(true); }}>
                                      <Edit className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { setItemToDelete({ type: 'product', categoryId: category.id, productId: product.id }); setIsDeleteDialogOpen(true); }}>
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Card>
                      ) : (
                        <div className="text-center py-10 border border-dashed rounded-lg text-muted-foreground text-xs italic">
                          No product items listed. Click the menu to add products.
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
        {filteredCategories.length === 0 && (
          <div className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 text-muted-foreground">
            <p className="font-medium">No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
