import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/mapwit/GuideLayout";
import { MAPWIT_STORE_URL, guideBySlug, guidePath } from "@/data/mapwitGuides";

/**
 * Guide 2, the hub. Target `google maps lead generation`, which passed demand_check.py in
 * India and the US on 24 Sep 2026, along with "how to generate leads from google maps".
 *
 * Page one for this query is nine competing tools' blogs. The only way in is to publish
 * what a vendor cannot: all four methods compared including the ones we do not sell, what
 * a Maps listing does *not* contain, and the terms quoted rather than skipped. Writing
 * another "5 easy steps with our tool" piece would be the tenth of its kind.
 *
 * Google's Places API pricing is deliberately not quoted: the model changed in March 2025
 * and the figures we could verify disagreed, so the page links the pricing page instead.
 */

const guide = guideBySlug("google-maps-lead-generation")!;
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
    q: "What is Google Maps lead generation?",
    a: "Using the businesses listed on Google Maps as a source of sales prospects: you search a trade and a place, collect the listings, work out which of those businesses are worth approaching, and contact them. The collecting is the easy half. Deciding who is worth a call — who has no website, whose site is failing, who is busy enough to afford you — is the half that decides whether the list is worth anything.",
  },
  {
    q: "Is generating leads from Google Maps legal?",
    a: "It depends on how you collect the data and what you do with it, and this is not legal advice. Google's end-user Maps terms prohibit copying Maps content, mass downloading or creating bulk feeds of it, and building a business listings, mailing or telemarketing database for a service that substitutes for Maps. The licensed route for programmatic access is the Places API. Separately, contact details are often personal data: in India the DPDP Act governs how you store and use them, and most markets have an equivalent.",
  },
  {
    q: "Does Google Maps show business email addresses?",
    a: "No. A listing carries the name, category, address, phone, rating, review count and a website link if the business has one. Email is never in the listing. Any tool showing you one has visited the business's own website and found it there, which is a separate step you should know is happening.",
  },
  {
    q: "How many results can you get from one Google Maps search?",
    a: "About 120 for a given search, however you collect them. That is a property of Maps, not of the tool you use, and it is why narrow searches — one trade, one area — beat city-wide ones. Ten narrow searches give you a better list than one broad one, and let you measure which niche has the biggest gap.",
  },
  {
    q: "What is the difference between a lead list and a list of businesses?",
    a: "A list of businesses is everything the search returned. A lead list is the subset worth your time, ranked. The signals that separate them are visible before you call: whether a website exists, whether it works on a phone, how many reviews the business has, and whether anyone replies to them. A tool that exports 500 rows without those signals has given you homework, not leads.",
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
          Almost every guide to this subject is published by a company selling the tool it
          recommends, ours included — the difference is that this one says so at the top, and
          then covers the three approaches we do not sell.
        </p>
        <p>
          The useful thing to understand first: collecting businesses from Google Maps is the
          easy half, and every method below does it. The half that decides whether your list is
          worth anything is working out who is worth calling.
        </p>

        <h2>What Google Maps lead generation actually is</h2>
        <p>
          Every business on Maps has published a name, a category, an address, a phone number,
          opening hours and — if it has one — a website. They did that to be found by
          customers. Using the same listings to find businesses you could sell to is Google
          Maps lead generation, and its appeal is obvious: these are real trading businesses,
          not a purchased file, and the signal you need is often visible on the listing itself.
        </p>

        <h2>The four ways to generate leads from Google Maps</h2>
        <p>
          They differ in cost, in effort, and in how comfortable they are legally. Pick on
          those, not on which article you landed on.
        </p>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>What it costs</th>
              <th>Honest assessment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>By hand</td>
              <td>Only time</td>
              <td>
                Works, and needs nothing. Seconds per listing adds up to hours per area, which
                is the only real argument against it
              </td>
            </tr>
            <tr>
              <td>
                Google&rsquo;s own{" "}
                <a
                  href="https://developers.google.com/maps/documentation/places/web-service/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Places API
                </a>
              </td>
              <td>
                A monthly free allowance per request type, then metered — Google changed this
                model in March 2025, so read the{" "}
                <a
                  href="https://mapsplatform.google.com/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  current pricing
                </a>{" "}
                rather than any figure in an article
              </td>
              <td>
                The licensed route, and the only one Google positively endorses. Needs a
                developer, and still gives you no email addresses
              </td>
            </tr>
            <tr>
              <td>A browser extension</td>
              <td>Free to about $50 a month</td>
              <td>
                Reads the results you are already looking at. Quality varies enormously;
                whether the data leaves your machine is the question worth asking
              </td>
            </tr>
            <tr>
              <td>A data service or bought list</td>
              <td>Per record, or per month</td>
              <td>
                Fastest to volume, and the rows have usually been sold to other people first.
                Also the method that sits furthest from Google&rsquo;s terms
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          MapWit is in the third row. It is free, and it keeps everything in your browser —
          there is no account and no server, which is a design decision with a cost: nothing
          syncs between your machines.
        </p>

        <h2>What a Maps listing does not contain</h2>
        <p>
          This is where most guides oversell, so here is the plain version.
        </p>
        <ul>
          <li>
            <strong>No email address.</strong>{" "}Never. Any tool that shows you one has visited
            the business&rsquo;s own site and read it from there. That is a reasonable thing to
            do and you should know it is happening, because it is a different activity from
            reading Maps.
          </li>
          <li>
            <strong>No named decision-maker.</strong>{" "}You get a business, not a person. For a
            two-person clinic that is the same thing; for anything larger it is not.
          </li>
          <li>
            <strong>About 120 results per search.</strong>{" "}A property of Maps, not of the tool.
            Narrow searches beat city-wide ones.
          </li>
          <li>
            <strong>A phone number that is often personal.</strong>{" "}A sole proprietor&rsquo;s
            mobile is their mobile, whatever it says on the listing.
          </li>
          <li>
            <strong>No indication of budget.</strong>{" "}Review count and rating hint at how busy
            a business is. They say nothing about what it will spend.
          </li>
        </ul>

        <h2>Turning a list of businesses into leads worth calling</h2>
        <p>
          The work is qualification, and it can be done before you dial, from signals anyone
          can read:
        </p>
        <ul>
          <li>
            <strong>Is there a website at all?</strong>{" "}The single strongest signal, and the
            one with the most false readings —{" "}
            <Link href={guidePath("find-businesses-without-websites")}>
              a listing that looks website-less often is not
            </Link>
            .
          </li>
          <li>
            <strong>If there is, does it work?</strong>{" "}Secure, loads on a phone, answers
            quickly, not visibly abandoned. Each failure is a sentence the owner can check
            while you are talking to them.
          </li>
          <li>
            <strong>Is the business alive?</strong>{" "}Recent reviews, and replies to them. A
            business answering its reviews is a business that will answer you.
          </li>
          <li>
            <strong>Do the reviews name a problem you fix?</strong>{" "}&ldquo;Couldn&rsquo;t find
            their prices&rdquo;, &ldquo;no one answers the phone&rdquo; — that is an opening
            line, not a complaint.
          </li>
        </ul>
        <p>
          MapWit scores these into one number out of ten so the list sorts itself; the full
          point table and the site-grade formula are in{" "}
          <Link href="/lab/mapwit-chrome-extension-google-maps-leads">
            the write-up of how it was built
          </Link>
          . You do not need the tool to use the signals — you need the signals.
        </p>

        <h2>How to generate leads from Google Maps, step by step</h2>
        <ol>
          <li>
            <strong>Pick one trade and one area.</strong> <em>Dentists in Pune</em>{" "}beats{" "}
            <em>businesses in Pune</em>, and gives you a number you can compare between trades.
          </li>
          <li>
            <strong>Collect the listings</strong>{" "}by whichever method above you chose.
          </li>
          <li>
            <strong>Fill in what the listing lacks</strong> — website quality, an email, recent
            reviews — knowing that this step reads the businesses&rsquo; own sites.
          </li>
          <li>
            <strong>Qualify and sort</strong>{" "}on the signals above, rather than working the
            list in the order Maps returned it.
          </li>
          <li>
            <strong>Take the top twenty and stop.</strong>{" "}Twenty researched businesses you
            actually contact beat two thousand rows you never open.
          </li>
        </ol>
        <p>
          With MapWit specifically, that is a search, Deep scan, the filter, and Export — the
          detailed version is in{" "}
          <Link href={guidePath("find-businesses-without-websites")}>
            the guide to finding businesses without websites
          </Link>
          .
        </p>

        <h2>What the rules allow</h2>
        <p>
          Worth reading once, properly, because most articles on this subject skip it
          entirely. Google&rsquo;s{" "}
          <a href="https://www.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">
            end-user Maps terms
          </a>{" "}
          say you may not copy Maps content, &ldquo;mass download or create bulk feeds of the
          content&rdquo;, or use it to build &ldquo;a business listings database, mailing list,
          or telemarketing list&rdquo; for a service that substitutes for Google Maps. For
          programmatic access at volume, the Places API is the licensed path and exists
          precisely for this.
        </p>
        <p>
          Then there is the data itself. Business contact details are frequently personal data,
          and in India the{" "}
          <a
            href="https://www.meity.gov.in/data-protection-framework"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digital Personal Data Protection Act
          </a>{" "}
          governs how you store and use them; most markets have an equivalent, and rules on
          unsolicited calls sit on top. A researched shortlist you contact personally is a
          different activity from assembling a database to resell, and keeping that distance is
          both the safer and the more effective way to work.
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

        <h2>If you are the one selling websites</h2>
        <p>
          Then the list above is the start of the job, not the end of it. What you quote
          matters as much as who you call:{" "}
          <Link href="/pricing">our prices are published</Link>, and the{" "}
          <Link href="/tools/website-cost-calculator">website cost calculator</Link> shows what
          a site costs over three years rather than on day one — useful when a prospect is
          comparing your number with a cheaper one.
        </p>
      </GuideLayout>
    </>
  );
}
