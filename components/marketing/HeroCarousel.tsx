"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { Button } from "../primitives/Button";
import { NeuralLattice } from "../three/NeuralLattice";
import { TypewriterWords } from "../motion/TypewriterWords";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Slide = {
  eyebrow: string;
  accent: string;
  white: string;
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    eyebrow: "AI AUTOMATION FOR ENTERPRISE",
    accent: "Put AI to work",
    white: "across your enterprise",
    sub: "Automate workflows, deploy copilots, and stand up virtual AI teams — all on one enterprise-grade platform.",
    primary: { label: "Book Strategy Call", href: "/book-call" },
    secondary: { label: "Watch Platform Tour", href: "/ai-automation" },
  },
  {
    eyebrow: "CUSTOM AI COPILOTS",
    accent: "Custom AI copilots",
    white: "wired into your stack",
    sub: "Domain-tuned LLM copilots that ship in weeks, not quarters. Your data, your guardrails, your model choice.",
    primary: { label: "Book AI Consultation", href: "/book-call" },
    secondary: { label: "See Copilot Library", href: "/llm" },
  },
  {
    eyebrow: "VIRTUAL AI TEAMS",
    accent: "Hire AI engineers",
    white: "in days, not months",
    sub: "Vetted AI, ML, and prompt engineers — embedded into your team in under 14 days.",
    primary: { label: "Get Profiles", href: "/book-call" },
    secondary: { label: "How it works", href: "/virtual-teams" },
  },
];

const DURATION = 7000;

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const startRef = useRef<number>(performance.now());

  const next = useCallback(() => setIdx((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    if (paused || hovered) return;
    startRef.current = performance.now();
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [idx, paused, hovered, next]);

  const slide = SLIDES[idx];

  return (
    <section
      className="relative pb-24 pt-[180px] md:min-h-[760px] md:pt-[200px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* ambient mesh */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 30%, rgba(11,95,74,0.42), transparent 60%),
                       radial-gradient(ellipse 40% 40% at 20% 70%, rgba(0,255,163,0.06), transparent 60%)`,
          animation: reduce ? undefined : "mesh-drift 30s ease-in-out infinite alternate",
        }}
        aria-hidden
      />
      {/* corner labels */}
      <div className="pointer-events-none absolute left-[clamp(20px,5vw,32px)] top-[120px] z-[2] hidden font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low md:flex md:items-center md:gap-2">
        <span className="h-px w-4 bg-accent" />
        ENTERPRISE
      </div>
      <div className="pointer-events-none absolute right-[clamp(20px,5vw,32px)] top-[120px] z-[2] hidden font-mono text-[11px] uppercase tracking-[0.18em] text-fg-low md:flex md:items-center md:gap-2">
        AI-NATIVE
        <span className="h-px w-4 bg-accent" />
      </div>

      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_520px] lg:gap-[60px]">
          <div className="relative z-[1]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col gap-7"
              >
                <Eyebrow>{slide.eyebrow}</Eyebrow>

                <h1 className="h1">
                  <span className="acc">
                    <TypewriterWords text={slide.accent} intervalMs={70} />
                  </span>
                  <motion.span
                    className="wht"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease,
                      delay: 0.45 + slide.accent.split(" ").length * 0.07,
                    }}
                  >
                    {slide.white}
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 1.1 }}
                  className="max-w-[560px] text-[19px] leading-[1.55] text-fg-mid"
                >
                  {slide.sub}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 1.35 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <Button href={slide.primary.href} variant="primary">
                    {slide.primary.label}
                  </Button>
                  <Button href={slide.secondary.href} variant="secondary">
                    {slide.secondary.label}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* lattice */}
          <div className="relative mx-auto h-[360px] w-[360px] sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]">
            <NeuralLattice size={520} />
          </div>
        </div>

        {/* indicator + pause */}
        <div className="mt-12 flex items-center gap-4">
          <button
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={paused ? "Play carousel" : "Pause carousel"}
            className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-fg-mid transition-colors hover:border-accent hover:text-fg"
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === idx}
                className={cn(
                  "h-[6px] rounded-full transition-all duration-300 ease-out-expo",
                  i === idx ? "w-10 bg-signal shadow-[0_0_8px_var(--color-signal)]" : "w-2 bg-fg-low/50 hover:bg-fg-mid",
                )}
              />
            ))}
          </div>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
            // 0{idx + 1} / 0{SLIDES.length}
          </span>
        </div>
      </Container>
    </section>
  );
}
