"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { Button } from "../primitives/Button";
import { ease } from "@/lib/motion";

const PROMPT = "How can AI reduce my support team's workload?";
const RESPONSE = `Three high-impact patterns for support teams:

  ✓ Tier-0 deflection — copilot answers 40–60% of tickets
    before they reach a human, citing your own KB.
  ✓ Agent assist — drafts replies, summarizes threads,
    suggests next-best-action in real time.
  ✓ Auto-triage — classifies, routes, and escalates
    based on intent, sentiment, and SLA risk.

Average outcome across our deployments:
  ↓ 38% mean handle time
  ↓ 52% backlog
  ↑ 19 NPS`;

export function AIChatDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setTyped(RESPONSE);
      return;
    }
    let i = 0;
    let raf = 0;
    let last = performance.now();
    const speed = 18; // ms per char
    const tick = (now: number) => {
      if (now - last >= speed) {
        i += Math.max(1, Math.floor((now - last) / speed));
        last = now;
        setTyped(RESPONSE.slice(0, i));
      }
      if (i < RESPONSE.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <Container>
      <div className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <Eyebrow>// LIVE PRODUCT DEMO</Eyebrow>
          <h2 className="h2 max-w-[760px]">
            <span className="acc">Ask it anything.</span>
            <span className="wht">It answers in production.</span>
          </h2>
        </div>
        <p className="max-w-[400px] text-[16px] text-fg-mid">
          A real Viom Copilot, wired to a live retrieval index. No marketing animation — actual streaming.
        </p>
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, ease }}
        className="relative mx-auto max-w-[920px]"
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(74,222,128,0.25), transparent 70%)" }}
        />
        <div
          className="overflow-hidden rounded-mockup border border-line-strong p-5 sm:p-6 md:p-8"
          style={{
            backdropFilter: "blur(24px) saturate(140%)",
            background: "rgba(19, 31, 27, 0.6)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 100px -40px rgba(0,255,163,0.25)",
          }}
        >
          <div className="mb-5 flex flex-col gap-2 border-b border-line-dark pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mid">
              <span className="h-[6px] w-[6px] rounded-full bg-signal" style={{ animation: "pulse-dot 2s var(--ease-out-expo) infinite" }} />
              Viom Copilot · live
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">
              model · claude-sonnet-4.6
            </span>
          </div>

          {/* prompt */}
          <div className="mb-5 flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-low">prompt</span>
            <p className="text-[16px] text-fg">{PROMPT}</p>
          </div>

          <div className="border-t border-line-dark pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">response</span>
            <pre className="mt-2 max-w-full overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12.5px] leading-[1.7] text-fg sm:text-[13.5px]">
              {typed}
              <span
                className="ml-[1px] inline-block h-[14px] w-[7px] translate-y-[2px] bg-signal"
                style={{ animation: "blink-cursor 530ms steps(2) infinite" }}
                aria-hidden
              />
            </pre>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-line-dark pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                <Check size={12} /> grounded in your KB
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                <Check size={12} /> PII redacted
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                <Check size={12} /> audit-logged
              </span>
            </div>
            <div className="sm:ml-auto">
              <Button
                href="/book-call"
                variant="primary"
                size="sm"
                className="w-full justify-center sm:w-auto"
              >
                Try it yourself
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
