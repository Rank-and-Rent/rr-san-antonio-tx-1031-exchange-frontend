import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "1031 Exchange Tools & Calculators | San Antonio",
  description: "Free 1031 exchange calculators and tools including boot calculator, exchange cost estimator, and identification rules checker. Tools for San Antonio, TX investors.",
  keywords: "1031 exchange tools, 1031 exchange calculator, boot calculator, exchange cost estimator, identification rules checker, San Antonio",
  openGraph: {
    title: "1031 Exchange Tools & Calculators | San Antonio",
    description: "Free 1031 exchange calculators and tools for investors.",
    type: "website",
    url: `https://${site.website}/tools`,
  },
  alternates: {
    canonical: `https://${site.website}/tools`,
  },
};

const tools = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange.",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs.",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your property identification against the 3-property, 200%, or 95% identification rules.",
  },
];

export default function ToolsPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools" },
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
    ],
  };

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "1031 Exchange Tools & Calculators",
    description: "Free 1031 exchange calculators and tools for investors.",
    url: `https://${site.website}/tools`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
      />
      <main className="min-h-screen bg-paper">
        <div className="container mx-auto px-4 py-12 md:px-8 md:py-20">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
              1031 Exchange Tools & Calculators
            </h1>
            <p className="text-xl text-ink/80 mb-12 max-w-3xl">
              Free tools and calculators to help you plan and execute your 1031 exchange. 
              Calculate boot, estimate costs, validate identification rules, and more.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="bg-panel border border-outline rounded-2xl p-6 hover:border-primary transition-colors group shadow-lg"
                >
                  <h2 className="text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-ink/70 mb-4">{tool.description}</p>
                  <span className="text-sm text-primary font-medium group-hover:underline">
                    Use Tool →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-12 border-t border-outline pt-8">
              <h2 className="text-2xl font-bold text-heading mb-4">
                About These Tools
              </h2>
              <p className="text-ink/80 mb-4">
                These calculators and tools are designed to help you understand various aspects of 1031 exchanges. 
                They provide estimates and educational information to assist with planning your exchange.
              </p>
              <p className="text-ink/80 mb-6">
                <strong className="text-heading">Important:</strong> These tools are for educational purposes only 
                and do not constitute tax, legal, or investment advice. Always consult with a qualified intermediary 
                and tax advisor before making decisions about your 1031 exchange.
              </p>

              <div className="bg-panel border border-outline rounded-lg p-6">
                <h3 className="text-lg font-semibold text-heading mb-3">
                  Need Expert Guidance?
                </h3>
                <p className="text-ink/80 mb-4">
                  Our team can help you navigate the complexities of 1031 exchanges and identify 
                  replacement properties that match your requirements.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primaryfg rounded-full hover:opacity-90 transition-opacity font-medium"
                >
                  Contact Us
                </Link>
              </div>
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
                  <Link href="/locations" className="text-primary hover:underline">
                    Browse Locations
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-primary hover:underline">
                    Read Our Blog
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

