"use client";

import { Code2, Bot, Database, Puzzle, TabletSmartphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Get found on Google and turn visitors into customers. Mobile-first websites designed for Indian shoppers — built in 2-3 weeks.",
    price: "Starting \u20B99,999",
    featured: true,
    cardStyle: "warm-card",
  },
  {
    icon: TabletSmartphone,
    title: "Android App Development",
    description: "Custom Android apps for your business — inventory management, customer ordering, field staff tracking.",
    featured: false,
    cardStyle: "glass-card",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Stop spending 3 hours a day on WhatsApp replies. Our AI handles customer queries, follow-ups, and lead capture — 24/7, in Hindi or English.",
    featured: false,
    cardStyle: "success-card",
  },
  {
    icon: Database,
    title: "Bulk Scraping",
    description: "Extract competitor prices, supplier catalogs, and leads from JustDial/IndiaMART — delivered in Excel, ready to use.",
    featured: false,
    cardStyle: "border border-border bg-white rounded-2xl",
  },
  {
    icon: Puzzle,
    title: "Chrome Extensions",
    description: "Custom browser tools for your sales team — auto-fill GST portals, build quotes faster, extract data on the go.",
    featured: false,
    cardStyle: "glass-card",
  }
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-8 md:py-18 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 reveal ${isVisible ? "visible" : ""}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Everything you need to establish and grow your online presence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.cardStyle} p-5 ${service.featured ? "md:col-span-2 p-6" : ""} ${index >= 3 ? "hidden md:block" : ""} hover:shadow-xl transition-all duration-300 group reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className={`${service.featured ? "flex flex-col md:flex-row md:items-start md:gap-5" : ""}`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform flex-shrink-0 ${service.featured ? "w-11 h-11" : ""}`}>
                  <service.icon className={`text-white ${service.featured ? "w-5 h-5" : "w-5 h-5"}`} />
                </div>
                <div>
                  <h3 className={`font-bold mb-1.5 ${service.featured ? "text-lg" : "text-base"}`}>{service.title}</h3>
                  {service.price && (
                    <p className="text-sm font-extrabold text-primary mb-1.5">{service.price}</p>
                  )}
                  <p className="text-muted-foreground text-xs leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
