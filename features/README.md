# Cybiqon Hero Components

Four drop-in React/Next.js components for your hero section, built with Tailwind CSS.

---

## Components

| File | Purpose | Where to place |
|------|---------|---------------|
| `LiveActivityTicker.tsx` | Scrolling strip of live MSME client activity | Below `<Navbar />`, above hero |
| `SocialProofBar.tsx` | Avatar stack + live audit count + CTA | Inside hero, below headline |
| `IndustryPills.tsx` | Clickable industry category filter | Inside hero, above or below CTAs |
| `SavingsCalculator.tsx` | Interactive ₹ savings estimator | Hero sidebar or below-the-fold section |

---

## Quick Start

```bash
# All components use Tailwind CSS — no extra installs needed for a standard Next.js project
```

### 1. Copy files
Place all `.tsx` files into your `/components` folder.

### 2. Import into your hero
```tsx
// app/page.tsx or pages/index.tsx

import LiveActivityTicker  from "@/components/LiveActivityTicker";
import SocialProofBar      from "@/components/SocialProofBar";
import IndustryPills       from "@/components/IndustryPills";
import SavingsCalculator   from "@/components/SavingsCalculator";

export default function Home() {
  return (
    <>
      <Navbar />
      <LiveActivityTicker />          {/* full-width strip */}

      <section className="...">      {/* your hero section */}
        {/* Left column */}
        <div>
          <h1>Finally, Tech That Works for Indian MSMEs</h1>
          <SocialProofBar />
          <IndustryPills />
          {/* your existing CTAs */}
        </div>

        {/* Right column */}
        <div>
          <SavingsCalculator />
          {/* your existing stat cards */}
        </div>
      </section>
    </>
  );
}
```

---

## Tailwind Config Additions

Add these to `tailwind.config.ts` for the ticker animation and pill fade-in:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // ...
  theme: {
    extend: {
      animation: {
        ticker: "ticker 28s linear infinite",
        fadeIn: "fadeIn 0.25s ease",
      },
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

export default config;
```

---

## Customisation

### LiveActivityTicker
- Edit `TICKER_ITEMS` array with real client names and cities
- Change `animationDuration` (default `28s`) — lower = faster

### SocialProofBar
- Change base count in `useLiveCount(47)` to your real audit number
- Update `OWNERS` array with real client initials and brand colours

### IndustryPills
- Pass `onSelect` prop to trigger routing or filter logic
- Edit `COPY` object to update the per-industry description text
- Add/remove industries in `INDUSTRIES` array

### SavingsCalculator
- Tune multipliers in `useMemo()` — `0.65` (automation efficiency) and `0.15` (lead close rate)
- Update the CTA `/contact` link to your Calendly / booking URL
- Add Google Analytics event tracking on slider change or CTA click

---

## Colour System

All components use Cybiqon's green (`emerald-*`) as the primary accent, matching your existing hero CTA button. To change brand colour globally, find-replace `emerald` with your Tailwind colour (e.g. `green`, `teal`).
