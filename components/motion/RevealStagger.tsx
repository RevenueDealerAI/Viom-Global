"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = {
  staggerMs?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function RevealStagger({
  staggerMs = 80,
  delay = 0,
  className,
  children,
}: Props) {
  const reduce = useReducedMotion();
  const parent: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduce ? 0.2 : 0.5, ease },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
