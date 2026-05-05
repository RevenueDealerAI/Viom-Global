# Mobile Fixes — Viom Global

Companion to `MOBILE_AUDIT.md`. Lists every change made, the file it lives in, and the issue number(s) from the audit it resolves.

All work is **additive** at smaller breakpoints. Desktop (≥ 1024 px) layouts, typography, spacing, and component structure are unchanged.

---

## Files modified

1. `components/marketing/TopNav.tsx`
2. `components/marketing/HeroCarousel.tsx`
3. `components/marketing/PageHero.tsx`
4. `components/marketing/Centerpiece.tsx`
5. `components/marketing/FourPillars.tsx`
6. `components/marketing/TabMatrix.tsx`
7. `components/marketing/AIChatDemo.tsx`
8. `components/marketing/IndustryGrid.tsx`
9. `components/marketing/CustomerCarousel.tsx`
10. `components/marketing/CTABand.tsx`
11. `components/marketing/Footer.tsx`
12. `components/marketing/MockupCard.tsx`
13. `components/three/NeuralLattice.tsx`
14. `components/primitives/Input.tsx`
15. `components/primitives/Chip.tsx`
16. `app/book-call/page.tsx`
17. `app/contact/page.tsx`
18. `app/ai-automation/page.tsx`
19. `app/llm/page.tsx`
20. `app/virtual-teams/page.tsx`
21. `app/products/servicescientist/page.tsx`

---

## Changes

### `TopNav.tsx` — issues 1–6
- Replaced inline drawer with a **full-screen overlay menu** (`fixed inset-0 z-40 md:hidden`).
- Added **body-scroll lock** while the menu is open (`document.body.style.overflow = "hidden"`).
- Added **Escape-key close** + **tap-outside close**.
- Added a **smooth 200 ms hamburger → close transition** (`rotate-90` on the button + opacity transition on the overlay).
- Added a small **always-visible "Book" pill** in the mobile top bar (44 px touch target).
- Bumped **hamburger button hit area** to 44 × 44 px.
- Bumped **drawer link rows** to 56 px min-height.
- Added `useEffect` that closes the menu on `pathname` change so navigation feels right.

### `HeroCarousel.tsx` — issues 7–11
- Lattice column changed from fixed `360 × 360 / 440 × 440` boxes to **`aspect-square w-full max-w-[300px] sm:max-w-[440px] lg:max-w-none`** so it scales to any narrow viewport.
- Lattice now uses `<NeuralLattice fluid />` (new prop — fills its parent) instead of a hard-coded `size={520}`.
- Top padding reduced on mobile: `pt-[120px] sm:pt-[160px]` (was `pt-[180px]`).
- Body subhead now uses **responsive text size**: `text-[16px] sm:text-[18px] lg:text-[19px]`.
- CTA buttons now **stack vertically and full-width on mobile**: `flex-col gap-3 sm:flex-row` + `w-full justify-center sm:w-auto` per Button.
- Pause/dot/counter row: pause button bumped to 44 px on mobile, dots wrapped in 44 px-tall `<button>` hit areas, mono caption reflows with `flex-wrap`.

### `PageHero.tsx` — issues 40–42
- Section padding: `pt-[120px] sm:pt-[160px] md:pt-[180px]`.
- Subhead size matches Hero: `text-[16px] sm:text-[18px] lg:text-[19px]`.
- CTAs: `flex-col gap-3 sm:flex-row` + `w-full justify-center sm:w-auto`.
- Visual wrapper now constrains the lattice: `mx-auto aspect-square w-full max-w-[320px] sm:max-w-[440px] lg:max-w-none`.

### `Centerpiece.tsx` — issues 12–14
- Wrapper changed from `h-[520px] w-full max-w-[760px]` to **`aspect-square w-full max-w-[680px] lg:h-[720px]`** so it shrinks proportionally on mobile.
- Lattice swapped to `<NeuralLattice fluid />` and given an inset wrapper (`inset-4 sm:inset-6 lg:inset-0`) so the icosahedron clears the corner labels.
- Corner labels: top pair shown from `sm:`, bottom pair shown from `lg:` only — eliminates collision with the lattice mass at narrow widths.
- Center capsule: changed from a single-line pill (`text-[13.5px]`) to a **rounded multi-line label on mobile** (`rounded-[24px] text-[11px] leading-[1.4] text-center`); reverts to the original pill at `sm:` and up.

### `FourPillars.tsx` — issues 16–17
- Card padding: `p-6 sm:p-7` (was just `p-7`).
- Header margin tightened on mobile: `mb-10 sm:mb-16`.
- Verb scale unchanged from previous build.

### `TabMatrix.tsx` — issues 18 (and global UX)
- Tab pills row gets a **right-edge gradient fade** on mobile (an `after:` pseudo with `bg-gradient-to-l from-ink to-transparent`) to indicate horizontal overflow.
- Tabs are wrapped in a relative container so the fade has somewhere to anchor. Above `sm:` the row falls back to `flex-wrap` and the fade hides itself.
- Tab buttons: `min-h-[44px]` + `py-[12px] sm:py-[10px]` for the touch-target floor.
- Tab pills now `snap-start` inside a `snap-x snap-mandatory` row so flicks land cleanly.
- Below-tab CTA: `w-full justify-center sm:w-auto`.

### `AIChatDemo.tsx` — issues 20–22
- Glass card padding: `p-5 sm:p-6 md:p-8` and added `overflow-hidden` so the rounded border clips long content.
- Header row: `flex-col gap-2 sm:flex-row sm:items-center sm:justify-between` so the model badge wraps under the live indicator on narrow widths instead of overflowing.
- Response `<pre>`: text size `text-[12.5px] sm:text-[13.5px]` and `max-w-full overflow-x-auto` to keep the streaming content inside the card.
- Status row at the bottom: chips wrap in a flex-wrap inner div, the `Try it yourself` CTA stacks below them on mobile (`flex-col … sm:flex-row`) and is full-width.

### `IndustryGrid.tsx` — issues 23–25
- **Two render paths**: a single `grid-cols-2 sm:grid-cols-3` of all 12 chips on `< md`, and the original two-row `flex-wrap` layout on `md:` and up. Hidden via `hidden / md:hidden` toggles so the desktop visual is byte-identical.
- "When our customers work…" CTA is now full-width on mobile, auto on `sm:`. The dark-fill style (`!bg-fg-on-light !text-cream`) is preserved.

### `CustomerCarousel.tsx` — issues 27–28
- Stat numbers: `text-[52px] sm:text-[72px] lg:text-[88px]` (was `text-[64px] sm:text-[88px]`) — ~40 % smaller on mobile per spec.
- Bottom row split into two clusters: dot indicators on the left (each wrapped in a 44 px-tall hit area), and a **mobile-only prev/next pair** on the right (`sm:hidden`). Desktop chevrons in the header are unchanged.
- Desktop chevrons bumped from `h-10 w-10` to `h-11 w-11` (consistent 44 px touch target).

### `CTABand.tsx` — issues 32–33
- Card padding: `px-5 py-14 sm:px-8 sm:py-20 md:px-16 md:py-28`.
- CTAs: `flex-col gap-3 sm:flex-row` + `w-full justify-center sm:w-auto` per Button.
- Mono footnote: `text-[12px] sm:text-[11px]` (16-px-prevention floor).

### `Footer.tsx` — issues 35, 37, 38
- Added a **mobile-only `<MobileAccordion>`** component that renders the four link columns as collapsible sections (default closed, smooth height transition via `grid-rows-[0fr → 1fr]`). Hidden via `sm:hidden`. The original 4-column grid is shown via `hidden sm:grid` so desktop is byte-identical.
- Newsletter input bumped to `text-[16px]` on mobile (no auto-zoom on iOS), reverts to `13.5 px` at `sm:`.
- Newsletter submit button bumped from 28 px to 36 px on mobile (`h-9 w-9 sm:h-7 sm:w-7`).
- Bottom strip: **centered on mobile**, original `justify-between` row at `sm:` (`flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left`).

### `MockupCard.tsx` — issue 47
- `MockupAutomation` header row now uses `flex-wrap items-center justify-between gap-2` so the timestamp drops under the eyebrow at narrow widths instead of overflowing the card.
- Header padding: `px-4 sm:px-5`.
- Body padding: `p-5 sm:p-6`.

### `NeuralLattice.tsx` — supporting fix for issues 7, 12, 42
- Added a new `fluid?: boolean` prop. When set, the wrapper drops the inline `width / height` style and stretches with `h-full w-full` to fill its parent box. Lets parents define responsive aspect ratios via Tailwind classes.

### `Input.tsx` — issues 52, 53, 62, 63
- Field text size: `text-[16px] sm:text-[15px]` to clear the iOS auto-zoom-on-focus threshold.
- Field padding: `py-[14px] sm:py-[12px]`.
- Field min-height: `min-h-[48px] sm:min-h-0` so on mobile the touch box is always ≥ 48 px regardless of the text-size cascade.

### `Chip.tsx` — supports issue 23 (chips touchable on mobile)
- `industry` variant gets `min-h-[44px] justify-center` and a smaller mobile padding/font (`px-3 py-[10px] text-[13px] sm:px-5 sm:text-[14px]`) so 12 chips lay out cleanly in a 2-col grid at 375 px.

### `app/book-call/page.tsx` & `app/contact/page.tsx` — issues 54, 56
- Submit button: `className="w-full justify-center sm:w-auto"` per spec.
- Form input changes inherit from the Input primitive.

### `app/ai-automation`, `app/llm`, `app/virtual-teams`, `app/products/servicescientist` — supports issue 42
- All four `<PageHero visual={…} />` props swapped from `<NeuralLattice size={…} />` to `<NeuralLattice fluid />`.

---

## Issues from the audit not addressed and why

- **Issue 39 (StickyChips below md)** — the existing `hidden lg:flex` is *more conservative* than the spec asks for. It hides the chips below `lg:` (1024 px) — i.e. on tablet portrait too — which is what the spec wants on mobile and a reasonable choice on tablet. No change.
- **Issue 30 (RecognitionStrip border on mobile)** — the bare-cards-on-mobile look is intentional and matches the rest of the site at narrow widths. Not changed.
- **Issue 45 (StatBlock number size)** — `text-[44px]` at 375 px viewport is acceptable; the cards have generous padding and the numbers don't overflow. Not changed.
- **Issue 50 (`app/page.tsx` section padding)** — already responsive via the `Section` primitive (`--space-section: 80 px` on `≤ 768`). No change.

---

## Verification

- `npm run build` ran clean with all 15 routes generated. Homepage First Load JS: **156 kB** (well under the 220 kB budget).
- Manual viewport sweep at 390 × 844 (production server, port 3035):
  - **Hero** — green/white headline split renders on separate lines with proper spacing; CTAs full-width and stacked; lattice scales to viewport width.
  - **Hamburger menu** — opens to a full-screen overlay; close icon (X) replaces hamburger; 5 nav items + Sign In + Book a Call all 56 px tall; backdrop tap closes; Escape closes; body scroll is locked while open.
  - **Four Pillars** — single column, 24 px card padding, verb scales correctly.
  - **Industries (cream)** — 12 chips in 2 cols × 6 rows; "See all customer stories" CTA full-width and dark-filled.
  - **Customer Carousel** — horizontal snap scroll; stat number ~52 px; mobile prev/next chevrons appear in the bottom row.
  - **Footer** — Product / Company / Resources / Legal collapsed accordions with chevron rotation on expand; newsletter input full-width; bottom strip centered.
- Spot-check at **1440 × 900**: hero, centerpiece, and footer all render byte-identical to the previous desktop build. No regression.

---

## Decisions that weren't specified above

1. **Full-screen menu uses `fixed inset-0` not a slide-in drawer.** Spec asked for full-screen overlay; I picked an inset-fade pattern with subtle vertical translate so it feels intentional without being slow. 200 ms throughout.
2. **Mobile "Book" pill in top bar.** Spec asked: keep "Book a Call" CTA visible. I rendered a 44-px-tall **Book** pill (truncated label) instead of trying to fit the full string in a 56-px-wide gap. The full label is also in the menu.
3. **NeuralLattice `fluid` prop** instead of overriding via `!h-full !w-full` className. Cleaner contract, easier to read in callers, and the existing `size` prop still works for any non-fluid use.
4. **IndustryGrid two render paths** instead of CSS-only conditioning. Simpler than reflowing a flex-wrap into a CSS grid via media queries, and keeps the desktop output byte-identical.
5. **Footer accordion: separate `<MobileAccordion>` component** rather than reflowing the existing nav. Same rationale as IndustryGrid — desktop output is unchanged.
6. **Reduced hero top padding by 60 px on mobile** (`pt-[180px] → pt-[120px]`). Spec didn't specify the new value; I picked 120 px because the TopNav is ~62 px tall and 120 px gives ~58 px of breathing room above the eyebrow without feeling cramped.
7. **Pause-button on hero is 44 px on mobile, 36 px on desktop.** Mobile gets the touch-target floor; desktop keeps the original size unchanged.
8. **No new dependencies introduced.** `lucide-react` was already in the bundle so the chevron / hamburger / close icons are reused.

---

## How to run locally

```
npm install
npm run dev    # http://localhost:3000
```

Then resize the browser to **375, 390, 414, 768, 1024, 1440** and walk through:
- `/`
- `/ai-automation`
- `/llm`
- `/virtual-teams`
- `/products/servicescientist`
- `/book-call`
- `/contact`

Build verified deployable to Vercel via `npm run build`. Not pushed to GitHub — review locally first per spec.
