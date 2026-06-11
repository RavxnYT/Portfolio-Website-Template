export interface Project {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  services: string[];
  summary: string;
  /** Long-form paragraphs shown on the case study page */
  description: string[];
  cover: string;
  images: string[];
  liveUrl?: string;
}

export interface Service {
  title: string;
  description: string;
  deliverables: string[];
  /** Renders the card in the accent color for emphasis */
  highlight?: boolean;
}

export interface GalleryItem {
  src: string;
  alt: string;
  ratio: "portrait" | "landscape" | "square";
}

export interface Skill {
  name: string;
  category: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
