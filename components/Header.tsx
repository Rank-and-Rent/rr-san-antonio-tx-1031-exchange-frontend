"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import site from "@/content/site.json";
import { servicesData, locationsData, propertyTypesData } from "@/data";

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

const quickLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const mobileLinks = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Tools", href: "/tools" },
  { label: "Property Types", href: "/property-types" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [propertyTypesOpen, setPropertyTypesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const propertyTypesRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const propertyTypesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper functions for delayed closing to allow smooth hover transitions
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const handleLocationsEnter = () => {
    if (locationsTimeoutRef.current) {
      clearTimeout(locationsTimeoutRef.current);
      locationsTimeoutRef.current = null;
    }
    setLocationsOpen(true);
  };

  const handleLocationsLeave = () => {
    locationsTimeoutRef.current = setTimeout(() => {
      setLocationsOpen(false);
    }, 150);
  };

  const handleToolsEnter = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
      toolsTimeoutRef.current = null;
    }
    setToolsOpen(true);
  };

  const handleToolsLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 150);
  };

  const handlePropertyTypesEnter = () => {
    if (propertyTypesTimeoutRef.current) {
      clearTimeout(propertyTypesTimeoutRef.current);
      propertyTypesTimeoutRef.current = null;
    }
    setPropertyTypesOpen(true);
  };

  const handlePropertyTypesLeave = () => {
    propertyTypesTimeoutRef.current = setTimeout(() => {
      setPropertyTypesOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setToolsOpen(false);
        setPropertyTypesOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
      if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
      if (propertyTypesTimeoutRef.current) clearTimeout(propertyTypesTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setServicesOpen(false);
      }
      if (locationsRef.current && !locationsRef.current.contains(target)) {
        setLocationsOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setToolsOpen(false);
      }
      if (propertyTypesRef.current && !propertyTypesRef.current.contains(target)) {
        setPropertyTypesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const servicesByCategory = servicesData.reduce((acc, service) => {
    const category = service.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<string, typeof servicesData>);

  const locationsByType = locationsData.reduce((acc, location) => {
    const type = location.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(location);
    return acc;
  }, {} as Record<string, typeof locationsData>);

  const propertyTypePreview = propertyTypesData.slice(0, 6);

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      <div className="bg-[#0b0a08] border-b border-[#2d2720]">
        <div className="container mx-auto px-6 py-2.5 flex items-center justify-between">
          <p className="text-[0.625rem] uppercase tracking-[0.5em] text-ink/50 font-medium">
            1031 Exchange San Antonio
          </p>
          <div className="flex items-center gap-8">
            <a 
              href={`tel:${site.phoneDigits}`} 
              className="text-[0.625rem] uppercase tracking-[0.45em] text-ink/70 hover:text-primary transition-colors font-semibold"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="text-[0.625rem] text-primary tracking-[0.45em] uppercase hover:text-primary/80 transition-colors font-semibold"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-panel/95 border-b border-outline/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <Link
            href="/"
            className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity"
            aria-label="Home"
          >
            <Image
              src="/1031-exchange-san-antonio-tx-logo.png"
              alt={site.company}
              width={180}
              height={54}
              className="h-11 w-auto"
              priority
              quality={95}
            />
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-between gap-8">
            <div className="flex items-center gap-7">
              <div
                ref={servicesRef}
                className="relative group"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-ink/75 hover:text-ink transition-colors flex items-center gap-1.5"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onFocus={() => setServicesOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setServicesOpen(!servicesOpen);
                    }
                  }}
                >
                  Services
                  <span className="text-[0.5rem] text-primary/70" aria-hidden="true">
                    {servicesOpen ? "▲" : "▼"}
                  </span>
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-4 w-[28rem] rounded-2xl border border-[#4f453b] bg-gradient-to-br from-[#120f0c] via-[#1f1a16] to-[#181412] p-6 shadow-[0_25px_65px_rgba(0,0,0,0.55)]"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {Object.entries(servicesByCategory).map(([category, services]) => (
                        <div key={category}>
                          <h3 className="text-xs text-ink/70 tracking-[0.5em] uppercase mb-3">
                            {category}
                          </h3>
                          <ul className="space-y-2 text-sm text-ink/90">
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={service.route}
                                  className="block hover:text-primary"
                                  onFocus={() => setServicesOpen(true)}
                                  onMouseEnter={handleServicesEnter}
                                >
                                  {service.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-[#3d332b] pt-4 text-xs uppercase tracking-[0.6em] text-ink/60">
                      <span>Expert Guidance</span>
                      <Link
                        href="/services"
                        className="text-primary font-semibold tracking-[0.4em]"
                        onMouseEnter={handleServicesEnter}
                      >
                        Explore All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                ref={locationsRef}
                className="relative group"
                onMouseEnter={handleLocationsEnter}
                onMouseLeave={handleLocationsLeave}
              >
                <button
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-ink/75 hover:text-ink transition-colors flex items-center gap-1.5"
                  aria-expanded={locationsOpen}
                  aria-haspopup="true"
                  onFocus={() => setLocationsOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLocationsOpen(!locationsOpen);
                    }
                  }}
                >
                  Locations
                  <span className="text-[0.5rem] text-primary/70" aria-hidden="true">
                    {locationsOpen ? "▲" : "▼"}
                  </span>
                </button>
                {locationsOpen && (
                  <div
                    className="absolute top-full left-0 mt-4 w-[26rem] rounded-2xl border border-[#4f453b] bg-gradient-to-br from-[#120f0c] via-[#1f1a16] to-[#181412] p-6 shadow-[0_25px_65px_rgba(0,0,0,0.55)] max-h-[26rem] overflow-y-auto"
                    onMouseEnter={handleLocationsEnter}
                    onMouseLeave={handleLocationsLeave}
                  >
                    <div className="space-y-5">
                      {Object.entries(locationsByType).map(([type, locations]) => (
                        <div key={type}>
                          <h3 className="text-xs text-ink/70 tracking-[0.5em] uppercase mb-2 capitalize">
                            {type.replace("-", " ")}
                          </h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {locations.slice(0, 6).map((location) => (
                              <Link
                                key={location.slug}
                                href={location.route}
                                className="text-ink/90 hover:text-primary text-sm"
                                onFocus={() => setLocationsOpen(true)}
                                onMouseEnter={handleLocationsEnter}
                              >
                                {location.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-[#3d332b] pt-4 text-xs uppercase tracking-[0.6em] text-ink/60">
                      <span>Nationwide Scope</span>
                      <Link
                        href="/locations"
                        className="text-primary font-semibold tracking-[0.4em]"
                        onMouseEnter={handleLocationsEnter}
                      >
                        All Markets →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                ref={toolsRef}
                className="relative group"
                onMouseEnter={handleToolsEnter}
                onMouseLeave={handleToolsLeave}
              >
                <button
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-ink/75 hover:text-ink transition-colors flex items-center gap-1.5"
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                  onFocus={() => setToolsOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setToolsOpen(!toolsOpen);
                    }
                  }}
                >
                  Tools
                  <span className="text-[0.5rem] text-primary/70" aria-hidden="true">
                    {toolsOpen ? "▲" : "▼"}
                  </span>
                </button>
                {toolsOpen && (
                  <div
                    className="absolute top-full left-0 mt-4 w-[18rem] rounded-2xl border border-[#4f453b] bg-gradient-to-br from-[#120f0c] via-[#1f1a16] to-[#181412] p-6 shadow-[0_25px_65px_rgba(0,0,0,0.55)]"
                    onMouseEnter={handleToolsEnter}
                    onMouseLeave={handleToolsLeave}
                  >
                    <ul className="space-y-3 text-sm text-ink/90">
                      {tools.map((tool) => (
                        <li key={tool.href}>
                          <Link
                            href={tool.href}
                            className="block hover:text-primary font-semibold"
                            onFocus={() => setToolsOpen(true)}
                            onMouseEnter={handleToolsEnter}
                          >
                            {tool.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-t border-[#3d332b] pt-4 text-xs uppercase tracking-[0.6em] text-ink/60">
                      <Link
                        href="/tools"
                        className="text-primary font-semibold tracking-[0.4em]"
                        onMouseEnter={handleToolsEnter}
                      >
                        All Tools →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                ref={propertyTypesRef}
                className="relative group hidden xl:block"
                onMouseEnter={handlePropertyTypesEnter}
                onMouseLeave={handlePropertyTypesLeave}
              >
                <button
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-ink/75 hover:text-ink transition-colors flex items-center gap-1.5"
                  aria-expanded={propertyTypesOpen}
                  aria-haspopup="true"
                  onFocus={() => setPropertyTypesOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPropertyTypesOpen(!propertyTypesOpen);
                    }
                  }}
                >
                  Property Types
                  <span className="text-[0.5rem] text-primary/70" aria-hidden="true">
                    {propertyTypesOpen ? "▲" : "▼"}
                  </span>
                </button>
                {propertyTypesOpen && (
                  <div
                    className="absolute top-full left-0 mt-4 w-[20rem] rounded-2xl border border-[#4f453b] bg-gradient-to-br from-[#120f0c] via-[#1f1a16] to-[#181412] p-6 shadow-[0_25px_65px_rgba(0,0,0,0.55)]"
                    onMouseEnter={handlePropertyTypesEnter}
                    onMouseLeave={handlePropertyTypesLeave}
                  >
                    <div className="space-y-3">
                      {propertyTypePreview.map((propertyType) => (
                        <Link
                          key={propertyType.slug}
                          href={propertyType.route}
                          className="block text-sm text-ink/90 hover:text-primary font-medium"
                          onFocus={() => setPropertyTypesOpen(true)}
                          onMouseEnter={handlePropertyTypesEnter}
                        >
                          {propertyType.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-[#3d332b] pt-4 text-xs uppercase tracking-[0.6em] text-ink/60">
                      <Link
                        href="/property-types"
                        className="text-primary font-semibold tracking-[0.4em]"
                        onMouseEnter={handlePropertyTypesEnter}
                      >
                        All Property Types →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-7 text-[0.75rem] uppercase tracking-[0.35em] text-ink/60">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-primary text-primaryfg text-[0.7rem] font-bold tracking-[0.35em] uppercase hover:bg-primary/90 transition-colors"
            >
              Contact
            </Link>
          </div>

          <button
            className="md:hidden flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.35em] text-ink/75 font-semibold"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu
            <span aria-hidden="true" className="text-base">☰</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />
          <div className="ml-auto w-full max-w-sm bg-panel border-l border-outline p-6 backdrop-blur-md text-ink">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  src="/1031-exchange-san-antonio-tx-logo.png"
                  alt={site.company}
                  width={150}
                  height={45}
                  className="h-10 w-auto"
                />
              </Link>
              <button
                className="text-ink text-xl"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="mt-8 space-y-6 text-sm uppercase tracking-[0.3em]">
              {mobileLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="block text-ink/80 hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 border-t border-outline pt-6 space-y-3">
              <p className="text-[0.65rem] tracking-[0.5em] text-ink/60">
                Property Types
              </p>
              {propertyTypePreview.map((propertyType) => (
                <Link
                  key={`mobile-${propertyType.slug}`}
                  href={propertyType.route}
                  className="block text-base font-semibold text-ink hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {propertyType.name}
                </Link>
              ))}
              <Link
                href="/property-types"
                className="text-xs uppercase tracking-[0.4em] text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Browse All Types →
              </Link>
            </div>
            <div className="mt-8">
              <a
                href={`tel:${site.phoneDigits}`}
                className="text-sm font-semibold tracking-[0.35em] text-ink/80 hover:text-primary"
              >
                {site.phone}
              </a>
              <p className="text-[0.65rem] tracking-[0.4em] text-ink/60 mt-1">
                {site.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
