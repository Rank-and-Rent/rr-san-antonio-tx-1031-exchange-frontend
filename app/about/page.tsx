import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import site from "@/content/site.json";

export const metadata = {
  title: "About Us | 1031 Exchange Property Identification Services",
  description: "We help 1031 exchange buyers identify replacement properties nationwide. Learn about our secure intake process, property matching workflow, and coordination with Qualified Intermediaries and lenders.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">
            About Us
          </h1>
          
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-ink/80 leading-relaxed mb-6">
              This site is focused on helping you identify 1031 exchange replacement properties.
              We specialize in finding single tenant NNN retail and commercial properties nationwide
              that qualify for tax deferred exchanges.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4 mt-8">
              What We Do
            </h2>
            <p className="text-ink/80 leading-relaxed mb-4">
              We help 1031 exchange buyers quickly find high quality single tenant NNN retail and
              shopping center properties nationwide. Our property identification process focuses on
              matching your timeline, credit strength requirements, lease term preferences, and yield
              targets with available replacement properties.
            </p>
            <p className="text-ink/80 leading-relaxed mb-4">
              We spotlight single tenant net lease assets where the tenant handles taxes, insurance,
              and maintenance, so you can collect rent without day to day management headaches. We
              provide clear explanations of NNN structures, sale leasebacks, ground leases, and zero
              cash flow options.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4 mt-8">
              Our Process
            </h2>
            <p className="text-ink/80 leading-relaxed mb-4">
              Our secure intake process begins when you contact us about your 1031 exchange needs.
              We gather information about your relinquished property, exchange timeline, investment
              criteria, and location preferences.
            </p>
            <p className="text-ink/80 leading-relaxed mb-4">
              Our property matching workflow uses your criteria to identify replacement properties
              across all 50 states. We provide property details, financial information, and lease
              terms for your review. We coordinate with third party Qualified Intermediaries and
              lenders to ensure smooth transaction execution.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4 mt-8">
              Important Disclosures
            </h2>
            <p className="text-ink/80 leading-relaxed mb-4">
              This site helps investors identify potential replacement properties for Section 1031
              exchanges. We are not a Qualified Intermediary, law firm, broker, or CPA.
            </p>
            <p className="text-ink/80 leading-relaxed mb-4">
              We can help you get in touch with tax professionals and Qualified Intermediaries, but
              we are not a Qualified Intermediary ourselves. Users should consult a Qualified
              Intermediary and tax advisor before acting on any 1031 exchange transaction.
            </p>
            <p className="text-ink/80 leading-relaxed mb-4">
              All property information is provided for identification purposes only. We do not
              provide legal or tax advice. You should work with qualified professionals for all
              legal, tax, and exchange coordination matters.
            </p>

            <h2 className="text-2xl font-semibold text-heading mb-4 mt-8">
              Who We Serve
            </h2>
            <p className="text-ink/80 leading-relaxed mb-4">
              We work with unrepresented 1031 exchange buyers who need trusted guidance and speed.
              This includes landowners or business sellers with new liquidity who want stable brands
              like convenience stores, quick service restaurants, pharmacies, and essential retail.
            </p>
            <p className="text-ink/80 leading-relaxed mb-4">
              Our goal is simple. Bring motivated exchange buyers to the right inventory, educate
              them on why single tenant triple net works for hands off ownership, and help them
              connect with the resources needed to complete their transactions quickly and
              professionally.
            </p>
          </div>

          <div className="bg-panel border border-outline rounded-lg p-8 text-center mt-12">
            <h2 className="text-2xl font-semibold text-heading mb-4">
              Ready to find your replacement property?
            </h2>
            <p className="text-ink/80 mb-6">
              Contact us to discuss your 1031 exchange property identification needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primaryfg rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

