#!/usr/bin/env tsx
/**
 * Script to rename location and property type images to the correct format
 * 
 * Location images: 1031-exchange-{locationName}-{stateAbbrev}.{ext}
 * Property type images: 1031-exchange-{propertyType}-{cityName}-{stateAbbrev}.{ext}
 * 
 * Run this after restoring images if they were accidentally renamed.
 */

import * as fs from 'fs';
import * as path from 'path';
import { locationsData } from '../data/locations';
import { propertyTypesData } from '../data/property-types';
import site from '../content/site.json';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

function findImageFile(basePath: string, baseName: string): string | null {
  for (const ext of imageExtensions) {
    const filePath = path.join(basePath, `${baseName}${ext}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

function renameLocationImages() {
  const locationsDir = path.join(process.cwd(), 'public', 'locations');
  
  if (!fs.existsSync(locationsDir)) {
    console.log('Locations directory does not exist');
    return;
  }

  console.log('Renaming location images...');
  
  for (const location of locationsData) {
    // Try to find existing image with old naming patterns
    const oldPatterns = [
      `${location.slug}-1031-exchange`,
      `1031-exchange-${location.slug}`,
      location.slug,
    ];
    
    let foundFile: string | null = null;
    let oldFileName = '';
    
    for (const pattern of oldPatterns) {
      const file = findImageFile(locationsDir, pattern);
      if (file) {
        foundFile = file;
        oldFileName = path.basename(file);
        break;
      }
    }
    
    if (!foundFile) {
      console.log(`  ⚠️  No image found for ${location.name} (${location.slug})`);
      continue;
    }
    
    // New filename format: 1031-exchange-{locationName}-{stateAbbrev}.{ext}
    const locationNameSlug = location.slug;
    const stateAbbrev = site.state.toLowerCase();
    const ext = path.extname(foundFile);
    const newFileName = `1031-exchange-${locationNameSlug}-${stateAbbrev}${ext}`;
    const newFilePath = path.join(locationsDir, newFileName);
    
    if (oldFileName === newFileName) {
      console.log(`  ✓ ${location.name} already correctly named`);
      continue;
    }
    
    try {
      fs.renameSync(foundFile, newFilePath);
      console.log(`  ✓ Renamed: ${oldFileName} -> ${newFileName}`);
    } catch (error) {
      console.error(`  ✗ Error renaming ${oldFileName}:`, error);
    }
  }
}

function renamePropertyTypeImages() {
  const inventoryDir = path.join(process.cwd(), 'public', 'inventory');
  const propertyTypesDir = path.join(process.cwd(), 'public', 'property-types');
  
  // Create property-types directory if it doesn't exist
  if (!fs.existsSync(propertyTypesDir)) {
    fs.mkdirSync(propertyTypesDir, { recursive: true });
    console.log('Created property-types directory');
  }
  
  if (!fs.existsSync(inventoryDir)) {
    console.log('Inventory directory does not exist');
    return;
  }

  console.log('\nRenaming and moving property type images...');
  
  // Map property type slugs to their image names
  const propertyTypeImageMap: Record<string, string> = {
    'auto-service-oil-change': 'auto-service',
    'grocery-anchored-outparcel': 'grocery-anchored',
    'ground-lease-outparcel': 'ground-lease',
    'last-mile-logistics': 'industrial-flex',
    'urgent-care-medical': 'medical-office',
  };
  
  for (const propertyType of propertyTypesData) {
    // Try to find image in inventory folder
    const imageKey = propertyTypeImageMap[propertyType.slug] || propertyType.slug;
    const oldPatterns = [
      `${imageKey}-1031-exchange`,
      `1031-exchange-${imageKey}`,
      imageKey,
    ];
    
    let foundFile: string | null = null;
    let oldFileName = '';
    
    for (const pattern of oldPatterns) {
      const file = findImageFile(inventoryDir, pattern);
      if (file) {
        foundFile = file;
        oldFileName = path.basename(file);
        break;
      }
    }
    
    if (!foundFile) {
      console.log(`  ⚠️  No image found for ${propertyType.name} (${propertyType.slug})`);
      continue;
    }
    
    // New filename format: 1031-exchange-{propertyType}-{cityName}-{stateAbbrev}.{ext}
    const propertyTypeSlug = propertyType.slug;
    const cityNameSlug = site.mainCity.toLowerCase().replace(/\s+/g, '-');
    const stateAbbrev = site.state.toLowerCase();
    const ext = path.extname(foundFile);
    const newFileName = `1031-exchange-${propertyTypeSlug}-${cityNameSlug}-${stateAbbrev}${ext}`;
    const newFilePath = path.join(propertyTypesDir, newFileName);
    
    try {
      fs.copyFileSync(foundFile, newFilePath);
      console.log(`  ✓ Copied: ${oldFileName} -> ${newFileName}`);
    } catch (error) {
      console.error(`  ✗ Error copying ${oldFileName}:`, error);
    }
  }
}

function deleteEmptySubfolders() {
  const locationsDir = path.join(process.cwd(), 'public', 'locations');
  const propertyTypesDir = path.join(process.cwd(), 'public', 'property-types');
  
  console.log('\nChecking for empty subfolders...');
  
  [locationsDir, propertyTypesDir].forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        const subDir = path.join(dir, item.name);
        const subItems = fs.readdirSync(subDir);
        if (subItems.length === 0) {
          fs.rmdirSync(subDir);
          console.log(`  ✓ Deleted empty folder: ${path.relative(process.cwd(), subDir)}`);
        }
      }
    }
  });
}

// Main execution
console.log('Starting image renaming process...\n');
renameLocationImages();
renamePropertyTypeImages();
deleteEmptySubfolders();
console.log('\n✅ Image renaming complete!');

