const stats = [
  { value: "24-hr", label: "Response time" },
  { value: "100%", label: "Code ownership \u2014 it's yours" },
  { value: "Free", label: "Website audit, no strings" },
  { value: "\u20B90", label: "Hidden fees, ever" },
];

const Stats = () => {
  return (
    <section className="py-8 md:py-14 relative bg-primary">
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="display text-3xl md:text-5xl text-white mb-1">
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
