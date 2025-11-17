import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { propertyTypesData } from "@/data";
import Breadcrumbs from "@/components/Breadcrumbs";
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
    <main className="min-h-screen bg-paper">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Property Types" }]} />
        
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            Property Types for 1031 Exchanges
          </h1>
          <p className="text-lg text-ink/80 mb-8">
            Browse property types available for 1031 exchange replacement properties. We identify single tenant NNN retail, multifamily, industrial, medical office, and other commercial properties nationwide.
          </p>
          
          <div className="mb-8">
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

        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypesData.map((propertyType) => {
              const imagePath = getPropertyTypeImagePath(propertyType.slug);
              return (
                <Link
                  key={propertyType.slug}
                  href={propertyType.route}
                  className="bg-panel border border-outline rounded-lg overflow-hidden hover:border-primary transition-colors group"
                >
                  {imagePath && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <SafeImage
                        src={imagePath}
                        alt={`${propertyType.name} properties for 1031 exchange`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                      {propertyType.name}
                    </h3>
                    <p className="text-sm text-ink/70">
                      View available {propertyType.name.toLowerCase()} properties for 1031 exchange
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                Need help finding a specific property type?
              </h2>
              <p className="text-ink/80">
                We can help identify replacement properties across various asset types for your 1031 exchange.
              </p>
            </div>
            <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
              <ContactForm prefillProjectType="Property Type Inquiry" />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

