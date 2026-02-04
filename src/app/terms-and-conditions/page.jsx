'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12">Terms & Conditions.</h1>
        
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              By accessing our site, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Permission is granted to temporarily download one copy of the materials on AYUBHYAVA's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              The materials on our website are provided on an 'as is' basis. AYUBHYAVA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">4. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              In no event shall AYUBHYAVA or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}