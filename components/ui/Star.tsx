import { cn } from "@/lib/utils";

/** Four-point sparkle — the template's decorative motif. */
export function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("h-[1em] w-[1em]", className)}
    >
      <path d="M12 0 L13.9 10.1 L24 12 L13.9 13.9 L12 24 L10.1 13.9 L0 12 L10.1 10.1 Z" />
    </svg>
  );
}
