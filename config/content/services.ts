import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Fast, responsive websites and web apps built with React, Next.js, and modern tooling — from landing pages to full platforms.",
    deliverables: ["Next.js / React", "Responsive UI", "CMS Integration", "Performance Tuning"],
    highlight: true,
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps with React Native — polished UI, smooth animations, and production-ready builds for iOS and Android.",
    deliverables: ["React Native", "UI/UX Implementation", "Native Modules", "App Store Ready"],
  },
  {
    title: "Play Store Products",
    description:
      "End-to-end app development and publishing — I've shipped my own app on Google Play and can take yours from prototype to live listing.",
    deliverables: ["Android Development", "Play Store Publishing", "In-App Features", "Updates & Maintenance"],
  },
  {
    title: "APIs & Backend",
    description:
      "RESTful APIs, authentication, databases, and server-side logic — the infrastructure that keeps your frontend fast and your data secure.",
    deliverables: ["Node.js APIs", "Database Design", "Auth & Security", "Cloud Deployment"],
  },
];
