"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "../primitives/Container";
import { ArrowGlyph } from "../primitives/ArrowGlyph";
import { ease } from "@/lib/motion";

const PILLARS = [
  {
    eyebrow: "ANY DATA",
    verb: "Automate",
    desc: "Connect to any source, structured or not. Ingest, normalize, and route — without a data team in the loop.",
  },
  {
    eyebrow: "ANY AI MODEL",
    verb: "Augment",
    desc: "Frontier or open-weight. Bring your own keys or use ours. Swap models without rewriting the workflow.",
  },
  {
    eyebrow: "ANY WORKFLOW",
    verb: "Orchestrate",
    desc: "Compose multi-step agent workflows with policy, retries, and human review. Observable end to end.",
  },
  {
    eyebrow: "ANY SYSTEM",
    verb: "Scale",
    desc: "Deploy on your cloud, your VPC, or ours. SOC 2, HIPAA-ready, region-pinned, audit-logged.",
  },
];

export function FourPillars() {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };
  const verb: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
  };

  return (
    <Container>
      <div className="mb-10 max-w-[920px] sm:mb-16">
        <h2 className="h2">
          <span className="acc">Bring autonomous workflows</span>
          <span className="wht">to every corner of your business.</span>
        </h2>
      </div>

      <motion.ul
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        className="@container grid gap-5 @md:grid-cols-2 @4xl:grid-cols-4"
      >
        {PILLARS.map((p) => (
          <motion.li
            variants={child}
            key={p.eyebrow}
            className="group relative flex flex-col gap-5 rounded-card-lg border border-line-dark bg-card p-6 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-[2px] hover:border-accent/40 sm:p-7"
          >
            <span className="inline-flex items-center gap-[10px] font-mono text-[11px] uppercase tracking-[0.16em] text-fg-mid">
              <span
                className="h-[6px] w-[6px] rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]"
                style={{ animation: "pulse-dot 2s var(--ease-out-expo) infinite" }}
              />
              {p.eyebrow}
            </span>

            <motion.div variants={verb} className="break-words text-fluid-pillar font-semibold text-fg">
              {p.verb}
            </motion.div>

            <p className="text-[14.5px] leading-[1.6] text-fg-mid">{p.desc}</p>

            <div className="mt-auto pt-2">
              <span className="inline-flex items-center gap-2 text-[13px] text-accent">
                Learn more
                <ArrowGlyph className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  );
}
