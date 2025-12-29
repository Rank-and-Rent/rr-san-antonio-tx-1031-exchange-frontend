import Link from "next/link";
import { inventoryCategories, servicesData } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import site from "@/content/site.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `NNN Investment Property Categories | 1031 Exchange Properties | ${site.mainCity}, ${site.state}`,
  description: `Browse our curated selection of net lease property listings organized by investment category. Find NNN properties, single tenant retail, medical office, auto service, grocery anchored, industrial flex, and ground lease opportunities for 1031 exchanges in ${site.mainCity}, ${site.state} and nationwide.`,
};

export default function InventoryPage() {
  // Get featured services
  const featuredServices = servicesData
    .filter((s) => s.category === "Property Paths")
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-br from-primary/10 to-primary/5 border-b border-outline">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Inventory Categories" },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 mt-4">
            NNN Investment Property Categories
          </h1>
          <p className="text-xl text-ink/90 max-w-3xl mb-6">
            Browse our curated selection of net lease property listings organized by investment category.
            Find high-quality single tenant NNN retail properties nationwide for 1031 exchange buyers.
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
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Single Tenant NNN Properties by Category
            </h2>
            <p className="text-lg text-ink/80 max-w-3xl mx-auto">
              We specialize in essential retail properties with strong tenant credit and long-term lease structures.
              Each category offers unique investment opportunities for 1031 exchange buyers seeking predictable income.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {inventoryCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.route}
                className="bg-panel border border-outline rounded-lg p-6 hover:border-primary transition-colors group"
              >
                <h3 className="text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                {category.note && (
                  <p className="text-sm text-ink/70 mb-3">{category.note}</p>
                )}
                <span className="text-sm text-primary font-medium group-hover:underline">
                  Browse Properties →
                </span>
              </Link>
            ))}
          </div>

          {/* Value Proposition */}
          <div className="bg-panel border border-outline rounded-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                Why Single Tenant NNN Properties for 1031 Exchanges?
              </h2>
              <p className="text-ink/80">
                Triple net lease properties offer hands-off ownership where tenants handle taxes, insurance, and maintenance—perfect for 1031 exchange investors seeking stable, predictable income.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-heading mb-3">Zero Management Headaches</h3>
                <p className="text-ink/80 text-sm">
                  Tenants handle property taxes, insurance, and maintenance. You collect rent without day-to-day property management responsibilities.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-heading mb-3">Predictable Cash Flow</h3>
                <p className="text-ink/80 text-sm">
                  Long-term leases with creditworthy tenants provide stable, predictable rental income ideal for retirement planning and wealth building.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-heading mb-3">Nationwide Inventory</h3>
                <p className="text-ink/80 text-sm">
                  Access to single tenant retail properties across all 50 states. We identify replacement properties that match your timeline, credit requirements, and yield targets.
                </p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-heading mb-6">
              Our 1031 Exchange Services
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
            <div className="text-center mt-6">
              <Link
                href="/services"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                View All Services →
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-panel border border-outline rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-heading mb-4">
              Need Help Finding the Right Property Category?
            </h2>
            <p className="text-ink/80 mb-6">
              Contact us to discuss your specific investment goals and property requirements.
              We'll help identify the best categories and properties for your 1031 exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${site.phoneDigits}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primaryfg font-semibold rounded-full hover:opacity-90 transition-opacity"
                aria-label={`Call ${site.company} at ${site.phone}`}
              >
                Call Now: {site.phone}
              </a>
              <Link
                href="/contact?scrollToForm=true"
                className="inline-flex items-center justify-center px-6 py-3 border border-outline text-ink rounded-full hover:bg-panel transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}