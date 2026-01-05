import site from '@/content/site.json';

export function getBrand() {
  const COLORS = {
    primary: '#C9A227',
    secondary: '#0E3A5B',
    dark: '#0F0F0F',
  };

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://www.1031exchangeofsanantonio.com`;

  return {
    // Email template fields
    subject: "We received your 1031 exchange inquiry",
    preheader: "Thanks for your inquiry, we have received your 1031 exchange request and will contact you within one business day.",
    company_name: site.company,
    logo_url: `${SITE_URL}/1031-exchange-san-antonio-tx-logo.png`,
    city_state: `${site.mainCity}, ${site.state}`,
    brand_accent: COLORS.primary,
    cta_dark_bg: COLORS.dark,
    bg_color: "#0F0F0F",
    text_dark: "#0F0F0F",
    text_muted: "#666666",
    text_body: "#333333",
    text_faint: "#999999",
    border_color: "#E5E5E5",
    card_header_bg: "#F5F5F5",
    card_header_text: "#0F0F0F",
    header_text_color: "#FFFFFF",
    footer_text_color: "#FFFFFF",
    hero_title: "Thanks for your inquiry. We received your 1031 exchange request.",
    hero_subtitle: "Our team will review your details and reach out within one business day to discuss your exchange strategy.",
    details_title: "Your project details",
    call_cta_label: "Call Now",
    call_phone: site.phone,
    call_phone_plain: site.phoneDigits,
    site_cta_label: "Go To Site",
    site_url: SITE_URL,
    address_line: site.address,
    footer_note: "This confirmation is a transactional email related to your request.",

    // Legacy fields for backward compatibility
    brand_title: site.company,
    brand_tagline: '1031 Exchange Property Identification and Coordination Services',
    brand_dark_bg: COLORS.dark,
    brand_gold: COLORS.primary,
    supportPhone: site.phone,
    supportEmail: site.email,
    service_area: `Serving ${site.mainCity} and surrounding areas`,
    portfolio_url: SITE_URL,
    portfolio_blurb: `1031 exchange property identification and coordination services for ${site.mainCity} investors.`,
    intro_copy: `Delivering expert 1031 exchange property identification and coordination services to help investors defer capital gains taxes through like-kind property exchanges.`,
  };
}
