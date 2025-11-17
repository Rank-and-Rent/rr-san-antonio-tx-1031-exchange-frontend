import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { servicesData } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchInput from "@/components/SearchInput";
import ContactForm from "@/app/contact/contact-form";
import site from "@/content/site.json";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} | 1031 Exchange Services`,
    description: `${service.short}. Available in San Antonio, TX and nationwide.`,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Get related services (same category, excluding current)
  const relatedServices = servicesData
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 4);

  // Generate FAQs based on service
  const faqs = [
    {
      question: `What is ${service.name}?`,
      answer: `${service.short}. In San Antonio, TX, we help 1031 exchange buyers identify replacement properties that match their timeline, credit requirements, and yield targets.`,
    },
    {
      question: `How does ${service.name} work for 1031 exchanges?`,
      answer: `We help identify replacement properties for 1031 exchanges in San Antonio, TX and nationwide. Our process focuses on matching your exchange requirements with available properties that qualify as like kind replacement property.`,
    },
    {
      question: `What timeline should I expect for ${service.name}?`,
      answer: `Timelines vary based on your specific 1031 exchange requirements. In San Antonio, TX, we work within your 45 day identification period and 180 day closing deadline to identify suitable replacement properties.`,
    },
    {
      question: `Can you help with ${service.name} outside of San Antonio, TX?`,
      answer: `Yes. We identify replacement properties across all 50 states. While we are based in San Antonio, TX, we source properties nationwide to match your 1031 exchange requirements.`,
    },
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
        name: "Services",
        item: `https://${site.website}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `https://${site.website}${service.route}`,
      },
    ],
  };

  // Service structured data
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short,
    provider: {
      "@type": "LocalBusiness",
      name: site.company,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.mainCity,
        addressRegion: site.state,
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  const leaseTypeCards = [
    {
      title: "Absolute NNN",
      description:
        "Corporate-guaranteed leases that span 10 to 20+ years and move every expense onto the tenant, leaving you with pure net rent and zero property obligations.",
    },
    {
      title: "Regular NNN",
      description:
        "Creditworthy tenants still cover taxes, insurance, and most maintenance, while the landlord retains responsibility for items like roofing or parking per the negotiated lease.",
    },
    {
      title: "NNN Ground Lease",
      description:
        "Land-only rentals that can run 20 to 99 years. You keep fee-simple ownership, the tenant improves and maintains the site, and many ground leases include clauses that return the building to you if the lease ends early.",
    },
    {
      title: "Sale-Leasebacks",
      description:
        "A business sells its real estate and signs a long rent-guaranteed lease to stay in place, delivering immediate liquidity for the seller and a stabilized tenancy for the investor.",
    },
  ];

  const focusCriteria = [
    "Tenant creditworthiness",
    "Location that supports the brand",
    "Lease type and duration",
  ];

  const tenantExamples = [
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

  const benefitBullets = [
    "Investment-grade tenants reduce default risk, giving you predictable monthly checks even in volatile markets.",
    "Rent escalations and annual indexing keep income aligned with inflation while the lease caps keep the deal stable.",
    "A low barrier to entry (most NNN investments sit between $1M and $5M) pairs nicely with the hands-off structure, so investors can shape their lifestyle and geography freely.",
    "Tax planning (1031 exchanges, cost segregation) and diversification by location, tenant type, asset class, lease structure, and cap rate help grow wealth with steady cash flow.",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <main className="min-h-screen bg-paper">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.name },
            ]}
          />

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-ink/80 mb-8">{service.short}</p>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-ink/80 leading-relaxed">
                {service.name} helps 1031 exchange buyers identify replacement properties that align with triple net (NNN) lease structures, where the tenant covers taxes, insurance, maintenance, utilities, and rent so you can collect clean, predictable income without managing the asset day to day. We focus on creditworthy tenants—convenience stores, pharmacies, medical clinics, fast-food and other essential retail—that keep cash flowing even when the economy softens.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Our property identification process spans single tenant NNN retail, multifamily, industrial, medical office, self storage, and other commercial asset classes across all 50 states, aligning location, lease duration, and yield requirements with your 45-day identification window and 180-day closing deadline.
              </p>
            </div>

            <section className="mb-12">
              <div className="bg-panel border border-outline rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-heading">Triple Net Lease Insights</h2>
                <p className="text-ink/80 leading-relaxed">
                  Triple net investments deliver a level of security not found in other asset classes because blue-chip tenants absorb operating expenses, keep long-term commitments, and keep paying rent well after market turbulence subsides—perfect for investors wrapping their exchanges in stability.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {leaseTypeCards.map((card) => (
                    <div key={card.title} className="bg-paper border border-dashed border-outline rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-heading mb-2">{card.title}</h3>
                      <p className="text-ink/80 text-sm">{card.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">We weigh three deal pillars</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {focusCriteria.map((item) => (
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
                    Preferred tenants include auto parts stores, convenience stores, child care centers, car washes, dollar and drug stores, fast-food & quick-service restaurants, gas stations, medical clinics, and pet or veterinary clinics—all of which are essential to local communities and often backed by national operators who weather recessions.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-ink/80">
                    {tenantExamples.map((tenant) => (
                      <p key={tenant} className="flex items-center">
                        <span className="mr-2 text-primary">•</span>
                        {tenant}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">Investor benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-ink/80">
                    {benefitBullets.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-ink/70">
                  The trade-off for this hands-off ownership is that you are no longer managing details like landscaping and that rent is capped for the lease term, but built-in escalations, diversification, and the tangible asset backing the lease keep your internal rate of return in the 7–10% range without the daily property calls.
                </p>
              </div>
            </section>

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
                Related Services
              </h2>
              <div className="mb-4">
                <SearchInput
                  placeholder="Search related services..."
                  items={relatedServices.map((s) => ({
                    slug: s.slug,
                    name: s.name,
                    route: s.route,
                  }))}
                />
              </div>
              {relatedServices.length === 0 ? (
                <div className="bg-panel border border-outline rounded-lg p-8 text-center">
                  <p className="text-ink/80 mb-4">
                    We can help with your 1031 exchange property identification needs.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primaryfg rounded-full hover:opacity-90 transition-opacity font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedServices.map((relatedService) => (
                    <Link
                      key={relatedService.slug}
                      href={relatedService.route}
                      className="bg-panel border border-outline rounded-lg p-6 hover:border-primary transition-colors group"
                    >
                      <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                        {relatedService.name}
                      </h3>
                      <p className="text-sm text-ink/70">{relatedService.short}</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-12">
              <div className="max-w-5xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <h2 className="text-2xl font-semibold text-heading mb-4">
                    Ready to get started?
                  </h2>
                  <p className="text-ink/80">
                    Contact us to discuss your 1031 exchange property identification needs.
                  </p>
                </div>
                <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
                  <ContactForm prefillProjectType={service.name} />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

