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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="border-b border-outline/30">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            <Image
              src="/1031-exchange-san-antonio-tx-logo.png"
              alt={site.company}
              width={180}
              height={54}
              className="h-12 w-auto"
              priority
              quality={95}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-10">
            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className="text-xs font-medium uppercase tracking-[0.2em] text-ink/80 hover:text-ink transition-colors"
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
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[28rem] bg-white border border-outline/50 shadow-xl p-6"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(servicesByCategory).map(([category, services]) => (
                      <div key={category}>
                        <h3 className="text-[10px] text-muted tracking-[0.3em] uppercase mb-3 font-medium">
                          {category}
                        </h3>
                        <ul className="space-y-2">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={service.route}
                                className="block text-sm text-ink/80 hover:text-ink transition-colors"
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
                  <div className="mt-5 pt-4 border-t border-outline/30">
                    <Link
                      href="/services"
                      className="text-xs uppercase tracking-[0.2em] text-ink font-medium hover:text-muted transition-colors"
                      onMouseEnter={handleServicesEnter}
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              ref={locationsRef}
              className="relative"
              onMouseEnter={handleLocationsEnter}
              onMouseLeave={handleLocationsLeave}
            >
              <button
                className="text-xs font-medium uppercase tracking-[0.2em] text-ink/80 hover:text-ink transition-colors"
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
              </button>
              {locationsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[26rem] bg-white border border-outline/50 shadow-xl p-6 max-h-[26rem] overflow-y-auto"
                  onMouseEnter={handleLocationsEnter}
                  onMouseLeave={handleLocationsLeave}
                >
                  <div className="space-y-5">
                    {Object.entries(locationsByType).map(([type, locations]) => (
                      <div key={type}>
                        <h3 className="text-[10px] text-muted tracking-[0.3em] uppercase mb-2 font-medium capitalize">
                          {type.replace("-", " ")}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {locations.slice(0, 6).map((location) => (
                            <Link
                              key={location.slug}
                              href={location.route}
                              className="text-sm text-ink/80 hover:text-ink transition-colors"
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
                  <div className="mt-5 pt-4 border-t border-outline/30">
                    <Link
                      href="/locations"
                      className="text-xs uppercase tracking-[0.2em] text-ink font-medium hover:text-muted transition-colors"
                      onMouseEnter={handleLocationsEnter}
                    >
                      View All Locations
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={handleToolsEnter}
              onMouseLeave={handleToolsLeave}
            >
              <button
                className="text-xs font-medium uppercase tracking-[0.2em] text-ink/80 hover:text-ink transition-colors"
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
              </button>
              {toolsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[18rem] bg-white border border-outline/50 shadow-xl p-6"
                  onMouseEnter={handleToolsEnter}
                  onMouseLeave={handleToolsLeave}
                >
                  <ul className="space-y-3">
                    {tools.map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={tool.href}
                          className="block text-sm text-ink/80 hover:text-ink transition-colors"
                          onFocus={() => setToolsOpen(true)}
                          onMouseEnter={handleToolsEnter}
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 pt-4 border-t border-outline/30">
                    <Link
                      href="/tools"
                      className="text-xs uppercase tracking-[0.2em] text-ink font-medium hover:text-muted transition-colors"
                      onMouseEnter={handleToolsEnter}
                    >
                      View All Tools
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Property Types Dropdown */}
            <div
              ref={propertyTypesRef}
              className="relative"
              onMouseEnter={handlePropertyTypesEnter}
              onMouseLeave={handlePropertyTypesLeave}
            >
              <button
                className="text-xs font-medium uppercase tracking-[0.2em] text-ink/80 hover:text-ink transition-colors"
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
              </button>
              {propertyTypesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[20rem] bg-white border border-outline/50 shadow-xl p-6"
                  onMouseEnter={handlePropertyTypesEnter}
                  onMouseLeave={handlePropertyTypesLeave}
                >
                  <div className="space-y-3">
                    {propertyTypePreview.map((propertyType) => (
                      <Link
                        key={propertyType.slug}
                        href={propertyType.route}
                        className="block text-sm text-ink/80 hover:text-ink transition-colors"
                        onFocus={() => setPropertyTypesOpen(true)}
                        onMouseEnter={handlePropertyTypesEnter}
                      >
                        {propertyType.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-outline/30">
                    <Link
                      href="/property-types"
                      className="text-xs uppercase tracking-[0.2em] text-ink font-medium hover:text-muted transition-colors"
                      onMouseEnter={handlePropertyTypesEnter}
                    >
                      View All Property Types
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.2em] text-ink/80 hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Phone & Contact */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href={`tel:${site.phoneDigits}`} 
              className="text-xs tracking-[0.15em] text-ink/70 hover:text-ink transition-colors font-medium"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 border border-ink text-ink text-xs font-medium tracking-[0.2em] uppercase hover:bg-ink hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/80 font-medium"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="ml-auto w-full max-w-sm bg-white border-l border-outline/30 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-10">
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
                className="text-ink text-2xl leading-none"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                x
              </button>
            </div>
            <div className="space-y-6">
              {mobileLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="block text-sm uppercase tracking-[0.2em] text-ink/80 hover:text-ink transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-outline/30 space-y-4">
              <p className="text-[10px] tracking-[0.3em] text-muted uppercase font-medium">
                Property Types
              </p>
              {propertyTypePreview.map((propertyType) => (
                <Link
                  key={`mobile-${propertyType.slug}`}
                  href={propertyType.route}
                  className="block text-sm text-ink hover:text-muted transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {propertyType.name}
                </Link>
              ))}
              <Link
                href="/property-types"
                className="block text-xs uppercase tracking-[0.2em] text-ink font-medium mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Browse All Types
              </Link>
            </div>
            <div className="mt-10 pt-8 border-t border-outline/30">
              <a
                href={`tel:${site.phoneDigits}`}
                className="block text-sm font-medium tracking-[0.15em] text-ink/80 hover:text-ink mb-2"
              >
                {site.phone}
              </a>
              <p className="text-xs tracking-[0.1em] text-muted">
                {site.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
