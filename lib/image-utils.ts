import site from "@/content/site.json";

// Try .jpg first since that's what we have, then fallback to other formats
const imageExtensions = ['.jpg', '.jpeg', '.webp', '.avif', '.png'];

/**
 * Get possible image paths for a location (tries multiple extensions)
 * Format: /locations/1031-exchange-{locationSlug}-{stateAbbrev}.{ext}
 */
export function getLocationImagePath(locationSlug: string): string | null {
  const stateAbbrev = site.state.toLowerCase();
  const basePath = `/locations/1031-exchange-${locationSlug}-${stateAbbrev}`;
  // Return base path without extension - SafeImage component will try all extensions
  // User should ensure images are named correctly: 1031-exchange-{slug}-tx.{ext}
  return basePath;
}

/**
 * Get possible image paths for a property type (tries multiple extensions)
 * Format: /property-types/1031-exchange-{propertyTypeSlug}-{cityName}-{stateAbbrev}.{ext}
 */
export function getPropertyTypeImagePath(propertyTypeSlug: string): string | null {
  const cityNameSlug = site.mainCity.toLowerCase().replace(/\s+/g, '-');
  const stateAbbrev = site.state.toLowerCase();
  const basePath = `/property-types/1031-exchange-${propertyTypeSlug}-${cityNameSlug}-${stateAbbrev}`;
  // Return base path without extension - SafeImage component will try all extensions
  // User should ensure images are named correctly: 1031-exchange-{slug}-san-antonio-tx.{ext}
  return basePath;
}

/**
 * Get all possible image paths for a location (for trying multiple extensions)
 */
export function getLocationImagePaths(locationSlug: string): string[] {
  const stateAbbrev = site.state.toLowerCase();
  const basePath = `/locations/1031-exchange-${locationSlug}-${stateAbbrev}`;
  return imageExtensions.map(ext => `${basePath}${ext}`);
}

/**
 * Get all possible image paths for a property type (for trying multiple extensions)
 */
export function getPropertyTypeImagePaths(propertyTypeSlug: string): string[] {
  const cityNameSlug = site.mainCity.toLowerCase().replace(/\s+/g, '-');
  const stateAbbrev = site.state.toLowerCase();
  const basePath = `/property-types/1031-exchange-${propertyTypeSlug}-${cityNameSlug}-${stateAbbrev}`;
  return imageExtensions.map(ext => `${basePath}${ext}`);
}

/**
 * Get image srcSet for responsive images
 */
export function getImageSrcSet(basePath: string): string {
  // Remove extension
  const baseWithoutExt = basePath.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  return `${baseWithoutExt}.jpg 1x, ${baseWithoutExt}.webp 1x`;
}

