import Link from "next/link";
import site from "@/content/site.json";
import { ContactFormWrapper } from "./contact-form";

export const metadata = {
  title: "Free 1031 Exchange Guidance | San Antonio",
  description: "Call a San Antonio 1031 exchange expert or submit the short form for free exchange guidance and current replacement-property information.",
};

export default function ContactPage() {
  return (
    <main className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="subheading mb-4 block">Free Exchange Guidance</span>
          <h1 className="heading-display text-white">Talk Through Your San Antonio Property Sale</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Share the planned sale, ask what needs to happen next, or request a free list of direct, net-lease, and DST property options. The form stays intentionally short.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`tel:${site.phoneDigits}`} className="inline-flex min-h-12 items-center justify-center bg-brand-copper px-7 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white">
              Call {site.phone}
            </a>
            <Link href="/contact?request=properties#contact-form" className="inline-flex min-h-12 items-center justify-center border border-white/70 px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black">
              Request a Property List
            </Link>
          </div>
        </div>
        <ContactFormWrapper />
      </div>
    </main>
  );
}
