'use client';

import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 't1',
    name: 'Ananya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    ritual: 'Morning Glow Ritual',
    text: "The Marine Collagen has transformed my skin in just 4 weeks. My daily morning ritual feels incomplete without it. The quality is noticeably superior to other brands I've tried.",
    avatarId: 'user-avatar-3'
  },
  {
    id: 't2',
    name: 'Vikram Malhotra',
    location: 'Delhi, India',
    rating: 5,
    ritual: 'Performance Ritual',
    text: "As an athlete, recovery is everything. The Triple Magnesium complex has significantly reduced my muscle soreness and improved my sleep quality. A game-changer for my routine.",
    avatarId: 'user-avatar-1'
  },
  {
    id: 't3',
    name: 'Priya Iyer',
    location: 'Bangalore, India',
    rating: 5,
    ritual: 'Deep Sleep Ritual',
    text: "I used to struggle with a consistent sleep cycle. The Restful Melts are gentle yet incredibly effective. I wake up feeling genuinely recharged and ready for the day.",
    avatarId: 'user-avatar-5'
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <Quote className="h-3 w-3" /> Community Rituals
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Voices of Vitality
          </h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed">
            Discover how AYUBHAVA rituals are elevating the daily lives of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => {
            const avatar = getPlaceholderImage(t.avatarId);
            return (
              <Card key={t.id} className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-8 lg:p-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#eef4f2] text-[#4a6b5d] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                      <CheckCircle2 className="h-3 w-3" /> Verified Ritual
                    </div>
                  </div>

                  <p className="text-lg font-medium text-foreground italic leading-relaxed">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-muted/50">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      {avatar && <AvatarImage src={avatar.imageUrl} alt={t.name} />}
                      <AvatarFallback className="bg-primary/5 text-primary font-black">{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="font-black text-sm uppercase tracking-tight">{t.name}</h4>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
