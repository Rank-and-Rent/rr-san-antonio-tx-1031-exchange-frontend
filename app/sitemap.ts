import { MetadataRoute } from "next";
import { servicesData, locationsData, propertyTypesData } from "@/data";
import site from "@/content/site.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${site.website}`;
  const currentDate = new Date();

  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/property-types`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}${service.route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationRoutes = locationsData.map((location) => ({
    url: `${baseUrl}${location.route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const propertyTypeRoutes = propertyTypesData.map((propertyType) => ({
    url: `${baseUrl}${propertyType.route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...locationRoutes, ...propertyTypeRoutes];
}

