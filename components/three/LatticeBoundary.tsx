"use client";

import React from "react";

type Props = { children: React.ReactNode; fallback: React.ReactNode };
type State = { hasError: boolean };

export class LatticeBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("[NeuralLattice] WebGL/R3F init failed, falling back to poster.", error);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
