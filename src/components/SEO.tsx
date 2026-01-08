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
  image = 'https://cybiqon.in/logo.png',
  keywords,
  structuredData,
}: SEOProps) => {
  const siteUrl = 'https://cybiqon.in';
  const siteName = 'Cybiqon AI Solutions';
  const fullTitle = title.includes('Cybiqon') ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

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
      telephone: '+91-92507-11473',
      contactType: 'customer service',
      email: 'support@cybiqon.in',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.linkedin.com/company/cybiqon-ai-solutions',
      'https://www.facebook.com/cybiqon.ai.solutions/',
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
      <meta name="author" content={siteName} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Language/Region */}
      <meta httpEquiv="content-language" content="en-IN" />
      <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} - Web Development & AI Solutions`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteName} - Web Development & AI Solutions`} />
      <meta name="twitter:site" content="@CybiqonAI" />
      <meta name="twitter:creator" content="@CybiqonAI" />

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
