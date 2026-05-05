"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

function MobileAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <ul className="flex flex-col divide-y divide-line-dark border-y border-line-dark sm:hidden">
      {COLS.map((col, i) => {
        const open = openIdx === i;
        return (
          <li key={col.title}>
            <button
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex min-h-[56px] w-full items-center justify-between gap-3 px-1 text-left"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg-mid">
                {col.title}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "text-fg-low transition-transform duration-200 ease-out-expo",
                  open && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out-expo",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <ul className="overflow-hidden">
                <div className="flex flex-col gap-2 pb-4 pl-1 text-[15px] text-fg-mid">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="block py-1 transition-colors hover:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

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
    <footer
      className="relative border-t border-line-dark bg-ink pt-16 sm:pt-20"
      style={{ paddingBottom: "max(2.5rem, var(--safe-bottom))" }}
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-[280px] text-[15px] text-fg-mid">
              AI automation for the enterprise. Built for skeptical buyers, shipped on real timelines.
            </p>
          </div>

          {/* desktop / tablet column grid */}
          <nav className="hidden grid-cols-2 gap-x-6 gap-y-10 sm:grid sm:grid-cols-4">
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

          {/* mobile accordion */}
          <MobileAccordion />

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
                  "flex items-center gap-2 rounded-pill border border-line-strong bg-card/50 px-4 py-[8px]",
                  "transition-colors focus-within:border-accent/60",
                )}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent font-mono text-[16px] text-fg outline-none placeholder:text-fg-low sm:text-[13.5px]"
                />
                <button
                  type="submit"
                  disabled={busy}
                  aria-label="Subscribe"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-ink transition-transform hover:-translate-y-[1px] disabled:opacity-50 sm:h-7 sm:w-7"
                >
                  <ArrowGlyph />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-line-dark pt-6 text-center sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg-low">
            © 2026 Viom Global, Inc.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low sm:gap-4">
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
