'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { PageHeader } from '@/components/shared/page-header';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { LazyImage } from '@/components/shared/lazy-image';

const blogPosts = [
  { 
    id: '1', 
    title: 'Modern Healthcare Trends 2024', 
    description: 'Exploring the shift towards digital health, remote monitoring, and the integration of AI in daily wellness rituals.', 
    author: 'Dr. Emily Carter',
    category: 'Medical Research',
    date: '2024-07-20',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: '2', 
    title: 'Top 5 Nutrition Myths Debunked', 
    description: 'Our leading nutritionists break down common misconceptions about supplements and gut health.', 
    author: 'Sarah Jenkins, RD',
    category: 'Health Tips',
    date: '2024-07-25',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: '3', 
    title: 'The Science of Deep Sleep', 
    description: 'Understanding how magnesium and specific nighttime rituals can transform your cognitive recovery.', 
    author: 'Dr. Marcus Thorne',
    category: 'Wellness',
    date: '2024-07-28',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: '4', 
    title: 'Marine Collagen: Why Bioavailability Matters', 
    description: 'Not all collagen is created equal. Learn why deep-sea sources provide superior skin and joint support.', 
    author: 'Emily Carter',
    category: 'Nutrition',
    date: '2024-08-01',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop'
  }
];

export default function PublicBlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory || (activeCategory === 'Science' && post.category === 'Medical Research');
    
    return matchesSearch && matchesCategory;
  });

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-muted/30 py-16 lg:py-24 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                WELLBEING INSIGHTS
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
                JOURNAL OF <br />VITALITY.
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                Expert-led research, nutritional guides, and wellness stories designed to elevate your daily ritual.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b py-4">
          <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by topic, author or category..."
                className="pl-10 h-12 rounded-xl border-none bg-muted/50 focus-visible:ring-primary/20 font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {["All", "Nutrition", "Wellness", "Science"].map((cat) => (
                <Button 
                  key={cat}
                  variant="ghost" 
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-xs font-black uppercase tracking-widest rounded-full px-6 h-10 transition-all",
                    activeCategory === cat 
                      ? "bg-black text-white hover:bg-black/90" 
                      : "hover:bg-black hover:text-white text-foreground/60"
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post) => (
                <article key={post.id} className="group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted mb-6 shadow-sm">
                    <LazyImage 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-black border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 shadow-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col space-y-4 px-1">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-primary" />
                        {format(new Date(post.date), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-primary" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 font-medium">
                      {post.description}
                    </p>

                    <div className="pt-4 flex items-center justify-between border-t border-muted/50 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider">{post.author}</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        Read More <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 opacity-40">
                <BookOpen className="h-16 w-16" />
                <div className="space-y-1">
                  <p className="text-xl font-black tracking-tight uppercase">No results found</p>
                  <p className="text-sm font-medium">Try adjusting your search terms.</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                  className="rounded-none border-2 border-black font-black uppercase text-xs tracking-widest px-8 h-12 mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="bg-white py-16 border-t">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="flex flex-col items-center gap-2 font-black text-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground font-bold text-lg">W</div>
            <span className="uppercase tracking-tighter text-xl">Wellbeing Nutrition</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">Consultation</Link>
            <Link href="#" className="hover:text-primary transition-colors">Philosophy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sustainability</Link>
          </nav>
          <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em]">
            © 2024 Wellbeing Nutrition. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
