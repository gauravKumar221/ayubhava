'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      date: new Date().toISOString(),
      status: 'Unread'
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    localStorage.setItem('contact_messages', JSON.stringify([...existing, newMessage]));

    // Simulate delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We've received your inquiry and will get back to you soon.",
      });
      e.target.reset();
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black tracking-tighter lg:text-6xl text-foreground uppercase">
              Get In Touch.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Have questions about your daily ritual? Our wellness experts are here to guide you on your journey to vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-6">
              <Card className="border-none shadow-sm bg-[#f9f9f9] rounded-3xl">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wider">Our Sanctuary</h3>
                    <p className="text-xs text-muted-foreground mt-1">123 Wellness Plaza, Health District, HC 54321</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#f9f9f9] rounded-3xl">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wider">Connect</h3>
                    <p className="text-xs text-muted-foreground mt-1">+1 (555) 000-1234</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#f9f9f9] rounded-3xl">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wider">Support</h3>
                    <p className="text-xs text-muted-foreground mt-1">rituals@ayubhyava.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="shadow-2xl border-none rounded-[2.5rem] overflow-hidden">
                <CardHeader className="bg-black text-white p-8">
                  <CardTitle className="text-2xl font-black uppercase tracking-tight">Send a Message</CardTitle>
                  <CardDescription className="text-white/60">Fill out the form below and an expert will respond within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 animate-in zoom-in duration-300">
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-black uppercase tracking-tight">Ritual Recorded.</h2>
                        <p className="text-muted-foreground font-medium">Your inquiry has been successfully sent to our team.</p>
                      </div>
                      <Button variant="outline" className="rounded-none border-2 border-black font-black uppercase tracking-widest text-xs px-8 h-12" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                          <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest ml-1">Full Name</Label>
                          <Input id="name" name="name" placeholder="John Doe" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest ml-1">Email Address</Label>
                          <Input id="email" name="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20" required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest ml-1">Subject</Label>
                        <Input id="subject" name="subject" placeholder="What is this regarding?" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest ml-1">Message</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          placeholder="How can we help you today?" 
                          className="min-h-[150px] rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20" 
                          required 
                        />
                      </div>
                      <Button type="submit" className="w-full h-14 bg-black text-white hover:bg-black/90 rounded-none font-black uppercase tracking-[0.2em] text-sm shadow-xl mt-4 transition-all active:scale-[0.98]" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "TRANSMITTING..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Submit Inquiry
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
