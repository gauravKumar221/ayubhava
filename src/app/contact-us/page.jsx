'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
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
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Contact Us
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions or need assistance? Our medical staff is here to help you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-primary/5">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Our Location</h3>
                <p className="text-sm text-muted-foreground">123 Medical Plaza, Health City, HC 54321</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-accent/5">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold">Phone Number</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 000-1234</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-muted">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-muted-foreground/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@bitmax.com</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we will respond within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in zoom-in duration-300">
                  <CheckCircle2 className="h-16 w-16 text-accent" />
                  <h2 className="text-2xl font-bold">Thank You!</h2>
                  <p className="text-muted-foreground">Your message has been successfully recorded.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="What is this regarding?" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="How can we help you today?" 
                      className="min-h-[150px]" 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
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
  );
}
