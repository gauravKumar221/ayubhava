'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Package, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  DollarSign,
  Tag,
  Plus
} from 'lucide-react';

export default function ProductCollectionPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load products from categories in localStorage
  useEffect(() => {
    const loadData = () => {
      const savedCategories = localStorage.getItem('bitmax_categories');
      if (savedCategories) {
        const cats = JSON.parse(savedCategories);
        // Flatten all products from all categories
        const allProds = cats.flatMap(c => 
          c.products.map(p => ({ ...p, category: c.name, categoryId: c.id }))
        );
        setProducts(allProds);
      } else {
        // Fallback to initial products if no storage exists
        const initialProducts = [
          { id: 'p1', name: 'Premium Stethoscope', sku: 'ST-500', price: 189.99, category: 'Instruments' },
          { id: 'p2', name: 'Digital Thermometer', sku: 'TH-20', price: 24.50, category: 'Instruments' },
          { id: 'p3', name: 'N95 Respirators (Pack)', sku: 'MSK-N95', price: 45.00, category: 'Consumables' },
        ];
        setProducts(initialProducts);
      }
    };

    loadData();
    
    // Listen for changes in localStorage from other tabs or pages
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (productId, categoryId) => {
    const savedCategories = localStorage.getItem('bitmax_categories');
    if (savedCategories) {
      const cats = JSON.parse(savedCategories);
      const updatedCats = cats.map(c => {
        if (c.id === categoryId) {
          return { ...c, products: c.products.filter(p => p.id !== productId) };
        }
        return c;
      });
      localStorage.setItem('bitmax_categories', JSON.stringify(updatedCats));
      window.dispatchEvent(new Event('storage')); // Trigger update
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Product Collection" 
        description="A centralized view of all medical supplies and clinical items."
      >
        <Button asChild className="bg-primary text-primary-foreground">
          <Link href="/admin-dashboard/product-collection/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </PageHeader>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, SKU or category..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold uppercase text-xs">Product Name</TableHead>
                <TableHead className="font-bold uppercase text-xs">Category</TableHead>
                <TableHead className="font-bold uppercase text-xs">SKU</TableHead>
                <TableHead className="font-bold uppercase text-xs">Price</TableHead>
                <TableHead className="text-right font-bold uppercase text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex w-fit items-center gap-1 border-primary/20 bg-primary/5 text-primary">
                      <Tag className="h-3 w-3" />
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{product.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center font-bold">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      {product.price.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Item Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin-dashboard/product-collection/edit/${product.id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(product.id, product.categoryId)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground opacity-50">
                      <Package className="h-10 w-10 mb-2" />
                      <p>No products found in the collection.</p>
                    </div>
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
