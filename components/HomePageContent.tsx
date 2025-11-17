"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import site from "@/content/site.json";
import { servicesData, locationsData, propertyTypesData, inventoryCategories } from "@/data";
import SearchInput from "@/components/SearchInput";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import { getLocationImagePath, getPropertyTypeImagePath } from "@/lib/image-utils";

const heroImages = [
  "/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg",
  "/san-antonio-tx-1031-exchange-twilight-skyline.jpg",
  "/san-antonio-tx-1031-exchange-cityscape.jpg",
];

export default function HomePageContent() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);
  
  const featuredPropertyTypes = propertyTypesData.slice(0, 6);
  
  const featuredLocations = locationsData.filter(loc => 
    ["san-antonio", "alamo-heights", "stone-oak", "medical-center", "downtown-san-antonio", "north-central-san-antonio", "northwest-san-antonio", "northeast-san-antonio"].includes(loc.slug)
  ).slice(0, 8);

  const featuredServices = servicesData.filter(service => 
    ["property-identification", "replacement-property-search", "forward-exchange", "exchange-consultation"].includes(service.slug) ||
    service.category === "Property Paths"
  ).slice(0, 4);

  const handleServiceSearchNoResults = (query: string) => {
    router.push(`/contact?projectType=${encodeURIComponent(query)}&scrollToForm=true`);
  };

  const handleLocationSearchNoResults = (query: string) => {
    router.push(`/contact?projectType=${encodeURIComponent(`Other: ${query}`)}&scrollToForm=true`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-outline overflow-hidden">
        {/* Background Images with Rotation */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`San Antonio, Texas ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Single Tenant NNN Retail Properties for 1031 Exchange Buyers in San Antonio, TX
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Find high-quality single tenant net lease properties nationwide. We source replacement properties across all 50 states for investors seeking predictable income with minimal management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${site.phoneDigits}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primaryfg font-semibold rounded-full hover:opacity-90 transition-opacity text-lg min-w-[200px] shadow-lg"
                aria-label={`Call ${site.company} at ${site.phone}`}
              >
                Speak with a Specialist
              </a>
              <Link
                href="/contact?scrollToForm=true"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-lg min-w-[200px] shadow-lg"
              >
                View Current Listings
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/90 drop-shadow-md">
              Available in all 50 states • Fast property identification • Expert guidance
            </p>
          </div>
        </div>
        
        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24 bg-paper border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Why Single Tenant NNN Properties for 1031 Exchanges?
            </h2>
            <p className="text-lg text-ink/80">
              Triple net lease properties offer hands-off ownership where tenants handle taxes, insurance, and maintenance—perfect for 1031 exchange investors seeking stable, predictable income.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-panel border border-outline rounded-xl p-6">
              <h3 className="text-xl font-semibold text-heading mb-3">Zero Management Headaches</h3>
              <p className="text-ink/80">
                Tenants handle property taxes, insurance, and maintenance. You collect rent without day-to-day property management responsibilities.
              </p>
            </div>
            <div className="bg-panel border border-outline rounded-xl p-6">
              <h3 className="text-xl font-semibold text-heading mb-3">Predictable Cash Flow</h3>
              <p className="text-ink/80">
                Long-term leases with creditworthy tenants provide stable, predictable rental income ideal for retirement planning and wealth building.
              </p>
            </div>
            <div className="bg-panel border border-outline rounded-xl p-6">
              <h3 className="text-xl font-semibold text-heading mb-3">Nationwide Inventory</h3>
              <p className="text-ink/80">
                Access to single tenant retail properties across all 50 states. We identify replacement properties that match your timeline, credit requirements, and yield targets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-16 md:py-24 bg-panel border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Single Tenant Retail Property Types
            </h2>
            <p className="text-lg text-ink/80">
              We specialize in essential retail properties with strong tenant credit and long-term lease structures.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredPropertyTypes.map((property) => {
              const imagePath = getPropertyTypeImagePath(property.slug);
              return (
                <Link
                  key={property.slug}
                  href={property.route}
                  className="bg-paper border border-outline rounded-lg overflow-hidden hover:border-primary transition-colors group"
                >
                  {imagePath && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <SafeImage
                        src={imagePath}
                        alt={`${property.name} properties for 1031 exchange`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                      {property.name}
                    </h3>
                    <p className="text-sm text-ink/70">
                      View available {property.name.toLowerCase()} properties for 1031 exchange
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/property-types"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              View All Property Types →
            </Link>
          </div>
        </div>
      </section>

      {/* Inventory Categories Section */}
      <section className="py-16 md:py-24 bg-paper border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              NNN Investment Property Categories
            </h2>
            <p className="text-lg text-ink/80">
              Browse our curated selection of net lease property listings organized by investment category.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 md:py-24 bg-panel border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
                Understanding NNN Structures for 1031 Exchanges
              </h2>
              <p className="text-lg text-ink/80">
                Learn how single tenant triple net lease properties work for hands-off ownership and tax-deferred exchanges.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-paper border border-outline rounded-lg p-6">
                <h3 className="text-xl font-semibold text-heading mb-3">Triple Net Lease (NNN)</h3>
                <p className="text-ink/80 mb-4">
                  In a triple net lease, tenants pay base rent plus property taxes, insurance, and maintenance costs. This structure provides landlords with predictable net income and minimal management responsibilities.
                </p>
                <p className="text-ink/80">
                  Ideal for 1031 exchange buyers seeking passive income from established retail brands like convenience stores, quick service restaurants, and pharmacies.
                </p>
              </div>
              <div className="bg-paper border border-outline rounded-lg p-6">
                <h3 className="text-xl font-semibold text-heading mb-3">Sale Leasebacks & Ground Leases</h3>
                <p className="text-ink/80 mb-4">
                  Sale leaseback transactions allow business owners to sell their property and lease it back, creating immediate liquidity while maintaining operational control.
                </p>
                <p className="text-ink/80">
                  Ground leases provide long-term land ownership with tenant-owned improvements, offering stable income with minimal landlord obligations—perfect for 1031 exchange replacement properties.
                </p>
              </div>
              <div className="bg-paper border border-outline rounded-lg p-6">
                <h3 className="text-xl font-semibold text-heading mb-3">Zero Cash Flow Options</h3>
                <p className="text-ink/80 mb-4">
                  Some investors structure 1031 exchanges to minimize or eliminate cash flow in favor of long-term appreciation and tax deferral benefits.
                </p>
                <p className="text-ink/80">
                  We help identify replacement properties that align with your specific financial goals, whether prioritizing current income or future growth potential.
                </p>
              </div>
              <div className="bg-paper border border-outline rounded-lg p-6">
                <h3 className="text-xl font-semibold text-heading mb-3">Nationwide Property Sourcing</h3>
                <p className="text-ink/80 mb-4">
                  Our network spans all 50 states, allowing us to identify replacement properties that match your timeline, credit strength requirements, lease term preferences, and yield targets.
                </p>
                <p className="text-ink/80">
                  Whether you're looking locally in San Antonio or nationwide, we source high-quality single tenant NNN retail properties for motivated 1031 exchange buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-paper border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Our 1031 Exchange Services
            </h2>
            <p className="text-lg text-ink/80 mb-6">
              From property identification to exchange coordination, we guide unrepresented 1031 exchange buyers through every step.
            </p>
            <div className="max-w-md mx-auto">
              <SearchInput
                placeholder="Search services..."
                items={servicesData.map((s) => ({
                  slug: s.slug,
                  name: s.name,
                  route: s.route,
                }))}
                onNoResults={handleServiceSearchNoResults}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 md:py-24 bg-panel border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              1031 Exchange Tools & Calculators
            </h2>
            <p className="text-lg text-ink/80">
              Free tools to help you plan and execute your 1031 exchange. Calculate boot, estimate costs, and validate identification rules.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/tools/boot-calculator"
              className="bg-paper border border-outline rounded-2xl p-8 hover:border-primary transition-colors group shadow-lg"
            >
              <h3 className="text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                Boot Calculator
              </h3>
              <p className="text-sm text-ink/70 mb-4">
                Calculate boot and estimate tax implications for your 1031 exchange.
              </p>
              <span className="text-sm text-primary font-medium group-hover:underline">
                Use Tool →
              </span>
            </Link>
            <Link
              href="/tools/exchange-cost-estimator"
              className="bg-paper border border-outline rounded-2xl p-8 hover:border-primary transition-colors group shadow-lg"
            >
              <h3 className="text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                Exchange Cost Estimator
              </h3>
              <p className="text-sm text-ink/70 mb-4">
                Calculate QI fees, escrow costs, title insurance, and other closing costs.
              </p>
              <span className="text-sm text-primary font-medium group-hover:underline">
                Use Tool →
              </span>
            </Link>
            <Link
              href="/tools/identification-rules-checker"
              className="bg-paper border border-outline rounded-2xl p-8 hover:border-primary transition-colors group shadow-lg"
            >
              <h3 className="text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                Identification Rules Checker
              </h3>
              <p className="text-sm text-ink/70 mb-4">
                Validate your property identification against the 3-property, 200%, or 95% rules.
              </p>
              <span className="text-sm text-primary font-medium group-hover:underline">
                Use Tool →
              </span>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/tools"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              View All Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 md:py-24 bg-panel border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Properties Available Nationwide
            </h2>
            <p className="text-lg text-ink/80 mb-6">
              While we're based in San Antonio, we source single tenant NNN retail properties across all 50 states. View properties in San Antonio and surrounding areas, or explore nationwide opportunities.
            </p>
            <div className="max-w-md mx-auto mb-6">
              <SearchInput
                placeholder="Search locations..."
                items={locationsData.map((l) => ({
                  slug: l.slug,
                  name: l.name,
                  route: l.route,
                }))}
                onNoResults={handleLocationSearchNoResults}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {featuredLocations.map((location) => {
              const imagePath = getLocationImagePath(location.slug);
              return (
                <Link
                  key={location.slug}
                  href={location.route}
                  className="bg-paper border border-outline rounded-lg overflow-hidden hover:border-primary transition-colors group"
                >
                  {imagePath && (
                    <div className="relative w-full h-40 overflow-hidden">
                      <SafeImage
                        src={imagePath}
                        alt={`1031 exchange properties in ${location.name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                    <p className="text-sm text-ink/70 capitalize">{location.type}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center">
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-6 py-3 border border-outline text-ink rounded-full hover:bg-paper transition-colors font-medium mb-6"
            >
              View All Locations
            </Link>
            <div className="bg-paper border-2 border-primary rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-heading mb-2">
                Nationwide Property Search Available
              </h3>
              <p className="text-ink/80 mb-4">
                Need replacement properties outside of San Antonio? We identify single tenant NNN retail properties in all 50 states to match your 1031 exchange requirements.
              </p>
              <Link
                href="/contact?projectType=Other"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Contact Us About Nationwide Properties →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-panel border-b border-outline">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-2">
                Ready to talk through a replacement strategy?
              </h2>
              <p className="text-lg text-ink/80">
                Tell us about your exchange timelines and property goals, and we will connect you with net lease opportunities nationwide.
              </p>
            </div>
            <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

