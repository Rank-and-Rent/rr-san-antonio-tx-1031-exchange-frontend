# LOCATIONS Content Generation — BATCH 03  Items 13 to 18

## Your Mission
Generate SEO optimized content for 6 locations near San Antonio, TX that help users find replacement properties nationwide.

**Critical**
- No boilerplate
- Include San Antonio, TX once in each body
- Rank and rent compliant language only
- Emphasize nationwide property identification support
- Use the assigned layout key

## Locations In This Batch  6 total
1) terrell-hills — Terrell Hills, TX  Layout: map-first
2) castle-hills — Castle Hills, TX  Layout: content-first
3) leon-valley — Leon Valley, TX  Layout: paths-focused
4) windcrest — Windcrest, TX  Layout: comprehensive
5) hollywood-park — Hollywood Park, TX  Layout: minimal-location
6) boerne — Boerne, TX  Layout: market-focused

## Content Requirements  for EACH Location
### 1. Main Description  180 to 260 words
- Local exchange drivers, asset types, any transfer or documentary tax notes
- One reference to San Antonio, TX
- Mention national identification support
- Follow the assigned layout sections

### 2. Popular Paths  rank 1 to 6
- Order services or property types with 2 to 3 sentence rationale each

### 3. FAQs  4 items
- Include the location and state abbreviation in each answer

### 4. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "location":"[Location, TX]", "situation":"...", "ourApproach":"...", "expectedOutcome":"..." }

## Output Format  TypeScript  write to /data/batches/locations/batch-03.ts
export const locationsBatch03 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    popularPaths:[{rank:1,type:"service or propertyType",slug:"...",name:"...",whyPopular:"..."}],
    faqs:[{question:"...",answer:"..."}],
    exampleCapability:{ ... }
  }
}

