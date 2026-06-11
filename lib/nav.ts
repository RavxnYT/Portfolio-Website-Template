import { siteConfig } from "@/config/site.config";

/** Maps nav hash links to the section toggle key in site.config */
const hrefSectionMap: Record<string, keyof typeof siteConfig.sections> = {
  "#home": "about", // home is always shown when hero exists
  "#work": "projects",
  "#about": "about",
  "#services": "services",
  "#gallery": "gallery",
  "#skills": "skills",
  "#team": "team",
  "#testimonials": "testimonials",
  "#contact": "contact",
};

export function getVisibleNavItems() {
  return siteConfig.nav.filter((item) => {
    if (item.href === "#home") return true;
    const key = hrefSectionMap[item.href];
    if (!key) return true;
    return siteConfig.sections[key];
  });
}
