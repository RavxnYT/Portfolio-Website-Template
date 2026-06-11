import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/config/content/projects";
import { CaseStudy } from "@/components/work/CaseStudy";
import { Footer } from "@/components/sections/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <>
      <main className="relative z-10 bg-background">
        <CaseStudy project={project} nextProject={nextProject} />
      </main>
      <Footer />
    </>
  );
}
