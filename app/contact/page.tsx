import { Suspense } from "react";
import site from "@/content/site.json";
import ContactForm from "./contact-form";
import SafeImage from "@/components/SafeImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactPage() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
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
              Get in Touch
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
              CONTACT US
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      </div>

      {/* Contact Info & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl tracking-[0.15em] text-[#1a1a1a] mb-8">
                  GET IN TOUCH
                </h2>
                <p className="text-[#1a1a1a]/70 leading-relaxed italic mb-8">
                  Get in touch to discuss your 1031 exchange property identification needs. We help identify replacement properties nationwide.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2">Address</h3>
                    <p className="text-[#1a1a1a]">{site.address}</p>
                  </div>
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2">Phone</h3>
                    <a href={`tel:${site.phoneDigits}`} className="text-[#1a1a1a] hover:text-[#1a1a1a]/70 transition-colors">
                      {site.phone}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2">Email</h3>
                    <a href={`mailto:${site.email}`} className="text-[#1a1a1a] hover:text-[#1a1a1a]/70 transition-colors">
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl tracking-[0.15em] text-[#1a1a1a] mb-8">
                  FIND US
                </h2>
                <div className="w-full h-64 overflow-hidden border border-[#e5e5e5]">
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
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl tracking-[0.2em] text-[#1a1a1a] mb-6">
                SEND US A MESSAGE
              </h2>
              <p className="text-[#1a1a1a]/60 text-lg italic">
                Tell us about your exchange timelines and property goals.
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
