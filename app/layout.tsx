import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Turnkey 1031 Exchange Solutions | San Antonio, TX",
  description: "Selling San Antonio investment property? Get free 1031 exchange guidance, compare direct, net-lease, and DST options, or request a property list.",
  keywords: [
    "1031 exchange San Antonio",
    "San Antonio 1031 exchange services",
    "turnkey 1031 exchange solutions",
    "1031 exchange replacement property",
    "1031 exchange property identification",
    "DST replacement properties",
    "passive 1031 exchange investments",
    "qualified intermediary San Antonio",
    "inherited property 1031 exchange",
    "direct real estate replacement property",
    "net lease replacement properties",
    "NNN property 1031 exchange"
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Turnkey 1031 Exchange Solutions | San Antonio, TX",
    description: "Get free San Antonio 1031 exchange guidance, compare replacement-property paths, and request current property information.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Turnkey 1031 Exchange Solutions | San Antonio, TX",
    description: "Free San Antonio 1031 exchange guidance, direct and passive replacement options, and current property information.",
  },
  alternates: {
    canonical: "https://1031exchangesanantonio.com",
  },

  metadataBase: new URL("https://1031exchangesanantonio.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "1031 Exchange San Antonio",
    url: "https://1031exchangesanantonio.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://1031exchangesanantonio.com/services?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const contactPointStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: "+1-210-791-0823",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointStructuredData) }}
        />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${montserrat.variable} ${cormorant.variable} font-[family-name:var(--font-montserrat)] antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
              <script src="/turnstile-contact.js" defer></script>
      </body>
    </html>
  );
}
