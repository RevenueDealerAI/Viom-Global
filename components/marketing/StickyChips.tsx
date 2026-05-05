"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { ArrowGlyph } from "../primitives/ArrowGlyph";

export function StickyChips() {
  const pathname = usePathname();
  if (pathname === "/book-call") return null;

  return (
    <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      <Link
        href="/contact"
        className={cn(
          "group inline-flex items-center gap-2 rounded-pill border border-fg-on-light/15 bg-ink/85 px-4 py-[10px]",
          "font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid backdrop-blur-md",
          "transition-[transform,border-color,color] hover:-translate-y-[1px] hover:border-accent/60 hover:text-fg",
        )}
      >
        Contact
        <ArrowGlyph className="opacity-60 transition-transform duration-200 group-hover:translate-x-[2px]" />
      </Link>
      <Link
        href="/book-call"
        className={cn(
          "group inline-flex items-center gap-2 rounded-pill border border-accent/50 bg-accent px-4 py-[10px]",
          "font-mono text-[11px] uppercase tracking-[0.14em] text-ink backdrop-blur-md",
          "transition-[transform,border-color,background] hover:-translate-y-[1px] hover:bg-signal",
        )}
      >
        Demo
        <ArrowGlyph className="transition-transform duration-200 group-hover:translate-x-[2px]" />
      </Link>
    </div>
  );
}
