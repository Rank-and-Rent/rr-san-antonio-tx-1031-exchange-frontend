import Breadcrumbs from "@/components/Breadcrumbs";
import BootCalculator from "@/components/tools/BootCalculator";
import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";

export const metadata: Metadata = {
  title: "Boot Calculator | 1031 Exchange San Antonio",
  description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange. Free tool for San Antonio, TX investors.",
  keywords: "boot calculator, 1031 exchange boot, mortgage boot, cash boot, 1031 exchange calculator, San Antonio",
  openGraph: {
    title: "Boot Calculator | 1031 Exchange San Antonio",
    description: "Calculate boot and estimate tax implications for your 1031 exchange.",
    type: "website",
    url: `https://${site.website}/tools/boot-calculator`,
  },
  alternates: {
    canonical: `https://${site.website}/tools/boot-calculator`,
  },
};

export default function BootCalculatorPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Boot Calculator" },
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
        name: "Boot Calculator",
        item: `https://${site.website}/tools/boot-calculator`,
      },
    ],
  };

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Boot Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for 1031 exchanges.",
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
              Boot Calculator
            </h1>
            <p className="text-lg text-ink/80 mb-8">
              Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange. Boot occurs when you receive cash or have debt relief in excess of what you reinvest.
            </p>

            <BootCalculator />

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
                  <Link href="/tools/exchange-cost-estimator" className="text-primary hover:underline">
                    Exchange Cost Estimator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/identification-rules-checker" className="text-primary hover:underline">
                    Identification Rules Checker
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

