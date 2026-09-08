import type { ReactNode } from "react";

/**
 * The comp's section header: vermilion eyebrow, navy heading, grey lede.
 *
 * The uppercase eyebrow is a device I removed from a previous version of this page as an
 * AI-design tell, and putting it back is deliberate. On a long scrolling sales page it
 * marks where each section starts, it is the comp's own device, and it is now the only
 * uppercase on the page rather than the label on every block.
 */
const SectionHeading = ({
  eyebrow,
  title,
  lede,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
}) => (
  <header className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    <p className="t-eyebrow text-accent">{eyebrow}</p>
    <h2 className="t-h2 mt-2.5 text-primary">{title}</h2>
    {lede ? <p className="t-body-lg mt-3 text-muted-foreground">{lede}</p> : null}
  </header>
);

export default SectionHeading;
