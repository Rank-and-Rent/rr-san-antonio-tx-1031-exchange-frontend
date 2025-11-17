# INVENTORY Spotlight Cards — BATCH 01
Create spotlight cards for your property types. These do not market securities. If DST or TIC is mentioned, include a securities disclaimer.

## Output  TypeScript  write to /data/batches/inventory/batch-01.ts
export const inventorySpotlight01 = [
  { type:"nnn", title:"...", copy:"...", ctaLabel:"Browse NNN Inventory", href:"/inventory/nnn", note:"DST or TIC may be securities. We do not sell securities. We provide introductions to licensed providers only." },
  { type:"single-tenant-retail", title:"...", copy:"...", ctaLabel:"Browse Single Tenant Retail", href:"/inventory/single-tenant-retail", note:"" },
  { type:"medical-office", title:"...", copy:"...", ctaLabel:"Browse Medical Office", href:"/inventory/medical-office", note:"" },
  { type:"auto-service", title:"...", copy:"...", ctaLabel:"Browse Auto Service", href:"/inventory/auto-service", note:"" },
  { type:"grocery-anchored", title:"...", copy:"...", ctaLabel:"Browse Grocery Anchored", href:"/inventory/grocery-anchored", note:"" },
  { type:"industrial-flex", title:"...", copy:"...", ctaLabel:"Browse Industrial Flex", href:"/inventory/industrial-flex", note:"" },
  { type:"ground-lease", title:"...", copy:"...", ctaLabel:"Browse Ground Lease", href:"/inventory/ground-lease", note:"" }
]

