export type HeroVariant = "particles" | "blob" | "rings" | "model";
export type FontPreset = "modern" | "editorial" | "brutalist";

export const siteConfig = {
  /* ------------------------------------------------------------------
   * 1. IDENTITY — who is this website for?
   * ----------------------------------------------------------------*/
  identity: {
    name: "Joe Boulos",
    logoText: "RavXn®",
    role: "Full-Stack Developer & App Builder",
    tagline:
      "I build websites, mobile apps, and products that ship — from first commit to Play Store launch.",
    email: "joeboulos94@gmail.com",
    phone: "+961 76 403 131",
    location: "Beirut, Lebanon",
    /** IANA timezone — powers the live local-time widget in the footer */
    timezone: "Asia/Beirut",
    availability: "Open to freelance & collabs — 2026",
  },

  /* ------------------------------------------------------------------
   * 2. SEO — metadata, open graph
   * ----------------------------------------------------------------*/
  seo: {
    title: "Joe Boulos — Full-Stack Developer (RavXn®)",
    description:
      "Joe Boulos (RavXn) — full-stack developer building websites, mobile apps, and Play Store products. React, Next.js, React Native, and clean code that ships.",
    url: "https://ravxn.dev",
    ogImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    keywords: [
      "developer",
      "full-stack",
      "web development",
      "mobile apps",
      "react",
      "next.js",
      "play store",
      "portfolio",
    ],
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
    headline: ["Joe", "Boulos"],
    /** Index of the headline line rendered as outlined text (-1 = none) */
    outlinedLine: 1,
    subline:
      "Websites, mobile apps & Play Store products — shipped with clean code and zero fluff. RavXn® on the internet.",
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
    team: false,
    testimonials: true,
    contact: true,
  },

  /* ------------------------------------------------------------------
   * 7. NAVIGATION & SOCIALS
   * ----------------------------------------------------------------*/
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about", index: "01" },
    { label: "Work", href: "#work", index: "02" },
    { label: "Services", href: "#services", index: "03" },
    { label: "Gallery", href: "#gallery", index: "04" },
    { label: "Skills", href: "#skills", index: "05" },
    { label: "Reviews", href: "#testimonials", index: "06" },
    { label: "Contact", href: "#contact", index: "07" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Play Store", href: "https://play.google.com/store" },
    { label: "X / Twitter", href: "https://x.com" },
  ],

  /* ------------------------------------------------------------------
   * 8. MARQUEE — the scrolling strip under the hero
   * ----------------------------------------------------------------*/
  marquee: [
    "Web Development",
    "Mobile Apps",
    "React Native",
    "Next.js",
    "Play Store",
    "APIs & Backend",
  ],

  /* ------------------------------------------------------------------
   * 9. CONTACT — the big CTA + form
   * ----------------------------------------------------------------*/
  contact: {
    heading: ["LET'S", "BUILD"],
    sub: "Need a website, app, or feature shipped? Tell me about your project — I reply within 24 hours.",
    budgets: ["< $2k", "$2k – $8k", "$8k – $20k", "$20k +"],
    cta: "Start a project",
  },

  /* ------------------------------------------------------------------
   * 10. FOOTER
   * ----------------------------------------------------------------*/
  footer: {
    heading: "Let's build something",
    note: "Crafted with clean code in Lebanon.",
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
