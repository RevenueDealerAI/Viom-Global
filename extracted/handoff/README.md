# Viom Global — Claude Code Handoff Bundle

This folder is a complete implementation spec for the Viom Global marketing website. Hand it to Claude Code (or any engineer) and they should be able to ship it without further design input.

## What's in here

| File | What it is |
|---|---|
| `CLAUDE.md` | Top-level orientation. Read first. |
| `01-design-system.md` | Tokens — color, type, spacing, radii, motion |
| `02-components.md` | Every component, with TS prop signatures and file paths |
| `03-motion.md` | Every animation: timings, easings, triggers, reduced-motion paths |
| `04-pages.md` | Section-by-section layout + content for every page |
| `05-neural-lattice.md` | The signature 3D centerpiece (R3F spec) |
| `06-content.md` | Canonical copy deck — every word that ships |
| `07-quality-bar.md` | Acceptance checklist + reject list |
| `08-scaffold.md` | Drop-in `package.json`, `globals.css`, `layout.tsx`, Supabase schema |
| `09-build-order.md` | Sequenced build plan, phase by phase |
| `reference/homepage.html` | **Visual source of truth.** Open in a browser to see the target. |

## How to use this with Claude Code

```bash
# 1. Open Claude Code in your target dir
cd ~/code
claude-code

# 2. Drop the handoff folder in
cp -r /path/to/handoff ./viom-global-spec

# 3. Tell Claude Code:
#    "Read viom-global-spec/CLAUDE.md, then start Phase 1 from
#     viom-global-spec/09-build-order.md. Stop after each phase
#     and let me review."
```

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion · React Three Fiber · Supabase · Geist + JetBrains Mono.

## Ground truth
- The reference HTML is what the homepage should look like.
- The motion spec is what it should feel like.
- The content deck is what it should say.
- The reject list is what it must never become.
