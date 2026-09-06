import type { ReactNode } from "react";

/**
 * A section header in the Ledger language: a small uppercase label above a display-face
 * heading, left-aligned, on a hairline rule.
 *
 * This replaces the pattern that made all 14 marketing pages read as the same template —
 * a pill badge above a centred h2 with one word coloured primary. Structure carries the
 * distinctiveness; colour carries the brand, so nothing here is tinted.
 *
 * See .okf/site/design-system.md.
 */
export default function SectionHeading({
  label,
  title,
  lede,
  align = "left",
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <header
      className={`border-t border-rule-strong/25 pt-5 ${centered ? "text-center" : ""}`}
    >
      <p className="ledger-label">{label}</p>
      <h2 className="display mt-3 text-3xl text-foreground md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
