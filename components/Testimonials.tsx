"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Owner",
    business: "Kumar Electronics, Delhi",
    text: "Since launching our new website, we've seen 3x more online inquiries. The AI chatbot handles customer queries 24/7 — even on Sundays when we're closed.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder",
    business: "Sharma Fashion Boutique, Jaipur",
    text: "Finally, a tech company that understands small businesses! Our website was live in 2 weeks, and we've already gotten 15 new customers from Google.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Director",
    business: "Patel Trading Co., Ahmedabad",
    text: "The automation they set up saves us 10 hours every week on WhatsApp follow-ups alone. Our team can now focus on closing deals instead of data entry.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Managing Partner",
    business: "Reddy Consulting, Hyderabad",
    text: "We went from zero online presence to ranking on Google's first page for our services in just 3 months. Cybiqon's SEO setup really works.",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    role: "Owner",
    business: "Mehta Home Services, Mumbai",
    text: "The Chrome extension they built for our team auto-fills GST invoices — saves each salesperson 2 hours a day. Best investment we made this year.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative">
            <Quote className="w-12 h-12 text-primary/30 absolute top-6 left-6" />
            
            <div className="pt-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{testimonials[current].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[current].role}, {testimonials[current].business}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="border-primary/50 hover:border-primary"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="border-primary/50 hover:border-primary"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'bg-primary w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
