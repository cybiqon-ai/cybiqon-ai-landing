import { Building2, IndianRupee, ShieldCheck, Clock } from "lucide-react";

const stats = [
  { icon: Building2, value: "6+", label: "Industries Served" },
  { icon: IndianRupee, value: "₹9,999", label: "Starting Price" },
  { icon: ShieldCheck, value: "100%", label: "Satisfaction Guarantee" },
  { icon: Clock, value: "24hr", label: "Response Time" },
];

const Stats = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
