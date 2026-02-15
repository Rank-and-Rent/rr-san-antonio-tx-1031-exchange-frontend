import Link from "next/link";
import type { Metadata } from "next";
import site from "@/content/site.json";
import SafeImage from "@/components/SafeImage";
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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-cityscape.jpg"
            alt="San Antonio cityscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-4">
                Free Resources
              </p>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
                1031 EXCHANGE TOOLS
              </h1>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="container mx-auto px-6 pt-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
        </div>

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[#1a1a1a]/70 text-lg leading-relaxed italic">
                Free tools and calculators to help you plan and execute your 1031 exchange. 
                Calculate boot, estimate costs, validate identification rules, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 bg-[#f5f5f3]">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group p-10 bg-white border border-[#e5e5e5] hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-colors text-center"
                >
                  <h2 className="text-lg tracking-[0.15em] text-[#1a1a1a] group-hover:text-white mb-4 transition-colors">
                    {tool.name.toUpperCase()}
                  </h2>
                  <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 italic mb-6 transition-colors">
                    {tool.description}
                  </p>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 group-hover:text-white/80 transition-colors">
                    Use Tool
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Tools Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl tracking-[0.2em] text-[#1a1a1a] mb-6 text-center">
                ABOUT THESE TOOLS
              </h2>
              <p className="text-[#1a1a1a]/70 leading-relaxed italic mb-4 text-center">
                These calculators and tools are designed to help you understand various aspects of 1031 exchanges. 
                They provide estimates and educational information to assist with planning your exchange.
              </p>
              <p className="text-[#1a1a1a]/70 leading-relaxed italic text-center">
                <strong className="text-[#1a1a1a]">Important:</strong> These tools are for educational purposes only 
                and do not constitute tax, legal, or investment advice. Always consult with a qualified intermediary 
                and tax advisor before making decisions about your 1031 exchange.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-[#1a1a1a]" />
          <div className="relative z-10 container mx-auto px-6 text-center">
            <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] mb-6">
              NEED EXPERT GUIDANCE?
            </h2>
            <p className="text-white/60 text-lg italic mb-10 max-w-2xl mx-auto">
              Our team can help you navigate the complexities of 1031 exchanges and identify 
              replacement properties that match your requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-[#f5f5f3]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl tracking-[0.2em] text-[#1a1a1a] mb-8">
                RELATED RESOURCES
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
                >
                  View All Services
                </Link>
                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
                >
                  Browse Locations
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
                >
                  Read Our Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
