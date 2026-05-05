# 07 — Quality bar

## Acceptance checklist (per page)

### Visual
- [ ] Headline two-line accent/white split is pixel-correct: same weight, same size, same leading. Only color differs.
- [ ] Eyebrows are mono, uppercase, tracked +0.12em. Never display font.
- [ ] Section padding: 140px desktop / 80px mobile, top **and** bottom.
- [ ] Container max-width 1280px; never wider.
- [ ] All CTAs are pills (fully rounded). Cards are 8/16/24px radius depending on variant.
- [ ] Hairline borders, no drop shadows. The single allowed glow is on primary CTAs.
- [ ] Light break section uses `--color-cream` (not pure white). Cream → ink transitions are abrupt (no gradient blend).

### Motion
- [ ] All easing is `cubic-bezier(0.16, 1, 0.3, 1)`. No spring.
- [ ] Hero load sequence runs in the documented order with the documented offsets.
- [ ] Lattice rotates one full revolution every 40s. Edge pulses fire 6–10 at a time.
- [ ] Tab matrix active pill **slides** between tabs (Framer `layoutId`), never crossfades.
- [ ] Card hover: lift 2px + hairline accent border draws in from left over 300ms.
- [ ] Industry chip hover: brand-green fill, 6° icon rotation, instant text color change.
- [ ] AI chat cursor blinks at 530ms (not 500).
- [ ] Status dots pulse 0.6 ↔ 1.0 over 2s.
- [ ] All scroll-reveals use `once: true`.
- [ ] `prefers-reduced-motion: reduce` degrades correctly (no transforms, no rotation, lattice → static SVG).

### Accessibility
- [ ] Lighthouse a11y score ≥ 95.
- [ ] Every interactive element keyboard-reachable. Focus ring visible (electric-green hairline).
- [ ] Color contrast: text-fg on ink ≥ 7:1, text-fg-mid on ink ≥ 4.5:1.
- [ ] Carousel: pause control + indicators are real `<button>`s with `aria-pressed` / `aria-current`.
- [ ] Tab matrix uses ARIA tabs pattern.
- [ ] Forms have real `<label>` associations, error messages tied via `aria-describedby`.
- [ ] All decorative SVGs (lattice icon corner accents) have `aria-hidden="true"`.
- [ ] Skip-to-content link.

### Performance
- [ ] LCP < 2.0s on simulated 4G.
- [ ] CLS effectively zero. Use `next/font` correctly (no FOUT).
- [ ] Homepage JS bundle < 220 KB gzipped.
- [ ] R3F lattice lazy-loaded, paused offscreen.
- [ ] Images use `next/image` with explicit dimensions.
- [ ] No layout-shifting fonts during hero load.

### SEO
- [ ] Per-page `metadata` export with title, description, openGraph, twitter.
- [ ] `sitemap.ts` and `robots.ts` configured.
- [ ] Structured data on the homepage: `Organization` JSON-LD with logo, sameAs, contactPoint.

## Reject list (recap)
- Purple gradients
- "AI brain" or robot iconography
- Stock photos of people in offices
- Emoji
- Bouncy/spring animations
- Particle starfields
- Glassmorphism beyond the AI chat demo card
- Inter as primary font
- Real human photos composited into 3D
- ServiceNow mentions outside `/products/servicescientist`
- Animated text gradients (shimmer)
- Parallax beyond hero
- Auto-playing background videos
- Cursor trails / tilt-on-mouse cards

## Done = handed back when
- All 9 pages implemented and matching the reference HTML.
- All Lighthouse budgets met on production build.
- No console errors / warnings on any page.
- Lead form writes to Supabase and shows the validated check state.
- Newsletter subscribe writes to Supabase.
- Reduced-motion path tested.
- Tested at 375 / 768 / 1024 / 1280 / 1920 widths. No horizontal scroll at any.
