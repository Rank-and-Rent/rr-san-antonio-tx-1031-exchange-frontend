"use client";

import { useState } from "react";
import Link from "next/link";
import site from "@/content/site.json";

export default function StickyCall({ phone }: { phone: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const tel = "tel:" + phone.replace(/\D/g, "");

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {isOpen ? (
        <div className="bg-paper border border-outline rounded-lg shadow-xl p-4 mb-2 min-w-[200px]">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-ink hover:text-heading"
            aria-label="Close"
          >
            ×
          </button>
          <div className="space-y-2">
            <a
              href={tel}
              className="block w-full text-center px-4 py-2 bg-primary text-primaryfg rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              Call Now
            </a>
            <Link
              href="/contact"
              className="block w-full text-center px-4 py-2 border border-outline text-ink rounded-full hover:bg-panel transition-colors"
            >
              Contact Form
            </Link>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-full px-5 py-3 shadow-xl border border-outline bg-primary text-primaryfg hover:opacity-90 transition-opacity"
        aria-label="Call options"
      >
        <span className="hidden md:inline">Call Now</span>
        <span className="md:hidden">Call</span>
      </button>
    </div>
  );
}