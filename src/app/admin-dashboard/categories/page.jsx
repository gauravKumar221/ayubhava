'use client';

import { useState } from 'react';
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
  DollarSign,
  ChevronRight,
  ListTree
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
      },
      { 
        id: 's2', 
        name: 'Diagnostic Scopes',
        subSubcategories: []
      }
    ],
    products: [
      { id: 'p1', name: 'Premium Stethoscope', sku: 'ST-500', price: 189.99 },
      { id: 'p2', name: 'Digital Thermometer', sku: 'TH-20', price: 24.50 }
    ]
  },
  { 
    id: '2', 
    name: 'Consumables', 
    description: 'Single-use items like masks and gloves', 
    subcategories: [
      { 
        id: 's3', 
        name: 'Protective Gear',
        subSubcategories: [
          { id: 'ss3', name: 'N95 Face Masks' },
          { id: 'ss4', name: 'Nitrile Gloves' }
        ]
      },
      { 
        id: 's4', 
        name: 'Sanitization',
        subSubcategories: []
      }
    ],
    products: [
      { id: 'p3', name: 'N95 Respirators (Pack)', sku: 'MSK-N95', price: 45.00 }
    ]
  },
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

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...categoryData } : c));
    } else {
      setCategories([...categories, { 
        ...categoryData, 
        id: Math.random().toString(36).substr(2, 9), 
        subcategories: [],
        products: []
      }]);
    }
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSaveSubcategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('subcategoryName');
    
    if (activeCategory) {
      if (editingSubcategory) {
        setCategories(categories.map(c => 
          c.id === activeCategory.id 
            ? { 
                ...c, 
                subcategories: c.subcategories.map(s => 
                  s.id === editingSubcategory.id ? { ...s, name } : s
                ) 
              } 
            : c
        ));
      } else {
        const newSub = { id: Math.random().toString(36).substr(2, 9), name, subSubcategories: [] };
        setCategories(categories.map(c => 
          c.id === activeCategory.id 
            ? { ...c, subcategories: [...c.subcategories, newSub] } 
            : c
        ));
      }
    }
    setIsSubcategoryDialogOpen(false);
    setEditingSubcategory(null);
  };

  const handleSaveSubSubcategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('subSubName');
    
    if (activeCategory && activeSubcategory) {
      setCategories(categories.map(c => {
        if (c.id === activeCategory.id) {
          return {
            ...c,
            subcategories: c.subcategories.map(s => {
              if (s.id === activeSubcategory.id) {
                if (editingSubSubcategory) {
                  return {
                    ...s,
                    subSubcategories: s.subSubcategories.map(ss => 
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
      }));
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
      if (editingProduct) {
        setCategories(categories.map(c => 
          c.id === activeCategory.id 
            ? { 
                ...c, 
                products: c.products.map(p => 
                  p.id === editingProduct.id ? { ...p, ...productData } : p
                ) 
              } 
            : c
        ));
      } else {
        const newProd = { ...productData, id: Math.random().toString(36).substr(2, 9) };
        setCategories(categories.map(c => 
          c.id === activeCategory.id 
            ? { ...c, products: [...c.products, newProd] } 
            : c
        ));
      }
    }
    setIsProductDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    const { type, categoryId, subcategoryId, subSubcategoryId, productId } = itemToDelete;

    if (type === 'category') {
      setCategories(categories.filter(c => c.id !== categoryId));
    } else if (type === 'subcategory') {
      setCategories(categories.map(c => 
        c.id === categoryId ? { ...c, subcategories: c.subcategories.filter(s => s.id !== subcategoryId) } : c
      ));
    } else if (type === 'subsubcategory') {
      setCategories(categories.map(c => {
        if (c.id === categoryId) {
          return {
            ...c,
            subcategories: c.subcategories.map(s => 
              s.id === subcategoryId ? { ...s, subSubcategories: s.subSubcategories.filter(ss => ss.id !== subSubcategoryId) } : s
            )
          };
        }
        return c;
      }));
    } else if (type === 'product') {
      setCategories(categories.map(c => 
        c.id === categoryId ? { ...c, products: c.products.filter(p => p.id !== productId) } : c
      ));
    }
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const openSubSubDialog = (category, subcategory, subSub = null) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setEditingSubSubcategory(subSub);
    setIsSubSubcategoryDialogOpen(true);
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

      {/* Other Dialogs */}
      <Dialog open={isSubcategoryDialogOpen} onOpenChange={setIsSubcategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveSubcategory}>
            <DialogHeader><DialogTitle>Subcategory</DialogTitle></DialogHeader>
            <div className="py-4"><Input name="subcategoryName" defaultValue={editingSubcategory?.name} required /></div>
            <DialogFooter><Button type="submit">Save</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubSubcategoryDialogOpen} onOpenChange={setIsSubSubcategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveSubSubcategory}>
            <DialogHeader><DialogTitle>Sub-Subcategory</DialogTitle></DialogHeader>
            <div className="py-4"><Input name="subSubName" defaultValue={editingSubSubcategory?.name} required /></div>
            <DialogFooter><Button type="submit">Save</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveProduct}>
            <DialogHeader><DialogTitle>Product Item</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <Input name="productName" placeholder="Name" defaultValue={editingProduct?.name} required />
              <Input name="sku" placeholder="SKU" defaultValue={editingProduct?.sku} />
              <Input name="price" type="number" step="0.01" placeholder="Price" defaultValue={editingProduct?.price} />
            </div>
            <DialogFooter><Button type="submit">Save</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Confirm Delete</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                    {/* Subcategories with Sub-Subcategories */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <Tag className="h-4 w-4 text-primary" /> Subcategories
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {category.subcategories.map((sub) => (
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

                            {/* Sub-Subcategories */}
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
                        {category.subcategories.length === 0 && (
                          <div className="text-center py-4 border border-dashed rounded-lg text-muted-foreground text-xs italic">
                            No subcategories defined.
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="bg-border/50" />

                    {/* Products */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <Package className="h-4 w-4 text-accent" /> Product Items
                      </div>
                      {category.products.length > 0 ? (
                        <Card className="border-none shadow-sm overflow-hidden">
                          <Table>
                            <TableHeader className="bg-muted/50">
                              <TableRow>
                                <TableHead className="h-10 text-xs font-bold uppercase">Name</TableHead>
                                <TableHead className="h-10 text-xs font-bold uppercase">SKU</TableHead>
                                <TableHead className="h-10 text-xs font-bold uppercase">Price</TableHead>
                                <TableHead className="h-10 text-right text-xs font-bold uppercase">Actions</TableHead>
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
                          No product items listed.
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
}
