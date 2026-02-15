"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import site from "@/content/site.json";
import { propertyTypesData } from "@/data";

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

const mobileLinks = [
  { label: "Properties", href: "/property-types" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const propertyTypePreview = propertyTypesData.slice(0, 6);

  return (
    <header className="sticky top-0 z-50">
      {/* Main Navigation - White Background like C&H */}
      <nav className="bg-white border-b border-[#e5e5e5]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo - C&H Style Monogram */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            {/* Monogram */}
            <div className="flex items-baseline font-[family-name:var(--font-cormorant)]">
              <span className="text-[#1a1a1a] text-3xl md:text-4xl font-light tracking-tight">1031</span>
            </div>
            {/* Logo Text */}
            <div className="flex flex-col border-l border-[#d4d4d4] pl-3">
              <span className="text-[#1a1a1a] text-[9px] tracking-[0.25em] font-medium leading-tight uppercase">
                Exchange
              </span>
              <span className="text-[#1a1a1a]/60 text-[8px] tracking-[0.2em] leading-tight uppercase">
                San Antonio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <Link
              href="/property-types"
              className="text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
            >
              Properties
            </Link>
            <Link
              href="/services"
              className="text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
            >
              Services
            </Link>
            <Link
              href="/locations"
              className="text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
            >
              Service Areas
            </Link>
            <Link
              href="/contact"
              className="text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${site.phoneDigits}`}
              className="text-xs tracking-[0.15em] text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors font-medium whitespace-nowrap"
            >
              {site.phone}
            </a>
          </div>

          {/* Hamburger Menu Button - mobile only */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="block w-6 h-[1.5px] bg-[#1a1a1a]"></span>
            <span className="block w-6 h-[1.5px] bg-[#1a1a1a]"></span>
            <span className="block w-6 h-[1.5px] bg-[#1a1a1a]"></span>
          </button>
        </div>
      </nav>

      {/* Mobile/Full Menu - Slide-in Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative z-[70] ml-auto w-full max-w-sm bg-white border-l border-[#e5e5e5] p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-10">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-baseline font-[family-name:var(--font-cormorant)]">
                  <span className="text-[#1a1a1a] text-2xl font-light tracking-tight">1031</span>
                </div>
                <div className="flex flex-col border-l border-[#d4d4d4] pl-3">
                  <span className="text-[#1a1a1a] text-[8px] tracking-[0.25em] font-medium leading-tight uppercase">
                    Exchange
                  </span>
                  <span className="text-[#1a1a1a]/60 text-[7px] tracking-[0.2em] leading-tight uppercase">
                    San Antonio
                  </span>
                </div>
              </Link>
              <button
                className="text-[#1a1a1a] text-2xl leading-none hover:opacity-60 transition-opacity"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="space-y-6">
              {mobileLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="block text-sm uppercase tracking-[0.2em] text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-[#e5e5e5] space-y-4">
              <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/50 uppercase font-medium">
                Property Types
              </p>
              {propertyTypePreview.map((propertyType) => (
                <Link
                  key={`mobile-${propertyType.slug}`}
                  href={propertyType.route}
                  className="block text-sm text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {propertyType.name}
                </Link>
              ))}
              <Link
                href="/property-types"
                className="block text-xs uppercase tracking-[0.2em] text-[#1a1a1a] font-medium mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Browse All Types
              </Link>
            </div>
            <div className="mt-10 pt-8 border-t border-[#e5e5e5] space-y-4">
              <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/50 uppercase font-medium">
                Tools
              </p>
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block text-sm text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-[#e5e5e5]">
              <a
                href={`tel:${site.phoneDigits}`}
                className="block text-sm font-medium tracking-[0.15em] text-[#1a1a1a]/80 hover:text-[#1a1a1a] mb-2"
              >
                {site.phone}
              </a>
              <p className="text-xs tracking-[0.1em] text-[#1a1a1a]/50">
                {site.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
