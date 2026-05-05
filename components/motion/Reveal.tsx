"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = {
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "li";
};

export function Reveal({
  y = 24,
  delay = 0,
  duration = 0.5,
  className,
  children,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : duration, ease, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
