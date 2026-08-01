import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

/**
 * /lab's entire top chrome. Deliberately one rule and four items — the marketing
 * Navbar has nine links and a CTA button, which is right for someone deciding whether
 * to buy a website and wrong for someone about to read 2,700 words.
 */
export default function LabHeader() {
  const link =
    "lab-readout text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[3px] px-1";

  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/lab"
            className="lab-readout text-foreground hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[3px]"
          >
            Cybiqon Lab
          </Link>

          <nav className="flex items-center gap-1 sm:gap-3">
            <Link href="/lab/about" className={link}>
              About
            </Link>
            <a href="/lab/rss.xml" className={link}>
              RSS
            </a>
            {/* The one link back to the company. Not a nav bar — a reader who wants to
                know who wrote this should be able to find out in one hop, and no more
                than that. */}
            <Link href="/" className={link}>
              cybiqon.in&nbsp;↗
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
