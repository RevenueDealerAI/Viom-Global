"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { ArrowGlyph } from "../primitives/ArrowGlyph";
import { cn } from "@/lib/cn";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "AI Automation", href: "/ai-automation" },
      { label: "LLM Copilots", href: "/llm" },
      { label: "Virtual Teams", href: "/virtual-teams" },
      { label: "ServiceScientist", href: "/products/servicescientist" },
      { label: "Pricing", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/contact" },
      { label: "Customers", href: "/#customers" },
      { label: "Careers", href: "/contact" },
      { label: "Press", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/contact" },
      { label: "Case Studies", href: "/#customers" },
      { label: "Documentation", href: "/contact" },
      { label: "Webinars", href: "/contact" },
      { label: "Trust Center", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/contact" },
      { label: "Terms", href: "/contact" },
      { label: "Cookie Policy", href: "/contact" },
      { label: "DPA", href: "/contact" },
      { label: "Subprocessors", href: "/contact" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setDone(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <footer className="relative border-t border-line-dark bg-ink pt-20 pb-10">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-[280px] text-[15px] text-fg-mid">
              AI automation for the enterprise. Built for skeptical buyers, shipped on real timelines.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {COLS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <Eyebrow dot={false}>{col.title}</Eyebrow>
                <ul className="flex flex-col gap-[8px] text-[14px] text-fg-mid">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="transition-colors hover:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <Eyebrow dot={false}>Newsletter</Eyebrow>
            <p className="text-[14px] text-fg-mid">
              Field reports on shipping AI in production. Monthly. No noise.
            </p>
            {done ? (
              <p className="font-mono text-[13px] text-signal">// subscribed.</p>
            ) : (
              <form
                onSubmit={submit}
                className={cn(
                  "flex items-center gap-2 rounded-pill border border-line-strong bg-card/50 px-4 py-[6px]",
                  "transition-colors focus-within:border-accent/60",
                )}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent font-mono text-[13.5px] text-fg outline-none placeholder:text-fg-low"
                />
                <button
                  type="submit"
                  disabled={busy}
                  aria-label="Subscribe"
                  className="grid h-7 w-7 place-items-center rounded-full bg-accent text-ink transition-transform hover:-translate-y-[1px] disabled:opacity-50"
                >
                  <ArrowGlyph />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 border-t border-line-dark pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg-low">
            © 2026 Viom Global, Inc.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
            <span className="inline-flex items-center gap-2 rounded-pill border border-line-dark px-3 py-1">
              <span className="h-[6px] w-[6px] rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
              SOC 2 · Type II
            </span>
            <span>viom.global · v2026.05</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
