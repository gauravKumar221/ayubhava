'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Heart,
  ChevronRight,
  Quote
} from 'lucide-react';
import { format } from 'date-fns';
import { LazyImage } from '@/components/shared/lazy-image';
import { cn } from '@/lib/utils';

// Mock blog database
const allPosts = [
  { 
    id: '1', 
    title: 'Modern Healthcare Trends 2024', 
    description: 'Exploring the shift towards digital health, remote monitoring, and the integration of AI in daily wellness rituals.', 
    content: `
      <p>The healthcare landscape is undergoing a radical transformation. As we move further into 2024, the focus has shifted from reactive treatment to proactive wellness. Digital health tools and artificial intelligence are no longer futuristic concepts—they are essential components of our daily vitality rituals.</p>
      
      <h3>1. The Rise of Personalized AI Diagnostics</h3>
      <p>AI-driven platforms are now able to analyze biological markers in real-time, providing users with hyper-personalized nutritional recommendations. This level of precision ensures that individuals are getting exactly what their bodies need, when they need it.</p>
      
      <blockquote>"Health is no longer a one-size-fits-all model. It is a dynamic, data-driven journey unique to every individual."</blockquote>
      
      <h3>2. Remote Monitoring & Continuous Care</h3>
      <p>Wearable technology has evolved beyond counting steps. Modern sensors can now monitor everything from glucose levels to sleep architecture, allowing for a continuous loop of care between patients and wellness providers.</p>
      
      <h3>3. Holistic Integration</h3>
      <p>We are seeing a massive trend towards integrating ancient wisdom with modern science. Functional superfoods and bioavailable supplements are being used alongside digital tools to create a comprehensive wellness ecosystem.</p>
    `,
    author: 'Dr. Emily Carter',
    authorRole: 'Head of Clinical Research',
    category: 'Medical Research',
    date: '2024-07-20',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: '2', 
    title: 'Top 5 Nutrition Myths Debunked', 
    description: 'Our leading nutritionists break down common misconceptions about supplements and gut health.', 
    content: `
      <p>In the age of information, it's easy to get lost in the noise of wellness trends. Our team of certified nutritionists is here to clear the air and debunk the top myths currently circulating in the health community.</p>
      
      <h3>Myth 1: All Supplements Are Created Equal</h3>
      <p>The truth is bioavailability matters more than dosage. Synthetic vitamins often pass through the body without being absorbed. Wholefood-sourced nutrients are far more effective.</p>
      
      <h3>Myth 2: You Need a Massive Detox Period</h3>
      <p>Your body has its own incredible detox systems (liver and kidneys). The goal should be supporting these systems daily with antioxidants and hydration, not occasional extreme fasts.</p>
    `,
    author: 'Sarah Jenkins, RD',
    authorRole: 'Certified Nutritionist',
    category: 'Health Tips',
    date: '2024-07-25',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function BlogDetailPage({ params }) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);
  
  const post = allPosts.find(p => p.id === id) || allPosts[0];
  const relatedPosts = allPosts.filter(p => p.id !== id).slice(0, 3);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, [id]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <LazyImage 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover opacity-70"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
          
          <div className="container mx-auto h-full px-4 lg:px-8 relative z-10 flex flex-col justify-end pb-12">
            <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-primary text-white border-none font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-4 text-white/80 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-primary" />
                    {format(new Date(post.date), 'MMMM dd, yyyy')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary" />
                    {post.readTime}
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95]">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-12 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Sidebar: Author & Share */}
              <aside className="lg:col-span-3 space-y-12 order-2 lg:order-1">
                <div className="space-y-6 sticky top-32">
                  <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 overflow-hidden">
                      <User className="h-10 w-10" />
                    </div>
                    <div className="text-center lg:text-left space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Written By</p>
                      <h4 className="text-xl font-black tracking-tight">{post.author}</h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase">{post.authorRole}</p>
                    </div>
                  </div>

                  <Separator className="bg-muted/50" />

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center lg:text-left">Spread the word</p>
                    <div className="flex justify-center lg:justify-start gap-3">
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 border-black/5 hover:bg-black hover:text-white transition-all">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 border-black/5 hover:bg-black hover:text-white transition-all">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Button asChild variant="outline" className="w-full h-14 rounded-none border-2 border-black font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all">
                      <Link href="/blog">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Journal
                      </Link>
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <article className="lg:col-span-9 order-1 lg:order-2">
                <div 
                  className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-p:text-muted-foreground prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:font-medium"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Article Footer Tags */}
                <div className="mt-16 pt-12 border-t border-muted/50 flex flex-wrap gap-2">
                  {["Digital Health", "AI", "Vitality", "Research", "Wellness"].map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-none border-2 border-black/5 font-bold text-[10px] uppercase tracking-widest px-4 py-2 hover:border-black transition-colors cursor-pointer">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Related Articles Slider */}
        <section className="py-24 bg-muted/20 border-t">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-16">
              <div className="space-y-2">
                <Badge className="bg-black text-white border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1">
                  Keep Reading
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">
                  Related Insights
                </h2>
              </div>
              <Button asChild variant="link" className="font-black uppercase text-xs tracking-widest">
                <Link href="/blog">View All Journal <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedPosts.map((related) => (
                <article key={related.id} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1">
                  <Link href={`/blog/${related.id}`} className="block relative aspect-[16/10] overflow-hidden">
                    <LazyImage 
                      src={related.image} 
                      alt={related.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </Link>
                  <div className="p-8 flex flex-1 flex-col space-y-4">
                    <Badge className="w-fit bg-primary/10 text-primary border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">
                      {related.category}
                    </Badge>
                    <Link href={`/blog/${related.id}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="text-xl font-black tracking-tight leading-tight">
                        {related.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed">
                      {related.description}
                    </p>
                    <div className="pt-4 mt-auto border-t border-muted/50 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{related.readTime}</span>
                      <Button asChild variant="ghost" size="sm" className="rounded-full font-black text-[10px] uppercase tracking-widest group-hover:bg-primary group-hover:text-white">
                        <Link href={`/blog/${related.id}`}>Read Full Article</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
          <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em]">
            © 2024 Wellbeing Nutrition. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
