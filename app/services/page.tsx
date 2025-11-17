"use client";

import Link from "next/link";
import { Suspense } from "react";
import { servicesData } from "@/data";
import SearchInput from "@/components/SearchInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/app/contact/contact-form";
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
    <main className="min-h-screen bg-paper">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            1031 Exchange Services
          </h1>
          <p className="text-lg text-ink/80 mb-8">
            We help 1031 exchange buyers identify replacement properties nationwide. Our services focus on property identification, search, and coordination support. We can also help connect you with Qualified Intermediaries and tax advisors.
          </p>
          
          <div className="mb-8">
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

        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(servicesByCategory).map(([category, services]) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold text-heading mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
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
            </section>
          ))}
        </div>

        <div className="mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                Need help finding a specific service?
              </h2>
              <p className="text-ink/80">
                We can help identify replacement properties and coordinate your 1031 exchange needs.
              </p>
            </div>
            <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
              <ContactForm prefillProjectType="Service Inquiry" />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
