# 03 — Motion & Interaction Spec

All motion uses one easing: `cubic-bezier(0.16, 1, 0.3, 1)` (token: `--ease-out-expo`). No spring, no bounce.

## Shared variants — `lib/motion.ts`
```ts
export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp = (y = 24, duration = 0.4, delay = 0) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration, ease, delay },
});

export const stagger = (childDelay = 0.06) => ({
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { staggerChildren: childDelay },
});
```

## Hero load sequence
60ms-staggered timeline starting on page mount (not scroll-triggered):

| t (ms) | Event |
|--------|-------|
| 0      | Eyebrow chip: opacity 0→1, y +12→0 (300ms) |
| 60     | First headline phrase: word-by-word fade, 80ms intervals |
| `60 + 80*words + 200` | Second headline phrase: opacity 0→1 (400ms) |
| `…+ 200` | Subhead: opacity 0→1, y +16→0 (400ms) |
| `…+ 200` | Primary CTA: opacity 0→1, scale 0.96→1.0 (300ms) |
| `…+ 80`  | Secondary CTA: same as primary |
| 120 (parallel) | Neural lattice: scale 0.85→1.0 + slow rotation start (600ms) |

## Continuous ambient motion (always running)
- **Neural lattice rotation**: 1 full revolution / 40s on Y axis, 1 / 90s on X axis (Lissajous-like drift).
- **Particle drift around lattice**: random slow paths, 3–5px movement, never crossing the lattice center. Perlin-noise driven.
- **Status dot pulse**: opacity 0.6 → 1.0 → 0.6 over 2s, infinite.
- **AI chat cursor**: opacity 1 ↔ 0 every 530ms (NOT 500ms — the off-by-30ms is what makes it feel like a real terminal).
- **Hero ambient gradient mesh**: `transform` translate cycle, 30s period, ±3% range.

## Scroll-triggered reveals
- Trigger threshold: viewport bottom intersects element top by 15% (`margin: "0px 0px -15% 0px"` in Framer's `viewport` config).
- Headlines: y +24 → 0, opacity 0→1, 400ms.
- Cards in a row: 60ms stagger between siblings.
- Stat numbers: count up from 0 → final over 1.2s with ease-out.
- 4-pillar verbs: each pillar 100ms after previous; verb word scales 0.92→1.0 simultaneously with the card fade-up.
- All reveals fire **once** — never re-trigger on re-entry. (`viewport: { once: true }`)

## Hover micro-interactions

### Pill button (primary/secondary)
- Lifts 1px (`translateY(-1px)`)
- Inner glow brightness +20% (interpolate the box-shadow)
- Arrow icon translates 4px right
- 200ms, all properties

### Card (interactive variant)
- Lifts 2px
- Hairline accent border draws in from left edge over 300ms (use a pseudo-element with `transform-origin: left` + `scaleX` 0→1)
- Border itself fades from line-dark to accent

### Industry chip
- Background fills with `--color-brand` (no animation on the fill — instant 200ms cross-fade is fine)
- Icon rotates 6 degrees
- Text color stays put (it inverts to white because parent bg changed)

### Tab switcher
- Active white pill background uses Framer Motion `layoutId="activeTab"` so it physically slides between positions
- Content panel cross-fades over 200ms

### Animated link underline
- Pseudo-element `::after`: `transform: scaleX(0)`, `transform-origin: left`
- On hover: `transform: scaleX(1)` over 250ms

## Section-enter scan-line
On every `<Section>` enter (viewport intersection):
- A 1px-tall absolute-positioned line of `--color-signal` at 30% opacity travels from top to bottom of the section over 800ms, then disappears.
- `pointer-events: none`, `mix-blend-mode: screen` on dark sections.
- Implementation: pseudo-element with keyframe `top: 0%` → `top: 100%`, triggered via `IntersectionObserver` adding a class.

## Form interactions

### Input focus
- Border color animates from `--color-line-dark` → `--color-focus` over 180ms.
- A small electric-green underline glow appears below at 8% opacity.

### Input validation
- On valid blur: small `<Check />` icon fades in at right side, 300ms.
- On invalid blur: hairline border tints to a desaturated red-orange (use `oklch(0.65 0.12 30)` — never pure red).
- Error message appears below in mono 14px, color matches the border tint.

## Navigation

### Top nav scroll behavior
- Above 80px scroll: nav has a `backdrop-blur-md` + `bg-ink/70` panel + 1px bottom hairline. Transitions in over 300ms.
- Below 80px: transparent.

### Active nav link
- 2px accent-green underline at the bottom of the link, scaleX 0→1 from left, 250ms.

## Reduced motion
```ts
import { useReducedMotion } from "framer-motion";
```
When `prefers-reduced-motion: reduce`:
- Skip all `y`/`scale` transforms; degrade to opacity-only fades at 200ms.
- Stop the lattice rotation; show it static.
- Stop ambient gradient drift.
- Status dot still pulses (it's a key affordance — but lower the contrast range to opacity 0.8 ↔ 1.0 instead of 0.6 ↔ 1.0).
- Cursor blink in chat demo still runs.
- Hover effects still run (those are user-initiated, not ambient).

## Performance budgets
- Total JS bundle for homepage: < 220 KB gzipped.
- The R3F lattice scene: lazy-loaded only when in viewport (`next/dynamic` + `IntersectionObserver`). Show a static SVG poster while loading.
- Framer Motion: import named values (`motion.div`), not the whole library.
- All long-running animations (lattice, gradient mesh) pause when their containers leave viewport.

## What we ban
- Spring physics (`type: "spring"` is forbidden).
- `bounce` easing.
- Animated text gradients / shimmer.
- Particle starfields.
- Parallax beyond the hero.
- Auto-playing videos in backgrounds.
- Cursor trails.
- Tilt-on-mouse cards.
- Glassmorphism anywhere except the AI chat demo card.
