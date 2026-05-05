# 09 — Build order & checklist for Claude Code

Tackle these in order. Don't skip ahead — later phases depend on earlier scaffolding.

## Phase 1 — Foundation (Day 1)
- [ ] `npx create-next-app@latest viom-global --ts --tailwind --app --src-dir=false --eslint`
- [ ] Replace `tailwind.config.ts` with the minimal v4 version from `08-scaffold.md`
- [ ] Replace `app/globals.css` with the `@theme` block from `08-scaffold.md`
- [ ] Add `next/font` setup to `app/layout.tsx`
- [ ] Install dependencies (versions pinned in `08-scaffold.md`)
- [ ] Set up Supabase project, run migrations, copy keys to `.env.local`
- [ ] Verify dev server boots clean: `npm run dev`

## Phase 2 — Primitives (Day 1–2)
Build & visually verify each in isolation (`/sandbox` route is fine):
- [ ] `<Container>`, `<Section>`
- [ ] `<Button>` (3 variants) — match the reference HTML exactly: glow, lift, arrow translation
- [ ] `<Chip>` (3 variants) — pulse animation working
- [ ] `<Card>` (4 variants) — hover hairline draw-in working
- [ ] `<Eyebrow>`, `<Input>`, `<CodeBlock>`, `<ArrowGlyph>`
- [ ] `<Reveal>`, `<RevealStagger>`, `<CountUp>`, `<TypewriterWords>`

## Phase 3 — Marketing components (Day 2–3)
- [ ] `<TopNav>` with scroll behavior
- [ ] `<StickyChips>`
- [ ] `<Footer>`
- [ ] `<HeroCarousel>` with auto-advance, pause, indicators
- [ ] `<LogoStrip>`
- [ ] `<TrustBand>`
- [ ] `<FourPillars>` with staggered reveal
- [ ] `<TabMatrix>` — **critical**: the sliding active pill must use `layoutId`, not crossfade
- [ ] `<MockupCard>` (one variant per tab)
- [ ] `<AIChatDemo>` — the 530ms cursor blink is non-negotiable
- [ ] `<IndustryGrid>`
- [ ] `<CustomerCarousel>`
- [ ] `<RecognitionStrip>`
- [ ] `<CTABand>`

## Phase 4 — Neural Lattice (Day 3–4)
- [ ] Build `components/three/NeuralLattice.tsx` per `05-neural-lattice.md`
- [ ] Build static SVG poster `public/lattice-poster.svg`
- [ ] Lazy-load via `next/dynamic({ ssr: false })`
- [ ] Verify FPS: should hold 60fps on a 2020 MacBook, 30fps on iPhone 12
- [ ] Verify pause-when-offscreen works (`frameloop="demand"`)
- [ ] Verify reduced-motion path: shows the SVG, no R3F mounted
- [ ] Build `components/three/LatticeIcon.tsx` (pure SVG, used as logo + favicon)

## Phase 5 — Homepage (Day 4–5)
Wire all the components into `app/page.tsx` per `04-pages.md`. Compare side-by-side against `reference/homepage.html`. Specific checks:
- [ ] Section padding rhythm matches
- [ ] Two-line accent/white headline pattern is identical across all H1s and H2s
- [ ] Hero load sequence runs at the right offsets
- [ ] Light break section renders cream, not white
- [ ] Sticky chips are always visible, never overlap content
- [ ] Centerpiece capsule pill stays static while lattice rotates underneath

## Phase 6 — Inner pages (Day 5–7)
- [ ] AI Automation
- [ ] LLM
- [ ] Virtual Teams
- [ ] ServiceScientist (only page that mentions ServiceNow — and only in one paragraph)
- [ ] Book Call (Calendly embed wired up)
- [ ] Contact (form writing to Supabase)
- [ ] Use Case template + 1 sample use case
- [ ] Industry template + 1 sample industry

## Phase 7 — Forms & lead capture (Day 7)
- [ ] Book Call form posts to Supabase `leads` table with `source: 'book-call'`
- [ ] Contact form posts to `leads` with `source: 'contact'`
- [ ] Newsletter posts to `newsletter` table
- [ ] Validation states: error + validated check
- [ ] Success states render the confirmation copy from `06-content.md`
- [ ] Honeypot field for bots
- [ ] Rate limiting (Supabase RLS policies + middleware)

## Phase 8 — Quality & polish (Day 8)
Run `07-quality-bar.md` end to end:
- [ ] Lighthouse on every page ≥ 90/95/95/95
- [ ] LCP < 2.0s on Slow 4G
- [ ] Bundle size budget met
- [ ] Reduced motion tested
- [ ] Keyboard nav tested (Tab through every page, no traps, focus rings visible)
- [ ] 375 / 768 / 1024 / 1280 / 1920 widths — no horizontal scroll, no broken layouts
- [ ] All console clean (no warnings)
- [ ] OG images generated for each page
- [ ] `sitemap.ts` + `robots.ts` correct
- [ ] Analytics: Plausible or PostHog wired (event names: `cta_clicked`, `lead_submitted`, `newsletter_subscribed`)

## Phase 9 — Deploy
- [ ] Deploy to Vercel
- [ ] Set production env vars
- [ ] Connect custom domain
- [ ] Verify SSL
- [ ] Smoke test forms in production
- [ ] Set up Vercel Analytics + Speed Insights

## When you're stuck
- The reference HTML at `reference/homepage.html` is the visual source of truth. Open it in a browser. If your implementation diverges, the reference wins unless you've explicitly cleared the change with the design lead.
- For motion specifics, `03-motion.md` has the exact easings, durations, and triggers.
- For copy, `06-content.md` is canonical. Don't paraphrase.
- For the lattice, `05-neural-lattice.md` has the full R3F spec.
- The reject list in `07-quality-bar.md` is non-negotiable.
