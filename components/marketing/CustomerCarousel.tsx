"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { ArrowGlyph } from "../primitives/ArrowGlyph";
import { cn } from "@/lib/cn";

const CARDS = [
  {
    stat: "↓ 73%",
    headline: "Manual reconciliation eliminated",
    customer: "Northwind Financial",
    sector: "FINANCE",
  },
  {
    stat: "↑ 4.2×",
    headline: "Support copilot adoption in 90 days",
    customer: "Halcyon SaaS",
    sector: "SAAS",
  },
  {
    stat: "↓ 61%",
    headline: "Time-to-resolution on Tier-2 tickets",
    customer: "Kestrel Logistics",
    sector: "LOGISTICS",
  },
  {
    stat: "↑ 38%",
    headline: "First-touch resolution in claims intake",
    customer: "Atlas Bio Health",
    sector: "HEALTHCARE",
  },
];

export function CustomerCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft - 8, behavior: "smooth" });
    setActive(i);
  }

  return (
    <Container>
      <div className="flex items-end justify-between gap-6 mb-8">
        <p id="customers" className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
          // CUSTOMER STORIES
        </p>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollTo(Math.max(0, active - 1))}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-light bg-paper text-fg-on-light transition-colors hover:border-brand hover:text-brand"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollTo(Math.min(CARDS.length - 1, active + 1))}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-light bg-paper text-fg-on-light transition-colors hover:border-brand hover:text-brand"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-[clamp(20px,5vw,32px)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(20px,5vw,32px)] pb-2"
      >
        {CARDS.map((c, i) => (
          <article
            key={c.customer}
            className={cn(
              "snap-start shrink-0",
              "w-[88%] sm:w-[58%] lg:w-[40%]",
              "rounded-card-lg border border-line-light bg-paper p-7",
              "shadow-[0_30px_80px_-50px_rgba(11,95,74,0.25)]",
              "transition-transform duration-300 hover:-translate-y-[2px]",
            )}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
              {c.sector}
            </span>
            <p className="mt-6 font-mono text-[64px] font-medium leading-[1] tracking-[-0.02em] text-fg-on-light sm:text-[88px]">
              {c.stat}
            </p>
            <h3 className="mt-6 text-[20px] font-semibold leading-[1.3] text-fg-on-light">
              {c.headline}
            </h3>
            <div className="mt-8 flex items-center justify-between border-t border-line-light pt-5">
              <span className="font-display text-[15px] font-medium text-fg-on-light">
                {c.customer}
              </span>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-brand"
              >
                Read story <ArrowGlyph />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to story ${i + 1}`}
            className={cn(
              "h-[5px] rounded-full transition-all duration-200",
              i === active ? "w-8 bg-brand" : "w-2 bg-line-light",
            )}
          />
        ))}
      </div>
    </Container>
  );
}
