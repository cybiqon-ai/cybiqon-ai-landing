import type { Metadata } from "next";
import Link from "next/link";

// No `runtime = "edge"` and no dynamic data: this page prerenders as static.
//
// That is a size decision, not a style one. Every React route compiled for the edge
// costs ~440 KiB gzipped in the Worker, and six of them put the bundle over
// Cloudflare's 3 MiB free-plan limit — the deploy fails at upload, after
// `next-on-pages` has already reported success locally. Keeping this page static is
// what buys the headroom back. The lab layout must therefore stay free of cookies(),
// headers() and searchParams.

const siteUrl = "https://cybiqon.in";

/**
 * The author page.
 *
 * seo.md lists "no author / E-E-A-T page" as an open gap: every post on this domain
 * was attributed to "Cybiqon Team", a name with nothing behind it. /lab is written by
 * one identifiable person, so this page says who, what they do elsewhere, and what
 * standard the writing is held to.
 *
 * Facts here are sourced from the public portfolio at itspyguru.github.io and are
 * verifiable through the profiles linked below. Nothing on this page should be
 * anything a reader cannot check.
 */
const AUTHOR = {
  name: "Prajjwal Pathak",
  alias: "pyGuru",
  location: "Varanasi, India",
  github: "https://github.com/itspyguru",
  linkedin: "https://www.linkedin.com/in/itspyguru/",
  youtube: "https://www.youtube.com/@itspyguru",
  portfolio: "https://itspyguru.github.io/",
};

export const metadata: Metadata = {
  title: "Who writes this",
  description:
    "Cybiqon Lab is written by Prajjwal Pathak — backend and automation engineer, and the person behind Cybiqon.",
  alternates: { canonical: "/lab/about" },
  openGraph: {
    type: "profile",
    title: "Who writes Cybiqon Lab",
    description:
      "Prajjwal Pathak — backend and automation engineer, and the person behind Cybiqon.",
    url: `${siteUrl}/lab/about`,
  },
};

export default function LabAbout() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    alternateName: AUTHOR.alias,
    url: `${siteUrl}/lab/about`,
    jobTitle: "Software Engineer",
    knowsAbout: [
      "Backend development",
      "Automation",
      "AI agents",
      "Python",
      "Cloudflare Workers",
    ],
    address: { "@type": "PostalAddress", addressLocality: "Varanasi", addressCountry: "IN" },
    sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.youtube, AUTHOR.portfolio],
    worksFor: { "@type": "Organization", name: "Cybiqon AI Solutions", url: siteUrl },
  };

  const link =
    "text-primary underline decoration-primary/35 underline-offset-[3px] hover:decoration-primary transition-colors";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="pt-12 pb-20 md:pt-20 max-w-[680px]">
          <Link
            href="/lab"
            className="lab-readout text-muted-foreground hover:text-signal transition-colors"
          >
            ← Lab
          </Link>

          <div className="lab-measure mt-6">
            <h1 className="lab-display text-[34px] md:text-[44px] text-foreground">
              Who writes this
            </h1>
          </div>

          <div className="lab-prose mt-7">
            <p>
              I&rsquo;m {AUTHOR.name} — {AUTHOR.alias} most places online. I build
              backend systems, automation and AI agents, I teach Python to about twenty
              thousand people on YouTube, and I run{" "}
              <Link href="/" className={link}>
                Cybiqon
              </Link>{" "}
              from {AUTHOR.location}.
            </p>
            <p>
              Cybiqon is a one-person software company. It builds websites, apps and
              automation for Indian small and medium businesses — that work is described
              on the{" "}
              <Link href="/" className={link}>
                main site
              </Link>
              , and written about on the{" "}
              <Link href="/blog" className={link}>
                MSME blog
              </Link>
              .
            </p>
            <p>
              This section is the other half: the engineering. What I&rsquo;m building,
              which parts of it broke, and what the numbers said afterwards. It exists
              because the interesting details of running a small software company are
              exactly the ones that never make it into marketing copy.
            </p>

            <h2>What you can expect</h2>
            <p>
              Posts here carry a measurement rail — word count, reading time, sources
              cited, and whatever the post actually counted. That is not decoration. The
              house rule for everything this company automates is that{" "}
              <em>a process which can fail silently must report a count, not a status</em>
              , and it would be strange to hold the crons to a standard the writing
              ignores.
            </p>
            <p>
              So: figures are first-party where I say they are, sources are linked rather
              than alluded to, and when I get something wrong I correct it in place and
              say what changed. Posts are written by hand. Nothing here is generated on a
              schedule — which is also why there isn&rsquo;t one.
            </p>

            <h2>Elsewhere</h2>
            <p>
              <a href={AUTHOR.github} className={link} rel="me noopener noreferrer" target="_blank">
                GitHub
              </a>
              {" · "}
              <a href={AUTHOR.linkedin} className={link} rel="me noopener noreferrer" target="_blank">
                LinkedIn
              </a>
              {" · "}
              <a href={AUTHOR.youtube} className={link} rel="me noopener noreferrer" target="_blank">
                YouTube
              </a>
              {" · "}
              <a href={AUTHOR.portfolio} className={link} rel="me noopener noreferrer" target="_blank">
                Portfolio
              </a>
              {" · "}
              <a href="/lab/rss.xml" className={link}>
                RSS
              </a>
            </p>
            <p>
              To talk about work, <a href="mailto:support@cybiqon.in" className={link}>email
              Cybiqon</a> or{" "}
              <a
                href="https://tidycal.com/itspyguru/cybiqon-30-minute-meeting"
                className={link}
                rel="noopener noreferrer"
                target="_blank"
              >
                book half an hour
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
