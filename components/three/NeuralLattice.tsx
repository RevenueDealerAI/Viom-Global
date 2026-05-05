"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { LatticeBoundary } from "./LatticeBoundary";

const Scene = dynamic(() => import("./NeuralLatticeScene"), {
  ssr: false,
  loading: () => <Poster />,
});

type Props = {
  size?: number;
  className?: string;
  ambient?: boolean;
};

function Poster() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/lattice-poster.svg"
      alt=""
      aria-hidden="true"
      className="h-full w-full object-contain"
    />
  );
}

export function NeuralLattice({ size = 520, className, ambient }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mobile, setMobile] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size, maxWidth: "100%" }}
      className={cn(
        "relative",
        ambient && "pointer-events-none opacity-[0.18]",
        className,
      )}
    >
      {/* ambient glow halo */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(11,95,74,0.45), transparent 60%)",
        }}
        aria-hidden
      />
      {inView && !reduce ? (
        <LatticeBoundary fallback={<Poster />}>
          <Scene mobile={mobile} reduced={false} />
        </LatticeBoundary>
      ) : (
        <Poster />
      )}
    </div>
  );
}
