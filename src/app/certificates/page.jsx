'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Award, Microscope, Leaf, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    title: 'ISO 22000 Certified',
    description: 'Our manufacturing facilities meet global food safety management standards.',
    icon: <ShieldCheck className="h-10 w-10 text-primary" />
  },
  {
    title: 'Clean Label Project®',
    description: 'Recognized for purity and the absence of over 200 environmental contaminants.',
    icon: <Award className="h-10 w-10 text-primary" />
  },
  {
    title: 'Non-GMO Project Verified',
    description: 'We ensure our ingredients are never genetically modified.',
    icon: <Leaf className="h-10 w-10 text-primary" />
  },
  {
    title: 'GMP Certified',
    description: 'Strict adherence to Good Manufacturing Practices for consistent quality.',
    icon: <CheckCircle2 className="h-10 w-10 text-primary" />
  },
  {
    title: 'Science-Backed Formulas',
    description: 'Each product is vetted by our internal Scientific Advisory Board.',
    icon: <Microscope className="h-10 w-10 text-primary" />
  }
];

export default function CertificatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/30 py-16 lg:py-24 border-b">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Our Credentials.</h1>
            <p className="text-lg text-muted-foreground font-medium">
              At AYUBHYAVA, transparency is our core ritual. We hold ourselves to the highest global standards to ensure your vitality is never compromised.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, i) => (
                <Card key={i} className="border-2 border-black/5 shadow-none rounded-[2rem] overflow-hidden hover:border-primary/20 transition-colors">
                  <CardContent className="p-10 space-y-6">
                    <div className="bg-primary/5 w-20 h-20 rounded-3xl flex items-center justify-center">
                      {cert.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tight">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}