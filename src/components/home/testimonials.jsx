'use client';

import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  },
  {
    id: 't4',
    name: 'Dr. Kavita Reddy',
    location: 'Hyderabad, India',
    rating: 5,
    ritual: 'Immunity Ritual',
    text: "I recommend AYUBHAVA to all my patients looking for clean, bioavailable nutrition. The science-backed approach is evident in the results.",
    avatarId: 'doctor-3'
  },
  {
    id: 't5',
    name: 'Arjun Kapoor',
    location: 'Chandigarh, India',
    rating: 5,
    ritual: 'Daily Detox Ritual',
    text: "Finally, a protein isolate that doesn't cause bloating. The 4B CFU probiotics integration is genius for anyone with a sensitive gut.",
    avatarId: 'user-avatar-2'
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <Quote className="h-3 w-3" /> Community Rituals
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Voices of Vitality
          </h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed">
            Discover how AYUBHAVA rituals are elevating the daily lives of our community through high-performance nutrition.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 lg:-ml-8">
            {testimonials.map((t) => {
              const avatar = getPlaceholderImage(t.avatarId);
              return (
                <CarouselItem key={t.id} className="pl-4 lg:pl-8 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <CardContent className="p-8 lg:p-10 space-y-6 flex flex-col h-full">
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

                      <p className="text-lg font-medium text-foreground italic leading-relaxed flex-1">
                        "{t.text}"
                      </p>

                      <div className="flex items-center gap-4 pt-6 border-t border-muted/50 mt-auto">
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
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <div className="flex items-center gap-3 mt-12 justify-center">
            <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-full bg-white border-2 border-black/5 hover:border-black hover:bg-black hover:text-white transition-all shadow-md group" />
            <CarouselNext className="static translate-y-0 h-14 w-14 rounded-full bg-white border-2 border-black/5 hover:border-black hover:bg-black hover:text-white transition-all shadow-md group" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
