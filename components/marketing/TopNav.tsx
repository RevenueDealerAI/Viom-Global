"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "../primitives/Button";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Products", href: "/#products" },
  { label: "Industries", href: "/#industries" },
  { label: "Solutions", href: "/ai-automation" },
  { label: "Resources", href: "/#resources" },
  { label: "Company", href: "/contact" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bare-style nav for /book-call (no nav links)
  const isBare = pathname === "/book-call";

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40",
        "transition-[background,backdrop-filter,border-color] duration-300 ease-out-expo",
        scrolled
          ? "border-b border-line-dark bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-container items-center justify-between gap-8 px-[clamp(20px,5vw,32px)] py-[14px]">
        <Logo />

        {!isBare && (
          <>
            <nav className="hidden items-center gap-7 text-[14.5px] text-fg-mid md:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative py-[6px] transition-colors duration-200 hover:text-fg",
                  )}
                >
                  {item.label}
                  <span className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-[250ms] ease-out-expo group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/contact"
                className="text-[14.5px] text-fg-mid transition-colors hover:text-fg"
              >
                Sign In
              </Link>
              <Button href="/book-call" variant="primary" size="sm" arrow>
                Book a Call
              </Button>
            </div>

            {/* mobile button */}
            <button
              className="md:hidden text-fg"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <>
                    <path d="M3 7h18" />
                    <path d="M3 17h18" />
                  </>
                )}
              </svg>
            </button>
          </>
        )}
      </div>

      {/* mobile drawer */}
      {open && !isBare && (
        <div className="md:hidden border-t border-line-dark bg-ink/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-container flex-col gap-1 px-[clamp(20px,5vw,32px)] py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-card px-2 py-3 text-[15px] text-fg-mid hover:bg-card hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/book-call" variant="primary" className="mt-3 w-full justify-center">
              Book a Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
