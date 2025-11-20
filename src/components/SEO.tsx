import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  keywords?: string;
  structuredData?: object | object[];
}

const SEO = ({
  title,
  description,
  canonical,
  type = 'website',
  image = 'https://lovable.dev/opengraph-image-p98pqg.png',
  keywords,
  structuredData,
}: SEOProps) => {
  const siteUrl = 'https://cybiqon.in';
  const fullTitle = title.includes('Cybiqon') ? title : `${title} | Cybiqon AI Solutions`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;

  // Default Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cybiqon AI Solutions',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Modern websites and AI-powered automation solutions for MSMEs in India',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-88962-70660',
      contactType: 'customer service',
      email: 'support@cybiqon.ai',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.instagram.com/cybiqon.ai',
      'https://t.me/cybiqonai'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Cybiqon AI Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Language/Region */}
      <meta httpEquiv="content-language" content="en-IN" />
      <link rel="alternate" hrefLang="en-IN" href={canonicalUrl || siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Cybiqon AI Solutions" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl || siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@CybiqonAI" />
      <meta name="twitter:creator" content="@CybiqonAI" />

      {/* Prerender.io meta for SPA */}
      <meta name="fragment" content="!" />

      {/* Organization Schema (always present) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Page-specific structured data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
};

export default SEO;
