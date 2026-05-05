# Viom Global

Marketing website for Viom Global — AI automation, LLM copilots, and virtual AI teams for enterprise B2B.

## Stack

- **Next.js 15.5.15** (App Router, RSC by default)
- **React 18.3** + TypeScript strict
- **Tailwind CSS v3.4** with `@tailwindcss/container-queries`
- **Framer Motion 11** for all motion
- **React Three Fiber 9** for the Neural Lattice 3D centerpiece
- **next/font** with Geist + JetBrains Mono

## Run locally

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm start      # serve production build
```

## Project layout

```
app/                  # Next.js App Router routes
  api/lead            # POST /api/lead
  api/newsletter      # POST /api/newsletter
  ai-automation       # /ai-automation
  llm                 # /llm
  virtual-teams       # /virtual-teams
  products/servicescientist
  book-call
  contact
  globals.css         # design tokens + iOS / fluid CSS
  layout.tsx          # root metadata, viewport, fonts, TopNav, Footer, StickyChips
  page.tsx            # homepage
  sitemap.ts | robots.ts | icon.svg | apple-icon.svg
components/
  primitives/         # Container, Section, Button, Chip, Card, Eyebrow, Input, CodeBlock, ArrowGlyph
  marketing/          # TopNav, Footer, HeroCarousel, FourPillars, TabMatrix, AIChatDemo, IndustryGrid, CustomerCarousel, RecognitionStrip, CTABand, Centerpiece, MockupCard, PageHero, StatBlock, StickyChips, LogoStrip, TrustBand, Logo
  three/              # NeuralLattice (R3F) + LatticeIcon (SVG) + LatticeBoundary
  motion/             # Reveal, RevealStagger, CountUp, TypewriterWords
lib/
  motion.ts           # shared easing + variants
  cn.ts               # className helper
public/
  lattice-poster.svg  # SVG fallback for the 3D centerpiece
```

## Browser support

- **Chrome / Edge / Firefox** — current and previous major.
- **iOS Safari 15+** is the practical floor. This unlocks dynamic viewport units (`100dvh`), CSS container queries, `gap` on flexbox, and modern `clamp()` behaviour. iOS 15+ covers ~98 % of active iOS users.
- **macOS Safari 15.4+** for the same reason.

If a future browser-support requirement extends below iOS 15, the following will need fallbacks: dvh units (`globals.css` already provides a `100vh` fallback via `@supports`), `oklch()` color (used once on form-input error border, with hex fallback in place), and CSS container queries (FourPillars and CustomerCarousel — would need to revert to viewport-based breakpoints).

## Deployment

The project is a stock Next.js App Router app and deploys to Vercel without configuration. No `vercel.json` required. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables in Vercel before flipping the form endpoints to write to Supabase (currently they `console.log`).

## Mobile / iOS work

The responsive and Safari-specific work is documented in:

- `MOBILE_AUDIT.md` and `MOBILE_FIXES.md` — Android-friendly breakpoint pass.
- `IOS_AUDIT.md` and `IOS_FIXES.md` — iOS Safari quirks: dvh, safe-area, backdrop-filter prefix, hover-on-touch isolation, tap highlight removal, `<select>` styling, anchor scrolling.
- `FLUID_DESIGN.md` — fluid type/spacing/container-query system.
