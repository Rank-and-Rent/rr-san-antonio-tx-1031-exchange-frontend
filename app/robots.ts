import { MetadataRoute } from "next";
import site from "@/content/site.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `https://${site.website}/sitemap.xml`,
  };
}

