import {
  PageLayoutVariant,
  LayoutAssignments,
  ServiceItem,
  LocationItem,
} from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Traditional layout with hero, description, FAQs, and CTA",
    sections: ["hero", "description", "faqs", "inclusions", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Comprehensive layout with table of contents and sidebar",
    sections: ["hero", "toc", "description", "faqs", "inclusions", "situations", "compliance", "cta"],
    features: {
      toc: true,
      stickyCta: false,
      sidebar: true,
      heroStyle: "image",
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Clean focused layout with essential information",
    sections: ["hero", "description", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "feature-rich",
    label: "Feature Rich",
    description: "Full featured layout with all sections and examples",
    sections: ["hero", "description", "inclusions", "situations", "faqs", "compliance", "example", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "educational",
    label: "Educational",
    description: "Education focused with resources and compliance emphasis",
    sections: ["hero", "description", "compliance", "faqs", "resources", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "conversion-focused",
    label: "Conversion Focused",
    description: "Optimized for conversions with multiple CTAs",
    sections: ["hero", "description", "inclusions", "faqs", "example", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Map prominent with location context",
    sections: ["hero", "map", "description", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "map",
    },
  },
  {
    key: "content-first",
    label: "Content First",
    description: "Text content primary with embedded map",
    sections: ["hero", "description", "paths", "map", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "image",
    },
  },
  {
    key: "paths-focused",
    label: "Paths Focused",
    description: "Emphasizes popular exchange paths",
    sections: ["hero", "description", "paths", "faqs", "example", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
  {
    key: "comprehensive",
    label: "Comprehensive",
    description: "Full location information with all sections",
    sections: ["hero", "description", "paths", "map", "faqs", "example", "cta"],
    features: {
      toc: true,
      stickyCta: true,
      sidebar: true,
      heroStyle: "image",
    },
  },
  {
    key: "minimal-location",
    label: "Minimal Location",
    description: "Streamlined location page",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      toc: false,
      stickyCta: false,
      sidebar: false,
      heroStyle: "abstract",
    },
  },
  {
    key: "market-focused",
    label: "Market Focused",
    description: "Market context and property opportunities",
    sections: ["hero", "description", "paths", "faqs", "example", "cta"],
    features: {
      toc: false,
      stickyCta: true,
      sidebar: false,
      heroStyle: "gradient",
    },
  },
];

function assignLayoutsRoundRobin<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[]
): Record<string, string> {
  const assignments: Record<string, string> = {};
  let variantIndex = 0;
  
  for (const item of items) {
    assignments[item.slug] = variants[variantIndex].key;
    variantIndex = (variantIndex + 1) % variants.length;
  }
  
  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayoutsRoundRobin(servicesData, serviceVariants),
  locations: assignLayoutsRoundRobin(locationsData, locationVariants),
};

