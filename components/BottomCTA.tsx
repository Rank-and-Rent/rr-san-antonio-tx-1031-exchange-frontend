import Link from "next/link";
import site from "@/content/site.json";

export default function BottomCTA() {
  return (
    <section className="bg-[#1a1a1a]">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <h2 className="text-white text-2xl md:text-3xl tracking-[0.2em] text-center md:text-left">
          READY TO START?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`tel:${site.phoneDigits}`}
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1a1a1a] text-xs tracking-[0.25em] uppercase hover:bg-white/90 transition-colors"
          >
            Call Now
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all"
          >
            Get A Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
