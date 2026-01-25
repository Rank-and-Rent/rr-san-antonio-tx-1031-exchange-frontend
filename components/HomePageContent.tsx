"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import site from "@/content/site.json";
import { servicesData, locationsData, inventoryCategories } from "@/data";
import SearchInput from "@/components/SearchInput";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import { getLocationImagePath } from "@/lib/image-utils";

export default function HomePageContent() {
  const router = useRouter();
  
  // Use locations with verified UNIQUE good images (different file sizes)
  const featuredLocationSlugs = [
    "san-antonio",         // 599893 bytes
    "alamo-heights",       // 204394 bytes
    "medical-center",      // 377178 bytes
    "downtown-san-antonio", // 163935 bytes
    "north-central-san-antonio", // 179141 bytes
    "pearl-district",      // 146070 bytes
    "new-braunfels",       // 1356204 bytes
    "olmos-park"           // 345219 bytes
  ];
  
  const featuredLocations = featuredLocationSlugs
    .map(slug => locationsData.find(loc => loc.slug === slug))
    .filter((loc): loc is NonNullable<typeof loc> => loc !== undefined);

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
      {/* Hero Section - Video Background */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/wemby city.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        {/* Hero Content - Centered white text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/80 text-xs tracking-[0.5em] uppercase mb-8">
            Technology + Marketing =
          </p>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] mb-8">
            1031 EXCHANGE<br />SAN ANTONIO
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light italic max-w-2xl mb-12">
            Search our exclusive listings.
          </p>
          <Link
            href="/property-types"
            className="inline-flex items-center justify-center px-12 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
          >
            Search All Properties
          </Link>
        </div>
      </section>

      {/* About Section - Split Layout (Light bg left, Image right) */}
      <section className="grid lg:grid-cols-2">
        {/* Left - Text on light background */}
        <div className="flex items-center justify-center p-12 lg:p-20 bg-white">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl tracking-[0.15em] text-[#1a1a1a] mb-8">
              MEET 1031 EXCHANGE SAN ANTONIO
            </h2>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-6 italic">
              We specialize in helping 1031 exchange investors find high-quality single tenant NNN retail properties nationwide. Our expertise in net lease investments provides a streamlined, professional experience for buyers seeking stable, predictable income.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-6 italic">
              From property identification to exchange coordination, we guide unrepresented buyers through every step of the process. Our hands-on approach combines market knowledge with a commitment to finding the right replacement property for your investment goals.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-10 italic">
              Based in San Antonio, we source properties across all 50 states, helping investors defer capital gains taxes while building long-term wealth through triple net lease investments.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-10 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Right - Image */}
        <div className="relative h-[500px] lg:h-auto min-h-[500px]">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg"
            alt="San Antonio skyline"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Two CTA Split Section - Both with dark overlay */}
      <section className="grid md:grid-cols-2">
        {/* Left - Selling Property */}
        <div className="relative h-[550px] group overflow-hidden">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-cityscape.jpg"
            alt="Selling property"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-10">
            <h3 className="text-white text-3xl md:text-4xl tracking-[0.2em] mb-6">
              SELLING A<br />HOME?
            </h3>
            <p className="text-white/70 text-sm italic mb-10 max-w-sm">
              Find out what your home is really worth.
            </p>
            <Link
              href="/services/forward-exchange"
              className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
            >
              Get Home Value
            </Link>
          </div>
        </div>
        {/* Right - Buying Property */}
        <div className="relative h-[550px] group overflow-hidden">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg"
            alt="Buying property"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-10">
            <h3 className="text-white text-3xl md:text-4xl tracking-[0.2em] mb-6">
              BUYING A<br />HOME?
            </h3>
            <p className="text-white/70 text-sm italic mb-10 max-w-sm">
              Listings updated every 15 minutes. Use our advanced home search now!
            </p>
            <Link
              href="/property-types"
              className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
            >
              Find Your Home
            </Link>
          </div>
        </div>
      </section>

      {/* Work With Us Section */}
      <section className="relative py-28">
        <div className="absolute inset-0">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg"
            alt="San Antonio"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-xl mx-auto bg-[#1a1a1a]/90 backdrop-blur-sm p-14 text-center">
            <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] mb-8">
              WORK WITH US
            </h2>
            <p className="text-white/70 text-lg italic mb-6">
              We offer the highest level of expertise and service with integrity.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-10 italic">
              {site.company} specializes in helping 1031 exchange investors find high-quality single tenant NNN retail properties nationwide. As consummate professionals, we provide our clients with the highest level of service to reach their unique real estate investment goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Cities/Locations Grid - Matching Frontgate Layout */}
      <section>
        {/* Row 1: Title + 4 images */}
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Title Card - Dark background */}
          <div className="bg-[#1a1a1a] flex flex-col items-start justify-center p-10 md:p-14 min-h-[280px]">
            <h2 className="text-white text-3xl md:text-4xl tracking-[0.25em] mb-8 font-light whitespace-nowrap">
              COMMUNITIES
            </h2>
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/60 text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
            >
              View All
            </Link>
          </div>
          {/* First 4 locations */}
          {featuredLocations.slice(0, 4).map((location) => {
            const imagePath = getLocationImagePath(location.slug);
            return (
              <Link
                key={location.slug}
                href={location.route}
                className="relative h-[280px] group overflow-hidden"
              >
                <SafeImage
                  src={imagePath || ""}
                  alt={`1031 exchange properties in ${location.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-8 left-6 z-10">
                  <h3 className="text-white text-lg tracking-[0.15em] font-medium">
                    {location.name.toUpperCase()}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
        {/* Row 2: 4 more images */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {featuredLocations.slice(4, 8).map((location) => {
            const imagePath = getLocationImagePath(location.slug);
            return (
              <Link
                key={location.slug}
                href={location.route}
                className="relative h-[280px] group overflow-hidden"
              >
                <SafeImage
                  src={imagePath || ""}
                  alt={`1031 exchange properties in ${location.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-8 left-6 z-10">
                  <h3 className="text-white text-lg tracking-[0.15em] font-medium">
                    {location.name.toUpperCase()}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Inventory Categories Section - Light background */}
      <section className="py-24 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              NNN INVESTMENT CATEGORIES
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg italic max-w-2xl mx-auto">
              Browse our curated selection of net lease property listings organized by investment category.
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
                  <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 mb-4 italic transition-colors">{category.note}</p>
                )}
                <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 group-hover:text-white/80 transition-colors">
                  Browse Properties
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding NNN Structures + Why NNN Properties Combined */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              UNDERSTANDING NNN STRUCTURES
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg italic max-w-2xl mx-auto">
              Learn how single tenant triple net lease properties work for hands-off ownership and tax-deferred exchanges.
            </p>
          </div>

          {/* Why NNN Properties - Stats */}
          <div className="relative py-16 mb-16 rounded-sm overflow-hidden">
            <div className="absolute inset-0">
              <SafeImage
                src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg"
                alt="San Antonio twilight"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>
            <div className="relative z-10">
              <h3 className="text-white text-2xl md:text-3xl tracking-[0.2em] text-center mb-12">
                WHY NNN PROPERTIES?
              </h3>
              <div className="grid md:grid-cols-3 gap-0 max-w-5xl mx-auto text-center">
                <div className="border-r border-white/20 px-8 py-6">
                  <p className="text-white text-5xl md:text-6xl font-light mb-4">NNN</p>
                  <p className="text-white/70 text-xs tracking-[0.25em] uppercase">
                    Zero Management Headaches
                  </p>
                </div>
                <div className="border-r border-white/20 px-8 py-6">
                  <p className="text-white text-5xl md:text-6xl font-light mb-4">50</p>
                  <p className="text-white/70 text-xs tracking-[0.25em] uppercase">
                    States Covered Nationwide
                  </p>
                </div>
                <div className="px-8 py-6">
                  <p className="text-white text-5xl md:text-6xl font-light mb-4">1031</p>
                  <p className="text-white/70 text-xs tracking-[0.25em] uppercase">
                    Tax-Deferred Exchanges
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-0 max-w-5xl mx-auto text-center mt-8">
                <div className="border-r border-white/20 px-8 py-6">
                  <p className="text-white/60 text-sm leading-relaxed italic">
                    Tenants handle property taxes, insurance, and maintenance. You collect rent without day-to-day responsibilities.
                  </p>
                </div>
                <div className="border-r border-white/20 px-8 py-6">
                  <p className="text-white/60 text-sm leading-relaxed italic">
                    Access to single tenant retail properties in every state. We find replacements matching your timeline.
                  </p>
                </div>
                <div className="px-8 py-6">
                  <p className="text-white/60 text-sm leading-relaxed italic">
                    Long-term leases with creditworthy tenants provide stable, predictable income for wealth building.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Education Cards */}
          <div className="grid md:grid-cols-2 gap-px bg-[#d4d4d4] max-w-5xl mx-auto">
            <div className="bg-[#f5f5f3] p-10">
              <h3 className="text-xl tracking-[0.15em] text-[#1a1a1a] mb-5">TRIPLE NET LEASE (NNN)</h3>
              <p className="text-[#1a1a1a]/60 leading-relaxed mb-4 italic">
                In a triple net lease, tenants pay base rent plus property taxes, insurance, and maintenance costs. This structure provides landlords with predictable net income and minimal management responsibilities.
              </p>
              <p className="text-[#1a1a1a]/60 leading-relaxed italic">
                Ideal for 1031 exchange buyers seeking passive income from established retail brands like convenience stores, quick service restaurants, and pharmacies.
              </p>
            </div>
            <div className="bg-[#f5f5f3] p-10">
              <h3 className="text-xl tracking-[0.15em] text-[#1a1a1a] mb-5">SALE LEASEBACKS & GROUND LEASES</h3>
              <p className="text-[#1a1a1a]/60 leading-relaxed mb-4 italic">
                Sale leaseback transactions allow business owners to sell their property and lease it back, creating immediate liquidity while maintaining operational control.
              </p>
              <p className="text-[#1a1a1a]/60 leading-relaxed italic">
                Ground leases provide long-term land ownership with tenant-owned improvements, offering stable income with minimal landlord obligations.
              </p>
            </div>
            <div className="bg-[#f5f5f3] p-10">
              <h3 className="text-xl tracking-[0.15em] text-[#1a1a1a] mb-5">ZERO CASH FLOW OPTIONS</h3>
              <p className="text-[#1a1a1a]/60 leading-relaxed mb-4 italic">
                Some investors structure 1031 exchanges to minimize or eliminate cash flow in favor of long-term appreciation and tax deferral benefits.
              </p>
              <p className="text-[#1a1a1a]/60 leading-relaxed italic">
                We help identify replacement properties that align with your specific financial goals, whether prioritizing current income or future growth potential.
              </p>
            </div>
            <div className="bg-[#f5f5f3] p-10">
              <h3 className="text-xl tracking-[0.15em] text-[#1a1a1a] mb-5">NATIONWIDE PROPERTY SOURCING</h3>
              <p className="text-[#1a1a1a]/60 leading-relaxed mb-4 italic">
                Our network spans all 50 states, allowing us to identify replacement properties that match your timeline, credit strength requirements, lease term preferences, and yield targets.
              </p>
              <p className="text-[#1a1a1a]/60 leading-relaxed italic">
                Whether you&apos;re looking locally in San Antonio or nationwide, we source high-quality single tenant NNN retail properties for motivated 1031 exchange buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Light background */}
      <section className="py-24 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              OUR 1031 EXCHANGE SERVICES
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg italic max-w-2xl mx-auto mb-10">
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
          <div className="grid md:grid-cols-2 gap-px bg-[#d4d4d4] max-w-4xl mx-auto">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="group p-10 bg-white hover:bg-[#1a1a1a] transition-colors"
              >
                <h3 className="text-lg tracking-[0.15em] text-[#1a1a1a] group-hover:text-white mb-3 transition-colors">
                  {service.name.toUpperCase()}
                </h3>
                <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 italic transition-colors">{service.short}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center text-xs tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#1a1a1a]/60 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section - Light background */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              1031 EXCHANGE TOOLS
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg italic max-w-2xl mx-auto">
              Free tools to help you plan and execute your 1031 exchange. Calculate boot, estimate costs, and validate identification rules.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#d4d4d4] max-w-5xl mx-auto">
            <Link
              href="/tools/boot-calculator"
              className="group bg-[#f5f5f3] hover:bg-[#1a1a1a] p-12 text-center transition-colors"
            >
              <h3 className="text-xl tracking-[0.15em] text-[#1a1a1a] group-hover:text-white mb-4 transition-colors">
                BOOT CALCULATOR
              </h3>
              <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 italic mb-6 transition-colors">
                Calculate boot and estimate tax implications for your 1031 exchange.
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 group-hover:text-white/80 transition-colors">
                Use Tool
              </span>
            </Link>
            <Link
              href="/tools/exchange-cost-estimator"
              className="group bg-[#f5f5f3] hover:bg-[#1a1a1a] p-12 text-center transition-colors"
            >
              <h3 className="text-xl tracking-[0.15em] text-[#1a1a1a] group-hover:text-white mb-4 transition-colors">
                COST ESTIMATOR
              </h3>
              <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 italic mb-6 transition-colors">
                Calculate QI fees, escrow costs, title insurance, and other closing costs.
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 group-hover:text-white/80 transition-colors">
                Use Tool
              </span>
            </Link>
            <Link
              href="/tools/identification-rules-checker"
              className="group bg-[#f5f5f3] hover:bg-[#1a1a1a] p-12 text-center transition-colors"
            >
              <h3 className="text-xl tracking-[0.15em] text-[#1a1a1a] group-hover:text-white mb-4 transition-colors">
                RULES CHECKER
              </h3>
              <p className="text-sm text-[#1a1a1a]/50 group-hover:text-white/60 italic mb-6 transition-colors">
                Validate your property identification against the 3-property, 200%, or 95% rules.
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 group-hover:text-white/80 transition-colors">
                Use Tool
              </span>
            </Link>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center text-xs tracking-[0.2em] uppercase text-[#1a1a1a] hover:text-[#1a1a1a]/60 transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* All Locations with Search */}
      <section className="py-24 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              PROPERTIES AVAILABLE NATIONWIDE
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg italic max-w-2xl mx-auto mb-10">
              While we&apos;re based in San Antonio, we source single tenant NNN retail properties across all 50 states.
            </p>
            <div className="max-w-md mx-auto mb-12">
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
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-12 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              View All Locations
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Light background */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
                READY TO START YOUR EXCHANGE?
              </h2>
              <p className="text-[#1a1a1a]/60 text-lg italic">
                Tell us about your exchange timelines and property goals, and we will connect you with net lease opportunities nationwide.
              </p>
            </div>
            <Suspense fallback={<div className="p-8 text-center text-[#1a1a1a]/40 italic">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
