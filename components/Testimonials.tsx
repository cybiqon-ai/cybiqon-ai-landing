"use client";

import { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Owner",
    business: "Kumar Electronics, Delhi",
    category: "Electronics",
    text: "Since launching our new website, we've seen 3x more online inquiries. The AI chatbot handles customer queries 24/7 — even on Sundays when we're closed.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder",
    business: "Sharma Fashion Boutique, Jaipur",
    category: "Fashion",
    text: "Finally, a tech company that understands small businesses! Our website was live in 2 weeks, and we've already gotten 15 new customers from Google.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Director",
    business: "Patel Trading Co., Ahmedabad",
    category: "Trading",
    text: "The automation they set up saves us 10 hours every week on WhatsApp follow-ups alone. Our team can now focus on closing deals instead of data entry.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Managing Partner",
    business: "Reddy Consulting, Hyderabad",
    category: "Consulting",
    text: "We went from zero online presence to ranking on Google's first page for our services in just 3 months. Cybiqon's SEO setup really works.",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    role: "Owner",
    business: "Mehta Home Services, Mumbai",
    category: "Home Services",
    text: "The Chrome extension they built for our team auto-fills GST invoices — saves each salesperson 2 hours a day. Best investment we made this year.",
    rating: 5,
  },
];

const cardStyles = [
  "glass-card",
  "border border-border bg-white rounded-2xl shadow-lg",
  "warm-card",
];

const Testimonials = () => {
  const [page, setPage] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  const totalPages = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const getVisibleTestimonials = () => {
    const start = page * 3;
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(start + i) % testimonials.length]);
    }
    return visible;
  };

  const visible = getVisibleTestimonials();

  return (
    <section className="py-8 md:py-18 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
        </div>

        {/* Desktop: 3-card staggered grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {visible.map((testimonial, index) => (
            <div
              key={`${page}-${index}`}
              className={`${cardStyles[index % cardStyles.length]} p-5 relative ${index === 1 ? "md:mt-6" : ""} reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(index + 1) * 0.15}s` }}
            >
              <Quote className="w-6 h-6 text-primary/20 mb-3" />

              <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-3">
                {testimonial.category}
              </span>

              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-sm text-foreground mb-4 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div>
                <p className="font-bold text-xs">{testimonial.name}</p>
                <p className="text-[11px] text-muted-foreground">{testimonial.role}, {testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden max-w-sm mx-auto">
          <div className="glass-card p-5 relative">
            <Quote className="w-6 h-6 text-primary/20 mb-3" />

            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-3">
              {visible[0].category}
            </span>

            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: visible[0].rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-sm text-foreground mb-4 leading-relaxed">
              &ldquo;{visible[0].text}&rdquo;
            </p>

            <div>
              <p className="font-bold text-sm">{visible[0].name}</p>
              <p className="text-xs text-muted-foreground">{visible[0].role}, {visible[0].business}</p>
            </div>
          </div>
        </div>

        {/* Page dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === page ? 'bg-primary w-8' : 'bg-muted w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
