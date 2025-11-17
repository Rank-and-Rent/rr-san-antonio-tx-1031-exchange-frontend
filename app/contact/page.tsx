import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import site from "@/content/site.json";
import ContactForm from "./contact-form";

export default function ContactPage() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

  return (
    <main className="min-h-screen bg-paper">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">Contact Us</h1>
          <p className="text-lg text-ink/80 mb-12">
            Get in touch to discuss your 1031 exchange property identification needs. We help identify replacement properties nationwide.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-heading mb-6">Get in Touch</h2>
              <div className="space-y-4 text-ink">
                <div>
                  <h3 className="font-semibold text-heading mb-1">Address</h3>
                  <p>{site.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-heading mb-1">Phone</h3>
                  <a href={`tel:${site.phoneDigits}`} className="hover:underline">
                    {site.phone}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-heading mb-1">Email</h3>
                  <a href={`mailto:${site.email}`} className="hover:underline">
                    {site.email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-heading mb-6">Find Us</h2>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-outline">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedUrl}
                  title="Location Map"
                />
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="bg-panel border border-outline rounded-lg p-8 text-center text-ink/80">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
