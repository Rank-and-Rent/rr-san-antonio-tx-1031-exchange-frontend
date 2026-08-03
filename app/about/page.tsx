import Link from "next/link";
import site from "@/content/site.json";
import SafeImage from "@/components/SafeImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "About Our Turnkey 1031 Exchange Solutions | San Antonio",
  description: "Learn how San Antonio property owners can get free 1031 exchange guidance, replacement-property help, and introductions to the appropriate independent professionals.",
};

const reasons = [
  "A planned investment-property sale",
  "A property already under contract",
  "An inherited rental or commercial asset",
  "A desire to leave active property management",
  "A need to find primary and backup replacement properties",
  "Questions about direct real estate, net lease, or DST interests",
];

const support = [
  {
    title: "Begin with the sale objective",
    copy: "Clarify why the current property no longer fits, expected equity and debt, income goals, preferred workload, timing, and the professionals already involved.",
  },
  {
    title: "Protect the exchange before closing",
    copy: "Help the owner understand when an independent qualified intermediary must be engaged and which sale and closing facts need immediate attention.",
  },
  {
    title: "Build a practical replacement search",
    copy: "Compare direct property, net-lease real estate, and DST interests using the same criteria for income, control, risk, management, financing, and ability to close.",
  },
  {
    title: "Keep professional handoffs visible",
    copy: "Organize open questions for the qualified intermediary, CPA, attorney, brokers, lenders, inspectors, and licensed securities professionals required by the transaction.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[52vh] min-h-[430px] overflow-hidden">
        <SafeImage src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg" alt="San Antonio skyline" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-6 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#c9a96e]">{site.company}</p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-tight text-white md:text-7xl">A Complete Place to Start Your 1031 Exchange</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </div>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#a77c40]">Turnkey 1031 Exchange Solutions</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight text-[#1a1a1a] md:text-5xl">Call with the entire property sale and the outcome you want next.</h2>
            <p className="mt-7 font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-[#1a1a1a]/65">
              San Antonio property owners can begin here whether the sale is still an idea, the property is already listed, a contract has been signed, or the replacement search is becoming urgent.
            </p>
            <p className="mt-5 leading-8 text-[#1a1a1a]/62">
              We help bring the sale facts, exchange timing, replacement criteria, direct and passive property options, and necessary professional introductions into one organized review. The goal is to make the next decision clearer and keep important questions from disappearing between separate providers.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${site.phoneDigits}`} className="inline-flex min-h-12 items-center justify-center bg-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white">Call {site.phone}</a>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center border border-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">Start My Exchange</Link>
            </div>
          </div>
          <div className="bg-[#f6f3ed] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c7135]">Owners contact us about</p>
            <div className="mt-6 grid gap-5">
              {reasons.map((reason) => (
                <p key={reason} className="flex gap-4 border-b border-[#ded8cd] pb-5 font-[family-name:var(--font-cormorant)] text-xl text-[#1a1a1a]/75 last:border-0 last:pb-0">
                  <span className="mt-3 h-px w-7 shrink-0 bg-[#c9a96e]" />
                  {reason}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a96e]">How We Help</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight md:text-5xl">From the planned sale through replacement closing</h2>
          </div>
          <div className="mt-12 grid gap-px bg-white/12 md:grid-cols-2">
            {support.map((item) => (
              <article key={item.title} className="bg-[#1a1a1a] p-8 md:p-10">
                <span className="mb-6 block h-px w-10 bg-[#c9a96e]" />
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/58">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ed] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              ["Direct Real Estate", "Control the property, financing, leasing, business plan, management, and future disposition."],
              ["Net-Lease Property", "Own real estate while the lease assigns specified operating responsibilities to the tenant."],
              ["DST Interest", "Consider professionally managed institutional real estate without day-to-day landlord responsibilities."],
            ].map(([title, copy]) => (
              <article key={title} className="border-t-2 border-[#c9a96e] bg-white p-8">
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1a1a1a]">{title}</h2>
                <p className="mt-4 leading-7 text-[#1a1a1a]/60">{copy}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-4xl text-center text-sm leading-7 text-[#1a1a1a]/48">
            Educational guidance only. Tax and legal conclusions belong to the property owner&apos;s CPA and counsel. Qualified-intermediary, brokerage, lending, and securities work must be performed by the appropriate independent professionals. DST interests involve offering-specific risks, fees, leverage, illiquidity, eligibility, and suitability review.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 text-center text-white">
        <SafeImage src="/san-antonio-tx-1031-exchange-cityscape.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a96e]">Free Exchange Guidance</p>
          <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light md:text-5xl">Talk through the San Antonio property sale.</h2>
          <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-white/65">Start the exchange, ask what needs to happen next, or request current direct, net-lease, and DST property information.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`tel:${site.phoneDigits}`} className="inline-flex min-h-12 items-center justify-center bg-[#c9a96e] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">Call {site.phone}</a>
            <Link href="/contact?request=properties" className="inline-flex min-h-12 items-center justify-center border border-white px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white">Get a Free Property List</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
