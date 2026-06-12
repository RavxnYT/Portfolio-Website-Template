import type { Project } from "@/types/content";

/**
 * PROJECTS — shown in the horizontal showcase, each gets its own
 * case-study page at /work/[slug]. Replace images with the
 * customer's work (drop files in /public/images and use "/images/x.jpg").
 */
export const projects: Project[] = [
  {
    slug: "ravxn-app",
    title: "RavXn App",
    category: "Play Store App",
    client: "Personal Project",
    year: "2025",
    services: ["React Native", "Android", "UI/UX", "Backend"],
    summary:
      "My own app on Google Play — designed, built, and published end-to-end from idea to live listing.",
    description: [
      "This is the project I'm most proud of: a fully self-built mobile app live on the Play Store. From wireframes to production builds, I handled every layer — UI, state management, API integration, and store optimization.",
      "Built with React Native for cross-platform speed, with native modules where performance mattered. The backend runs on Node.js with real-time features and push notifications.",
      "Publishing taught me the full product lifecycle — ASO, crash reporting, staged rollouts, and iterating based on real user feedback. It's proof that I don't just write code; I ship products.",
    ],
    cover:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "nexa-dashboard",
    title: "Nexa Dashboard",
    category: "Web App",
    client: "Nexa Analytics",
    year: "2026",
    services: ["Next.js", "TypeScript", "API Integration", "UI Development"],
    summary:
      "A real-time analytics dashboard for a SaaS startup — charts, filters, and sub-second data loads.",
    description: [
      "Nexa needed a dashboard that could handle thousands of data points without breaking a sweat. I built it on Next.js 15 with server components for initial load speed and client-side caching for instant filter changes.",
      "The UI uses a custom charting layer built on Recharts with GSAP-powered transitions. Auth is handled via JWT with role-based access — admins see everything, team leads see their squad.",
      "Lighthouse scores hit 95+ on performance. The client cut their reporting time from hours to minutes.",
    ],
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "fittrack-mobile",
    title: "FitTrack Mobile",
    category: "Mobile App",
    client: "FitTrack",
    year: "2025",
    services: ["React Native", "Firebase", "UI Development"],
    summary:
      "A fitness tracking app with workout logging, progress charts, and social features — shipped to both app stores.",
    description: [
      "FitTrack came to me with a Figma file and a deadline. I translated the designs into a React Native app with smooth tab navigation, animated progress rings, and offline-first workout logging.",
      "Firebase handles auth, real-time sync, and push notifications for workout reminders. The social feed uses optimistic updates so interactions feel instant even on slow connections.",
      "The app launched with a 4.6★ rating and crossed 1,000 downloads in its first month.",
    ],
    cover:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "artisan-commerce",
    title: "Artisan Commerce",
    category: "E-Commerce Website",
    client: "Artisan Co.",
    year: "2025",
    services: ["Next.js", "Stripe", "CMS", "Development"],
    summary:
      "A headless e-commerce storefront with real-time inventory, one-click checkout, and a custom admin panel.",
    description: [
      "Artisan needed to move off a slow WordPress setup. I rebuilt their store on Next.js with a headless CMS for product management and Stripe for payments — checkout loads in under two seconds.",
      "The product configurator handles variant combinations (size, color, material) with live price updates. An admin dashboard lets the team manage orders, inventory, and shipping without touching code.",
      "Conversion rate climbed 32% after launch and the client handles peak traffic without downtime.",
    ],
    cover:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "devfolio-platform",
    title: "DevFolio Platform",
    category: "Web Platform",
    client: "DevFolio",
    year: "2024",
    services: ["Next.js", "Authentication", "Database", "Deployment"],
    summary:
      "A portfolio builder for developers — drag-and-drop sections, custom domains, and one-click deploy.",
    description: [
      "DevFolio is a platform where developers showcase their work without wrestling with templates. I built the core engine: a section-based page builder, theme system, and deployment pipeline on Vercel.",
      "Users pick from pre-built section types (hero, projects, skills, contact), customize content via a dashboard, and publish to a custom subdomain or their own domain. Auth uses NextAuth with GitHub OAuth.",
      "The platform hosts 200+ developer portfolios and handles 50k monthly page views on a serverless stack.",
    ],
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2000&auto=format&fit=crop",
    ],
  },
  {
    slug: "pulse-api",
    title: "Pulse API",
    category: "Backend & API",
    client: "Pulse Health",
    year: "2024",
    services: ["Node.js", "PostgreSQL", "REST API", "Documentation"],
    summary:
      "A RESTful API powering a health-tech mobile app — auth, data sync, and real-time notifications at scale.",
    description: [
      "Pulse Health needed a reliable backend for their patient monitoring app. I designed and built a Node.js API with PostgreSQL, handling user auth, health data ingestion, and push notification triggers.",
      "The API follows OpenAPI spec with auto-generated docs. Rate limiting, input validation, and encrypted storage for sensitive health data were non-negotiable — all built in from day one.",
      "The system processes 10k+ daily requests with 99.9% uptime and zero data breaches since launch.",
    ],
    cover:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    ],
  },
];
