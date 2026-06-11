"use client";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { Star } from "@/components/ui/Star";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <Star className="spin-slow text-3xl text-accent" />
      <h1 className="font-display text-display-xl uppercase">
        4<span className="text-outline-accent">0</span>4
      </h1>
      <p className="max-w-sm text-muted">
        This page drifted out of orbit. Let&apos;s get you back to the good stuff.
      </p>
      <Magnetic strength={0.3}>
        <TransitionLink
          href="/"
          data-cursor
          className="inline-block rounded-full bg-foreground px-10 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-300 hover:bg-accent hover:text-accent-contrast"
        >
          Back home
        </TransitionLink>
      </Magnetic>
    </main>
  );
}
