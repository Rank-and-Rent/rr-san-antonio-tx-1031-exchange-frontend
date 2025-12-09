import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Single Tenant NNN Retail Properties for 1031 Exchange | San Antonio & Nationwide",
  description: "Find high-quality single tenant net lease properties for 1031 exchange across all 50 states. NNN investment property for sale, net lease property listings, and 1031 exchange NNN properties. Expert guidance for unrepresented buyers. Call 210-791-0823.",
  keywords: [
    "single tenant retail for sale",
    "NNN investment property for sale",
    "net lease property listings",
    "1031 exchange NNN properties",
    "single tenant net lease",
    "triple net lease properties",
    "1031 exchange replacement property",
    "NNN properties nationwide",
    "single tenant retail 1031 exchange",
    "net lease investment properties",
    "1031 exchange San Antonio",
    "sale leaseback",
    "ground lease",
    "zero cash flow 1031 exchange"
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
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
    title: "Single Tenant NNN Retail Properties for 1031 Exchange | Nationwide",
    description: "Find high-quality single tenant net lease properties for 1031 exchange across all 50 states. Expert guidance for unrepresented buyers.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Single Tenant NNN Retail Properties for 1031 Exchange",
    description: "Find high-quality single tenant net lease properties for 1031 exchange across all 50 states.",
  },
  alternates: {
    canonical: "https://1031exchangesanantonio.com",
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
