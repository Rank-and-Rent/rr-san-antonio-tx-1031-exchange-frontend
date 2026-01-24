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
    <footer className="bg-[#1a1a1a]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-8 bg-white"></div>
                <div className="w-[3px] h-8 bg-white"></div>
                <div className="w-[3px] h-8 bg-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xs tracking-[0.3em] font-medium leading-tight">
                  1031 EXCHANGE
                </span>
                <span className="text-white/70 text-[10px] tracking-[0.25em] leading-tight">
                  SAN ANTONIO
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-3">{site.address}</p>
            <p className="text-white/60 text-sm mb-3">
              <a href={`tel:${site.phoneDigits}`} className="hover:text-white transition-colors">
                {site.phone}
              </a>
            </p>
            <p className="text-white/60 text-sm mb-3">
              <a href={`mailto:${site.email}`} className="hover:text-white transition-colors whitespace-nowrap">
                {site.email}
              </a>
            </p>
            <p className="text-white/40 text-xs tracking-[0.1em] uppercase">24/7 Hours</p>
          </div>
          
          <div>
            <h3 className="text-xs tracking-[0.2em] text-white mb-6 uppercase">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-white/60 text-sm hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              {servicesData.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link href={service.route} className="text-white/60 text-sm hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] text-white mb-6 uppercase">Locations</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/locations" className="text-white/60 text-sm hover:text-white transition-colors">
                  All Locations
                </Link>
              </li>
              {locationsData.slice(0, 5).map((location) => (
                <li key={location.slug}>
                  <Link href={location.route} className="text-white/60 text-sm hover:text-white transition-colors">
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs tracking-[0.2em] text-white mb-6 uppercase">Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-white/60 text-sm hover:text-white transition-colors">
                  All Tools
                </Link>
              </li>
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-white/60 text-sm hover:text-white transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs tracking-[0.2em] text-white mb-6 uppercase">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-white/60 text-sm hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/60 text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 text-sm hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-white/60 text-sm hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 mb-10">
          <div className="w-full h-64 overflow-hidden">
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
        
        <div className="border-t border-white/10 pt-10">
          <div className="text-white/40 text-sm space-y-4 mb-8">
            <p className="italic">
              <strong className="not-italic text-white/60">Disclosures:</strong> This site helps investors identify potential replacement properties for Section 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
            </p>
          </div>
          <div className="text-center text-white/30 text-xs tracking-[0.1em] uppercase">
            <p>&copy; {new Date().getFullYear()} {site.company}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
