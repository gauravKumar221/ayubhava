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
  Trash2,
  ChevronDown,
  Layers,
  MoreHorizontal,
  Package,
  Tag,
  ChevronRight,
  ListTree,
  DollarSign,
  Box
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
        products: [],
        subSubcategories: [
          { 
            id: 'ss1', 
            name: 'Scalpels',
            products: []
          },
          { 
            id: 'ss2', 
            name: 'Forceps',
            products: []
          }
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
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeSubSubcategory, setActiveSubSubcategory] = useState(null);

  // Deletion confirmation
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Global Product List for the "Existing Product" dropdown
  const [allGlobalProducts, setAllGlobalProducts] = useState([]);

  const getUniqueProducts = (cats) => {
    const flattened = cats.flatMap(c => {
      const catProds = c.products || [];
      const subProds = (c.subcategories || []).flatMap(s => {
        const sProds = s.products || [];
        const ssProds = (s.subSubcategories || []).flatMap(ss => ss.products || []);
        return [...sProds, ...ssProds];
      });
      return [...catProds, ...subProds];
    });
    
    const uniqueMap = new Map();
    flattened.forEach(p => {
      const key = `${p.sku || ''}-${p.name || ''}`.toLowerCase();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, p);
      }
    });
    
    return Array.from(uniqueMap.values());
  };

  useEffect(() => {
    const saved = localStorage.getItem('bitmax_categories');
    if (saved) {
      const cats = JSON.parse(saved);
      setCategories(cats);
      setAllGlobalProducts(getUniqueProducts(cats));
    }
  }, []);

  const persistCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('bitmax_categories', JSON.stringify(newCategories));
    setAllGlobalProducts(getUniqueProducts(newCategories));
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
        const newSub = { id: Math.random().toString(36).substr(2, 9), name, subSubcategories: [], products: [] };
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
                    subSubcategories: [...(s.subSubcategories || []), { id: Math.random().toString(36).substr(2, 9), name, products: [] }]
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
      if (subSubcategoryId) {
        newCategories = categories.map(c => {
          if (c.id === categoryId) {
            return {
              ...c,
              subcategories: (c.subcategories || []).map(s => {
                if (s.id === subcategoryId) {
                  return {
                    ...s,
                    subSubcategories: (s.subSubcategories || []).map(ss => {
                      if (ss.id === subSubcategoryId) {
                        return { ...ss, products: (ss.products || []).filter(p => p.id !== productId) };
                      }
                      return ss;
                    })
                  };
                }
                return s;
              })
            };
          }
          return c;
        });
      } else if (subcategoryId) {
        newCategories = categories.map(c => {
          if (c.id === categoryId) {
            return {
              ...c,
              subcategories: (c.subcategories || []).map(s => {
                if (s.id === subcategoryId) {
                  return { ...s, products: (s.products || []).filter(p => p.id !== productId) };
                }
                return s;
              })
            };
          }
          return c;
        });
      } else {
        newCategories = categories.map(c => 
          c.id === categoryId ? { ...c, products: (c.products || []).filter(p => p.id !== productId) } : c
        );
      }
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
      let newCategories;
      if (activeSubSubcategory) {
        newCategories = categories.map(c => {
          if (c.id === activeCategory.id) {
            return {
              ...c,
              subcategories: (c.subcategories || []).map(s => {
                if (s.id === activeSubcategory.id) {
                  return {
                    ...s,
                    subSubcategories: (s.subSubcategories || []).map(ss => {
                      if (ss.id === activeSubSubcategory.id) {
                        return { ...ss, products: [...(ss.products || []), { ...selected, id: Math.random().toString(36).substr(2, 9) }] };
                      }
                      return ss;
                    })
                  };
                }
                return s;
              })
            };
          }
          return c;
        });
      } else if (activeSubcategory) {
        newCategories = categories.map(c => {
          if (c.id === activeCategory.id) {
            return {
              ...c,
              subcategories: (c.subcategories || []).map(s => {
                if (s.id === activeSubcategory.id) {
                  return { ...s, products: [...(s.products || []), { ...selected, id: Math.random().toString(36).substr(2, 9) }] };
                }
                return s;
              })
            };
          }
          return c;
        });
      } else {
        newCategories = categories.map(c => {
          if (c.id === activeCategory.id) {
            return { ...c, products: [...(c.products || []), { ...selected, id: Math.random().toString(36).substr(2, 9) }] };
          }
          return c;
        });
      }
      persistCategories(newCategories);
      setIsProductDialogOpen(false);
      setActiveSubcategory(null);
      setActiveSubSubcategory(null);
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

      {/* Subcategory Dialog */}
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

      {/* Sub-Subcategory Dialog */}
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

      {/* Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={(open) => {
        setIsProductDialogOpen(open);
        if (!open) {
          setActiveSubcategory(null);
          setActiveSubSubcategory(null);
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Product</DialogTitle>
            <DialogDescription className="text-xs">
              Select a product from your collection to add to <strong>{activeSubSubcategory ? activeSubSubcategory.name : activeSubcategory ? activeSubcategory.name : activeCategory?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div>
              <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Search Collection</Label>
              <Select onValueChange={handleSelectExistingProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Search clinical items..." />
                </SelectTrigger>
                <SelectContent>
                  {allGlobalProducts.length > 0 ? (
                    allGlobalProducts.map(p => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} {p.sku ? `(${p.sku})` : ''}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-xs text-muted-foreground text-center">No existing products found</div>
                  )}
                </SelectContent>
              </Select>
            </div>
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
                        <DropdownMenuItem onClick={() => { setActiveCategory(category); setActiveSubcategory(null); setActiveSubSubcategory(null); setIsProductDialogOpen(true); }}>
                          <Package className="mr-2 h-4 w-4" /> Add Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
                          <div key={sub.id} className="rounded-xl border bg-background p-5 shadow-sm space-y-5">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-md flex items-center gap-2">
                                <ChevronRight className="h-4 w-4 text-primary" />
                                {sub.name}
                              </h4>
                              <div className="flex items-center gap-1.5">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openSubSubDialog(category, sub)} title="Add Sub-Subcategory">
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setActiveCategory(category); setActiveSubcategory(sub); setActiveSubSubcategory(null); setIsProductDialogOpen(true); }} title="Add Product to Subcategory">
                                  <Package className="h-4 w-4 text-accent" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { setItemToDelete({ type: 'subcategory', categoryId: category.id, subcategoryId: sub.id }); setIsDeleteDialogOpen(true); }}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Sub-Subcategories section */}
                            {sub.subSubcategories && sub.subSubcategories.length > 0 && (
                              <div className="pl-6 space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                                  <ListTree className="h-3 w-3" /> Sub-Subcategories
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                  {sub.subSubcategories.map((ss) => (
                                    <div key={ss.id} className="flex flex-col p-3 rounded-lg bg-muted/20 border border-border/50 group/ss transition-colors hover:bg-muted/40">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold">{ss.name}</span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover/ss:opacity-100 transition-opacity">
                                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setActiveCategory(category); setActiveSubcategory(sub); setActiveSubSubcategory(ss); setIsProductDialogOpen(true); }} title="Add Product to Sub-Subcategory">
                                            <Package className="h-3.5 w-3.5 text-accent" />
                                          </Button>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => { setItemToDelete({ type: 'subsubcategory', categoryId: category.id, subcategoryId: sub.id, subSubcategoryId: ss.id }); setIsDeleteDialogOpen(true); }}>
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                      
                                      {/* Products in Sub-Subcategory section */}
                                      {ss.products && ss.products.length > 0 && (
                                        <div className="space-y-1.5 mt-2 pt-2 border-t border-border/40">
                                          {ss.products.map(p => (
                                            <div key={p.id} className="flex items-center justify-between text-[10px] group/ssp">
                                              <div className="flex items-center gap-1 truncate max-w-[70%]">
                                                <Box className="h-2.5 w-2.5 text-muted-foreground/60" />
                                                <span className="font-medium truncate">{p.name}</span>
                                              </div>
                                              <div className="flex items-center gap-1.5">
                                                <span className="font-bold text-primary">${p.price?.toFixed(2)}</span>
                                                <button 
                                                  onClick={() => { setItemToDelete({ type: 'product', categoryId: category.id, subcategoryId: sub.id, subSubcategoryId: ss.id, productId: p.id }); setIsDeleteDialogOpen(true); }}
                                                  className="text-destructive opacity-0 group-hover/ssp:opacity-100 transition-opacity"
                                                >
                                                  <Trash2 className="h-2.5 w-2.5" />
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Products in Subcategory section */}
                            {sub.products && sub.products.length > 0 && (
                              <div className="pl-6 space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                                  <Package className="h-3 w-3" /> Products in {sub.name}
                                </p>
                                <div className="space-y-2">
                                  {sub.products.map((p) => (
                                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/5 group/prod transition-colors hover:bg-muted/10">
                                      <div className="flex flex-1 items-center gap-6">
                                        <span className="text-sm font-bold flex-1">{p.name}</span>
                                        <span className="text-xs font-mono text-muted-foreground/70 hidden sm:block w-32">{p.sku}</span>
                                        <span className="text-sm font-extrabold text-primary w-24 text-right">${p.price?.toFixed(2)}</span>
                                      </div>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover/prod:opacity-100 transition-opacity ml-4" onClick={() => { setItemToDelete({ type: 'product', categoryId: category.id, subcategoryId: sub.id, productId: p.id }); setIsDeleteDialogOpen(true); }}>
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!category.subcategories || category.subcategories.length === 0) && (
                          <div className="text-center py-6 border-2 border-dashed rounded-xl text-muted-foreground text-xs italic bg-muted/5">
                            No subcategories defined.
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="bg-border/50" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <Package className="h-4 w-4 text-accent" /> Direct Category Products (General)
                      </div>
                      {category.products && category.products.length > 0 ? (
                        <div className="space-y-2">
                          {category.products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-4 rounded-xl border bg-background group/gen transition-all hover:shadow-sm">
                              <div className="flex flex-1 items-center gap-6">
                                <span className="text-sm font-bold flex-1">{product.name}</span>
                                <span className="text-xs font-mono text-muted-foreground/70 hidden sm:block w-32">{product.sku || 'N/A'}</span>
                                <span className="text-sm font-extrabold text-primary w-24 text-right">${product.price?.toFixed(2)}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover/gen:opacity-100 transition-opacity ml-4" onClick={() => { setItemToDelete({ type: 'product', categoryId: category.id, productId: product.id }); setIsDeleteDialogOpen(true); }}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-xl text-muted-foreground text-xs italic bg-muted/5">
                          No general products listed. Click the category menu to add products.
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
