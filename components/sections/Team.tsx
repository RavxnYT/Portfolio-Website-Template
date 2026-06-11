"use client";

import { useRef } from "react";
import { useFadeUp } from "@/lib/animations";
import { team } from "@/config/content/team";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  useFadeUp(sectionRef);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-28 md:py-40"
      aria-label="Team"
    >
      <SectionHeading
        index="06"
        label="The People"
        title="Small team, heavy hitters"
      />

      <div className="px-gutter mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {team.map((member, i) => (
          <div key={member.name} data-fade className="group">
            <div className="relative overflow-hidden rounded-2xl" data-cursor>
              <div className="aspect-[3/4] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                />
              </div>
              <span className="text-label absolute left-4 top-4 rounded-full bg-background/60 px-3 py-1.5 backdrop-blur-sm">
                0{i + 1}
              </span>
              <span className="absolute inset-x-4 bottom-4 translate-y-3 rounded-full bg-accent px-4 py-2 text-center text-sm font-medium text-accent-contrast opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {member.role}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-display text-xl uppercase md:text-2xl">
                {member.name}
              </h3>
              <span className="text-label text-muted">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
