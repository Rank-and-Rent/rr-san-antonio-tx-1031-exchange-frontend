import fs from "fs";
import path from "path";

export interface RichServiceSection {
  heading: string | null;
  html: string;
}

export interface RichServiceFaq {
  q: string;
  a: string;
}

export interface RichServiceInternalLink {
  slug: string;
  label: string;
}

export interface RichServiceData {
  slug: string;
  taxonomy?: string;
  title?: string;
  name?: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: RichServiceSection[];
  faqs: RichServiceFaq[];
  internalLinks?: RichServiceInternalLink[];
  wordCount?: number;
}

const SERVICES_DIR = path.join(process.cwd(), "services");

// The route slugs in data/services.ts predate the rich content pass and don't
// always match the filenames under repo-root services/*.json (e.g. the JSON
// author used more descriptive filenames like "45-day-identification-strategy").
// This map bridges ORIGINAL service slugs that have no exact-match JSON file
// to the rich content file that actually covers that service, by content
// (name/subject), not just string similarity. Exact-filename matches always
// take priority (see loadFromDisk below) so this map is only consulted when
// no services/<slug>.json exists for the route slug itself.
const RICH_CONTENT_SLUG_MAP: Record<string, string> = {
  "cpa-attorney-coordination": "tax-advisor-and-cpa-coordination",
  "forward-exchange": "forward-exchange-coordination",
  "industrial-property-search": "industrial-property-identification",
  "multifamily-property-identification": "multifamily-replacement-sourcing",
  "retail-property-identification": "retail-replacement-sourcing",
  "reverse-exchange": "reverse-exchange-coordination",
};

function loadFromDisk(jsonSlug: string): RichServiceData | null {
  try {
    const filePath = path.join(SERVICES_DIR, `${jsonSlug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as RichServiceData;
    if (!data || !Array.isArray(data.sections) || data.sections.length === 0) {
      return null;
    }
    if (!Array.isArray(data.faqs)) {
      data.faqs = [];
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Reads repo-root services/<slug>.json when it exists and contains a usable
 * rich body (at least one section with html). Returns null on any miss so
 * callers can fall back to the existing hardcoded template. Safe to call
 * from generateStaticParams-adjacent server code (sync fs, no fetch).
 */
export function getRichService(slug: string): RichServiceData | null {
  const exact = loadFromDisk(slug);
  if (exact) {
    return exact;
  }
  const mapped = RICH_CONTENT_SLUG_MAP[slug];
  if (mapped) {
    return loadFromDisk(mapped);
  }
  return null;
}
