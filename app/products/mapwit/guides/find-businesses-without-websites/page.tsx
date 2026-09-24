import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/mapwit/GuideLayout";
import { MAPWIT_STORE_URL, guideBySlug, guidePath } from "@/data/mapwitGuides";

/**
 * Guide 1. Target query `how to find businesses without websites for free`, which passed
 * demand_check.py in both India and the US on 22 Sep 2026.
 *
 * What it must not do: repeat the /lab post. That post already carries the seven-step
 * workflow, the score table and the site-grade formula (lines 122-168). This page's own
 * ground is the part nobody else writes down — that "no website" on Maps is frequently
 * wrong, why, and how to check — plus the honest limits on what may be done with a list.
 *
 * No screenshots: the repo holds only MapWit's icon, and inventing UI images for a page
 * that argues for checking your facts would be a poor joke.
 */

const guide = guideBySlug("find-businesses-without-websites")!;
const siteUrl = "https://cybiqon.in";
const url = `${siteUrl}${guidePath(guide.slug)}`;

export const metadata: Metadata = {
  title: guide.seoTitle,
  description: guide.excerpt,
  alternates: { canonical: guidePath(guide.slug) },
  openGraph: { title: guide.seoTitle, description: guide.excerpt, url, type: "article" },
};

const FAQS = [
  {
    q: "How do I find businesses without a website for free?",
    a: "Search Google Maps for a category and a place, open each listing and look for the Website button — if there is none, the business has no site. To do it in bulk without paying, use a free Chrome extension such as MapWit: it reads the results as you scroll and has a No website only filter, with no account and no server. Always spot-check a few by hand, because a listing that points at a booking platform often shows no website button while the business is perfectly reachable online.",
  },
  {
    q: "What percentage of small businesses have no website?",
    a: "Published figures vary so widely by country, city and trade that quoting one is close to meaningless. The number that matters is the one for the category and city you sell into, and you can measure it yourself in a few minutes: run one Maps search, apply a no-website filter, and divide. That figure is yours, current, and worth more than a survey average.",
  },
  {
    q: "Is a business with only a Facebook or Instagram page counted as having no website?",
    a: "For a sales list, usually yes. A social profile cannot be found on a search for the trade plus the city the way a site can, it cannot take bookings on its own terms, and the business does not own it. It is still worth noting separately, because the pitch is different: someone already posting weekly is easier to sell a site to than someone with no presence at all.",
  },
  {
    q: "Can I use a list of businesses from Google Maps for cold outreach?",
    a: "Carefully, and not in bulk. Google's end-user Maps terms prohibit copying Maps content and mass downloading or creating bulk feeds of it, and specifically prohibit building a business listings, mailing or telemarketing database for a service that substitutes for Maps. Separately, a sole proprietor's phone number is personal data — in India the Digital Personal Data Protection Act governs how you store and use it. Research a shortlist you intend to contact personally; do not assemble a database to resell.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.seoTitle,
    alternativeHeadline: guide.title,
    description: guide.excerpt,
    url,
    isAccessibleForFree: true,
    datePublished: guide.published,
    ...(guide.updated ? { dateModified: guide.updated } : {}),
    author: { "@type": "Organization", name: "Cybiqon AI Solutions", url: siteUrl },
    publisher: { "@type": "Organization", name: "Cybiqon AI Solutions", url: siteUrl },
    about: { "@type": "SoftwareApplication", name: "MapWit", url: MAPWIT_STORE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
      { "@type": "ListItem", position: 3, name: "MapWit", item: `${siteUrl}/products/mapwit` },
      { "@type": "ListItem", position: 4, name: guide.title, item: url },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Page() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <GuideLayout guide={guide}>
        <p>
          If you sell websites, the best prospect on Google Maps is the business that does not
          have one. It is already trading, already reviewed, already spending money to be found
          — and the gap you would be fixing is visible before you dial. The problem is that
          Maps will not show you a list of them, and a good number of the listings that look
          website-less turn out not to be.
        </p>
        <p>
          This is how to build that list for nothing, and how to check it before you call
          anyone.
        </p>

        <h2>Why businesses without websites are the best prospects on the map</h2>
        <p>
          Every other signal you can read from a listing is ambiguous. Few reviews might mean a
          new business or a quiet one. A low rating might be one bad week. No website is
          different: it is a concrete thing the business does not have, it costs them
          discoverability every day, and the fix is exactly what you sell.
        </p>
        <p>
          It also shortens the call. You are not opening with a service pitch, you are opening
          with a fact they already know and have probably been meaning to deal with.
        </p>

        <h2>Find them free, in about five minutes</h2>
        <p>
          <a href={MAPWIT_STORE_URL} target="_blank" rel="noopener noreferrer">
            MapWit
          </a>{" "}
          is a free Chrome side panel built for this. There is no account and no server: the
          list stays in your browser.
        </p>
        <ol>
          <li>
            <strong>Search the way you would anyway.</strong>{" "}A trade and a place works best —{" "}
            <em>dentists in Pune</em>, <em>interior designers in Indiranagar</em>. Google Maps
            returns about 120 results for a search, so make the search narrow rather than
            city-wide.
          </li>
          <li>
            <strong>Let the panel fill.</strong>{" "}Businesses appear as the results render, and{" "}
            <strong>Load more</strong>{" "}walks the rest of the list for you.
          </li>
          <li>
            <strong>Run Deep scan.</strong>{" "}This is the step that actually opens each listing
            for the website, phone, address and recent reviews. It is deliberately slow, so
            start it and go and do something else.
          </li>
          <li>
            <strong>Switch on “No website only”.</strong>{" "}The list collapses to the businesses
            with nothing to lose.
          </li>
          <li>
            <strong>Export to Excel.</strong>{" "}Work the list wherever you already work lists.
          </li>
        </ol>
        <p>
          The full workflow, including enrichment and how each lead is scored out of ten, is in{" "}
          <Link href="/lab/mapwit-chrome-extension-google-maps-leads">
            the write-up of how MapWit was built
          </Link>
          .
        </p>

        <h2>The trap: many businesses without websites actually have one</h2>
        <p>
          This is the part most guides skip, and it is the difference between a list you can
          call and a list that wastes a morning. A Maps listing with no website link does not
          reliably mean the business has no web presence.
        </p>
        <table>
          <thead>
            <tr>
              <th>What the listing shows</th>
              <th>What it usually means</th>
              <th>Worth calling?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No website button at all</td>
              <td>Genuinely no site</td>
              <td>Yes — the clearest case</td>
            </tr>
            <tr>
              <td>Link to a booking platform</td>
              <td>
                Booksy, Fresha, Setmore and a dozen others. They rent the business a page; the
                business owns nothing and ranks for nothing
              </td>
              <td>Yes — often the best pitch on the list</td>
            </tr>
            <tr>
              <td>Link back into Google</td>
              <td>
                A Google Business Profile page, not a website. MapWit itself once counted these
                as sites on google.co.in, which is how the rule got written
              </td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Link to Facebook or Instagram</td>
              <td>A social page doing a website’s job</td>
              <td>Yes, but a different pitch</td>
            </tr>
            <tr>
              <td>A real domain</td>
              <td>They have a site — the question becomes whether it is any good</td>
              <td>Only if the site is poor</td>
            </tr>
          </tbody>
        </table>
        <p>
          MapWit applies the first three rules for you: a listing whose only outbound link is a
          booking platform counts as having no website, and a link into Google is not a website
          at all. Whatever tool you use, spot-check ten rows by hand before you trust the whole
          file.
        </p>

        <h3>And the ones that have a bad website</h3>
        <p>
          A business with a slow, unreadable site is often an easier sale than one with none,
          because they have already accepted that they need a site and been disappointed once.
          MapWit grades each site out of ten on five checks a non-designer can say out loud on a
          call: served over HTTPS, has a mobile viewport, answers in under three seconds, shows
          a copyright year from this year or last, and has a{" "}
          <code>mailto:</code> or <code>tel:</code> link on the page. None of that is a taste
          judgement. “Your site doesn’t load on a phone” is a sentence a business owner can
          check while you are talking to them.
        </p>

        <h2>Which trades to search first</h2>
        <p>
          Not every business without a website is a prospect. Some trades genuinely do not
          need one, and calling them wastes the goodwill you would rather spend elsewhere. The
          question worth asking of each category is simple: does a customer choose this
          business <em>before</em>{" "}turning up, and does choosing involve checking something?
        </p>
        <ul>
          <li>
            <strong>Usually worth it:</strong>{" "}dentists, clinics, salons, gyms, tutors,
            interior designers, wedding services, equipment dealers, clinics with appointments.
            Customers research these, compare them, and want prices, timings or a portfolio
            before they commit.
          </li>
          <li>
            <strong>Usually not:</strong>{" "}a busy kirana, a roadside tyre shop, a stall in a
            market. They trade on proximity and footfall, and a website changes little. A
            listing and a phone number is genuinely enough for them.
          </li>
          <li>
            <strong>The interesting middle:</strong>{" "}restaurants and repair shops, which often
            live entirely inside an aggregator — Zomato, Swiggy, a marketplace — and pay for
            the privilege. The pitch there is not “you need a website”, it is “you are renting
            your customers”.
          </li>
        </ul>
        <p>
          Run one search per trade before you commit a week to any of them. Three searches
          tells you which category in your city has the biggest gap, which is a better basis
          than a hunch.
        </p>

        <h2>The other list: businesses whose website is the problem</h2>
        <p>
          The no-website filter hides a second group worth as much. A business with a site
          that fails on a phone has already decided a website matters, already paid for one,
          and already been let down — which is a shorter conversation than convincing someone
          from nothing.
        </p>
        <p>
          Sort by site grade instead of filtering, and look at everything scoring three or
          less out of ten. Those five checks map onto sentences you can say without sounding
          like a salesperson: <em>your site isn’t secure, so Chrome warns people</em>;{" "}
          <em>it doesn’t fit a phone screen</em>; <em>it takes six seconds to open</em>;{" "}
          <em>the footer still says 2019</em>; <em>there is no way to tap and call you</em>.
          Each is checkable by the owner while you are talking to them, which is what makes
          them land.
        </p>

        <h2>How to find businesses without websites by hand, free</h2>
        <p>
          If you would rather install nothing, the manual version works and costs only time:
        </p>
        <ol>
          <li>Search the trade and the area in Google Maps.</li>
          <li>
            Open each listing in turn and look for the Website button. Note the name, phone and
            what the button points at.
          </li>
          <li>
            Where it points at a booking platform or a social page, record that rather than
            treating it as a website.
          </li>
        </ol>
        <p>
          At even a few seconds a listing, one search’s worth of results is a long sitting,
          repeated for every area you work. That arithmetic is the entire argument for
          a tool — not that the manual method does not work.
        </p>

        <h2>What the list is actually worth</h2>
        <p>
          One narrow search gives you about 120 businesses. The share of those with no website
          varies so much by city and trade that any published percentage is close to useless to
          you — and you no longer need one, because you can measure your own in five minutes.
          Run the search, apply the filter, divide. Do it for three trades you can serve, and
          you know which market to work before you have made a single call.
        </p>
        <p>
          A word on what the list is not: it is not a database to resell, and volume is not the
          point. Twenty businesses you have actually looked at beat two thousand rows bought
          from someone who sold them twice.
        </p>

        <h2>What you may and may not do with it</h2>
        <p>
          Worth knowing before you build a process on top of this. Google’s{" "}
          <a
            href="https://www.google.com/help/terms_maps/"
            target="_blank"
            rel="noopener noreferrer"
          >
            end-user Maps terms
          </a>{" "}
          say you may not copy Maps content, “mass download or create bulk feeds of the
          content”, or use it to build “a business listings database, mailing list, or
          telemarketing list” for a service that substitutes for Google Maps. A researched
          shortlist you intend to contact yourself is a different activity from assembling a
          database, and the distance between them is worth keeping.
        </p>
        <p>
          Second, a business phone number is frequently a person’s phone number. In India the{" "}
          <a
            href="https://www.meity.gov.in/data-protection-framework"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digital Personal Data Protection Act
          </a>{" "}
          governs how you store and use it, and similar rules apply in most markets. A tool
          keeping the data on your own machine, as MapWit does, limits where it travels; what
          happens after you export is yours to answer for.
        </p>

        <h2>Frequently asked questions</h2>
        <dl>
          {FAQS.map((f) => (
            <div key={f.q}>
              <dt>
                <strong>{f.q}</strong>
              </dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <h2>If the business says yes</h2>
        <p>
          Then you need something to sell them. Ours are published:{" "}
          <Link href="/services/custom-websites">custom websites</Link> start at ₹9,999 and{" "}
          <Link href="/pricing">every price is on one page</Link>. If you would rather know what
          a site should cost before you quote one, the{" "}
          <Link href="/tools/website-cost-calculator">website cost calculator</Link> shows the
          three-year figure, not just the build price.
        </p>
      </GuideLayout>
    </>
  );
}
