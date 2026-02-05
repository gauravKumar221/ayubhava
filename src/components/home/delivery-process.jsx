'use client';

import { ShoppingBag, Package, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: "Ritual Selection",
    description: "Discover and curate your personalized collection of high-performance vitality essentials."
  },
  {
    icon: <Package className="h-8 w-8" />,
    title: "Meticulous Packing",
    description: "Every item is handled with care and packed in eco-friendly, tamper-evident materials."
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Rapid Dispatch",
    description: "Your order is fast-tracked through our logistics network to reach your sanctuary swiftly."
  },
  {
    icon: <CheckCircle2 className="h-8 w-8" />,
    title: "Vitality Delivered",
    description: "Unbox your new daily ritual and begin your journey towards peak physical performance."
  }
];

export function DeliveryProcess() {
  return (
    <section className="py-24 bg-white border-t overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            The Logistics Ritual
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase leading-none">
            Seamless <br /><span className="text-primary">Delivery.</span>
          </h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed">
            From our sanctuary to yours, we ensure every step of the journey is as premium as the rituals themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Guide (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 w-full h-0.5 bg-muted-foreground/10 -z-0" />
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-8 relative z-10 group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="h-32 w-32 rounded-[2.5rem] bg-white border-4 border-primary/5 shadow-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-100 group-hover:scale-110">
                {step.icon}
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">
                  0{index + 1}
                </div>
              </div>
              <div className="space-y-3 px-4">
                <h3 className="text-xl font-black uppercase tracking-tight leading-none">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="lg:hidden h-12 w-0.5 bg-muted-foreground/10 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
