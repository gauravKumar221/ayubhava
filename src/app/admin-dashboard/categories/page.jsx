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
  PackagePlus,
  Layers,
  MoreHorizontal
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const initialCategories = [
  { 
    id: '1', 
    name: 'Instruments', 
    description: 'Medical tools and machinery', 
    productCount: 45,
    subcategories: [
      { id: 's1', name: 'Surgical Tools', productCount: 25 },
      { id: 's2', name: 'Diagnostic Scopes', productCount: 20 }
    ]
  },
  { 
    id: '2', 
    name: 'Consumables', 
    description: 'Single-use items like masks and gloves', 
    productCount: 120,
    subcategories: [
      { id: 's3', name: 'Protective Gear', productCount: 80 },
      { id: 's4', name: 'Sanitization', productCount: 40 }
    ]
  },
  { 
    id: '3', 
    name: 'Diagnostics', 
    description: 'Equipment for testing and analysis', 
    productCount: 8,
    subcategories: []
  },
  { 
    id: '4', 
    name: 'Mobility', 
    description: 'Aids for patient movement', 
    productCount: 10,
    subcategories: []
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubcategoryDialogOpen, setIsSubcategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

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
        productCount: 0,
        subcategories: []
      }]);
    }
    
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSaveSubcategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subName = formData.get('subcategoryName');
    
    if (activeCategory) {
      const newSub = {
        id: Math.random().toString(36).substr(2, 9),
        name: subName,
        productCount: 0
      };
      
      setCategories(categories.map(c => 
        c.id === activeCategory.id 
          ? { ...c, subcategories: [...c.subcategories, newSub] } 
          : c
      ));
    }
    
    setIsSubcategoryDialogOpen(false);
    setActiveCategory(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (activeCategory) {
      setCategories(categories.map(c => 
        c.id === activeCategory.id 
          ? { ...c, productCount: c.productCount + 1 } 
          : c
      ));
    }
    setIsProductDialogOpen(false);
    setActiveCategory(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const openSubcategoryDialog = (category) => {
    setActiveCategory(category);
    setIsSubcategoryDialogOpen(true);
  };

  const openAddProductDialog = (category) => {
    setActiveCategory(category);
    setIsProductDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Category Management" 
        description="Organize your products by clinical categories and subcategories."
      >
        <Dialog open={isCategoryDialogOpen} onOpenChange={(open) => {
          setIsCategoryDialogOpen(open);
          if (!open) setEditingCategory(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSaveCategory}>
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                <DialogDescription>
                  Define a main category for your medical products.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input id="name" name="name" defaultValue={editingCategory?.name} placeholder="e.g. Diagnostics" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    defaultValue={editingCategory?.description} 
                    placeholder="Brief description of clinical use..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingCategory ? 'Save Changes' : 'Create Category'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Add Subcategory Dialog */}
      <Dialog open={isSubcategoryDialogOpen} onOpenChange={setIsSubcategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveSubcategory}>
            <DialogHeader>
              <DialogTitle>New Subcategory for {activeCategory?.name}</DialogTitle>
              <DialogDescription>
                Add a specialized group under this category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subcategoryName">Subcategory Name</Label>
                <Input id="subcategoryName" name="subcategoryName" placeholder="e.g. MRI Accessories" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Subcategory</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddProduct}>
            <DialogHeader>
              <DialogTitle>Add Product to {activeCategory?.name}</DialogTitle>
              <DialogDescription>
                Quickly register a new item in this category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" placeholder="e.g. Premium Stethoscope" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="99.99" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Initial Stock</Label>
                  <Input id="stock" type="number" placeholder="50" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-all">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={category.id} className="border-none">
                  <div className="flex items-center justify-between p-4 sm:p-6 group">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Layers className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{category.name}</h3>
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-2 py-0">
                            {category.productCount} Products
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Management</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openAddProductDialog(category)}>
                            <PackagePlus className="mr-2 h-4 w-4 text-accent" /> Quick Add Product
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openSubcategoryDialog(category)}>
                            <Plus className="mr-2 h-4 w-4 text-primary" /> Add Subcategory
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(category)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                      </AccordionTrigger>
                    </div>
                  </div>

                  <AccordionContent className="bg-muted/30 px-6 pb-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subcategories</h4>
                        <Button variant="ghost" size="sm" onClick={() => openSubcategoryDialog(category)} className="h-7 text-xs px-2 text-primary">
                          <Plus className="h-3 w-3 mr-1" /> New Sub
                        </Button>
                      </div>
                      
                      {category.subcategories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {category.subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-3 rounded-md bg-background border shadow-sm group/sub">
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold">{sub.name}</span>
                                <span className="text-[10px] text-muted-foreground">{sub.productCount} items</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                <Edit className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 border-2 border-dashed rounded-lg text-muted-foreground">
                          <p className="text-xs italic">No subcategories defined for this section.</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
        {filteredCategories.length === 0 && (
          <div className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 text-muted-foreground bg-muted/5">
            <Layers className="h-10 w-10 mb-2 opacity-20" />
            <p className="font-medium">No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
