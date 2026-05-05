# 05 — Neural Lattice (Signature 3D Centerpiece)

The Viom Neural Lattice is the site's iconic visual. It replaces any "infinity loop" idea. Reuse the same form (recolored, smaller scale) as a recurring icon motif.

## Concept
A slowly rotating faceted polyhedron — translucent glass-like surfaces with luminous internal node connections. Inside the lattice: pulses of light traveling along the edges between nodes, suggesting data flowing through an intelligent network. Surrounded by faint sparkle particles drifting slowly in the surrounding space. **No human photos. No infinity shape. No brain iconography.**

## Visual reading
- Deep teal core glow at the center.
- Electric-mint highlights along the polyhedron edges.
- Soft particle drift in the surrounding cubic space, never crossing the central form.
- Should feel like looking at intelligence as a physical object.

## Technical implementation

Stack: **React Three Fiber** + `drei` + `postprocessing`.
File: `components/three/NeuralLattice.tsx` (`"use client"`, lazy-loaded via `next/dynamic({ ssr: false })`).

### Geometry
- Base form: an **icosahedron** (20 faces, 12 vertices, 30 edges) — chosen for visual symmetry and recognizable "intelligence as crystal" reading.
- Render in two passes:
  1. **Faces**: `<meshPhysicalMaterial>` with `transmission: 0.85`, `thickness: 1.2`, `roughness: 0.15`, `ior: 1.4`, `attenuationColor: #0B5F4A`, `attenuationDistance: 2.5`, `clearcoat: 1`.
  2. **Edges**: `<lineSegments>` from `EdgesGeometry`, with a custom shader material — base color `#4ADE80`, emissive intensity that varies along the line as a pulse travels.

### Internal nodes
- 12 small `<mesh>` instances at vertex positions, each a 0.04-radius sphere with `emissive: #00FFA3`, `emissiveIntensity: 1.4`.
- Vertices receive a subtle "breathe" — emissive intensity 1.0 ↔ 1.6 over 2.5s, phase-shifted per node.

### Edge pulses
- For each of the 30 edges, a pulse travels from one vertex to the other on a randomized 4–8s interval.
- Implementation: a custom GLSL fragment shader on the line segments — `pulsePosition` uniform animates 0→1, fragment alpha brightens within a 0.08-wide window centered on `pulsePosition`.
- 6–10 pulses are active at any time. Stagger so the lattice never feels empty or "all at once."

### Particle drift
- 80 instanced sprites in a 4×4×4 unit space surrounding the lattice (lattice radius ≈ 1.5).
- Each particle has a Perlin-noise-driven offset, max range 0.12 units (so ~3–5px on screen at typical zoom).
- Particles fade in/out over a 6–10s lifecycle. Color: `#00FFA3` at 18% alpha, additive blending.
- **Particles never cross the central form** — enforce a 1.7-unit minimum distance from origin.

### Camera & motion
- Camera at `[0, 0, 4.2]`, FOV 35°.
- Lattice rotation: `0.025 rad/s` on Y, `0.011 rad/s` on X (one full revolution every ~40s on Y).
- Mount-in animation: `scale: 0.85 → 1.0` over 600ms with `--ease-out-expo` easing.

### Post-processing
- `Bloom` from `@react-three/postprocessing`: intensity 0.6, luminanceThreshold 0.4, luminanceSmoothing 0.9.
- `ChromaticAberration`: very subtle, offset `[0.0006, 0.0006]`.
- No SSAO, no DOF (too production-heavy for this aesthetic).

### Lighting
- Ambient: `#0F1B18` at 0.4.
- Directional key: `#4ADE80` at 0.8, position `[3, 4, 5]`.
- Directional fill: `#00FFA3` at 0.3, position `[-3, -2, 4]`.
- Rim point light inside the lattice at origin: `#0B5F4A`, intensity 1.2, distance 3.

## Performance
- The R3F canvas is mounted only when the centerpiece section enters viewport (`IntersectionObserver`).
- When the canvas leaves viewport, pause the render loop (`frameloop="demand"` + manual invalidation, or unmount).
- DPR clamped to `[1, 1.75]` — never render at full retina, the bloom hides the difference.
- On mobile (< 768px), drop particle count from 80 → 24 and disable chromatic aberration.

## Static fallback
While the WebGL canvas loads (or if WebGL is unavailable), show a static SVG poster — a flat icosahedron silhouette with electric-green edges on the dark background. Same composition, no motion. File: `public/lattice-poster.svg`.

## Reduced motion
When `prefers-reduced-motion: reduce`:
- Show the static SVG poster instead of mounting R3F.
- Or: mount R3F but lock rotation to a fixed angle and disable edge pulses + particles. (Choose the SVG path — simpler and lighter.)

## The icon variant
A small 24×24 SVG version of the same icosahedron silhouette is used as a recurring motif:
- Top of every section as a tiny corner accent (8% opacity, decorative).
- As the favicon.
- As the leading mark on the Viom logo lockup.

File: `components/three/LatticeIcon.tsx` — pure SVG, no R3F.

## Centerpiece composition (Section 4 of homepage)
Wrap the lattice with:
- Top-left corner label: mono `ENTERPRISE`, 12px, low-contrast.
- Top-right corner label: mono `AI-NATIVE`, 12px, low-contrast.
- Centered overlay capsule pill (positioned `top: 50%; left: 50%; translate: -50% -50%`):
  - Dark teal fill (`#0F1B18`)
  - 1px electric-green border (`#4ADE80` at 60% alpha)
  - White text: `Automation + Intelligence + Workflows + Trust`
  - Mono font, 14px, no tracking
  - Padding: 14px 28px, fully rounded.
- The capsule pill **does not rotate** with the lattice — it floats statically over it.
