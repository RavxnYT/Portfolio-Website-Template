import type { Project } from "@/types/content";

/**
 * PROJECTS — shown in the horizontal showcase, each gets its own
 * case-study page at /work/[slug]. Replace images with the
 * customer's work (drop files in /public/images and use "/images/x.jpg").
 */
export const projects: Project[] = [
  {
    slug: "helix-robotics",
    title: "Helix Robotics",
    category: "3D Web Experience",
    client: "Helix Robotics Inc.",
    year: "2026",
    services: ["Web Design", "WebGL & 3D", "Development"],
    summary:
      "An immersive product reveal for the next generation of industrial automation — scroll-driven 3D with zero loading screens.",
    description: [
      "Helix came to us two months before unveiling their flagship robotic arm. They didn't want a brochure — they wanted the feeling of standing on the factory floor of 2030. We built a scroll-driven WebGL experience where the product assembles itself as you move through the story.",
      "Every section is staged like a film shot: camera moves are scripted to scroll, copy enters in sync with the machine's choreography, and the whole experience streams progressively so the first paint lands in under a second.",
      "The reveal generated 40k unique visits in launch week and was picked up by three industry publications. More importantly — the pre-order list filled out in eleven days.",
    ],
    cover:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "vanta-timepieces",
    title: "Vanta Timepieces",
    category: "E-Commerce",
    client: "Vanta Watch Co.",
    year: "2025",
    services: ["E-Commerce", "Art Direction", "Development"],
    summary:
      "A flagship store for a watchmaker that treats time like a luxury — cinematic product storytelling meets one-click checkout.",
    description: [
      "Vanta sells watches that cost more than cars, but their old store felt like a spreadsheet. We rebuilt the entire purchase journey around a single idea: looking at a Vanta watch should feel like holding one.",
      "Product pages open with macro photography choreographed to scroll. Specs unfold like a leaflet from the box. The configurator renders strap and dial combinations in real time, and checkout is reduced to one considered step.",
      "Conversion rate climbed 38% quarter-over-quarter and average session time tripled. The store now outsells their physical boutiques.",
    ],
    cover:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "mono-festival",
    title: "Mono Festival",
    category: "Brand Identity",
    client: "Mono Collective",
    year: "2025",
    services: ["Identity", "Art Direction", "Campaign"],
    summary:
      "Identity and digital campaign for a festival where every artist performs in monochrome.",
    description: [
      "One color per night. That was the entire brief. We turned the constraint into the brand: a system where the identity re-skins itself every 24 hours during the festival — posters, wristbands, the website, even the stage lighting follow the same palette feed.",
      "The site was built as a living poster. Headliners glitch between tones, the lineup re-sorts itself by hue, and ticket tiers are named after Pantone references.",
      "The festival sold out both weekends and the identity took home an industry award for art direction.",
    ],
    cover:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "atlas-architects",
    title: "Atlas Architects",
    category: "Digital Platform",
    client: "Atlas Architecture Studio",
    year: "2024",
    services: ["Web Design", "CMS", "Development"],
    summary:
      "A portfolio platform for an architecture practice — quiet typography, loud work.",
    description: [
      "Architects are the hardest clients a designer can have, and we mean that as a compliment. Atlas needed a platform that could carry 20 years of projects without ever competing with them.",
      "We designed a system of strict grids and generous white space where photography does the talking. A bespoke CMS lets the studio publish a new project in minutes, with layout variants that keep every case study feeling hand-set.",
      "The platform became their main acquisition channel within six months — two of the three largest commissions in studio history arrived through the contact form.",
    ],
    cover:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "pulse-audio",
    title: "Pulse Audio",
    category: "Brand & E-Commerce",
    client: "Pulse Audio Labs",
    year: "2024",
    services: ["Rebrand", "E-Commerce", "Motion"],
    summary:
      "Rebrand and headless store for an audio hardware startup tuned for bass-heads.",
    description: [
      "Pulse makes headphones for people who feel music physically. The old brand whispered; the product slaps. We rebuilt the identity around waveform geometry and a palette that vibrates, then carried it into a headless storefront.",
      "Product pages respond to audio: hover states pulse to the beat of demo tracks, and the hero visualizes the frequency range of each model. Under the hood it's a headless commerce stack with sub-second page transitions.",
      "Cart size grew 24% and the relaunch episode of their podcast — recorded on the product page, live — hit #1 in their category.",
    ],
    cover:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "kinetic-sportswear",
    title: "Kinetic Sportswear",
    category: "Campaign Site",
    client: "Kinetic Athletics",
    year: "2024",
    services: ["Campaign", "Web Design", "Motion"],
    summary:
      "A launch campaign that moves — literally. Scroll-bound product motion for a sneaker drop.",
    description: [
      "Kinetic's first performance shoe deserved more than a countdown page. We built a campaign site where the shoe never stops moving: it rotates, explodes into layers and reassembles as you scroll through the engineering story.",
      "The drop mechanic was designed for hype culture — a live queue with position tickets, shareable holding cards, and an easter egg for anyone who found the hidden colorway.",
      "The first run sold out in 90 seconds. The easter egg colorway trended on social and got its own production run.",
    ],
    cover:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
    ],
  },
];
