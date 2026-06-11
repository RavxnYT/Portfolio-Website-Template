# AURA — Premium Portfolio Template

A config-driven, award-grade portfolio template. Built to be **re-skinned for a new customer in under an hour**: one config file controls identity, colors, fonts, the 3D hero and which sections render.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText · Lenis smooth scroll · React Three Fiber + drei

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## The 10-minute customer checklist

Everything lives in two places: `config/site.config.ts` (settings) and `config/content/` (content).

| Step | File | What to change |
| --- | --- | --- |
| 1. Identity | `config/site.config.ts` → `identity` | Name, logo text, role, email, phone, location, timezone, availability |
| 2. SEO | `config/site.config.ts` → `seo` | Title, description, URL, OG image |
| 3. Brand color | `config/site.config.ts` → `theme.colors` | Swap `accent` (presets in the comments). Dark and light themes both work |
| 4. Fonts | `config/site.config.ts` → `theme.fontPreset` | `"modern"`, `"editorial"` or `"brutalist"` |
| 5. Hero | `config/site.config.ts` → `hero` | Headline lines, sub-line, 3D variant |
| 6. Sections | `config/site.config.ts` → `sections` | Toggle blocks on/off for this customer |
| 7. Projects | `config/content/projects.ts` | Their work + case study copy + images |
| 8. Everything else | `config/content/*.ts` | About, services, gallery, skills, team, testimonials |
| 9. Images | `public/images/` | Drop customer images, reference as `/images/x.jpg` |
| 10. Favicon | `app/icon.svg` | Recolor / replace the mark |

> Demo images are hot-linked from Unsplash so the template works with zero assets. **Replace them with the customer's own images for production.**

---

## Hero 3D variants

Set `hero.variant` in the config:

| Variant | Look | Best for |
| --- | --- | --- |
| `particles` | Swirling galaxy of points | Tech, developers, "digital" brands |
| `blob` | Liquid chrome metaball (default) | Studios, designers, premium feel |
| `rings` | Metallic gyroscope rings | Agencies, engineering, products |
| `model` | **Your own .glb file** | Product showcases, mascots |

For `model`: put the file in `public/models/`, set `modelPath: "/models/thing.glb"` and tune `modelScale`. If the model fails to load the blob renders as a fallback. All variants run on procedural lighting — no HDR downloads, works offline.

---

## Section catalog (toggle each in config)

- **Hero** — kinetic char-by-char headline over the 3D scene, scroll choreography
- **Marquee** — infinite strip that speeds up/skews with scroll velocity
- **About** — sticky portrait, masked line reveals, animated stat counters
- **Projects** — pinned horizontal-scroll showcase → case study pages (`/work/[slug]`)
- **Services** — sticky stacking cards (deck-of-paper effect)
- **Gallery** — parallax masonry columns + keyboard-friendly lightbox (photographers)
- **Skills** — interactive capabilities index (developers)
- **Team** — hover-reveal member cards (agencies)
- **Testimonials** — drag/inertia slider with snap
- **Contact** — giant CTA, magnetic buttons, working form (`/api/contact`)
- **Footer** — fixed under the page, revealed as the site scrolls away, live local time

Global experience: preloader with counter, custom cursor with context labels, curtain page transitions, scroll progress bar, film-grain overlay — each can be disabled in `features`.

---

## Contact form

`app/api/contact/route.ts` validates and logs inquiries. To send real email, wire Resend (snippet inside the file) or point the form at Formspree and delete the route.

---

## Performance & accessibility

- 3D canvas is dynamically imported (no SSR), DPR-capped, pauses updates offscreen, falls back to a CSS gradient without WebGL
- Only the chosen font pairing is loaded
- `prefers-reduced-motion` disables heavy animation throughout
- Custom cursor auto-disables on touch devices
- Semantic landmarks, aria labels, keyboard support in menu/lightbox/slider

## Deploy

Push to GitHub → import in [Vercel](https://vercel.com) → done. The site is static except the contact route.

---

## Project map

```
config/
  site.config.ts        ← the customer file (settings)
  content/              ← the customer files (content)
app/
  layout.tsx            ← metadata + theme vars from config
  page.tsx              ← section renderer
  work/[slug]/page.tsx  ← case studies
  api/contact/route.ts  ← form endpoint
components/
  experience/           ← preloader, cursor, menu, transitions, lenis
  canvas/               ← 3D hero variants
  sections/             ← every toggleable block
  ui/                   ← magnetic, links, headings
lib/                    ← gsap setup, fonts, animation hooks
```
