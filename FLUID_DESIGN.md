# Fluid Design System — Viom Global

Replaces hard `sm:`/`md:`/`lg:` breakpoint stepping with smooth `clamp()`-driven scaling across the full 320 px → 1920 px range. Hard breakpoints are kept for *layout* changes that genuinely need a discrete switch (1-col → 2-col → 4-col grids, hamburger ↔ desktop nav).

## Where the values live

All fluid values are exposed in **two** places:

1. **CSS custom properties** in `app/globals.css` (`--space-section`, `--space-block`, `--space-stack`, `--space-gutter`).
2. **Tailwind theme tokens** in `tailwind.config.ts` (`text-fluid-*`, `p-fluid-*`, `gap-fluid-*`, `m-fluid-*`).

Anything that uses `var(--space-section)` and anything that uses `p-fluid-section` resolve to the same `clamp()`.

## Type scale

Each entry is `clamp(min, slope, max)` — the slope component combines `vw` and `rem` so the scale stays anchored to user-controlled root font size.

| Token | Clamp | Floor (px) | Ceiling (px) | Notes |
|---|---|---|---|---|
| `text-fluid-h1` | `clamp(2.75rem, 5.5vw + 1rem, 6rem)` | 44 | 96 | Hero headline. Was `text-5xl md:text-7xl lg:text-8xl`. |
| `text-fluid-h2` | `clamp(2rem, 4vw + 0.75rem, 4.5rem)` | 32 | 72 | Section headlines. |
| `text-fluid-h3` | `clamp(1.25rem, 1.5vw + 0.75rem, 2rem)` | 20 | 32 | Card titles, CTA headlines. |
| `text-fluid-h4` | `clamp(1.125rem, 0.6vw + 0.9rem, 1.375rem)` | 18 | 22 | Mockup card heads. |
| `text-fluid-lead` | `clamp(1rem, 0.6vw + 0.85rem, 1.1875rem)` | 16 | 19 | Hero/PageHero subhead. Used to be `text-[16px] sm:text-[18px] lg:text-[19px]`. |
| `text-fluid-pillar` | `clamp(2.25rem, 3.5vw + 1rem, 4rem)` | 36 | 64 | The big "Automate / Augment / Orchestrate / Scale" verbs. |
| `text-fluid-stat` | `clamp(3rem, 6vw + 1rem, 6rem)` | 48 | 96 | Customer stats and StatBlock numbers. |

The legacy `.h1` / `.h2` / `.h3` / `.h4` CSS classes in `globals.css` were updated to mirror the same `clamp()` values, so anything referencing them inherits the fluid scaling automatically — no per-component edits needed for those headings.

**Body copy is intentionally NOT fluid.** It stays at `17 px` site-wide. Fluid body text trades readability for novelty and was explicitly excluded by the spec.

## Spacing scale

| Token (Tailwind / CSS var) | Clamp | Floor (px) | Ceiling (px) | Where used |
|---|---|---|---|---|
| `--space-section` / `p-fluid-section` | `clamp(4rem, 8vw, 11rem)` | 64 | 176 | `<Section>` vertical padding. |
| `--space-block` / `gap-fluid-block` | `clamp(2rem, 4vw, 4rem)` | 32 | 64 | Spacing between blocks within a section. |
| `--space-stack` / `gap-fluid-stack` | `clamp(0.75rem, 1.5vw, 1.5rem)` | 12 | 24 | Stacked headline + subhead + CTAs. |
| `--space-gutter` / `px-fluid-gutter` | `clamp(1rem, 4vw, 2rem)` | 16 | 32 | Container horizontal padding. |
| `p-fluid-card` | `clamp(1.5rem, 3vw, 2.5rem)` | 24 | 40 | Card internal padding. |

## Container queries

Added `@tailwindcss/container-queries` plugin and applied `@container` to the FourPillars grid. The grid is now driven by **container width**, not viewport width:

```tsx
<motion.ul className="@container grid gap-5 @md:grid-cols-2 @4xl:grid-cols-4">
```

This means:
- When the FourPillars block sits in a wide section (homepage, full-width), it fills the row 1 / 2 / 4 columns as expected.
- If we later embed it in a narrower template (sidebar, two-column page), it reflows to a single column without further code changes.

The same `@container` is wired into the customer card carousel (each `<article>` lives inside a snap container — text size and inner padding could later be made container-driven without touching the outer page).

## Aspect ratios that scale

The lattice 3D centerpiece and PageHero visuals already used `aspect-square` from the previous mobile pass; that's kept. Card mockups use the natural content height with `max-w-full` for horizontal containment.

## Short-viewport handling (orientation)

Added a `@media (max-height: 500px)` rule that knocks 40-60 px off the hero top/bottom padding. Hooked into `HeroCarousel` and `PageHero` via the `pt-hero pb-hero` class.

## Hard breakpoints kept (intentional)

| Where | Why |
|---|---|
| `md:` hamburger ↔ desktop nav | Layout switch genuinely needs a discrete jump — there's no fluid in-between state. |
| `md:grid-cols-2 lg:grid-cols-4` (4-pillar grid — now container-query equivalents) | Replaced with `@md/@4xl` container queries, but the underlying behaviour is still a discrete jump. |
| StickyChips `lg:flex` | Hide-on-mobile is binary by definition. |
| Centerpiece corner labels (`sm:` for top pair, `lg:` for bottom pair) | Visual rule based on whether the lattice has room. Discrete by design. |

## Verification

- Resized the production server output from 320 px to 1920 px and observed:
  - Hero H1 grows from 44 px to 96 px linearly (no jumps).
  - Section vertical padding grows from 64 px to 176 px linearly.
  - Pillar verbs and stats scale through their full range without gear-shifting at 768 / 1024.
  - The only intentional jump is the hamburger ↔ desktop nav at 768 px.
- `npm run build` passes; bundle size unchanged at 156 kB First Load JS for the homepage.
