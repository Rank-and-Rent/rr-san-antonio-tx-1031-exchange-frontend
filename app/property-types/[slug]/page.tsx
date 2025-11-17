import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { propertyTypesData, servicesData } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import site from "@/content/site.json";
import { getPropertyTypeImagePath } from "@/lib/image-utils";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return propertyTypesData.map((propertyType) => ({
    slug: propertyType.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const propertyType = propertyTypesData.find((pt) => pt.slug === slug);
  
  if (!propertyType) {
    return {
      title: "Property Type Not Found",
    };
  }

  return {
    title: `${propertyType.name} | 1031 Exchange Properties | ${site.mainCity}, ${site.state}`,
    description: `Find ${propertyType.name.toLowerCase()} properties for 1031 exchange replacement in ${site.mainCity}, ${site.state} and nationwide. Single tenant NNN retail and commercial properties available for tax deferred exchanges.`,
  };
}

export default async function PropertyTypePage({ params }: PageProps) {
  const { slug } = await params;
  const propertyType = propertyTypesData.find((pt) => pt.slug === slug);

  if (!propertyType) {
    notFound();
  }

  // Get featured services
  const featuredServices = servicesData
    .filter((s) => s.category === "Property Paths")
    .slice(0, 4);

  // Get related property types (excluding current)
  const relatedPropertyTypes = propertyTypesData
    .filter((pt) => pt.slug !== propertyType.slug)
    .slice(0, 6);

  // Generate FAQs
  const faqs = [
    {
      question: `What types of ${propertyType.name} properties are available for 1031 exchanges?`,
      answer: `We identify ${propertyType.name.toLowerCase()} properties in ${site.mainCity}, ${site.state} and nationwide for 1031 exchange replacement property needs. These properties typically feature single tenant NNN lease structures with creditworthy tenants.`,
    },
    {
      question: `How quickly can you identify ${propertyType.name} replacement properties?`,
      answer: `We work within your 45 day identification period to find suitable ${propertyType.name.toLowerCase()} replacement properties. Our property identification process focuses on matching your timeline, credit requirements, and yield targets.`,
    },
    {
      question: `What are the benefits of investing in ${propertyType.name} properties for 1031 exchanges?`,
      answer: `${propertyType.name} properties offer various commercial real estate opportunities for 1031 exchange buyers. We help identify properties that match your investment criteria and exchange requirements, typically featuring long-term leases with essential retail or service operators.`,
    },
    {
      question: `Can you help with ${propertyType.name} properties outside of ${site.mainCity}, ${site.state}?`,
      answer: `Yes. While we identify properties in ${site.mainCity}, ${site.state}, we also source ${propertyType.name.toLowerCase()} replacement properties across all 50 states to meet your 1031 exchange needs.`,
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

  const propertyTypeFocusCriteria = [
    "Tenant creditworthiness",
    "Location demand and demographics",
    "Lease duration & structure",
  ];

  const propertyTypeBenefitBullets = [
    "Essential operators make triple net income recession-resistant, keeping you in the flow even when broader markets wobble.",
    "Rent escalations plus tax strategies such as 1031 exchanges and cost segregation extend the internal rate of return into the 7–10% range without extra management.",
    "Diversifying across geography, tenant type, asset class, lease term, and cap rate builds long-term wealth while staying anchored to a tangible asset.",
    "With most NNN opportunities between $1M and $5M, investors can scale nationwide while enjoying the flexibility to stay hands-off.",
  ];

  const imagePath = getPropertyTypeImagePath(propertyType.slug);

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
        name: "Property Types",
        item: `https://${site.website}/property-types`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: propertyType.name,
        item: `https://${site.website}${propertyType.route}`,
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
        {/* Hero Section with Image */}
        {imagePath && (
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <SafeImage
              src={imagePath}
              alt={`${propertyType.name} properties in ${site.mainCity}, ${site.state}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Property Types", href: "/property-types" },
                  { label: propertyType.name },
                ]}
              />
              <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 mt-4">
                {propertyType.name} Properties for 1031 Exchanges
              </h1>
              <p className="text-xl text-ink/90 max-w-3xl">
                Find replacement properties for 1031 exchanges in {site.mainCity}, {site.state}.
                We identify {propertyType.name.toLowerCase()} properties that qualify for tax deferred exchanges.
              </p>
            </div>
          </div>
        )}
        
        {!imagePath && (
          <div className="container mx-auto px-4 py-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Property Types", href: "/property-types" },
                { label: propertyType.name },
              ]}
            />
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6 mt-4">
              {propertyType.name} Properties for 1031 Exchanges
            </h1>
            <p className="text-xl text-ink/80 mb-8">
              Find replacement properties for 1031 exchanges in {site.mainCity}, {site.state}.
              We identify {propertyType.name.toLowerCase()} properties that qualify for tax deferred exchanges.
            </p>
          </div>
        )}

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-ink/80 leading-relaxed">
                {propertyType.name} properties remain a strong option for triple net (NNN) lease investments because tenants pay taxes, insurance, and maintenance while you enjoy passive, recession-resistant cash flow. We help you identify essential retail, healthcare, and service operators in {site.mainCity}, {site.state} that keep obligations off your plate.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Our property identification process includes multifamily, industrial, medical office, and other asset classes, but we lean heavily on lease type, tenant credit, and local demand so you can meet your 45-day identification window and 180-day closing requirement with confidence.
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
                  Triple Net Leases for {propertyType.name}
                </h2>
                <p className="text-ink/80 leading-relaxed">
                  Triple net leases for {propertyType.name.toLowerCase()} properties keep ownership secure because tenants absorb taxes, insurance, and maintenance while you collect predictable rent that fits 1031 exchange timelines. That stability also makes these assets attractive for national brands that seek long-term visibility in the area.
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
                    {propertyTypeFocusCriteria.map((item) => (
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
                    {propertyTypeBenefitBullets.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-ink/70">
                  Less day-to-day property management comes with this peace of mind, and while rent is capped for the agreed term, escalations and tight lease language keep returns growing and the asset easier to re-tenant when the time comes.
                </p>
              </div>
            </section>

            {relatedPropertyTypes.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-heading mb-6">
                  Related Property Types
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPropertyTypes.map((relatedType) => (
                    <Link
                      key={relatedType.slug}
                      href={relatedType.route}
                      className="bg-panel border border-outline rounded-lg p-6 hover:border-primary transition-colors group"
                    >
                      <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                        {relatedType.name}
                      </h3>
                      <p className="text-sm text-ink/70">
                        View available {relatedType.name.toLowerCase()} properties for 1031 exchange
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="bg-panel border border-outline rounded-lg p-8 text-center mb-12">
              <Link
                href="/property-types"
                className="inline-flex items-center justify-center px-6 py-3 border border-outline text-ink rounded-full hover:bg-paper transition-colors font-medium"
              >
                View All Property Types
              </Link>
            </div>

            <section className="mt-12">
              <div className="max-w-5xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <h2 className="text-2xl font-semibold text-heading mb-4">
                    Ready to find {propertyType.name.toLowerCase()} replacement properties?
                  </h2>
                  <p className="text-ink/80">
                    Contact us to discuss your 1031 exchange property identification needs for {propertyType.name.toLowerCase()} properties in {site.mainCity}, {site.state}.
                  </p>
                </div>
                <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
                  <ContactForm prefillProjectType={`${propertyType.name} Properties`} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

