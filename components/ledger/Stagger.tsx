"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * framer-motion orchestration for the marketing page bodies.
 *
 * ⚠️ BUDGET RULE — read before importing this anywhere new.
 *
 * The Cloudflare Worker has a 3 MiB gzipped ceiling enforced at upload, and the bundle
 * measured 2,973,065 B on 6 Sep 2026 — about 172 KiB of headroom. Only the 12 edge
 * routes count toward it (blog x3, lab x2, rss x2, sitemap, api x4); every marketing
 * page is prerendered to static HTML and costs zero Worker bytes.
 *
 * But the root layout is a 5x multiplier: Navbar, Footer, WhatsAppWidget, ThemeScope and
 * RevealObserver are compiled into all five ~433 KiB functions, and `sonner` — a client
 * library sitting in that layout — appears 121 times inside blog.func.js. Client library
 * code does land in the server bundle.
 *
 * So: this component is free in a page-body section, and expensive x5 in shared chrome.
 * Do not import it from Navbar, Footer, WhatsAppWidget, ThemeScope, RevealObserver, or
 * anything reachable from /blog, /lab, the RSS routes, the sitemap or /api.
 *
 * For ordinary section fade-ups, prefer the `.reveal` class — RevealObserver already runs
 * one shared IntersectionObserver for the whole site at no extra cost. Use this only
 * where the sequencing itself is the point.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Stagger({
  children,
  className = "",
  delayChildren = 0,
  stagger = 0.06,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: "0px 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  // Under prefers-reduced-motion the element still participates in the sequence, it
  // just arrives without travel or fade. Returning no variant at all would leave it
  // stuck in the parent's `hidden` state.
  const variants: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
