"use client";

import { useState, useEffect } from "react";
import { Store, Utensils, Heart, Wrench, Shirt, Home } from "lucide-react";

const industries = [
  { icon: Store, name: "Retail Shops", color: "from-blue-500 to-indigo-500", result: "3x more inquiries" },
  { icon: Utensils, name: "Restaurants", color: "from-orange-500 to-amber-500", result: "Online orders in 2 weeks" },
  { icon: Heart, name: "Healthcare", color: "from-emerald-500 to-green-500", result: "Patient bookings automated" },
  { icon: Wrench, name: "Services", color: "from-blue-600 to-cyan-500", result: "10+ hours saved weekly" },
  { icon: Shirt, name: "Fashion", color: "from-violet-500 to-purple-500", result: "First page on Google" },
  { icon: Home, name: "Real Estate", color: "from-green-600 to-teal-500", result: "Lead capture automated" },
];

const IndustryShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hidden md:block py-8 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
            We Serve <span className="text-primary">All Industries</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            From local shops to growing enterprises — with real results
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
          {industries.map((industry, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-500 cursor-pointer ${
                index === activeIndex
                  ? 'scale-110 glass-card shadow-xl'
                  : 'scale-90 opacity-50 hover:opacity-80'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center transition-transform duration-500 ${
                  index === activeIndex ? 'scale-110' : ''
                }`}
              >
                <industry.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium">{industry.name}</span>
              {index === activeIndex && (
                <span className="text-xs font-medium text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                  {industry.result}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryShowcase;
