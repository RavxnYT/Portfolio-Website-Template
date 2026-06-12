import type { Stat } from "@/types/content";

export const about = {
  label: "About",
  /** The big opening statement — animated line by line */
  intro:
    "I'm Joe Boulos — RavXn to most — a full-stack developer who turns ideas into websites, mobile apps, and products live on the Play Store.",
  /** Supporting paragraph */
  body:
    "From React dashboards to React Native apps, I write code that ships. No agency overhead, no handoffs — you talk to the person who builds it. Performance-first, TypeScript everywhere, and obsessed with the details users actually feel.",
  portrait:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1800&auto=format&fit=crop",
  portraitAlt: "Joe Boulos at the desk",
  stats: [
    { value: 6, suffix: "+", label: "Years coding" },
    { value: 40, suffix: "+", label: "Projects shipped" },
    { value: 1, suffix: "", label: "Play Store app" },
    { value: 15, suffix: "+", label: "Happy clients" },
  ] satisfies Stat[],
};
