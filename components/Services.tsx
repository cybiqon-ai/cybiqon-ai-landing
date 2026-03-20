import { Code2, Bot, Database, Puzzle } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Beautiful, responsive websites that work perfectly on all devices. Built with modern technology for speed and reliability."
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Automate repetitive tasks with AI. From customer support chatbots to workflow automation, we've got you covered."
  },
  {
    icon: Database,
    title: "Bulk Scraping",
    description: "Extract valuable data at scale from websites and platforms. Clean, structured data delivered for lead generation, market research, and business intelligence."
  },
  {
    icon: Puzzle,
    title: "Chrome Extensions",
    description: "Custom browser extensions to boost productivity and automate workflows. From data extraction tools to custom utilities tailored to your needs."
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
