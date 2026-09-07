/**
 * The FAQ, as data.
 *
 * Extracted from app/faq/FaqClient.tsx on 7 Sep 2026, when that page stopped being a
 * client component. It matters that this is a flat, complete list: the page renders every
 * question in the HTML and the FAQPage schema is generated from the same array, so the
 * markup and the visible content cannot disagree.
 *
 * They used to. The old page filtered by category in React state, so only the active
 * category's questions reached the DOM — 3 of 16 — while the schema declared all 16.
 * Google requires FAQ markup to match content that is actually visible on the page.
 */

export type FaqItem = { q: string; a: string };
export type FaqCategory = { id: string; name: string; questions: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "general",
    name: "General",
    questions: [
      {
        q: "Who is Cybiqon AI Solutions?",
        a: "We're a digital solutions agency focused exclusively on helping MSMEs (Micro, Small, and Medium Enterprises) get online and automate their work. We believe small businesses deserve access to modern, affordable technology—not just large enterprises."
      },
      {
        q: "What types of businesses do you work with?",
        a: "We specialize in MSMEs across all industries—retail, consulting, home services, restaurants, healthcare, education, and more. If you're a small or medium business looking to grow your online presence, we can help."
      },
      {
        q: "Do I need technical knowledge to work with you?",
        a: "Not at all! We explain everything in plain English, handle all the technical work, and guide you through every step. You focus on running your business—we'll handle the tech."
      }
    ]
  },
  {
    id: "pricing",
    name: "Pricing",
    questions: [
      {
        q: "How much does a website cost?",
        a: "Our website packages start at ₹9,999, with custom solutions quoted based on your specific needs. See our Pricing page for the latest plans — all prices are transparent, one-time, with no hidden fees."
      },
      {
        q: "Are there monthly fees?",
        a: "No monthly fees from us! You only pay for domain registration (~₹500-1000/year) and hosting (~₹3000-5000/year). We can help you set these up or recommend trusted providers."
      },
      {
        q: "What's included in the price?",
        a: "Everything needed for a complete website: design, development, mobile optimization, SEO setup, Google Analytics, contact forms, WhatsApp integration, testing, launch, and 3-12 months of support (depending on package)."
      }
    ]
  },
  {
    id: "process",
    name: "Process",
    questions: [
      {
        q: "How long does it take to build a website?",
        a: "A standard website takes 2-3 weeks from kickoff to launch. Larger or custom projects vary based on complexity. We'll give you an exact timeline during the consultation."
      },
      {
        q: "What's the process like?",
        a: "We follow a clear 5-step process: (1) Discovery Call, (2) Planning & Design, (3) Development, (4) Testing & Launch, (5) Support & Growth. You'll know exactly what's happening at every stage."
      },
      {
        q: "What do I need to provide?",
        a: "Mainly your business content (text, images, service descriptions) and brand assets (logo, colors if you have them). Don't have everything ready? No problem—we'll guide you through what we need."
      }
    ]
  },
  {
    id: "technical",
    name: "Technical",
    questions: [
      {
        q: "Will my website work on mobile phones?",
        a: "Yes! All our websites are fully mobile-responsive and tested on phones, tablets, and desktops. Around 60-70% of your visitors will likely be on mobile, so this is a top priority for us."
      },
      {
        q: "Will my website show up on Google?",
        a: "We optimize every website for SEO from day one: proper structure, meta tags, fast loading, mobile-friendliness, and Google Search Console setup. Ranking takes time (2-3 months typically), but we set you up for success."
      },
      {
        q: "Can you integrate WhatsApp, forms, or booking systems?",
        a: "Yes! We can integrate WhatsApp chat, contact forms, booking/scheduling tools, CRM systems, payment gateways, and more. Some integrations are included in standard packages; others are add-ons."
      }
    ]
  },
  {
    id: "support",
    name: "Support",
    questions: [
      {
        q: "What's included in post-launch support?",
        a: "Bug fixes, minor content updates (text/images), performance monitoring, and email/WhatsApp support. Depending on your package, you get 3-12 months of this included."
      },
      {
        q: "What happens after support ends?",
        a: "You're never locked in! After support ends, you can: (1) Continue with a maintenance package starting at ₹2000/month, (2) Request one-time updates as needed, or (3) Take full control of your website."
      }
    ]
  },
  {
    id: "security",
    name: "Security",
    questions: [
      {
        q: "Is my website secure?",
        a: "Yes! We implement HTTPS/SSL encryption, secure hosting, regular updates, and follow best practices for security. Your site and customer data are protected."
      },
      {
        q: "Who owns the website?",
        a: "You do! Once you pay in full, you own the website and all its content. We can provide you with all files, code, and credentials anytime you ask."
      }
    ]
  }
];

export const ALL_FAQS = FAQ_CATEGORIES.flatMap((c) => c.questions);
