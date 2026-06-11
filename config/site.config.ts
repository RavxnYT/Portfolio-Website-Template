export type HeroVariant = "particles" | "blob" | "rings" | "model";
export type FontPreset = "modern" | "editorial" | "brutalist";

export const siteConfig = {
  /* ------------------------------------------------------------------
   * 1. IDENTITY — who is this website for?
   * ----------------------------------------------------------------*/
  identity: {
    name: "Lumen Studio",
    logoText: "LUMEN®",
    role: "Independent Creative Studio",
    tagline: "We craft immersive digital experiences, brands and products that move people — and metrics.",
    email: "joeboulos94@gmail.com",
    phone: "+961 76 403 131",
    location: "Beirut, Lebanon",
    /** IANA timezone — powers the live local-time widget in the footer */
    timezone: "Asia/Beirut",
    availability: "Accepting projects — Q3 2026",
  },

  /* ------------------------------------------------------------------
   * 2. SEO — metadata, open graph
   * ----------------------------------------------------------------*/
  seo: {
    title: "Lumen Studio — Creative Digital Studio",
    description:
      "Lumen is an independent creative studio crafting immersive websites, brands and digital products. Design, 3D and development under one roof.",
    url: "https://lumen.studio",
    ogImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    keywords: ["creative studio", "web design", "portfolio", "3d", "branding"],
  },

  /* ------------------------------------------------------------------
   * 3. THEME — colors & typography
   *    Swap the accent for an instant re-brand. A few combos that work:
   *    - Lime punch:   accent #D7FF3E on #0A0A0B   (default)
   *    - Old money:    accent #C9A96A on #0E0D0B
   *    - Electric:     accent #4D5DFB on #08080C
   *    - Coral heat:   accent #FF5C38 on #0B0A0A
   *    - Gallery white: bg #F4F2EE, fg #111111, accent #1A41F2
   * ----------------------------------------------------------------*/
  theme: {
    colors: {
      background: "#0A0A0B",
      surface: "#141417",
      foreground: "#F2F1ED",
      muted: "#8B8B93",
      accent: "#D7FF3E",
      accentContrast: "#0A0A0B",
      line: "rgba(242, 241, 237, 0.14)",
    },
    /** "modern" (Space Grotesk) | "editorial" (Playfair) | "brutalist" (Anton) */
    fontPreset: "modern" as FontPreset,
  },

  /* ------------------------------------------------------------------
   * 4. FEATURES — global experience switches
   * ----------------------------------------------------------------*/
  features: {
    preloader: true,
    customCursor: true,
    noiseOverlay: true,
    scrollProgress: true,
    sectionNavigator: true,
  },

  /* ------------------------------------------------------------------
   * 5. HERO — the first impression
   *    variant: "particles" — galaxy of drifting points
   *             "blob"      — liquid chrome metaball
   *             "rings"     — orbital gyroscope rings
   *             "model"     — your own .glb file (set modelPath)
   * ----------------------------------------------------------------*/
  hero: {
    variant: "blob" as HeroVariant,
    /** Only used when variant === "model". Put the file in /public/models */
    modelPath: "",
    modelScale: 1,
    headline: ["LUMEN", "STUDIO®"],
    /** Index of the headline line rendered as outlined text (-1 = none) */
    outlinedLine: 1,
    subline:
      "Design, 3D and code under one roof. We build websites people screenshot and brands people remember.",
    scrollHint: "Scroll",
  },

  /* ------------------------------------------------------------------
   * 6. SECTIONS — switch entire blocks on/off per customer
   * ----------------------------------------------------------------*/
  sections: {
    marquee: true,
    about: true,
    projects: true,
    services: true,
    gallery: true,
    skills: true,
    team: true,
    testimonials: true,
    contact: true,
  },

  /* ------------------------------------------------------------------
   * 7. NAVIGATION & SOCIALS
   * ----------------------------------------------------------------*/
  nav: [
    { label: "Home", href: "#home" },
    { label: "Studio", href: "#about", index: "01" },
    { label: "Work", href: "#work", index: "02" },
    { label: "Services", href: "#services", index: "03" },
    { label: "Gallery", href: "#gallery", index: "04" },
    { label: "Skills", href: "#skills", index: "05" },
    { label: "Team", href: "#team", index: "06" },
    { label: "Reviews", href: "#testimonials", index: "07" },
    { label: "Contact", href: "#contact", index: "08" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "X / Twitter", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],

  /* ------------------------------------------------------------------
   * 8. MARQUEE — the scrolling strip under the hero
   * ----------------------------------------------------------------*/
  marquee: [
    "Brand Identity",
    "Web Design",
    "3D & Motion",
    "Development",
    "Art Direction",
    "E-Commerce",
  ],

  /* ------------------------------------------------------------------
   * 9. CONTACT — the big CTA + form
   * ----------------------------------------------------------------*/
  contact: {
    heading: ["HAVE AN", "IDEA?"],
    sub: "Tell us about your project — timeline, budget, ambition. We answer within 24 hours.",
    budgets: ["< $5k", "$5k – $15k", "$15k – $50k", "$50k +"],
    cta: "Get in touch",
  },

  /* ------------------------------------------------------------------
   * 10. FOOTER
   * ----------------------------------------------------------------*/
  footer: {
    heading: "Let's create together",
    note: "Crafted with obsession in Lebanon.",
    /** Your credit as the developer — stays on every site you ship */
    developer: {
      name: "Joe Boulos",
      location: "Lebanon",
      /** Optional link to your own portfolio/profile ("" = plain text) */
      url: "",
    },
  },
};

export type SiteConfig = typeof siteConfig;
