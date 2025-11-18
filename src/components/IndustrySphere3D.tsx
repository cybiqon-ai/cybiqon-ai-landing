import { useEffect, useRef, useState } from "react";
import {
  Store,
  UtensilsCrossed,
  Stethoscope,
  Scissors,
  Shirt,
  Factory,
  Briefcase,
  Home
} from "lucide-react";

interface IndustrySphere3DProps {
  enabled?: boolean;
}

const IndustrySphere3D = ({ enabled = true }: IndustrySphere3DProps) => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Intersection Observer to pause animation when out of view
  useEffect(() => {
    if (!sphereRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sphereRef.current);

    return () => {
      if (sphereRef.current) {
        observer.unobserve(sphereRef.current);
      }
    };
  }, []);

  if (!enabled) return null;

  // Industry icons with their warm color tints - 16 icons for fuller sphere
  const industries = [
    { Icon: Store, color: "text-blue-500", label: "Retail" },
    { Icon: UtensilsCrossed, color: "text-orange-500", label: "Restaurant" },
    { Icon: Stethoscope, color: "text-emerald-500", label: "Healthcare" },
    { Icon: Scissors, color: "text-pink-500", label: "Salon" },
    { Icon: Shirt, color: "text-violet-500", label: "Fashion" },
    { Icon: Factory, color: "text-teal-500", label: "Manufacturing" },
    { Icon: Briefcase, color: "text-indigo-500", label: "Services" },
    { Icon: Home, color: "text-green-500", label: "Real Estate" },
    // Additional icons for fuller sphere
    { Icon: Store, color: "text-cyan-500", label: "E-commerce" },
    { Icon: UtensilsCrossed, color: "text-amber-500", label: "Cafe" },
    { Icon: Stethoscope, color: "text-green-600", label: "Clinic" },
    { Icon: Scissors, color: "text-rose-500", label: "Spa" },
    { Icon: Shirt, color: "text-purple-500", label: "Boutique" },
    { Icon: Factory, color: "text-blue-600", label: "Production" },
    { Icon: Briefcase, color: "text-slate-500", label: "Consulting" },
    { Icon: Home, color: "text-emerald-600", label: "Property" },
  ];

  // Calculate 3D positions for icons on sphere surface
  // Using spherical coordinates distributed evenly
  const getIconPosition = (index: number, total: number) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;

    const radius = 175; // Sphere radius
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    return { x, y, z };
  };

  return (
    <div
      ref={sphereRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden hidden lg:flex"
      aria-hidden="true"
    >
      {/* Warm glow background */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-100/10 via-transparent to-transparent blur-3xl" />

      {/* 3D Sphere Container */}
      <div
        className="relative"
        style={{
          width: "350px",
          height: "350px",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Rotating sphere */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            animation: isVisible && !prefersReducedMotion
              ? "rotateSphere 30s linear infinite"
              : "none",
            willChange: "transform",
          }}
        >
          {industries.map((industry, index) => {
            const pos = getIconPosition(index, industries.length);

            return (
              <div
                key={industry.label}
                className="absolute"
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)`,
                  transformStyle: "preserve-3d",
                  left: "50%",
                  top: "50%",
                  marginLeft: "-32px",
                  marginTop: "-32px",
                }}
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center ${industry.color} opacity-60 hover:opacity-80 transition-opacity duration-300 shadow-lg`}
                  style={{
                    transform: `rotateY(${-Math.atan2(pos.x, pos.z)}rad) rotateX(${Math.atan2(pos.y, Math.sqrt(pos.x * pos.x + pos.z * pos.z))}rad)`,
                  }}
                >
                  <industry.Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes rotateSphere {
          from {
            transform: rotateY(0deg) rotateX(10deg);
          }
          to {
            transform: rotateY(360deg) rotateX(10deg);
          }
        }
      `}</style>
    </div>
  );
};

export default IndustrySphere3D;
