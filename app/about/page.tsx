import Link from "next/link";
import site from "@/content/site.json";
import SafeImage from "@/components/SafeImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "About Us | 1031 Exchange Property Identification Services",
  description: "We help 1031 exchange buyers identify replacement properties nationwide. Learn about our secure intake process, property matching workflow, and coordination with Qualified Intermediaries and lenders.",
};

export default function AboutPage() {
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
              {site.company}
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-light">
              ABOUT US
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </div>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#1a1a1a]/70 text-lg leading-relaxed mb-8 italic">
              This site is focused on helping you identify 1031 exchange replacement properties.
              We specialize in finding single tenant NNN retail and commercial properties nationwide
              that qualify for tax deferred exchanges.
            </p>

            <h2 className="text-2xl tracking-[0.15em] text-[#1a1a1a] mb-6 mt-12">
              WHAT WE DO
            </h2>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              We help 1031 exchange buyers quickly find high quality single tenant NNN retail and
              shopping center properties nationwide. Our property identification process focuses on
              matching your timeline, credit strength requirements, lease term preferences, and yield
              targets with available replacement properties.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              We spotlight single tenant net lease assets where the tenant handles taxes, insurance,
              and maintenance, so you can collect rent without day to day management headaches. We
              provide clear explanations of NNN structures, sale leasebacks, ground leases, and zero
              cash flow options.
            </p>

            <h2 className="text-2xl tracking-[0.15em] text-[#1a1a1a] mb-6 mt-12">
              OUR PROCESS
            </h2>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              Our secure intake process begins when you contact us about your 1031 exchange needs.
              We gather information about your relinquished property, exchange timeline, investment
              criteria, and location preferences.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              Our property matching workflow uses your criteria to identify replacement properties
              across all 50 states. We provide property details, financial information, and lease
              terms for your review. We coordinate with third party Qualified Intermediaries and
              lenders to ensure smooth transaction execution.
            </p>

            <h2 className="text-2xl tracking-[0.15em] text-[#1a1a1a] mb-6 mt-12">
              IMPORTANT DISCLOSURES
            </h2>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              This site helps investors identify potential replacement properties for Section 1031
              exchanges. We are not a Qualified Intermediary, law firm, broker, or CPA.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              We can help you get in touch with tax professionals and Qualified Intermediaries, but
              we are not a Qualified Intermediary ourselves. Users should consult a Qualified
              Intermediary and tax advisor before acting on any 1031 exchange transaction.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              All property information is provided for identification purposes only. We do not
              provide legal or tax advice. You should work with qualified professionals for all
              legal, tax, and exchange coordination matters.
            </p>

            <h2 className="text-2xl tracking-[0.15em] text-[#1a1a1a] mb-6 mt-12">
              WHO WE SERVE
            </h2>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              We work with unrepresented 1031 exchange buyers who need trusted guidance and speed.
              This includes landowners or business sellers with new liquidity who want stable brands
              like convenience stores, quick service restaurants, pharmacies, and essential retail.
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed mb-4 italic">
              Our goal is simple. Bring motivated exchange buyers to the right inventory, educate
              them on why single tenant triple net works for hands off ownership, and help them
              connect with the resources needed to complete their transactions quickly and
              professionally.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] mb-6">
            READY TO FIND YOUR REPLACEMENT PROPERTY?
          </h2>
          <p className="text-white/60 text-lg italic mb-10 max-w-2xl mx-auto">
            Contact us to discuss your 1031 exchange property identification needs.
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
