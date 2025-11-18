import { DollarSign, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Affordable for MSMEs",
    description: "Premium quality websites and automation at prices designed for small businesses. No hidden costs, transparent pricing."
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description: "Save hours every week with intelligent automation. From customer support to data entry, let AI handle the repetitive tasks."
  },
  {
    icon: TrendingUp,
    title: "Fast & SEO Optimized",
    description: "Lightning-fast websites that rank on Google. Get found by customers searching for your services online."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Cybiqon AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We understand the challenges small businesses face. That's why we built solutions that actually work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 hover:border-primary hover:shadow-xl transition-all duration-300 group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
