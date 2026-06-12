"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useFadeUp, useRevealLines } from "@/lib/animations";
import { siteConfig } from "@/config/site.config";
import { Magnetic } from "@/components/ui/Magnetic";
import { Star } from "@/components/ui/Star";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [budget, setBudget] = useState<string>("");
  const { contact, identity, socials } = siteConfig;

  useRevealLines(headingRef, { stagger: 0.12 });
  useFadeUp(sectionRef);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, budget }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
      setBudget("");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border-b border-line bg-transparent py-4 text-base outline-none transition-colors duration-300 placeholder:text-muted focus:border-accent md:text-lg";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 md:py-40"
      aria-label="Contact"
    >
      {/* Giant CTA */}
      <div className="px-gutter relative">
        <div className="mb-6 flex items-center gap-3 text-label text-muted">
          <Star className="text-accent" />
          <span>08 — Contact</span>
        </div>

        <div className="relative">
          <h2
            ref={headingRef}
            className="font-display text-display-xl uppercase"
          >
            {contact.heading[0]}
            <br />
            <span className="text-outline-accent">{contact.heading[1]}</span>
          </h2>

          <div className="absolute right-[4vw] top-1/2 hidden -translate-y-1/2 lg:block">
            <Magnetic strength={0.45}>
              <a
                href={`mailto:${identity.email}`}
                data-cursor
                className="flex h-44 w-44 items-center justify-center rounded-full bg-accent text-center text-sm font-semibold uppercase tracking-[0.12em] text-accent-contrast transition-transform duration-300 hover:scale-105"
              >
                {contact.cta} ↗
              </a>
            </Magnetic>
          </div>
        </div>

        <p data-fade className="mt-8 max-w-md text-muted md:text-lg">
          {contact.sub}
        </p>
      </div>

      {/* Info + form */}
      <div className="px-gutter mt-20 grid gap-16 lg:grid-cols-12">
        <div data-fade className="flex flex-col gap-10 lg:col-span-5">
          <div>
            <p className="text-label mb-3 text-muted">Email</p>
            <a
              href={`mailto:${identity.email}`}
              className="link-line font-display text-2xl md:text-3xl"
            >
              {identity.email}
            </a>
          </div>
          <div>
            <p className="text-label mb-3 text-muted">Phone</p>
            <a href={`tel:${identity.phone.replace(/[^+\d]/g, "")}`} className="link-line text-lg">
              {identity.phone}
            </a>
          </div>
          <div>
            <p className="text-label mb-3 text-muted">Developer</p>
            <p className="text-lg">{identity.location}</p>
          </div>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-line text-label text-muted hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <form
          data-fade
          onSubmit={onSubmit}
          className="flex flex-col gap-8 lg:col-span-7"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-label mb-2 block text-muted">
                Your name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="John Appleseed"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-label mb-2 block text-muted">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@company.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <p className="text-label mb-4 text-muted">Budget</p>
            <div className="flex flex-wrap gap-3">
              {contact.budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm transition-colors duration-300",
                    budget === b
                      ? "border-accent bg-accent text-accent-contrast"
                      : "border-line hover:border-accent hover:text-accent"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-label mb-2 block text-muted">
              About the project *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Goals, scope, timeline — anything that helps."
              className={cn(inputClass, "resize-none")}
            />
          </div>

          <div className="flex items-center gap-6">
            <Magnetic strength={0.25}>
              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor
                className="rounded-full bg-foreground px-10 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-background transition-all duration-300 hover:bg-accent hover:text-accent-contrast disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </Magnetic>
            <span
              role="status"
              className={cn(
                "text-sm transition-opacity duration-300",
                status === "sent" && "text-accent",
                status === "error" && "text-red-400",
                (status === "idle" || status === "sending") && "opacity-0"
              )}
            >
              {status === "sent"
                ? "Message sent — we'll reply within 24h."
                : "Something went wrong. Email us instead?"}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
