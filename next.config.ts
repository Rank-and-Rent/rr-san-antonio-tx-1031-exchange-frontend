import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the repo-root services/*.json rich-content files are bundled into
  // the serverless function for the dynamic /services/[slug] route, since
  // fs.readFileSync with an interpolated path is not statically traceable.
  // (Next 15+ top-level key; this app is on Next 16.)
  outputFileTracingIncludes: {
    "/services/[slug]": ["./services/*.json"],
    "/locations/[slug]": ["./locations/*.json"],
  },
};

export default nextConfig;
