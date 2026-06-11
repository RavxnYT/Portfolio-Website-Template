import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site.config";
import { getFontClasses, getFontVariables } from "@/lib/fonts";
import { AppShell } from "@/components/experience/AppShell";
import "./globals.css";

const { identity, seo, theme } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: seo.title,
    template: `%s — ${identity.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: identity.name,
    images: [{ url: seo.ogImage, width: 1600, height: 900 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

/** Rough luminance check so form controls/scrollbars match the theme */
function isDarkColor(hex: string): boolean {
  const value = hex.replace("#", "");
  if (value.length < 6) return true;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: theme.colors.background,
  colorScheme: isDarkColor(theme.colors.background) ? "dark" : "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const c = theme.colors;
  const themeVars = {
    "--background": c.background,
    "--surface": c.surface,
    "--foreground": c.foreground,
    "--muted": c.muted,
    "--accent": c.accent,
    "--accent-contrast": c.accentContrast,
    "--line": c.line,
    ...getFontVariables(theme.fontPreset),
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      style={themeVars}
      className={getFontClasses(theme.fontPreset)}
    >
      <body className="font-body bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
