import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url }) {
  const defaultTitle = 'GACE | Fabricación de Malla Plástica y Poliburbuja en México';
  const defaultDescription = 'Fabricantes directos de mallas plásticas (reforzada, suave, protección), poliburbuja y polifom. Soluciones para industria, agro y empaque en México.';
  const siteUrl = url || 'https://www.gace.com.mx';

  // Schema Markup for LocalBusiness / Organization
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GACE",
    "url": siteUrl,
    "logo": `${siteUrl}/logo-gace-oficial-trimmed.png`,
    "description": defaultDescription,
    "telephone": "+525586763800",
    "email": "valebuca@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MX"
    },
    "sameAs": []
  };

  return (
    <Helmet>
      <html lang="es" />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={siteUrl} />
      
      {/* Meta Keywords - Not heavily used by Google nowadays, but requested for SEO */}
      <meta name="keywords" content="fabricante de mallas plasticas, poliburbuja en rollo, polifom, malla reforzada, malla suave, malla de proteccion, malla memoria, empaque industrial, malla agricola, fabrica gace, mexico" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />

      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
}
