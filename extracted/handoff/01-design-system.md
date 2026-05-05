# 01 — Design System

All tokens live in `app/globals.css` under `@theme`, exposed as Tailwind utilities and CSS custom properties. Do not hardcode values in components — reference tokens.

## Color tokens

```css
@theme {
  /* Surfaces — dark (primary) */
  --color-ink:           #0A1614;  /* primary background, slightly green-shifted */
  --color-elev:          #0F1B18;  /* elevated surface */
  --color-card:          #131F1B;  /* card surface (dark) */

  /* Surfaces — light (break sections only) */
  --color-cream:         #FAFAF7;  /* warm off-white background */
  --color-paper:         #FFFFFF;  /* light card surface */

  /* Brand greens */
  --color-brand:         #0B5F4A;  /* primary brand green */
  --color-accent:        #4ADE80;  /* bright accent green — headline split, primary CTA fill */
  --color-signal:        #00FFA3;  /* electric mint — hover, status dots, micro-moments only */

  /* Text — dark mode */
  --color-fg:            #F2F5F3;  /* high contrast on dark */
  --color-fg-mid:        #A8B2AE;
  --color-fg-low:        #5C6660;

  /* Text — light mode */
  --color-fg-on-light:   #0A1614;

  /* Hairlines */
  --color-line-dark:     rgb(255 255 255 / 0.06);
  --color-line-light:    rgb(10 22 20 / 0.08);

  /* Focus */
  --color-focus:         #4ADE80;
}
```

### Usage rules
- `--color-signal` (#00FFA3) is **strictly** for: hover-state intensification, the pulsing status dot in eyebrow chips, the cursor in the AI chat demo, validated form check, the "Live" status chip on customer cards. **Never** as a fill color, never as headline color.
- `--color-accent` (#4ADE80) is **the** headline accent and primary CTA fill. Always paired with dark text on the CTA.
- `--color-brand` (#0B5F4A) appears mostly in hover-fill states (industry chip invert) and as the dark-teal pill capsule background on the centerpiece.
- The light break section uses `--color-cream`, never pure white as the section background. Cards inside it can be `--color-paper`.

## Typography

```ts
// app/layout.tsx
import { Geist, JetBrains_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-display", weight: ["400","500","600","700"] });
const mono  = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });
```

Tailwind extension:
```ts
fontFamily: {
  display: ["var(--font-display)", "system-ui", "sans-serif"],
  mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
}
```

### Type scale

| Role     | Desktop      | Mobile     | Weight | Tracking | Leading |
|----------|--------------|------------|--------|----------|---------|
| H1 hero  | 96px / 6rem  | 48px       | 600    | -0.025em | 1.02    |
| H1       | 84px         | 48px       | 600    | -0.025em | 1.04    |
| H2       | 56px         | 40px       | 600    | -0.022em | 1.06    |
| H3       | 32px         | 26px       | 600    | -0.018em | 1.15    |
| H4       | 22px         | 20px       | 600    | -0.012em | 1.25    |
| Body L   | 19px         | 17px       | 400    | -0.005em | 1.6     |
| Body     | 17px         | 16px       | 400    | -0.003em | 1.6     |
| Body S   | 15px         | 14px       | 400    |  0       | 1.55    |
| Eyebrow  | 12px         | 12px       | 500    | 0.12em   | 1       |
| Code     | 14px         | 13px       | 400    | 0        | 1.55    |

- Eyebrows are **always** mono, uppercase, tracked +0.12em.
- Headlines NEVER use mono.
- Body NEVER uses mono.
- Two-line accent split pattern: same weight, same size, same leading; only color differs.

### Headline two-line split (canonical)
```tsx
<h1 className="font-display font-semibold text-[96px] leading-[1.02] tracking-[-0.025em]">
  <span className="block text-accent">Put AI to work</span>
  <span className="block text-fg">across your enterprise</span>
</h1>
```

## Spacing scale

Tailwind defaults are fine. Section-level rhythm is fixed:

| Token              | Desktop | Mobile |
|--------------------|---------|--------|
| `--space-section`  | 140px   | 80px   |
| `--space-block`    | 64px    | 40px   |
| `--space-stack`    | 24px    | 20px   |

Container: `max-width: 1280px`, horizontal padding `clamp(20px, 5vw, 32px)`.

12-column grid via `grid-cols-12 gap-6`.

## Radii

```css
--radius-pill:  9999px;  /* all CTA buttons, chips, tab pills */
--radius-card:  8px;     /* default cards */
--radius-card-lg: 16px;  /* elevated cards (recognition, customer story) */
--radius-mockup: 24px;   /* floating UI mockups, AI chat demo */
```

## Borders & elevation

- Hairline borders only: `1px solid var(--color-line-dark)` on dark, `var(--color-line-light)` on light.
- No drop shadows on cards. The lift-on-hover effect is purely transform + border accent.
- The single allowed glow: primary CTA inner glow at 8% opacity (`box-shadow: inset 0 0 0 1px rgb(74 222 128 / 0.08), 0 0 24px -8px rgb(74 222 128 / 0.4)`).
- AI chat demo card uses `backdrop-filter: blur(24px) saturate(140%)` + `background: rgb(19 31 27 / 0.6)` — this is the **only** glassmorphism on the entire site.

## Motion tokens

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
--dur-fast:       180ms;
--dur-base:       300ms;
--dur-slow:       400ms;
--dur-reveal:     400ms;
--dur-hover:      200ms;
```

All transitions use `--ease-out-expo`. No spring physics. See `03-motion.md`.

## Iconography

- Icons are 1.25–1.5px stroke, rounded line caps, filled with `currentColor`. Lucide is fine as a base; subset to what we use.
- Industry chip icons: small green outline (`var(--color-brand)` stroke, no fill) on light section. They invert to white on hover.
- The arrow glyph for feature bullets and "Read story →" links is the **same** custom glyph everywhere — a thin right-pointing chevron with a horizontal stem (`→`-style but custom-drawn). Component: `<ArrowGlyph />`.

## Grid debug
Add `?grid` to any URL in development to overlay a 12-col grid. Implementation: read `useSearchParams` in `<Container>`.
