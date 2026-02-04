'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12">Privacy Policy.</h1>
        
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">1. Overview</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              AYUBHYAVA ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">2. Data Collection</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
              <li>Identity Data: Name, username or similar identifier.</li>
              <li>Contact Data: Billing address, delivery address, email address and telephone numbers.</li>
              <li>Financial Data: Payment card details (processed securely via our partners).</li>
              <li>Technical Data: IP address, login data, browser type and version.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">3. How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling an order).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-primary">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}