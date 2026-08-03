"use client";

import Link from "next/link";
import { Suspense } from "react";
import site from "@/content/site.json";
import { locationsData, servicesData } from "@/data";
import ContactForm from "@/app/contact/contact-form";
import SafeImage from "@/components/SafeImage";

const phoneHref = `tel:${site.phoneDigits}`;

const featuredLocationImages: Record<string, string> = {
  "san-antonio": "/locations/1031-exchange-san-antonio-tx.webp",
  "alamo-heights": "/locations/1031-exchange-alamo-heights-tx.jpg",
  "stone-oak": "/locations/1031-exchange-stone-oak-tx.jpeg",
  "downtown-san-antonio": "/locations/1031-exchange-downtown-san-antonio-tx.avif",
  "new-braunfels": "/locations/1031-exchange-new-braunfels-tx.jpg",
  boerne: "/locations/1031-exchange-boerne-tx.jpeg",
};

const saleReasons = [
  {
    title: "Leave active property management",
    copy: "Move beyond tenant calls, leasing, repairs, capital projects, and the daily demands of operating another property.",
    href: "/services/passive-real-estate-income",
  },
  {
    title: "Sell an inherited investment property",
    copy: "Bring ownership, basis, qualifying use, co-owner priorities, and sale timing into focus before the transaction narrows the available choices.",
    href: "/services/inherited-property-capital-gains",
  },
  {
    title: "Act while already under contract",
    copy: "Protect the exchange before closing, engage the appropriate independent qualified intermediary, and organize a realistic replacement search.",
    href: "/services/the-qualified-intermediary-role",
  },
  {
    title: "Reposition appreciated equity",
    copy: "Compare income, debt, control, workload, diversification, and risk before listings begin to compete for attention.",
    href: "/services/capital-gains-on-investment-property",
  },
  {
    title: "Find the right replacement property",
    copy: "Build a primary and backup search around the actual exchange equity, financing, diligence requirements, and probability of closing.",
    href: "/services/replacement-property-search",
  },
  {
    title: "Buy before the current property sells",
    copy: "Explore reverse-exchange, financing, title, and timing questions when the preferred replacement opportunity appears first.",
    href: "/services/reverse-1031-exchange-explained",
  },
];

const solutionItems = [
  "Planned property sale review",
  "Independent qualified-intermediary introduction",
  "Exchange calendar and deadline planning",
  "Direct and passive replacement-property search",
  "Financing and replacement-debt questions",
  "Professional handoffs through replacement closing",
];

const replacementPaths = [
  {
    eyebrow: "Maximum control",
    title: "Direct Real Estate",
    copy: "Own and operate a replacement property directly, arrange financing, choose the business plan, and control leasing and future disposition decisions.",
    review: "Review title, leases, physical condition, market, operations, financing, management demands, and closing feasibility.",
    image: "/inventory/industrial-flex-1031-exchange.jpg",
    href: "/services/property-identification",
  },
  {
    eyebrow: "Property ownership with a tenant",
    title: "Net-Lease Property",
    copy: "Own commercial real estate while the lease assigns specified operating responsibilities to the tenant, potentially reducing daily owner involvement.",
    review: "Review the tenant and guaranty, lease structure, property condition, residual value, financing, and future reletting market.",
    image: "/inventory/nnn-1031-exchange.jpg",
    href: "/services/what-is-an-nnn-lease",
  },
  {
    eyebrow: "Professionally managed",
    title: "DST Interest",
    copy: "Own a fractional interest in institutional-grade real estate without personally handling tenants, leasing, maintenance, or renovations.",
    review: "Review offering documents, sponsor, fees, leverage, conflicts, property risk, illiquidity, eligibility, and suitability with a licensed professional.",
    image: "/inventory/grocery-anchored-1031-exchange.jpg",
    href: "/services/delaware-statutory-trust",
  },
];

const exchangePath = [
  {
    title: "Plan before the San Antonio sale",
    copy: "Clarify why the property is being sold, expected equity, debt, income needs, management preferences, and the professionals already involved.",
  },
  {
    title: "Protect the exchange at closing",
    copy: "Engage an independent qualified intermediary before closing and confirm the relinquished-property proceeds will not reach the seller.",
  },
  {
    title: "Compare primary and backup properties",
    copy: "Evaluate every candidate against the same criteria for income, risk, control, workload, financing, diligence, and ability to close.",
  },
  {
    title: "Complete diligence and replacement closing",
    copy: "Keep title, inspections, financing, insurance, advisor questions, entity documents, and closing instructions moving together.",
  },
];

const featuredServiceSlugs = [
  "property-identification",
  "forward-exchange",
  "the-qualified-intermediary-role",
  "delaware-statutory-trust",
  "inherited-property-capital-gains",
  "reverse-1031-exchange-explained",
];

export default function HomePageContent() {
  const featuredLocations = [
    "san-antonio",
    "alamo-heights",
    "stone-oak",
    "downtown-san-antonio",
    "new-braunfels",
    "boerne",
  ]
    .map((slug) => locationsData.find((location) => location.slug === slug))
    .filter((location): location is NonNullable<typeof location> => Boolean(location));

  const featuredServices = featuredServiceSlugs
    .map((slug) => servicesData.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <main className="min-h-screen bg-white">
      <section className="relative min-h-[calc(100vh-73px)] overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/wemby city.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-14 md:py-16">
          <div className="max-w-5xl text-left">
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/75">
              Selling Investment Property in San Antonio?
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light uppercase leading-[0.98] tracking-[0.035em] text-white md:text-6xl lg:text-[4rem]">
              Turnkey 1031 Exchange Solutions in San Antonio, Texas
            </h1>
            <p className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-white/82 md:text-2xl">
              Get free guidance from the planned sale through replacement closing. Compare direct real estate, net-lease properties, and passive DST opportunities—including professionally managed properties without day-to-day landlord responsibilities.
            </p>
            <div className="mt-5 grid max-w-3xl gap-x-10 gap-y-3 text-sm text-white/78 sm:grid-cols-2">
              {["Free exchange guidance", "Direct, net-lease, and DST options", "Free replacement-property list", "Help through replacement closing"].map((item) => (
                <span key={item} className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#c9a96e]" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center bg-[#c9a96e] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a] transition hover:bg-white">
                Call {site.phone}
              </a>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center border border-white bg-white/5 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#1a1a1a]">
                Start My Exchange
              </Link>
              <Link href="/contact?request=properties" className="inline-flex min-h-12 items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white underline decoration-white/60 underline-offset-8 transition hover:decoration-white">
                Get a Free Property List
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e8e4dc] bg-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-4">
          {[
            ["Free Guidance", "Start with a planned sale or an urgent contract."],
            ["One Place to Begin", "Bring the sale, timing, property search, and professional handoffs together."],
            ["More Than One Path", "Compare direct real estate, net-lease property, and DST interests."],
            ["Nationwide Options", "Search beyond San Antonio when the exchange objective calls for it."],
          ].map(([title, copy]) => (
            <div key={title} className="border-b border-[#e8e4dc] px-7 py-9 md:border-b-0 md:border-r last:md:border-r-0">
              <h2 className="text-xs font-semibold uppercase tracking-[0.17em] text-[#1a1a1a]">{title}</h2>
              <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg italic leading-relaxed text-[#1a1a1a]/60">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid bg-[#f6f3ed] lg:grid-cols-2">
        <div className="relative min-h-[380px] lg:min-h-[650px]">
          <SafeImage src="/san-antonio-tx-1031-exchange-riverwalk-skyline.jpg" alt="San Antonio skyline and River Walk" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div className="flex items-center px-7 py-16 md:px-14 lg:px-20 lg:py-24">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#a77c40]">One Sale. A Complete Solution.</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight text-[#1a1a1a] md:text-5xl">
              The exchange should begin with what you want the property—and your life—to look like next.
            </h2>
            <p className="mt-7 font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-[#1a1a1a]/68">
              A San Antonio owner may be selling apartments, land, industrial property, retail, or a long-held rental because management has become a burden, the asset was inherited, a loan is maturing, or concentrated equity needs a new direction.
            </p>
            <p className="mt-5 leading-8 text-[#1a1a1a]/62">
              We help turn that reason, the expected equity, debt, income needs, management preferences, and timing into one practical exchange plan. The appropriate independent qualified intermediary, CPA, attorney, lender, broker, or licensed securities professional remains responsible for regulated work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center bg-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#c9a96e] hover:text-[#1a1a1a]">
                Talk to a 1031 Expert
              </a>
              <Link href="/about" className="inline-flex min-h-12 items-center justify-center border border-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a] transition hover:bg-[#1a1a1a] hover:text-white">
                See How We Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#a77c40]">Start With the Real Reason</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight text-[#1a1a1a] md:text-5xl">
              What does selling the San Antonio property need to solve?
            </h2>
            <p className="mt-5 font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-[#1a1a1a]/60">
              The replacement search should begin with the problem the current property no longer solves—not a generic list of properties.
            </p>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {saleReasons.map((reason) => (
              <Link key={reason.title} href={reason.href} className="group border-t-2 border-[#c9a96e] pt-6 text-[#1a1a1a] no-underline">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium transition group-hover:text-[#9c7135]">{reason.title}</h3>
                <p className="mt-3 leading-7 text-[#1a1a1a]/58">{reason.copy}</p>
                <span className="mt-5 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a642f]">Explore this situation</span>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center bg-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white">Call {site.phone}</a>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center border border-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">Discuss the Planned Sale</Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1a1a1a] px-6 py-20 text-white md:py-28">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/5" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a96e]">Turnkey 1031 Exchange Solutions</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight md:text-5xl">
              One place to start, even when several professionals are required.
            </h2>
            <p className="mt-6 font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-white/65">
              Call with a question, a planned listing, an inherited property, or a closing date already on the calendar. We help organize what needs attention and connect the transaction to the right independent resources.
            </p>
            <a href={phoneHref} className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#c9a96e] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a] transition hover:bg-white">
              Call Now: {site.phone}
            </a>
          </div>
          <div className="grid gap-px bg-white/12 sm:grid-cols-2">
            {solutionItems.map((item) => (
              <div key={item} className="bg-[#1a1a1a] px-7 py-8">
                <span className="mb-5 block h-px w-10 bg-[#c9a96e]" />
                <p className="font-[family-name:var(--font-cormorant)] text-xl leading-snug text-white/85">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ed] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#a77c40]">Choose the Ownership Experience</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight text-[#1a1a1a] md:text-5xl">
              Compare direct property, net lease, and DST interests against the same sale objective.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {replacementPaths.map((path) => (
              <article key={path.title} className="overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
                <div className="relative h-64">
                  <SafeImage src={path.image} alt={`${path.title} replacement property option`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-black/15" />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9c7135]">{path.eyebrow}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl font-light text-[#1a1a1a]">{path.title}</h3>
                  <p className="mt-4 leading-7 text-[#1a1a1a]/60">{path.copy}</p>
                  <div className="mt-6 border-t border-[#e5e1d9] pt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/45">What to review</p>
                    <p className="mt-3 text-sm leading-7 text-[#1a1a1a]/58">{path.review}</p>
                  </div>
                  <Link href={path.href} className="mt-6 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a642f]">Learn about this path</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact?request=properties" className="inline-flex min-h-12 items-center justify-center bg-[#c9a96e] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">Get a Free Property List</Link>
            <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center border border-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">Talk Through the Options</a>
          </div>
        </div>
      </section>

      <section className="grid overflow-hidden bg-[#111] text-white lg:grid-cols-2">
        <div className="flex items-center px-7 py-20 md:px-14 lg:px-[max(3.5rem,calc((100vw-80rem)/2))] lg:py-28 lg:pr-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a96e]">Passive Replacement Opportunities</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight md:text-5xl">Move beyond tenants, toilets, and trash.</h2>
            <p className="mt-6 font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-white/68">
              A DST may provide access to professionally managed, institutional-grade real estate without personally handling tenants, maintenance, leasing, renovations, or emergency calls. Some offerings may accept investments beginning around $100,000.
            </p>
            <p className="mt-5 text-sm leading-7 text-white/45">
              Availability, projected income, sponsor and property risk, fees, leverage, transfer restrictions, illiquidity, investor eligibility, and suitability vary by offering and require review through an appropriately licensed professional.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?request=properties" className="inline-flex min-h-12 items-center justify-center bg-[#c9a96e] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">See Available DST Properties</Link>
              <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center border border-white px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white">Free Consultation</a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[500px] lg:min-h-[720px]">
          <SafeImage src="/san-antonio-tx-1031-exchange-twilight-skyline.jpg" alt="San Antonio investment property skyline" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111]/55 to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 bg-black/75 p-7 backdrop-blur-sm md:bottom-12 md:left-12 md:right-12 md:p-9">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl">A different ownership experience</p>
            <div className="mt-5 grid gap-3 text-sm text-white/68">
              <span>No daily property management</span>
              <span>Access to institutional-grade assets</span>
              <span>Income-focused possibilities with offering-specific risks</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#a77c40]">From Planned Sale to Replacement Closing</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight text-[#1a1a1a] md:text-5xl">How the exchange moves forward</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {exchangePath.map((step) => (
              <article key={step.title} className="border border-[#e3dfd7] bg-[#faf8f4] p-7 md:p-9">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1a1a1a]">{step.title}</h3>
                <p className="mt-3 leading-7 text-[#1a1a1a]/58">{step.copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 bg-[#1a1a1a] px-7 py-12 text-center text-white md:px-12">
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-light md:text-4xl">Is this your first 1031 exchange?</h3>
            <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-white/62">
              Call now for free guidance through the sale, qualified-intermediary handoff, replacement search, diligence, and closing.
            </p>
            <a href={phoneHref} className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#c9a96e] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">Call a 1031 Expert: {site.phone}</a>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ed] px-4 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 px-2 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-[#a77c40]">Local Sale. Nationwide Replacement Search.</p>
              <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight text-[#1a1a1a] md:text-5xl">San Antonio-area exchange assistance</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/locations" className="inline-flex min-h-12 items-center justify-center border border-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]">View All Areas</Link>
              <Link href="/contact?request=properties" className="inline-flex min-h-12 items-center justify-center bg-[#1a1a1a] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white">Free Property List</Link>
            </div>
          </div>
          <div className="grid gap-px bg-white md:grid-cols-2 lg:grid-cols-3">
            {featuredLocations.map((location) => (
              <Link key={location.slug} href={location.route} className="group relative h-[280px] overflow-hidden md:h-[330px]">
                <SafeImage src={featuredLocationImages[location.slug]} alt={`1031 exchange solutions in ${location.name}`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/25" />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <h3 className="text-lg font-light uppercase tracking-[0.18em] text-white md:text-xl">{location.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#a77c40]">Continue With the Issue That Matters</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light leading-tight text-[#1a1a1a] md:text-5xl">San Antonio 1031 exchange resources</h2>
          </div>
          <div className="mt-12 grid gap-px bg-[#e5e1d9] md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={service.route} className="group bg-white p-8 text-[#1a1a1a] transition hover:bg-[#f6f3ed]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9c7135]">{service.category}</p>
                <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-2xl font-medium leading-tight">{service.name}</h3>
                <p className="mt-3 leading-7 text-[#1a1a1a]/56">{service.short}</p>
                <span className="mt-5 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a642f]">Read the guide</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1a1a1a] px-6 py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-15">
          <SafeImage src="/san-antonio-tx-1031-exchange-cityscape.jpg" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-11 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a96e]">Free Exchange Guidance</p>
            <h2 className="mt-5 font-[family-name:var(--font-cormorant)] text-4xl font-light md:text-5xl">Tell us what is happening with the San Antonio property.</h2>
            <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-white/65">
              Ask a question, start the exchange, or request current direct, net-lease, and DST property information. The form stays intentionally short.
            </p>
            <a href={phoneHref} className="mt-7 inline-flex min-h-12 items-center justify-center border border-[#c9a96e] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#c9a96e] transition hover:bg-[#c9a96e] hover:text-[#1a1a1a]">Call Now: {site.phone}</a>
          </div>
          <Suspense fallback={<div className="border border-white/25 bg-black/40 p-8 text-center text-white/60">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
