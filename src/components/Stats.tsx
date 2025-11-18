import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects Completed", target: 3, suffix: "+" },
  { label: "Automations Delivered", target: 50, suffix: "+" },
  { label: "Happy Clients", target: 30, suffix: "+" }
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-5xl md:text-6xl font-extrabold gradient-text mb-2">
                <AnimatedCounter target={stat.target} isVisible={isVisible} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedCounter = ({ target, isVisible, suffix }: { target: number; isVisible: boolean; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <>{count}{suffix}</>;
};

export default Stats;
