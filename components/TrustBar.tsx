import { ShieldCheck, Code2, Clock, Building2 } from "lucide-react";

const TrustBar = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      text: "100% Satisfaction Guarantee",
    },
    {
      icon: Code2,
      text: "You Own the Code",
    },
    {
      icon: Clock,
      text: "24hr Response Time",
    },
    {
      icon: Building2,
      text: "Founded by MSMEs, for MSMEs",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 via-emerald-50 to-amber-50 border-y border-border py-8">
      <div className="content-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center md:text-left"
            >
              <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base font-medium text-foreground">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
