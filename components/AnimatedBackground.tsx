import { Store, Factory, Truck, ShoppingCart, Users, TrendingUp } from "lucide-react";

const businessIcons = [
  { Icon: Store, delay: 0, position: "top-20 left-10" },
  { Icon: Factory, delay: 1, position: "top-40 right-20" },
  { Icon: Truck, delay: 2, position: "bottom-40 left-20" },
  { Icon: ShoppingCart, delay: 3, position: "bottom-20 right-40" },
  { Icon: Users, delay: 1.5, position: "top-60 left-1/3" },
  { Icon: TrendingUp, delay: 2.5, position: "bottom-60 right-1/3" },
];

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Single restrained ambient wash — one hue, low opacity */}
      <div className="absolute -top-24 left-1/3 w-[44rem] h-[44rem] bg-primary/[0.06] rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-[34rem] h-[34rem] bg-primary/[0.04] rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      {/* Floating business icons — faint thematic texture */}
      {businessIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} opacity-[0.035] animate-float-slow`}
          style={{ animationDelay: `${item.delay}s` }}
        >
          <item.Icon className="w-16 h-16 md:w-24 md:h-24 text-primary" />
        </div>
      ))}

      {/* Connection dots/grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.10]">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="1.5" fill="hsl(var(--primary))" className="animate-pulse" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
