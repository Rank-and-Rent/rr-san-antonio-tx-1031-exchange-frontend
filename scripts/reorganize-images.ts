#!/usr/bin/env tsx
/**
 * Script to reorganize location and property type images
 * - Moves location images to public/locations/ with naming: 1031-exchange-{locationSlug}-tx.{ext}
 * - Moves property type images to public/property-types/ with naming: 1031-exchange-{propertyTypeSlug}-san-antonio-tx.{ext}
 * - Deletes empty subfolders
 */

import { readdir, stat, rename, rmdir } from "fs/promises";
import { join, dirname, extname, basename } from "path";
import { existsSync } from "fs";

const PUBLIC_DIR = join(process.cwd(), "public");
const LOCATIONS_DIR = join(PUBLIC_DIR, "locations");
const PROPERTY_TYPES_DIR = join(PUBLIC_DIR, "property-types");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function isImageFile(filename: string): boolean {
  const ext = extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

async function findImagesRecursive(dir: string): Promise<string[]> {
  const images: string[] = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        const subImages = await findImagesRecursive(fullPath);
        images.push(...subImages);
      } else if (entry.isFile() && isImageFile(entry.name)) {
        images.push(fullPath);
      }
    }
  } catch (error) {
    // Directory might not exist or be inaccessible
    console.warn(`Could not read directory ${dir}:`, error);
  }
  return images;
}

async function deleteEmptyDirs(dir: string): Promise<void> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDir = join(dir, entry.name);
        await deleteEmptyDirs(subDir);
        try {
          const subEntries = await readdir(subDir);
          if (subEntries.length === 0) {
            await rmdir(subDir);
            console.log(`Deleted empty directory: ${subDir}`);
          }
        } catch {
          // Directory might have been deleted or is not empty
        }
      }
    }
  } catch (error) {
    // Directory might not exist
  }
}

async function reorganizeLocationImages() {
  console.log("Reorganizing location images...");
  const locationImages = await findImagesRecursive(LOCATIONS_DIR);
  
  // Import location data
  const { locationsData } = await import("../data/locations");
  
  for (const imagePath of locationImages) {
    const filename = basename(imagePath);
    const ext = extname(filename);
    const dir = dirname(imagePath);
    
    // Skip if already in root locations directory with correct naming
    if (dir === LOCATIONS_DIR && filename.startsWith("1031-exchange-") && filename.endsWith("-tx" + ext)) {
      continue;
    }
    
    // Try to match image to location by slug
    let matched = false;
    for (const location of locationsData) {
      const expectedName = `1031-exchange-${location.slug}-tx${ext}`;
      const expectedPath = join(LOCATIONS_DIR, expectedName);
      
      // Check if filename contains location slug
      if (filename.toLowerCase().includes(location.slug.toLowerCase()) || 
          filename.toLowerCase().includes(location.name.toLowerCase().replace(/\s+/g, "-"))) {
        if (!existsSync(expectedPath)) {
          await rename(imagePath, expectedPath);
          console.log(`Moved: ${imagePath} -> ${expectedPath}`);
          matched = true;
          break;
        }
      }
    }
    
    if (!matched) {
      console.warn(`Could not match location image: ${imagePath}`);
    }
  }
}

async function reorganizePropertyTypeImages() {
  console.log("Reorganizing property type images...");
  const propertyTypeImages = await findImagesRecursive(PROPERTY_TYPES_DIR);
  
  // Import property type data
  const { propertyTypesData } = await import("../data/property-types");
  
  for (const imagePath of propertyTypeImages) {
    const filename = basename(imagePath);
    const ext = extname(filename);
    const dir = dirname(imagePath);
    
    // Skip if already in root property-types directory with correct naming
    if (dir === PROPERTY_TYPES_DIR && filename.startsWith("1031-exchange-") && filename.includes("-san-antonio-tx" + ext)) {
      continue;
    }
    
    // Try to match image to property type by slug
    let matched = false;
    for (const propertyType of propertyTypesData) {
      const expectedName = `1031-exchange-${propertyType.slug}-san-antonio-tx${ext}`;
      const expectedPath = join(PROPERTY_TYPES_DIR, expectedName);
      
      // Check if filename contains property type slug
      if (filename.toLowerCase().includes(propertyType.slug.toLowerCase()) ||
          filename.toLowerCase().includes(propertyType.name.toLowerCase().replace(/\s+/g, "-"))) {
        if (!existsSync(expectedPath)) {
          await rename(imagePath, expectedPath);
          console.log(`Moved: ${imagePath} -> ${expectedPath}`);
          matched = true;
          break;
        }
      }
    }
    
    if (!matched) {
      console.warn(`Could not match property type image: ${imagePath}`);
    }
  }
}

async function main() {
  console.log("Starting image reorganization...");
  
  // Ensure directories exist
  if (!existsSync(LOCATIONS_DIR)) {
    console.error(`Locations directory does not exist: ${LOCATIONS_DIR}`);
    return;
  }
  
  if (!existsSync(PROPERTY_TYPES_DIR)) {
    console.error(`Property types directory does not exist: ${PROPERTY_TYPES_DIR}`);
    return;
  }
  
  await reorganizeLocationImages();
  await reorganizePropertyTypeImages();
  
  // Delete empty subdirectories
  console.log("Deleting empty subdirectories...");
  await deleteEmptyDirs(LOCATIONS_DIR);
  await deleteEmptyDirs(PROPERTY_TYPES_DIR);
  
  console.log("Image reorganization complete!");
}

main().catch(console.error);

