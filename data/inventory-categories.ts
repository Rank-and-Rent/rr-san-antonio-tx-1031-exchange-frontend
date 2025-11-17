import { InventoryCategory } from "./types";

export const inventoryCategories: InventoryCategory[] = [
  {
    slug: "nnn",
    name: "NNN Properties",
    route: "/inventory/nnn",
    note: "Triple net lease properties with long term tenants",
  },
  {
    slug: "single-tenant-retail",
    name: "Single Tenant Retail",
    route: "/inventory/single-tenant-retail",
    note: "Standalone retail properties with single tenant occupancy",
  },
  {
    slug: "medical-office",
    name: "Medical Office",
    route: "/inventory/medical-office",
    note: "Medical and healthcare related office properties",
  },
  {
    slug: "auto-service",
    name: "Auto Service",
    route: "/inventory/auto-service",
    note: "Automotive service and retail properties",
  },
  {
    slug: "grocery-anchored",
    name: "Grocery Anchored",
    route: "/inventory/grocery-anchored",
    note: "Properties anchored by grocery stores",
  },
  {
    slug: "industrial-flex",
    name: "Industrial Flex",
    route: "/inventory/industrial-flex",
    note: "Flexible industrial and logistics properties",
  },
  {
    slug: "ground-lease",
    name: "Ground Lease",
    route: "/inventory/ground-lease",
    note: "Ground lease opportunities with long term tenants",
  },
];

