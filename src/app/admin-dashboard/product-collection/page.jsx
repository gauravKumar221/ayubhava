'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Plus,
  Video,
  ImageIcon
} from 'lucide-react';

export default function ProductCollectionPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load products from categories in localStorage
  const loadData = () => {
    const savedCategories = localStorage.getItem('bitmax_categories');
    if (savedCategories) {
      const cats = JSON.parse(savedCategories);
      // Flatten all products from all levels
      const allProds = [];
      
      cats.forEach(c => {
        // Direct category products
        if (c.products) {
          c.products.forEach(p => allProds.push({ ...p, category: c.name, categoryId: c.id }));
        }
        
        // Subcategory products
        if (c.subcategories) {
          c.subcategories.forEach(s => {
            if (s.products) {
              s.products.forEach(p => allProds.push({ ...p, category: `${c.name} > ${s.name}`, categoryId: c.id }));
            }
            
            // Sub-subcategory products
            if (s.subSubcategories) {
              s.subSubcategories.forEach(ss => {
                if (ss.products) {
                  ss.products.forEach(p => allProds.push({ ...p, category: `${c.name} > ${s.name} > ${ss.name}`, categoryId: c.id }));
                }
              });
            }
          });
        }
      });
      
      setProducts(allProds);
    } else {
      const initialProducts = [
        { id: 'p1', name: 'Premium Stethoscope', sku: 'ST-500', price: 189.99, category: 'Instruments', images: [], videos: [] },
      ];
      setProducts(initialProducts);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (productId, categoryId) => {
    const savedCategories = localStorage.getItem('bitmax_categories');
    if (savedCategories) {
      const cats = JSON.parse(savedCategories);
      
      const removeFromList = (list) => (list || []).filter(p => p.id !== productId);
      
      const updatedCats = cats.map(c => {
        let currentCat = { ...c };
        currentCat.products = removeFromList(currentCat.products);
        currentCat.subcategories = (currentCat.subcategories || []).map(s => {
          let currentSub = { ...s };
          currentSub.products = removeFromList(currentSub.products);
          currentSub.subSubcategories = (currentSub.subSubcategories || []).map(ss => {
            let currentSS = { ...ss };
            currentSS.products = removeFromList(currentSS.products);
            return currentSS;
          });
          return currentSub;
        });
        return currentCat;
      });
      
      localStorage.setItem('bitmax_categories', JSON.stringify(updatedCats));
      loadData();
      window.dispatchEvent(new Event('storage'));
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
                <TableHead className="w-[80px] font-bold uppercase text-xs">Image</TableHead>
                <TableHead className="font-bold uppercase text-xs">Product Name</TableHead>
                <TableHead className="font-bold uppercase text-xs">Category</TableHead>
                <TableHead className="font-bold uppercase text-xs">Media Type</TableHead>
                <TableHead className="font-bold uppercase text-xs">SKU</TableHead>
                <TableHead className="font-bold uppercase text-xs">Price</TableHead>
                <TableHead className="text-right font-bold uppercase text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden border bg-muted flex items-center justify-center">
                      {product.images && product.images.length > 0 ? (
                        <Image 
                          src={product.images[0]} 
                          alt={product.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <Package className="h-6 w-6 text-muted-foreground/40" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col gap-1">
                      <span>{product.name}</span>
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.tags.map((tag, i) => (
                            <span key={i} className="text-[9px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground border">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex w-fit items-center gap-1 border-primary/20 bg-primary/5 text-primary text-[10px]">
                      <Tag className="h-3 w-3" />
                      {product.category || 'Uncategorized'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {product.images && product.images.length > 0 && (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] gap-1 px-1.5">
                          <ImageIcon className="h-3 w-3" /> Image ({product.images.length})
                        </Badge>
                      )}
                      {product.videos && product.videos.length > 0 && (
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200 text-[10px] gap-1 px-1.5">
                          <Video className="h-3 w-3" /> Video ({product.videos.length})
                        </Badge>
                      )}
                      {(!product.images?.length && !product.videos?.length) && (
                        <span className="text-xs text-muted-foreground italic">No Media</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{product.sku || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex items-center font-bold">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      {(product.price || 0).toFixed(2)}
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
                          <Link href={`/admin-dashboard/product-collection/new?id=${product.id}`} className="flex items-center">
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
                  <TableCell colSpan={7} className="h-40 text-center">
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