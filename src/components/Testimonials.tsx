import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajesh Kumar",
    business: "Kumar Electronics",
    text: "Cybiqon transformed our business! We now get online orders daily. The website is beautiful and the AI chatbot handles customer queries 24/7."
  },
  {
    name: "Priya Sharma",
    business: "Sharma Fashion Boutique",
    text: "Finally, a tech company that understands small businesses! Affordable, professional, and they delivered exactly what we needed."
  },
  {
    name: "Arjun Patel",
    business: "Patel Trading Co.",
    text: "The automation they set up saves us 10+ hours every week. Our team can now focus on growing the business instead of data entry."
  }
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
              <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                "{testimonials[current].text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{testimonials[current].name}</p>
                  <p className="text-muted-foreground">{testimonials[current].business}</p>
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
