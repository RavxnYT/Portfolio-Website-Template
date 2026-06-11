import {
  Inter,
  Space_Grotesk,
  Playfair_Display,
  DM_Sans,
  Anton,
} from "next/font/google";
import type { FontPreset } from "@/config/site.config";

/**
 * Font pairings. Only the chosen preset's fonts are actually applied
 * (and therefore downloaded) — switching is a one-word change in
 * site.config.ts -> theme.fontPreset
 */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  preload: false,
});

const presets = {
  modern: { display: spaceGrotesk, body: inter },
  editorial: { display: playfair, body: dmSans },
  brutalist: { display: anton, body: spaceGrotesk },
} as const;

/** CSS custom property names as configured above (next/font hides them behind class names) */
const variableNames: Record<FontPreset, { display: string; body: string }> = {
  modern: { display: "--font-space-grotesk", body: "--font-inter" },
  editorial: { display: "--font-playfair", body: "--font-dm-sans" },
  brutalist: { display: "--font-anton", body: "--font-space-grotesk" },
};

/** Class names that register the css variables of the chosen pair */
export function getFontClasses(preset: FontPreset): string {
  const pair = presets[preset];
  return `${pair.display.variable} ${pair.body.variable}`;
}

/** Inline style mapping the generic display/body font vars to the chosen pair */
export function getFontVariables(preset: FontPreset): Record<string, string> {
  const names = variableNames[preset];
  return {
    "--font-display-family": `var(${names.display})`,
    "--font-body-family": `var(${names.body})`,
  };
}
