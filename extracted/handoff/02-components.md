# 02 — Component Library

Every component listed here lives at the path shown. Props are TypeScript signatures. All are SSR-safe unless they explicitly need `"use client"` (marked 🎬).

## Primitives

### `<Container>` — `components/primitives/Container.tsx`
```ts
type Props = { children: React.ReactNode; className?: string; }
```
Wraps content at `max-w-[1280px]` with `px-[clamp(20px,5vw,32px)]`. Use inside every section.

### `<Section>` — `components/primitives/Section.tsx`
```ts
type Props = {
  tone?: "dark" | "light";        // default "dark"
  children: React.ReactNode;
  className?: string;
  id?: string;
}
```
Sets background (ink for dark, cream for light), foreground color, and applies `py-[var(--space-section)]`. Includes the section-enter scan-line motion (see motion spec).

### `<Button>` — `components/primitives/Button.tsx`
```ts
type Props = {
  variant: "primary" | "secondary" | "ghost-link";
  href?: string;                   // renders <a>; otherwise <button>
  children: React.ReactNode;
  arrow?: boolean;                 // default true for primary/secondary
  onClick?: () => void;
}
```
- **primary**: `bg-accent text-ink` filled pill, inner glow, arrow translates 4px right on hover, lifts 1px.
- **secondary**: transparent fill, 1px `border-accent`, `text-accent`, same hover.
- **ghost-link**: text only with animated underline (left-to-right draw, 250ms).

### `<Chip>` — `components/primitives/Chip.tsx`
```ts
type Props = {
  variant?: "eyebrow" | "industry" | "status";
  pulse?: boolean;                 // status dot pulse
  icon?: React.ReactNode;
  children: React.ReactNode;
}
```
- **eyebrow**: mono uppercase 12px, tracked, optional pulsing electric-green dot prefix.
- **industry**: stadium pill, light card bg, hairline border, small green outline icon, inverts to brand-green fill + white text + 6° icon rotation on hover.
- **status**: small pill with pulsing signal dot — used on customer story "Live" badges.

### `<Card>` — `components/primitives/Card.tsx`
```ts
type Props = {
  variant?: "default" | "elevated" | "interactive" | "mockup";
  children: React.ReactNode;
  className?: string;
}
```
- **default**: `bg-card`, hairline border, `rounded-[8px]`.
- **elevated**: `rounded-[16px]`, slightly brighter surface (`bg-elev`).
- **interactive**: hover draws hairline accent border in from left edge over 300ms; lifts 2px.
- **mockup**: `rounded-[24px]`, single soft inner glow, slight teal gradient mesh background.

### `<Eyebrow>` — `components/primitives/Eyebrow.tsx`
```ts
type Props = { dot?: boolean; children: React.ReactNode; }
```
Mono 12px uppercase tracked, optional pulsing dot. Used above section H2s and on 4-pillar cards.

### `<Input>` — `components/primitives/Input.tsx` 🎬
```ts
type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  validated?: boolean;
}
```
Dark surface, hairline border, label in mono. Border animates from line-dark to accent on focus over 180ms. When `validated`, a small electric-green check fades in at the right edge.

### `<CodeBlock>` — `components/primitives/CodeBlock.tsx`
```ts
type Props = { language: string; code: string; }
```
Dark surface, traffic-light dots top-left (decorative — three small circles, the leftmost in #FF5F57, then #FEBC2E, then #28C840 — but render them tonally muted to fit dark theme: use 30% opacity desaturated versions). Mono 14px, syntax highlighted via Shiki at build time.

### `<ArrowGlyph>` — `components/primitives/ArrowGlyph.tsx`
Custom SVG, 1.5px stroke, rounded caps. Used everywhere a → appears in UI (not in body copy).

## Marketing components

### `<TopNav>` — `components/marketing/TopNav.tsx` 🎬
- Viom logo (left), nav links (Products / Industries / Solutions / Resources / Company) center, "Sign In" + "Book a Call" right.
- Active link: 2px accent-green underline draws in.
- On scroll past 80px, nav background blurs in (`backdrop-blur-md` + `bg-ink/70`) over 300ms.

### `<HeroCarousel>` — `components/marketing/HeroCarousel.tsx` 🎬
- 3 slides, 7s per slide, auto-advance.
- Pause control + 3 dot indicators bottom-left of the hero. Active dot is `--color-signal`.
- Each slide: split layout with two-line headline left, subhead + CTAs right, neural lattice on far right.
- Word-by-word fade-in on first headline (80ms intervals); second phrase fades in 200ms after first completes.
- Pauses on focus or hover.

### `<NeuralLattice>` — `components/three/NeuralLattice.tsx` 🎬
See `05-neural-lattice.md` for full spec. R3F-based, lazy-loaded with `next/dynamic({ ssr: false })`.

### `<TrustBand>` — `components/marketing/TrustBand.tsx`
3 horizontal customer outcome cards (placeholder abstract compositions for now).

### `<LogoStrip>` — `components/marketing/LogoStrip.tsx`
Mono eyebrow `// TRUSTED BY TEAMS BUILDING THE FUTURE`. 6 monochrome white wordmarks, uniform 24px height. Subtle ambient gradient mesh behind.

### `<Centerpiece>` — `components/marketing/Centerpiece.tsx`
Hosts the big NeuralLattice with two corner labels ("ENTERPRISE" top-left, "AI-NATIVE" top-right) and the centered overlay capsule pill: `Automation + Intelligence + Workflows + Trust` — dark teal pill, electric-green hairline border, white text.

### `<FourPillars>` — `components/marketing/FourPillars.tsx`
The "ANY X / VERB" capability framework. Renders 4 cards in a row from data:
```ts
const pillars = [
  { eyebrow: "ANY DATA",     verb: "Automate",    desc: "..." },
  { eyebrow: "ANY AI MODEL", verb: "Augment",     desc: "..." },
  { eyebrow: "ANY WORKFLOW", verb: "Orchestrate", desc: "..." },
  { eyebrow: "ANY SYSTEM",   verb: "Scale",       desc: "..." },
];
```
Each card: small electric-green dot, mono eyebrow, chunky 64px verb (white, semi-bold), 3-line desc, arrow link. On scroll: 100ms-staggered reveal, verb word scales 0.92→1.0.

### `<TabMatrix>` — `components/marketing/TabMatrix.tsx` 🎬
Pill tab switcher (5 tabs). Active pill is white-filled with dark text. The white pill background **slides** to the new active position via `layoutId` (Framer Motion's shared-layout) — never crossfades.
Below: split layout. Left = headline + desc + CTA + 4-5 arrow-bullet feature list. Right = `<MockupCard>` (changes per tab).

### `<MockupCard>` — `components/marketing/MockupCard.tsx`
24px-radius card with subtle inner glow. Renders an abstract product representation — a chat bubble with mono header `Incident summarized by AI` + structured action list. NOT a screenshot. Each tab swaps which mockup shows.

### `<AIChatDemo>` — `components/marketing/AIChatDemo.tsx` 🎬
The single glassmorphism card. Shows a pre-loaded prompt, then streams a response in mono with a real 530ms cursor blink. Response includes 3 bullets with electric-green check glyphs. Below the card: `Try it yourself →` pill scrolls to a live input.

### `<IndustryGrid>` — `components/marketing/IndustryGrid.tsx`
Two rows of stadium-pill industry chips on the **light** break section. 12 industries total. Each chip uses `<Chip variant="industry">`.

### `<CustomerCarousel>` — `components/marketing/CustomerCarousel.tsx` 🎬
3 horizontally-scrolling case study cards. Each: huge mono outcome stat (e.g. `↓ 73%`), one-line caption, customer logo, `Read story →` link. Carousel controls bottom-right: pause / prev / next as circle outline buttons.

### `<RecognitionStrip>` — `components/marketing/RecognitionStrip.tsx`
4 dark cards in a row. Each: mono category label, recognition title, small detail line.

### `<CTABand>` — `components/marketing/CTABand.tsx`
Final-conversion block. Two-line accent/white headline, two pill CTAs side by side, mono footnote, ambient lattice drifting in background at low opacity.

### `<Footer>` — `components/marketing/Footer.tsx`
4-column links + newsletter signup with mono input. Bottom strip: copyright, SOC 2 badge, mono version tag `viom.global · v2026.05`.

### `<StickyChips>` — `components/marketing/StickyChips.tsx`
Sticky right-edge floating chips ("Contact" / "Demo"). Always visible across all pages. Slot into root layout, not page bodies.

## Motion utilities

### `<Reveal>` — `components/motion/Reveal.tsx` 🎬
```ts
type Props = {
  y?: number;             // default 24
  delay?: number;         // ms
  children: React.ReactNode;
}
```
Wraps content. Uses `useInView` (15% threshold, once). Translates from `y` to 0, fades 0→1 over 400ms with `--ease-out-expo`.

### `<RevealStagger>` — `components/motion/RevealStagger.tsx` 🎬
Wrap a row of items; staggers children by `staggerMs` (default 60).

### `<CountUp>` — `components/motion/CountUp.tsx` 🎬
Counts a number from 0 to target over 1.2s with ease-out, triggered when in view. Used in stat blocks.

### `<TypewriterWords>` — `components/motion/TypewriterWords.tsx` 🎬
Reveals text word-by-word at fixed interval. Used for hero first-line phrase.

## Accessibility contracts (per component)
- `Button` always has accessible name; icon-only variants require `aria-label`.
- `HeroCarousel` exposes pause/play as a real `<button aria-pressed>`. Indicators are `<button>`s with `aria-current="true"` on active.
- `TabMatrix` uses ARIA tabs pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`).
- `Input` always has a real `<label>` association.
- `prefers-reduced-motion`: every `Reveal`/`CountUp`/`TypewriterWords` checks the media query and degrades to instant render.
