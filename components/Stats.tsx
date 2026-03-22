"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "6+", label: "Industries Served" },
  { value: "\u20B99,999", label: "Starting Price" },
  { value: "100%", label: "Satisfaction Guarantee" },
  { value: "24hr", label: "Response Time" },
];

const Stats = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-8 md:py-14 relative bg-primary" ref={ref}>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/70 text-[11px] md:text-xs uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
