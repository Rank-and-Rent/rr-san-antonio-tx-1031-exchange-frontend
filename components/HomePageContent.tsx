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
    }, 5000);

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
      {/* Hero Section - Frontgate Style */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background Images with Rotation */}
        <div className="absolute inset-0">
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
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/90 text-xs tracking-[0.4em] uppercase mb-6">
            Experience + Expertise =
          </p>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] mb-6">
            RESULTS
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light italic max-w-2xl mb-4">
            Find high-quality single tenant NNN retail properties for 1031 exchange investors nationwide.
          </p>
          <p className="text-white/80 text-sm italic mb-10">
            {site.company} | San Antonio, TX
          </p>
          <Link
            href="/contact?scrollToForm=true"
            className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-ink transition-all"
          >
            View Current Listings
          </Link>
        </div>
        
        {/* Image Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Section - Split Layout */}
      <section className="grid lg:grid-cols-2">
        {/* Left - Text */}
        <div className="flex items-center justify-center p-12 lg:p-20 bg-white">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-heading mb-8">
              ABOUT {site.company.toUpperCase()}
            </h2>
            <p className="text-ink/80 leading-relaxed mb-6 italic">
              We specialize in helping 1031 exchange investors find high-quality single tenant NNN retail properties nationwide. Our expertise in net lease investments provides a streamlined, professional experience for buyers seeking stable, predictable income.
            </p>
            <p className="text-ink/80 leading-relaxed mb-6 italic">
              From property identification to exchange coordination, we guide unrepresented buyers through every step of the process. Our hands-on approach combines market knowledge with a commitment to finding the right replacement property for your investment goals.
            </p>
            <p className="text-ink/80 leading-relaxed mb-8 italic">
              Based in San Antonio, we source properties across all 50 states, helping investors defer capital gains taxes while building long-term wealth through triple net lease investments.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border border-ink text-ink text-xs tracking-[0.25em] uppercase hover:bg-ink hover:text-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Right - Image */}
        <div className="relative h-[500px] lg:h-auto min-h-[400px]">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg"
            alt="San Antonio skyline"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Value Proposition Stats - Overlay on Image */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg"
            alt="San Antonio twilight"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-white text-3xl md:text-4xl tracking-[0.15em] text-center mb-16">
            WHY NNN PROPERTIES?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div className="border-r border-white/20 last:border-r-0 px-6">
              <p className="text-white text-4xl md:text-5xl font-light mb-3">NNN</p>
              <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
                Zero Management Headaches
              </p>
            </div>
            <div className="border-r border-white/20 last:border-r-0 px-6">
              <p className="text-white text-4xl md:text-5xl font-light mb-3">50</p>
              <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
                States Covered Nationwide
              </p>
            </div>
            <div className="px-6">
              <p className="text-white text-4xl md:text-5xl font-light mb-3">1031</p>
              <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
                Tax-Deferred Exchanges
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center mt-12">
            <div className="border-r border-white/20 last:border-r-0 px-6">
              <p className="text-white/80 text-sm leading-relaxed italic">
                Tenants handle property taxes, insurance, and maintenance. You collect rent without day-to-day responsibilities.
              </p>
            </div>
            <div className="border-r border-white/20 last:border-r-0 px-6">
              <p className="text-white/80 text-sm leading-relaxed italic">
                Access to single tenant retail properties in every state. We find replacements matching your timeline.
              </p>
            </div>
            <div className="px-6">
              <p className="text-white/80 text-sm leading-relaxed italic">
                Long-term leases with creditworthy tenants provide stable, predictable income for wealth building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two CTA Split Section */}
      <section className="grid md:grid-cols-2">
        {/* Left - Selling/Relinquished Property */}
        <div className="relative h-[500px] group overflow-hidden">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-cityscape.jpg"
            alt="Selling property"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
            <h3 className="text-white text-3xl md:text-4xl tracking-[0.15em] mb-4">
              SELLING A<br />PROPERTY?
            </h3>
            <p className="text-white/80 text-sm italic mb-8 max-w-xs">
              Learn how a 1031 exchange can help you defer capital gains taxes.
            </p>
            <Link
              href="/services/forward-exchange"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-ink transition-all"
            >
              Learn About Exchanges
            </Link>
          </div>
        </div>
        {/* Right - Buying/Replacement Property */}
        <div className="relative h-[500px] group overflow-hidden">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg"
            alt="Buying property"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
            <h3 className="text-white text-3xl md:text-4xl tracking-[0.15em] mb-4">
              LOOKING FOR<br />PROPERTY?
            </h3>
            <p className="text-white/80 text-sm italic mb-8 max-w-xs">
              Browse our curated selection of NNN retail properties updated regularly.
            </p>
            <Link
              href="/property-types"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-ink transition-all"
            >
              Find Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types Grid - Communities Style */}
      <section className="bg-secondary">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Title Card */}
          <div className="bg-ink flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-white text-2xl md:text-3xl tracking-[0.15em] mb-6">
              PROPERTY<br />TYPES
            </h2>
            <Link
              href="/property-types"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-ink transition-all"
            >
              View All
            </Link>
          </div>
          {/* Property Type Cards */}
          {featuredPropertyTypes.slice(0, 5).map((property) => {
            const imagePath = getPropertyTypeImagePath(property.slug);
            return (
              <Link
                key={property.slug}
                href={property.route}
                className="relative h-[280px] group overflow-hidden"
              >
                {imagePath && (
                  <SafeImage
                    src={imagePath}
                    alt={`${property.name} properties`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl md:text-2xl tracking-[0.15em] text-center px-4">
                    {property.name.toUpperCase()}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Inventory Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-heading mb-4">
              NNN INVESTMENT CATEGORIES
            </h2>
            <p className="text-ink/70 text-lg italic max-w-2xl mx-auto">
              Browse our curated selection of net lease property listings organized by investment category.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {inventoryCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.route}
                className="group p-8 border border-outline/50 hover:border-ink transition-colors"
              >
                <h3 className="text-lg tracking-[0.1em] text-heading mb-3 group-hover:text-muted transition-colors">
                  {category.name.toUpperCase()}
                </h3>
                {category.note && (
                  <p className="text-sm text-ink/60 mb-4 italic">{category.note}</p>
                )}
                <span className="text-xs tracking-[0.2em] uppercase text-ink/70 group-hover:text-ink transition-colors">
                  Browse Properties
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-heading mb-4">
              UNDERSTANDING NNN STRUCTURES
            </h2>
            <p className="text-ink/70 text-lg italic max-w-2xl mx-auto">
              Learn how single tenant triple net lease properties work for hands-off ownership and tax-deferred exchanges.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 border border-outline/30">
              <h3 className="text-xl tracking-[0.1em] text-heading mb-4">TRIPLE NET LEASE (NNN)</h3>
              <p className="text-ink/70 leading-relaxed mb-4 italic">
                In a triple net lease, tenants pay base rent plus property taxes, insurance, and maintenance costs. This structure provides landlords with predictable net income and minimal management responsibilities.
              </p>
              <p className="text-ink/70 leading-relaxed italic">
                Ideal for 1031 exchange buyers seeking passive income from established retail brands like convenience stores, quick service restaurants, and pharmacies.
              </p>
            </div>
            <div className="bg-white p-8 border border-outline/30">
              <h3 className="text-xl tracking-[0.1em] text-heading mb-4">SALE LEASEBACKS & GROUND LEASES</h3>
              <p className="text-ink/70 leading-relaxed mb-4 italic">
                Sale leaseback transactions allow business owners to sell their property and lease it back, creating immediate liquidity while maintaining operational control.
              </p>
              <p className="text-ink/70 leading-relaxed italic">
                Ground leases provide long-term land ownership with tenant-owned improvements, offering stable income with minimal landlord obligations.
              </p>
            </div>
            <div className="bg-white p-8 border border-outline/30">
              <h3 className="text-xl tracking-[0.1em] text-heading mb-4">ZERO CASH FLOW OPTIONS</h3>
              <p className="text-ink/70 leading-relaxed mb-4 italic">
                Some investors structure 1031 exchanges to minimize or eliminate cash flow in favor of long-term appreciation and tax deferral benefits.
              </p>
              <p className="text-ink/70 leading-relaxed italic">
                We help identify replacement properties that align with your specific financial goals, whether prioritizing current income or future growth potential.
              </p>
            </div>
            <div className="bg-white p-8 border border-outline/30">
              <h3 className="text-xl tracking-[0.1em] text-heading mb-4">NATIONWIDE PROPERTY SOURCING</h3>
              <p className="text-ink/70 leading-relaxed mb-4 italic">
                Our network spans all 50 states, allowing us to identify replacement properties that match your timeline, credit strength requirements, lease term preferences, and yield targets.
              </p>
              <p className="text-ink/70 leading-relaxed italic">
                Whether you&apos;re looking locally in San Antonio or nationwide, we source high-quality single tenant NNN retail properties for motivated 1031 exchange buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-heading mb-4">
              OUR 1031 EXCHANGE SERVICES
            </h2>
            <p className="text-ink/70 text-lg italic max-w-2xl mx-auto mb-8">
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
                className="group p-8 border border-outline/50 hover:border-ink transition-colors"
              >
                <h3 className="text-lg tracking-[0.1em] text-heading mb-3 group-hover:text-muted transition-colors">
                  {service.name.toUpperCase()}
                </h3>
                <p className="text-sm text-ink/60 italic">{service.short}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center text-xs tracking-[0.2em] uppercase text-ink hover:text-muted transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-heading mb-4">
              1031 EXCHANGE TOOLS
            </h2>
            <p className="text-ink/70 text-lg italic max-w-2xl mx-auto">
              Free tools to help you plan and execute your 1031 exchange. Calculate boot, estimate costs, and validate identification rules.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/tools/boot-calculator"
              className="group bg-white p-10 border border-outline/30 hover:border-ink transition-colors text-center"
            >
              <h3 className="text-xl tracking-[0.1em] text-heading mb-3 group-hover:text-muted transition-colors">
                BOOT CALCULATOR
              </h3>
              <p className="text-sm text-ink/60 italic mb-6">
                Calculate boot and estimate tax implications for your 1031 exchange.
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-ink/70 group-hover:text-ink transition-colors">
                Use Tool
              </span>
            </Link>
            <Link
              href="/tools/exchange-cost-estimator"
              className="group bg-white p-10 border border-outline/30 hover:border-ink transition-colors text-center"
            >
              <h3 className="text-xl tracking-[0.1em] text-heading mb-3 group-hover:text-muted transition-colors">
                COST ESTIMATOR
              </h3>
              <p className="text-sm text-ink/60 italic mb-6">
                Calculate QI fees, escrow costs, title insurance, and other closing costs.
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-ink/70 group-hover:text-ink transition-colors">
                Use Tool
              </span>
            </Link>
            <Link
              href="/tools/identification-rules-checker"
              className="group bg-white p-10 border border-outline/30 hover:border-ink transition-colors text-center"
            >
              <h3 className="text-xl tracking-[0.1em] text-heading mb-3 group-hover:text-muted transition-colors">
                RULES CHECKER
              </h3>
              <p className="text-sm text-ink/60 italic mb-6">
                Validate your property identification against the 3-property, 200%, or 95% rules.
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-ink/70 group-hover:text-ink transition-colors">
                Use Tool
              </span>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/tools"
              className="inline-flex items-center text-xs tracking-[0.2em] uppercase text-ink hover:text-muted transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Grid - Communities Style */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-heading mb-4">
              PROPERTIES AVAILABLE NATIONWIDE
            </h2>
            <p className="text-ink/70 text-lg italic max-w-2xl mx-auto mb-8">
              While we&apos;re based in San Antonio, we source single tenant NNN retail properties across all 50 states.
            </p>
            <div className="max-w-md mx-auto">
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
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {featuredLocations.map((location) => {
            const imagePath = getLocationImagePath(location.slug);
            return (
              <Link
                key={location.slug}
                href={location.route}
                className="relative h-[220px] group overflow-hidden"
              >
                {imagePath ? (
                  <SafeImage
                    src={imagePath}
                    alt={`1031 exchange properties in ${location.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-secondary" />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-lg md:text-xl tracking-[0.15em] text-center px-4">
                    {location.name.toUpperCase()}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-8 py-4 border border-ink text-ink text-xs tracking-[0.25em] uppercase hover:bg-ink hover:text-white transition-all mb-8"
            >
              View All Locations
            </Link>
            <div className="max-w-2xl mx-auto p-8 border border-ink/20">
              <h3 className="text-xl tracking-[0.1em] text-heading mb-3">
                NATIONWIDE PROPERTY SEARCH
              </h3>
              <p className="text-ink/70 italic mb-6">
                Need replacement properties outside of San Antonio? We identify single tenant NNN retail properties in all 50 states to match your 1031 exchange requirements.
              </p>
              <Link
                href="/contact?projectType=Other"
                className="inline-flex items-center text-xs tracking-[0.2em] uppercase text-ink hover:text-muted transition-colors"
              >
                Contact Us About Nationwide Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Work With Us / Contact Section */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg"
            alt="San Antonio"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-ink/80 backdrop-blur-sm p-12 text-center">
            <h2 className="text-white text-2xl md:text-3xl tracking-[0.15em] mb-6">
              WORK WITH US
            </h2>
            <p className="text-white/80 text-lg italic mb-4">
              We offer the highest level of expertise and service with integrity.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
              {site.company} specializes in helping 1031 exchange investors find high-quality single tenant NNN retail properties nationwide. As consummate professionals, we provide our clients with the highest level of service to reach their unique real estate investment goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-ink transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-heading mb-4">
                READY TO START YOUR EXCHANGE?
              </h2>
              <p className="text-ink/70 text-lg italic">
                Tell us about your exchange timelines and property goals, and we will connect you with net lease opportunities nationwide.
              </p>
            </div>
            <Suspense fallback={<div className="p-8 text-center text-ink/60 italic">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
