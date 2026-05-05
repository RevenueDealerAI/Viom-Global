# Viom Global — Claude Code Handoff

You are implementing the **Viom Global** marketing website. Viom builds AI automation, LLM copilots, and virtual AI teams for enterprise B2B clients.

## Stack (locked)
- **Next.js 15** (App Router, RSC where possible, `"use client"` only for motion / interactivity)
- **TypeScript** (strict)
- **Tailwind CSS v4** (using `@theme` for tokens — see `tailwind.config.ts` and `app/globals.css`)
- **Framer Motion** (motion/react) for all animations
- **Supabase** (lead form persistence, newsletter)
- **next/font** with Geist + JetBrains Mono (Söhne is licensed; Geist is the open-source substitute)

## Project structure
```
app/
  layout.tsx                # root layout, fonts, sticky right-edge chips
  page.tsx                  # homepage
  globals.css               # tokens via @theme, base styles
  ai-automation/page.tsx
  llm/page.tsx
  virtual-teams/page.tsx
  products/servicescientist/page.tsx
  book-call/page.tsx
  contact/page.tsx
  industries/[slug]/page.tsx
  use-cases/[slug]/page.tsx
components/
  primitives/               # Button, Card, Chip, Input, Eyebrow, etc.
  marketing/                # Hero, FourPillars, TabMatrix, AIChat, etc.
  three/                    # NeuralLattice (R3F) and lattice icon
  motion/                   # shared variants, RevealOnScroll, CountUp
lib/
  motion.ts                 # easings, durations, variants
  supabase.ts
  cms.ts                    # static content for now (typed)
content/
  *.ts                      # typed content modules (no CMS yet)
public/
  brand/                    # logo, favicons, og images
```

## Read these in order
1. `01-design-system.md` — tokens, type scale, spacing, radii, motion vars
2. `02-components.md` — every primitive + marketing component, with prop signatures
3. `03-motion.md` — all easing, stagger, scroll-trigger, hover specs
4. `04-pages.md` — section-by-section content + layout for every page
5. `05-neural-lattice.md` — the signature 3D centerpiece spec
6. `06-content.md` — copy deck (every word that ships)
7. `07-quality-bar.md` — what "done" looks like + reject list

`reference/homepage.html` is the **visual source of truth** — open it in a browser to see the target. When the implementation diverges from this file, the file wins.

## Hard rules (do NOT violate)
- No purple gradients. Ever.
- No "AI brain" / robot iconography.
- No stock photos of people in offices.
- No emoji in production copy.
- No bouncy / spring animations. Easing is `cubic-bezier(0.16, 1, 0.3, 1)` everywhere.
- No particle starfield backgrounds.
- Glassmorphism is used **once**, on the AI chat demo card. Nowhere else.
- ServiceNow may **only** be mentioned on `/products/servicescientist`, and only as a credibility signal in one paragraph.
- Inter is banned as the primary font. Use Geist.
- Don't composite real human photos into 3D gradients.
- The Viom Neural Lattice replaces any "infinity loop" idea — it's our own form.

## Brand voice
Confident, technical, calm. Not loud, not playful, not corporate-stiff. Audience is skeptical enterprise buyers — they respond to clarity, specificity, and technical credibility. Cut every word that doesn't pull weight.

## Definition of done
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- LCP < 2.0s on 4G throttle
- All motion respects `prefers-reduced-motion` (degrade to opacity-only fades, no transforms)
- Keyboard navigable, visible focus rings (electric-green hairline)
- No CLS from font swap (`next/font` handles this — don't break it)
- All forms write to Supabase + show validated check state

When you've finished a page, screenshot it and compare to the reference HTML. If a heading is the wrong weight or a section padding is off, fix it before moving on.
