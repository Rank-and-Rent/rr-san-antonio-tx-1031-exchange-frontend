"use client";

import Link from "next/link";
import { locationsData } from "@/data";
import SearchInput from "@/components/SearchInput";
import SafeImage from "@/components/SafeImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getLocationImagePath } from "@/lib/image-utils";
import { useRouter } from "next/navigation";

export default function LocationsPage() {
  const router = useRouter();

  const locationsByType = locationsData.reduce((acc, location) => {
    const type = location.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(location);
    return acc;
  }, {} as Record<string, typeof locationsData>);

  const handleNoResults = (query: string) => {
    router.push(`/contact?projectType=${encodeURIComponent(`Other: ${query}`)}`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <SafeImage
          src="/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg"
          alt="San Antonio Riverwalk"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-4">
              Properties Nationwide
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
              COMMUNITIES
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
      </div>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed italic mb-10">
              We identify replacement properties in San Antonio, TX and surrounding areas, as well as nationwide. Browse locations where we source single tenant NNN retail and commercial properties for 1031 exchanges.
            </p>
            <div className="max-w-md mx-auto">
              <SearchInput
                placeholder="Search locations..."
                items={locationsData.map((l) => ({
                  slug: l.slug,
                  name: l.name,
                  route: l.route,
                }))}
                onNoResults={handleNoResults}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            {Object.entries(locationsByType).map(([type, locations]) => (
              <div key={type}>
                <h2 className="text-2xl tracking-[0.2em] text-[#1a1a1a] mb-8 text-center capitalize">
                  {type.replace("-", " ").toUpperCase()}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locations.map((location) => {
                    const imagePath = getLocationImagePath(location.slug);
                    return (
                      <Link
                        key={location.slug}
                        href={location.route}
                        className="group relative h-[280px] overflow-hidden"
                      >
                        {imagePath ? (
                          <SafeImage
                            src={imagePath}
                            alt={`1031 exchange properties in ${location.name}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#2a2a2a]" />
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute bottom-8 left-6 z-10">
                          <h3 className="text-white text-lg tracking-[0.15em] font-medium">
                            {location.name.toUpperCase()}
                          </h3>
                          <p className="text-white/60 text-sm capitalize mt-1">
                            {location.type.replace("-", " ")}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] mb-6">
            NEED PROPERTIES IN A DIFFERENT LOCATION?
          </h2>
          <p className="text-white/60 text-lg italic mb-10 max-w-2xl mx-auto">
            We identify replacement properties across all 50 states. Contact us to discuss your specific location requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-12 py-4 border border-white text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
