'use client';

import { useState, useEffect } from 'react';
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
  Filter, 
  Edit, 
  Trash2,
  ChevronDown
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Mock category data with subcategories for the clinical inventory
const CATEGORY_MAP = {
  'Instruments': ['Surgical Tools', 'Diagnostic Scopes', 'Dental Tools'],
  'Consumables': ['Protective Gear', 'Sanitization', 'Syringes'],
  'Diagnostics': ['Testing Kits', 'Monitoring Devices'],
  'Mobility': ['Wheelchairs', 'Walking Aids'],
};

const initialProducts = [
  { 
    id: '1', 
    name: 'Premium Stethoscope', 
    categories: ['Instruments'], 
    subcategories: ['Diagnostic Scopes'], 
    price: 120.00, 
    stock: 45 
  },
  { 
    id: '2', 
    name: 'Surgical Masks (Box of 50)', 
    categories: ['Consumables'], 
    subcategories: ['Protective Gear'], 
    price: 25.00, 
    stock: 120 
  },
  { 
    id: '3', 
    name: 'Digital Thermometer', 
    categories: ['Diagnostics', 'Instruments'], 
    subcategories: ['Monitoring Devices', 'Diagnostic Scopes'], 
    price: 15.50, 
    stock: 8 
  },
  { 
    id: '4', 
    name: 'Wheelchair (Standard)', 
    categories: ['Mobility'], 
    subcategories: ['Wheelchairs'], 
    price: 350.00, 
    stock: 10 
  },
  { 
    id: '5', 
    name: 'Blood Pressure Monitor', 
    categories: ['Diagnostics'], 
    subcategories: ['Monitoring Devices'], 
    price: 65.00, 
    stock: 0 
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  useEffect(() => {
    if (editingProduct) {
      setSelectedCategories(editingProduct.categories || []);
      setSelectedSubcategories(editingProduct.subcategories || []);
    } else {
      setSelectedCategories([]);
      setSelectedSubcategories([]);
    }
  }, [editingProduct, isDialogOpen]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilterCategory === 'All' || product.categories.includes(selectedFilterCategory);
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      name: formData.get('name'),
      categories: selectedCategories,
      subcategories: selectedSubcategories,
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productData, id: p.id } : p));
    } else {
      setProducts([...products, { ...productData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      const exists = prev.includes(category);
      if (exists) {
        // Remove category and its associated subcategories
        const subcatsToRemove = CATEGORY_MAP[category] || [];
        setSelectedSubcategories(currentSubs => currentSubs.filter(s => !subcatsToRemove.includes(s)));
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) 
        ? prev.filter(s => s !== sub) 
        : [...prev, sub]
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateStockLevel = (id, newStock) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Inventory Management" 
        description="Catalog and track hospital supplies with multi-category support."
      >
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingProduct(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-hidden flex flex-col">
            <form onSubmit={handleSaveProduct} className="flex flex-col flex-1">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  Apply multiple categories and specific subcategories to this item.
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="flex-1 pr-4 mt-4">
                <div className="grid gap-6 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" defaultValue={editingProduct?.name} placeholder="e.g. Multi-use Diagnostic Kit" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Stock Level</Label>
                      <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} required />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-3">
                      <Label className="text-base font-bold">Primary Categories</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.keys(CATEGORY_MAP).map(cat => (
                          <div key={cat} className="flex items-center space-x-2 bg-muted/30 p-2.5 rounded-md border border-border/50 hover:bg-muted/50 transition-colors">
                            <Checkbox 
                              id={`cat-${cat}`} 
                              checked={selectedCategories.includes(cat)}
                              onCheckedChange={() => toggleCategory(cat)}
                            />
                            <label 
                              htmlFor={`cat-${cat}`}
                              className="text-sm font-semibold leading-none cursor-pointer flex-1"
                            >
                              {cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedCategories.length > 0 && (
                      <div className="grid gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <Label className="text-base font-bold">Target Subcategories</Label>
                        <div className="space-y-4">
                          {selectedCategories.map(cat => (
                            <div key={cat} className="space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{cat} Options</span>
                              <div className="grid grid-cols-2 gap-2">
                                {CATEGORY_MAP[cat].map(sub => (
                                  <div key={sub} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={`sub-${sub}`} 
                                      checked={selectedSubcategories.includes(sub)}
                                      onCheckedChange={() => toggleSubcategory(sub)}
                                    />
                                    <label 
                                      htmlFor={`sub-${sub}`}
                                      className="text-xs font-medium leading-none cursor-pointer"
                                    >
                                      {sub}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="mt-6 pt-4 border-t">
                <Button type="submit" className="w-full">
                  {editingProduct ? 'Save Product Changes' : 'Create Inventory Item'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clinical supplies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedFilterCategory} onValueChange={setSelectedFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {Object.keys(CATEGORY_MAP).map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Product Name</TableHead>
                <TableHead>Clinical Classification</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Available Stock</TableHead>
                <TableHead>Inventory Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-bold">{product.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5 max-w-md">
                      {product.categories.map(cat => (
                        <Badge key={cat} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase">
                          {cat}
                        </Badge>
                      ))}
                      {product.subcategories.map(sub => (
                        <Badge key={sub} variant="outline" className="text-[10px] bg-muted/50 border-muted">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{product.stock} units</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="outline-none">
                          <Badge 
                            variant={product.stock > 20 ? 'secondary' : product.stock > 0 ? 'outline' : 'destructive'} 
                            className={cn(
                              "w-32 justify-between cursor-pointer hover:opacity-80 transition-opacity",
                              product.stock > 20 ? 'bg-accent/20 text-accent border-accent/20' : 
                              product.stock > 0 ? 'bg-orange-100 text-orange-700 border-orange-200' : 
                              ''
                            )}
                          >
                            {product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                            <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                          </Badge>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Stock Quick Edit</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => updateStockLevel(product.id, 50)}>
                          Set as In Stock (50)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStockLevel(product.id, 10)}>
                          Set as Low Stock (10)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStockLevel(product.id, 0)} className="text-destructive">
                          Mark as Out of Stock
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          Manage
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openEditDialog(product)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    <p>No inventory items match your search criteria.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
