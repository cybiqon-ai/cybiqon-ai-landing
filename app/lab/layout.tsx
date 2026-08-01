import type { Metadata } from "next";
import { Archivo, DM_Mono, Source_Serif_4 } from "next/font/google";
import LabHeader from "@/components/lab/LabHeader";
import LabFooter from "@/components/lab/LabFooter";

/**
 * /lab's own chrome and type system.
 *
 * The fonts are loaded HERE and not in app/layout.tsx on purpose: three families in
 * the root layout would make all 14 marketing pages preload faces they never render.
 * design-system.md flags this specifically as the condition for adding Archivo at all.
 *
 * components/ThemeScope.tsx suppresses Navbar/Footer/WhatsAppWidget for this subtree,
 * so LabHeader and LabFooter below are the entire chrome.
 */

// Variable font. Passing a `weight` key alongside `axes` makes next/font throw at
// build time — the wght axis is supplied through font-variation-settings in the
// .lab-display / .lab-prose rules instead.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

// Static family — weights 400/500 only, so `weight` is required here and `axes`
// would be an error. The opposite of Archivo above, which is easy to get backwards.
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // The root template appends "| Cybiqon AI Solutions" to every child title. Left as
  // is deliberately: /lab is the company's blog, not a separate publication, and
  // seo.md records the double-brand trap that comes from fighting the template.
  alternates: {
    types: { "application/rss+xml": "/lab/rss.xml" },
  },
};

/**
 * Sets `data-lab-theme` on <html> before first paint, from localStorage.
 *
 * A **data attribute**, and one React never renders — that is the whole trick, and it
 * took two wrong turns to find:
 *
 *   1. A *class* on <html> fails silently. app/layout.tsx renders
 *      `<html className={geist.variable}>`, so React owns that prop and hydration
 *      reconciles the added class away. Renders dark, toggle appears not to persist,
 *      nothing errors. Confirmed by dumping the post-hydration DOM.
 *   2. Rendering the class server-side from a cookie is correct but makes the whole
 *      /lab segment dynamic — which turned /lab/about into a third edge function and
 *      pushed the Worker past Cloudflare's 3 MiB free-plan limit. The deploy failed on
 *      upload, not at build, so `next-on-pages` had passed locally.
 *
 * React does not reconcile attributes it never set, so this survives hydration. And
 * because nothing here reads request state, /lab/about prerenders as static rather
 * than costing an edge function.
 *
 * Dark is the default. prefers-color-scheme is deliberately NOT consulted: a visitor
 * arriving from the white marketing site has an OS preference that says nothing about
 * which of two designs they want here, and honouring it would hand most readers the
 * one that was not designed first.
 */
const NO_FLASH =
  `try{document.documentElement.dataset.labTheme=` +
  `localStorage.getItem('lab-theme')==='noon'?'noon':'dusk'}catch(e){}`;

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      {/* flex column, not just min-h-screen: on a page shorter than the viewport the
          content block would end early and the root layout's white body background
          would show below the footer. flex-1 on the middle also stops LabFooter's top
          margin collapsing out of the themed box. */}
      <div
        className={`theme-lab ${archivo.variable} ${sourceSerif.variable} ${dmMono.variable} min-h-screen flex flex-col bg-background text-foreground`}
      >
        <LabHeader />
        <div className="flex-1">{children}</div>
        <LabFooter />
      </div>
    </>
  );
}
