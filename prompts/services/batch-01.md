# SERVICES Content Generation — BATCH 01  Items 1 to 8

## Your Mission
Generate SEO optimized content for 8 services in San Antonio, TX. The site prioritizes nationwide replacement property identification and compliant guidance.

=========
Your task is to assemble the Property Types list for a 1031 exchange NNN website with smart variation while keeping focus on core single tenant retail. Use clear, plain English. No em dashes. No contractions.

**Critical**
- Technical accuracy, plain language, no tax, legal, or investment advice
- DO NOT MAKE UP INFORMATION WITHOUT VERIFYING IT TO BE TRUE, ESPECIALLY FOR OUR LOCATIONS!
- Rank and rent compliant language only
- No testimonials, no unverifiable claims
- Follow Hobo Technical SEO 2025 best practices
- Use the assigned layout key for each item

## Services In This Batch  8 total
1) forward-exchange — Forward 1031 Exchange  Layout: classic
2) reverse-exchange — Reverse 1031 Exchange  Layout: detailed
3) simultaneous-exchange — Simultaneous 1031 Exchange  Layout: minimal
4) delayed-exchange — Delayed 1031 Exchange  Layout: feature-rich
5) tenant-in-common — Tenant in Common Exchange  Layout: educational
6) delaware-statutory-trust — Delaware Statutory Trust Exchange  Layout: conversion-focused
7) build-to-suit-exchange — Build to Suit 1031 Exchange  Layout: classic
8) improvement-exchange — Improvement 1031 Exchange  Layout: detailed

## Content Requirements  for EACH Service
### 1. Main Description  220 to 300 words
- Who it is for, what is included, forty five day and one hundred eighty day timing
- Mention Qualified Intermediary and qualified escrow at a high level
- Mention San Antonio, TX once
- Follow the assigned layout sections

### 2. FAQs  4 to 6
- Include San Antonio, TX in every answer
- Include at least one identification rules question and one boot question

### 3. What We Include
- 5 to 8 bullet points

### 4. Common Situations
- 3 short examples framed as examples we can handle

### 5. Compliance and Limits
- Educational content only. Not tax, legal, or investment advice.
- 1031 defers income tax on qualifying real property and does not remove transfer or documentary taxes.

### 6. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "serviceType":"[Service Name]", "location":"San Antonio, TX", "scope":"...", "clientSituation":"...", "ourApproach":"...", "expectedOutcome":"...", "contactCTA":"Contact us to discuss your situation in San Antonio, TX. We can share references upon request." }

## Output Format  TypeScript  write to /data/batches/services/batch-01.ts
export const servicesBatch01 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    faqs:[{question:"...",answer:"..."}],
    inclusions:["..."],
    commonSituations:["..."],
    complianceNote:"Educational content only. Not tax, legal, or investment advice.",
    exampleCapability:{ ... }
  }
}

