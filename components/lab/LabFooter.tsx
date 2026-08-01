import Link from "next/link";

export default function LabFooter() {
  const link =
    "hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[3px]";

  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-8">
        <div className="lab-readout flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
          <span className="text-foreground">Cybiqon Lab</span>
          <Link href="/lab/about" className={link}>
            Who writes this
          </Link>
          <a href="/lab/rss.xml" className={link}>
            RSS
          </a>
          <Link href="/blog" className={link}>
            MSME blog
          </Link>
          <Link href="/" className={link}>
            cybiqon.in
          </Link>
        </div>
      </div>
    </footer>
  );
}
