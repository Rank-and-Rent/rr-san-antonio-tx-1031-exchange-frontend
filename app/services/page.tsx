"use client";

import Link from "next/link";
import { Suspense } from "react";
import { servicesData } from "@/data";
import SearchInput from "@/components/SearchInput";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  
  const servicesByCategory = servicesData.reduce((acc, service) => {
    const category = service.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<string, typeof servicesData>);

  const handleNoResults = (query: string) => {
    router.push(`/contact?projectType=${encodeURIComponent(query)}`);
  };

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
              Expert Guidance
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
              OUR SERVICES
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed italic mb-10">
              We help 1031 exchange buyers identify replacement properties nationwide. Our services focus on property identification, search, and coordination support. We can also help connect you with Qualified Intermediaries and tax advisors.
            </p>
            <div className="max-w-md mx-auto">
              <SearchInput
                placeholder="Search services..."
                items={servicesData.map((s) => ({
                  slug: s.slug,
                  name: s.name,
                  route: s.route,
                }))}
                onNoResults={handleNoResults}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category}>
                <h2 className="text-2xl tracking-[0.2em] text-[#1a1a1a] mb-8 text-center">
                  {category.toUpperCase()}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.route}
                      className="group p-8 bg-white border border-[#e5e5e5] hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-colors"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl tracking-[0.2em] text-[#1a1a1a] mb-6">
                NEED HELP FINDING A SERVICE?
              </h2>
              <p className="text-[#1a1a1a]/60 text-lg italic">
                We can help identify replacement properties and coordinate your 1031 exchange needs.
              </p>
            </div>
            <Suspense fallback={<div className="p-8 text-center text-[#1a1a1a]/40 italic">Loading form...</div>}>
              <ContactForm prefillProjectType="Service Inquiry" />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
