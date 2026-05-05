# iOS Safari Fixes — Viom Global

Companion to `IOS_AUDIT.md`. Every fix maps to one or more numbered items in the spec's iOS bug checklist.

## Files modified

1. `app/globals.css` — global iOS rules + safe-area + dvh utility + tap feedback
2. `app/layout.tsx` — `viewport` export, `appleWebApp` metadata, `themeColor`
3. `tailwind.config.ts` — `hoverOnlyWhenSupported`, fluid type/spacing, container queries plugin
4. `package.json` — added `@tailwindcss/container-queries`
5. `components/marketing/TopNav.tsx` — safe-area top, dvh on overlay, prefixed backdrop-filter
6. `components/marketing/StickyChips.tsx` — safe-area right
7. `components/marketing/Footer.tsx` — safe-area bottom
8. `components/marketing/AIChatDemo.tsx` — explicit `WebkitBackdropFilter`
9. `components/marketing/HeroCarousel.tsx` — `pt-hero/pb-hero` short-viewport hooks + fluid lead
10. `components/marketing/PageHero.tsx` — same
11. `components/marketing/FourPillars.tsx` — `@container` queries + fluid pillar verb
12. `components/marketing/CustomerCarousel.tsx` — overscroll-contain + fluid stat
13. `components/marketing/TabMatrix.tsx` — overscroll-contain on tab pill row
14. `components/marketing/StatBlock.tsx` — fluid stat type
15. `components/primitives/CodeBlock.tsx` — overscroll-contain on `<pre>`
16. `README.md` — iOS support floor

## Mapping fixes to the spec checklist

### 1. `100vh` viewport bug
- Added `.min-h-screen-safe` and `.h-screen-safe` utilities in `globals.css` that use `100dvh` with a `100vh` legacy fallback.
- Applied `min-h-screen-safe` to the mobile menu overlay so it no longer clips under the iOS Safari address bar.

### 2. Sticky / fixed positioning inside transformed parents
- Audited every `fixed` element. None lives inside a transformed ancestor, so no restructuring required.
- Added `top: var(--safe-top)` to the TopNav, `right: max(1rem, var(--safe-right))` to StickyChips, and `padding-bottom: max(2.5rem, var(--safe-bottom))` to the Footer so the iPhone notch / Dynamic Island / home indicator never overlaps content.

### 3. Form input focus zoom
- Global rule in `globals.css`: `input, textarea, select { font-size: max(16px, 1rem); }`. Belt-and-suspenders on top of the per-component 16-px floor already in place.

### 4. `<select>` styling
- Global rule: `select { -webkit-appearance: none; appearance: none; }` plus a tiny inline-SVG chevron via `background-image` so iOS doesn't render its native rounded-rect.

### 5. Smooth scroll on anchor links
- `html { scroll-behavior: smooth; }` in `globals.css`. Wrapped in `@media (prefers-reduced-motion: reduce)` to fall back to instant scroll for users who request it. Targeting iOS 15+ means `scroll-behavior: smooth` is fully supported, so no JS fallback needed.

### 6. `backdrop-filter` rendering
- Added a CSS layer rule that pairs every `[class*="backdrop-blur"]` element with `-webkit-backdrop-filter: var(--tw-backdrop-blur)`.
- For the AIChatDemo glass card and the mobile menu overlay (which use inline `style={{ backdropFilter }}` instead of the Tailwind utility), added an explicit `WebkitBackdropFilter` key to the inline style.

### 7. `gap` on flexbox
- Documented as "iOS 15+ supports gap on flex" — no fallback added, README updated to note the iOS 15 floor.

### 8. Tap highlight color
- Global rule: `*, *::before, *::after { -webkit-tap-highlight-color: transparent; }`.
- Added a touch-only `:active` block scoped via `@media (hover: none) and (pointer: coarse)` that gives `button`, `a`, and `[role="button"]` a subtle `translateY(1px) scale(0.99)` for ~80 ms — replaces the gray flash with deliberate feedback.

### 9. Bounce / overscroll
- Added `.overscroll-contain-x` and `.overscroll-contain-y` utilities in `globals.css`.
- Applied `overscroll-contain-x` to the TabMatrix tab-pills scroller, the CustomerCarousel snap container, and `<CodeBlock>`'s `<pre>`. Applied `overscroll-contain-y` to the mobile menu overlay.
- **Not** applied to `body / html` — preserving native pull-to-refresh per spec.

### 10. Fixed elements in transformed parents
- Audit confirmed clean (see §2). No structural changes required.

### 11. `text-size-adjust`
- `html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }` in `globals.css`.

### 12. Hover lag on touch devices
- Tailwind config: `future: { hoverOnlyWhenSupported: true }`. Now every `hover:` utility compiles to `@media (hover: hover) and (pointer: fine)`, so hover effects can never fire on a tap.
- Touch-only `:active` rules added (see §8) for explicit tap feedback.

### 13. Safe-area insets
- CSS variables `--safe-top / --safe-right / --safe-bottom / --safe-left` defined in `:root`, falling back to `0px`.
- Applied to `TopNav` (top), `StickyChips` (right), `Footer` (bottom), and the mobile overlay (top + bottom).

### 14. PWA / home-screen meta
- Added `export const viewport` in `app/layout.tsx` with `viewportFit: "cover"`, `themeColor: "#0A1614"`, `userScalable: true`, `maximumScale: 5` (accessibility per spec — no zoom block).
- Added `appleWebApp: { capable: true, title: "Viom Global", statusBarStyle: "black-translucent" }` to `metadata`.
- The existing `app/apple-icon.svg` (180×180) is wired through `metadata.icons.apple`. Apple's older devices may prefer PNG; for a marketing site the SVG path is sufficient and Next.js generates the `apple-touch-icon` link tag automatically.

### 15. `<picture>` / Next.js Image
- The codebase doesn't use `next/image`; the lattice is R3F + an SVG poster. No `sizes`-prop work required.

### Short-viewport hero (orientation handling)
- Added `@media (max-height: 500px) { .pt-hero { padding-top: 80px !important; } .pb-hero { padding-bottom: 40px !important; } }` and tagged `HeroCarousel` and `PageHero` with `pt-hero pb-hero`. iPhones in landscape (≤ 500 px tall) drop their hero padding so the headline + CTA stay above the fold.

## Decisions not specified in the brief

1. **`html { scroll-behavior: smooth; }` instead of a JS fallback.** Targeting iOS 15+ (which fully supports it) makes the JS approach unnecessary code weight. Reduced-motion users still get instant scroll because the rule is wrapped in a media query.
2. **Apple touch icon stays as SVG.** Next.js File-based Metadata will serve `apple-icon.svg` correctly; older iOS versions that prefer PNG can degrade to the standard favicon. Adding a 180×180 PNG would mean introducing an image-processing step or a binary that doesn't round-trip through git cleanly.
3. **`maximumScale: 5`** — keeps zoom enabled per accessibility guidance; the spec explicitly forbade `userScalable: no`.
4. **No `theme-color` per-scheme variants.** The whole site is dark-mode-first; one `#0A1614` covers all paths.
5. **CSS custom-property safe-area indirection** (`--safe-top` etc.) instead of inlining `env(...)` everywhere. Makes future changes to safe-area handling a single-file edit.
6. **Tap feedback as `translateY + scale`, not background flash.** Spec asked for an "intentional active state". The 1-px translate + 0.99 scale is the minimum noticeable feedback that won't feel sluggish.

## Verification

- `npm run build` passes; homepage First Load JS = **156 kB** (unchanged from previous build).
- All routes rendered (15 routes), no TypeScript errors.
- No new runtime dependencies — only `@tailwindcss/container-queries` (build-time, no runtime weight).
