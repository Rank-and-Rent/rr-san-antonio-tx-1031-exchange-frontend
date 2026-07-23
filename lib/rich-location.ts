import fs from "fs";
import path from "path";

export interface RichLocationSection {
  heading: string | null;
  html: string;
}

export interface RichLocationFaq {
  q: string;
  a: string;
}

export interface RichLocationInternalLink {
  slug: string;
  label: string;
}

export interface RichLocationData {
  slug: string;
  taxonomy?: string;
  title?: string;
  name?: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: RichLocationSection[];
  faqs: RichLocationFaq[];
  internalLinks?: RichLocationInternalLink[];
  wordCount?: number;
}

const LOCATIONS_DIR = path.join(process.cwd(), "locations");

// The route slugs in data/locations.ts predate the rich content pass. Most of
// the original repo-root locations/*.json files were authored for the outer
// suburbs/cities using a "-tx" filename suffix (e.g. "alamo-heights-tx.json")
// that doesn't match the route slug ("alamo-heights") exactly. This map
// bridges ORIGINAL location slugs that have no exact-match JSON file to the
// rich content file that actually covers that location, by content (name),
// not just string similarity. Exact-filename matches always take priority
// (see loadFromDisk below) so this map is only consulted when no
// locations/<slug>.json exists for the route slug itself.
const RICH_CONTENT_SLUG_MAP: Record<string, string> = {
  "alamo-heights": "alamo-heights-tx",
  "boerne": "boerne-tx",
  "castle-hills": "castle-hills-tx",
  "converse": "converse-tx",
  "fair-oaks-ranch": "fair-oaks-ranch-tx",
  "helotes": "helotes-tx",
  "leon-valley": "leon-valley-tx",
  "live-oak": "live-oak-tx",
  "new-braunfels": "new-braunfels-tx",
  "schertz": "schertz-tx",
  "selma": "selma-tx",
  "shavano-park": "shavano-park-tx",
  "stone-oak": "stone-oak-tx",
  "terrell-hills": "terrell-hills-tx",
  "universal-city": "universal-city-tx",
  "windcrest": "windcrest-tx",
};

function loadFromDisk(jsonSlug: string): RichLocationData | null {
  try {
    const filePath = path.join(LOCATIONS_DIR, `${jsonSlug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as RichLocationData;
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
 * Reads repo-root locations/<slug>.json when it exists and contains a usable
 * rich body (at least one section with html). Returns null on any miss so
 * callers can fall back to the existing hardcoded template. Safe to call
 * from generateStaticParams-adjacent server code (sync fs, no fetch).
 */
export function getRichLocation(slug: string): RichLocationData | null {
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
