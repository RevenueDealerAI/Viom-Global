# Mobile Audit — Viom Global

Audit performed by reading every component and page file. Issues catalogued by file path with the viewport(s) at which each manifests. Desktop (≥ 1024px) is in scope **only** for verifying nothing breaks; all fixes are additive at smaller breakpoints.

Tailwind breakpoints in use (Tailwind defaults — kept as-is):
- `sm:` 640px · `md:` 768px · `lg:` 1024px · `xl:` 1280px

---

## Headline accent/white split — site-wide

The pattern `<span className="acc">…</span><span className="wht">…</span>` already uses `display: block` (defined in `app/globals.css` lines 147–149), so the green and white phrases render on separate lines on every viewport. **Verified: phrases do NOT run together as a single string.** No fix needed for the line-break behaviour itself, but several headlines need responsive size scaling — see hero entries below.

---

## `components/marketing/TopNav.tsx`

| # | Issue | Viewport |
|---|---|---|
| 1 | Mobile drawer is a vertical inline panel rather than a full-screen overlay; no focus trap, no Escape key, no outside-tap to close | < 768px |
| 2 | "Book a Call" CTA is hidden entirely on mobile (only inside the drawer). User has to open the menu to find the primary CTA. Spec asks: keep the small pill always visible in the top bar on mobile | < 768px |
| 3 | Hamburger / close icon is a one-shot SVG swap; no smooth 200 ms transition | < 768px |
| 4 | Hamburger button touch target is 22×22px — below the 44×44 minimum | < 768px |
| 5 | Drawer link rows are 44px tall; spec asks for 56px minimum on mobile | < 768px |
| 6 | When the drawer is open, body scroll is not locked → scrolling the page behind the menu is possible | < 768px |

## `components/marketing/HeroCarousel.tsx`

| # | Issue | Viewport |
|---|---|---|
| 7 | Lattice block is a fixed `360×360` even at 375px viewport — leaves only ~15px gutter, very tight | < 640px |
| 8 | Body subhead `text-[19px]` is the same on every viewport; could shrink for very narrow widths to avoid wrapping awkwardness | < 640px |
| 9 | CTA buttons rely on `flex-wrap` — at 375px they may render side-by-side narrowly clipped or wrap inconsistently. Spec asks: full-width, stacked vertically with primary on top | < 640px |
| 10 | Carousel indicators row uses `gap-4` between pause button and dots — fits but the trailing `// 0X / 0Y` mono caption can push past viewport on the narrowest widths because `ml-2` plus the dot row already consumes most of the 375px | 375–414px |
| 11 | Section uses `pt-[180px]` on mobile but the TopNav itself is ~62px tall. 180px of top padding leaves ~120px of dead space — not a bug but feels heavy on a small screen. Recommend `pt-[120px]` on mobile | < 768px |

## `components/marketing/Centerpiece.tsx`

| # | Issue | Viewport |
|---|---|---|
| 12 | Wrapper is fixed `h-[520px]` on mobile, but `<NeuralLattice size={680} />` is hard-coded — at 375px the canvas is twice the viewport width and overflows. The component already has `width:size, max-width: 100%` inside `NeuralLattice`, but the parent grid box also needs to scale | < 1024px |
| 13 | Center capsule pill `Automation + Intelligence + Workflows + Trust` uses `text-[13.5px] sm:text-[14px]` but at 375px the full string (~52ch) won't fit on one line; we need either a smaller scale or controlled wrap | < 480px |
| 14 | Corner labels (`ENTERPRISE`, `AI-NATIVE`, `GOVERNED`, `OBSERVABLE`) are positioned absolutely at the four corners — at 375px they collide with the lattice mass. Recommend hiding two of them (or all four) on `< sm` | < 640px |

## `components/marketing/FourPillars.tsx`

| # | Issue | Viewport |
|---|---|---|
| 15 | Grid is already `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` ✅ | — |
| 16 | Card padding is fixed `p-7` (28px). Spec asks for ~24px on mobile to give content breathing room | < 640px |
| 17 | Verb scales `text-[40px] sm:text-[44px] lg:text-[48px] xl:text-[52px]` — the spec asks for `36–40px` on mobile. 40px is at the upper edge but acceptable. No change | — |

## `components/marketing/TabMatrix.tsx`

| # | Issue | Viewport |
|---|---|---|
| 18 | Tab pills row is `overflow-x-auto sm:flex-wrap` — at < sm it scrolls but there is no fade-on-edge to indicate overflow, and snap points are missing | < 640px |
| 19 | Below-tab grid is `lg:grid-cols-[1fr_1.1fr]` so it stacks correctly at < 1024px ✅. But the mockup card is dense — `MockupCopilot` is itself a 2-column card with `lg:grid-cols-[1.4fr_1fr]` (good); `MockupTeams` rows hide chip pills on `<sm` (good); `MockupPlatform` shows an SVG graph with fixed `viewBox` which scales fine ✅ | — |

## `components/marketing/AIChatDemo.tsx`

| # | Issue | Viewport |
|---|---|---|
| 20 | Card padding `p-6 md:p-8` is reasonable but at 375px the inner `<pre>` can overflow horizontally because of long lines like `↓ 38% mean handle time`. The `<pre>` already has `whitespace-pre-wrap break-words` ✅ — but the indented spaces in `RESPONSE` (`  ✓ Tier-0…`) can push width wider than the card. Need the pre element to stay within container width | < 480px |
| 21 | The status row at the bottom (`grounded in your KB`, `PII redacted`, `audit-logged`, plus the CTA) uses `flex-wrap` with the CTA pinned `ml-auto`. At narrow widths the CTA jumps into the chip row awkwardly and may overlap with chips | < 640px |
| 22 | Header row `Viom Copilot · live` + `model · claude-sonnet-4.6` uses `justify-between` with no flex-wrap — the model string doesn't fit alongside the live indicator at 375px and either truncates or causes overflow | < 480px |

## `components/marketing/IndustryGrid.tsx`

| # | Issue | Viewport |
|---|---|---|
| 23 | Two `<div className="flex flex-wrap gap-3">` rows. Spec asks for `2 columns × 6 rows` on mobile, i.e. a regular 2-col grid not flex-wrap. Currently with flex-wrap the chips end up 2-per-row anyway at 375px but the alignment is rag-right; a `grid-cols-2` will give consistent column widths | < 768px |
| 24 | "When our customers work…" + "See all customer stories" CTA → already `flex-col lg:flex-row` ✅ but the CTA button is full-width on mobile so currently rendered narrow. Spec asks: full-width on mobile. Use `w-full sm:w-auto` on the Button wrapper | < 640px |
| 25 | The Button component itself does not accept a width-control prop; we'll wrap it or pass `className="w-full sm:w-auto justify-center"` | < 640px |

## `components/marketing/CustomerCarousel.tsx`

| # | Issue | Viewport |
|---|---|---|
| 26 | Already uses snap-x/snap-mandatory horizontal scroll ✅ | — |
| 27 | Chevron prev/next buttons are `hidden sm:flex` — meaning on `< 640px` the buttons disappear entirely. Spec asks: move controls below cards on mobile, not remove them. Need to render a separate mobile prev/next/pause cluster below the cards | < 640px |
| 28 | Stat numbers `text-[64px] sm:text-[88px]` — at 375px viewport `64px` is tight against the card padding; spec asks ~40 % reduction from desktop. Going to `text-[52px] sm:text-[72px] lg:text-[88px]` | < 640px |
| 29 | Card width `w-[88%] sm:w-[58%] lg:w-[40%]` looks good ✅ | — |

## `components/marketing/RecognitionStrip.tsx`

| # | Issue | Viewport |
|---|---|---|
| 30 | Grid is `md:grid-cols-2 lg:grid-cols-4`. Default (mobile) is single column ✅ — but the "rounded card-lg" border is only applied at `lg:` so on mobile/tablet the cards are bare panels with hairlines from the parent grid gap. Acceptable. | — |

## `components/marketing/CTABand.tsx`

| # | Issue | Viewport |
|---|---|---|
| 31 | Internal padding `px-6 py-20 md:px-16 md:py-28` — fine ✅ | — |
| 32 | CTA buttons use `flex-wrap items-center gap-3`. Spec asks: full-width stacked on mobile. Currently they render side-by-side and only wrap if not enough space → at 375px the secondary CTA "Watch Platform Tour" wraps under primary, but they don't span full width. Need `flex-col sm:flex-row` with `w-full sm:w-auto` per button | < 640px |
| 33 | Mono footnote `text-[11px]` — spec says 12px is the mobile floor. Bump to `text-[12px] sm:text-[11px]`. Minor. | < 640px |

## `components/marketing/Footer.tsx`

| # | Issue | Viewport |
|---|---|---|
| 34 | Outer grid is `md:grid-cols-[1.4fr_2fr_1.4fr]` so on mobile everything stacks ✅ | — |
| 35 | The 4 link columns (`Product/Company/Resources/Legal`) are wrapped in `grid-cols-2 sm:grid-cols-4`. On mobile this gives 2 columns of static link lists. Spec asks: collapsible accordions on mobile, default closed | < 640px |
| 36 | Newsletter input is full-width and always visible ✅ | — |
| 37 | Bottom strip `flex-col items-start sm:flex-row sm:items-center sm:justify-between` — spec asks centered on mobile. Currently start-aligned. Change to `items-center text-center sm:text-left` | < 640px |
| 38 | Newsletter input `text-[13.5px]` — below the 16 px iOS-no-zoom floor. Bump to `text-[16px] sm:text-[13.5px]` | < 640px |

## `components/marketing/StickyChips.tsx`

| # | Issue | Viewport |
|---|---|---|
| 39 | Already `hidden lg:flex` ✅ — hidden below `lg`. Spec asks: hide below `md`. Currently they're hidden on tablet too, which is more conservative than spec. Acceptable. No change. | — |

## `components/marketing/PageHero.tsx`

| # | Issue | Viewport |
|---|---|---|
| 40 | Section padding `pt-[180px] pb-20`. Same as HeroCarousel — heavy on small screens. Bump to `pt-[120px] sm:pt-[160px] md:pt-[180px]` | < 768px |
| 41 | Same CTA wrapping issue as CTABand — `flex-wrap` is not the same as full-width-stacked. Need `flex-col sm:flex-row` with `w-full sm:w-auto` per button | < 640px |
| 42 | Visual (lattice) is rendered into a `<div className="relative">`; on mobile the lattice keeps its desktop-default size of 480px and overflows the column. Need a max-width wrapper and aspect-square constraint | < 768px |

## `components/marketing/TrustBand.tsx`

| # | Issue | Viewport |
|---|---|---|
| 43 | Grid is `md:grid-cols-3` so single-column on mobile ✅ | — |
| 44 | No issue — cards stack cleanly | — |

## `components/marketing/StatBlock.tsx`

| # | Issue | Viewport |
|---|---|---|
| 45 | Stat number `text-[44px] sm:text-[56px]` — spec asks ~40 % smaller on mobile. 44 px is acceptable on a 375 px viewport but tightens to the card padding. Will keep | — |

## `components/marketing/MockupCard.tsx`

| # | Issue | Viewport |
|---|---|---|
| 46 | `MockupCopilot` is a 2-column on `lg:` (good). On mobile it stacks vertically, but the `CodeBlock` inside has fixed mono content that can scroll horizontally on long lines — `<pre>` already has `overflow-x-auto` ✅ | — |
| 47 | `MockupAutomation` header `flex justify-between` with timestamp on the right — at 375px the full eyebrow string `Incident · summarized by AI` is long; could wrap or push timestamp off. Need `flex-wrap` | < 480px |
| 48 | `MockupTeams` divides each member row into name + chips; chips are `hidden sm:flex` so on mobile only the role shows. Acceptable. | — |
| 49 | `MockupIndustries` is a 2×2 grid of stat cards using `grid-cols-2 gap-px`. ✅ | — |

## `app/page.tsx`

| # | Issue | Viewport |
|---|---|---|
| 50 | Section ordering and content correct. The `Section` primitive sets `py-[var(--space-section)]` which is responsive (140 → 80 px on `≤ 768`). ✅ | — |

## `app/book-call/page.tsx`

| # | Issue | Viewport |
|---|---|---|
| 51 | Grid `lg:grid-cols-[1.05fr_1fr]` → mobile stacks ✅ | — |
| 52 | Form inputs use `text-[15px]` (Input primitive) — below 16 px iOS floor; will hit the auto-zoom-on-focus quirk. Bump Input field text to 16 px on mobile | < 640px |
| 53 | Input vertical size: `py-[12px]` × `text-[15px]` ≈ 42 px tall — below the 48 px mobile floor. Bump to `py-[14px]` for `< sm` | < 640px |
| 54 | Submit button is rendered with `Button variant="primary"` — defaults to inline pill, not full-width. Spec asks: full-width on mobile. Add `w-full sm:w-auto` | < 640px |

## `app/contact/page.tsx`

| # | Issue | Viewport |
|---|---|---|
| 55 | Same form input issues as book-call (text size + height) — **fix at the Input primitive, not per-page** | < 640px |
| 56 | Submit button same — full-width on mobile | < 640px |

## `app/ai-automation/page.tsx`, `app/llm/page.tsx`, `app/virtual-teams/page.tsx`, `app/products/servicescientist/page.tsx`

| # | Issue | Viewport |
|---|---|---|
| 57 | All use `<PageHero …/>` so any fixes there cascade ✅ | — |
| 58 | Inner grids use `md:grid-cols-2 lg:grid-cols-3/4` — stack on mobile ✅ | — |
| 59 | Code samples (`CodeBlock`) on `/llm` are inside a 2-col grid; on mobile they stack and the `<pre>` inside has `overflow-x-auto` ✅ | — |

## `components/primitives/Button.tsx`

| # | Issue | Viewport |
|---|---|---|
| 60 | Default size = `px-6 py-[14px] text-[15px]` → ~46 px tall. ✅ above mobile minimum | — |
| 61 | No `block`/`full-width` prop — pages currently can't say "make this CTA full-width on mobile" except via className. Already accept `className` prop ✅ — pages just need to add `w-full sm:w-auto justify-center`. We'll add a small helper: ensure the button accepts `className` consistently and document the pattern | — |

## `components/primitives/Input.tsx`

| # | Issue | Viewport |
|---|---|---|
| 62 | `text-[15px]` < 16 px → iOS auto-zooms on focus. Bump to 16 px | < 640px |
| 63 | `py-[12px]` → field is < 48 px tall on mobile. Bump padding | < 640px |

## `components/primitives/Card.tsx`

| # | Issue | Viewport |
|---|---|---|
| 64 | No mobile issues — pure styling, padding controlled by callers | — |

## Touch targets (global sweep)

- Hero pause button: `h-9 w-9` = 36 px → bump to 44 px on mobile
- Customer carousel chevrons: `h-10 w-10` = 40 px → bump to 44 px
- Footer newsletter submit: `h-7 w-7` = 28 px (inside a pill that itself has 44+ px touch height because of `py-[6px]` padding around the input). The hit area of the surrounding `<form>` on the button is fine because the button itself is what's clickable — bump to `h-9 w-9` for safety.
- Carousel dots: `h-[6px]` rendered visual but inside a `<button>` with `aria-label` — total click box is the SVG bounds (6×40 px). Need to ensure parent button has > 44 px hit area via `padding`

## Sections that may horizontal-scroll

- `body` has `overflow-x: hidden` ✅ — this is the safety net
- Centerpiece: lattice canvas sized 680 px on mobile **without** parent constraint → relies on `body overflow-x: hidden`, which means the lattice gets clipped instead of overflowing. Better to scale `size` prop responsively
- Hero: lattice block is fixed 360 px — fits in 375 px viewport with 15 px gutter, OK but tight
- TabMatrix tab row: intentionally horizontal-scrolls ✅
- CustomerCarousel: intentionally horizontal-scrolls ✅
- All `<pre>` inside CodeBlock: `overflow-x: auto` ✅

## Summary of fix surface

| File | # of issues |
|---|---|
| `components/marketing/TopNav.tsx` | 6 |
| `components/marketing/HeroCarousel.tsx` | 5 |
| `components/marketing/Centerpiece.tsx` | 3 |
| `components/marketing/FourPillars.tsx` | 1 |
| `components/marketing/TabMatrix.tsx` | 1 |
| `components/marketing/AIChatDemo.tsx` | 3 |
| `components/marketing/IndustryGrid.tsx` | 3 |
| `components/marketing/CustomerCarousel.tsx` | 3 |
| `components/marketing/CTABand.tsx` | 2 |
| `components/marketing/Footer.tsx` | 4 |
| `components/marketing/PageHero.tsx` | 3 |
| `components/marketing/MockupCard.tsx` | 1 |
| `components/primitives/Input.tsx` | 2 |
| Touch targets | 4 |
| **Total** | **41** |

Proceeding to apply fixes — see `MOBILE_FIXES.md` once complete.
