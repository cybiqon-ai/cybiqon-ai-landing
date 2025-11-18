import { useState, useEffect } from "react";
import { Store, Utensils, Heart, Wrench, Shirt, Home } from "lucide-react";

const industries = [
  { icon: Store, name: "Retail Shops", color: "from-purple-500 to-pink-500" },
  { icon: Utensils, name: "Restaurants", color: "from-orange-500 to-red-500" },
  { icon: Heart, name: "Healthcare", color: "from-red-500 to-pink-500" },
  { icon: Wrench, name: "Services", color: "from-blue-500 to-cyan-500" },
  { icon: Shirt, name: "Fashion", color: "from-pink-500 to-purple-500" },
  { icon: Home, name: "Real Estate", color: "from-green-500 to-teal-500" },
];

const IndustryShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            We Serve <span className="gradient-text">All Industries</span>
          </h3>
          <p className="text-muted-foreground">From local shops to growing enterprises</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-500 ${
                index === activeIndex
                  ? 'scale-110 glass-card shadow-xl'
                  : 'scale-90 opacity-50 hover:opacity-100'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center ${
                  index === activeIndex ? 'animate-bounce' : ''
                }`}
              >
                <industry.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryShowcase;
