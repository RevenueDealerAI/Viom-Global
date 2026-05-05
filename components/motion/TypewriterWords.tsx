"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = {
  text: string;
  delay?: number;
  intervalMs?: number;
  className?: string;
};

export function TypewriterWords({
  text,
  delay = 0,
  intervalMs = 80,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease,
            delay: delay + (i * intervalMs) / 1000,
          }}
          className="inline-block"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
