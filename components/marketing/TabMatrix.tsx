"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../primitives/Container";
import { Button } from "../primitives/Button";
import { ArrowGlyph } from "../primitives/ArrowGlyph";
import {
  MockupAutomation,
  MockupCopilot,
  MockupTeams,
  MockupPlatform,
  MockupIndustries,
} from "./MockupCard";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const TABS = [
  {
    key: "automation",
    label: "AI Automation",
    title: "Workflows that run themselves",
    desc: "Compose and observe multi-step automations across every system you depend on. Resilient, governed, auditable.",
    cta: { label: "See AI Automation", href: "/ai-automation" },
    bullets: [
      "Cross-system orchestration with retries + human review",
      "200+ first-party connectors, all auth-aware",
      "Policy enforcement at every step (RBAC, PII, region)",
      "Live observability with replay and rollbacks",
      "Deploys on your VPC or ours",
    ],
    Mockup: MockupAutomation,
  },
  {
    key: "llm",
    label: "LLM Copilots",
    title: "Copilots that know your stack",
    desc: "Bring frontier models to your data with guardrails, evals, and per-team policies. Swap models without rewrites.",
    cta: { label: "Explore Copilots", href: "/llm" },
    bullets: [
      "Bring-your-own-keys or Viom-managed inference",
      "RAG over your repos, docs, and ticket history",
      "Per-tenant guardrails: PII redact, no-prod-write",
      "Eval suites that ship with every prompt change",
      "First-class TypeScript and Python SDKs",
    ],
    Mockup: MockupCopilot,
  },
  {
    key: "teams",
    label: "Virtual Teams",
    title: "Embedded AI engineers in 14 days",
    desc: "Vetted AI, ML, prompt, and data engineers — embedded into your team with calibration interviews and a paid trial.",
    cta: { label: "Get Profiles", href: "/virtual-teams" },
    bullets: [
      "AI · ML · Prompt · Data · Product roles",
      "Calibrated to your stack and review process",
      "Paid 14-day pilot, no long-term commit",
      "Time-zone matched to your standup",
      "Replace at any time, no questions asked",
    ],
    Mockup: MockupTeams,
  },
  {
    key: "platform",
    label: "Enterprise Platform",
    title: "One platform, every system",
    desc: "Your control plane for AI. Identity-aware, audit-logged, and built for the security teams that actually approve things.",
    cta: { label: "Platform Overview", href: "/products/servicescientist" },
    bullets: [
      "SSO + SCIM, audit log to your SIEM",
      "Region pinning, BYOK, customer-managed keys",
      "SOC 2 Type II, HIPAA-ready, ISO 27001 in flight",
      "Single pane for cost, latency, and quality",
      "Self-host on Kubernetes or hosted by Viom",
    ],
    Mockup: MockupPlatform,
  },
  {
    key: "industries",
    label: "Industries",
    title: "Tuned for the work you actually do",
    desc: "Pre-built blueprints for the workflows specific to your sector — from prior auth to claims to dispatch.",
    cta: { label: "See Industries", href: "/#industries" },
    bullets: [
      "Healthcare · prior auth, claims, intake",
      "Finance · recon, KYC, alerts triage",
      "Logistics · dispatch, exception handling",
      "SaaS · support, success, dev productivity",
      "Public sector · case routing, FOIA",
    ],
    Mockup: MockupIndustries,
  },
];

export function TabMatrix() {
  const [active, setActive] = useState(0);
  const T = TABS[active];

  return (
    <Container>
      <div className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="h2 max-w-[820px]">
          <span className="acc">One platform.</span>
          <span className="wht">Every shape of work.</span>
        </h2>
        <p className="max-w-[400px] text-[16px] text-fg-mid">
          The same control plane handles the automations, the copilots, and the people. Pick a layer.
        </p>
      </div>

      {/* tab pills */}
      <div className="relative mb-10 sm:after:hidden after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-12 after:bg-gradient-to-l after:from-ink after:to-transparent">
      <div
        role="tablist"
        aria-label="Platform capabilities"
        className="no-scrollbar -mx-[clamp(16px,5vw,32px)] flex gap-2 snap-x snap-mandatory overflow-x-auto scroll-smooth px-[clamp(16px,5vw,32px)] sm:mx-0 sm:px-0 sm:flex-wrap"
      >
        {TABS.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={cn(
                "relative shrink-0 snap-start rounded-pill border px-5 py-[12px] text-[13.5px] font-medium transition-colors duration-200 sm:py-[10px]",
                "min-h-[44px]",
                isActive
                  ? "border-transparent text-ink"
                  : "border-line-strong text-fg-mid hover:border-line-strong/80 hover:text-fg",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 -z-10 rounded-pill bg-fg"
                  transition={{ type: "tween", duration: 0.4, ease }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={T.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease }}
            className="flex flex-col gap-6"
          >
            <h3 className="h3 max-w-[440px]">{T.title}</h3>
            <p className="max-w-[480px] text-[16.5px] text-fg-mid">{T.desc}</p>
            <ul className="space-y-3">
              {T.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-fg">
                  <span className="mt-[6px] text-accent">
                    <ArrowGlyph />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button
                href={T.cta.href}
                variant="primary"
                className="w-full justify-center sm:w-auto"
              >
                {T.cta.label}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${T.key}-m`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            <T.Mockup />
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
}
