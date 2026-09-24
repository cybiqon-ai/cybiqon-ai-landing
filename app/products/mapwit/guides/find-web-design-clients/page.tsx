import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/mapwit/GuideLayout";
import { MAPWIT_STORE_URL, guideBySlug, guidePath } from "@/data/mapwitGuides";

/**
 * Guide 3. Target `how to find web design clients`, which passed demand_check.py in India
 * and the US on 24 Sep 2026, along with "how to get clients for web design".
 *
 * Its own ground, against guides 1 and 2: those end at a list. This one starts there and
 * covers the part that decides whether the list earns anything — which businesses can pay,
 * what to open with so the call is about something the owner can check while you talk, and
 * what to charge.
 *
 * Claims discipline: the only client work named is what is published on /case-studies.
 * No conversion rates, no "agencies we work with", no invented outreach numbers.
 */

const guide = guideBySlug("find-web-design-clients")!;
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
    q: "How do I find web design clients with no portfolio?",
    a: "Pick businesses whose problem is visible from outside — no website, or one that fails on a phone — so the conversation is about their site rather than your track record. Then show the work instead of describing it: a one-page mock of their own homepage is worth more than a portfolio of other people's. Two or three real jobs, done properly and published, end this problem permanently.",
  },
  {
    q: "Is cold outreach worth it for web design?",
    a: "At volume, rarely. Sending the same message to five hundred businesses is a numbers game you will lose to spam filters and indifference. Twenty businesses you have actually looked at — whose site you have opened, whose reviews you have read — is a different activity with a different reply rate, and it is the only version of outreach worth your morning.",
  },
  {
    q: "How many businesses should I contact a day?",
    a: "Fewer than you think, researched more than you think. Ten to twenty properly prepared approaches a day is sustainable alongside delivery work, and each one should reference something specific about that business. If you cannot say why you picked them, you have not picked them.",
  },
  {
    q: "Should I build a free website to win a client?",
    a: "Build a piece of one, not all of it. A single page showing their own content, on a phone, makes the argument in ten seconds and costs you an hour. A complete free site sets the price at zero and attracts people who will not pay for the second one.",
  },
  {
    q: "Where can I find web design clients in India?",
    a: "The same way as anywhere: pick one trade and one area you can serve, and work outward from there. Ignore the published percentages of businesses without websites — they disagree with each other and none of them is about your city. One Maps search with a no-website filter gives you your own number for your own trade in an afternoon, which is the only one worth planning against.",
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
          Finding businesses is the easy part, and{" "}
          <Link href={guidePath("find-businesses-without-websites")}>
            the other guides here cover it
          </Link>
          . A list is not clients. What turns one into the other is picking the businesses
          that can actually pay, opening with something the owner can check while you are
          talking, and knowing what to charge before they ask.
        </p>

        <h2>Where web design clients actually come from</h2>
        <p>
          In rough order of how well they work, and it is worth being honest that the best one
          is not a technique:
        </p>
        <ol>
          <li>
            <strong>People who already know you.</strong>{" "}Past clients, their neighbours, the
            accountant who sees forty small businesses a month. Nothing else converts like it,
            and if you have any of these, work them before reading further.
          </li>
          <li>
            <strong>Businesses whose problem you can see.</strong>{" "}No website, or one that
            fails in public. This is the subject of this guide, and it is where you start when
            you have nobody to ask.
          </li>
          <li>
            <strong>Marketplaces and job boards.</strong>{" "}Fast to find, priced by whoever bids
            lowest. Useful for the first two jobs, corrosive as a habit.
          </li>
          <li>
            <strong>Inbound.</strong>{" "}A site and writing that bring people to you. Slow —
            months, not weeks — and the only one that compounds.
          </li>
        </ol>

        <h2>How to find web design clients on Google Maps</h2>
        <p>
          The method in one paragraph: search one trade in one area, collect the listings, keep
          the businesses with no website or a failing one, and check each before you contact
          them.{" "}
          <Link href={guidePath("find-businesses-without-websites")}>
            Finding businesses without websites
          </Link>{" "}
          covers the filtering, including the listings that only look website-less, and{" "}
          <Link href={guidePath("google-maps-lead-generation")}>the hub guide</Link>{" "}compares
          the four ways of collecting them.{" "}
          <a href={MAPWIT_STORE_URL} target="_blank" rel="noopener noreferrer">
            MapWit
          </a>{" "}
          does the collecting and scoring free, in your browser; nothing below depends on it.
        </p>

        <h2>Which businesses can actually pay</h2>
        <p>
          A missing website says a business needs you. It says nothing about whether it will
          spend. These are the signals that do, all visible before you call:
        </p>
        <ul>
          <li>
            <strong>Review volume.</strong>{" "}A business with a few hundred reviews is doing
            steady trade. Five reviews may be a hobby.
          </li>
          <li>
            <strong>Replies to reviews.</strong>{" "}Somebody is minding the business. That person
            is who you want on the phone, and they have already shown they answer things.
          </li>
          <li>
            <strong>More than one location.</strong>{" "}Two branches means budgets, and usually
            somebody whose job includes decisions like this.
          </li>
          <li>
            <strong>They already pay for something.</strong>{" "}A booking platform, an aggregator,
            a rented page. A business paying monthly rent for a web presence has both a budget
            and a reason to prefer owning one.
          </li>
          <li>
            <strong>The trade sells considered purchases.</strong>{" "}Clinics, interior designers,
            equipment dealers, wedding services. Customers research before choosing, so the
            absence of a site costs them real money.
          </li>
        </ul>
        <p>
          The inverse is worth saying too: a busy shop trading on footfall alone is a poor
          prospect however bad its web presence, and pitching it anyway is how prospecting
          earns its reputation.
        </p>

        <h2>What to say first</h2>
        <p>
          The opening decides everything, and the rule is simple: say something the owner can
          verify in the next ten seconds. Not a compliment, not a pitch — an observation
          about their business that is either true or false.
        </p>
        <table>
          <thead>
            <tr>
              <th>What you noticed</th>
              <th>What you open with</th>
              <th>What you are selling</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No website on the listing</td>
              <td>
                &ldquo;People searching for a {"{"}trade{"}"}{" "}in {"{"}area{"}"}{" "}find your Maps
                listing and then have nowhere to go.&rdquo;
              </td>
              <td>A first site, small and fast</td>
            </tr>
            <tr>
              <td>Site does not fit a phone</td>
              <td>
                &ldquo;Open your site on your phone — that is what most of your customers
                see.&rdquo;
              </td>
              <td>A rebuild, or a rescue</td>
            </tr>
            <tr>
              <td>Site is slow, or the footer year is old</td>
              <td>
                &ldquo;Your site takes about six seconds to open, and it still says
                2019.&rdquo;
              </td>
              <td>A rebuild they have already half-decided on</td>
            </tr>
            <tr>
              <td>Only a booking platform</td>
              <td>
                &ldquo;You are paying monthly for a page you do not own and cannot change.&rdquo;
              </td>
              <td>Ownership, with the booking kept</td>
            </tr>
            <tr>
              <td>Reviews mention the same gap</td>
              <td>
                &ldquo;Three reviews this month ask about your prices.&rdquo;
              </td>
              <td>The page that answers it</td>
            </tr>
          </tbody>
        </table>
        <p>
          Every one of those is checkable, which is what separates it from a sales call. The
          five site checks behind rows two and three — secure, fits a phone, opens quickly,
          not visibly abandoned, tap-to-call — are the ones MapWit grades automatically, and
          they were chosen precisely because a non-technical owner can confirm each one while
          you speak.
        </p>

        <h2>What to charge</h2>
        <p>
          Decide before the call, because the worst number is the one invented under pressure.
          Two things help:
        </p>
        <ul>
          <li>
            <strong>Publish your prices.</strong>{" "}
            <Link href="/pricing">Ours are on one page</Link>, which ends the discovery-call
            dance and filters out people shopping purely on price.
          </li>
          <li>
            <strong>Sell the three-year number, not the build.</strong>{" "}A cheaper quote usually
            renews at three to four times its advertised hosting rate and carries licences
            billed in dollars. The{" "}
            <Link href="/tools/website-cost-calculator">website cost calculator</Link>{" "}puts both
            options side by side, and it is a better answer to &ldquo;someone quoted me
            less&rdquo; than defending your rate.
          </li>
        </ul>
        <p>
          If you are quoting in India, agencies typically ask ₹50,000 and upward for a small
          business site; knowing that band stops you underpricing out of nervousness.
        </p>

        <h2>The part that is not lead generation</h2>
        <p>
          Two things decide whether any of this compounds. First, follow up — most replies come
          after the second contact, and most people send one. Second, publish the work: two
          finished sites you can point at beat any amount of prospecting.{" "}
          <Link href="/case-studies">Ours are here</Link>, and they are the reason later
          conversations are shorter than early ones.
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

        <h2>If you would rather not build it yourself</h2>
        <p>
          Some of the people reading this are looking for someone to build the site rather than
          to sell one. If that is you:{" "}
          <Link href="/services/custom-websites">we build custom websites</Link>, hand-written,
          with the source code and every credential yours on handover, and{" "}
          <Link href="/pricing">the prices are published</Link>.
        </p>
      </GuideLayout>
    </>
  );
}
