# iOS Safari + Fluid Design Audit

Diagnostic from a code-level pass. Every entry references a file and a line range so fixes can be reviewed against the original.

---

## 1. `100vh / min-h-screen / h-screen / 100vw` usages

`grep` for these tokens across the project: **zero matches** in source. The previous mobile pass already used `h-[<px>]` or content-driven heights; the only viewport-height context is the hamburger overlay's `fixed inset-0` (which derives its height from the viewport implicitly).

→ **No `100vh` rewrites required**, but I'll still introduce a `min-h-screen-safe` utility because the hamburger overlay should respect the dynamic viewport when iOS bars retract.

| Location | Current | Fix |
|---|---|---|
| `components/marketing/TopNav.tsx` line ~152 | `fixed inset-0 z-40 md:hidden` | Add `min-h-[100dvh]` with a `100vh` fallback so the overlay never clips under the iOS toolbar |

## 2. Form inputs — font-size minimums

| File | Element | Current size | iOS impact |
|---|---|---|---|
| `components/primitives/Input.tsx:40` | `<input>/<select>/<textarea>` field base | `text-[16px] sm:text-[15px]` | ✅ already 16 px on mobile (set during the mobile pass). On `sm:` and up, it drops to 15 px — that's fine because iPhones are < 640 px so the responsive utility never gives a sub-16 px field on an iOS device |
| `components/marketing/Footer.tsx:171` | newsletter `<input type="email">` | `text-[16px] sm:text-[13.5px]` | ✅ same pattern |
| `app/contact/page.tsx`, `app/book-call/page.tsx` | inherit `<Input>` | inherits | ✅ |

→ **All inputs already clear the iOS 16-px floor on mobile.** Will add a global belt-and-suspenders rule in `globals.css`: `input, textarea, select { font-size: max(16px, 1rem); }` so any future input added without using the primitive can't regress.

## 3. `<select>` styling

| File | Status |
|---|---|
| `components/primitives/Input.tsx:91-110` | Uses `appearance-none` already. ✅. The dropdown indicator is a static `▾` character — fine, but I'll switch to `-webkit-appearance: none` explicitly via `globals.css` and add a bg-image SVG arrow for consistency with iOS's missing native chevron |

## 4. `position: sticky` and `position: fixed` audit

| File | Element | Parent context | Risk |
|---|---|---|---|
| `components/marketing/TopNav.tsx:57` | `<header className="fixed left-0 right-0 top-0 z-50">` | Direct child of `<body>` | ✅ no transformed ancestor |
| `components/marketing/TopNav.tsx:152` | mobile overlay `fixed inset-0 z-40` | Direct child of `<body>` (sibling to `<header>`) | ✅ |
| `components/marketing/StickyChips.tsx:13` | `fixed right-4 top-1/2 z-30 ... lg:flex` | Direct child of `<body>` | ✅ |
| `app/layout.tsx:54` | Skip-to-content link `focus:fixed` | Direct child of `<body>` | ✅ |

→ **No fixed elements live inside transformed parents.** No restructuring needed. We will, however:

- Add `top: env(safe-area-inset-top, 0)` to the TopNav so the notch / Dynamic Island doesn't overlap.
- Add `right: max(1rem, env(safe-area-inset-right))` to StickyChips so they don't slide under the screen curvature in landscape.

## 5. `backdrop-filter` usages

| File | Class / Line | Has `-webkit-` prefix? |
|---|---|---|
| `components/marketing/TopNav.tsx:60, 158` | Tailwind `backdrop-blur-md` | Tailwind compiles to `backdrop-filter: blur(12px)` — **does not** auto-emit `-webkit-backdrop-filter` in v3 |
| `components/marketing/StickyChips.tsx:18, 29` | `backdrop-blur-md` | Same |
| `components/marketing/Centerpiece.tsx:40` | `backdrop-blur-md` on the centre capsule | Same |
| `components/marketing/AIChatDemo.tsx:88` | inline `style={{ backdropFilter: "blur(24px) saturate(140%)" }}` | **No prefix** — Safari needs `WebkitBackdropFilter` |

→ **Fix**: add a global `* { -webkit-backdrop-filter: inherit; }` workaround is brittle. Instead, in `globals.css` we will write a CSS rule that cascades the `backdrop-filter` property to `-webkit-backdrop-filter` on the same element. The cleanest approach is per-utility: redefine Tailwind's `backdrop-blur-*` to also emit the `-webkit-` prefix via a small `@layer utilities` block. The inline `AIChatDemo` rule will get the explicit `WebkitBackdropFilter` style key.

## 6. `scroll-behavior: smooth` and anchor links

The codebase uses `<Link href="/#products">`, `/#industries`, `/#customers`. Next.js handles in-page anchors via the browser's native scroll, which on **iOS Safari 15.4+ supports `scroll-behavior: smooth`** but earlier versions don't. Since we're targeting iOS 15+ (per spec), this is OK — but we'll still add `html { scroll-behavior: smooth; }` so the user gets it on Chrome/Edge too, and `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` to respect the existing reduced-motion contract.

## 7. `gap` on flex containers

We rely on `gap-*` everywhere. iOS 14.4 and earlier don't support flex `gap`. Targeting iOS 15+ means no fallback needed.

## 8. Tap highlight color

`globals.css` currently has no `-webkit-tap-highlight-color` rule → iOS shows the gray flash on every `<button>`/`<a>` tap.

→ **Fix**: global `-webkit-tap-highlight-color: transparent`.

## 9. Overscroll bounce

| File | Element | `overscroll-behavior` set? |
|---|---|---|
| `components/marketing/TabMatrix.tsx:120` (tab pills row) | `overflow-x-auto` | No — the pill row will rubber-band horizontally on iOS |
| `components/marketing/CustomerCarousel.tsx:80` | `overflow-x-auto` snap container | No |
| `components/marketing/StatBlock.tsx`, code blocks | `overflow-x-auto` on `<pre>` | No |
| Mobile menu overlay | scrollable | No |

→ **Fix**: add `overscroll-behavior-x: contain` to horizontal scrollers (TabMatrix, CustomerCarousel, `<pre>` code) and `overscroll-behavior-y: contain` on the mobile menu. **Do not** apply to `body/html` — would break native pull-to-refresh.

## 10. Fixed elements inside transformed ancestors

Confirmed clean. (See §4.)

## 11. `text-size-adjust`

`globals.css` does **not** set `-webkit-text-size-adjust`. On iOS landscape, the browser may auto-bump text. → Add `html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }`.

## 12. Hover-only interactions on touch devices

There are **35** `hover:` utility usages in `components/`. Tailwind compiles `hover:` to `@media (hover: hover)` by default since 3.4 — **but only in `hoverOnlyWhenSupported: true` mode**. We need to verify and explicitly enable.

→ **Fix**: enable `future: { hoverOnlyWhenSupported: true }` in `tailwind.config.ts` so all existing `hover:` utilities only fire on devices with a true hover capability. No per-component edits needed.

We also explicitly add `:active` states for touch feedback on the primary CTAs.

## 13. Safe-area insets

| File | Needs safe-area |
|---|---|
| `components/marketing/TopNav.tsx` | `padding-top: env(safe-area-inset-top)` so the nav clears the iPhone notch / Dynamic Island |
| `components/marketing/StickyChips.tsx` | `right: max(1rem, env(safe-area-inset-right))` |
| Mobile overlay menu | `padding-top: max(88px, env(safe-area-inset-top) + 64px)` |
| `components/marketing/Footer.tsx` | `padding-bottom: env(safe-area-inset-bottom)` so the bottom strip clears the home indicator on iPhones in PWA mode |

## 14. PWA / home-screen meta tags

`app/layout.tsx` currently sets:
- `metadataBase`, `title`, `description`, `openGraph`, `twitter`, `icons`

Missing:
- `viewport` export (currently uses default — does not set `viewport-fit: cover` or `themeColor`)
- `apple-mobile-web-app-capable`
- `apple-mobile-web-app-status-bar-style`
- `apple-mobile-web-app-title`
- Apple touch icon at 180×180

→ **Fix**: add `export const viewport` with `viewportFit: "cover"`, `themeColor: "#0A1614"`, and add `appleWebApp` config inside `metadata`. Add `app/apple-icon.svg` already exists at 180×180 but Apple requires PNG — keep the SVG as fallback and provide proper `apple-mobile-web-app-title` so the home-screen entry says "Viom Global".

## 15. Image rendering (`<picture>` / Next.js `<Image>`)

A `grep` for `next/image` in `components/` returns no matches — we don't currently use `<Image>`. Lattice rendering uses inline R3F + an SVG poster. **No `sizes` prop work needed.**

## 16. Hard-breakpoint scalings to convert to fluid

The components already use `sm:` / `md:` / `lg:` heavily. Hot spots:

| File | Current pattern | Replace with |
|---|---|---|
| `app/globals.css` `.h1/.h2/.h3/.h4` | already use `clamp(min, vw, max)` ✅ but tighten the lower bounds for better scale | refine to start at 44 / 32 / 20 / 16 |
| `components/marketing/FourPillars.tsx` verb | `text-[40px] sm:text-[44px] lg:text-[48px] xl:text-[52px]` | `text-fluid-pillar-verb` → `clamp(2.25rem, 3.5vw + 1rem, 4rem)` |
| `components/marketing/CustomerCarousel.tsx` stat | `text-[52px] sm:text-[72px] lg:text-[88px]` | `text-fluid-stat` → `clamp(3rem, 6vw + 1rem, 6rem)` |
| `components/marketing/StatBlock.tsx` value | `text-[44px] sm:text-[56px]` | `text-fluid-stat` |
| Section padding `py-[var(--space-section)]` | currently 80 px (≤ 768) → 140 px otherwise via media query | switch to `clamp(4rem, 8vw, 11rem)` |
| Card internal padding `p-6 sm:p-7` etc. | breakpoint step | `p-fluid-card` → `clamp(1.5rem, 3vw, 2.5rem)` |
| Hero subhead `text-[16px] sm:text-[18px] lg:text-[19px]` | breakpoint step | `text-fluid-lead` → `clamp(1rem, 0.6vw + 0.85rem, 1.1875rem)` |

## 17. CSS properties with Safari quirks

| Property | Used? | Action |
|---|---|---|
| `gap` | yes (everywhere) | iOS 15+ supports it — no fallback |
| `scroll-snap-type` | yes (TabMatrix, CustomerCarousel) | iOS 15+ supports it — fine |
| `mask-image` | yes (`globals.css:74` ambient grid) | Safari needs `-webkit-mask-image` prefix → add it |
| `aspect-ratio` | yes (lattice wrappers, trust band) | iOS 15+ supports it — fine |
| `oklch()` color (`Input.tsx` error border) | yes | iOS 15.4+ supports — at the edge of our floor; provide hex fallback in case |
| `backdrop-filter` | yes — see §5 |
| `position: sticky` | not used | n/a |

## 18. Container queries

We don't currently use them. The 4-pillar grid, customer card carousel, and tab-matrix mockup card would benefit. Tailwind v3 needs `@tailwindcss/container-queries` plugin.

→ **Action**: install plugin, register in tailwind config, retrofit FourPillars and CustomerCarousel cards with `@container` so they reflow based on container width (helps when the components are reused on `/ai-automation` etc. in narrower columns).

---

## Summary of fix surface

| Area | # of changes |
|---|---|
| New global CSS (tap-highlight, `-webkit-` prefixes, dvh utility, safe-area) | 1 file |
| Tailwind config (fluid utilities, container plugin, hover-only) | 1 file |
| `app/layout.tsx` viewport/PWA meta | 1 file |
| Component updates (replace breakpoint-based sizes with fluid utilities, inline `WebkitBackdropFilter`) | ~9 files |
| Markdown deliverables | 3 files |
| **Total files touched** | **~15** |

Proceeding to apply fixes — see `IOS_FIXES.md` and `FLUID_DESIGN.md`.
