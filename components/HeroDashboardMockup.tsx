import { TrendingUp, MessageCircle, ShoppingBag, Users, ArrowUpRight } from "lucide-react";

const HeroDashboardMockup = () => {
  return (
    <div className="relative w-full h-[300px] lg:h-[330px]">
      {/* Main dashboard card */}
      <div className="absolute top-0 left-0 right-6 glass-card p-5 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-foreground">Website Visitors</p>
          <span className="flex items-center gap-1 text-[11px] font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="w-3 h-3" />
            +147%
          </span>
        </div>
        <p className="text-2xl font-extrabold text-foreground tracking-tight">1,247</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">This month</p>

        {/* Mini chart bars */}
        <div className="flex items-end gap-1 mt-3 h-10">
          {[35, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-primary/20"
              style={{ height: `${h}%` }}
            >
              <div
                className="w-full rounded-sm bg-primary"
                style={{ height: `${Math.min(h + 20, 100)}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp inquiry card */}
      <div className="absolute top-28 -right-1 lg:right-0 warm-card p-3 rounded-xl shadow-lg w-56 rotate-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-foreground">New inquiry from Google</p>
            <p className="text-[10px] text-muted-foreground">WhatsApp - 2 min ago</p>
          </div>
        </div>
      </div>

      {/* Orders card */}
      <div className="absolute bottom-12 left-3 glass-card p-3 rounded-xl shadow-lg -rotate-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Orders Today</p>
            <p className="text-lg font-extrabold text-foreground">12</p>
          </div>
        </div>
      </div>

      {/* Customers card */}
      <div className="absolute bottom-0 right-6 success-card p-3 rounded-xl shadow-lg rotate-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Repeat Customers</p>
            <p className="text-lg font-extrabold text-foreground">73%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboardMockup;
