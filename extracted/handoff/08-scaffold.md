# Scaffold — drop-in starter files

Copy these into a fresh Next.js 15 project. Versions are pinned to what we tested against.

## `package.json`
```json
{
  "name": "viom-global",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.0.3",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "framer-motion": "11.11.17",
    "@react-three/fiber": "8.17.10",
    "@react-three/drei": "9.114.3",
    "@react-three/postprocessing": "2.16.3",
    "three": "0.169.0",
    "lucide-react": "0.456.0",
    "@supabase/supabase-js": "2.46.1",
    "shiki": "1.22.2",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "@types/node": "22.9.0",
    "@types/react": "18.3.12",
    "@types/three": "0.169.0",
    "tailwindcss": "4.0.0-beta.4",
    "@tailwindcss/postcss": "4.0.0-beta.4",
    "typescript": "5.6.3",
    "eslint": "9.14.0",
    "eslint-config-next": "15.0.3"
  }
}
```

## `tailwind.config.ts`
Tailwind v4 reads tokens from `@theme` in CSS. The config file is minimal:
```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
} satisfies Config;
```

## `app/globals.css`
```css
@import "tailwindcss";

@theme {
  /* === COLOR TOKENS — see 01-design-system.md === */
  --color-ink:           #0A1614;
  --color-elev:          #0F1B18;
  --color-card:          #131F1B;
  --color-cream:         #FAFAF7;
  --color-paper:         #FFFFFF;
  --color-brand:         #0B5F4A;
  --color-accent:        #4ADE80;
  --color-signal:        #00FFA3;
  --color-fg:            #F2F5F3;
  --color-fg-mid:        #A8B2AE;
  --color-fg-low:        #5C6660;
  --color-fg-on-light:   #0A1614;

  /* === FONTS === */
  --font-display: "Geist", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  /* === RADII === */
  --radius-pill:    9999px;
  --radius-card:    8px;
  --radius-card-lg: 16px;
  --radius-mockup:  24px;

  /* === MOTION === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast:   180ms;
  --dur-base:   300ms;
  --dur-slow:   400ms;

  /* === SPACING (custom) === */
  --space-section: 140px;
  --space-block:   64px;
}

@media (max-width: 768px) {
  :root {
    --space-section: 80px;
    --space-block: 40px;
  }
}

* { -webkit-font-smoothing: antialiased; }

html, body {
  background: var(--color-ink);
  color: var(--color-fg);
  font-family: var(--font-display);
  font-size: 17px;
  line-height: 1.6;
}

::selection { background: var(--color-accent); color: var(--color-ink); }

@keyframes pulse-dot {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1.0; }
}

@keyframes blink-cursor {
  0%, 49.999% { opacity: 1; }
  50%, 100%   { opacity: 0; }
}
```

## `app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { TopNav } from "@/components/marketing/TopNav";
import { Footer } from "@/components/marketing/Footer";
import { StickyChips } from "@/components/marketing/StickyChips";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "%s — Viom Global", default: "Viom Global — AI automation for the enterprise" },
  description: "Viom builds AI automation, LLM copilots, and virtual AI teams for enterprise B2B. Book a strategy call — average response under 2 hours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
        <TopNav />
        <main id="main">{children}</main>
        <Footer />
        <StickyChips />
      </body>
    </html>
  );
}
```

## `lib/motion.ts`
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

## `lib/supabase.ts`
```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

## Supabase tables
```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  company text,
  role text,
  company_size text,
  message text,
  source text default 'book-call'
);

create table newsletter (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text unique not null
);
```

RLS: enable, allow anonymous insert with rate-limit policy (1 per IP per minute on `leads`, 1 per minute on `newsletter`).

## `.env.example`
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Dev tooling
- Prettier with default config + 100-char line width.
- ESLint via `eslint-config-next`.
- Husky pre-commit: `lint && typecheck`.
- GitHub Actions: build + typecheck on PR.
