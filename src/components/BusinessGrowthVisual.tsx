import { useEffect, useState } from "react";
import { Store, Globe, Zap } from "lucide-react";

const BusinessGrowthVisual = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Store, label: "Your Local Business", color: "text-primary" },
    { icon: Zap, label: "AI Automation", color: "text-accent" },
    { icon: Globe, label: "Online Success", color: "text-secondary" },
  ];

  return (
    <div className="relative py-16">
      <div className="flex items-center justify-center gap-8 md:gap-16">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center gap-4">
            {/* Icon */}
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl glass-card flex items-center justify-center transition-all duration-500 ${
                index === activeStep ? 'scale-125 shadow-2xl border-2 border-primary' : 'scale-100'
              }`}
            >
              <step.icon
                className={`w-10 h-10 md:w-12 md:h-12 ${step.color} transition-all duration-500 ${
                  index === activeStep ? 'animate-bounce' : ''
                }`}
              />
            </div>
            
            {/* Label */}
            <span
              className={`text-xs md:text-sm font-medium text-center max-w-[100px] transition-all duration-500 ${
                index === activeStep ? 'text-foreground scale-110' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="absolute left-full top-10 hidden md:block">
                <div className="flex items-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ${
                        index === activeStep ? 'animate-pulse scale-150' : 'scale-100'
                      }`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessGrowthVisual;
