import { DollarSign, Zap, TrendingUp, Users, Code2, MessageCircle } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Affordable for MSMEs",
    description: "Premium quality websites and automation at prices designed for small businesses. No hidden costs, transparent pricing.",
    cardStyle: "warm-card",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description: "Save hours every week with intelligent automation. From customer support to data entry, let AI handle the repetitive tasks.",
    cardStyle: "glass-card",
    span: "",
  },
  {
    icon: TrendingUp,
    title: "Fast & SEO Optimized",
    description: "Lightning-fast websites that rank on Google. Get found by customers searching for your services online.",
    cardStyle: "card-surface",
    span: "",
  },
  {
    icon: Users,
    title: "You Get the Founders",
    description: "Work directly with Muskan & Prajjwal — not interns or account managers. Your project gets founder-level attention from day one.",
    cardStyle: "success-card",
    span: "",
  },
  {
    icon: Code2,
    title: "Full Code Ownership",
    description: "No vendor lock-in, ever. You own 100% of the code, files, and credentials. Walk away anytime — but we bet you won't want to.",
    cardStyle: "glass-card",
    span: "",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-First Support",
    description: "Reach us where you already are. Quick questions, status updates, feedback — just send a WhatsApp message. We respond within 24 hours.",
    cardStyle: "card-surface",
    span: "md:col-span-3",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-8 md:py-18 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
            Why Choose <span className="text-primary">Cybiqon AI</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            We understand the challenges small businesses face. That&apos;s why we built solutions that actually work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-[90rem] mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.cardStyle} ${feature.span} p-5 hover:shadow-xl transition-all duration-300 group reveal`}
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className={`${feature.span === "md:col-span-3" ? "flex flex-col md:flex-row md:items-center md:gap-5 text-center md:text-left" : ""}`}>
                <div className="icon-chip w-10 h-10 mb-4 group-hover:scale-105 transition-transform flex-shrink-0 mx-auto md:mx-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
