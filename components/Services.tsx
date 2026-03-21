import { Code2, Bot, Database, Puzzle, TabletSmartphone } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Get found on Google and turn visitors into customers. Mobile-first websites designed for Indian shoppers — built in 2-3 weeks, starting ₹9,999."
  },
  {
    icon: TabletSmartphone,
    title: "Android App Development",
    description: "Custom Android apps for your business — inventory management, customer ordering, field staff tracking, or anything your workflow needs."
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Stop spending 3 hours a day on WhatsApp replies. Our AI handles customer queries, follow-ups, and lead capture — 24/7, in Hindi or English."
  },
  {
    icon: Database,
    title: "Bulk Scraping",
    description: "Extract competitor prices, supplier catalogs, and leads from JustDial/IndiaMART — delivered in Excel, ready to use."
  },
  {
    icon: Puzzle,
    title: "Chrome Extensions",
    description: "Custom browser tools for your sales team — auto-fill GST portals, build quotes faster, extract data on the go."
  }
];

const Services = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to establish and grow your online presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:border-secondary hover:shadow-xl transition-all duration-300 group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
