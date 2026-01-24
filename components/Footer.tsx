import Link from "next/link";
import site from "@/content/site.json";
import { servicesData, locationsData } from "@/data";

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Footer() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

  return (
    <footer className="border-t border-outline/30 bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div>
            <h3 className="text-lg tracking-[0.1em] text-heading mb-6">
              {site.company.toUpperCase()}
            </h3>
            <p className="text-ink/70 text-sm mb-3">{site.address}</p>
            <p className="text-ink/70 text-sm mb-3">
              <a href={`tel:${site.phoneDigits}`} className="hover:text-ink transition-colors">
                {site.phone}
              </a>
            </p>
            <p className="text-ink/70 text-sm mb-3">
              <a href={`mailto:${site.email}`} className="hover:text-ink transition-colors whitespace-nowrap">
                {site.email}
              </a>
            </p>
            <p className="text-ink/60 text-xs tracking-[0.1em] uppercase">24/7 Hours</p>
          </div>
          
          <div>
            <h3 className="text-sm tracking-[0.15em] text-heading mb-6 uppercase">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  All Services
                </Link>
              </li>
              {servicesData.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link href={service.route} className="text-ink/70 text-sm hover:text-ink transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm tracking-[0.15em] text-heading mb-6 uppercase">Locations</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/locations" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  All Locations
                </Link>
              </li>
              {locationsData.slice(0, 5).map((location) => (
                <li key={location.slug}>
                  <Link href={location.route} className="text-ink/70 text-sm hover:text-ink transition-colors">
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm tracking-[0.15em] text-heading mb-6 uppercase">Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  All Tools
                </Link>
              </li>
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-ink/70 text-sm hover:text-ink transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm tracking-[0.15em] text-heading mb-6 uppercase">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-ink/70 text-sm hover:text-ink transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-outline/30 pt-10 mb-10">
          <div className="w-full h-64 overflow-hidden border border-outline/30">
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
        
        <div className="border-t border-outline/30 pt-10">
          <div className="text-ink/60 text-sm space-y-4 mb-8">
            <p className="italic">
              <strong className="not-italic text-ink/80">Disclosures:</strong> This site helps investors identify potential replacement properties for Section 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
            </p>
          </div>
          <div className="text-center text-ink/50 text-xs tracking-[0.1em] uppercase">
            <p>&copy; {new Date().getFullYear()} {site.company}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
