import site from "@/content/site.json";
import StickyCall from "@/components/StickyCall";
import BottomCTA from "@/components/BottomCTA";
import HomePageContent from "@/components/HomePageContent";

export default function Home() {

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": site.company,
    "url": `https://${site.website}`,
    "telephone": site.phone,
    "email": site.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": site.address.split(",")[0],
      "addressLocality": site.mainCity,
      "addressRegion": site.state,
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": [
      "1031 Exchange Services",
      "1031 Exchange Replacement Property Identification",
      "Direct Real Estate Replacement Options",
      "Net Lease Replacement Properties",
      "Delaware Statutory Trust Information",
      "Qualified Intermediary Introductions",
      "Inherited Investment Property Exchange Guidance"
    ],
    "description": "Turnkey 1031 exchange solutions for San Antonio property owners, including free exchange guidance, replacement-property identification, direct and passive property options, and professional introductions through closing."
  };

  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": site.company,
    "image": `https://${site.website}/1031-exchange-san-antonio-tx-logo.png`,
    "telephone": site.phone,
    "email": site.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": site.address.split(",")[0],
      "addressLocality": site.mainCity,
      "addressRegion": site.state,
      "postalCode": site.address.split(",")[2]?.trim() || "",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "29.4241",
      "longitude": "-98.4936"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }}
      />
      <HomePageContent />
      <BottomCTA />
      
      <StickyCall phone={site.phone} />
    </>
  );
}
