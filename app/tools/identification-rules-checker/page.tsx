import Breadcrumbs from "@/components/Breadcrumbs";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";
import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "Identification Rules Checker | 1031 Exchange San Antonio",
  description: "Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges. Free tool for San Antonio, TX investors.",
  keywords: "1031 identification rules, three property rule, 200 percent rule, 95 percent exception, 1031 exchange calculator, San Antonio",
  openGraph: {
    title: "Identification Rules Checker | 1031 Exchange San Antonio",
    description: "Validate your property identification against the 3-property, 200%, or 95% identification rules.",
    type: "website",
    url: `https://${site.website}/tools/identification-rules-checker`,
  },
  alternates: {
    canonical: `https://${site.website}/tools/identification-rules-checker`,
  },
};

export default function IdentificationRulesCheckerPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Identification Rules Checker" },
  ];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://${site.website}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `https://${site.website}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Identification Rules Checker",
        item: `https://${site.website}/tools/identification-rules-checker`,
      },
    ],
  };

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Identification Rules Checker",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Validate property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      <main className="min-h-screen bg-paper">
        <div className="container mx-auto px-4 py-12 md:px-8 md:py-20">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Identification Rules Checker
            </h1>
            <p className="text-lg text-ink/80 mb-8">
              Validate your property identification against the 3-property, 200%, or 95% identification rules for 1031 exchanges. Understanding these rules helps ensure your exchange qualifies for tax deferral.
            </p>

            <IdentificationRulesChecker />

            <div className="mt-8 rounded-lg border border-outline bg-panel p-6">
              <p className="text-sm text-ink/80">
                <strong className="text-heading">Educational content only.</strong> Not tax, legal, or investment advice. 
                Results are estimates only. Consult a qualified intermediary and tax advisor before 
                making decisions. Texas does not impose a state real estate transfer tax. Recording fees 
                and title insurance premiums still apply.
              </p>
            </div>

            <div className="mt-12 border-t border-outline pt-8">
              <h2 className="text-2xl font-bold text-heading mb-4">
                Related Resources
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-primary hover:underline">
                    View All Services
                  </Link>
                </li>
                <li>
                  <Link href="/tools/boot-calculator" className="text-primary hover:underline">
                    Boot Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/exchange-cost-estimator" className="text-primary hover:underline">
                    Exchange Cost Estimator
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary hover:underline">
                    Contact Us for Expert Guidance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

