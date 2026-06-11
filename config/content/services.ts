import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    title: "Brand Identity",
    description:
      "Naming, visual identity, art direction and brand systems that scale from a business card to a billboard.",
    deliverables: ["Logo & Identity", "Brand Guidelines", "Art Direction", "Naming & Tone"],
  },
  {
    title: "Web Design & Development",
    description:
      "Award-grade marketing sites and e-commerce. Designed in Figma, built on Next.js, animated to the last pixel.",
    deliverables: ["UI/UX Design", "Next.js Development", "E-Commerce", "CMS Integration"],
    highlight: true,
  },
  {
    title: "3D & Motion",
    description:
      "Real-time WebGL scenes, product visualisation and motion systems that make screens feel alive.",
    deliverables: ["WebGL / Three.js", "3D Illustration", "Motion Design", "Lottie & Rive"],
  },
  {
    title: "Digital Products",
    description:
      "From MVP to v2 — strategy, design systems and interfaces for apps and platforms that feel inevitable.",
    deliverables: ["Product Strategy", "Design Systems", "Prototyping", "App Interfaces"],
  },
];
