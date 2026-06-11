import type { Stat } from "@/types/content";

export const about = {
  label: "The Studio",
  /** The big opening statement — animated line by line */
  intro:
    "Lumen is an independent creative studio crafting digital experiences at the intersection of design, technology and storytelling.",
  /** Supporting paragraph */
  body:
    "From first sketch to final deploy, we partner with ambitious brands to build websites, products and identities that people remember. Strategy-led, detail-obsessed, performance-everything. No handoffs, no telephone games — the people you meet are the people who build.",
  portrait:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop",
  portraitAlt: "Inside the Lumen studio",
  stats: [
    { value: 8, suffix: "+", label: "Years of practice" },
    { value: 140, suffix: "+", label: "Projects shipped" },
    { value: 60, suffix: "+", label: "Happy clients" },
    { value: 18, suffix: "", label: "Industry awards" },
  ] satisfies Stat[],
};
