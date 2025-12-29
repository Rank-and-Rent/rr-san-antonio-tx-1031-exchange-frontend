import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { inventoryCategories, servicesData, propertyTypesData } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import site from "@/content/site.json";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return inventoryCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = inventoryCategories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | 1031 Exchange Properties | ${site.mainCity}, ${site.state}`,
    description: `Find ${category.name.toLowerCase()} properties for 1031 exchange replacement in ${site.mainCity}, ${site.state} and nationwide. ${category.note}`,
  };
}

export default async function InventoryCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = inventoryCategories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  // Get featured services
  const featuredServices = servicesData
    .filter((s) => s.category === "Property Paths")
    .slice(0, 4);

  // Get related categories (excluding current)
  const relatedCategories = inventoryCategories
    .filter((cat) => cat.slug !== category.slug)
    .slice(0, 6);

  // Get property types that might belong to this category
  const categoryPropertyTypes = propertyTypesData.slice(0, 8);

  // Generate FAQs based on category
  const faqs = [
    {
      question: `What types of ${category.name} properties are available for 1031 exchanges?`,
      answer: `We identify ${category.name.toLowerCase()} properties in ${site.mainCity}, ${site.state} and nationwide for 1031 exchange replacement property needs. These properties typically feature single tenant NNN lease structures with creditworthy tenants.`,
    },
    {
      question: `How quickly can you identify ${category.name} replacement properties?`,
      answer: `We work within your 45 day identification period to find suitable ${category.name.toLowerCase()} replacement properties. Our property identification process focuses on matching your timeline, credit requirements, and yield targets.`,
    },
    {
      question: `What are the benefits of investing in ${category.name} properties for 1031 exchanges?`,
      answer: `${category.name} properties offer various commercial real estate opportunities for 1031 exchange buyers. ${category.note} We help identify properties that match your investment criteria and exchange requirements, typically featuring long-term leases with essential retail or service operators.`,
    },
    {
      question: `Can you help with ${category.name} properties outside of ${site.mainCity}, ${site.state}?`,
      answer: `Yes. While we identify properties in ${site.mainCity}, ${site.state}, we also source ${category.name.toLowerCase()} replacement properties across all 50 states to meet your 1031 exchange needs.`,
    },
  ];

  const leaseHighlights = [
    {
      title: "Absolute & Regular NNN",
      description:
        "Long-term corporate-guaranteed leases move taxes, insurance, and maintenance onto the tenant so the investor enjoys clean net income; regular NNN deals still shift the big expenses while landlords absorb occasional items like roofing or parking.",
    },
    {
      title: "NNN Ground Lease",
      description:
        "Land-only rentals that span 20 to 99 years keep fee-simple ownership with you while the tenant builds and maintains the improvements; many ground leases include clauses that return the building if the tenancy ends early.",
    },
    {
      title: "Sale-Leasebacks",
      description:
        "Business owners sell their real estate, lease it back, and keep operating while you benefit from a long-term, corporate-guaranteed rent stream.",
    },
  ];

  const categoryFocusCriteria = [
    "Tenant creditworthiness",
    "Location demand and demographics",
    "Lease duration & structure",
  ];

  const categoryBenefitBullets = [
    "Essential operators make triple net income recession-resistant, keeping you in the flow even when broader markets wobble.",
    "Rent escalations plus tax strategies such as 1031 exchanges and cost segregation extend the internal rate of return into the 7–10% range without extra management.",
    "Diversifying across geography, tenant type, asset class, lease term, and cap rate builds long-term wealth while staying anchored to a tangible asset.",
    "With most NNN opportunities between $1M and $5M, investors can scale nationwide while enjoying the flexibility to stay hands-off.",
  ];

  // Breadcrumb structured data
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
        name: "Inventory Categories",
        item: `https://${site.website}/inventory`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://${site.website}${category.route}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <main className="min-h-screen bg-paper">
        {/* Hero Section */}
        <div className="relative w-full bg-gradient-to-br from-primary/10 to-primary/5 border-b border-outline">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Inventory Categories", href: "/inventory" },
                { label: category.name },
              ]}
            />
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 mt-4">
              {category.name} Properties for 1031 Exchanges
            </h1>
            <p className="text-xl text-ink/90 max-w-3xl mb-6">
              Find replacement properties for 1031 exchanges in {site.mainCity}, {site.state}.
              {category.note && ` ${category.note.charAt(0).toLowerCase() + category.note.slice(1)}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${site.phoneDigits}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primaryfg font-semibold rounded-full hover:opacity-90 transition-opacity"
                aria-label={`Call ${site.company} at ${site.phone}`}
              >
                Speak with a Specialist
              </a>
              <Link
                href="/contact?scrollToForm=true"
                className="inline-flex items-center justify-center px-6 py-3 border border-outline text-ink rounded-full hover:bg-panel transition-colors"
              >
                View Current Listings
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-ink/80 leading-relaxed">
                {category.name} properties remain a strong option for triple net (NNN) lease investments because tenants pay taxes, insurance, and maintenance while you enjoy passive, recession-resistant cash flow. {category.note && `${category.note.charAt(0).toLowerCase() + category.note.slice(1)}`} We help you identify essential retail, healthcare, and service operators in {site.mainCity}, {site.state} that keep obligations off your plate.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Our property identification process includes various asset classes, but we focus on lease type, tenant credit, and local demand so you can meet your 45-day identification window and 180-day closing requirement with confidence.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-panel border border-outline rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-heading mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-ink/80">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                Our Services
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={service.route}
                    className="bg-panel border border-outline rounded-lg p-6 hover:border-primary transition-colors group"
                  >
                    <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-ink/70">{service.short}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="bg-panel border border-outline rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-heading">
                  Triple Net Leases for {category.name}
                </h2>
                <p className="text-ink/80 leading-relaxed">
                  Triple net leases for {category.name.toLowerCase()} properties keep ownership secure because tenants absorb taxes, insurance, and maintenance while you collect predictable rent that fits 1031 exchange timelines. That stability also makes these assets attractive for national brands that seek long-term visibility in the area.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {leaseHighlights.map((card) => (
                    <div
                      key={card.title}
                      className="bg-paper border border-dashed border-outline rounded-lg p-4"
                    >
                      <h3 className="text-lg font-semibold text-heading mb-2">{card.title}</h3>
                      <p className="text-ink/80 text-sm">{card.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">What we evaluate</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {categoryFocusCriteria.map((item) => (
                      <div
                        key={item}
                        className="bg-paper border border-outline rounded-lg px-4 py-3 text-sm font-medium text-heading text-center"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">Why investors lean in</h3>
                  <ul className="list-disc list-inside space-y-2 text-ink/80">
                    {categoryBenefitBullets.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-ink/70">
                  Less day-to-day property management comes with this peace of mind, and while rent is capped for the agreed term, escalations and tight lease language keep returns growing and the asset easier to re-tenant when the time comes.
                </p>
              </div>
            </section>

            {categoryPropertyTypes.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-heading mb-6">
                  Available Property Types
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryPropertyTypes.map((propertyType) => (
                    <Link
                      key={propertyType.slug}
                      href={propertyType.route}
                      className="bg-panel border border-outline rounded-lg p-4 hover:border-primary transition-colors group"
                    >
                      <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors text-sm">
                        {propertyType.name}
                      </h3>
                      <p className="text-xs text-ink/70">
                        View available properties
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {relatedCategories.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-heading mb-6">
                  Related Categories
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedCategories.map((relatedCategory) => (
                    <Link
                      key={relatedCategory.slug}
                      href={relatedCategory.route}
                      className="bg-panel border border-outline rounded-lg p-6 hover:border-primary transition-colors group"
                    >
                      <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                        {relatedCategory.name}
                      </h3>
                      {relatedCategory.note && (
                        <p className="text-sm text-ink/70">{relatedCategory.note}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="bg-panel border border-outline rounded-lg p-8 text-center mb-12">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center px-6 py-3 border border-outline text-ink rounded-full hover:bg-paper transition-colors font-medium"
              >
                View All Categories
              </Link>
            </div>

            <section className="mt-12">
              <div className="max-w-5xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <h2 className="text-2xl font-semibold text-heading mb-4">
                    Ready to find {category.name.toLowerCase()} replacement properties?
                  </h2>
                  <p className="text-ink/80">
                    Contact us to discuss your 1031 exchange property identification needs for {category.name.toLowerCase()} properties in {site.mainCity}, {site.state}.
                  </p>
                </div>
                <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
                  <ContactForm prefillProjectType={`${category.name} Properties`} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}