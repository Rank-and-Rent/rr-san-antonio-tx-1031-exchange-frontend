import Link from "next/link";
import site from "@/content/site.json";

export default function BottomCTA() {
  return (
    <section className="border-t border-outline/30 bg-secondary">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <h2 className="text-heading text-2xl md:text-3xl tracking-[0.15em] text-center md:text-left">
          READY TO START?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`tel:${site.phoneDigits}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-ink text-white text-xs tracking-[0.25em] uppercase hover:bg-ink/90 transition-colors"
          >
            Call Now
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-ink text-ink text-xs tracking-[0.25em] uppercase hover:bg-ink hover:text-white transition-all"
          >
            Get A Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
