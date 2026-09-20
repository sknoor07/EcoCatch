
export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ecocatch.in/#organization",
        "name": "EcoCatch Energy Solutions Pvt. Ltd.",
        "url": "https://ecocatch.in",
        "logo": "https://ecocatch.in/mobile/icon_512.png",
        "description": "End-to-end biogas plant engineering, manufacturing, and installation across India. Transforming waste into clean energy since 2016.",
        "foundingDate": "2016",
        "founders": [
          {
            "@type": "Person",
            "name": "Yugal Roy"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-98929-06496",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.linkedin.com/company/ecocatch",
          // Add your other social links here
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ecocatch.in/#website",
        "url": "https://ecocatch.in",
        "name": "EcoCatch",
        "publisher": {
          "@id": "https://ecocatch.in/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}