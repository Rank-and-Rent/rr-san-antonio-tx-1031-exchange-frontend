import Link from "next/link";
import { Suspense } from "react";
import { propertyTypesData } from "@/data";
import SearchInput from "@/components/SearchInput";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import { getPropertyTypeImagePath } from "@/lib/image-utils";

export const metadata = {
  title: "Property Types | 1031 Exchange Replacement Properties",
  description: "Browse property types available for 1031 exchanges including single tenant NNN retail, multifamily, industrial, medical office, and more.",
};

export default function PropertyTypesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <SafeImage
          src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg"
          alt="San Antonio skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-4">
              Investment Options
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
              PROPERTY TYPES
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed italic mb-10">
              Browse property types available for 1031 exchange replacement properties. We identify single tenant NNN retail, multifamily, industrial, medical office, and other commercial properties nationwide.
            </p>
            <div className="max-w-md mx-auto">
              <SearchInput
                placeholder="Search property types..."
                items={propertyTypesData.map((pt) => ({
                  slug: pt.slug,
                  name: pt.name,
                  route: pt.route,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Grid */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyTypesData.map((propertyType) => {
                const imagePath = getPropertyTypeImagePath(propertyType.slug);
                return (
                  <Link
                    key={propertyType.slug}
                    href={propertyType.route}
                    className="group relative h-[280px] overflow-hidden"
                  >
                    {imagePath ? (
                      <SafeImage
                        src={imagePath}
                        alt={`${propertyType.name} properties for 1031 exchange`}
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
                        {propertyType.name.toUpperCase()}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        Browse available properties
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl tracking-[0.2em] text-[#1a1a1a] mb-6">
                NEED HELP FINDING A PROPERTY TYPE?
              </h2>
              <p className="text-[#1a1a1a]/60 text-lg italic">
                We can help identify replacement properties across various asset types for your 1031 exchange.
              </p>
            </div>
            <Suspense fallback={<div className="p-8 text-center text-[#1a1a1a]/40 italic">Loading form...</div>}>
              <ContactForm prefillProjectType="Property Type Inquiry" />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
