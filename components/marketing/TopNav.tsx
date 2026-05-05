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

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // body scroll lock + Escape close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // bare-style nav for /book-call (no nav links)
  const isBare = pathname === "/book-call";

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50",
          "transition-[background,backdrop-filter,border-color] duration-300 ease-out-expo",
          scrolled || open
            ? "border-b border-line-dark bg-ink/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-[clamp(16px,5vw,32px)] py-[14px]">
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

              {/* mobile cluster: small CTA + hamburger */}
              <div className="flex items-center gap-2 md:hidden">
                <Button
                  href="/book-call"
                  variant="primary"
                  size="sm"
                  arrow={false}
                  className="!min-h-[44px] !px-4 !text-[13px]"
                >
                  Book
                </Button>
                <button
                  className="grid h-11 w-11 place-items-center text-fg"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  onClick={() => setOpen((v) => !v)}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={cn(
                      "transition-transform duration-200 ease-out-expo",
                      open && "rotate-90",
                    )}
                  >
                    {open ? (
                      <>
                        <path d="M6 6l12 12" />
                        <path d="M18 6L6 18" />
                      </>
                    ) : (
                      <>
                        <path d="M3 7h18" />
                        <path d="M3 17h18" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* mobile full-screen overlay */}
      {!isBare && (
        <div
          id="mobile-menu"
          aria-hidden={!open}
          className={cn(
            "fixed inset-0 z-40 md:hidden",
            "transition-opacity duration-200 ease-out-expo",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/95 backdrop-blur-md" />
          <nav
            className={cn(
              "relative flex h-full flex-col gap-1 px-[clamp(16px,5vw,32px)] pt-[88px] pb-10",
              "transition-transform duration-300 ease-out-expo",
              open ? "translate-y-0" : "-translate-y-2",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[56px] items-center rounded-card px-3 text-[18px] font-medium text-fg-mid transition-colors hover:bg-card hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-[56px] items-center justify-center rounded-pill border border-line-strong px-6 text-[15px] text-fg-mid"
              >
                Sign In
              </Link>
              <Button
                href="/book-call"
                variant="primary"
                className="!min-h-[56px] w-full justify-center"
              >
                Book a Call
              </Button>
            </div>
            <p className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low">
              // avg. response time: under 2 hours
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
