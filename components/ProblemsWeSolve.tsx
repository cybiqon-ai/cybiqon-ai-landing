"use client";

import { X, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const problems = [
  {
    pain: "Losing customers to competitors with websites",
    solution: "Get found on Google in 2-3 weeks",
  },
  {
    pain: "3+ hours daily answering WhatsApp messages",
    solution: "AI handles customer queries 24/7",
  },
  {
    pain: "Paying \u20B950,000+ for a basic website",
    solution: "Professional site starting at \u20B99,999",
  },
  {
    pain: "No idea if your marketing is working",
    solution: "Real-time dashboard with actual numbers",
  },
];

const ProblemsWeSolve = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-8 md:py-16 relative">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto ${isVisible ? "" : ""}`}
        >
          <div className={`text-center mb-10 reveal ${isVisible ? "visible" : ""}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
              Real Problems We <span className="text-primary">Solve</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Sound familiar? We built Cybiqon to fix exactly these headaches.
            </p>
          </div>

          <div className="space-y-3">
            {problems.map((item, index) => (
              <div
                key={index}
                className={`${index >= 2 ? "hidden md:grid" : "grid"} md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center reveal ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                {/* Pain */}
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200/60">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs md:text-sm font-medium text-red-800">
                    {item.pain}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-8 h-[2px] bg-border relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-secondary" />
                  </div>
                </div>

                {/* Solution */}
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200/60">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <p className="text-xs md:text-sm font-medium text-emerald-800">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;
