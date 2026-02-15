"use client";

import Link from "next/link";
import { Suspense } from "react";
import site from "@/content/site.json";
import { servicesData, locationsData } from "@/data";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import { getLocationImagePath, getPropertyTypeImagePath } from "@/lib/image-utils";

export default function HomePageContent() {
  // Use locations with CLEAN images (no signs/text visible in photos)
  // 9 locations for 3x3 grid
  const featuredLocationSlugs = [
    "alamo-heights",       // clean aerial
    "medical-center",      // clean aerial
    "downtown-san-antonio", // clean riverwalk
    "helotes",             // clean landscape
    "north-central-san-antonio", // clean buildings
    "new-braunfels",       // clean river
    "converse",            // clean area
    "fair-oaks-ranch",     // clean residential
    "stone-oak"            // neighborhood
  ];

  const featuredLocations = featuredLocationSlugs
    .map(slug => locationsData.find(loc => loc.slug === slug))
    .filter((loc): loc is NonNullable<typeof loc> => loc !== undefined);

  // Featured property types for the grid
  const featuredPropertyTypes = [
    { name: "Drive Thru QSR", typeSlug: "drive-thru-qsr", slug: "/property-types/drive-thru-qsr" },
    { name: "Convenience Store", typeSlug: "convenience-store-gas", slug: "/property-types/convenience-store-gas" },
    { name: "Pharmacy", typeSlug: "pharmacy", slug: "/property-types/pharmacy" },
    { name: "Medical Office", typeSlug: "urgent-care-medical", slug: "/property-types/urgent-care-medical" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Video Background like C&H */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
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
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content - Centered like C&H */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Location subtitle */}
          <p className="text-white/80 text-xs tracking-[0.5em] uppercase mb-6">
            San Antonio, Texas &amp; Nationwide
          </p>
          {/* Large Company Name - Cormorant Garamond like C&H */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-white text-4xl md:text-7xl lg:text-8xl font-light tracking-[0.08em] mb-6 leading-[1.1]">
            1031 EXCHANGE<br />SAN ANTONIO
          </h1>
          {/* Italic tagline */}
          <p className="text-white/80 text-lg md:text-xl font-light italic max-w-2xl mb-6 font-[family-name:var(--font-cormorant)]">
            Unparalleled Service and Expert Advice at Every Step of the 1031 Exchange Process
          </p>
          {/* Agent info */}
          <p className="text-white/70 text-sm tracking-wide mb-12">
            Serving 1031 Exchange Investors Nationwide | {site.phone}
          </p>

          <Link
            href="/property-types"
            className="inline-flex items-center justify-center px-12 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
          >
            View Properties
          </Link>
        </div>
      </section>

      {/* About Section - Split Layout like C&H (text left, image right) */}
      <section className="grid lg:grid-cols-2">
        {/* Left - Text */}
        <div className="flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
          <div className="max-w-lg">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl lg:text-[2.75rem] tracking-[0.08em] text-[#1a1a1a] mb-8 font-light leading-[1.2] normal-case">
              1031 Exchange<br />San Antonio
            </h2>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-6 italic font-[family-name:var(--font-cormorant)] text-lg">
              {site.company} specializes in helping 1031 exchange investors find high-quality single tenant NNN retail properties nationwide. For years we have been a trusted resource for investors seeking tax-deferred exchanges across all 50 states.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-6 italic font-[family-name:var(--font-cormorant)] text-lg">
              With deep expertise in net lease investments and closing transactions nationwide, the {site.company} team provides our clients with exceptional knowledge about NNN properties, which is backed by our commitment to service and integrity.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-10 italic font-[family-name:var(--font-cormorant)] text-lg">
              Through our nationwide network, our ability to source and identify replacement properties is optimized with the most innovative tools and resources available in today&apos;s market.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-10 py-4 border border-[#c9a96e] text-[#c9a96e] text-xs tracking-[0.3em] uppercase hover:bg-[#c9a96e] hover:text-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Right - Image */}
        <div className="relative h-[300px] md:h-[500px] lg:h-auto lg:min-h-[500px]">
          <SafeImage
            src="/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg"
            alt="San Antonio skyline"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Featured Property Types Section */}
      <section className="py-20 bg-white">
        <div className="px-4">
          <h2 className="text-center text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-10">
            FEATURED PROPERTIES
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredPropertyTypes.map((property, i) => {
              const imagePath = getPropertyTypeImagePath(property.typeSlug);
              return (
              <Link
                key={i}
                href={property.slug}
                className="group relative overflow-hidden"
              >
                <div className="relative h-[250px] md:h-[350px] bg-[#e5e5e5]">
                  <SafeImage
                    src={imagePath || ""}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="bg-[#333] px-6 py-5">
                  <h3 className="text-white text-lg tracking-[0.12em] font-light font-[family-name:var(--font-cormorant)]">
                    {property.name.toUpperCase()}
                  </h3>
                </div>
              </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/property-types"
              className="inline-flex items-center justify-center px-12 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              View All Property Types
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section - 3x3 Grid like C&H */}
      <section className="py-20 bg-white">
        <div className="px-4">
          <h2 className="text-center text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-10">
            NEIGHBORHOODS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {featuredLocations.slice(0, 9).map((location) => {
              const imagePath = getLocationImagePath(location.slug);
              return (
                <Link
                  key={location.slug}
                  href={location.route}
                  className="relative h-[200px] md:h-[300px] group overflow-hidden"
                >
                  <SafeImage
                    src={imagePath || ""}
                    alt={`1031 exchange properties in ${location.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h3 className="text-white text-xl md:text-2xl tracking-[0.2em] font-light text-center">
                      {location.name.toUpperCase()}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-16">
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-12 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Work With Us Section */}
      <section className="relative py-16 md:py-28">
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
          <div className="max-w-xl mx-auto bg-[#1a1a1a]/90 backdrop-blur-sm p-8 md:p-14 text-center">
            <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] mb-8">
              WORK WITH US
            </h2>
            <p className="text-white/70 text-lg italic mb-6 font-[family-name:var(--font-cormorant)]">
              We offer the highest level of expertise and service with integrity.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-10 italic font-[family-name:var(--font-cormorant)]">
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

      {/* Services Section - Restyled */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
              OUR SERVICES
            </h2>
            <p className="text-[#1a1a1a]/60 text-lg italic max-w-2xl mx-auto font-[family-name:var(--font-cormorant)]">
              From property identification to exchange coordination, we guide 1031 exchange buyers through every step.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 max-w-6xl mx-auto">
            {servicesData.slice(0, 8).map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="group relative border-r border-b border-[#e5e5e5] last:border-r-0 p-8 hover:bg-[#f5f5f3] transition-colors"
              >
                <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase mb-3 font-medium">
                  {service.category}
                </p>
                <h3 className="text-sm tracking-[0.12em] text-[#1a1a1a] mb-3 transition-colors leading-snug">
                  {service.name.toUpperCase()}
                </h3>
                <p className="text-sm text-[#1a1a1a]/50 italic font-[family-name:var(--font-cormorant)] leading-relaxed">
                  {service.short}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-12 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.3em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl tracking-[0.2em] text-[#1a1a1a] mb-6">
                READY TO START YOUR EXCHANGE?
              </h2>
              <p className="text-[#1a1a1a]/60 text-lg italic font-[family-name:var(--font-cormorant)]">
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
