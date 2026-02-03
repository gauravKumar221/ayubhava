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
  ArrowRight
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

const initialCategories = [
  { id: '1', name: 'Instruments', description: 'Medical tools and machinery', productCount: 45 },
  { id: '2', name: 'Consumables', description: 'Single-use items like masks and gloves', productCount: 120 },
  { id: '3', name: 'Diagnostics', description: 'Equipment for testing and analysis', productCount: 8 },
  { id: '4', name: 'Mobility', description: 'Aids for patient movement', productCount: 10 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategoryForProduct, setSelectedCategoryForProduct] = useState(null);

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
      setCategories([...categories, { ...categoryData, id: Math.random().toString(36).substr(2, 9), productCount: 0 }]);
    }
    
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // In a real app, this would save to a products collection.
    // For this prototype, we'll increment the category's product count.
    if (selectedCategoryForProduct) {
      setCategories(categories.map(c => 
        c.id === selectedCategoryForProduct.id 
          ? { ...c, productCount: c.productCount + 1 } 
          : c
      ));
    }
    setIsProductDialogOpen(false);
    setSelectedCategoryForProduct(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const openAddProductDialog = (category) => {
    setSelectedCategoryForProduct(category);
    setIsProductDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Category Management" 
        description="Organize your products by health needs and supply types."
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
                  Define a new category to group your medical products.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input id="name" name="name" defaultValue={editingCategory?.name} placeholder="e.g. Cardiological Supplies" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    defaultValue={editingCategory?.description} 
                    placeholder="Describe what kind of products belong here..."
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

      {/* Add Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddProduct}>
            <DialogHeader>
              <DialogTitle>Add Product to {selectedCategoryForProduct?.name}</DialogTitle>
              <DialogDescription>
                Quickly add a new item to this category.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" placeholder="e.g. Premium Stethoscope" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Initial Price ($)</Label>
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Total Products</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{category.description || 'No description provided'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 font-bold px-3 py-1">
                      {category.productCount} Items
                    </Badge>
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
                        <DropdownMenuLabel>Category Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openAddProductDialog(category)}>
                          <PackagePlus className="mr-2 h-4 w-4 text-accent" /> Add Product
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(category)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No categories found.
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
