"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const OWNERS = [
  { initials: "RS", color: "bg-primary", name: "Ramesh S." },
  { initials: "PK", color: "bg-blue-500", name: "Priya K." },
  { initials: "VM", color: "bg-orange-500", name: "Vijay M." },
  { initials: "AJ", color: "bg-violet-500", name: "Anjali J." },
  { initials: "SK", color: "bg-amber-500", name: "Suresh K." },
];

function useLiveCount(base: number) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + (Math.random() > 0.6 ? 1 : 0));
    }, 15_000);
    return () => clearInterval(id);
  }, []);
  return count;
}

const HeroSocialProof = () => {
  const auditCount = useLiveCount(47);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href="/free-audit"
      className={`block glass-card px-4 py-3.5 mt-4 transition-all duration-700 hover:shadow-lg cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Stacked avatars */}
        <div className="flex items-center flex-shrink-0">
          {OWNERS.map((o, i) => (
            <div
              key={i}
              title={o.name}
              className={`relative flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white ${o.color} ${
                i > 0 ? "-ml-2" : ""
              }`}
            >
              {o.initials}
            </div>
          ))}
        </div>

        {/* Copy + live badge */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground leading-snug">
            <span className="font-semibold text-foreground">
              {auditCount} MSME owners
            </span>{" "}
            got their free audit this week
          </p>
        </div>

        {/* Live badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-semibold text-secondary flex-shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
          </span>
          Live
        </span>
      </div>
    </Link>
  );
};

export default HeroSocialProof;
