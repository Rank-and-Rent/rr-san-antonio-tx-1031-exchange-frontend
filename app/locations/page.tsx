"use client";

import Link from "next/link";
import Image from "next/image";
import { locationsData } from "@/data";
import SearchInput from "@/components/SearchInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import SafeImage from "@/components/SafeImage";
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
    <main className="min-h-screen bg-paper">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
        
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            1031 Exchange Properties by Location
          </h1>
          <p className="text-lg text-ink/80 mb-8">
            We identify replacement properties in San Antonio, TX and surrounding areas, as well as nationwide. Browse locations where we source single tenant NNN retail and commercial properties for 1031 exchanges.
          </p>
          
          <div className="mb-8">
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

        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(locationsByType).map(([type, locations]) => (
            <section key={type}>
              <h2 className="text-2xl font-semibold text-heading mb-6 capitalize">
                {type.replace("-", " ")}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => {
                  const imagePath = getLocationImagePath(location.slug);
                  return (
                    <Link
                      key={location.slug}
                      href={location.route}
                      className="bg-panel border border-outline rounded-lg overflow-hidden hover:border-primary transition-colors group"
                    >
                      {imagePath && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <SafeImage
                            src={imagePath}
                            alt={`1031 exchange properties in ${location.name}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            </section>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 bg-panel border border-outline rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-heading mb-4">
            Need properties in a different location?
          </h2>
          <p className="text-ink/80 mb-6">
            We identify replacement properties across all 50 states. Contact us to discuss your specific location requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primaryfg rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}

