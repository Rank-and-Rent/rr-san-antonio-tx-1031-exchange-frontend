import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { locationsData, servicesData } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import site from "@/content/site.json";
import { getLocationImagePath } from "@/lib/image-utils";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);
  
  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `1031 Exchange Properties in ${location.name} | ${site.mainCity}, ${site.state}`,
    description: `Find 1031 exchange replacement properties in ${location.name}, ${site.state}. Single tenant NNN retail and commercial properties available for tax deferred exchanges.`,
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  // Get featured services
  const featuredServices = servicesData
    .filter((s) => s.category === "Property Paths")
    .slice(0, 4);

  // Generate FAQs
  const faqs = [
    {
      question: `What types of 1031 exchange properties are available in ${location.name}, ${site.state}?`,
      answer: `We identify single tenant NNN retail properties, multifamily, industrial, medical office, and other commercial real estate in ${location.name}, ${site.state} for 1031 exchange replacement property needs.`,
    },
    {
      question: `How quickly can you identify replacement properties in ${location.name}, ${site.state}?`,
      answer: `We work within your 45 day identification period to find suitable replacement properties in ${location.name}, ${site.state}. Our property identification process focuses on matching your timeline, credit requirements, and yield targets.`,
    },
    {
      question: `What are the benefits of investing in ${location.name}, ${site.state} for 1031 exchanges?`,
      answer: `${location.name}, ${site.state} offers various commercial real estate opportunities for 1031 exchange buyers. We help identify properties that match your investment criteria and exchange requirements.`,
    },
    {
      question: `Can you help with 1031 exchange properties outside of ${location.name}, ${site.state}?`,
      answer: `Yes. While we identify properties in ${location.name}, ${site.state}, we also source replacement properties across all 50 states to meet your 1031 exchange needs.`,
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

  const locationFocusCriteria = [
    "Tenant creditworthiness",
    "Location demand and demographics",
    "Lease duration & structure",
  ];

  const locationTenantHighlights = [
    "Auto parts stores",
    "Convenience stores",
    "Child care/early learning centers",
    "Car washes",
    "Dollar stores",
    "Drug stores",
    "Fast-food & quick-service restaurants",
    "Gas stations",
    "Medical clinics",
    "Pet & veterinary clinics",
  ];

  const locationBenefitBullets = [
    "Essential operators make triple net income recession-resistant, keeping you in the flow even when broader markets wobble.",
    "Rent escalations plus tax strategies such as 1031 exchanges and cost segregation extend the internal rate of return into the 7–10% range without extra management.",
    "Diversifying across geography, tenant type, asset class, lease term, and cap rate builds long-term wealth while staying anchored to a tangible asset.",
    "With most NNN opportunities between $1M and $5M, investors can scale nationwide while enjoying the flexibility to stay hands-off.",
  ];

  const imagePath = getLocationImagePath(location.slug);

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
        name: "Locations",
        item: `https://${site.website}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `https://${site.website}${location.route}`,
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
              alt={`1031 exchange properties in ${location.name}, ${site.state}`}
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
                  { label: "Locations", href: "/locations" },
                  { label: location.name },
                ]}
              />
              <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 mt-4">
                1031 Exchange Properties in {location.name}
              </h1>
              <p className="text-xl text-ink/90 max-w-3xl">
                Find replacement properties for 1031 exchanges in {location.name}, {site.state}.
                We identify single tenant NNN retail and commercial properties that qualify for
                tax deferred exchanges.
              </p>
            </div>
          </div>
        )}
        
        {!imagePath && (
          <div className="container mx-auto px-4 py-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/locations" },
                { label: location.name },
              ]}
            />
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6 mt-4">
              1031 Exchange Properties in {location.name}
            </h1>
            <p className="text-xl text-ink/80 mb-8">
              Find replacement properties for 1031 exchanges in {location.name}, {site.state}.
              We identify single tenant NNN retail and commercial properties that qualify for
              tax deferred exchanges.
            </p>
          </div>
        )}

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-ink/80 leading-relaxed">
                {location.name} remains a fertile ground for triple net (NNN) lease investments because tenants pay taxes, insurance, and maintenance while you enjoy passive, recession-resistant cash flow. We help you identify essential retail, healthcare, and service operators in {location.name}, {site.state} that keep obligations off your plate.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Our property identification process still includes multifamily, industrial, medical office, and other asset classes, but we lean heavily on lease type, tenant credit, and local demand so you can meet your 45-day identification window and 180-day closing requirement with confidence.
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
                  Triple Net Leases in {location.name}
                </h2>
                <p className="text-ink/80 leading-relaxed">
                  Triple net leases in {location.name} keep ownership secure because tenants absorb taxes, insurance, and maintenance while you collect predictable rent that fits 1031 exchange timelines. That stability also makes these assets attractive for national brands that seek long-term visibility in the area.
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
                    {locationFocusCriteria.map((item) => (
                      <div
                        key={item}
                        className="bg-paper border border-outline rounded-lg px-4 py-3 text-sm font-medium text-heading text-center"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-ink/80 leading-relaxed">
                    We draw from a deep tenant pool that includes auto parts stores, convenience stores, child care centers, car washes, dollar and drug stores, fast-food and quick-service restaurants, gas stations, medical clinics, and pet or veterinary clinics—all of which tend to stay steady and pay rent even through downturns.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-ink/80">
                    {locationTenantHighlights.map((tenant) => (
                      <p key={tenant} className="flex items-center">
                        <span className="mr-2 text-primary">•</span>
                        {tenant}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">Why investors lean in</h3>
                  <ul className="list-disc list-inside space-y-2 text-ink/80">
                    {locationBenefitBullets.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-ink/70">
                  Less day-to-day property management comes with this peace of mind, and while rent is capped for the agreed term, escalations and tight lease language keep returns growing and the asset easier to re-tenant when the time comes.
                </p>
              </div>
            </section>

            <div className="bg-panel border border-outline rounded-lg p-8 text-center mb-12">
              <Link
                href="/locations"
                className="inline-flex items-center justify-center px-6 py-3 border border-outline text-ink rounded-full hover:bg-paper transition-colors font-medium"
              >
                View All Locations
              </Link>
            </div>

            <section className="mt-12">
              <div className="max-w-5xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <h2 className="text-2xl font-semibold text-heading mb-4">
                    Ready to find replacement properties in {location.name}?
                  </h2>
                  <p className="text-ink/80">
                    Contact us to discuss your 1031 exchange property identification needs in {location.name}, {site.state}.
                  </p>
                </div>
                <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
                  <ContactForm prefillProjectType={`Properties in ${location.name}`} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

