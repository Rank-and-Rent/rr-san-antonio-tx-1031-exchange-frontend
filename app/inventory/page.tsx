import Link from "next/link";
import { inventoryCategories, servicesData } from "@/data";
import site from "@/content/site.json";
import SafeImage from "@/components/SafeImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `NNN Investment Property Categories | 1031 Exchange Properties | ${site.mainCity}, ${site.state}`,
  description: `Browse our curated selection of net lease property listings organized by investment category. Find NNN properties, single tenant retail, medical office, auto service, grocery anchored, industrial flex, and ground lease opportunities for 1031 exchanges in ${site.mainCity}, ${site.state} and nationwide.`,
};

export default function InventoryPage() {
  const featuredServices = servicesData
    .filter((s) => s.category === "Property Paths")
    .slice(0, 4);

  return (
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
              Net Lease Properties
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
              NNN INVESTMENT CATEGORIES
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed italic mb-10">
              Browse our curated selection of net lease property listings organized by investment category.
              Find high-quality single tenant NNN retail properties nationwide for 1031 exchange buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${site.phoneDigits}`}
                className="inline-flex items-center justify-center px-10 py-4 bg-[#1a1a1a] text-white text-xs tracking-[0.3em] uppercase hover:bg-[#333] transition-colors"
              >
                Speak with a Specialist
              </a>
              <Link
                href="/contact?scrollToForm=true"
                className="inline-flex items-center justify-center px-10 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
              >
                View Current Listings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              SINGLE TENANT NNN PROPERTIES BY CATEGORY
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg italic max-w-3xl mx-auto">
              We specialize in essential retail properties with strong tenant credit and long-term lease structures.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {inventoryCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.route}
                className="group p-8 bg-white border border-[#e5e5e5] hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-colors"
              >
                <h3 className="text-base tracking-[0.15em] text-[#1a1a1a] group-hover:text-white mb-3 transition-colors">
                  {category.name.toUpperCase()}
                </h3>
                {category.note && (
                  <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 mb-4 italic transition-colors">
                    {category.note}
                  </p>
                )}
                <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 group-hover:text-white/80 transition-colors">
                  Browse Properties
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg"
            alt="San Antonio twilight"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] mb-6">
              WHY SINGLE TENANT NNN PROPERTIES?
            </h2>
            <p className="text-white/60 text-lg italic max-w-2xl mx-auto">
              Triple net lease properties offer hands-off ownership where tenants handle taxes, insurance, and maintenance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-0 max-w-5xl mx-auto text-center">
            <div className="border-r border-white/20 px-8 py-6">
              <h3 className="text-white text-lg tracking-[0.15em] mb-4">
                ZERO MANAGEMENT HEADACHES
              </h3>
              <p className="text-white/60 text-sm italic">
                Tenants handle property taxes, insurance, and maintenance. You collect rent without day-to-day responsibilities.
              </p>
            </div>
            <div className="border-r border-white/20 px-8 py-6">
              <h3 className="text-white text-lg tracking-[0.15em] mb-4">
                PREDICTABLE CASH FLOW
              </h3>
              <p className="text-white/60 text-sm italic">
                Long-term leases with creditworthy tenants provide stable, predictable rental income.
              </p>
            </div>
            <div className="px-8 py-6">
              <h3 className="text-white text-lg tracking-[0.15em] mb-4">
                NATIONWIDE INVENTORY
              </h3>
              <p className="text-white/60 text-sm italic">
                Access to single tenant retail properties across all 50 states matching your timeline and yield targets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              OUR 1031 EXCHANGE SERVICES
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="group p-8 bg-[#f5f5f3] border border-[#e5e5e5] hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-colors"
              >
                <h3 className="text-base tracking-[0.15em] text-[#1a1a1a] group-hover:text-white mb-3 transition-colors">
                  {service.name.toUpperCase()}
                </h3>
                <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 italic transition-colors">
                  {service.short}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center text-xs tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#1a1a1a]/60 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] mb-6">
            NEED HELP FINDING THE RIGHT CATEGORY?
          </h2>
          <p className="text-white/60 text-lg italic mb-10 max-w-2xl mx-auto">
            Contact us to discuss your specific investment goals and property requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${site.phoneDigits}`}
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-white/90 transition-colors"
            >
              Call Now: {site.phone}
            </a>
            <Link
              href="/contact?scrollToForm=true"
              className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
