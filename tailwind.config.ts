import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  // `./data/**` matters: class names living in a data file outside these globs are
  // purged silently in prod. `features/` is already unscanned for this reason.
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1600px",
      },
    },
    extend: {
      colors: {
        // Only these two are genuinely new — no shadcn slot exists for either.
        // Everything else the paper theme needs is an EXISTING var redefined
        // inside `.theme-paper` (see app/globals.css), so `bg-background` and
        // `text-foreground` keep working and mean the right thing in each scope.
        // Deliberately no `paper`/`ink`/`rule` keys: they would duplicate
        // background/foreground/border under a second name and drift apart.
        ochre: "hsl(var(--ochre))",
        "rule-strong": "hsl(var(--rule-strong))",

        // /lab's readout accent. Defined only inside .theme-lab, so `text-signal`
        // resolves to nothing anywhere else — which is the intent: it is the one
        // colour that means "this is a measurement", and it should not leak into
        // the marketing pages as a fourth brand hue.
        signal: "hsl(var(--signal))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'sans-serif'],

        // /lab only — the vars are set in app/lab/layout.tsx and exist nowhere else,
        // so these degrade to their fallback stacks if used off /lab.
        //
        // NOT named `heading`: Navbar.tsx and Footer.tsx both apply a `font-heading`
        // class that has never resolved to anything, and defining that key now would
        // silently restyle the wordmark on all 14 marketing pages.
        //
        // `mono` is also left alone deliberately — app/process/ProcessClient.tsx uses
        // font-mono, and redefining the key would change a page this work has no
        // business touching. Hence `readout`, which is what it is for anyway.
        display: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        prose: ['var(--font-source-serif)', 'Georgia', 'serif'],
        readout: ['var(--font-dm-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
