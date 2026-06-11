import { siteConfig } from "@/config/site.config";
import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Skills } from "@/components/sections/Skills";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * The homepage renders sections based on the toggles in
 * config/site.config.ts -> sections. Turn blocks on/off per customer.
 */
export default function HomePage() {
  const s = siteConfig.sections;

  return (
    <>
      <main className="relative z-10 bg-background">
        <Hero />
        {s.marquee && <MarqueeStrip />}
        {s.about && <About />}
        {s.projects && <Projects />}
        {s.services && <Services />}
        {s.gallery && <Gallery />}
        {s.skills && <Skills />}
        {s.team && <Team />}
        {s.testimonials && <Testimonials />}
        {s.contact && <Contact />}
      </main>
      <Footer />
    </>
  );
}
